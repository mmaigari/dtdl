"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MapPin, Briefcase } from "lucide-react";
import type { Job } from "@/lib/jobs";

interface JobCardProps {
  job: Job;
  onApply?: (position: string) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-ink/10 last:border-b-0"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open ? "true" : "false"}
        className="w-full grid grid-cols-12 gap-4 md:gap-6 items-center py-7 text-left group"
      >
        <div className="col-span-12 md:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone mb-2">
            {job.department}
          </p>
          <h3 className="display-serif text-2xl md:text-3xl text-ink group-hover:text-maroon transition-colors">
            {job.title}
          </h3>
        </div>
        <div className="col-span-8 md:col-span-3 flex flex-wrap items-center gap-4 text-[12px] text-ink/65">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} className="text-maroon" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase size={13} className="text-maroon" /> {job.type}
          </span>
        </div>
        <div className="col-span-4 md:col-span-2 flex justify-end">
          <span
            className={`w-10 h-10 rounded-full border border-ink/15 grid place-items-center text-ink/70 transition-all ${
              open ? "rotate-180 bg-ink text-cream border-ink" : ""
            }`}
            aria-hidden="true"
          >
            <ChevronDown size={16} />
          </span>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-10 grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-7">
            <p className="text-[15px] leading-relaxed text-ink/75">
              {job.description}
            </p>
          </div>
          <div className="md:col-span-5">
            <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone mb-4">
              Requirements
            </h4>
            <ul className="space-y-2">
              {job.requirements.map((req) => (
                <li
                  key={req}
                  className="flex items-start gap-3 text-sm text-ink/75"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
            {onApply && (
              <button
                type="button"
                onClick={() => onApply(job.title)}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-maroon text-cream px-6 py-3 text-sm font-medium hover:bg-maroon-700 transition-colors"
              >
                Apply for this role
                <ChevronDown size={16} className="-rotate-90" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
