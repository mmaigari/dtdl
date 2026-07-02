import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dantata Town Developers Limited — established 2012. Master-planned communities across Abuja and Kano, built on legacy, rigour, and infrastructure-first design.",
};

const values = [
  { title: "Dynamic Performance", description: "We deliver results through agile execution and continuous improvement, ensuring every project meets its milestones on time and to specification." },
  { title: "Transparency", description: "Clear communication, documented timelines, and honest reporting at every stage. We build trust through openness with clients, partners, and investors." },
  { title: "Dedication to Quality", description: "Every structure is built with premium materials and exacting construction standards, incorporating modern techniques and smart home technology." },
  { title: "Innovation", description: "We embrace new construction methodologies, energy-efficient systems, and environmentally friendly practices to stay ahead of industry standards." },
  { title: "Client-Focused Approach", description: "Our developments are designed around the needs of residents and investors. From concept to handover, client satisfaction drives every decision we make." },
];

const milestones = [
  { year: "2012", event: "Dantata Town Developers Limited founded. Launch of Mabushi Luxury Terraces and Dantata Housing Estate in Abuja." },
  { year: "2015", event: "The District by Dantata launched in Gwarinpa, Abuja — 804 units across diverse housing types." },
  { year: "2018", event: "Dantata Garden launched at Karsana, Abuja — 624 units with extensive green spaces." },
  { year: "2021", event: "The Residence by Dantata launched on Airport Road, Abuja — 371 premium units." },
  { year: "2022", event: "Expansion into Kano with Dantata Square at Fagge — 164 mixed-use units." },
  { year: "2023", event: "Abdulkadir Dantata City launched at Bompai, Kano — 981 residential units." },
  { year: "2024", event: "Launch of Dantata City at FO1 Kubwa (1,497 units) and Dantata Millennium Estate in Kano." },
];

interface Officer {
  name: string;
  role: string;
  remit: string;
  reports?: string;
  portrait?: string;
}

const board: Officer[] = [
  {
    name: "Alhaji Alhassan Abdulkadir Dantata",
    role: "Chairman",
    remit:
      "Founder and Chairman. Stewards the long-term vision and stakeholder relationships. Custodian of the Dantata real-estate legacy.",
  },
  {
    name: "Engr. Nasiru Dantata",
    role: "Executive Director",
    remit:
      "Day-to-day executive oversight across operations, strategy execution, and board liaison.",
    reports: "Chairman",
  },
];

const officers: Officer[] = [
  {
    name: "Alhaji Auwalu Dayyabu",
    role: "Chief Development Officer",
    remit:
      "Land acquisition, master-planning, and pre-construction strategy across all estates.",
    reports: "Executive Director",
  },
  {
    name: "Mr. Milan Sharma",
    role: "Chief Project Officer",
    remit:
      "Construction delivery, site execution, contractor management, and quality assurance.",
    reports: "Executive Director",
  },
  {
    name: "Mr. Paul Ocheme",
    role: "Chief Finance Officer",
    remit:
      "Treasury, financial planning, investor reporting, and capital structure.",
    reports: "Executive Director",
  },
  {
    name: "Mr. Obiora Chinwuba",
    role: "Chief Corporate Officer",
    remit:
      "Legal, compliance, corporate governance, and external regulatory affairs.",
    reports: "Executive Director",
  },
  {
    name: "Mr. Ibrahim Garba",
    role: "Chief Business Officer",
    remit:
      "Sales, customer relations, marketing, and post-handover community engagement.",
    reports: "Executive Director",
  },
];

const specializations = [
  { title: "Residential Development", description: "High-quality residential properties — from luxury terraces to expansive housing estates — prioritising comfort, aesthetics, and sustainability." },
  { title: "Infrastructure Construction", description: "Planning, designing and executing essential infrastructure: roads, drainage, electrification, water reticulation, and public amenities." },
  { title: "Property Management", description: "Comprehensive support for owners and investors — tenant relations, maintenance, and financial oversight that protects asset value." },
];

function PortraitCard({ officer }: { officer: Officer }) {
  const initials = officer.name
    .split(" ")
    .filter((w) => !/^(Alhaji|Engr\.|Mr\.|Mrs\.|Dr\.)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep mb-6">
        {officer.portrait ? (
          <Image
            src={officer.portrait}
            alt={officer.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="display-serif text-7xl text-ink/30">
              {initials}
            </span>
          </div>
        )}
      </div>
      <p className="serial mb-2">{officer.role}</p>
      <h3 className="display-serif text-xl md:text-2xl mb-3">{officer.name}</h3>
      <p className="text-sm leading-relaxed text-mute">{officer.remit}</p>
    </article>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-paper text-ink">
      {/* ── Masthead ── */}
      <section className="pt-32 pb-12 lg:pt-44 lg:pb-16">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-9">
              <p className="serial mb-8">About</p>
              <h1 className="display-serif text-[clamp(3rem,9vw,8rem)]">
                A house built on
                <br />
                <span className="italic font-light text-bordeaux">
                  legacy
                </span>{" "}
                & rigour.
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:text-right">
              <p className="serial">Est. 2012</p>
              <p className="serial mt-1">Abuja · Kano</p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Full-bleed image ── */}
      <section className="relative">
        <div className="relative aspect-[21/9] lg:aspect-[21/8] overflow-hidden bg-paper-deep">
          <Image
            src="https://placehold.co/1920x800"
            alt="A Dantata Town Developers estate"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 lg:py-32">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="serial">Our story</p>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <p className="display-serif text-2xl md:text-3xl lg:text-4xl leading-snug italic font-light mb-10">
                &ldquo;Founded in 2012 to transform the Nigerian housing
                landscape through innovation, quality, and community-focused
                development.&rdquo;
              </p>
              <div className="space-y-6 text-base lg:text-lg leading-relaxed text-mute">
                <p>
                  Dantata Town Developers Limited emerged from a legacy of
                  excellence in construction and infrastructure development.
                  Building on the foundation laid by Dantata &amp; Sawoe
                  Construction Company, our founder envisioned a real estate
                  company that would not only provide high-quality housing but
                  also foster community growth and long-term value for
                  investors.
                </p>
                <p>
                  Our developments span Abuja and Kano. Each project is
                  meticulously planned and executed so that residents enjoy
                  modern amenities, secure environments, and spaces that
                  promote community and well-being.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="bg-ink text-paper">
        <PageContainer>
          <div className="py-20 lg:py-28 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="serial text-gilt">Doctrine</p>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <p className="serial text-gilt mb-4">Vision</p>
              <p className="display-serif text-2xl md:text-3xl leading-tight italic font-light">
                To establish DTDL as the leading provider of convenient,
                qualitative and affordable housing for Nigerians and investors
                across the globe.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="serial text-gilt mb-4">Mission</p>
              <p className="display-serif text-2xl md:text-3xl leading-tight italic font-light">
                To facilitate our client&rsquo;s success by providing
                world-class housing and management services.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Specializations ── */}
      <section className="py-20 lg:py-32">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 lg:col-span-3">
              <p className="serial">Practice</p>
              <h2 className="display-serif text-3xl md:text-4xl mt-4">
                What we do.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 border-t border-rule pt-12">
            {specializations.map((spec) => (
              <div key={spec.title}>
                <h3 className="display-serif text-2xl md:text-3xl mb-4">
                  {spec.title}
                </h3>
                <p className="text-base leading-relaxed text-mute">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Values ── */}
      <section className="py-20 lg:py-32 bg-paper-deep/40 border-y border-rule">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 lg:col-span-3">
              <p className="serial">Standards</p>
              <h2 className="display-serif text-3xl md:text-4xl mt-4">
                What drives us.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-rule pt-12">
            {values.map((value) => (
              <div
                key={value.title}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <h3 className="display-serif text-2xl md:text-3xl mb-3">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-mute">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Board ── */}
      <section className="py-20 lg:py-32">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 lg:col-span-3">
              <p className="serial">Governance</p>
              <h2 className="display-serif text-3xl md:text-4xl lg:text-5xl mt-4">
                The board.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <p className="text-base lg:text-lg leading-relaxed text-mute">
                The board sets the long-term direction of the company and
                oversees governance, capital allocation, and stakeholder
                relationships. Day-to-day executive authority is delegated
                through the Executive Director to the officers below.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl">
            {board.map((officer) => (
              <PortraitCard key={officer.name} officer={officer} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Officers ── */}
      <section className="py-20 lg:py-32 bg-paper-deep/40 border-y border-rule">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 lg:col-span-3">
              <p className="serial">Executive</p>
              <h2 className="display-serif text-3xl md:text-4xl lg:text-5xl mt-4">
                The officers.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <p className="text-base lg:text-lg leading-relaxed text-mute">
                Five chief officers run the operating company. Each holds a
                clear remit and reports through the Executive Director.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {officers.map((officer) => (
              <PortraitCard key={officer.name} officer={officer} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Milestones ── */}
      <section className="py-20 lg:py-32">
        <PageContainer>
          <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 lg:col-span-3">
              <p className="serial">Timeline</p>
              <h2 className="display-serif text-3xl md:text-4xl lg:text-5xl mt-4">
                Milestones.
              </h2>
            </div>
          </div>
          <ol className="border-t border-rule">
            {milestones.map((m) => (
              <li
                key={m.year}
                className="grid grid-cols-12 gap-4 md:gap-6 py-6 lg:py-8 items-baseline border-b border-rule"
              >
                <div className="col-span-3 md:col-span-2">
                  <span className="serial-ink">{m.year}</span>
                </div>
                <p className="col-span-9 md:col-span-10 lg:col-span-9 lg:col-start-4 display-serif text-lg md:text-xl lg:text-2xl leading-snug">
                  {m.event}
                </p>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ink text-paper">
        <PageContainer>
          <div className="py-20 lg:py-28 grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <p className="serial mb-6 text-gilt">Get in touch</p>
              <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl">
                Want to learn more?
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border-b border-paper pb-1 hover:gap-5 transition-all font-mono text-[11px] tracking-[0.18em] uppercase text-paper"
              >
                Contact us ⟶
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
