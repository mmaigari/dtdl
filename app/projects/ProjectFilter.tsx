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
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
            className={`serial transition-colors ${
              active
                ? "text-ink border-b border-ink pb-0.5"
                : "hover:text-ink"
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
    </nav>
  );
}
