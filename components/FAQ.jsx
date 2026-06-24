"use client";

import { useState } from "react";
import { Plus } from "./icons";

const faqs = [
  {
    q: "Do I need to change my website?",
    a: "No. Bottify is one line of code that drops onto your existing site. Your pages, your design, your domain — nothing changes. The assistant just shows up and starts catching leads.",
  },
  {
    q: "Do I need my web developer?",
    a: "Nope. We handle the whole setup. If you can forward us your website address, that’s about all we need from you to get started.",
  },
  {
    q: "Is it hard to set up?",
    a: "It’s done for you. We train it on your business, wire it to your calendar, and you’re live in a few days. You don’t touch any code.",
  },
  {
    q: "What if it answers a question wrong?",
    a: "It only answers from your real business info, and when it isn’t sure, it says so and hands the conversation to you instead of guessing. You stay in control of what it can promise.",
  },
  {
    q: "What does it cost?",
    a: "Less than the leads you’re losing after hours. Most businesses recover the cost with a single captured customer. We’ll go through the exact numbers on your 15-minute demo — no obligation.",
  },
];

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--line)]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base sm:text-lg font-bold text-[var(--text)]">{q}</span>
        <span
          className={`flex-shrink-0 h-7 w-7 rounded-full bg-[var(--paper-2)] text-[var(--amber)] flex items-center justify-center transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <Plus size={16} />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <p className="overflow-hidden text-sm sm:text-base font-sans text-[var(--text-soft)] leading-relaxed max-w-2xl">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="border-t border-[var(--line)]">
      {faqs.map((f) => (
        <Item key={f.q} {...f} />
      ))}
    </div>
  );
}
