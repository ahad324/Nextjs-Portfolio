"use client";

import { useScrollTo } from "@/lib/scroll";
import { ArrowUpRight } from "@/components/ui/Icons";

export function BackToTop() {
  const scrollTo = useScrollTo();
  return (
    <button
      type="button"
      onClick={() => scrollTo("top")}
      className="group inline-flex items-center gap-2 text-bone-2 transition-colors hover:text-bone"
    >
      Back to top
      <span className="flex size-8 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
        <ArrowUpRight className="size-3.5 -rotate-45" />
      </span>
    </button>
  );
}
