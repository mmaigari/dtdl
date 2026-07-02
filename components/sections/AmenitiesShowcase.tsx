"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Shield,
  Hospital,
  GraduationCap,
  Church,
  Dumbbell,
  Pill,
  Baby,
  TreePine,
  Building2,
  Users,
  Activity,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const amenities = [
  { icon: ShoppingBag, label: "Shopping Complex" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Hospital, label: "Hospital" },
  { icon: GraduationCap, label: "School" },
  { icon: Building2, label: "Mosque" },
  { icon: Church, label: "Church" },
  { icon: Users, label: "Club House" },
  { icon: Activity, label: "Sports & Recreation" },
  { icon: Pill, label: "Pharmacy" },
  { icon: Baby, label: "Daycare" },
  { icon: Dumbbell, label: "Fitness Centre" },
  { icon: TreePine, label: "Playground" },
];

export default function AmenitiesShowcase() {
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading
          align="center"
          label="Amenities"
          title="Every estate, built around the way families live."
          description="From schools and clinics to mosques, churches, fitness centres and recreation — every DTDL community is engineered as a complete neighbourhood, not just rows of homes."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {amenities.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: (i % 6) * 0.05 + Math.floor(i / 6) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group aspect-square flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-ink/8 bg-white hover:border-maroon/30 hover:bg-maroon/2 transition-colors duration-300"
            >
              <a.icon
                size={26}
                strokeWidth={1.4}
                className="text-ink/70 group-hover:text-maroon transition-colors"
              />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/65 text-center">
                {a.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
