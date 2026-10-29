"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Check, Copy } from "./Icons";

/** Click to copy the email — with a tiny confirmation swap. */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group inline-flex items-center gap-3 text-left transition-colors hover:text-ember",
        className,
      )}
      aria-label={`Copy email address ${site.email}`}
    >
      <span className="underline decoration-line-strong decoration-1 underline-offset-[0.25em] transition-[text-decoration-color] group-hover:decoration-ember">
        {site.email}
      </span>
      <span className="relative inline-flex size-5 items-center justify-center" aria-hidden>
        <AnimatePresence mode="popLayout" initial={false}>
          {copied ? (
            <m.span
              key="check"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              className="text-ok"
            >
              <Check className="size-5" />
            </m.span>
          ) : (
            <m.span
              key="copy"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
            >
              <Copy className="size-[1.1rem]" />
            </m.span>
          )}
        </AnimatePresence>
      </span>
      <span role="status" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
