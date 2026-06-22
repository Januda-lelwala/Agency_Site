import { ArrowDown } from "./icons";

export default function Hero() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto site-gutter pt-28 sm:pt-32 pb-8 sm:pb-10 text-center">
      <span className="eyebrow text-[var(--amber)] mb-6">For HVAC company owners</span>

      <h1 className="font-display text-[2.7rem] leading-[1.04] sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--invert)] mb-6 max-w-4xl mx-auto text-balance">
        Booked jobs <span className="amber-text">while you sleep.</span>
      </h1>

      <p className="max-w-xl mx-auto text-base sm:text-lg font-sans text-[var(--invert-soft)] leading-relaxed mb-9">
        Nightshift answers, qualifies, and books every HVAC lead that hits your
        site after hours — 24/7, with no changes to your website.
      </p>

      <a
        href="#demo"
        className="btn-amber inline-flex items-center justify-center gap-2 px-7 py-4 font-sans font-bold text-sm sm:text-base rounded-lg hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200 group"
      >
        Talk to the assistant
        <ArrowDown className="group-hover:translate-y-0.5 transition-transform duration-200" />
      </a>
    </div>
  );
}
