import "server-only";
import { z } from "zod";
import { topics, type ContactInput } from "./shared";

/** Server-side source of truth for contact-form validation. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z.email("Please enter a valid email address.").trim().max(160),
  topic: z.enum(topics).default("General enquiry"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(4000, "Message must be 4,000 characters or fewer."),
}) satisfies z.ZodType<ContactInput, unknown>;
