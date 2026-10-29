import "server-only";
import { z } from "zod";

const schema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.email().default("ahadg446@gmail.com"),
  CONTACT_FROM_EMAIL: z.string().min(3).default("Portfolio <onboarding@resend.dev>"),
});

/** Parsed lazily so a missing key never breaks the build — only the contact action needs it. */
export function serverEnv() {
  return schema.parse({
    RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || undefined,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || undefined,
  });
}
