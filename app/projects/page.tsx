import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PageContainer from "@/components/PageContainer";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import { getProjectsByType, type Project } from "@/lib/projects";
import ProjectFilter from "./ProjectFilter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Master-planned communities by Dantata Town Developers across Abuja and Kano.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const activeType = params.type || "all";
  const projects: Project[] = getProjectsByType(activeType);

  return (
    <>
      <Hero
        title="Communities across Nigeria."
        eyebrow="Portfolio"
        subtitle="From flagship master-plans in Abuja to mixed-use developments in Kano — every DTDL estate is engineered as a complete neighbourhood."
        image="/hero1.png"
        compact
      />

      <section className="py-16 lg:py-20 bg-cream border-b border-ink/8">
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone mb-2">
                {projects.length} {projects.length === 1 ? "estate" : "estates"}
              </p>
              <h2 className="display-serif text-2xl md:text-3xl text-ink">
                {activeType === "all"
                  ? "The complete portfolio."
                  : `Filtered by ${activeType}.`}
              </h2>
            </div>
            <ProjectFilter activeType={activeType} />
          </div>
        </PageContainer>
      </section>

      <section className="py-20 lg:py-28 bg-cream-deep">
        <PageContainer>
          {projects.length === 0 ? (
            <p className="py-24 text-center text-ink/60 italic">
              No estates match this category — try another filter.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          )}
        </PageContainer>
      </section>

      <CTASection
        title="Prefer to walk an estate in person?"
        description="Book a private site visit — our advisory team responds within one business day."
        ctaLabel="Schedule a Visit"
        ctaHref="/contact"
        showInterestCTA
      />
    </>
  );
}
