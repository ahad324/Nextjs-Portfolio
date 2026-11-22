"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const loadFeatures = () => import("./motion-features").then((module) => module.default);

/** Client-side providers. Motion features are fetched lazily, after first paint. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>{children}</SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  );
}
