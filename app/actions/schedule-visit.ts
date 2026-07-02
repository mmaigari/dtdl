"use server";

import { ScheduleVisitSchema, type ScheduleVisitInput } from "@/lib/schemas";

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitScheduleVisit(
  input: ScheduleVisitInput
): Promise<ActionResult> {
  const parsed = ScheduleVisitSchema.safeParse(input);
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
    console.log("[schedule-visit] (no RESEND_API_KEY — dev log)", payload);
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
        subject: `Site Visit Request — ${payload.project}`,
        text: [
          `New site-visit request from ${payload.name}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Project: ${payload.project}`,
          `Date / time: ${payload.date} @ ${payload.time}`,
          `Party size: ${payload.party}`,
          ``,
          payload.notes || "(no notes)",
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("[schedule-visit] Resend error", res.status, await res.text());
      return { ok: false, error: "We couldn't send your request. Please try again." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[schedule-visit] network error", e);
    return { ok: false, error: "Network error. Please try again." };
  }
}
