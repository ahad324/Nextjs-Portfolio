"use client";

import { sections } from "@/content/navigation";
import { useScrollTo } from "@/lib/scroll";

export function ScrollCue() {
  const scrollTo = useScrollTo();
  return (
    <button
      type="button"
      onClick={() => scrollTo(sections.intro)}
      className="group flex items-center gap-3 uppercase transition-colors hover:text-bone"
    >
      <span className="relative h-8 w-px overflow-hidden bg-line-strong" aria-hidden>
        <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_var(--ease-in-out-quart)_infinite] bg-ember" />
      </span>
      Scroll to explore
    </button>
  );
}
