"use client";

import { useRef, useState } from "react";
import { Users, Target, Lightbulb, Heart, Mail, ArrowDown } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import CareersList from "./CareersList";
import ApplicationFormClient from "./ApplicationFormClient";
import { getAllJobs } from "@/lib/jobs";

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
  const hasJobs = getAllJobs().length > 0;

  const apply = (pos: string) => {
    setPosition(pos);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const scrollToForm = () => {
    if (!hasJobs) setPosition("Open application");
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
          {hasJobs ? (
            <>
              <SectionHeading
                align="left"
                label="Open positions"
                title="Current opportunities."
                description="Filter by department, expand to read more, and apply directly — the form below pre-fills with the role you choose."
              />
              <CareersList onApply={apply} />
            </>
          ) : (
            <div className="max-w-3xl">
              <SectionHeading
                align="left"
                label="Open positions"
                title="No open roles right now."
                description="We're not actively hiring at the moment — but we're always keen to hear from exceptional people. Send us an open application and we'll be in touch when a role opens up that matches your background."
              />

              <div className="relative overflow-hidden rounded-2xl bg-ink text-cream p-8 md:p-10">
                <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:32px_32px]" />
                <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                  <span className="shrink-0 w-14 h-14 rounded-xl bg-cream/5 border border-cream/10 grid place-items-center text-gold">
                    <Mail size={22} strokeWidth={1.6} />
                  </span>
                  <div className="flex-1">
                    <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-gold mb-2">
                      Speculative applications welcome
                    </p>
                    <h3 className="display-serif text-2xl md:text-3xl mb-2">
                      Tell us about you.
                    </h3>
                    <p className="text-cream/70 text-sm leading-relaxed max-w-lg">
                      Attach your CV and a short note. Every submission is
                      reviewed by our HR team and kept on file for six months.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 rounded-full bg-maroon text-cream px-6 py-3 text-sm font-medium hover:bg-maroon-700 transition-colors"
                  >
                    Submit application
                    <ArrowDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
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
