"use client";

import { motion } from "framer-motion";
import {
  Gauge,
  Shield,
  Lightbulb,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const values = [
  {
    icon: Gauge,
    title: "Dynamic Performance",
    body: "Disciplined delivery against scope, budget and timeline — every project, every phase.",
  },
  {
    icon: Shield,
    title: "Transparency",
    body: "Clear paperwork, clear pricing, clear timelines. Trust is built in the details.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    body: "Energy-efficient systems, smart security and adaptable layouts for modern living.",
  },
  {
    icon: BadgeCheck,
    title: "Dedication to Quality",
    body: "Materials, finishes and infrastructure chosen for longevity — not first impressions.",
  },
  {
    icon: HeartHandshake,
    title: "Client-Focused",
    body: "From first visit to handover, our team partners with you for the long term.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-28 bg-cream-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading
          align="left"
          label="Core values"
          title="What we believe — and what you can hold us to."
          description="DTDL was founded on the principle of trust. Our values are not statements on a wall, they govern how we plan, build and hand over every estate."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative p-7 rounded-2xl bg-white card-elevate overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-maroon/5 group-hover:bg-maroon/10 transition-colors duration-700" />
              <div className="relative">
                <div className="inline-flex w-11 h-11 rounded-xl bg-maroon/10 text-maroon items-center justify-center mb-5">
                  <v.icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="display-serif text-2xl text-ink mb-2">{v.title}</h3>
                <p className="text-ink/65 text-sm leading-relaxed">{v.body}</p>
                <span className="block mt-5 h-px w-10 bg-gold" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
