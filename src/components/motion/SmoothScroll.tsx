"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/media";
import { sceneState } from "@/components/three/scene-state";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * scroll position are always computed on the same frame.
 * Visitors who prefer reduced motion keep native wheel scrolling.
 * (Lenis is always mounted — toggling it would remount the whole page.)
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.11,
        anchors: true,
        smoothWheel: !prefersReducedMotion(),
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}

function LenisBridge() {
  const lenis = useLenis((instance) => {
    ScrollTrigger.update();
    sceneState.velocity = instance.velocity;
  });

  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [lenis]);

  return null;
}
