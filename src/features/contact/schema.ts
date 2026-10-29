import { z } from "zod";

export const topics = [
  "Full-time role",
  "Freelance project",
  "Collaboration",
  "General enquiry",
] as const;

/** Shared by the form (client hints) and the server action (source of truth). */
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
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactInput, string>>;
      values?: Partial<Record<keyof ContactInput, string>>;
    };

export const initialContactState: ContactState = { status: "idle" };
