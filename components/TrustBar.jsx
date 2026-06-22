const stats = [
  { value: "2–4 wks", label: "From kickoff to live" },
  { value: "100%", label: "Custom-built for you" },
  { value: "ROI-led", label: "Measured on outcomes" },
  { value: "Hands-on", label: "Direct, senior partnership" },
];

export default function TrustBar() {
  return (
    <section className="bg-[var(--surface)] border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto site-gutter py-9 sm:py-11">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
          {stats.map((stat) => (
            <div key={stat.label} className="px-0 md:px-8 py-4 md:py-0 first:md:pl-0">
              <p className="font-display text-2xl sm:text-3xl font-bold accent-text tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm font-sans text-[var(--text-soft)] leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
