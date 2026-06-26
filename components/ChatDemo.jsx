"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "./icons";
import { collectPageContext, executeActions } from "./chatContext";

const STARTER_MESSAGES = [
  {
    role: "bot",
    text: "Hi, I'm Bottify's live site assistant. Ask about setup, pricing, accuracy, or integrations — or tell me you'd like the free 15-minute demo and I'll get you booked.",
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

export default function ChatDemo() {
  const [messages, setMessages] = useState(STARTER_MESSAGES);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const conversationId = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, typing]);

  async function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || typing) return;

    setInput("");
    setError(false);
    setMessages((current) => [...current, { role: "user", text }]);
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId: conversationId.current,
          pageUrl: window.location.href,
          pageContext: collectPageContext(),
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "The assistant is unavailable.");

      if (json.conversationId) conversationId.current = json.conversationId;

      setMessages((current) => [
        ...current,
        { role: "bot", text: json.reply || "I could not respond just now." },
      ]);
      executeActions(json.actions);
    } catch (err) {
      setError(true);
      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text:
            err.message ||
            "I couldn't reach the assistant right now. Please use the form below or try again.",
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
                <span className="live-dot" aria-hidden="true" /> Live AI assistant
              </p>
            </div>
          </div>
          <span className="text-[0.7rem] font-sans font-medium text-[var(--invert-soft)]">
            {error ? "Reconnecting" : typing ? "Typing" : "Online"}
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
                className={`max-w-[80%] px-3.5 py-2.5 text-sm font-sans leading-relaxed rounded-2xl whitespace-pre-wrap ${
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
              disabled={typing}
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
            disabled={typing}
            placeholder="Ask a question or book a demo..."
            aria-label="Message the Bottify assistant"
            className="flex-1 bg-transparent text-sm font-sans text-[var(--invert)] placeholder:text-[var(--invert-soft)]/70 focus:outline-none disabled:cursor-not-allowed px-2"
          />
          <button
            type="submit"
            disabled={typing || !input.trim()}
            aria-label="Send message"
            className="flex-shrink-0 h-9 w-9 rounded-lg btn-amber flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Send size={17} />
          </button>
        </form>
      </div>

      <p className="mt-4 text-center text-xs font-sans text-[var(--invert-soft)]">
        This is the real assistant answering live — the same one that goes on your site.
      </p>
    </div>
  );
}
