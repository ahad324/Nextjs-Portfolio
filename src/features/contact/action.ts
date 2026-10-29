"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { serverEnv } from "@/lib/env.server";
import { contactEmail } from "./email";
import { contactSchema, type ContactInput, type ContactState } from "./schema";

const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 4;

// Best-effort, per-instance rate limit. Serverless instances are short-lived,
// so this only blunts bursts; the honeypot and timing check do the rest.
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    topic: String(formData.get("topic") ?? "General enquiry"),
    message: String(formData.get("message") ?? ""),
  };

  // Bots fill the hidden field or submit instantly. Pretend it worked.
  const honeypot = String(formData.get("company") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success", name: raw.name || "there" };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const key of Object.keys(flat) as (keyof ContactInput)[]) {
      const first = flat[key]?.[0];
      if (first) fieldErrors[key] = first;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values: raw,
    };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-nf-client-connection-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Too many messages sent. Please try again in a few minutes.",
      values: raw,
    };
  }

  const env = serverEnv();
  if (!env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set — message not sent.");
    return {
      status: "error",
      message: "The contact form is temporarily unavailable. Please email me directly.",
      values: raw,
    };
  }

  const { subject, html, text } = contactEmail({ ...parsed.data, receivedAt: new Date() });
  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: [env.CONTACT_TO_EMAIL],
    replyTo: parsed.data.email,
    subject,
    html,
    text,
    tags: [{ name: "source", value: "portfolio" }],
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return {
      status: "error",
      message: "Your message could not be sent. Please try again or email me directly.",
      values: raw,
    };
  }

  return { status: "success", name: parsed.data.name.split(" ")[0] ?? parsed.data.name };
}
