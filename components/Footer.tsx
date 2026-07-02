"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import PageContainer from "@/components/PageContainer";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Careers", href: "/careers" },
    { label: "Investors", href: "/investors" },
    { label: "Infrastructure", href: "/infrastructure" },
  ],
  projects: [
    { label: "Dantata Housing Estate", href: "/projects/dantata-housing-estate" },
    { label: "The District by Dantata", href: "/projects/the-district-by-dantata" },
    { label: "Dantata City", href: "/projects/dantata-city" },
    { label: "The Residence by Dantata", href: "/projects/the-residence-by-dantata" },
    { label: "All Projects", href: "/projects" },
  ],
  resources: [
    { label: "Schedule a Visit", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    console.log("[newsletter] subscribe", email);
    setStatus("ok");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <footer className="relative bg-ink text-cream/70" role="contentinfo">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <PageContainer className="py-24">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-cream/10">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="display-serif text-3xl text-cream tracking-tight"
            >
              Dantata Town<span className="text-maroon-300">.</span>
            </Link>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed">
              The Trusting Development. Building master-planned communities across Abuja and Kano since 2012 — born from the Dantata &amp; Sawoe construction legacy.
            </p>

            <form onSubmit={onSubmit} className="mt-8 max-w-md">
              <label className="block font-mono text-[11px] tracking-[0.22em] uppercase text-gold mb-3">
                Stay in the loop
              </label>
              <div className="flex items-center gap-2 bg-cream/5 border border-cream/10 rounded-full pl-5 pr-1.5 py-1.5 focus-within:border-gold/60 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-cream placeholder:text-cream/40 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 w-10 h-10 rounded-full bg-maroon text-cream grid place-items-center hover:bg-maroon-700 transition-colors"
                  aria-label="Subscribe"
                >
                  {status === "ok" ? <Check size={16} /> : <ArrowRight size={16} />}
                </button>
              </div>
              {status === "ok" && (
                <p className="mt-2 text-xs text-gold">Thanks — you're on the list.</p>
              )}
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream mb-5">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream mb-5">
                Projects
              </h3>
              <ul className="space-y-3">
                {footerLinks.projects.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream mb-5">
                Visit
              </h3>
              <address className="not-italic space-y-3 text-sm">
                <p>Plot 122Y Morija Close</p>
                <p>Off Ademola Adetokunbo Crescent</p>
                <p>Abuja, Nigeria</p>
                <p className="pt-2">
                  <a href="mailto:info@dantatatown.com" className="hover:text-gold transition-colors">
                    info@dantatatown.com
                  </a>
                </p>
                <p>
                  <a href="tel:+2348090500100" className="hover:text-gold transition-colors">
                    +234 809 050 0100
                  </a>
                </p>
                <p>
                  <a href="tel:+2349011191919" className="hover:text-gold transition-colors">
                    +234 901 119 1919
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-cream/50">
            &copy; {new Date().getFullYear()} Dantata Town Developers Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.resources.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/60 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
