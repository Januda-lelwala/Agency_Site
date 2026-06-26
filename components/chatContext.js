// Live page context + safe action execution for the site chat assistant.
// Collects only visible, non-sensitive text and runs only the whitelisted
// actions the backend may return. See docs/chat-assistant.md.

function redactSensitiveText(value) {
  return String(value)
    .replace(/\b\d{13,19}\b/g, "[redacted-card]")
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[redacted-ssn]");
}

function cleanLabel(value) {
  return redactSensitiveText(String(value)).replace(/\s+/g, " ").trim().slice(0, 200);
}

function looksGenerated(value) {
  return value.length > 40 || /[0-9a-f]{12,}/i.test(value);
}

function isVisible(element) {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    style.display !== "none" &&
    style.visibility !== "hidden"
  );
}

function shouldSkipField(field) {
  const type = String(field.getAttribute("type") || "").toLowerCase();
  return ["password", "hidden", "file"].includes(type);
}

function getSafeSelector(element) {
  if (element.dataset.ai) {
    return `[data-ai='${CSS.escape(element.dataset.ai)}']`;
  }
  if (element.id && !looksGenerated(element.id)) {
    return `#${CSS.escape(element.id)}`;
  }
  return null;
}

function findExplicitLabel(element) {
  if (!element.id) return "";
  const label = document.querySelector(`label[for='${CSS.escape(element.id)}']`);
  return label ? label.innerText : "";
}

function getLabel(element) {
  const value =
    findExplicitLabel(element) ||
    element.getAttribute("aria-label") ||
    element.getAttribute("placeholder") ||
    element.getAttribute("value") ||
    element.innerText ||
    element.name ||
    "";
  return cleanLabel(value);
}

function getTexts(selector) {
  return [...document.querySelectorAll(selector)]
    .filter(isVisible)
    .map((el) => cleanLabel(el.innerText))
    .filter(Boolean);
}

function getControls(selector) {
  return [...document.querySelectorAll(selector)]
    .filter(isVisible)
    .map((el) => ({ label: getLabel(el), selector: getSafeSelector(el) }))
    .filter((item) => item.label && item.selector);
}

function getLinks() {
  return [...document.querySelectorAll("a[href]")]
    .filter(isVisible)
    .map((el) => ({
      label: getLabel(el),
      url: el.href,
      selector: getSafeSelector(el),
    }))
    .filter((item) => item.label && item.url && item.selector);
}

function getForms() {
  return [...document.querySelectorAll("form")]
    .filter(isVisible)
    .map((form) => ({
      label: getLabel(form) || "Form",
      selector: getSafeSelector(form),
      fields: [...form.querySelectorAll("input, textarea, select")]
        .filter((field) => !shouldSkipField(field))
        .map(getLabel)
        .filter(Boolean)
        .slice(0, 40),
    }))
    .filter((item) => item.selector);
}

export function collectPageContext() {
  if (typeof document === "undefined") return undefined;
  return {
    title: document.title.slice(0, 200),
    visibleText: redactSensitiveText(document.body.innerText)
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 12000),
    headings: getTexts("h1, h2, h3").slice(0, 80),
    buttons: getControls(
      "button, [role='button'], input[type='button'], input[type='submit']"
    ).slice(0, 100),
    links: getLinks().slice(0, 100),
    forms: getForms().slice(0, 30),
  };
}

function highlightElement(selector) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "center" });

  const prevOutline = element.style.outline;
  const prevOffset = element.style.outlineOffset;
  element.style.outline = "3px solid var(--amber, #ff7a18)";
  element.style.outlineOffset = "3px";
  window.setTimeout(() => {
    element.style.outline = prevOutline;
    element.style.outlineOffset = prevOffset;
  }, 3000);
}

function prefillForm(selector, values) {
  const form = document.querySelector(selector);
  if (!form) return;
  for (const [name, value] of Object.entries(values)) {
    const field = form.querySelector(`[name='${CSS.escape(name)}']`);
    if (!field || shouldSkipField(field)) continue;
    field.value = value;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

// Only same-origin navigations are honored, per the security spec.
function isSameOrigin(url) {
  try {
    return new URL(url, window.location.href).origin === window.location.origin;
  } catch {
    return false;
  }
}

export function executeActions(actions) {
  if (!Array.isArray(actions)) return;
  for (const action of actions) {
    if (!action || typeof action !== "object") continue;

    if (action.type === "open_url") {
      if (action.url && isSameOrigin(action.url)) {
        window.open(action.url, action.target || "_self");
      }
      continue;
    }
    if (action.type === "scroll_to") {
      const el = action.selector && document.querySelector(action.selector);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      continue;
    }
    if (action.type === "highlight_element" && action.selector) {
      highlightElement(action.selector);
      continue;
    }
    if (action.type === "prefill_form" && action.selector) {
      prefillForm(action.selector, action.values || {});
    }
    // Unknown action types are ignored.
  }
}
