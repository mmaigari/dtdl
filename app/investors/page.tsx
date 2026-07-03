import type { Metadata } from "next";
import {
  TrendingUp,
  Shield,
  Building,
  BarChart3,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Hero from "@/components/Hero";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Invest in Nigeria's real estate growth with Dantata Town Developers. Structured development, transparent processes, and long-term value creation.",
};

const reasons = [
  {
    icon: TrendingUp,
    title: "Proven track record",
    body: "Over 5,900 units across 9 estates since 2012 — from the 1,299-unit Dantata Housing Estate to the 1,497-unit Dantata City. Scale, delivered consistently.",
  },
  {
    icon: Shield,
    title: "Infrastructure-led model",
    body: "Roads, drainage, electrification and water reticulation designed in from day one — de-risking investments and driving faster absorption and higher yields.",
  },
  {
    icon: Building,
    title: "Diversified portfolio",
    body: "Residential and mixed-use developments across Abuja and Kano — luxury terraces to master-planned estates — reducing concentration risk.",
  },
  {
    icon: BarChart3,
    title: "Transparent operations",
    body: "Built on transparency, dynamic performance and dedication to quality. Regular updates and clear reporting keep investors informed at every stage.",
  },
];

const timeline = [
  { year: "2012 – 2015", title: "Foundation", body: "Founded by Alhaji Alhassan Abdulkadir Dantata. Mabushi Luxury Terraces + Dantata Housing Estate (1,299 units). Infrastructure-first model established." },
  { year: "2015 – 2020", title: "Growth", body: "The District (804 units), Dantata Garden (624 units) and The Residence (371 units). Portfolio scales past 3,000 units." },
  { year: "2021 – 2023", title: "Expansion", body: "Cross-border into Kano with Dantata Square (164 units) and Abdulkadir Dantata City (981 units). 5,000+ units total." },
  { year: "2024 – Now", title: "Scale", body: "Dantata City at FO1 Kubwa (1,497 units) and Dantata Millennium Estate. Portfolio exceeds 5,900 units across 9 developments." },
];

export default function InvestorsPage() {
  return (
    <>
      <Hero
        title="Long-term value through structured development."
        eyebrow="For investors"
        subtitle="Partner with Nigeria's leading infrastructure-driven real estate developer. Transparent processes, proven returns, and a portfolio built to last."
        image="/hero1.png"
        compact
      />

      <section className="py-24 lg:py-28 bg-cream">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Why invest with DTDL"
            title="A structured approach to real estate value."
            description="Our development model creates value at every stage — from land acquisition and infrastructure delivery to home construction and community management."
          />
          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.map((r) => (
              <div key={r.title} className="group relative p-8 rounded-2xl bg-white card-elevate overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-maroon/5 group-hover:bg-maroon/10 transition-colors duration-700" />
                <div className="relative">
                  <div className="inline-flex w-11 h-11 rounded-xl bg-maroon/10 text-maroon items-center justify-center mb-5">
                    <r.icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="display-serif text-2xl text-ink mb-3">{r.title}</h3>
                  <p className="text-ink/65 text-[15px] leading-relaxed">{r.body}</p>
                  <span className="block mt-5 h-px w-10 bg-gold" />
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-28 bg-cream-deep">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Growth timeline"
            title="Our development journey."
            description="Four phases, thirteen years, one uncompromising standard."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {timeline.map((phase, i) => (
              <div key={phase.year} className="relative p-6 rounded-2xl bg-white border border-ink/8 card-elevate">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-maroon mb-3 block">
                  Phase {String(i + 1).padStart(2, "0")}
                </span>
                <p className="display-serif text-xl text-ink mb-1">{phase.title}</p>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone mb-4">
                  {phase.year}
                </p>
                <p className="text-ink/65 text-sm leading-relaxed">{phase.body}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-28 bg-cream">
        <PageContainer>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-maroon" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-maroon">
                  Infrastructure capability
                </span>
              </div>
              <h2 className="display-serif text-3xl md:text-4xl lg:text-5xl text-ink mb-6">
                In-house engineering. Vertical integration. Better returns.
              </h2>
              <p className="text-ink/70 text-[17px] leading-relaxed mb-8 max-w-xl">
                Unlike developers who outsource infrastructure delivery, DTDL maintains in-house engineering teams for road construction, drainage systems, electrification and water treatment. That vertical integration reduces costs, ensures quality control, and accelerates delivery — all of which translate to better returns for our investment partners.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/infrastructure"
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 text-sm font-medium hover:bg-maroon transition-colors"
                >
                  View infrastructure
                  <ArrowRight size={16} />
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 text-ink px-6 py-3 text-sm font-medium hover:border-maroon hover:text-maroon transition-colors"
                >
                  View projects
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative p-8 md:p-10 rounded-2xl bg-ink text-cream overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:32px_32px]" />
                <div className="relative">
                  <span className="inline-flex w-12 h-12 rounded-xl bg-cream/5 border border-cream/10 items-center justify-center text-gold mb-6">
                    <FileText size={20} strokeWidth={1.6} />
                  </span>
                  <h3 className="display-serif text-2xl md:text-3xl mb-3">
                    Company profile
                  </h3>
                  <p className="text-cream/70 text-sm leading-relaxed mb-7">
                    Portfolio overview, infrastructure capabilities, delivery track record and financial highlights — in one document.
                  </p>
                  <a
                    href="/contact?subject=Investment%20enquiry"
                    className="inline-flex items-center gap-2 rounded-full bg-maroon text-cream px-6 py-3 text-sm font-medium hover:bg-maroon-700 transition-colors"
                  >
                    Request the profile
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-28 bg-cream-deep">
        <PageContainer>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-10 bg-maroon" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-maroon">
                Investor relations
              </span>
              <span className="h-px w-10 bg-maroon" />
            </div>
            <h2 className="display-serif text-3xl md:text-5xl text-ink mb-4">
              Speak with our team directly.
            </h2>
            <p className="text-ink/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              For investment enquiries, partnership discussions, or detailed financial information — reach our Investor Relations team.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
              <a
                href="mailto:info@dantatatown.com"
                className="group p-5 rounded-2xl bg-white border border-ink/8 card-elevate flex items-center gap-4 text-left"
              >
                <span className="shrink-0 w-11 h-11 rounded-xl bg-maroon/10 text-maroon grid place-items-center">
                  <Mail size={17} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone mb-1">
                    Email
                  </p>
                  <p className="text-ink font-medium group-hover:text-maroon transition-colors">
                    info@dantatatown.com
                  </p>
                </div>
              </a>
              <a
                href="tel:+2348090500100"
                className="group p-5 rounded-2xl bg-white border border-ink/8 card-elevate flex items-center gap-4 text-left"
              >
                <span className="shrink-0 w-11 h-11 rounded-xl bg-maroon/10 text-maroon grid place-items-center">
                  <Phone size={17} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone mb-1">
                    Phone
                  </p>
                  <p className="text-ink font-medium group-hover:text-maroon transition-colors">
                    +234 809 050 0100
                  </p>
                </div>
              </a>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Ready to explore an investment?"
        description="Start a conversation with our Investor Relations team — we'll walk you through the portfolio and structure options."
        ctaLabel="Send an enquiry"
        ctaHref="/contact"
        showInterestCTA
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateBusiness",
            name: "Dantata Town Developers Limited",
            description:
              "Leading real estate development company transforming the Nigerian housing landscape through innovation, quality, and community-focused development.",
            url: "https://www.dantatatown.com",
            foundingDate: "2012",
            areaServed: "Nigeria",
            founder: {
              "@type": "Person",
              name: "Alhaji Alhassan Abdulkadir Dantata",
            },
          }),
        }}
      />
    </>
  );
}
