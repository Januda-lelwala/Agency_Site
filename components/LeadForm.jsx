"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[var(--ink-line)] bg-white/[0.04] text-sm font-sans text-[var(--invert)] placeholder:text-[var(--invert-soft)]/60 focus:outline-none focus:border-[var(--amber)] focus:ring-2 focus:ring-[var(--amber)]/25 transition-colors";

export default function LeadForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-[var(--ink-line)] bg-[var(--ink-2)] p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--amber)] text-[#1a0e02]">
          <Check size={24} />
        </div>
        <h3 className="font-display text-xl font-bold text-[var(--invert)] mb-2">
          Got it — you’re on the list.
        </h3>
        <p className="text-sm font-sans text-[var(--invert-soft)] max-w-sm mx-auto">
          I’ll reach out shortly to lock in your 15-minute slot and show the
          assistant working on your own website.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--ink-line)] bg-[var(--ink-2)] p-6 sm:p-7 text-left flex flex-col gap-4"
    >
      {/* Honeypot — hidden from humans, bots fill it and get silently dropped */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-sans font-semibold text-[var(--invert-soft)] mb-1.5">
            Name *
          </label>
          <input id="name" name="name" type="text" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className="block text-xs font-sans font-semibold text-[var(--invert-soft)] mb-1.5">
            Company
          </label>
          <input id="company" name="company" type="text" placeholder="Acme Inc." className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-sans font-semibold text-[var(--invert-soft)] mb-1.5">
            Email *
          </label>
          <input id="email" name="email" type="email" required placeholder="jane@acme.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-sans font-semibold text-[var(--invert-soft)] mb-1.5">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-sans font-semibold text-[var(--invert-soft)] mb-1.5">
          Anything you want me to know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="e.g. We get a lot of after-hours traffic and miss leads overnight."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-sans text-[#ff9a6a]" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-amber inline-flex items-center justify-center gap-2 px-7 py-4 font-sans font-bold text-sm rounded-lg hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200 group disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {status === "submitting" ? "Sending…" : "Book my 15-min demo"}
        {status !== "submitting" && (
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
        )}
      </button>

      <p className="text-xs font-sans text-[var(--invert-soft)]/70 text-center">
        No pressure, no spam. I’ll show it working on your site before you pay a thing.
      </p>
    </form>
  );
}
