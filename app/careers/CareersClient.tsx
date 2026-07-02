"use client";

import { useRef, useState } from "react";
import { Users, Target, Lightbulb, Heart } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import CareersList from "./CareersList";
import ApplicationFormClient from "./ApplicationFormClient";

const cultureValues = [
  {
    icon: Target,
    title: "Purpose-driven work",
    description:
      "Every project we deliver transforms communities. Your work has a direct, tangible impact on thousands of Nigerian families.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & growth",
    description:
      "We invest in our people through training, mentorship, and exposure to complex, large-scale projects that accelerate professional development.",
  },
  {
    icon: Users,
    title: "Collaborative culture",
    description:
      "Engineers, architects, project managers, and commercial teams work side by side — cross-functional collaboration is how we deliver excellence.",
  },
  {
    icon: Heart,
    title: "Integrity & respect",
    description:
      "We operate with transparency, treat every team member with respect, and hold ourselves to the highest ethical standards.",
  },
];

export default function CareersClient() {
  const [position, setPosition] = useState<string | undefined>();
  const formRef = useRef<HTMLDivElement>(null);

  const apply = (pos: string) => {
    setPosition(pos);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <section className="py-24 lg:py-32 bg-cream">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Why join us"
            title="More than a job — a mission."
            description="At Dantata Town Developers you'll work on projects that shape Nigeria's urban future. We're looking for exceptional people who care about the craft."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {cultureValues.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-7 border border-ink/8 card-elevate"
              >
                <div className="w-11 h-11 rounded-xl bg-maroon/10 text-maroon grid place-items-center mb-5">
                  <value.icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="display-serif text-xl text-ink mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-24 lg:py-32 bg-cream-deep">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Open positions"
            title="Current opportunities."
            description="Filter by department, expand to read more, and apply directly — the form below pre-fills with the role you choose."
          />
          <CareersList onApply={apply} />
        </PageContainer>
      </section>

      <section ref={formRef} className="py-24 lg:py-32 bg-cream">
        <PageContainer>
          <SectionHeading
            align="left"
            label="Apply"
            title={position ? `Apply: ${position}` : "Submit your application."}
            description="Tell us about yourself and attach your CV. Our HR team reviews every submission carefully."
          />
          <div className="max-w-3xl">
            <ApplicationFormClient defaultPosition={position} />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
