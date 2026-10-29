import { z } from "zod";

export const topics = ["Full-time role", "Freelance project", "Collaboration", "Just saying hi"] as const;

/** Shared by the form (client hints) and the server action (source of truth). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Tell me your name.").max(80, "That name is a bit long."),
  email: z.email("That email doesn't look right.").trim().max(160),
  topic: z.enum(topics).default("Just saying hi"),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail, please (10+ characters).")
    .max(4000, "Please keep it under 4,000 characters."),
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
