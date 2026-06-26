# Live chat assistant — setup

The chat panel in the hero (`components/ChatDemo.jsx`) is a **real AI assistant**,
not a scripted demo. Visitor messages are answered by a hosted bot backend.

## How it flows

```
ChatDemo.jsx  ──POST /api/chat──▶  app/api/chat/route.js  ──▶  CHAT_BACKEND_URL/api/chat
  (browser)        (same origin)         (server proxy)            (hosted bot brain)
```

The Next.js route at `app/api/chat/route.js` is a thin proxy. It exists so that:

- the backend URL and bot ID stay server-side,
- there is no mixed-content issue (the backend is plain HTTP),
- the browser only ever talks to the site's own origin.

It injects `CHAT_BOT_ID`, forwards the message + live page context, and returns
`{ conversationId, reply, actions }`.

## Configuration

Set these in `.env.local` (see `.env.example`):

| Var | Purpose |
| --- | --- |
| `CHAT_BACKEND_URL` | Base URL of the hosted bot backend, e.g. `http://167.86.114.134:3000` |
| `CHAT_BOT_ID` | The bot created on that backend (`POST /api/bots`) |

If either is missing the route returns `503` and the widget shows a friendly
"assistant is unavailable" message.

### Creating / re-creating the bot

```bash
curl -X POST "$CHAT_BACKEND_URL/api/bots" \
  -H 'content-type: application/json' \
  -d '{ "businessName": "...", "botName": "...", "slug": "...",
        "tone": "...", "goals": [...], "rules": [...],
        "enabledTools": ["search_knowledge","collect_lead","human_handoff"] }'
```

The returned `id` is your `CHAT_BOT_ID`. The bot's personality and facts live in
the `tone` / `goals` / `rules` config on the backend, so updating what it knows
means re-creating the bot (the backend exposes no config-update route) and
swapping the new id into `CHAT_BOT_ID`. `GET /api/bots/<id>/config` shows the
current config.

## Live page context

`components/chatContext.js` collects **only visible, non-sensitive** page text
(title, visible text, headings, buttons, links, forms) and sends it with each
message so the bot can answer about the current page. It skips password, hidden,
and file inputs and redacts obvious card/SSN patterns. The proxy re-clamps every
field to the backend's documented limits before forwarding.

## Returned actions

The backend may return safe frontend `actions`, executed by `executeActions`:
`open_url` (same-origin only), `scroll_to`, `highlight_element`, `prefill_form`.
Unknown action types are ignored.

## Leads from chat

When a visitor gives their details, the bot's `collect_lead` tool stores the
lead **on the backend**. This is separate from the dedicated demo form in the
final CTA, which posts to `app/api/lead/route.js` (Supabase / Resend / Discord —
see `lead-capture.md`). If you need chat-captured leads in those same channels,
wire the backend's lead store to them, or pull leads from the backend.
