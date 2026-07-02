"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Phone, Mail } from "lucide-react";
import RevealText from "@/components/motion/RevealText";

const ESTATES = [
  "Dantata Housing Estate",
  "The District by Dantata",
  "Mabushi Luxury Terraces",
  "Dantata Garden",
  "Dantata City",
  "The Residence by Dantata",
  "Dantata Square",
  "Abdulkadir Dantata City",
  "Dantata Millennium Estate",
];

export default function MaintenanceScreen() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const t = d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Africa/Lagos",
      });
      setTime(`${t} WAT · Abuja`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const notify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    console.log("[maintenance] notify", email);
    setDone(true);
    setEmail("");
  };

  const marquee = [...ESTATES, ...ESTATES];

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-ink text-cream isolate">
      {/* layered backdrop */}
      <div aria-hidden className="absolute inset-0 bg-cinematic" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:32px_32px]"
      />
      {/* gold spotlight */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-32 -left-32 w-[80vw] h-[80vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,75,0.18), transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2.4, delay: 0.4 }}
        className="absolute -bottom-40 -right-32 w-[80vw] h-[80vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(153,0,0,0.28), transparent 70%)",
        }}
      />

      {/* top rail — logo + live time */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-12 w-36"
        >
          <Image
            src="/logo1.png"
            alt="Dantata Town Developers"
            fill
            className="object-contain object-left brightness-0 invert"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-cream/65"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-75" />
            <span className="relative rounded-full bg-gold h-2 w-2" />
          </span>
          <span className="hidden sm:inline">Under construction · </span>
          <span>{time || "—"}</span>
        </motion.div>
      </header>

      {/* hero block */}
      <main className="relative z-10 px-6 md:px-12 pt-6 md:pt-20 max-w-7xl mx-auto">
        <RevealText
          text="Something extraordinary is being built."
          as="h1"
          className="display-serif text-[clamp(2.6rem,7.2vw,7rem)] leading-[0.98] text-cream max-w-5xl"
          staggerMs={80}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 md:mt-10 max-w-2xl text-cream/70 text-[17px] md:text-lg leading-relaxed"
        >
          For thirteen years, Dantata Town Developers has shaped the way Nigeria
          lives. The next chapter — bolder, quieter, more considered — is almost
          here. <span className="text-cream">The Trusting Development</span> is
          coming back, refined.
        </motion.p>

        {/* notify form */}
        <motion.form
          onSubmit={notify}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-xl"
        >
          <label className="block font-mono text-[11px] tracking-[0.22em] uppercase text-gold mb-3">
            Be the first to see it
          </label>
          <div className="flex items-center gap-2 bg-cream/5 border border-cream/15 rounded-full pl-5 pr-1.5 py-1.5 focus-within:border-gold/70 transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              aria-label="Email address"
              className="flex-1 bg-transparent text-cream placeholder:text-cream/40 text-[15px] focus:outline-none py-2"
            />
            <button
              type="submit"
              aria-label="Notify me at launch"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-maroon text-cream pl-5 pr-4 py-2.5 text-sm font-medium hover:bg-maroon-700 transition-colors"
            >
              {done ? (
                <>
                  <Check size={16} /> Got it
                </>
              ) : (
                <>
                  Notify me <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
          {done && (
            <p className="mt-3 text-sm text-gold">
              You're on the list — we'll write to you when the doors open.
            </p>
          )}
        </motion.form>
      </main>

      {/* bottom contact rail */}
      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 inset-x-0 z-10 px-6 md:px-12 pb-6 md:pb-10"
      >
        <div className="border-t border-cream/10 pt-6 md:pt-8 flex flex-col md:flex-row gap-5 md:gap-8 md:items-center md:justify-between max-w-7xl mx-auto">
          <p className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-cream/55">
            © {new Date().getFullYear()} Dantata Town Developers Ltd · Abuja · Kano
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] md:text-[13px] text-cream/75">
            <a
              href="tel:+2348090500100"
              className="inline-flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Phone size={14} className="text-gold" />
              +234 809 050 0100
            </a>
            <a
              href="mailto:info@dantatatown.com"
              className="inline-flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Mail size={14} className="text-gold" />
              info@dantatatown.com
            </a>
            <span className="inline-flex items-center gap-2 text-cream/55">
              <MapPin size={14} className="text-gold" />
              Plot 122Y Morija Close, Wuse 2
            </span>
          </div>
        </div>
      </motion.footer>

      {/* drifting estates marquee */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-28 md:bottom-24 z-0 overflow-hidden opacity-[0.10] pointer-events-none"
      >
        <div className="marquee-track py-2 will-change-transform">
          {marquee.map((name, i) => (
            <div key={`${name}-${i}`} className="flex items-center gap-12 shrink-0">
              <span className="display-serif text-6xl md:text-8xl text-cream whitespace-nowrap tracking-tight">
                {name}
              </span>
              <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
