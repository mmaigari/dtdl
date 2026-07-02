import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ExpressInterestProvider from "@/components/ExpressInterestProvider";
import FloatingContact from "@/components/FloatingContact";
import PageTransition from "@/components/PageTransition";
import { MAINTENANCE_MODE } from "@/lib/config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dantatatown.com"),
  title: {
    default:
      "Dantata Town Developers — Master-Planned Communities Across Nigeria",
    template: "%s | Dantata Town Developers",
  },
  description:
    "Dantata Town Developers Limited is an infrastructure-led real estate developer building master-planned communities across Abuja and Kano — roads, power, water, drainage and security, all delivered to a single vision.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Dantata Town Developers",
    title: "Dantata Town Developers — The Trusting Development",
    description:
      "Infrastructure-led real estate developer building master-planned communities across Nigeria.",
    images: [{ url: "/hero1.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dantata Town Developers",
    description: "Infrastructure-led real estate development across Nigeria.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (MAINTENANCE_MODE) {
    return (
      <html lang="en">
        <body
          className={`${fraunces.variable} ${manrope.variable} ${jetbrains.variable} antialiased font-sans`}
        >
          <ExpressInterestProvider>{children}</ExpressInterestProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${jetbrains.variable} antialiased font-sans`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll />
        <ExpressInterestProvider>
          <Navbar />
          <main id="main-content" className="relative z-[1]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingContact />
        </ExpressInterestProvider>
      </body>
    </html>
  );
}
