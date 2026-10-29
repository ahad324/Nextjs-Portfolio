"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/media";

/** Paragraph whose words light up as you scroll through it. */
export function ScrubWords({
  text,
  as: Tag = "p",
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || prefersReducedMotion()) return;
      const split = SplitText.create(element, {
        type: "words",
        wordsClass: "will-change-[opacity]",
      });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: element, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
