"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/media";
import { site } from "@/content/site";

/** Oversized name that rises letter by letter as the footer scrolls in. */
export function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".fw-char", {
        yPercent: 100,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
      });
    },
    { scope: ref },
  );

  return (
    <p
      ref={ref}
      aria-hidden
      className="container-x flex justify-between overflow-hidden pb-2 text-[clamp(4rem,17.5vw,17rem)] leading-[0.8] font-semibold tracking-[-0.065em] text-bone select-none"
    >
      {site.name.split("").map((char, index) =>
        char === " " ? (
          <span key={index} className="w-[0.12em]" />
        ) : (
          <span key={index} className="fw-char inline-block">
            {char}
          </span>
        ),
      )}
    </p>
  );
}
