import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Lead notifications hit external services (DB, email, Discord), so this must
// run on the Node runtime and never be statically cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------------------------------------------------------------- Channels */

async function storeInSupabase(lead) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { skipped: true };

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    email: lead.email,
    company: lead.company || null,
    phone: lead.phone || null,
    message: lead.message || null,
    source: "nightshift-demo-request",
  });
  if (error) throw new Error(`Supabase: ${error.message}`);
  return { ok: true };
}

async function sendEmails(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return { skipped: true };

  const resend = new Resend(apiKey);

  // Notify the team
  const notify = resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `New demo request: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    html: ownerEmailHtml(lead),
  });

  // Auto-reply to the prospect
  const autoReply = resend.emails.send({
    from,
    to: lead.email,
    replyTo: to,
    subject: "Let's get your demo booked",
    html: autoReplyHtml(lead),
  });

  const results = await Promise.allSettled([notify, autoReply]);
  if (results.every((r) => r.status === "rejected")) {
    throw new Error(
      `Resend: ${results.map((r) => r.reason?.message || r.reason).join("; ")}`
    );
  }
  return { ok: true };
}

async function notifyDiscord(lead) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return { skipped: true };

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Nightshift Leads",
      embeds: [
        {
          title: "🌙 New demo request",
          color: 0xff7a18,
          fields: [
            { name: "Name", value: lead.name || "—", inline: true },
            { name: "Business", value: lead.company || "—", inline: true },
            { name: "Phone", value: lead.phone || "—", inline: true },
            { name: "Email", value: lead.email || "—" },
            { name: "Message", value: (lead.message || "—").slice(0, 1000) },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`Discord: ${res.status} ${await res.text().catch(() => "")}`);
  }
  return { ok: true };
}

/* ----------------------------------------------------------- Email templates */

function ownerEmailHtml(lead) {
  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#0e1626">
    <div style="background:#0b1120;padding:20px 24px;border-radius:12px 12px 0 0">
      <p style="margin:0;color:#ff7a18;font-weight:800;font-size:16px">New demo request</p>
    </div>
    <div style="border:1px solid #e3e7f0;border-top:none;border-radius:0 0 12px 12px;padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#59617a;width:90px">Name</td><td style="padding:6px 0;font-weight:600">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#59617a">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(lead.email)}" style="color:#e8650a">${escapeHtml(lead.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#59617a">Business</td><td style="padding:6px 0">${escapeHtml(lead.company) || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#59617a">Phone</td><td style="padding:6px 0">${escapeHtml(lead.phone) || "—"}</td></tr>
      </table>
      <p style="margin:16px 0 6px;color:#59617a;font-size:14px">Message</p>
      <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(lead.message) || "—"}</p>
    </div>
  </div>`;
}

function autoReplyHtml(lead) {
  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#0e1626">
    <div style="background:#0b1120;padding:24px;border-radius:12px 12px 0 0">
      <p style="margin:0;color:#fff;font-weight:800;font-size:18px">Night<span style="color:#ff7a18">shift</span></p>
    </div>
    <div style="border:1px solid #e3e7f0;border-top:none;border-radius:0 0 12px 12px;padding:24px;font-size:15px;line-height:1.6">
      <p style="margin:0 0 14px">Hi ${escapeHtml(lead.name.split(" ")[0]) || "there"},</p>
      <p style="margin:0 0 14px">Thanks for the demo request — I've got it. I'll reach out shortly to lock in a 15-minute slot and show the assistant working on your own website before you pay a thing.</p>
      <p style="margin:0 0 14px">If it's easier, just reply to this email with a couple of times that work for you.</p>
      <p style="margin:0;color:#59617a">— The Nightshift team</p>
    </div>
  </div>`;
}

/* --------------------------------------------------------------- Handler */

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Silently accept and drop.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    company: String(body.company || "").trim(),
    phone: String(body.phone || "").trim(),
    message: String(body.message || "").trim().slice(0, 5000),
  };

  if (!lead.name || !lead.email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(lead.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const channels = ["supabase", "email", "discord"];
  const results = await Promise.allSettled([
    storeInSupabase(lead),
    sendEmails(lead),
    notifyDiscord(lead),
  ]);

  let delivered = 0;
  let skipped = 0;
  const failures = [];

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      failures.push(channels[i]);
      console.error(`[lead] ${channels[i]} failed:`, result.reason);
    } else if (result.value?.ok) {
      delivered += 1;
    } else if (result.value?.skipped) {
      skipped += 1;
    }
  });

  // Every configured channel failed → tell the user something went wrong.
  if (delivered === 0 && failures.length > 0) {
    return NextResponse.json(
      { error: "We couldn't submit your request. Please email us directly." },
      { status: 502 }
    );
  }

  // Nothing is configured yet — succeed but warn in the server logs.
  if (delivered === 0 && skipped === channels.length) {
    console.warn(
      "[lead] No delivery channels configured. Set SUPABASE_*, RESEND_*, and/or DISCORD_WEBHOOK_URL."
    );
  }

  return NextResponse.json({ ok: true });
}
