"use client";

import Image from "next/image";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import portrait from "@/assets/portrait.webp";
import { site } from "@/content/site";
import { LocalTime } from "@/components/ui/LocalTime";

/** Duotone portrait that tilts toward the cursor and blooms into colour on hover. */
export function PortraitCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 18 });

  return (
    <div className="[perspective:1200px]">
      <m.figure
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          x.set((event.clientX - rect.left) / rect.width - 0.5);
          y.set((event.clientY - rect.top) / rect.height - 0.5);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-ink-3 to-ink-2"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_60%_at_50%_100%,color-mix(in_oklab,var(--color-ember)_45%,transparent),transparent_70%)] opacity-60 transition-opacity duration-700 group-hover:opacity-100"
        />
        <Image
          src={portrait}
          alt={`Portrait of ${site.name}`}
          sizes="(min-width: 768px) 30vw, 90vw"
          placeholder="blur"
          className="absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto object-contain object-bottom grayscale contrast-[1.08] transition-[filter] duration-700 group-hover:grayscale-0"
        />
        <div className="grain absolute inset-0" aria-hidden />
        <figcaption
          className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-line bg-ink/60 px-4 py-3 text-sm backdrop-blur-md"
          style={{ transform: "translateZ(40px)" }}
        >
          <span>
            <span className="block font-medium">{site.name}</span>
            <span className="text-muted">{site.location}</span>
          </span>
          <LocalTime className="font-mono text-xs text-bone-2" />
        </figcaption>
      </m.figure>
    </div>
  );
}
