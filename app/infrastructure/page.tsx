import type { Metadata } from "next";
import Image from "next/image";
import { Route, Droplet, Zap, Shield, MapPin } from "lucide-react";
import Hero from "@/components/Hero";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "Dantata Town Developers delivers world-class infrastructure — roads, drainage, electrification, and water — as the foundation of every community.",
};

const capabilities = [
  {
    icon: Route,
    title: "Road Design & Construction",
    description:
      "Thoughtfully planned roads ensure safe and efficient travel within our developments — traffic flow, pedestrian safety and accessibility are designed in from day one.",
    specs: [
      "Asphaltic concrete wearing course",
      "Laterite sub-base preparation",
      "Concrete kerb and channel systems",
      "Integrated street lighting",
    ],
  },
  {
    icon: Droplet,
    title: "Drainage Solutions",
    description:
      "Effective drainage systems manage stormwater efficiently — preventing flooding, protecting roads and infrastructure, and keeping communities comfortable year-round.",
    specs: [
      "Reinforced concrete storm drains",
      "Stormwater management systems",
      "Erosion prevention infrastructure",
      "Environmental compliance",
    ],
  },
  {
    icon: Zap,
    title: "Electrification",
    description:
      "Reliable power distribution across every development — independent generation, underground cable, transformers and prepaid metering tailored to each community.",
    specs: [
      "Independent power generation plants",
      "Underground cable distribution",
      "Prepaid metering systems",
      "33KV / 11KV injection substations",
    ],
  },
  {
    icon: Shield,
    title: "Water Reticulation",
    description:
      "Extensive networks of pipes, treatment and storage that deliver clean, potable water to every home — engineered for long-term availability and quality.",
    specs: [
      "Industrial borehole systems",
      "Water treatment and storage plants",
      "PVC reticulation pipe networks",
      "Sustainable water management",
    ],
  },
];

const featured = {
  name: "Admiralty Lakeview Estate",
  location: "Navy Town Asokoro, Abuja",
  blurb:
    "A reference infrastructure project demonstrating DTDL's end-to-end capability — roads, drainage, power and water delivered to military-grade standards on a master-planned site.",
};

export default function InfrastructurePage() {
  return (
    <>
      <Hero
        title="Infrastructure that sets the standard."
        subtitle="We build the foundation first. Roads, drainage, power and water designed by in-house engineering teams — so residents enjoy a complete community from day one."
        image="/infrastructure/hero.jpg"
        eyebrow="Infrastructure"
        compact
      />

      <section className="py-24 lg:py-32 bg-cream">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Our approach"
            title="Engineering excellence at every level."
            description="Infrastructure isn't an afterthought — it's the starting point. Our in-house engineering teams design, procure and construct every element of estate infrastructure to a single, uncompromising standard."
          />

          <div className="mt-12 space-y-24 lg:space-y-32">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-ink/5">
                    <Image
                      src={
                        [
                          "/infrastructure/road.jpg",
                          "/infrastructure/drainage.jpg",
                          "/infrastructure/electrification.jpg",
                          "/infrastructure/water.jpg",
                        ][i] || "/infrastructure/road.jpg"
                      }
                      alt={cap.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <span className="absolute top-5 left-5 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] uppercase bg-cream/95 text-ink">
                      0{i + 1} / 04
                    </span>
                  </div>
                </div>
                <div className={`lg:col-span-6 lg:pl-8 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className="inline-flex w-12 h-12 rounded-xl bg-maroon/10 text-maroon items-center justify-center mb-5">
                    <cap.icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="display-serif text-3xl md:text-4xl text-ink">{cap.title}</h3>
                  <p className="mt-5 text-ink/70 text-[17px] leading-relaxed">{cap.description}</p>
                  <ul className="mt-7 grid sm:grid-cols-2 gap-3">
                    {cap.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-3 text-sm text-ink/75">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="relative py-28 lg:py-36 bg-ink overflow-hidden">
        <Image
          src="/navy.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:32px_32px]" />

        <PageContainer>
          <div className="relative grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                  Featured infrastructure project
                </span>
              </div>
              <h2 className="display-serif text-4xl md:text-6xl text-cream">{featured.name}</h2>
              <p className="mt-5 text-cream/70 max-w-xl text-[17px] leading-relaxed">{featured.blurb}</p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <div className="inline-flex items-center gap-3 text-cream/75">
                <MapPin size={16} className="text-gold" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase">{featured.location}</span>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="See our infrastructure in person."
        description="Walk an estate with our team — feel the difference world-class infrastructure makes underfoot."
        ctaLabel="Schedule a Visit"
        ctaHref="/contact"
        showInterestCTA={false}
      />
    </>
  );
}
