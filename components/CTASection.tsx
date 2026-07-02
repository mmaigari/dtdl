"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/motion/MagneticButton";
import ExpressInterestButton from "@/components/ExpressInterestButton";

interface CTASectionProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  showInterestCTA?: boolean;
}

export default function CTASection({
  title,
  description,
  ctaLabel,
  ctaHref,
  image,
  showInterestCTA = true,
}: CTASectionProps) {
  return (
    <section className="relative py-32 overflow-hidden bg-ink">
      {image ? (
        <Image src={image} alt="" fill className="object-cover opacity-30" sizes="100vw" />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-cinematic" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/70 to-ink" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:32px_32px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-gold" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
            The next step
          </span>
          <span className="h-px w-10 bg-gold" />
        </div>
        <h2 className="display-serif text-4xl md:text-6xl text-cream">{title}</h2>
        {description && (
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {showInterestCTA && (
            <ExpressInterestButton label="Express Interest" variant="primary" />
          )}
          {ctaLabel && ctaHref && (
            <MagneticButton href={ctaHref} variant="ghost-on-dark">
              {ctaLabel}
            </MagneticButton>
          )}
        </div>
      </motion.div>
    </section>
  );
}
