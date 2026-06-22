import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Northbound AI.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="pt-32 sm:pt-40 pb-20 bg-white flex-1">
        <div className="max-w-3xl mx-auto site-gutter">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-sm font-sans text-[var(--text-soft)] leading-relaxed">
            This is placeholder content. Replace it with your actual terms of
            service outlining the rules and conditions for using your website and
            services.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
