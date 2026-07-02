"use server";

import { ContactSchema, type ContactInput } from "@/lib/schemas";

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the highlighted fields." };
  }

  const payload = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[contact] (no RESEND_API_KEY — dev log)", payload);
    return { ok: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "DTDL Website <noreply@dantatatown.com>",
        to: ["dantatatown@gmail.com"],
        reply_to: payload.email,
        subject: `[Website Contact] ${payload.subject}`,
        text: [
          `From: ${payload.fullName}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone || "—"}`,
          `Subject: ${payload.subject}`,
          ``,
          payload.message,
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return { ok: false, error: "We couldn't send your message. Please try again." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[contact] network error", e);
    return { ok: false, error: "Network error. Please try again." };
  }
}
