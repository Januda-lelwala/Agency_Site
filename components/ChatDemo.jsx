"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "./icons";

/*
 * ── THE CENTERPIECE ──────────────────────────────────────────────────────
 * This is a faithful *preview* of the live assistant. To make it real, drop
 * your bot's <script> embed in place of this component — the rest of the page
 * doesn't change, only the embed source:
 *
 *     <Script src="https://your-bot-backend.com/widget.js" data-agent="bottify" />
 *
 * For v1 you can point that at a platform bot (Chatbase / Botpress), then swap
 * in your own backend later. Until then, this scripted preview carries the demo.
 * ─────────────────────────────────────────────────────────────────────────
 */

const SCRIPT = [
  { role: "bot", text: "Hey 👋 I’m a Bottify assistant — the same kind we’d build for your website. Ask me anything, or just watch me book you a demo." },
  { role: "user", text: "What exactly do you build?" },
  { role: "bot", text: "A custom AI chatbot trained on your business — it answers visitor questions, captures leads, and books meetings straight into your calendar. 24/7." },
  { role: "user", text: "Do I need to change my website?" },
  { role: "bot", text: "Nope — none at all. It’s one line of code on your existing site. Nothing else changes, and you’re live in a few days." },
  { role: "user", text: "What happens when someone visits at midnight?" },
  { role: "bot", text: "I greet them, answer their questions, and book the next step before they bounce to a competitor. You wake up to booked calls instead of missed ones." },
  { role: "user", text: "Okay. How do I see it on my own site?" },
  { role: "bot", text: "Easiest is a quick 15-min demo — I’ll show it running on your website before you pay a thing. I’ve got Thu 7:10 PM or Fri 12:30 PM. Which works?" },
  { role: "user", text: "Thursday" },
  { role: "bot", text: "Booked ✅ Thursday 7:10 PM — confirmation’s on its way to your email. That’s exactly what your visitors will feel." },
];

function replyFor(text) {
  const t = text.toLowerCase();
  if (/(cost|price|pricing|\$|how much|expensive)/.test(t))
    return "Most businesses recover the cost with a single captured lead. I’ll walk you through your exact numbers on the demo — want a slot?";
  if (/(website|site|developer|web guy|code|wordpress)/.test(t))
    return "No website changes and no developer needed — one line of code, live in days. Want me to show you on a 15-min demo?";
  if (/(wrong|mistake|hallucinat|made up|incorrect)/.test(t))
    return "If I’m ever unsure, I say so and hand off to a human — I never guess. Happy to show you how that works live.";
  return "Good question — easiest is to show you live on your own site. Want to grab a 15-min demo? I’ve got Thu 7:10 PM open.";
}

function Avatar() {
  return (
    <span className="flex-shrink-0 h-7 w-7 rounded-full bg-[var(--amber)] text-[#1a0e02] flex items-center justify-center text-[0.7rem] font-display font-extrabold">
      B
    </span>
  );
}

export default function ChatDemo() {
  const [shown, setShown] = useState([]);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const timers = useRef([]);

  // Auto-play the scripted conversation on mount.
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setShown(SCRIPT);
      setDone(true);
      return;
    }

    let t = 600;
    SCRIPT.forEach((msg, i) => {
      if (msg.role === "bot") {
        timers.current.push(setTimeout(() => setTyping(true), t));
        t += 950;
        timers.current.push(
          setTimeout(() => {
            setTyping(false);
            setShown((s) => [...s, msg]);
          }, t)
        );
        t += 700;
      } else {
        timers.current.push(
          setTimeout(() => setShown((s) => [...s, msg]), t)
        );
        t += 850;
      }
    });
    timers.current.push(setTimeout(() => setDone(true), t));

    return () => timers.current.forEach(clearTimeout);
  }, []);

  // Keep the transcript scrolled to the newest message.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [shown, typing]);

  function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || !done) return;
    setInput("");
    setShown((s) => [...s, { role: "user", text }]);
    setTyping(true);
    const reply = replyFor(text);
    setTimeout(() => {
      setTyping(false);
      setShown((s) => [...s, { role: "bot", text: reply }]);
    }, 1100);
  }

  return (
    <div className="relative z-10 max-w-xl mx-auto" id="demo">
      {/* Glow behind the card — the bot "catching a lead late at night" */}
      <div
        className="absolute -inset-6 rounded-[2rem] blur-2xl opacity-50 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(60% 60% at 50% 35%, rgba(255,122,24,0.28), transparent 70%)" }}
      />

      <div className="relative rounded-2xl bg-[var(--ink-2)] border border-[var(--ink-line)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Window bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--ink-line)] bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <Avatar />
            <div className="leading-tight">
              <p className="text-sm font-sans font-bold text-[var(--invert)]">Bottify assistant</p>
              <p className="flex items-center gap-1.5 text-[0.7rem] font-sans text-[var(--invert-soft)]">
                <span className="live-dot" aria-hidden="true" /> Live · replies in seconds
              </p>
            </div>
          </div>
          <span className="text-[0.7rem] font-sans font-medium text-[var(--invert-soft)] tabular-nums">
            11:47 PM
          </span>
        </div>

        {/* Transcript */}
        <div
          ref={scrollRef}
          className="h-[22rem] sm:h-[24rem] overflow-y-auto px-4 py-5 flex flex-col gap-3.5 scroll-smooth"
          aria-live="polite"
        >
          {shown.map((msg, i) => (
            <div
              key={i}
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

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3 border-t border-[var(--ink-line)] bg-white/[0.02]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!done}
            placeholder={done ? "Ask it anything…" : "Watch it work…"}
            aria-label="Message the Bottify assistant"
            className="flex-1 bg-transparent text-sm font-sans text-[var(--invert)] placeholder:text-[var(--invert-soft)]/70 focus:outline-none disabled:cursor-not-allowed px-2"
          />
          <button
            type="submit"
            disabled={!done || !input.trim()}
            aria-label="Send message"
            className="flex-shrink-0 h-9 w-9 rounded-lg btn-amber flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Send size={17} />
          </button>
        </form>
      </div>

      <p className="mt-4 text-center text-xs font-sans text-[var(--invert-soft)]">
        This is a preview. On a 15-min demo, I’ll run it live on your own website.
      </p>
    </div>
  );
}
