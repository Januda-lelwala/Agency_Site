import Link from "next/link";
import { ArrowRight } from "./icons";

export default function Hero() {
  return (
    <section className="relative bg-[var(--ink)] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(108,92,231,0.55), transparent 65%)" }}
      />
      <div
        className="absolute -bottom-48 -right-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-35"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(24,198,207,0.45), transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto site-gutter pt-36 sm:pt-44 pb-20 sm:pb-28">
        <span className="eyebrow text-white/55 mb-7">AI Automation Studio</span>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-[5rem] font-bold leading-[1.02] tracking-tight mb-7 max-w-4xl">
          Automate the busywork.{" "}
          <span className="accent-text">Scale what matters.</span>
        </h1>

        <p className="max-w-xl text-base sm:text-lg font-sans text-white/65 leading-relaxed mb-10">
          We design and ship custom AI tools, workflow automation, and outbound
          systems — tuned to how your business actually runs, and live in weeks
          instead of quarters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="grad-accent inline-flex items-center justify-center gap-2 px-7 py-4 text-white font-sans font-semibold text-sm rounded-lg hover:shadow-[0_16px_40px_-12px_rgba(108,92,231,0.85)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
          >
            Start a project
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/15 bg-white/5 text-white font-sans font-medium text-sm rounded-lg hover:bg-white/10 hover:border-white/25 transition-all duration-200"
          >
            See what we build
          </Link>
        </div>
      </div>
    </section>
  );
}
