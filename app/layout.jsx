import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://northbound.example.com"),
  title: {
    default: "Northbound AI | AI Automation Studio",
    template: "%s | Northbound AI",
  },
  description:
    "Northbound AI is an automation studio that builds custom AI tools, workflow automation, and outbound systems — shipped fast and tuned to your business.",
  creator: "Northbound AI",
  publisher: "Northbound AI",
  keywords: [
    "AI automation studio",
    "AI workflow automation",
    "custom AI tools",
    "outbound automation",
    "business automation",
    "AI consulting",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Northbound AI | AI Automation Studio",
    description:
      "Northbound AI builds custom AI tools, workflow automation, and outbound systems that help businesses move faster.",
    url: "https://northbound.example.com",
    siteName: "Northbound AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Northbound AI | AI Automation Studio",
    description:
      "Custom AI tools, workflow automation, and outbound systems for ambitious businesses.",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c18" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
