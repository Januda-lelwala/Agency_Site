import Link from "next/link";
import { Moon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-[var(--ink-3)] text-[var(--invert-soft)] border-t border-[var(--ink-line)]">
      <div className="max-w-3xl mx-auto site-gutter py-12 flex flex-col items-center text-center gap-5">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Nightshift home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--amber)] text-[#1a0e02]">
            <Moon size={16} />
          </span>
          <span className="font-display font-extrabold text-[var(--invert)] text-lg tracking-tight">
            Nightshift
          </span>
        </Link>

        {/* A real business name, physical address and contact email are required
            for CAN-SPAM-compliant cold email. Replace the placeholders below. */}
        <address className="not-italic text-sm font-sans leading-relaxed">
          Nightshift Automation LLC
          <br />
          123 Main Street, Suite 200, Austin, TX 78701
          <br />
          <a href="mailto:hello@nightshift.example.com" className="hover:text-[var(--invert)] transition-colors">
            hello@nightshift.example.com
          </a>
        </address>

        <div className="flex items-center gap-5 text-xs font-sans">
          <Link href="/privacy" className="hover:text-[var(--invert)] transition-colors">
            Privacy Policy
          </Link>
          <span aria-hidden="true">·</span>
          <a href="#book" className="hover:text-[var(--invert)] transition-colors">
            Book a demo
          </a>
        </div>

        <p className="text-xs font-sans text-[var(--invert-soft)]/70">
          © {new Date().getFullYear()} Nightshift Automation LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
