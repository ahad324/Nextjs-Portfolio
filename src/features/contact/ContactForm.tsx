"use client";

import { AnimatePresence, m } from "motion/react";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { buttonClasses, RollingLabel } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { sendContact } from "./action";
import { initialContactState, topics, type ContactState } from "./schema";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendContact,
    initialContactState,
  );
  const startedAt = useRef<HTMLInputElement>(null);
  const [topic, setTopic] = useState<(typeof topics)[number]>(topics[0]);
  const form = useRef<HTMLFormElement>(null);
  const id = useId();

  // Move focus to the first invalid field so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = Object.keys(state.fieldErrors)[0];
    if (first) form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <m.div
            key="sent"
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[28rem] flex-col items-start justify-center rounded-3xl border border-line bg-ink-2/80 p-8 backdrop-blur-md md:p-12"
          >
            <m.span
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
              className="flex size-16 items-center justify-center rounded-full bg-ember text-ink"
            >
              <Check className="size-7" />
            </m.span>
            <h3 className="mt-8 text-headline font-semibold">Thank you, {state.name}.</h3>
            <p className="mt-4 max-w-sm text-lg text-bone-2">
              Your message has been sent. I&apos;ll reply to the email address you provided.
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={form}
            action={action}
            noValidate
            onFocusCapture={() => {
              // Timestamp the first interaction; instant submissions are bots.
              if (startedAt.current && !startedAt.current.value)
                startedAt.current.value = String(Date.now());
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-line bg-ink-2/80 p-6 backdrop-blur-md md:p-10"
            aria-describedby={state.status === "error" ? `${id}-error` : undefined}
          >
            <fieldset>
              <legend className="eyebrow">Topic</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {topics.map((option) => (
                  <label
                    key={option}
                    className={cn(
                      "relative cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ember",
                      topic === option
                        ? "border-bone bg-bone text-ink"
                        : "border-line-strong text-bone-2 hover:border-bone/60 hover:text-bone",
                    )}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={option}
                      checked={topic === option}
                      onChange={() => setTopic(option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Field
                id={`${id}-name`}
                name="name"
                label="Your name"
                autoComplete="name"
                defaultValue={values.name}
                error={errors.name}
              />
              <Field
                id={`${id}-email`}
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                inputMode="email"
                defaultValue={values.email}
                error={errors.email}
              />
            </div>
            <div className="mt-6">
              <Field
                id={`${id}-message`}
                name="message"
                label="Message"
                multiline
                defaultValue={values.message}
                error={errors.message}
                placeholder="Tell me about the role or project."
              />
            </div>

            {/* Spam traps: invisible to people, irresistible to bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />

            <div className="mt-8 flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p
                id={`${id}-error`}
                role="alert"
                className={cn("text-sm", state.status === "error" ? "text-ember" : "text-muted")}
              >
                {state.status === "error" ? (
                  <>
                    {state.message}{" "}
                    {!state.fieldErrors && (
                      <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                        {site.email}
                      </a>
                    )}
                  </>
                ) : (
                  "Your details are only used to reply to your message."
                )}
              </p>
              <button
                type="submit"
                disabled={pending}
                className={buttonClasses({ size: "lg" })}
                aria-busy={pending}
              >
                <RollingLabel>{pending ? "Sending…" : "Send message"}</RollingLabel>
                {pending ? (
                  <span
                    className="size-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
                    aria-hidden
                  />
                ) : (
                  <ArrowRight className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
                )}
              </button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  error?: string;
  multiline?: boolean;
  defaultValue?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "text";
  placeholder?: string;
};

function Field({ id, name, label, error, multiline, ...rest }: FieldProps) {
  const errorId = `${id}-err`;
  const shared = {
    id,
    name,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(
      "peer w-full rounded-2xl border bg-ink/60 px-4 text-base text-bone transition-[border-color,box-shadow] duration-300 outline-none placeholder:text-faint",
      "focus:border-ember focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-ember)_18%,transparent)]",
      error ? "border-ember/80" : "border-line-strong hover:border-bone/40",
    ),
  };
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-bone-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          {...rest}
          rows={6}
          className={cn(shared.className, "resize-y py-3.5 leading-relaxed")}
        />
      ) : (
        <input
          {...shared}
          {...rest}
          type={rest.type ?? "text"}
          className={cn(shared.className, "h-13")}
        />
      )}
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pt-2 text-sm text-ember"
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
