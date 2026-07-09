"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const shots = [
  { src: "/aa.png", alt: "DTDL project moment", tone: "wide" },
  { src: "/bb.png", alt: "DTDL project moment", tone: "tall" },
  { src: "/cc.png", alt: "DTDL project moment", tone: "square" },
  { src: "/dd.png", alt: "DTDL project moment", tone: "tall" },
  { src: "/ee.png", alt: "DTDL project moment", tone: "wide" },
] as const;

// Bespoke asymmetric grid — mixes tall / wide / square cells for editorial rhythm.
const cellClass: Record<(typeof shots)[number]["tone"], string> = {
  wide: "md:col-span-8 aspect-[16/10]",
  tall: "md:col-span-4 aspect-[4/5]",
  square: "md:col-span-6 aspect-[5/4]",
};

const partitions = [
  [0, 1], // row 1: wide + tall
  [2, 3], // row 2: square + tall
  [4], // row 3: wide full
];

export default function PortfolioMoments() {
  return (
    <section className="py-28 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-maroon" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-maroon">
                Across our sites
              </span>
            </div>
            <h2 className="display-serif text-3xl md:text-5xl text-ink max-w-2xl">
              Moments from the ground up.
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink hover:border-maroon hover:text-maroon transition-colors"
          >
            View full portfolio
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        <div className="space-y-4 md:space-y-6">
          {partitions.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="grid md:grid-cols-12 gap-4 md:gap-6"
            >
              {row.map((idx, cellIdx) => {
                const shot = shots[idx];
                const single = row.length === 1;
                return (
                  <motion.figure
                    key={shot.src}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.9,
                      delay: cellIdx * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative overflow-hidden rounded-2xl bg-ink/5 ${
                      single
                        ? "md:col-span-12 aspect-[21/9]"
                        : cellClass[shot.tone]
                    }`}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  </motion.figure>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
