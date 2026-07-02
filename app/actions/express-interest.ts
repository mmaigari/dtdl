"use server";

import { ExpressInterestSchema, type ExpressInterestInput } from "@/lib/schemas";

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitExpressInterest(
  input: ExpressInterestInput
): Promise<ActionResult> {
  const parsed = ExpressInterestSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const payload = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[express-interest] (no RESEND_API_KEY — dev log)", payload);
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
        subject: `Express Interest — ${payload.project}`,
        text: [
          `New interest from ${payload.name}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Project: ${payload.project}`,
          `Budget: ${payload.budget}`,
          `Unit type: ${payload.unitType}`,
          ``,
          payload.message || "(no message)",
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("[express-interest] Resend error", res.status, await res.text());
      return { ok: false, error: "We couldn't send your details. Please try again." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[express-interest] network error", e);
    return { ok: false, error: "Network error. Please try again." };
  }
}
