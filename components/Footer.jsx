import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="max-w-7xl mx-auto site-gutter py-12 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg grad-accent text-white font-display font-bold text-base">
            N
          </span>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            Northbound<span className="accent-text">.ai</span>
          </span>
        </Link>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-6 text-sm font-sans text-white/55">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col items-center sm:items-end gap-1.5">
          <div className="flex gap-4 text-xs font-sans text-white/40">
            <Link href="/privacy" className="hover:text-white/80 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80 transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-xs font-sans text-white/40">
            © {new Date().getFullYear()} Northbound AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
