/**
 * Contact-form constants and types shared by the client form and the server.
 * Kept free of runtime dependencies: the validation library (zod) lives in
 * schema.ts and is only ever imported on the server.
 */
export const topics = [
  "Full-time role",
  "Freelance project",
  "Collaboration",
  "General enquiry",
] as const;

export type Topic = (typeof topics)[number];

export type ContactInput = {
  name: string;
  email: string;
  topic: Topic;
  message: string;
};

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
