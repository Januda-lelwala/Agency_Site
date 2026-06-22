import Link from "next/link";
import { ArrowRight } from "./icons";

export default function CTASection() {
  return (
    <section className="relative bg-[var(--ink)] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(108,92,231,0.45), transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto site-gutter py-20 sm:py-24 text-center">
        <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight tracking-tight mb-5">
          Ready to ship your first{" "}
          <span className="accent-text">AI system?</span>
        </h2>
        <p className="text-sm sm:text-base font-sans text-white/65 leading-relaxed mb-9 max-w-xl mx-auto">
          Book a free 30-minute working session. We&apos;ll map the highest-impact
          automation for your business — no commitment, no fluff.
        </p>
        <Link
          href="/contact"
          className="grad-accent inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-sans font-semibold text-sm rounded-lg hover:shadow-[0_16px_40px_-12px_rgba(108,92,231,0.85)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
        >
          Book a working session
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </section>
  );
}
