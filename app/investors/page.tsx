import type { Metadata } from "next";
import {
  TrendingUp,
  Shield,
  Building,
  BarChart3,
  FileText,
  Phone,
} from "lucide-react";
import Hero from "@/components/Hero";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import AnimatedContainer from "@/components/AnimatedContainer";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Invest in Nigeria's real estate growth with Dantata Town Developers. Structured development, transparent processes, and long-term value creation.",
};

const reasons = [
  {
    icon: TrendingUp,
    title: "Proven Track Record",
    description:
      "Over 5,900 units across 9 estates since 2012. From the 1,299-unit Dantata Housing Estate to the 1,497-unit Dantata City, our projects consistently deliver scale and value.",
  },
  {
    icon: Shield,
    title: "Infrastructure-Led Model",
    description:
      "Our infrastructure-first approach — roads, drainage, electrification, and water reticulation — de-risks investments and drives faster absorption and higher property values.",
  },
  {
    icon: Building,
    title: "Diversified Portfolio",
    description:
      "Residential and mixed-use developments across Abuja and Kano, from luxury terraces to large-scale estates, reducing concentration risk and maximizing opportunity.",
  },
  {
    icon: BarChart3,
    title: "Transparent Operations",
    description:
      "Built on the core values of transparency, dynamic performance, and dedication to quality. Regular updates and clear communication keep investors informed.",
  },
];

const timeline = [
  {
    year: "2012–2015",
    title: "Foundation Phase",
    description:
      "Founded by Alhaji Alhassan Abdulkadir Dantata. Launched Mabushi Luxury Terraces and Dantata Housing Estate (1,299 units) in Abuja. Established the infrastructure-first model.",
  },
  {
    year: "2015–2020",
    title: "Growth Phase",
    description:
      "Launched The District by Dantata (804 units) in Gwarinpa, Dantata Garden (624 units) in Karsana, and The Residence by Dantata (371 units) on Airport Road. Scaled to 3,000+ units.",
  },
  {
    year: "2021–2023",
    title: "Expansion Phase",
    description:
      "Expanded into Kano with Dantata Square (164 units) and Abdulkadir Dantata City (981 units). Crossed 5,000 total units across the portfolio.",
  },
  {
    year: "2024–Present",
    title: "Scale Phase",
    description:
      "Launched Dantata City at FO1 Kubwa (1,497 units across two phases) and Dantata Millennium Estate in Kano. Portfolio now exceeds 5,900 units across 9 developments.",
  },
];

export default function InvestorsPage() {
  return (
    <>
      <Hero
        title="Building Long-Term Value Through Structured Development"
        subtitle="Partner with Nigeria's leading infrastructure-driven real estate developer. Transparent processes, proven returns, and a portfolio built to last."
        image="https://placehold.co/1920x1080"
        compact
      />

      <section className="py-24">
        <PageContainer>
          <SectionHeading
            label="Why Invest"
            title="A Structured Approach to Real Estate Value"
            description="Our development model creates value at every stage — from land acquisition and infrastructure delivery to home construction and community management."
          />
          <div className="grid sm:grid-cols-2 gap-8">
            {reasons.map((reason, i) => (
              <AnimatedContainer key={reason.title} delay={i * 0.1}>
                <div className="bg-light rounded-xl p-8 h-full">
                  <reason.icon
                    className="w-8 h-8 text-accent mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-lg font-medium text-dark mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-24 bg-light">
        <PageContainer>
          <SectionHeading
            label="Growth Timeline"
            title="Our Development Journey"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((phase, i) => (
              <AnimatedContainer key={phase.year} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-8 shadow-md h-full">
                  <span className="text-accent text-sm font-semibold">
                    {phase.year}
                  </span>
                  <h3 className="text-lg font-medium text-dark mt-2 mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-24">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedContainer direction="left">
              <div>
                <span className="block text-accent text-sm font-semibold tracking-widest uppercase mb-4">
                  Infrastructure Capability
                </span>
                <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-dark mb-6">
                  In-House Engineering Capacity
                </h2>
                <p className="text-body leading-relaxed mb-6">
                  Unlike developers who outsource infrastructure delivery, DTDL
                  maintains in-house engineering teams for road construction,
                  drainage systems, electrification, and water treatment. This
                  vertical integration reduces costs, ensures quality control,
                  and accelerates delivery timelines — all of which translate to
                  better returns for our investment partners.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/infrastructure" variant="outline">
                    View Infrastructure
                  </Button>
                  <Button href="/projects" variant="ghost">
                    View Projects
                  </Button>
                </div>
              </div>
            </AnimatedContainer>
            <AnimatedContainer direction="right">
              <div className="bg-primary rounded-xl p-10 text-center">
                <FileText
                  className="w-12 h-12 text-accent mx-auto mb-6"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-medium text-white mb-3">
                  Company Profile
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  Download our comprehensive company profile including portfolio
                  overview, infrastructure capabilities, and financial highlights.
                </p>
                <Button href="#" variant="primary">
                  Download Profile (PDF)
                </Button>
              </div>
            </AnimatedContainer>
          </div>
        </PageContainer>
      </section>

      <section className="py-24 bg-light">
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center">
            <Phone
              className="w-10 h-10 text-accent mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-dark mb-4">
              Contact Investor Relations
            </h2>
            <p className="text-body leading-relaxed mb-8">
              For investment enquiries, partnership discussions, or to request
              detailed financial information, please contact our Investor
              Relations team directly.
            </p>
            <div className="space-y-2 text-sm text-body mb-8">
              <p>
                Email:{" "}
                <a
                  href="mailto:info@dantatatown.com"
                  className="text-accent hover:underline"
                >
                  info@dantatatown.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+2348090500100"
                  className="text-accent hover:underline"
                >
                  +234 809 050 0100
                </a>
              </p>
            </div>
            <Button href="/contact" variant="secondary">
              Send an Enquiry
            </Button>
          </div>
        </PageContainer>
      </section>

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
