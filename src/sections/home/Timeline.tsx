"use client";

import { useRef } from "react";
import type { Milestone } from "@/content/journey";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/media";

/** Vertical timeline; the ember line draws as you scroll and each dot lights up as it's reached. */
export function Timeline({ items }: { items: readonly Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = ref.current;
      if (!list || prefersReducedMotion()) return;
      gsap.fromTo(
        ".tl-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: 0.4 },
        },
      );
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item) => {
        gsap.from(item.querySelector(".tl-body"), {
          autoAlpha: 0,
          x: 30,
          duration: 1,
          scrollTrigger: { trigger: item, start: "top 78%", once: true },
        });
        gsap.to(item.querySelector(".tl-dot"), {
          backgroundColor: "var(--color-ember)",
          borderColor: "var(--color-ember)",
          scale: 1.2,
          duration: 0.4,
          scrollTrigger: { trigger: item, start: "top 65%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong" />
      <span aria-hidden className="tl-progress absolute top-2 bottom-2 left-[5px] w-px origin-top bg-ember" />
      {items.map((item) => (
        <li key={item.title} className="tl-item relative pb-12 pl-10 last:pb-0">
          <span aria-hidden className="tl-dot absolute top-1.5 left-0 size-[11px] rounded-full border border-line-strong bg-ink" />
          <div className="tl-body">
            <p className="font-mono text-xs tracking-wider text-ember uppercase">{item.period}</p>
            <h3 className="mt-2 text-title font-semibold">
              {item.title}
              {item.place && <span className="text-muted"> · {item.place}</span>}
            </h3>
            <p className="mt-2 max-w-prose text-bone-2">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
