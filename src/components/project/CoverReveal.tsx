"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { prefersReducedMotion } from "@/lib/media";

/** Cover image that wipes open on load, then drifts with a gentle parallax. */
export function CoverReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || prefersReducedMotion()) return;
      const inner = element.firstElementChild;
      const tween = gsap.fromTo(
        element,
        { clipPath: "inset(18% 6% 0% 6% round 1.5rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", duration: 1.6, ease: "expo.out", delay: 0.55, paused: true },
      );
      const stop = onIntroDone(() => tween.play());
      if (inner) {
        gsap.fromTo(
          inner.querySelector("img, [role=img]"),
          { scale: 1.12, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
      return stop;
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
