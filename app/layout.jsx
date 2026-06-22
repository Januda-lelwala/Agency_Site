import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://nightshift.example.com"),
  title: {
    default: "Nightshift — Booked HVAC jobs while you sleep",
    template: "%s | Nightshift",
  },
  description:
    "Nightshift is an AI assistant that answers, qualifies, and books every HVAC lead that hits your site after hours — 24/7, with no changes to your website.",
  creator: "Nightshift",
  publisher: "Nightshift",
  keywords: [
    "HVAC lead capture",
    "after hours answering for HVAC",
    "HVAC booking assistant",
    "AI receptionist for HVAC",
    "24/7 HVAC lead booking",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Nightshift — Booked HVAC jobs while you sleep",
    description:
      "An AI assistant that answers, qualifies, and books every HVAC lead after hours. No website changes. Live in days.",
    url: "https://nightshift.example.com",
    siteName: "Nightshift",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nightshift — Booked HVAC jobs while you sleep",
    description:
      "An AI assistant that books every after-hours HVAC lead. See it work on a 15-min demo.",
  },
};

export const viewport = {
  themeColor: "#0b1120",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
