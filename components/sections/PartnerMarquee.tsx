import Image from "next/image";
import { partners } from "@/lib/partners";

export default function PartnerMarquee() {
  const doubled = [...partners, ...partners];

  return (
    <section className="py-20 bg-cream border-y border-ink/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10 flex items-center gap-3">
        <span className="h-px w-10 bg-gold" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone">
          Trusted by partners across Nigeria
        </span>
      </div>

      <div className="marquee overflow-hidden w-full">
        <div className="marquee-track py-2 items-center">
          {doubled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="shrink-0 flex items-center justify-center px-6"
              {...(i >= partners.length ? { "aria-hidden": "true" as const } : {})}
            >
              <div className="relative h-14 md:h-16 w-40 md:w-48">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="200px"
                  className="object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
