import Link from "next/link";
import { Moon } from "@/components/icons";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Nightshift.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-[var(--ink)] border-b border-[var(--ink-line)]">
        <div className="max-w-3xl mx-auto site-gutter h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Nightshift home">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--amber)] text-[#1a0e02]">
              <Moon size={16} />
            </span>
            <span className="font-display font-extrabold text-[var(--invert)] text-lg tracking-tight">
              Nightshift
            </span>
          </Link>
        </div>
      </header>

      <section className="py-16 sm:py-20 bg-[var(--paper)] flex-1">
        <div className="max-w-3xl mx-auto site-gutter">
          <Link href="/" className="text-sm font-sans font-semibold text-[var(--amber)] hover:underline underline-offset-4">
            ← Back to home
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight mt-5 mb-6">
            Privacy Policy
          </h1>
          <div className="space-y-4 text-sm sm:text-base font-sans text-[var(--text-soft)] leading-relaxed">
            <p>
              This is placeholder content. Replace it with your actual privacy
              policy before going live — it’s required for compliant cold email.
              At minimum, describe what data you collect (e.g. name, email,
              messages sent to the assistant), how it’s used, who it’s shared
              with, and how visitors can opt out or contact you about their
              information.
            </p>
            <p>
              Include a clear way to reach you: Nightshift Automation LLC, 123
              Main Street, Suite 200, Austin, TX 78701,{" "}
              <a href="mailto:hello@nightshift.example.com" className="text-[var(--amber)] hover:underline underline-offset-4">
                hello@nightshift.example.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
