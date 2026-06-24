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
    default: "Nightshift — AI chatbots that turn your website into a 24/7 sales rep",
    template: "%s | Nightshift",
  },
  description:
    "Nightshift builds custom AI chatbots for your website — they answer questions, qualify visitors, and book meetings around the clock, so you never lose another lead after hours.",
  creator: "Nightshift",
  publisher: "Nightshift",
  keywords: [
    "AI chatbot for website",
    "website chatbot automation",
    "AI lead capture chatbot",
    "custom AI chatbot service",
    "24/7 AI assistant for business",
    "AI chatbot that books meetings",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Nightshift — AI chatbots that turn your website into a 24/7 sales rep",
    description:
      "Custom AI chatbots that answer, qualify, and book on your website around the clock. No code on your end. Live in days.",
    url: "https://nightshift.example.com",
    siteName: "Nightshift",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nightshift — AI chatbots that turn your website into a 24/7 sales rep",
    description:
      "A custom AI chatbot that captures and books leads on your website 24/7. See it work on a 15-min demo.",
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
