"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import MagneticButton from "@/components/motion/MagneticButton";
import ExpressInterestButton from "@/components/ExpressInterestButton";
import ScheduleVisitButton from "@/components/ScheduleVisitButton";

interface HeroProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  image: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  compact?: boolean;
  showInterestCTA?: boolean;
  showVisitCTA?: boolean;
}

export default function Hero({
  title,
  eyebrow = "Dantata Town Developers",
  subtitle,
  image,
  primaryCta,
  secondaryCta,
  compact = false,
  showInterestCTA = false,
  showVisitCTA = false,
}: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className={`relative flex items-end overflow-hidden ${
        compact ? "min-h-[64vh]" : "min-h-screen"
      }`}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 ken-burns">
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/20 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28 pt-32"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/80">
              {eyebrow}
            </span>
          </motion.div>

          <RevealText
            text={title}
            as="h1"
            className="display-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-cream"
            staggerMs={75}
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 text-lg lg:text-xl text-cream/75 leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCta || secondaryCta || showInterestCTA || showVisitCTA) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              {primaryCta && (
                <MagneticButton href={primaryCta.href} variant="primary">
                  {primaryCta.label}
                </MagneticButton>
              )}
              {showInterestCTA && (
                <ExpressInterestButton label="Express Interest" variant="primary" />
              )}
              {showVisitCTA && (
                <ScheduleVisitButton
                  label="Schedule a Visit"
                  variant="ghost-on-dark"
                />
              )}
              {secondaryCta && (
                <MagneticButton
                  href={secondaryCta.href}
                  variant="ghost"
                  className="text-cream hover:text-gold border border-cream/30 hover:border-gold"
                >
                  {secondaryCta.label}
                </MagneticButton>
              )}
            </motion.div>
          )}
        </div>

        {!compact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-cream/60"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
