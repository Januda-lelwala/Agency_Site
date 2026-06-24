import LeadForm from "./LeadForm";

export default function CTASection() {
  return (
    <section id="book" className="relative bg-[var(--ink)] text-[var(--invert)] overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 115%, rgba(255,122,24,0.22), transparent 60%)" }}
      />
      <div className="relative z-10 max-w-xl mx-auto site-gutter py-20 sm:py-28 text-center">
        <span className="eyebrow text-[var(--amber)] mb-6">See it on your own site</span>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-[1.08] tracking-tight mb-5 text-balance">
          Book a 15-min demo. I’ll show it{" "}
          <span className="amber-text">working on your website</span> before you pay a thing.
        </h2>
        <p className="text-sm sm:text-base font-sans text-[var(--invert-soft)] leading-relaxed mb-9 max-w-lg mx-auto">
          No slides, no pressure. You watch the exact assistant catch and book a
          lead on your own website — then decide.
        </p>

        <LeadForm />

        <p className="mt-6 text-sm font-sans text-[var(--invert-soft)]">
          Prefer to kick the tires first?{" "}
          <a href="#demo" className="text-[var(--amber)] font-semibold hover:underline underline-offset-4">
            Talk to the assistant
          </a>
          .
        </p>
      </div>
    </section>
  );
}
