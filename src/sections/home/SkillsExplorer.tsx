"use client";

import { useId, useState, type CSSProperties } from "react";
import { skillGroups } from "@/content/skills";
import { cn } from "@/lib/cn";

/**
 * Accordion of skill groups, one open at a time. Every skill stays in the
 * HTML (closed panels are collapsed + inert) so search engines still read
 * them; the height animates with the CSS grid-rows technique.
 */
export function SkillsExplorer() {
  const [open, setOpen] = useState<string>(skillGroups[0].id);
  const baseId = useId();

  return (
    <ul className="mt-12 border-t border-line md:mt-16">
      {skillGroups.map((group, index) => {
        const isOpen = open === group.id;
        const panelId = `${baseId}-${group.id}`;
        return (
          <li key={group.id} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(group.id)}
                className="group flex w-full items-center gap-5 py-5 text-left md:py-6"
              >
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
                <span
                  className={cn(
                    "text-title font-semibold transition-[color,translate] duration-500 ease-[var(--ease-out-expo)]",
                    isOpen
                      ? "translate-x-1 text-bone"
                      : "text-bone-2 group-hover:translate-x-1 group-hover:text-bone",
                  )}
                >
                  {group.label}
                </span>
                <span className="ml-auto font-mono text-xs text-muted tabular-nums">
                  {String(group.items.length).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative size-3 transition-[rotate,color] duration-500 ease-[var(--ease-out-expo)]",
                    isOpen ? "rotate-45 text-ember" : "text-bone-2",
                  )}
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-label={group.label}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-bone-2">{group.blurb}</p>
                <ul className="flex flex-wrap gap-2 pb-7">
                  {group.items.map((item, i) => (
                    <li
                      key={item}
                      style={{ "--i": i } as CSSProperties}
                      className={cn(
                        "rounded-full border border-line-strong bg-ink-2/70 px-4 py-2 text-sm backdrop-blur-sm",
                        "transition-[opacity,translate,border-color,color] duration-500 ease-[var(--ease-out-expo)] hover:border-ember hover:text-ember",
                        isOpen
                          ? "translate-y-0 opacity-100 delay-[calc(80ms+var(--i)*35ms)] hover:delay-0"
                          : "translate-y-3 opacity-0",
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
