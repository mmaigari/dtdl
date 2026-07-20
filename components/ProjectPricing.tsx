"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Calendar, Download, Lock } from "lucide-react";
import { useExpressInterest } from "@/components/ExpressInterestProvider";
import type { FinishStage, ProjectPricing, UnitPrice } from "@/lib/projects";

type Props = {
  pricing: ProjectPricing;
  projectName: string;
};

const STAGE_ORDER: FinishStage[] = ["Finished", "Shell", "Carcass", "DPC"];

const STAGE_COPY: Record<FinishStage, string> = {
  Finished:
    "Move-in ready — fully finished interiors, fittings and finishes.",
  Shell:
    "External structure and roofing complete. Buyer completes interior finishes.",
  Carcass:
    "Structural frame complete — walls, floors, roofing. Ready for shell + finishing works.",
  DPC:
    "Damp-proof course level — foundation and plinth complete, ready to build up.",
};

function formatNaira(n: number): string {
  return `₦${n.toLocaleString("en-NG")}`;
}

export default function ProjectPricing({ pricing, projectName }: Props) {
  const { openInterest } = useExpressInterest();

  const hasStages = pricing.units.some((u) => u.stage);
  const groups: { stage: FinishStage | null; units: UnitPrice[] }[] = hasStages
    ? STAGE_ORDER.filter((stage) => pricing.units.some((u) => u.stage === stage)).map(
        (stage) => ({
          stage,
          units: pricing.units.filter((u) => u.stage === stage),
        })
      )
    : [{ stage: null, units: pricing.units }];

  return (
    <div>
      {/* Meta strip */}
      <div className="mt-2 mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-ink/60">
        {pricing.updated && (
          <span className="inline-flex items-center gap-2">
            <Calendar size={13} className="text-maroon" />
            <span className="font-mono tracking-[0.14em] uppercase text-[11px]">
              Prices as of {pricing.updated}
            </span>
          </span>
        )}
        {pricing.title && (
          <span className="inline-flex items-center gap-2">
            <Award size={13} className="text-gold-dark" />
            <span className="font-mono tracking-[0.14em] uppercase text-[11px]">
              {pricing.title}
            </span>
          </span>
        )}
      </div>

      {/* Grouped tables */}
      <div className="space-y-10">
        {groups.map((group, gi) => (
          <motion.div
            key={group.stage ?? "single"}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {group.stage && (
              <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-maroon text-cream px-3 py-1 text-[10px] font-mono tracking-[0.22em] uppercase">
                    {group.stage} Houses
                  </span>
                  <span className="text-[13px] text-ink/60 hidden sm:inline">
                    {STAGE_COPY[group.stage]}
                  </span>
                </div>
              </div>
            )}
            {group.stage && (
              <p className="mb-4 text-[13px] text-ink/60 sm:hidden">
                {STAGE_COPY[group.stage]}
              </p>
            )}

            <div className="rounded-2xl border border-ink/8 bg-white overflow-hidden">
              <div className="grid grid-cols-12 px-5 py-3 border-b border-ink/8 bg-cream-deep text-[10px] font-mono tracking-[0.18em] uppercase text-stone">
                <div className="col-span-7 sm:col-span-6">Unit</div>
                <div className="hidden sm:block sm:col-span-2">Size</div>
                <div className="col-span-5 sm:col-span-4 text-right">Price</div>
              </div>
              {group.units.map((unit, i) => (
                <div
                  key={`${unit.type}-${i}`}
                  className={`grid grid-cols-12 items-baseline px-5 py-4 gap-x-3 ${
                    i > 0 ? "border-t border-ink/8" : ""
                  }`}
                >
                  <div className="col-span-7 sm:col-span-6">
                    <p className="text-[15px] text-ink font-medium">{unit.type}</p>
                    {unit.note && (
                      <p className="mt-1 text-[12px] text-ink/60 leading-relaxed">
                        {unit.note}
                      </p>
                    )}
                    {unit.paymentMonths && (
                      <p className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-maroon">
                        {unit.paymentMonths}-month payment plan
                      </p>
                    )}
                    <p className="mt-1 text-[12px] text-ink/60 sm:hidden">
                      {unit.size ?? "—"}
                    </p>
                  </div>
                  <div className="hidden sm:block sm:col-span-2 text-[13px] text-ink/70">
                    {unit.size ?? "—"}
                  </div>
                  <div className="col-span-5 sm:col-span-4 text-right">
                    <p className="display-serif text-lg md:text-xl text-ink whitespace-nowrap">
                      {formatNaira(unit.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment plan callout */}
      {pricing.paymentPlan && (
        <div className="mt-8 flex items-start gap-4 p-5 rounded-2xl border border-gold/30 bg-gold/5">
          <span className="shrink-0 w-10 h-10 rounded-lg bg-gold/20 text-gold-dark grid place-items-center">
            <Calendar size={16} strokeWidth={1.8} />
          </span>
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold-dark mb-1">
              Payment plan
            </p>
            <p className="text-ink text-[15px]">{pricing.paymentPlan}</p>
          </div>
        </div>
      )}

      {/* Payment details — gated by Express Interest */}
      <div className="mt-4 relative overflow-hidden rounded-2xl bg-ink text-cream p-6 md:p-8">
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:32px_32px]" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <span className="shrink-0 w-11 h-11 rounded-xl bg-cream/5 border border-cream/10 grid place-items-center text-gold">
            <Lock size={17} strokeWidth={1.8} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mb-1">
              Payment details on request
            </p>
            <p className="text-cream/80 text-sm leading-relaxed">
              Bank details, escrow arrangements and payment schedules are shared once we've had a brief conversation about your requirements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openInterest(projectName)}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-maroon text-cream px-5 py-2.5 text-sm font-medium hover:bg-maroon-700 transition-colors"
          >
            Request details
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* PDF + disclaimer */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {pricing.priceListPdf ? (
          <a
            href={pricing.priceListPdf}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink hover:border-maroon hover:text-maroon transition-colors self-start"
          >
            <Download size={15} />
            Download price sheet (PDF)
          </a>
        ) : (
          <span />
        )}
        {pricing.disclaimer && (
          <p className="text-[12px] text-stone italic max-w-lg">{pricing.disclaimer}</p>
        )}
      </div>
    </div>
  );
}
