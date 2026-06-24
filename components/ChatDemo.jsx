"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "./icons";

const STARTER_MESSAGES = [
  {
    role: "bot",
    text: "Hi, I'm Bottify's live site assistant. Ask about setup, pricing, accuracy, or integrations. If you want the 15-minute demo, I can collect your details and send the request right here.",
  },
];

const SUGGESTIONS = [
  "What exactly do you build?",
  "How much does it cost?",
  "Book a demo",
];

function Avatar() {
  return (
    <span className="flex-shrink-0 h-7 w-7 rounded-full bg-[var(--amber)] text-[#1a0e02] flex items-center justify-center text-[0.7rem] font-display font-extrabold">
      B
    </span>
  );
}

function buildLeadMessage(messages, lead) {
  const transcript = messages
    .slice(-10)
    .map((msg) => `${msg.role === "bot" ? "Assistant" : "Visitor"}: ${msg.text}`)
    .join("\n");

  return [
    lead.notes,
    "Captured through the Bottify chat assistant.",
    transcript ? `Recent chat:\n${transcript}` : "",
  ]
    .filter(Boolean)
    .join("\n\n")
    .slice(0, 5000);
}

export default function ChatDemo() {
  const [messages, setMessages] = useState(STARTER_MESSAGES);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [lead, setLead] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | submitted | error
  const scrollRef = useRef(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, typing]);

  async function submitLead(nextMessages, nextLead) {
    setStatus("submitting");

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nextLead.name,
        email: nextLead.email,
        company: nextLead.company || "",
        phone: nextLead.phone || "",
        message: buildLeadMessage(nextMessages, nextLead),
      }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json.error || "The demo request could not be sent.");
    }

    setStatus("submitted");
  }

  async function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || typing || status === "submitting") return;

    setInput("");
    setStatus((current) => (current === "error" ? "idle" : current));

    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, lead }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "The assistant is unavailable.");

      const nextLead = json.lead || lead;
      setLead(nextLead);

      if (json.action === "submit_lead") {
        await submitLead(nextMessages, nextLead);
      }

      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text:
            json.reply ||
            "Got it. I sent that through and the Bottify team will follow up shortly.",
        },
      ]);
    } catch (err) {
      setStatus("error");
      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text:
            err.message ||
            "I couldn't send that right now. Please use the form below or try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="relative z-10 max-w-xl mx-auto" id="demo">
      <div
        className="absolute -inset-6 rounded-[2rem] blur-2xl opacity-50 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 35%, rgba(255,122,24,0.28), transparent 70%)",
        }}
      />

      <div className="relative rounded-2xl bg-[var(--ink-2)] border border-[var(--ink-line)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--ink-line)] bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <Avatar />
            <div className="leading-tight">
              <p className="text-sm font-sans font-bold text-[var(--invert)]">Bottify assistant</p>
              <p className="flex items-center gap-1.5 text-[0.7rem] font-sans text-[var(--invert-soft)]">
                <span className="live-dot" aria-hidden="true" /> Live lead capture
              </p>
            </div>
          </div>
          <span className="text-[0.7rem] font-sans font-medium text-[var(--invert-soft)]">
            {status === "submitted" ? "Sent" : status === "submitting" ? "Sending" : "Online"}
          </span>
        </div>

        <div
          ref={scrollRef}
          className="h-[22rem] sm:h-[24rem] overflow-y-auto px-4 py-5 flex flex-col gap-3.5 scroll-smooth"
          aria-live="polite"
        >
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={`msg-in flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.role === "bot" ? <Avatar /> : <span className="w-7 flex-shrink-0" aria-hidden="true" />}
              <div
                className={`max-w-[80%] px-3.5 py-2.5 text-sm font-sans leading-relaxed rounded-2xl ${
                  msg.role === "bot"
                    ? "bg-white/[0.06] text-[var(--invert)] rounded-bl-md"
                    : "bg-[var(--amber)] text-[#1a0e02] font-medium rounded-br-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="msg-in flex items-end gap-2">
              <Avatar />
              <div className="flex items-center gap-1 bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3.5">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        <div className="px-3 pb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => sendMessage(suggestion)}
              disabled={typing || status === "submitting"}
              className="rounded-full border border-[var(--ink-line)] bg-white/[0.04] px-3 py-1.5 text-xs font-sans font-medium text-[var(--invert-soft)] hover:border-[var(--amber)] hover:text-[var(--invert)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3 border-t border-[var(--ink-line)] bg-white/[0.02]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={typing || status === "submitting"}
            placeholder={
              status === "submitted"
                ? "Ask another question..."
                : "Ask a question or book a demo..."
            }
            aria-label="Message the Bottify assistant"
            className="flex-1 bg-transparent text-sm font-sans text-[var(--invert)] placeholder:text-[var(--invert-soft)]/70 focus:outline-none disabled:cursor-not-allowed px-2"
          />
          <button
            type="submit"
            disabled={typing || status === "submitting" || !input.trim()}
            aria-label="Send message"
            className="flex-shrink-0 h-9 w-9 rounded-lg btn-amber flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Send size={17} />
          </button>
        </form>
      </div>

      <p className="mt-4 text-center text-xs font-sans text-[var(--invert-soft)]">
        The assistant answers live and sends confirmed demo requests through the real lead pipeline.
      </p>
    </div>
  );
}
