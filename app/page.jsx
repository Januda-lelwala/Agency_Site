import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChatDemo from "@/components/ChatDemo";
import TrustBar from "@/components/TrustBar";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const steps = [
  {
    n: "1",
    title: "Trained on your business",
    body: "We feed it your services, pricing ballparks, service area and hours — so every answer sounds like your shop, not a generic bot.",
  },
  {
    n: "2",
    title: "Qualifies and books",
    body: "It asks the right questions, figures out if it’s a real job, and drops the appointment straight into your calendar.",
  },
  {
    n: "3",
    title: "Pings your phone instantly",
    body: "You get a text the moment a job is booked — name, problem, time. You wake up to work already on the schedule.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── HERO + LIVE DEMO ── the one place we spend our boldness ── */}
      <section className="relative bg-[var(--ink)] overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-40 pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(255,122,24,0.18), transparent 65%)" }}
        />
        <Hero />
        <div className="relative pb-20 sm:pb-28 px-5 sm:px-8">
          <ChatDemo />
          <TrustBar />
        </div>
      </section>

      {/* ── THE PROBLEM (agitate) ── the only scroll-reveal on the page ── */}
      <section className="section-padding bg-[var(--paper)]">
        <div className="max-w-3xl mx-auto site-gutter">
          <Reveal>
            <span className="eyebrow amber-text mb-6">The 9pm problem</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[var(--text)] leading-[1.1] tracking-tight mb-7 text-balance">
              It’s 9:14 PM. A homeowner’s AC just died — and you’ll never know they came.
            </h2>
            <div className="space-y-5 text-base sm:text-lg font-sans text-[var(--text-soft)] leading-relaxed">
              <p>
                They land on your site sweating, hit a contact form, and get
                silence. So they back out and message the next three HVAC
                companies on Google. Whoever answers first wins the job.
              </p>
              <p className="text-[var(--text)] font-medium">
                You paid for that click. You just lost the job — and you never
                even saw it happen.
              </p>
              <p>
                It happens every evening, every weekend, every holiday. The
                leads don’t stop coming after 5 PM. Your phone just stops
                answering them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS (3 steps) ── */}
      <section className="section-padding bg-[var(--paper-2)] border-y border-[var(--line)]">
        <div className="max-w-5xl mx-auto site-gutter">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow amber-text mb-6">How it works</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] leading-[1.1] tracking-tight text-balance">
              Three steps. Then it runs itself.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col gap-4 p-7 bg-[var(--paper)] border border-[var(--line)] rounded-2xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--amber-soft)] text-[var(--amber-deep)] font-display font-extrabold text-lg">
                  {s.n}
                </span>
                <h3 className="font-display text-lg font-bold text-[var(--text)] leading-snug">{s.title}</h3>
                <p className="text-sm font-sans text-[var(--text-soft)] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY IT BEATS A $40 WIDGET (objection handling) ── */}
      <section className="section-padding bg-[var(--paper)]">
        <div className="max-w-5xl mx-auto site-gutter grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="eyebrow amber-text mb-6">Not another chat widget</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] leading-[1.1] tracking-tight mb-6 text-balance">
              A $40 widget chats. This one books.
            </h2>
            <p className="text-base sm:text-lg font-sans text-[var(--text-soft)] leading-relaxed mb-4">
              You’ve seen the cheap bots that reply “Sorry, I didn’t understand
              that” and dump the visitor right back where they started. That
              isn’t this.
            </p>
            <p className="text-base sm:text-lg font-sans text-[var(--text-soft)] leading-relaxed">
              Nightshift is trained on your real business and wired directly to
              your calendar. It doesn’t just answer — it qualifies the lead and
              puts the job on your schedule. The difference between a toy and a
              booked job is the booking.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper-2)] p-7 sm:p-8">
            <div className="grid grid-cols-2 gap-px bg-[var(--line)] rounded-xl overflow-hidden text-sm font-sans">
              <div className="bg-[var(--paper)] p-4 font-bold text-[var(--text-soft)]">$40 widget</div>
              <div className="bg-[var(--paper)] p-4 font-bold text-[var(--text)]">Nightshift</div>
              {[
                ["Canned, scripted replies", "Trained on your real business"],
                ["“I didn’t understand that”", "Asks, qualifies, confirms"],
                ["Leaves a message", "Books the job in your calendar"],
                ["You follow up tomorrow", "Texts you the second it books"],
              ].map(([a, b]) => (
                <ContrastRow key={b} a={a} b={b} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE MATH (ROI) ── */}
      <section className="section-padding bg-[var(--ink)] text-[var(--invert)]">
        <div className="max-w-3xl mx-auto site-gutter text-center">
          <span className="eyebrow amber-text mb-6">The math</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-[1.1] tracking-tight mb-6 text-balance">
            One recovered job usually pays for the whole thing.
          </h2>
          <p className="text-base sm:text-lg font-sans text-[var(--invert-soft)] leading-relaxed mb-10 max-w-xl mx-auto">
            Plug in your own numbers. If even a handful of after-hours leads slip
            away each month, the math gets obvious fast.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            {[
              { k: "Leads lost after 5 PM", v: "8 / mo", note: "Conservative for most shops" },
              { k: "Your average job", v: "$420", note: "Repair or install ticket" },
              { k: "Recovered if you catch half", v: "$1,680", note: "Every single month" },
            ].map((c) => (
              <div key={c.k} className="rounded-2xl border border-[var(--ink-line)] bg-[var(--ink-2)] p-6">
                <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[var(--invert-soft)] mb-3">{c.k}</p>
                <p className="font-display text-3xl font-extrabold amber-text mb-1.5 tabular-nums">{c.v}</p>
                <p className="text-xs font-sans text-[var(--invert-soft)]">{c.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm font-sans text-[var(--invert-soft)]">
            The rest is profit — and it runs every night without you.
          </p>
        </div>
      </section>

      {/* ── FAQ (kills the fears) ── */}
      <section className="section-padding bg-[var(--paper)]">
        <div className="max-w-3xl mx-auto site-gutter">
          <div className="mb-10">
            <span className="eyebrow amber-text mb-6">Questions</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] leading-[1.1] tracking-tight text-balance">
              The stuff you’re actually wondering.
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}

function ContrastRow({ a, b }) {
  return (
    <>
      <div className="bg-[var(--paper)] p-4 text-[var(--text-soft)]">{a}</div>
      <div className="bg-[var(--paper)] p-4 text-[var(--text)] font-medium">{b}</div>
    </>
  );
}
