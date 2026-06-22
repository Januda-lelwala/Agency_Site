import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { ArrowRightSmall } from "@/components/icons";

export const metadata = {
  title: "Services",
  description:
    "Custom AI tools, workflow automation, outbound systems, and AI strategy — built around your business and shipped in weeks.",
};

const services = [
  {
    number: "01",
    title: "Custom AI tools",
    body: "Bespoke AI applications built around your exact workflow — internal copilots, document processors, customer-facing assistants. Tools that do the work your team shouldn't have to.",
    points: ["Copilots & internal assistants", "Document & data processing", "Customer-facing chat & support"],
  },
  {
    number: "02",
    title: "Workflow automation",
    body: "We wire your tools together and automate the repetitive work draining your team — routing, follow-ups, onboarding, reporting. Less busywork, more time on what grows the business.",
    points: ["Lead routing & CRM automation", "Onboarding & follow-up flows", "Reporting & data syncing"],
  },
  {
    number: "03",
    title: "Outbound systems",
    body: "AI-powered outbound that identifies your ideal buyers, personalizes at scale, and books qualified conversations on autopilot — keeping the pipeline full without manual prospecting.",
    points: ["Ideal-customer targeting", "Personalization at scale", "Deliverability & inbox health"],
  },
  {
    number: "04",
    title: "AI strategy & advisory",
    body: "Not sure where AI fits? We audit your operations, surface the highest-ROI opportunities, and hand you a prioritized roadmap — so every dollar lands where it matters most.",
    points: ["Operations & opportunity audit", "Prioritized AI roadmap", "Ongoing partnership & support"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="absolute -top-32 -right-20 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-35"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(24,198,207,0.45), transparent 65%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto site-gutter pt-36 sm:pt-44 pb-16 sm:pb-20">
          <span className="eyebrow text-white/55 mb-7">What we build</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight mb-6 max-w-3xl">
            AI systems, built{" "}
            <span className="accent-text">around your business.</span>
          </h1>
          <p className="max-w-xl text-base sm:text-lg font-sans text-white/65 leading-relaxed">
            Every business runs differently, so every build is custom. Here&apos;s
            how we help teams automate the repetitive, accelerate the valuable,
            and grow faster.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[var(--surface-2)]">
        <div className="max-w-7xl mx-auto site-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {services.map((service, i) => (
              <Reveal
                key={service.number}
                delay={(i % 2) * 100}
                className="group relative flex flex-col gap-5 p-7 sm:p-9 bg-[var(--surface)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--accent-line)] hover:shadow-[0_24px_50px_-28px_rgba(108,92,231,0.6)] hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <span className="absolute top-0 left-0 h-1 w-0 grad-accent group-hover:w-full transition-all duration-500" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-bold accent-text">{service.number}</span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-[var(--text)] leading-snug tracking-tight">
                  {service.title}
                </h2>
                <p className="text-sm font-sans text-[var(--text-soft)] leading-relaxed">
                  {service.body}
                </p>
                <ul className="flex flex-col gap-2.5 mt-1">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-sans text-[var(--text)]/80">
                      <span className="flex-shrink-0 w-5 h-5 rounded-md grad-accent flex items-center justify-center text-white">
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[var(--accent)] hover:gap-2.5 transition-all duration-200 mt-2"
                >
                  Talk to us about this
                  <ArrowRightSmall />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
