import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ImageIcon,
  MapPin,
  Home,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import ExpressInterestButton from "@/components/ExpressInterestButton";
import ScheduleVisitButton from "@/components/ScheduleVisitButton";
import ProjectGallery from "@/components/ProjectGallery";
import CTASection from "@/components/CTASection";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getPixiesetUrl,
  projects,
  type Project,
} from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.heroImage, width: 1920, height: 1080 }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project: Project | undefined = getProjectBySlug(slug);

  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const total = projects.length;
  const next = projects[(index + 1) % total];
  const prev = projects[(index - 1 + total) % total];
  const [city] = project.location.split(",").map((s) => s.trim());

  const specs = [
    { icon: MapPin, label: "Location", value: project.location },
    {
      icon: Home,
      label: "Units",
      value: project.units > 0 ? project.units.toLocaleString() : "Mixed-use",
    },
    {
      icon: Calendar,
      label: "Launched",
      value: project.yearLaunched ? String(project.yearLaunched) : "—",
    },
    {
      icon: CheckCircle2,
      label: "Status",
      value: project.status.charAt(0).toUpperCase() + project.status.slice(1),
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 ken-burns">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/20 to-ink/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16 lg:pb-24">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-cream/70 hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            All projects
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-gold" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
              {project.type} · {city}
            </span>
          </div>

          <h1 className="display-serif text-5xl md:text-6xl lg:text-7xl text-cream max-w-4xl leading-[1.02]">
            {project.title}
          </h1>

          <p className="mt-6 text-lg text-cream/75 leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ExpressInterestButton
              label="Express Interest"
              variant="primary"
              project={project.title}
            />
            <ScheduleVisitButton
              label="Schedule a Visit"
              variant="ghost-on-dark"
              project={project.title}
            />
          </div>
        </div>
      </section>

      {/* ── Spec strip ── */}
      <section className="bg-ink border-t border-cream/10">
        <PageContainer>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-start gap-3">
                <span className="shrink-0 w-9 h-9 rounded-lg bg-cream/5 grid place-items-center text-gold">
                  <spec.icon size={15} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/50 mb-1">
                    {spec.label}
                  </p>
                  <p className="text-cream font-medium">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Overview ── */}
      <section className="py-24 lg:py-28 bg-cream">
        <PageContainer>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-maroon" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-maroon">
                  Overview
                </span>
              </div>
              <h2 className="display-serif text-3xl md:text-4xl lg:text-5xl text-ink">
                A community engineered end-to-end.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-ink/75 text-[17px] leading-relaxed">
              <p>{project.longDescription}</p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── House types ── */}
      {project.houseTypes && project.houseTypes.length > 0 && (
        <section className="py-24 lg:py-28 bg-cream-deep">
          <PageContainer>
            <SectionHeading
              align="left"
              label="Typologies"
              title="House types on offer."
              description="Diverse unit configurations designed for families, professionals, and multi-generational households."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.houseTypes.map((type) => (
                <div
                  key={type}
                  className="group relative p-5 rounded-xl bg-white border border-ink/8 flex items-center gap-4 hover:border-maroon/40 transition-colors"
                >
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-maroon/10 text-maroon grid place-items-center">
                    <Home size={15} strokeWidth={1.8} />
                  </span>
                  <span className="text-[15px] text-ink font-medium">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* ── Amenities ── */}
      <section className="py-24 lg:py-28 bg-cream">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Amenities"
            title="What's on the grounds."
            description="Every DTDL estate is built as a complete community — retail, worship, wellness and recreation designed in from day one."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.amenities.map((amenity, i) => (
              <div
                key={`${amenity.label}-${i}`}
                className="p-6 rounded-2xl bg-white border border-ink/8 card-elevate"
              >
                <span className="inline-flex w-10 h-10 rounded-lg bg-gold/15 text-gold-dark items-center justify-center mb-4">
                  <CheckCircle2 size={17} strokeWidth={1.8} />
                </span>
                <p className="text-ink font-medium">{amenity.label}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Gallery / Pixieset ── */}
      {project.galleryImages && project.galleryImages.length >= 2 ? (
        <section className="py-24 lg:py-28 bg-cream-deep">
          <PageContainer>
            <SectionHeading
              align="left"
              label="Gallery"
              title="Visual record."
              description="A curated selection from the site — swipe through, or open the full Pixieset library below."
            />
            <ProjectGallery images={project.galleryImages} alt={project.title} />
          </PageContainer>
        </section>
      ) : (
        <section className="py-24 lg:py-28 bg-cream-deep">
          <PageContainer>
            <a
              href={getPixiesetUrl(project)}
              target="_blank"
              rel="noreferrer noopener"
              className="group block bg-ink text-cream rounded-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:32px_32px]" />
              <div className="relative grid md:grid-cols-12 gap-6 p-8 md:p-12 items-center">
                <div className="md:col-span-8">
                  <div className="flex items-center gap-3 mb-4">
                    <ImageIcon size={14} className="text-gold" />
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-gold">
                      Pixieset · high-resolution portfolio
                    </span>
                  </div>
                  <h3 className="display-serif text-3xl md:text-4xl mb-3">
                    Browse the full {project.title} collection.
                  </h3>
                  <p className="text-cream/70 max-w-xl leading-relaxed">
                    The complete high-resolution photo library — architectural renders, unit interiors, site progress and drone shots. Opens in a new tab.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <span className="inline-flex items-center gap-2 rounded-full bg-maroon text-cream px-6 py-3 text-sm font-medium group-hover:bg-maroon-700 transition-colors">
                    View portfolio
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </a>
          </PageContainer>
        </section>
      )}

      {/* ── Adjacent estates ── */}
      <section className="py-16 lg:py-20 bg-cream border-t border-ink/8">
        <PageContainer>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href={`/projects/${prev.slug}`}
              className="group p-8 rounded-2xl bg-white border border-ink/8 card-elevate flex items-center gap-5"
            >
              <span className="shrink-0 w-11 h-11 rounded-full border border-ink/15 grid place-items-center text-ink group-hover:border-maroon group-hover:text-maroon transition-colors">
                <ArrowLeft size={16} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone mb-1">
                  Previous
                </p>
                <p className="display-serif text-xl text-ink group-hover:text-maroon transition-colors truncate">
                  {prev.title}
                </p>
              </div>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group p-8 rounded-2xl bg-white border border-ink/8 card-elevate flex items-center gap-5 md:text-right md:flex-row-reverse"
            >
              <span className="shrink-0 w-11 h-11 rounded-full border border-ink/15 grid place-items-center text-ink group-hover:border-maroon group-hover:text-maroon transition-colors">
                <ArrowRight size={16} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone mb-1">
                  Next
                </p>
                <p className="display-serif text-xl text-ink group-hover:text-maroon transition-colors truncate">
                  {next.title}
                </p>
              </div>
            </Link>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title={`Ready to explore ${project.title}?`}
        description="Book a private site visit or start a conversation — our advisory team responds within one business day."
        ctaLabel="Schedule a Visit"
        ctaHref="/contact"
        showInterestCTA
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: project.title,
            description: project.description,
            url: `https://www.dantatatown.com/projects/${project.slug}`,
            image: project.heroImage,
            address: {
              "@type": "PostalAddress",
              addressLocality: city,
              addressCountry: "NG",
            },
          }),
        }}
      />
    </>
  );
}
