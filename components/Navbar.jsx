import Link from "next/link";
import { Moon } from "./icons";

/**
 * Deliberately minimal: no nav links, no menu. One page, one path —
 * every element funnels toward the demo / booking. The only action here
 * is the booking CTA.
 */
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--ink)]/85 backdrop-blur-md border-b border-[var(--ink-line)]">
      <nav className="max-w-6xl mx-auto site-gutter h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 min-w-0" aria-label="Nightshift home">
          {/* Drop your real logo at /public/images/logo.svg to replace this mark */}
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--amber)] text-[#1a0e02]">
            <Moon size={16} />
          </span>
          <span className="font-display font-extrabold text-[var(--invert)] text-lg tracking-tight">
            Nightshift
          </span>
        </Link>

        <a
          href="#book"
          className="btn-amber px-4 py-2 text-sm font-sans font-bold rounded-lg hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200 whitespace-nowrap"
        >
          Book a demo
        </a>
      </nav>
    </header>
  );
}
