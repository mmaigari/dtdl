import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
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
    <div className="bg-paper text-ink">
      {/* ── Masthead ── */}
      <section className="pt-32 pb-12 lg:pt-44 lg:pb-16">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-9">
              <p className="serial mb-8">Portfolio</p>
              <h1 className="display-serif text-[clamp(3rem,9vw,8rem)]">
                Communities
                <br />
                <span className="italic font-light text-bordeaux">
                  worth living in.
                </span>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:text-right">
              <p className="serial">Abuja · Kano</p>
              <p className="serial mt-1">Since 2012</p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Filter band ── */}
      <section className="border-y border-rule">
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6">
            <p className="serial">
              {projects.length} {projects.length === 1 ? "estate" : "estates"} —{" "}
              {activeType === "all" ? "complete portfolio" : activeType}
            </p>
            <ProjectFilter activeType={activeType} />
          </div>
        </PageContainer>
      </section>

      {/* ── Image-led entries ── */}
      <section className="pt-12 lg:pt-20">
        {projects.length === 0 && (
          <PageContainer>
            <div className="py-32 text-center serial">
              No estates match this category.
            </div>
          </PageContainer>
        )}

        <div className="space-y-24 lg:space-y-40">
          {projects.map((project, i) => {
            const reverse = i % 2 === 1;
            const [city] = project.location.split(",").map((s) => s.trim());

            return (
              <article key={project.slug}>
                <PageContainer>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover-rise group block"
                  >
                    <div
                      className={`grid grid-cols-12 gap-6 lg:gap-12 items-center ${
                        reverse ? "lg:[direction:rtl]" : ""
                      }`}
                    >
                      <div
                        className={`col-span-12 lg:col-span-8 ${
                          reverse ? "lg:[direction:ltr]" : ""
                        }`}
                      >
                        <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-paper-deep">
                          <Image
                            src={project.cardImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div
                        className={`col-span-12 lg:col-span-4 ${
                          reverse ? "lg:[direction:ltr]" : ""
                        }`}
                      >
                        <p className="serial mb-4">
                          {city} · {project.status}
                        </p>
                        <h2 className="display-serif text-3xl md:text-4xl lg:text-5xl plate-link">
                          {project.title}
                        </h2>
                        <p className="mt-6 text-base text-mute leading-relaxed max-w-md">
                          {project.description}
                        </p>
                        <span className="serial-ink inline-flex items-center gap-2 mt-8 border-b border-ink pb-1 group-hover:gap-4 transition-all">
                          View estate ⟶
                        </span>
                      </div>
                    </div>
                  </Link>
                </PageContainer>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="mt-32 lg:mt-48 border-t border-rule">
        <PageContainer>
          <div className="py-20 lg:py-32 max-w-3xl mx-auto text-center">
            <p className="serial mb-6">Visit us</p>
            <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl mb-10">
              See a community in person.
            </h2>
            <Link
              href="/contact"
              className="serial-ink inline-flex items-center gap-3 border-b border-ink pb-1 hover:gap-5 transition-all"
            >
              Book a site visit ⟶
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
