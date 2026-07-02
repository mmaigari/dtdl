import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { getAllProjects, getPixiesetUrl, PIXIESET_URL } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio Gallery",
  description:
    "The complete DTDL photo portfolio — architectural renders, unit interiors, site progress and drone shots for every estate. Hosted on Pixieset.",
};

export default function GalleryPage() {
  const projects = getAllProjects();

  return (
    <>
      <section className="relative pt-32 lg:pt-44 pb-16 lg:pb-24 bg-cream overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,_var(--color-ink)_1px,_transparent_0)] [background-size:32px_32px]" />
        <PageContainer>
          <div className="relative grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-maroon">
                  Portfolio · high resolution
                </span>
              </div>
              <h1 className="display-serif text-5xl md:text-7xl text-ink leading-[0.98]">
                Every estate, every angle.
              </h1>
              <p className="mt-6 text-lg text-ink/70 max-w-2xl leading-relaxed">
                Our full photo portfolio lives on Pixieset — architectural
                renders, unit interiors, drone shots and construction progress.
                Choose an estate below to open its gallery.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <a
                href={PIXIESET_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 text-sm font-medium hover:bg-maroon transition-colors"
              >
                <ImageIcon size={14} className="text-gold" />
                Open full portfolio
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-16 lg:py-24 bg-cream-deep">
        <PageContainer>
          <SectionHeading
            align="left"
            label="By estate"
            title="Choose a collection."
            description="Each card opens the dedicated Pixieset gallery in a new tab. High-resolution downloads are available where enabled."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <a
                key={project.slug}
                href={getPixiesetUrl(project)}
                target="_blank"
                rel="noreferrer noopener"
                className="group block rounded-2xl overflow-hidden bg-white card-elevate"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
                  {project.cardImage && (
                    <Image
                      src={project.cardImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/15 transition-colors duration-700" />

                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] uppercase bg-cream/95 text-ink">
                      {project.type}
                    </span>
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
                    <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-gold">
                      Open on Pixieset →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Prefer to see a home in person?"
        description="Nothing replaces walking the grounds. Book a private site visit and our team will meet you there."
        ctaLabel="Schedule a Visit"
        ctaHref="/contact"
        showInterestCTA
      />
    </>
  );
}
