# Demo-request form — setup

The booking form in the final CTA posts to `app/api/lead/route.js`, which fans
the submission out to three independent channels:

| Channel | Purpose | Required env vars |
| --- | --- | --- |
| **Supabase** | Permanent record (system of record) | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| **Resend** | Emails you the lead **+** auto-replies to the prospect | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` |
| **Discord** | Instant ping in a `#leads` channel | `DISCORD_WEBHOOK_URL` |

Each channel is optional and independent — configure whichever you want. If a
channel's env vars are missing it's skipped; if all are missing the form still
"succeeds" but the lead goes nowhere (a warning is logged).

Copy `.env.example` to `.env.local` and fill in the values.

---

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, run:

   ```sql
   create table if not exists public.leads (
     id          uuid primary key default gen_random_uuid(),
     created_at  timestamptz not null default now(),
     name        text not null,
     email       text not null,
     company     text,
     phone       text,
     message     text,
     source      text default 'bottify-demo-request'
   );

   -- Lock the table down. Our API uses the service-role key, which bypasses
   -- RLS, so no public policy is needed — this just blocks anon/public access.
   alter table public.leads enable row level security;
   ```

3. **Project Settings → API**: copy the **Project URL** → `SUPABASE_URL`, and
   the **`service_role`** secret → `SUPABASE_SERVICE_ROLE_KEY`.
4. **View your leads** in the Supabase dashboard under **Table Editor → leads**
   (filter, sort, export to CSV). You rarely need to — email + Discord bring the
   leads to you; this is the durable backup.

## 2. Resend (email)

1. Sign up at [resend.com](https://resend.com) and **verify your sending
   domain** (Domains → Add Domain → add the DNS records).
2. Create an API key → `RESEND_API_KEY`.
3. Set `CONTACT_FROM_EMAIL` to an address on your verified domain, e.g.
   `"Bottify <hello@yourdomain.com>"`, and `CONTACT_TO_EMAIL` to wherever
   you want lead notifications delivered.

> Until your domain is verified you can test with `onboarding@resend.dev` as the
> FROM address (Resend only allows sending it to your own account email).

## 3. Discord (notification)

1. In your server: **Server Settings → Integrations → Webhooks → New Webhook**.
2. Pick the channel (e.g. `#leads`), **Copy Webhook URL** → `DISCORD_WEBHOOK_URL`.

---

## Deploying (Vercel)

Add the same variables under **Project → Settings → Environment Variables**.
The API route runs serverlessly — no server to manage.

## Spam

A hidden honeypot field (`company_website`) is included; bots that fill it are
silently dropped. If you start getting spam, add a real challenge such as
[Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) or
hCaptcha to the form and verify the token in the API route.

## Growing into a CRM

When sales picks up, add a fourth channel in `route.js` that pushes the lead
into HubSpot/Pipedrive — the pattern is identical to the Discord webhook.

## Chat assistant path

The chat widget now calls `/api/chat` for live responses instead of replaying a
scripted demo. When a visitor confirms a demo request in chat, the client posts
the captured name, email, company, phone, and recent transcript to `/api/lead`,
so Supabase, Resend, and Discord delivery still run through the same channel as
the booking form.
