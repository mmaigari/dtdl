import type { Metadata } from "next";
import Image from "next/image";
import {
  Gauge,
  Shield,
  Lightbulb,
  BadgeCheck,
  HeartHandshake,
  Building2,
  Route,
  Users,
} from "lucide-react";
import Hero from "@/components/Hero";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dantata Town Developers Limited — established 2012. Master-planned communities across Abuja and Kano, built on legacy, rigour, and infrastructure-first design.",
};

const values = [
  { icon: Gauge, title: "Dynamic Performance", body: "Disciplined delivery against scope, budget and timeline — every project, every phase." },
  { icon: Shield, title: "Transparency", body: "Clear paperwork, pricing and timelines. Trust is built in the details." },
  { icon: Lightbulb, title: "Innovation", body: "Energy-efficient systems, smart security and adaptable layouts for modern living." },
  { icon: BadgeCheck, title: "Dedication to Quality", body: "Materials, finishes and infrastructure chosen for longevity — not first impressions." },
  { icon: HeartHandshake, title: "Client-Focused", body: "From first visit to handover, our team partners with you for the long term." },
];

const specializations = [
  { icon: Building2, title: "Residential Development", body: "High-quality residences — from luxury terraces to expansive housing estates — prioritising comfort, aesthetics and long-term value." },
  { icon: Route, title: "Infrastructure Construction", body: "Planning, designing and executing every essential system — roads, drainage, electrification, water reticulation and public amenities." },
  { icon: Users, title: "Property Management", body: "Comprehensive owner and investor support — tenant relations, maintenance and financial oversight that protects asset value." },
];

const milestones = [
  { year: "2012", event: "DTDL founded. Mabushi Luxury Terraces and Dantata Housing Estate launched in Abuja." },
  { year: "2015", event: "The District by Dantata launched in Gwarinpa — 804 units across diverse housing types." },
  { year: "2018", event: "Dantata Garden launched at Karsana — 624 units with extensive green spaces." },
  { year: "2021", event: "The Residence by Dantata launched on Airport Road — 371 premium units." },
  { year: "2022", event: "Expansion into Kano with Dantata Square at Fagge — 164 mixed-use units." },
  { year: "2023", event: "Abdulkadir Dantata City launched at Bompai, Kano — 981 residential units." },
  { year: "2024", event: "Dantata City at FO1 Kubwa (1,497 units) and Dantata Millennium Estate in Kano." },
];

interface Officer {
  name: string;
  role: string;
  remit: string;
  portrait?: string;
}

const board: Officer[] = [
  { name: "Alhaji Alhassan Abdulkadir Dantata", role: "Chairman", remit: "Founder and Chairman. Stewards the long-term vision and stakeholder relationships. Custodian of the Dantata real-estate legacy." },
  { name: "Engr. Nasiru Dantata", role: "Executive Director", remit: "Day-to-day executive oversight across operations, strategy execution, and board liaison." },
];

const officers: Officer[] = [
  { name: "Alhaji Auwalu Dayyabu", role: "Chief Development Officer", remit: "Land acquisition, master-planning and pre-construction strategy across all estates." },
  { name: "Mr. Milan Sharma", role: "Chief Project Officer", remit: "Construction delivery, site execution, contractor management and quality assurance." },
  { name: "Mr. Paul Ocheme", role: "Chief Finance Officer", remit: "Treasury, financial planning, investor reporting and capital structure." },
  { name: "Mr. Obiora Chinwuba", role: "Chief Corporate Officer", remit: "Legal, compliance, corporate governance and external regulatory affairs." },
  { name: "Mr. Ibrahim Garba", role: "Chief Business Officer", remit: "Sales, customer relations, marketing and post-handover community engagement." },
];

/**
 * OfficerCard has two modes:
 *  1. Visual (default) — 4:5 portrait frame with grayscale→color hover.
 *     Renders only when EVERY officer in the section has a `portrait`.
 *  2. Text-first — no image frame, just role · name · remit.
 *     Renders when any portrait is missing, so the section never mixes
 *     real photos with placeholders.
 *
 * When all portrait files land, the section flips back to visual mode
 * automatically.
 */
function OfficerCard({
  officer,
  showPortrait,
}: {
  officer: Officer;
  showPortrait: boolean;
}) {
  if (showPortrait && officer.portrait) {
    return (
      <div className="group rounded-2xl bg-white border border-ink/8 card-elevate overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
          <Image
            src={officer.portrait}
            alt={officer.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] uppercase bg-cream/95 text-ink">
              {officer.role}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="display-serif text-xl text-ink mb-2">{officer.name}</h3>
          <p className="text-sm text-ink/65 leading-relaxed">{officer.remit}</p>
        </div>
      </div>
    );
  }

  // Text-first fallback — used until all portraits are available.
  return (
    <div className="group relative p-7 md:p-8 rounded-2xl bg-white border border-ink/8 card-elevate overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-maroon via-gold to-transparent opacity-70" />
      <div className="relative">
        <span className="inline-block font-mono text-[10px] tracking-[0.22em] uppercase text-maroon mb-4">
          {officer.role}
        </span>
        <h3 className="display-serif text-2xl md:text-[1.6rem] text-ink leading-tight mb-4">
          {officer.name}
        </h3>
        <p className="text-sm text-ink/65 leading-relaxed">{officer.remit}</p>
        <span className="block mt-6 h-px w-10 bg-gold" />
      </div>
    </div>
  );
}

export default function AboutPage() {
  // Show portrait frames only when every officer in a section has one;
  // otherwise fall back to the text-first card style.
  const boardHasAllPortraits = board.every((o) => Boolean(o.portrait));
  const officersHaveAllPortraits = officers.every((o) => Boolean(o.portrait));

  return (
    <>
      <Hero
        title="Built on legacy. Delivered with rigour."
        eyebrow="About DTDL"
        subtitle="Founded in 2012 by Alhaji Alhassan Abdulkadir Dantata, DTDL grew out of the storied Dantata & Sawoe construction legacy — bringing decades of infrastructure expertise to Nigerian real estate."
        image="/hero1.png"
        compact
      />

      <section className="py-24 lg:py-28 bg-cream">
        <PageContainer>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-maroon" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-maroon">
                  Our story
                </span>
              </div>
              <h2 className="display-serif text-3xl md:text-4xl lg:text-5xl text-ink">
                A house built on legacy — and rigour.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-ink/75 text-[17px] leading-relaxed">
              <p>
                DTDL grew out of the storied Dantata &amp; Sawoe construction legacy — bringing decades of infrastructure expertise to Nigerian real estate. Our founder envisioned a company that would not only provide high-quality housing, but foster community growth and long-term value for every stakeholder.
              </p>
              <p>
                Our developments span Abuja and Kano. Each project is meticulously planned so residents enjoy modern amenities, secure environments and spaces that promote wellbeing.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-28 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:32px_32px]" />
        <PageContainer>
          <div className="relative grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-8 md:p-10 rounded-2xl bg-cream/5 border border-cream/10">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                  Vision
                </span>
              </div>
              <p className="display-serif text-2xl md:text-3xl text-cream leading-snug">
                To establish DTDL as the leading provider of convenient, qualitative and affordable housing for Nigerians and investors across the globe.
              </p>
            </div>
            <div className="p-8 md:p-10 rounded-2xl bg-cream/5 border border-cream/10">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                  Mission
                </span>
              </div>
              <p className="display-serif text-2xl md:text-3xl text-cream leading-snug">
                To facilitate our client&rsquo;s success by providing world-class housing and management services.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-28 bg-cream">
        <PageContainer>
          <SectionHeading
            align="left"
            label="What we do"
            title="Three practices, one standard."
            description="From raw land to keys-in-hand, DTDL owns every phase of estate delivery."
          />
          <div className="grid md:grid-cols-3 gap-5">
            {specializations.map((s) => (
              <div key={s.title} className="p-7 rounded-2xl bg-white border border-ink/8 card-elevate">
                <div className="inline-flex w-11 h-11 rounded-xl bg-maroon/10 text-maroon items-center justify-center mb-5">
                  <s.icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="display-serif text-2xl text-ink mb-3">{s.title}</h3>
                <p className="text-ink/65 text-sm leading-relaxed">{s.body}</p>
                <span className="block mt-5 h-px w-10 bg-gold" />
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-28 bg-cream-deep">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Core values"
            title="What drives us — and what you can hold us to."
            description="DTDL was founded on the principle of trust. These values govern how we plan, build and hand over every estate."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="group relative p-7 rounded-2xl bg-white card-elevate overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-maroon/5 group-hover:bg-maroon/10 transition-colors duration-700" />
                <div className="relative">
                  <div className="inline-flex w-11 h-11 rounded-xl bg-maroon/10 text-maroon items-center justify-center mb-5">
                    <v.icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="display-serif text-2xl text-ink mb-2">{v.title}</h3>
                  <p className="text-ink/65 text-sm leading-relaxed">{v.body}</p>
                  <span className="block mt-5 h-px w-10 bg-gold" />
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-28 bg-cream">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Governance"
            title="The board."
            description="Sets the long-term direction of the company and oversees governance, capital allocation, and stakeholder relationships."
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
            {board.map((officer) => (
              <OfficerCard
                key={officer.name}
                officer={officer}
                showPortrait={boardHasAllPortraits}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-28 bg-cream-deep">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Executive"
            title="The officers."
            description="Five chief officers run the operating company. Each holds a clear remit and reports through the Executive Director."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {officers.map((officer) => (
              <OfficerCard
                key={officer.name}
                officer={officer}
                showPortrait={officersHaveAllPortraits}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-28 bg-cream">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Timeline"
            title="Milestones."
            description="Thirteen years of building — one estate at a time."
          />
          <div className="relative max-w-3xl">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-ink/12" />
            {milestones.map((m) => (
              <div key={m.year} className="relative pl-10 py-5">
                <span className="absolute left-0 top-7 w-4 h-4 rounded-full bg-cream border-2 border-maroon" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-maroon mb-1 block">
                  {m.year}
                </span>
                <p className="text-ink/80 text-[16px] leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Want to learn more about DTDL?"
        description="From project enquiries to press and partnerships — reach out and we'll route you to the right team."
        ctaLabel="Contact us"
        ctaHref="/contact"
        showInterestCTA
      />
    </>
  );
}
