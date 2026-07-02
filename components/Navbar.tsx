"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ExpressInterestButton from "@/components/ExpressInterestButton";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Investors", href: "/investors" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const onLight = scrolled || mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        onLight
          ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgba(14,11,11,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20"
        aria-label="Main navigation"
      >
        <Link href="/" className="relative h-10 w-32 shrink-0" aria-label="DTDL Home">
          <Image
            src="/logo1.png"
            alt="Dantata Town Developers"
            fill
            className={`object-contain transition ${
              onLight ? "" : "brightness-0 invert"
            }`}
            priority
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-[13px] tracking-wide transition-colors duration-300 ${
                    active
                      ? onLight
                        ? "text-maroon"
                        : "text-gold"
                      : onLight
                        ? "text-ink hover:text-maroon"
                        : "text-cream/90 hover:text-cream"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-1.5 left-0 right-0 h-px ${
                        onLight ? "bg-maroon" : "bg-gold"
                      }`}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <ExpressInterestButton
            label="Express Interest"
            variant={onLight ? "primary" : "ghost-on-dark"}
          />
        </div>

        <button
          type="button"
          className={`lg:hidden p-2 transition-colors duration-300 ${
            onLight ? "text-ink" : "text-cream"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen ? "true" : "false"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-cream border-t border-ink/8"
          >
            <ul className="px-6 py-8 space-y-5">
              {navLinks.map((link, i) => {
                const active = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={link.href}
                      className={`block text-lg ${
                        active ? "text-maroon font-medium" : "text-ink hover:text-maroon"
                      } transition-colors duration-300`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
              <li className="pt-4">
                <ExpressInterestButton
                  label="Express Interest"
                  variant="primary"
                  className="w-full justify-center"
                />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
