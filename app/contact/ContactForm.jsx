"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/icons";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] text-sm font-sans text-[var(--text)] placeholder:text-[var(--text-soft)]/60 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire this up to your email service / CRM / form backend.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 bg-[var(--surface)] border border-[var(--accent-line)] rounded-2xl">
        <div className="w-14 h-14 rounded-full grad-accent text-white flex items-center justify-center mb-5">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-[var(--text)] mb-2">
          Thanks — we&apos;ll be in touch!
        </h3>
        <p className="text-sm font-sans text-[var(--text-soft)] max-w-sm">
          We&apos;ve got your details and will reach out shortly to set up your
          free working session.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-7 sm:p-8 bg-[var(--surface)] border border-[var(--line)] rounded-2xl shadow-sm flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-sans font-semibold text-[var(--text)] mb-1.5 tracking-wide">
            Name
          </label>
          <input id="name" name="name" type="text" required placeholder="Jane Doe" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className="block text-xs font-sans font-semibold text-[var(--text)] mb-1.5 tracking-wide">
            Company
          </label>
          <input id="company" name="company" type="text" placeholder="Acme Inc." className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-sans font-semibold text-[var(--text)] mb-1.5 tracking-wide">
          Email
        </label>
        <input id="email" name="email" type="email" required placeholder="jane@acme.com" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-sans font-semibold text-[var(--text)] mb-1.5 tracking-wide">
          What are you hoping to achieve?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us a little about your business and where AI might help..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="grad-accent inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-sans font-semibold text-sm rounded-lg hover:shadow-[0_16px_40px_-12px_rgba(108,92,231,0.85)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group mt-1"
      >
        Request my free session
        <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
      </button>

      <p className="text-xs font-sans text-[var(--text-soft)]/70 text-center">
        We&apos;ll never share your information. No spam, ever.
      </p>
    </form>
  );
}
