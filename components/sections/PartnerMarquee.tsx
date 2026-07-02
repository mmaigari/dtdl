import Marquee from "@/components/motion/Marquee";

const items = [
  "Dantata & Sawoe",
  "Federal Mortgage Bank",
  "Family Homes Funds",
  "Federal Housing Authority",
  "Abuja Investments Co.",
  "Kano State Government",
  "AfDB",
  "FCT Administration",
];

export default function PartnerMarquee() {
  return (
    <section className="py-20 bg-cream border-y border-ink/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8 flex items-center gap-3">
        <span className="h-px w-10 bg-gold" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone">
          Trusted by partners across Nigeria
        </span>
      </div>
      <Marquee items={items} />
    </section>
  );
}
