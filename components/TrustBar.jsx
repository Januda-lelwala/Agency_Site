import { Check } from "./icons";

/* Honest, factual reassurance — not fake testimonials. The working demo above
   is the real proof; this just answers the instant objections. */
const points = ["Works on any website", "No website changes", "Live in days", "You keep every lead"];

export default function TrustBar() {
  return (
    <div className="relative z-10 max-w-3xl mx-auto site-gutter pt-10 sm:pt-12">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-[var(--invert-soft)]">
            <span className="text-[var(--amber)]">
              <Check size={15} />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
