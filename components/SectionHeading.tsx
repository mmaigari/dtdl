"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  tone = "ink",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  const titleColor = tone === "cream" ? "text-cream" : "text-ink";
  const descColor = tone === "cream" ? "text-cream/65" : "text-ink/65";
  const ruleColor = tone === "cream" ? "bg-gold" : "bg-maroon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl mb-14 flex flex-col ${alignment}`}
    >
      {label && (
        <div className="flex items-center gap-3 mb-5">
          <span className={`h-px w-10 ${ruleColor}`} />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-maroon">
            {label}
          </span>
        </div>
      )}
      <h2 className={`display-serif text-3xl md:text-5xl ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${descColor} max-w-2xl`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
