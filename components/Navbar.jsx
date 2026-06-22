"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      {/* Drop your real logo at /public/images/logo.svg to replace this mark */}
      <span className="flex h-9 w-9 items-center justify-center rounded-lg grad-accent text-white font-display font-bold text-base shadow-[0_6px_16px_-6px_rgba(108,92,231,0.7)]">
        N
      </span>
      <span className="font-display font-bold text-[var(--text)] text-lg tracking-tight">
        Northbound<span className="accent-text">.ai</span>
      </span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--surface)]/85 backdrop-blur-md border-b border-[var(--line)]">
      <nav className="max-w-7xl mx-auto site-gutter h-20 flex items-center justify-between gap-3">
        <Link href="/" className="flex-shrink-0 min-w-0">
          <Logo />
        </Link>

        <ul className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-sans font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-soft)] hover:text-[var(--text)]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="grad-accent px-5 py-2.5 text-white text-sm font-sans font-semibold rounded-lg hover:shadow-[0_10px_24px_-8px_rgba(108,92,231,0.8)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Start a project
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-3 -mr-1 min-w-[44px] min-h-[44px] items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 bg-[var(--text)] transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[var(--text)] transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[var(--text)] transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--surface)]">
          <ul className="site-gutter py-4 flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-sm font-sans font-medium ${
                    isActive(link.href) ? "text-[var(--accent)]" : "text-[var(--text)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block text-center grad-accent px-5 py-3 text-white text-sm font-sans font-semibold rounded-lg"
              >
                Start a project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
