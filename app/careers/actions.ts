"use server";

import { ApplicationSchema, type ApplicationInput } from "@/lib/schemas";

export type ApplicationResult = { ok: true } | { ok: false; error: string };

export async function submitApplication(
  input: ApplicationInput
): Promise<ApplicationResult> {
  const parsed = ApplicationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the highlighted fields." };
  }

  const payload = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[application] (no RESEND_API_KEY — dev log)", {
      ...payload,
      cvBase64: payload.cvBase64 ? `(${payload.cvBase64.length} chars)` : "(none)",
    });
    return { ok: true };
  }

  type Attachment = { filename: string; content: string };
  const attachments: Attachment[] = [];
  if (payload.cvBase64 && payload.cvName) {
    attachments.push({
      filename: payload.cvName,
      content: payload.cvBase64.split(",").pop() || "",
    });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "DTDL Careers <noreply@dantatatown.com>",
        to: ["info@dantatatown.com"],
        reply_to: payload.email,
        subject: `Application — ${payload.position}`,
        text: [
          `New application from ${payload.fullName}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Position: ${payload.position}`,
          ``,
          payload.coverLetter || "(no cover letter)",
        ].join("\n"),
        attachments,
      }),
    });
    if (!res.ok) {
      console.error("[application] Resend error", res.status, await res.text());
      return { ok: false, error: "We couldn't submit your application. Please try again." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[application] network error", e);
    return { ok: false, error: "Network error. Please try again." };
  }
}
