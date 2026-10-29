"use client";

import { m } from "motion/react";
import { useRef } from "react";
import { hobbies } from "@/content/about";

// Hand-placed starting spots (percent of the box) so the chips feel tossed, not gridded.
const spots = [
  { left: "6%", top: "18%", rotate: -8 },
  { left: "34%", top: "8%", rotate: 5 },
  { left: "62%", top: "22%", rotate: -4 },
  { left: "14%", top: "56%", rotate: 7 },
  { left: "44%", top: "48%", rotate: -6 },
  { left: "72%", top: "60%", rotate: 4 },
  { left: "30%", top: "76%", rotate: -3 },
];

/** Interests, shown as draggable tags. */
export function Playground() {
  const box = useRef<HTMLDivElement>(null);

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-4 md:col-start-2">
        <p className="eyebrow">Outside work</p>
        <p className="mt-4 max-w-xs text-bone-2">Interests outside of work.</p>
      </div>
      <div
        ref={box}
        data-cursor="Drag"
        className="relative h-80 overflow-hidden rounded-3xl border border-line bg-ink-2/70 backdrop-blur-sm md:col-span-6 md:col-start-7 md:h-96"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(var(--color-line-strong)_1px,transparent_1px)] [background-size:22px_22px] opacity-60"
        />
        <ul aria-label="Hobbies">
          {hobbies.map((hobby, index) => {
            const spot = spots[index % spots.length]!;
            return (
              <m.li
                key={hobby.label}
                drag
                dragConstraints={box}
                dragElastic={0.35}
                dragTransition={{ bounceStiffness: 260, bounceDamping: 14, power: 0.3 }}
                whileHover={{ scale: 1.06 }}
                whileDrag={{ scale: 1.12, rotate: 0, zIndex: 10 }}
                initial={{ rotate: spot.rotate }}
                style={{ left: spot.left, top: spot.top }}
                className="absolute flex cursor-grab touch-none items-center gap-2 rounded-full bg-bone px-5 py-2.5 font-medium text-ink shadow-lg shadow-black/40 select-none active:cursor-grabbing"
              >
                <span aria-hidden>{hobby.emoji}</span>
                {hobby.label}
              </m.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
