"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import JobCard from "@/components/JobCard";
import { getAllJobs } from "@/lib/jobs";

type Props = {
  onApply: (position: string) => void;
};

export default function CareersList({ onApply }: Props) {
  const allJobs = useMemo(() => getAllJobs(), []);
  const departments = useMemo(
    () => ["All", ...Array.from(new Set(allJobs.map((j) => j.department)))],
    [allJobs]
  );
  const [active, setActive] = useState("All");

  const jobs = active === "All" ? allJobs : allJobs.filter((j) => j.department === active);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {departments.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActive(d)}
            className={`px-4 py-2 rounded-full border text-[12px] tracking-wide transition-all ${
              active === d
                ? "border-maroon bg-maroon text-cream"
                : "border-ink/15 text-ink/65 hover:border-ink/30"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <motion.div layout className="border-t border-ink/10">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={onApply} />
        ))}
        {jobs.length === 0 && (
          <p className="py-16 text-center text-ink/60 italic">
            No openings in this department right now — try another category, or submit an open application below.
          </p>
        )}
      </motion.div>
    </div>
  );
}
