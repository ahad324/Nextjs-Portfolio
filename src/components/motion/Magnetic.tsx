"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/media";

/** Pulls its child toward the cursor while hovered, then springs back. */
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !hasFinePointer() || prefersReducedMotion()) return;
      const xTo = gsap.quickTo(element, "x", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
      const yTo = gsap.quickTo(element, "y", { duration: 0.8, ease: "elastic.out(1, 0.35)" });

      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
      return () => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className="inline-flex will-change-transform">
      {children}
    </span>
  );
}
