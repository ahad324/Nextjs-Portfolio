"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { prefersReducedMotion } from "@/lib/media";
import { cn } from "@/lib/cn";

/**
 * Runs `start` once the element is about to scroll into view. Cheaper than a
 * ScrollTrigger per element, and it defers the work itself (text splitting,
 * tween creation) until it's needed, keeping page start-up light.
 */
function whenNear(element: Element, start: () => (() => void) | void) {
  let cleanup: (() => void) | void;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      cleanup = start();
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  observer.observe(element);
  return () => {
    observer.disconnect();
    cleanup?.();
  };
}

const hasIdle = () => typeof window.requestIdleCallback === "function";
const scheduleIdle = (callback: () => void): number =>
  hasIdle()
    ? window.requestIdleCallback(callback, { timeout: 4000 })
    : (setTimeout(callback, 200) as unknown as number);
const cancelIdle = (id: number) => (hasIdle() ? window.cancelIdleCallback(id) : clearTimeout(id));

type SplitRevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Animate on load (after the intro curtain) instead of on scroll. */
  immediate?: boolean;
  delay?: number;
  by?: "lines" | "words" | "chars";
  stagger?: number;
};

/** Headline reveal: text rises out of a line mask. */
export function SplitReveal({
  as: Tag = "div",
  children,
  className,
  immediate = false,
  delay = 0,
  by = "lines",
  stagger,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      if (prefersReducedMotion()) {
        gsap.set(element, { visibility: "visible" });
        return;
      }
      // Split text and build a paused tween. Above-the-fold headlines do this
      // right away (behind the loader); the rest are prepared in idle time
      // after load, one per idle slot, so neither start-up nor scrolling pays
      // for it. Approaching the viewport then only has to play the tween.
      let split: SplitText | null = null;
      let tween: gsap.core.Tween | null = null;
      let wantsPlay = false;
      const prepare = () => {
        if (split) return;
        split = SplitText.create(element, {
          type: by === "lines" ? "lines" : `lines,${by}`,
          mask: "lines",
          // Lines and words read naturally as-is. Character splits get an aria-label on the
          // element instead, so only use by="chars" on headings (where that label is valid).
          aria: by === "chars" ? "auto" : "none",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            const targets = by === "lines" ? self.lines : by === "words" ? self.words : self.chars;
            tween = gsap.from(targets, {
              yPercent: 115,
              rotate: by === "chars" ? 6 : 2,
              duration: 1.25,
              ease: "expo.out",
              stagger: stagger ?? (by === "chars" ? 0.025 : by === "words" ? 0.04 : 0.09),
              delay,
              paused: !wantsPlay,
            });
            gsap.set(element, { visibility: "visible" });
            return tween;
          },
        });
      };
      const play = () => {
        wantsPlay = true;
        prepare();
        tween?.play();
      };

      let cleanupTrigger: () => void;
      let idle = 0;
      if (immediate) {
        prepare();
        cleanupTrigger = onIntroDone(play);
      } else {
        idle = scheduleIdle(prepare);
        cleanupTrigger = whenNear(element, play);
      }
      return () => {
        cancelIdle(idle);
        cleanupTrigger();
        (split as SplitText | null)?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}

type FadeInProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  immediate?: boolean;
  /** Stagger direct children instead of the wrapper. */
  stagger?: number;
};

/** Generic entrance: fade + rise, optionally staggering children. */
export function FadeIn({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  y = 28,
  immediate = false,
  stagger,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      if (prefersReducedMotion()) {
        gsap.set(element, { visibility: "visible" });
        return;
      }
      const run = () => {
        gsap.set(element, { visibility: "visible" });
        const targets = stagger ? Array.from(element.children) : element;
        const tween = gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 1.1,
          ease: "expo.out",
          delay,
          stagger: stagger ?? 0,
          paused: immediate,
        });
        if (immediate) return onIntroDone(() => tween.play());
      };
      return immediate ? run() : whenNear(element, run);
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={cn(className)}>
      {children}
    </Tag>
  );
}
