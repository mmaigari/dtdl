"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Upload, X } from "lucide-react";
import { getAllJobs } from "@/lib/jobs";
import { submitApplication } from "./actions";
import { ApplicationSchema, type ApplicationInput } from "@/lib/schemas";

const inputCls =
  "w-full bg-white border border-ink/12 rounded-xl px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15 transition-all";
const labelCls =
  "block text-[11px] font-mono tracking-[0.18em] uppercase text-stone mb-2";

const MAX_BYTES = 4 * 1024 * 1024;

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function ApplicationForm({ defaultPosition }: { defaultPosition?: string }) {
  const jobs = getAllJobs();
  const fileInput = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{ name: string; sizeKb: number } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: defaultPosition ?? "",
      cvName: "",
      cvBase64: "",
      coverLetter: "",
    },
  });

  const position = watch("position");

  const handleFile = async (file: File | null) => {
    setFileError(null);
    if (!file) {
      setFileMeta(null);
      setValue("cvName", "");
      setValue("cvBase64", "");
      return;
    }
    if (file.size > MAX_BYTES) {
      setFileError("File is larger than 4MB — please compress your CV.");
      return;
    }
    if (!/\.(pdf|docx?|rtf)$/i.test(file.name)) {
      setFileError("Please upload a PDF or Word document.");
      return;
    }
    const base64 = await readFileAsBase64(file);
    setFileMeta({ name: file.name, sizeKb: Math.round(file.size / 1024) });
    setValue("cvName", file.name, { shouldValidate: true });
    setValue("cvBase64", base64, { shouldValidate: true });
  };

  const onSubmit = async (data: ApplicationInput) => {
    setSubmitting(true);
    setServerError(null);
    const result = await submitApplication(data);
    setSubmitting(false);
    if (result.ok) {
      setSuccess(true);
      reset();
      setFileMeta(null);
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
              <p className="display-serif text-xl text-ink">Application received.</p>
              <p className="text-sm text-ink/70 mt-1">
                Our HR team reviews every submission and will respond within five working days.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="block">
            <span className={labelCls}>Full name</span>
            <input {...register("fullName")} className={inputCls} placeholder="Your full name" />
            {errors.fullName && <span className="block mt-1.5 text-xs text-maroon">{errors.fullName.message}</span>}
          </label>
          <label className="block">
            <span className={labelCls}>Email</span>
            <input type="email" {...register("email")} className={inputCls} placeholder="you@email.com" />
            {errors.email && <span className="block mt-1.5 text-xs text-maroon">{errors.email.message}</span>}
          </label>
        </div>

        <label className="block">
          <span className={labelCls}>Phone</span>
          <input type="tel" {...register("phone")} className={inputCls} placeholder="+234 ..." />
          {errors.phone && <span className="block mt-1.5 text-xs text-maroon">{errors.phone.message}</span>}
        </label>

        <div>
          <span className={labelCls}>Position</span>
          <div className="flex flex-wrap gap-2">
            {jobs.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => setValue("position", j.title, { shouldValidate: true })}
                className={`px-4 py-2 rounded-full border text-xs tracking-wide transition-all ${
                  position === j.title
                    ? "border-maroon bg-maroon text-cream"
                    : "border-ink/15 text-ink/70 hover:border-ink/30"
                }`}
              >
                {j.title}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setValue("position", "Open application", { shouldValidate: true })}
              className={`px-4 py-2 rounded-full border text-xs tracking-wide transition-all ${
                position === "Open application"
                  ? "border-maroon bg-maroon text-cream"
                  : "border-ink/15 text-ink/70 hover:border-ink/30"
              }`}
            >
              Open application
            </button>
          </div>
          {errors.position && <span className="block mt-1.5 text-xs text-maroon">{errors.position.message}</span>}
        </div>

        <div>
          <span className={labelCls}>CV / Résumé (PDF or Word, ≤ 4MB)</span>
          <input
            ref={fileInput}
            type="file"
            accept=".pdf,.doc,.docx,.rtf"
            aria-label="Upload your CV"
            title="Upload your CV"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
          {!fileMeta ? (
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="w-full flex items-center justify-center gap-3 px-4 py-6 border border-dashed border-ink/20 rounded-xl text-sm text-ink/70 hover:border-maroon hover:bg-maroon/5 hover:text-ink transition-colors"
            >
              <Upload size={18} />
              Click to upload your CV
            </button>
          ) : (
            <div className="flex items-center justify-between gap-3 px-4 py-3 border border-ink/12 bg-white rounded-xl">
              <div className="min-w-0">
                <p className="text-sm text-ink truncate">{fileMeta.name}</p>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
                  {fileMeta.sizeKb} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleFile(null)}
                aria-label="Remove file"
                className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-ink/60 hover:text-maroon hover:bg-ink/5 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {fileError && <span className="block mt-1.5 text-xs text-maroon">{fileError}</span>}
        </div>

        <label className="block">
          <span className={labelCls}>Cover note (optional)</span>
          <textarea
            {...register("coverLetter")}
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Tell us why you'd be a great fit for the team…"
          />
        </label>

        {serverError && <p className="text-sm text-maroon">{serverError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-maroon text-cream px-7 py-3.5 text-sm font-medium hover:bg-maroon-700 transition-colors disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit application"}
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
