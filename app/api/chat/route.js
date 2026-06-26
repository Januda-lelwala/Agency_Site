import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND_URL = process.env.CHAT_BACKEND_URL;
const BOT_ID = process.env.CHAT_BOT_ID;

// Limits enforced by the bot backend — we mirror them so a malformed client
// payload fails fast here instead of being rejected downstream.
const LIMITS = {
  title: 200,
  visibleText: 12000,
  headings: 80,
  buttons: 100,
  links: 100,
  forms: 30,
  selector: 300,
  fields: 40,
  fieldLen: 120,
};

function str(value = "", max = 2000) {
  return String(value).replace(/\s+/g, " ").trim().slice(0, max);
}

function sanitizeContext(ctx) {
  if (!ctx || typeof ctx !== "object") return undefined;

  const clip = (item) => ({
    label: str(item?.label, LIMITS.title),
    ...(item?.url ? { url: str(item.url, 2000) } : {}),
    ...(item?.selector ? { selector: str(item.selector, LIMITS.selector) } : {}),
  });

  return {
    title: str(ctx.title, LIMITS.title),
    visibleText: str(ctx.visibleText, LIMITS.visibleText),
    headings: (ctx.headings || [])
      .slice(0, LIMITS.headings)
      .map((h) => str(h, LIMITS.title))
      .filter(Boolean),
    buttons: (ctx.buttons || []).slice(0, LIMITS.buttons).map(clip),
    links: (ctx.links || []).slice(0, LIMITS.links).map(clip),
    forms: (ctx.forms || []).slice(0, LIMITS.forms).map((f) => ({
      label: str(f?.label, LIMITS.title),
      selector: str(f?.selector, LIMITS.selector),
      fields: (f?.fields || [])
        .slice(0, LIMITS.fields)
        .map((field) => str(field, LIMITS.fieldLen))
        .filter(Boolean),
    })),
  };
}

export async function POST(request) {
  if (!BACKEND_URL || !BOT_ID) {
    return NextResponse.json(
      { error: "The assistant is not configured." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message = str(body.message, 4000);
  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const payload = {
    botId: BOT_ID,
    message,
    confirmed: Boolean(body.confirmed),
  };
  if (body.conversationId) payload.conversationId = str(body.conversationId, 120);
  if (body.pageUrl) payload.pageUrl = str(body.pageUrl, 2000);
  const pageContext = sanitizeContext(body.pageContext);
  if (pageContext) payload.pageContext = pageContext;

  let upstream;
  try {
    upstream = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      // Generation can take a while; cap it so the route never hangs.
      signal: AbortSignal.timeout(45000),
    });
  } catch {
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try again." },
      { status: 502 }
    );
  }

  const data = await upstream.json().catch(() => ({}));

  if (!upstream.ok) {
    return NextResponse.json(
      { error: data.message || data.error || "The assistant could not respond." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    conversationId: data.conversationId || null,
    reply: data.message || "Sorry, I couldn't put that into words. Try again?",
    actions: Array.isArray(data.actions) ? data.actions : [],
  });
}
