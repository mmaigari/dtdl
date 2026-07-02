"use client";

import { motion } from "framer-motion";
import ScheduleVisitButton from "@/components/ScheduleVisitButton";
import ExpressInterestButton from "@/components/ExpressInterestButton";
import RevealText from "@/components/motion/RevealText";

export default function ContactHero() {
  return (
    <section className="relative pt-32 lg:pt-44 pb-16 lg:pb-24 bg-cream overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,_var(--color-ink)_1px,_transparent_0)] [background-size:32px_32px]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-maroon">
            Contact
          </span>
        </motion.div>
        <RevealText
          text="Let's start a conversation."
          as="h1"
          className="display-serif text-5xl md:text-7xl text-ink max-w-4xl"
          staggerMs={60}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg text-ink/70 max-w-2xl leading-relaxed"
        >
          Whether you want to buy a home, schedule a visit, invest in a project, or partner with us — our team is ready to help.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <ExpressInterestButton label="Express Interest" variant="primary" />
          <ScheduleVisitButton label="Schedule a Visit" variant="outline" />
        </motion.div>
      </div>
    </section>
  );
}
