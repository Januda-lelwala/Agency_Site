import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /(?:\+?\d[\d\s().-]{7,}\d)/;

function cleanText(value = "", max = 1200) {
  return String(value).replace(/\s+/g, " ").trim().slice(0, max);
}

function normalizeLead(lead = {}) {
  return {
    name: cleanText(lead.name, 80),
    email: cleanText(lead.email, 120).toLowerCase(),
    company: cleanText(lead.company, 120),
    phone: cleanText(lead.phone, 60),
    notes: cleanText(lead.notes, 1000),
    wantsDemo: Boolean(lead.wantsDemo),
  };
}

function titleCaseName(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function extractLead(text, currentLead) {
  const lead = { ...currentLead };
  const lower = text.toLowerCase();
  const email = text.match(EMAIL_RE)?.[0];
  const phone = text.match(PHONE_RE)?.[0];

  if (email) lead.email = email.toLowerCase();
  if (phone) lead.phone = phone.trim();

  const nameMatch = text.match(
    /\b(?:my name is|i am|i'm|this is|name is)\s+([a-z][a-z\s'.-]{1,60})(?:[,.;]|$)/i
  );
  if (nameMatch) lead.name = titleCaseName(nameMatch[1].trim());

  const companyMatch = text.match(
    /\b(?:company is|business is|we are|we're|at|from)\s+([a-z0-9][a-z0-9\s&'.-]{1,80})(?:[,.;]|$)/i
  );
  if (companyMatch && !EMAIL_RE.test(companyMatch[1])) {
    lead.company = cleanText(companyMatch[1], 120);
  }

  const looksLikeName =
    !lead.name &&
    !email &&
    text.length >= 2 &&
    text.length <= 60 &&
    /^[a-z][a-z\s'.-]+$/i.test(text) &&
    text.trim().split(/\s+/).length <= 4 &&
    !/(demo|price|cost|site|website|bot|chat|yes|no|book|call|lead)/i.test(text);

  if (looksLikeName) lead.name = titleCaseName(text.trim());

  if (/(demo|book|call|meeting|appointment|slot|schedule|talk|consult)/i.test(lower)) {
    lead.wantsDemo = true;
  }

  if (!lead.notes && !email && text.length > 20) {
    lead.notes = text;
  }

  return lead;
}

function firstName(name = "") {
  return name.trim().split(/\s+/)[0] || "there";
}

function isAffirmative(text) {
  return /^(yes|yep|yeah|sure|ok|okay|please|do it|send it|confirm|confirmed)\b/i.test(
    text.trim()
  );
}

function wantsDemo(text) {
  return /(demo|book|call|meeting|appointment|slot|schedule|talk|consult)/i.test(text);
}

function answerQuestion(text) {
  const t = text.toLowerCase();

  if (/(cost|price|pricing|\$|how much|expensive|fee|charge)/.test(t)) {
    return "Pricing depends on the site, the knowledge base, and what tools the assistant needs to touch. Most clients care about one number: how many leads it recovers after hours. I can take your details and the team can price the exact setup on a 15-minute demo.";
  }

  if (/(website|site|developer|wordpress|shopify|webflow|code|install|embed)/.test(t)) {
    return "Install is normally one small embed on your existing site. Your pages, domain, and design stay the same; the assistant sits on top and starts answering, qualifying, and routing leads.";
  }

  if (/(wrong|mistake|hallucinat|made up|incorrect|trust|safe|accurate)/.test(t)) {
    return "The assistant is constrained to your approved business information, asks clarifying questions when the visitor is vague, and hands off instead of guessing when confidence is low.";
  }

  if (/(calendar|calendly|hubspot|pipedrive|crm|zapier|slack|discord|email|integration)/.test(t)) {
    return "It can push qualified leads into the tools you already use: email, Discord or Slack alerts, CRMs, calendar links, and custom webhooks. The demo maps those handoffs to your workflow.";
  }

  if (/(what|how).*(build|do|work)|trained|train|faq|knowledge|business/.test(t)) {
    return "Bottify builds a site assistant trained on your services, FAQs, tone, pricing rules, and booking flow. It answers questions, qualifies the visitor, captures contact details, and alerts you while the lead is still warm.";
  }

  return "I can answer questions about the assistant, setup, pricing, accuracy, or integrations. If you want to see it on your site, I can collect your details and send a demo request now.";
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const latest = cleanText(body.message);
  if (!latest) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  let lead = extractLead(latest, normalizeLead(body.lead));
  const bookingIntent = lead.wantsDemo || wantsDemo(latest);
  if (bookingIntent) lead.wantsDemo = true;

  if (isAffirmative(latest) && lead.name && lead.email && lead.wantsDemo) {
    return NextResponse.json({
      lead,
      action: "submit_lead",
      reply: `Done. I sent the demo request for ${lead.name} at ${lead.email}.`,
    });
  }

  if (bookingIntent || lead.name || lead.email || lead.phone) {
    if (!lead.name) {
      return NextResponse.json({
        lead,
        reply: "I can send a real demo request. What name should I put on it?",
      });
    }

    if (!lead.email) {
      return NextResponse.json({
        lead,
        reply: `Thanks, ${firstName(lead.name)}. What email should I use for the confirmation?`,
      });
    }

    return NextResponse.json({
      lead,
      reply: `I have ${lead.name} at ${lead.email}${
        lead.company ? ` for ${lead.company}` : ""
      }. Reply yes and I will send this to the Bottify team, or send any change.`,
    });
  }

  return NextResponse.json({
    lead,
    reply: answerQuestion(latest),
  });
}
