import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import SectionHeading from "@/components/SectionHeading";
import PageContainer from "@/components/PageContainer";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import HeritageIntro from "@/components/sections/HeritageIntro";
import CoreValues from "@/components/sections/CoreValues";
import AmenitiesShowcase from "@/components/sections/AmenitiesShowcase";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import PortfolioMoments from "@/components/sections/PortfolioMoments";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Hero
        title="Building Communities. Creating Value."
        subtitle="DTDL is an infrastructure-led real estate developer crafting master-planned communities across Abuja and Kano — homes, roads, power, water and security delivered as one vision."
        images={["/hero1.png", "/hero2.png"]}
        primaryCta={{ label: "Explore Projects", href: "/projects" }}
        showVisitCTA
      />

      <StatsSection />

      <HeritageIntro />

      <section className="py-28 bg-cream">
        <PageContainer>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <SectionHeading
              align="left"
              label="Featured projects"
              title="Iconic estates across Nigeria."
              description="From flagship master-plans in Abuja to mixed-use developments in Kano — every DTDL community is engineered as a complete neighbourhood."
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </PageContainer>
      </section>

      <CoreValues />

      <PortfolioMoments />

      <AmenitiesShowcase />

      <PartnerMarquee />

      <CTASection
        title="Ready to make a home with DTDL?"
        description="Schedule a private site visit or share your preferences — our advisory team will respond within one business day."
        ctaLabel="Schedule a Visit"
        ctaHref="/contact"
        showInterestCTA
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Dantata Town Developers Limited",
            description:
              "Infrastructure-led real estate developer building master-planned communities across Abuja and Kano.",
            url: "https://www.dantatatown.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Plot 122Y Morija Close, Off Ademola Adetokunbo Crescent",
              addressLocality: "Abuja",
              addressCountry: "NG",
            },
            telephone: "+2348090500100",
            email: "info@dantatatown.com",
            areaServed: "Nigeria",
            foundingDate: "2012",
            founder: {
              "@type": "Person",
              name: "Alhaji Alhassan Abdulkadir Dantata",
            },
            slogan: "The Trusting Development.",
          }),
        }}
      />
    </>
  );
}
