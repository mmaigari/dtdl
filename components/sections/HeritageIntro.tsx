"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function HeritageIntro() {
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-ink/5"
          >
            <Image
              src="/whoweare.png"
              alt="A DTDL estate"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-cream">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/80">
                Established 2012 · Abuja, Nigeria
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 lg:pl-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-maroon" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-maroon">
                Who we are
              </span>
            </div>
            <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl text-ink">
              The trusting development. <span className="text-maroon">Built to last.</span>
            </h2>
            <div className="mt-8 space-y-5 text-ink/70 text-[17px] leading-relaxed max-w-2xl">
              <p>
                Founded in 2012 by <strong className="text-ink font-medium">Alhaji Alhassan Abdulkadir Dantata</strong>, DTDL grew out of the storied Dantata &amp; Sawoe construction legacy — bringing decades of infrastructure expertise to Nigerian real estate.
              </p>
              <p>
                We build complete, master-planned communities — not just houses. Roads, drainage, power and water are designed at the same table as the homes themselves, then delivered to a single, uncompromising standard.
              </p>
            </div>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-3 text-ink font-medium hover:text-maroon transition-colors"
            >
              <span className="border-b border-ink group-hover:border-maroon pb-1 transition-colors">
                Read our story
              </span>
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
