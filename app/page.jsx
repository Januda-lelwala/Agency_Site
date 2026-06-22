import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { ArrowRightSmall } from "@/components/icons";

const cards = [
  {
    number: "01",
    title: "What we build",
    href: "/services",
    cta: "Explore services",
    body: "Custom AI tools, workflow automation, and outbound systems — engineered around your stack, not bolted on top of it.",
  },
  {
    number: "02",
    title: "How we work",
    href: "/about",
    cta: "Meet the studio",
    body: "Senior builders, short feedback loops, working software in weeks. No bloated retainers, no vendor runaround.",
  },
  {
    number: "03",
    title: "Start a project",
    href: "/contact",
    cta: "Book a session",
    body: "Begin with a free 30-minute working session and leave with a concrete, prioritized automation roadmap.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <TrustBar />

      <section className="section-padding bg-[var(--surface-2)]">
        <div className="max-w-7xl mx-auto site-gutter">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow text-[var(--accent)] mb-5">What we do</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--text)] leading-[1.08] tracking-tight">
              AI that earns its keep —{" "}
              <span className="accent-text">built for your business.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {cards.map((card, i) => (
              <Reveal key={card.href} delay={i * 100}>
                <Link
                  href={card.href}
                  className="group relative flex flex-col h-full gap-5 p-7 sm:p-8 bg-[var(--surface)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--accent-line)] hover:shadow-[0_24px_50px_-28px_rgba(108,92,231,0.6)] hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                  <span className="absolute top-0 left-0 h-1 w-0 grad-accent group-hover:w-full transition-all duration-500" />
                  <span className="font-display text-3xl font-bold text-[var(--line)] group-hover:accent-text transition-colors">
                    {card.number}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[var(--text)] leading-snug tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm font-sans text-[var(--text-soft)] leading-relaxed flex-1">
                    {card.body}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[var(--accent)] group-hover:gap-2.5 transition-all duration-200">
                    {card.cta}
                    <ArrowRightSmall />
                  </span>
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
