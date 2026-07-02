import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import ExpressInterestButton from "@/components/ExpressInterestButton";
import ScheduleVisitButton from "@/components/ScheduleVisitButton";
import ProjectGallery from "@/components/ProjectGallery";
import { ImageIcon, ArrowUpRight } from "lucide-react";
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
  const [city, region] = project.location.split(",").map((s) => s.trim());

  return (
    <div className="bg-paper text-ink">
      {/* ── Breadcrumb rail ── */}
      <div className="border-b border-rule pt-28">
        <PageContainer>
          <div className="flex items-center justify-between py-4">
            <Link href="/projects" className="serial hover:text-ink">
              ⟵ All estates
            </Link>
            <p className="serial">
              {city} · {project.status}
            </p>
          </div>
        </PageContainer>
      </div>

      {/* ── Full-bleed hero image ── */}
      <section className="relative">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-paper-deep">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── Title block (under hero) ── */}
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-20">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-9">
              <p className="serial mb-6">
                {project.type} · {region ?? city}
              </p>
              <h1 className="display-serif text-[clamp(2.5rem,7vw,6rem)]">
                {project.title}
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:text-right flex lg:flex-col gap-3 lg:items-end">
              <ExpressInterestButton
                label="Express Interest"
                variant="primary"
                project={project.title}
              />
              <ScheduleVisitButton
                label="Schedule a Visit"
                variant="outline"
                project={project.title}
              />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Metadata strip ── */}
      <section className="border-y border-ink">
        <PageContainer>
          <dl className="metadata-strip grid-cols-2 md:grid-cols-5 !border-0">
            <div>
              <dt>Locale</dt>
              <dd>{city}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{region ?? "—"}</dd>
            </div>
            <div>
              <dt>Units</dt>
              <dd>{project.units.toLocaleString()}</dd>
            </div>
            <div>
              <dt>Typology</dt>
              <dd className="capitalize">{project.type}</dd>
            </div>
            <div>
              <dt>Est.</dt>
              <dd>{project.yearLaunched ?? "—"}</dd>
            </div>
          </dl>
        </PageContainer>
      </section>

      {/* ── Overview ── */}
      <section className="py-20 lg:py-32">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="serial">Overview</p>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <p className="display-serif text-2xl md:text-3xl lg:text-4xl leading-snug mb-10 italic font-light">
                &ldquo;{project.description}&rdquo;
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-mute">
                {project.longDescription}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Image break ── */}
      {project.galleryImages?.[0] && (
        <section className="relative">
          <div className="relative aspect-[21/9] lg:aspect-[21/8] overflow-hidden bg-paper-deep">
            <Image
              src={project.galleryImages[0]}
              alt={`${project.title} — interior view`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* ── House types ── */}
      {project.houseTypes && project.houseTypes.length > 0 && (
        <section className="py-20 lg:py-32 bg-paper-deep/40">
          <PageContainer>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-3">
                <p className="serial">Typologies</p>
                <h2 className="display-serif text-3xl md:text-4xl mt-4">
                  House types.
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-8 lg:col-start-5">
                <ul className="divide-y divide-rule border-y border-rule">
                  {project.houseTypes.map((type) => (
                    <li
                      key={type}
                      className="display-serif text-xl md:text-2xl py-5"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PageContainer>
        </section>
      )}

      {/* ── Amenities ── */}
      <section className="py-20 lg:py-32 border-t border-rule">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="serial">Amenities</p>
              <h2 className="display-serif text-3xl md:text-4xl mt-4">
                On the grounds.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <ul className="grid grid-cols-1 md:grid-cols-2 border-y border-rule">
                {project.amenities.map((amenity, i) => (
                  <li
                    key={`${amenity.label}-${i}`}
                    className="display-serif text-xl py-5 md:px-6 first:md:pl-0 last:md:pr-0 border-b border-rule md:border-b-0 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-rule md:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    {amenity.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Gallery — Embla carousel (only when on-site photos exist) ── */}
      {project.galleryImages && project.galleryImages.length >= 2 ? (
        <section className="py-20 lg:py-32 bg-paper-deep/40">
          <PageContainer>
            <div className="mb-12">
              <p className="serial">Gallery</p>
              <h2 className="display-serif text-3xl md:text-4xl mt-4">
                Visual record.
              </h2>
            </div>
            <ProjectGallery images={project.galleryImages} alt={project.title} />
          </PageContainer>
        </section>
      ) : (
        <section className="py-20 lg:py-32 bg-paper-deep/40">
          <PageContainer>
            <div className="mb-12">
              <p className="serial">Gallery</p>
              <h2 className="display-serif text-3xl md:text-4xl mt-4">
                The full photo portfolio.
              </h2>
            </div>
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
                    We host the complete high-resolution photo library on
                    Pixieset — architectural renders, unit interiors, site
                    progress and drone shots. Opens in a new tab.
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
      <section className="border-t border-ink">
        <PageContainer>
          <div className="py-16 lg:py-24 grid grid-cols-2 gap-6">
            <Link
              href={`/projects/${prev.slug}`}
              className="group block border-r border-rule pr-6"
            >
              <p className="serial mb-3">⟵ Previous estate</p>
              <h3 className="display-serif text-2xl md:text-3xl group-hover:text-bordeaux transition-colors">
                {prev.title}
              </h3>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group block text-right pl-6"
            >
              <p className="serial mb-3">Next estate ⟶</p>
              <h3 className="display-serif text-2xl md:text-3xl group-hover:text-bordeaux transition-colors">
                {next.title}
              </h3>
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ink text-paper">
        <PageContainer>
          <div className="py-20 lg:py-28 grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <p className="serial mb-6 text-gilt">Enquire</p>
              <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl">
                See {project.title} in person.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right flex flex-wrap lg:justify-end gap-3">
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
        </PageContainer>
      </section>

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
    </div>
  );
}
