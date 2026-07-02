"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ArrowRight, ArrowLeft, Check, Calendar } from "lucide-react";
import { projects } from "@/lib/projects";
import { submitScheduleVisit } from "@/app/actions/schedule-visit";
import {
  ScheduleVisitSchema,
  type ScheduleVisitInput,
} from "@/lib/schemas";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultProject?: string;
};

const TIMES = ["9:00", "10:30", "12:00", "14:00", "15:30"];
const PARTY = ["1", "2", "3–4", "5+"];

function getNextDates(count = 10): { iso: string; weekday: string; day: number; month: string }[] {
  const out: { iso: string; weekday: string; day: number; month: string }[] = [];
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  let d = new Date();
  d.setDate(d.getDate() + 1);
  while (out.length < count) {
    if (d.getDay() !== 0) {
      out.push({
        iso: d.toISOString().slice(0, 10),
        weekday: weekday[d.getDay()],
        day: d.getDate(),
        month: month[d.getMonth()],
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

const STEPS = ["Contact", "Project", "When", "Review"] as const;

export default function ScheduleVisitDialog({
  open,
  onClose,
  defaultProject,
}: Props) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const dates = useMemo(() => getNextDates(10), []);
  const projectOptions = useMemo(
    () => projects.map((p) => p.title),
    []
  );

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ScheduleVisitInput>({
    resolver: zodResolver(ScheduleVisitSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      project: defaultProject ?? "",
      date: "",
      time: "",
      party: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (open) {
      setStep(0);
      setSuccess(false);
      setServerError(null);
      reset({
        name: "",
        email: "",
        phone: "",
        project: defaultProject ?? "",
        date: "",
        time: "",
        party: "",
        notes: "",
      });
    }
  }, [open, defaultProject, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const values = watch();

  const next = async () => {
    let valid = true;
    if (step === 0) valid = await trigger(["name", "email", "phone"]);
    if (step === 1) valid = await trigger(["project"]);
    if (step === 2) valid = await trigger(["date", "time", "party"]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: ScheduleVisitInput) => {
    setSubmitting(true);
    setServerError(null);
    const result = await submitScheduleVisit(data);
    setSubmitting(false);
    if (result.ok) setSuccess(true);
    else setServerError(result.error);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-visit-title"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-full max-w-2xl bg-cream rounded-2xl shadow-2xl overflow-hidden"
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full grid place-items-center text-ink/70 hover:text-maroon hover:bg-ink/5 transition-colors"
            >
              <X size={18} />
            </button>

            {success ? (
              <SuccessView onClose={onClose} when={`${values.date} @ ${values.time}`} />
            ) : (
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar size={14} className="text-maroon" />
                  <span className="eyebrow">Schedule a Visit</span>
                  <span className="h-px w-12 bg-gold" />
                </div>
                <h2
                  id="schedule-visit-title"
                  className="display-serif text-3xl md:text-4xl text-ink mb-1"
                >
                  Walk an estate in person.
                </h2>
                <p className="text-sm text-stone mb-8">
                  Step {step + 1} of {STEPS.length} — {STEPS[step]}
                </p>

                <div className="flex gap-2 mb-10">
                  {STEPS.map((s, i) => (
                    <div key={s} className="h-[3px] flex-1 rounded-full bg-ink/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-maroon"
                        initial={false}
                        animate={{ width: i <= step ? "100%" : "0%" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <StepWrap key="s0">
                        <Field label="Full name" error={errors.name?.message}>
                          <input
                            type="text"
                            autoFocus
                            {...register("name")}
                            className={inputCls}
                            placeholder="Aisha Bello"
                          />
                        </Field>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <Field label="Email" error={errors.email?.message}>
                            <input
                              type="email"
                              {...register("email")}
                              className={inputCls}
                              placeholder="you@email.com"
                            />
                          </Field>
                          <Field label="Phone" error={errors.phone?.message}>
                            <input
                              type="tel"
                              {...register("phone")}
                              className={inputCls}
                              placeholder="+234 ..."
                            />
                          </Field>
                        </div>
                      </StepWrap>
                    )}

                    {step === 1 && (
                      <StepWrap key="s1">
                        <Field label="Which estate would you like to see?" error={errors.project?.message}>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {projectOptions.map((p) => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => setValue("project", p, { shouldValidate: true })}
                                className={`text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${
                                  values.project === p
                                    ? "border-maroon bg-maroon/5 text-ink"
                                    : "border-ink/10 text-ink/80 hover:border-ink/30"
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </Field>
                      </StepWrap>
                    )}

                    {step === 2 && (
                      <StepWrap key="s2">
                        <Field label="Pick a date" error={errors.date?.message}>
                          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                            {dates.map((d) => (
                              <button
                                key={d.iso}
                                type="button"
                                onClick={() => setValue("date", d.iso, { shouldValidate: true })}
                                className={`shrink-0 snap-start w-20 py-3 rounded-xl border text-center transition-all ${
                                  values.date === d.iso
                                    ? "border-maroon bg-maroon text-cream"
                                    : "border-ink/12 text-ink/80 hover:border-ink/30 bg-white"
                                }`}
                              >
                                <span className="block text-[10px] font-mono uppercase tracking-[0.18em] opacity-70">{d.weekday}</span>
                                <span className="block display-serif text-2xl mt-1">{d.day}</span>
                                <span className="block text-[10px] font-mono uppercase tracking-[0.18em] opacity-70">{d.month}</span>
                              </button>
                            ))}
                          </div>
                        </Field>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <Field label="Time" error={errors.time?.message}>
                            <div className="flex flex-wrap gap-2">
                              {TIMES.map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setValue("time", t, { shouldValidate: true })}
                                  className={`px-4 py-2 rounded-full border text-xs tracking-wide transition-all ${
                                    values.time === t
                                      ? "border-maroon bg-maroon text-cream"
                                      : "border-ink/15 text-ink/70 hover:border-ink/30"
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </Field>
                          <Field label="Party size" error={errors.party?.message}>
                            <div className="flex flex-wrap gap-2">
                              {PARTY.map((p) => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => setValue("party", p, { shouldValidate: true })}
                                  className={`px-4 py-2 rounded-full border text-xs tracking-wide transition-all ${
                                    values.party === p
                                      ? "border-maroon bg-maroon text-cream"
                                      : "border-ink/15 text-ink/70 hover:border-ink/30"
                                  }`}
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          </Field>
                        </div>
                        <Field label="Notes (optional)">
                          <textarea
                            rows={2}
                            {...register("notes")}
                            className={`${inputCls} resize-none`}
                            placeholder="Any specifics — units of interest, accessibility, family considerations…"
                          />
                        </Field>
                      </StepWrap>
                    )}

                    {step === 3 && (
                      <StepWrap key="s3">
                        <div className="rounded-xl border border-ink/10 p-5 bg-white">
                          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                            <Row label="Name" value={values.name} />
                            <Row label="Email" value={values.email} />
                            <Row label="Phone" value={values.phone} />
                            <Row label="Estate" value={values.project} />
                            <Row label="Date" value={values.date} />
                            <Row label="Time" value={values.time} />
                            <Row label="Party" value={values.party} />
                          </dl>
                          {values.notes && (
                            <p className="mt-4 pt-4 border-t border-ink/10 text-sm text-ink/70 italic">
                              “{values.notes}”
                            </p>
                          )}
                        </div>
                        {serverError && <p className="text-sm text-maroon mt-3">{serverError}</p>}
                      </StepWrap>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-6 mt-2 border-t border-ink/10">
                    <button
                      type="button"
                      onClick={back}
                      disabled={step === 0}
                      className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink disabled:opacity-0 disabled:pointer-events-none transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    {step < STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={next}
                        className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 text-sm font-medium hover:bg-maroon transition-colors"
                      >
                        Continue <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 rounded-full bg-maroon text-cream px-6 py-3 text-sm font-medium hover:bg-maroon-700 transition-colors disabled:opacity-60"
                      >
                        {submitting ? "Sending…" : "Confirm visit"}
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full bg-white border border-ink/12 rounded-xl px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15 transition-all";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono tracking-[0.18em] uppercase text-stone mb-2">
        {label}
      </span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-maroon">{error}</span>}
    </label>
  );
}

function StepWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      {children}
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-mono tracking-[0.18em] uppercase text-stone">{label}</dt>
      <dd className="text-ink mt-0.5">{value || "—"}</dd>
    </div>
  );
}

function SuccessView({ onClose, when }: { onClose: () => void; when: string }) {
  return (
    <div className="p-10 md:p-14 text-center">
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="mx-auto w-16 h-16 rounded-full bg-maroon text-cream grid place-items-center mb-6"
      >
        <Check size={28} strokeWidth={2.5} />
      </motion.div>
      <h3 className="display-serif text-3xl md:text-4xl text-ink">You're booked.</h3>
      <p className="mt-3 text-ink/70 max-w-sm mx-auto">
        We've received your request for <span className="text-ink font-medium">{when}</span>. Our team will confirm by email within one business day.
      </p>
      <button
        onClick={onClose}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 text-sm font-medium hover:bg-maroon transition-colors"
      >
        Close
      </button>
    </div>
  );
}
