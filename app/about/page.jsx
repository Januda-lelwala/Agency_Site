import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About",
  description:
    "Northbound AI is an automation studio built on speed to ship, precise targeting, clean integration, and measurable ROI.",
};

const features = [
  {
    title: "Speed to ship",
    body: "Working AI systems go live in weeks, not quarters. You get an edge while competitors are still scoping vendors.",
    icon: (
      <>
        <path d="M10 2v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
  {
    title: "Precise targeting",
    body: "Our outbound systems find and engage your exact buyers — booking qualified conversations, not vanity opens.",
    icon: (
      <>
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Clean integration",
    body: "We build into the tools you already use. Nothing gets ripped out — your stack just gets smarter and faster.",
    icon: (
      <path d="M7 10h6M4 6l-2 4 2 4M16 6l2 4-2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Measurable ROI",
    body: "Every system is tied to real outcomes — leads, conversions, hours saved. You always know what it returns.",
    icon: (
      <>
        <path d="M3 14l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
];

const clients = [
  {
    title: "Small business owners",
    body: "Operators who want to kill repetitive manual work, close faster, and run leaner — without hiring a full team.",
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Growing SMBs",
    body: "Teams scaling output without scaling headcount — we plug AI into your operations so you grow smarter, not just bigger.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12v4M10 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Sales-driven companies",
    body: "B2B teams that live on outbound and need a systematic, AI-powered engine filling the pipeline on autopilot.",
    icon: (
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Service businesses",
    body: "Agencies, consultants, and pro-services firms automating intake, follow-up, onboarding, and delivery to reclaim hours.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Tech-forward startups",
    body: "Early and growth-stage teams that want enterprise-grade AI infrastructure from day one — without an in-house AI team.",
    icon: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Marketing & growth teams",
    body: "Demand-gen and BD teams that need AI to personalize at scale, prioritize high-intent leads, and stretch every dollar.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="absolute -top-32 right-0 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-35"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(108,92,231,0.5), transparent 65%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto site-gutter pt-36 sm:pt-44 pb-16 sm:pb-20">
          <span className="eyebrow text-white/55 mb-7">Our story</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight mb-6 max-w-3xl">
            An automation studio built to{" "}
            <span className="accent-text">move you forward.</span>
          </h1>
          <p className="max-w-xl text-base sm:text-lg font-sans text-white/65 leading-relaxed">
            Northbound AI started from a simple conviction: serious AI
            infrastructure shouldn&apos;t be reserved for enterprises. It should be
            accessible, shipped fast, and run by a partner who actually cares
            about your numbers.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="relative bg-[var(--ink-2)] text-white overflow-hidden section-padding">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-7xl mx-auto site-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal variant="left">
              <span className="eyebrow text-white/55 mb-6">Why Northbound</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight mb-6">
                Your business is ready for{" "}
                <span className="accent-text">smarter operations.</span>
              </h2>
              <p className="text-[0.97rem] font-sans text-white/70 leading-relaxed max-w-lg">
                The businesses winning right now aren&apos;t the ones with the
                biggest teams or budgets. They&apos;re the ones deploying AI with
                intent — automating the repetitive, accelerating the valuable, and
                staying two moves ahead.
              </p>
              <p className="mt-4 text-[0.97rem] font-sans text-white/70 leading-relaxed max-w-lg">
                We exist to make that level of infrastructure reachable for any
                business — built custom, shipped fast, and maintained by people
                invested in your results.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-sans font-semibold text-white border-b-2 border-[var(--accent)] pb-0.5 hover:text-[var(--accent-2)] transition-colors group"
              >
                See how we can help
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {features.map((feature, i) => (
                <Reveal
                  key={feature.title}
                  variant="right"
                  delay={i * 80}
                  className="p-5 sm:p-6 bg-white/[0.04] border border-white/10 rounded-2xl hover:bg-white/[0.07] hover:border-[var(--accent)]/40 hover:-translate-y-1 transition-all duration-300 ease-out group"
                >
                  <div className="w-10 h-10 rounded-lg grad-accent flex items-center justify-center text-white mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-base text-white mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-sans text-white/60 leading-relaxed">
                    {feature.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section-padding bg-[var(--surface-2)]">
        <div className="max-w-7xl mx-auto site-gutter">
          <Reveal className="max-w-2xl mb-14">
            <span className="eyebrow text-[var(--accent)] mb-5">Who we serve</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--text)] leading-[1.08] tracking-tight mb-4">
              Built for <span className="accent-text">ambitious teams.</span>
            </h2>
            <p className="text-[0.97rem] font-sans text-[var(--text-soft)] leading-relaxed">
              We partner with owners and operators across every industry who are
              ready to actually use AI — not just talk about it.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {clients.map((client, i) => (
              <Reveal
                key={client.title}
                delay={(i % 3) * 100}
                className="flex gap-4 sm:gap-5 p-5 sm:p-6 lg:p-7 bg-[var(--surface)] border border-[var(--line)] rounded-2xl hover:border-[var(--accent-line)] hover:shadow-[0_20px_44px_-26px_rgba(108,92,231,0.55)] hover:-translate-y-1 transition-all duration-300 ease-out group"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center text-[var(--accent)] group-hover:grad-accent group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    {client.icon}
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-[var(--text)] mb-1.5 sm:mb-2 tracking-tight">
                    {client.title}
                  </h3>
                  <p className="text-sm font-sans text-[var(--text-soft)] leading-relaxed">
                    {client.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 rounded-3xl grad-accent p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="font-display text-xl sm:text-2xl font-semibold text-white leading-snug max-w-xl">
              Not sure if AI can move the needle for you? Let&apos;s find out — for
              free.
            </p>
            <Link
              href="/contact"
              className="w-full md:w-auto flex-shrink-0 px-8 py-4 bg-white text-[var(--text)] font-sans font-semibold text-sm rounded-lg text-center hover:bg-white/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg"
            >
              Book your free call
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
