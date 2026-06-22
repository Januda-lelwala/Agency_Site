import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute working session with Northbound AI and leave with a concrete, prioritized AI automation roadmap.",
};

const points = [
  {
    title: "A free 30-minute session",
    body: "No cost, no obligation — a focused conversation about your business and where AI fits.",
  },
  {
    title: "A prioritized roadmap",
    body: "Walk away with clear, ranked recommendations tailored to how you actually operate.",
  },
  {
    title: "Zero sales pressure",
    body: "We'll tell you honestly whether AI moves the needle — even when the answer is 'not yet.'",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="absolute -bottom-32 left-0 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-35"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(108,92,231,0.5), transparent 65%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto site-gutter pt-36 sm:pt-44 pb-16 sm:pb-20">
          <span className="eyebrow text-white/55 mb-7">Start a project</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight mb-6 max-w-3xl">
            Let&apos;s build something{" "}
            <span className="accent-text">smarter together.</span>
          </h1>
          <p className="max-w-xl text-base sm:text-lg font-sans text-white/65 leading-relaxed">
            Tell us a little about your business and what you&apos;re trying to
            achieve. We&apos;ll reach out to set up your free working session.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[var(--surface-2)]">
        <div className="max-w-7xl mx-auto site-gutter grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <span className="eyebrow text-[var(--accent)] mb-5">What to expect</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)] leading-[1.1] tracking-tight mb-8">
              How your free <span className="accent-text">session works.</span>
            </h2>
            <ul className="flex flex-col gap-6">
              {points.map((point, i) => (
                <li key={point.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-lg grad-accent text-white font-display font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[var(--text)] tracking-tight mb-1">
                      {point.title}
                    </h3>
                    <p className="text-sm font-sans text-[var(--text-soft)] leading-relaxed">
                      {point.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-[var(--line)]">
              <p className="text-sm font-sans text-[var(--text-soft)] mb-2">Prefer email?</p>
              <a
                href="mailto:hello@northbound.example.com"
                className="font-display text-lg font-semibold accent-text hover:opacity-80 transition-opacity"
              >
                hello@northbound.example.com
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
