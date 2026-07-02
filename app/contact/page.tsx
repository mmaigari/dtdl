import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "./ContactFormClient";
import ContactHero from "./ContactHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dantata Town Developers. Schedule a site visit, enquire about our projects, or reach our sales and investor relations teams.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Head office",
    lines: [
      "Plot 122Y Morija Close",
      "Off Ademola Adetokunbo Crescent",
      "Wuse 2, Abuja, Nigeria",
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+234 809 050 0100", "+234 901 119 1919"],
    actions: [
      { href: "tel:+2348090500100", label: "Call +234 809 050 0100" },
      { href: "tel:+2349011191919", label: "Call +234 901 119 1919" },
    ],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@dantatatown.com"],
    actions: [{ href: "mailto:info@dantatatown.com", label: "Email us" }],
  },
  {
    icon: Clock,
    title: "Office hours",
    lines: ["Monday – Friday · 8:00 – 17:00", "Saturday · 9:00 – 14:00"],
  },
];

const MAP_QUERY = encodeURIComponent(
  "Plot 122Y Morija Close, Ademola Adetokunbo Crescent, Wuse 2, Abuja, Nigeria"
);

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="py-20 lg:py-28 bg-cream-deep">
        <PageContainer>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                label="Send a message"
                title="We'd love to hear from you."
                align="left"
              />
              <ContactForm />
            </div>

            <aside className="lg:col-span-5 space-y-6">
              <div className="bg-ink text-cream rounded-2xl p-7 lg:p-9">
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-gold mb-5">
                  Reach us directly
                </p>
                <div className="space-y-7">
                  {contactInfo.map((info) => (
                    <div key={info.title}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-8 rounded-lg bg-cream/10 grid place-items-center text-gold">
                          <info.icon size={14} strokeWidth={1.8} />
                        </span>
                        <h3 className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/80">
                          {info.title}
                        </h3>
                      </div>
                      <div className="space-y-1 pl-11">
                        {info.lines.map((line) => (
                          <p key={line} className="text-sm text-cream/80">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-ink/10 aspect-[5/4] bg-ink/5">
                <iframe
                  title="DTDL head office on map"
                  src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                  loading="lazy"
                  className="w-full h-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
