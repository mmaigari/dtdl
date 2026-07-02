"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.85,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block rounded-2xl overflow-hidden bg-white card-elevate"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={project.cardImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/15 transition-colors duration-700" />

          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] uppercase bg-cream/95 text-ink">
              {project.type}
            </span>
            {project.status === "ongoing" && (
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] uppercase bg-maroon text-cream">
                Ongoing
              </span>
            )}
          </div>

          <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-cream text-ink grid place-items-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <ArrowUpRight size={18} />
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-cream">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/70 mb-2">
              {project.location}
            </p>
            <h3 className="display-serif text-2xl md:text-[1.65rem] leading-tight">
              {project.title}
            </h3>
            <div className="mt-4 flex items-center gap-4 text-[11px] font-mono tracking-[0.14em] uppercase text-cream/70">
              <span>{project.units > 0 ? `${project.units.toLocaleString()} units` : "Mixed-use"}</span>
              {project.yearLaunched && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  <span>{project.yearLaunched}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
