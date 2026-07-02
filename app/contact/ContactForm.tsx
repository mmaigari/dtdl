"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { submitContact } from "./actions";
import { ContactSchema, type ContactInput } from "@/lib/schemas";

const SUBJECTS = [
  "Schedule a site visit",
  "Sales enquiry",
  "Investment enquiry",
  "Partnership opportunity",
  "General enquiry",
];

const inputCls =
  "w-full bg-white border border-ink/12 rounded-xl px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15 transition-all";

const labelCls =
  "block text-[11px] font-mono tracking-[0.18em] uppercase text-stone mb-2";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const subject = watch("subject");

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    setServerError(null);
    const result = await submitContact(data);
    setSubmitting(false);
    if (result.ok) {
      setSuccess(true);
      reset();
    } else {
      setServerError(result.error);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-start gap-4 p-5 rounded-xl bg-maroon/5 border border-maroon/15"
          >
            <span className="shrink-0 w-9 h-9 rounded-full bg-maroon text-cream grid place-items-center">
              <Check size={16} />
            </span>
            <div>
              <p className="display-serif text-xl text-ink">Message received.</p>
              <p className="text-sm text-ink/70 mt-1">
                Our team will respond within one business day.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="block">
            <span className={labelCls}>Full name</span>
            <input {...register("fullName")} className={inputCls} placeholder="Aisha Bello" />
            {errors.fullName && (
              <span className="block mt-1.5 text-xs text-maroon">{errors.fullName.message}</span>
            )}
          </label>
          <label className="block">
            <span className={labelCls}>Email</span>
            <input type="email" {...register("email")} className={inputCls} placeholder="you@email.com" />
            {errors.email && (
              <span className="block mt-1.5 text-xs text-maroon">{errors.email.message}</span>
            )}
          </label>
        </div>

        <label className="block">
          <span className={labelCls}>Phone (optional)</span>
          <input type="tel" {...register("phone")} className={inputCls} placeholder="+234 ..." />
        </label>

        <div>
          <span className={labelCls}>What's this about?</span>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setValue("subject", s, { shouldValidate: true })}
                className={`px-4 py-2 rounded-full border text-xs tracking-wide transition-all ${
                  subject === s
                    ? "border-maroon bg-maroon text-cream"
                    : "border-ink/15 text-ink/70 hover:border-ink/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {errors.subject && (
            <span className="block mt-1.5 text-xs text-maroon">{errors.subject.message}</span>
          )}
        </div>

        <label className="block">
          <span className={labelCls}>Message</span>
          <textarea
            {...register("message")}
            rows={6}
            className={`${inputCls} resize-none`}
            placeholder="Tell us how we can help…"
          />
          {errors.message && (
            <span className="block mt-1.5 text-xs text-maroon">{errors.message.message}</span>
          )}
        </label>

        {serverError && <p className="text-sm text-maroon">{serverError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-maroon text-cream px-7 py-3.5 text-sm font-medium hover:bg-maroon-700 transition-colors disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send message"}
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
