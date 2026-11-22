"use client";

import { useRef } from "react";
import type { Entry } from "@/content/journey";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/media";

/**
 * Vertical timeline of roles or studies. The ember line draws as you scroll
 * and each dot lights up as it's reached.
 */
export function Timeline({ items, label }: { items: readonly Entry[]; label: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = ref.current;
      if (!list || prefersReducedMotion()) return;
      gsap.fromTo(
        list.querySelector(".tl-progress"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: 0.4 },
        },
      );
      gsap.utils.toArray<HTMLElement>(list.querySelectorAll(".tl-item")).forEach((item) => {
        gsap.from(item.querySelector(".tl-body"), {
          autoAlpha: 0,
          x: 30,
          duration: 1,
          scrollTrigger: { trigger: item, start: "top 82%", once: true },
        });
        gsap.to(item.querySelector(".tl-dot"), {
          backgroundColor: "var(--color-ember)",
          borderColor: "var(--color-ember)",
          scale: 1.2,
          duration: 0.4,
          scrollTrigger: {
            trigger: item,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} aria-label={label} className="relative">
      <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong" />
      <span
        aria-hidden
        className="tl-progress absolute top-2 bottom-2 left-[5px] w-px origin-top bg-ember"
      />
      {items.map((item) => (
        <li key={`${item.org}-${item.title}`} className="tl-item relative pb-14 pl-10 last:pb-0">
          <span
            aria-hidden
            className="tl-dot absolute top-1.5 left-0 size-[11px] rounded-full border border-line-strong bg-ink"
          />
          <article className="tl-body">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wider uppercase">
              <span className="text-ember">{item.period}</span>
              <span aria-hidden className="h-px w-4 bg-line-strong" />
              <span className="text-muted">{item.kind}</span>
            </p>
            <h4 className="mt-3 text-title font-semibold">{item.title}</h4>
            <p className="mt-1 text-bone-2">{item.org}</p>
            <ul className="mt-4 space-y-2 text-bone-2">
              {item.points.map((point) => (
                <li key={point} className="relative max-w-prose pl-5">
                  <span
                    aria-hidden
                    className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-line-strong"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
