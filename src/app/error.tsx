"use client";

import { useEffect } from "react";
import { site } from "@/content/site";
import { Button, ButtonLink } from "@/components/ui/Button";

/** Route-level error boundary: friendly, on-brand, with a way forward. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-svh flex-col justify-center pt-[var(--header-h)]">
      <div className="container-x">
        <p className="eyebrow">
          <span className="text-ember">(500)</span> — Error
        </p>
        <h1 className="mt-6 text-display font-semibold">Something went wrong.</h1>
        <p className="mt-6 max-w-md text-lg text-bone-2">
          Please try again. If the problem continues, contact me at{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-4 hover:text-ember"
          >
            {site.email}
          </a>
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" size="lg" variant="outline">
            Back home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
