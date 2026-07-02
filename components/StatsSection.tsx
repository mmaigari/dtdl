"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

type Stat = {
  to: number;
  suffix?: string;
  prefix?: string;
  label: string;
  format?: (n: number) => string;
};

const stats: Stat[] = [
  { to: 13, suffix: "+", label: "Years Building" },
  { to: 8000, suffix: "+", label: "Units Delivered" },
  { to: 12, suffix: "+", label: "Estates & Developments" },
  { to: 2, label: "States — Abuja & Kano" },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 bg-ink overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:32px_32px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-gold" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                By the numbers
              </span>
            </div>
            <h2 className="display-serif text-3xl md:text-5xl text-cream max-w-xl">
              A track record measured in communities.
            </h2>
          </div>
          <p className="text-cream/60 max-w-sm text-sm leading-relaxed">
            Since 2012, DTDL has delivered master-planned estates across Nigeria — born from the Dantata &amp; Sawoe construction legacy.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-t border-cream/10 pt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="block plate-numeral text-5xl md:text-6xl text-cream">
                <AnimatedCounter
                  to={stat.to}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  format={stat.format}
                />
              </span>
              <span className="block mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-cream/55">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
