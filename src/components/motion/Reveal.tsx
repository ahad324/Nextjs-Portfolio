"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { prefersReducedMotion } from "@/lib/media";
import { cn } from "@/lib/cn";

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
      let cleanupIntro = () => {};
      const split = SplitText.create(element, {
        type: by === "lines" ? "lines" : `lines,${by}`,
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          gsap.set(element, { visibility: "visible" });
          const targets = by === "lines" ? self.lines : by === "words" ? self.words : self.chars;
          const tween = gsap.from(targets, {
            yPercent: 115,
            rotate: by === "chars" ? 6 : 2,
            duration: 1.25,
            ease: "expo.out",
            stagger: stagger ?? (by === "chars" ? 0.025 : by === "words" ? 0.04 : 0.09),
            delay,
            paused: immediate,
            scrollTrigger: immediate
              ? undefined
              : { trigger: element, start: "top 88%", once: true },
          });
          if (immediate) cleanupIntro = onIntroDone(() => tween.play());
          return tween;
        },
      });
      return () => {
        cleanupIntro();
        split.revert();
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
      gsap.set(element, { visibility: "visible" });
      if (prefersReducedMotion()) return;
      const targets = stagger ? Array.from(element.children) : element;
      const tween = gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration: 1.1,
        ease: "expo.out",
        delay,
        stagger: stagger ?? 0,
        paused: immediate,
        scrollTrigger: immediate ? undefined : { trigger: element, start: "top 90%", once: true },
      });
      if (immediate) return onIntroDone(() => tween.play());
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={cn(className)}>
      {children}
    </Tag>
  );
}
