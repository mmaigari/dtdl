"use client";

import Link from "next/link";

const filters = [
  { label: "All", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Mixed-Use", value: "mixed-use" },
  { label: "Commercial", value: "commercial" },
];

interface ProjectFilterProps {
  activeType: string;
}

export default function ProjectFilter({ activeType }: ProjectFilterProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => {
        const active = activeType === filter.value;
        return (
          <Link
            key={filter.value}
            href={
              filter.value === "all"
                ? "/projects"
                : `/projects?type=${filter.value}`
            }
            className={`px-4 py-2 rounded-full border text-[12px] tracking-wide transition-all ${
              active
                ? "border-maroon bg-maroon text-cream"
                : "border-ink/15 text-ink/65 hover:border-ink/30"
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
    </nav>
  );
}
