"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { projects } from "@/lib/projects";
import { submitExpressInterest } from "@/app/actions/express-interest";
import {
  ExpressInterestSchema,
  type ExpressInterestInput,
} from "@/lib/schemas";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultProject?: string;
};

const BUDGETS = [
  "Under ₦50M",
  "₦50M – ₦100M",
  "₦100M – ₦250M",
  "₦250M – ₦500M",
  "Above ₦500M",
];

const UNIT_TYPES = [
  "Apartment",
  "Terrace",
  "Semi-detached",
  "Duplex",
  "Penthouse",
  "Commercial / Office",
  "Open to options",
];

const STEPS = ["Contact", "Project", "Preferences", "Review"] as const;

export default function ExpressInterestDialog({
  open,
  onClose,
  defaultProject,
}: Props) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const projectOptions = useMemo(
    () => [...projects.map((p) => p.title), "General enquiry"],
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
  } = useForm<ExpressInterestInput>({
    resolver: zodResolver(ExpressInterestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      project: defaultProject ?? "",
      budget: "",
      unitType: "",
      message: "",
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
        budget: "",
        unitType: "",
        message: "",
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
    if (step === 2) valid = await trigger(["budget", "unitType"]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: ExpressInterestInput) => {
    setSubmitting(true);
    setServerError(null);
    const result = await submitExpressInterest(data);
    setSubmitting(false);
    if (result.ok) {
      setSuccess(true);
    } else {
      setServerError(result.error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="express-interest-title"
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
              <SuccessView onClose={onClose} />
            ) : (
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-2">
                  <span className="eyebrow">Express Interest</span>
                  <span className="h-px w-12 bg-gold" />
                </div>
                <h2
                  id="express-interest-title"
                  className="display-serif text-3xl md:text-4xl text-ink mb-1"
                >
                  Begin your conversation with DTDL.
                </h2>
                <p className="text-sm text-stone mb-8">
                  Step {step + 1} of {STEPS.length} — {STEPS[step]}
                </p>

                {/* progress rail */}
                <div className="flex gap-2 mb-10">
                  {STEPS.map((s, i) => (
                    <div
                      key={s}
                      className="h-[3px] flex-1 rounded-full bg-ink/10 overflow-hidden"
                    >
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
                        <Field
                          label="Which project are you interested in?"
                          error={errors.project?.message}
                        >
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
                        <Field label="Budget range" error={errors.budget?.message}>
                          <div className="flex flex-wrap gap-2">
                            {BUDGETS.map((b) => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setValue("budget", b, { shouldValidate: true })}
                                className={`px-4 py-2 rounded-full border text-xs tracking-wide transition-all ${
                                  values.budget === b
                                    ? "border-maroon bg-maroon text-cream"
                                    : "border-ink/15 text-ink/70 hover:border-ink/30"
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </Field>
                        <Field label="Preferred unit type" error={errors.unitType?.message}>
                          <div className="flex flex-wrap gap-2">
                            {UNIT_TYPES.map((u) => (
                              <button
                                key={u}
                                type="button"
                                onClick={() => setValue("unitType", u, { shouldValidate: true })}
                                className={`px-4 py-2 rounded-full border text-xs tracking-wide transition-all ${
                                  values.unitType === u
                                    ? "border-maroon bg-maroon text-cream"
                                    : "border-ink/15 text-ink/70 hover:border-ink/30"
                                }`}
                              >
                                {u}
                              </button>
                            ))}
                          </div>
                        </Field>
                        <Field label="Anything else? (optional)">
                          <textarea
                            rows={3}
                            {...register("message")}
                            className={`${inputCls} resize-none`}
                            placeholder="Tell us about your timeline, financing, family size, etc."
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
                            <Row label="Project" value={values.project} />
                            <Row label="Budget" value={values.budget} />
                            <Row label="Unit type" value={values.unitType} />
                          </dl>
                          {values.message && (
                            <p className="mt-4 pt-4 border-t border-ink/10 text-sm text-ink/70 italic">
                              “{values.message}”
                            </p>
                          )}
                        </div>
                        {serverError && (
                          <p className="text-sm text-maroon mt-3">{serverError}</p>
                        )}
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
                        {submitting ? "Sending…" : "Submit interest"}
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
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
      <dt className="text-[11px] font-mono tracking-[0.18em] uppercase text-stone">
        {label}
      </dt>
      <dd className="text-ink mt-0.5">{value || "—"}</dd>
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
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
      <h3 className="display-serif text-3xl md:text-4xl text-ink">Thank you.</h3>
      <p className="mt-3 text-ink/70 max-w-sm mx-auto">
        Our team will reach out within one business day to schedule a call and
        share tailored options.
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
