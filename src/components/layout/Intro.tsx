"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { prefersReducedMotion } from "@/lib/media";
import { site } from "@/content/site";

/**
 * Opening curtain, once per session: the mark draws itself, a counter runs,
 * then the curtain lifts and the story starts. Pure CSS keeps it hidden for
 * returning visitors (see the inline script in the root layout) and a CSS
 * failsafe removes it even if JavaScript never runs.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const lenis = useLenis();

  // Hold the page still while the curtain is down.
  useEffect(() => {
    if (gone) lenis?.start();
    else lenis?.stop();
  }, [gone, lenis]);

  useEffect(() => {
    const element = root.current;
    const html = document.documentElement;
    if (!element || html.classList.contains("intro-seen") || prefersReducedMotion()) {
      markIntroDone();
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}

    const count = { value: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete: () => setGone(true),
    });
    tl.to(".intro-path", { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0)
      .to(
        count,
        {
          value: 100,
          duration: 1.3,
          ease: "power3.inOut",
          onUpdate: () => {
            if (counter.current)
              counter.current.textContent = String(Math.round(count.value)).padStart(3, "0");
          },
        },
        0,
      )
      .from(".intro-dot", { scale: 0, duration: 0.7, ease: "back.out(3)" }, 0.85)
      .from(
        ".intro-name span",
        { yPercent: 110, stagger: 0.04, duration: 0.9, ease: "expo.out" },
        0.3,
      )
      .addLabel("lift", 1.55)
      .to(
        ".intro-name span",
        { yPercent: -110, stagger: 0.02, duration: 0.6, ease: "expo.in" },
        "lift-=0.25",
      )
      .to(element, { clipPath: "inset(0 0 100% 0)", duration: 1.05 }, "lift")
      .add(markIntroDone, "lift+=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="intro fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink-2 [clip-path:inset(0_0_0%_0)]"
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="size-20 text-bone md:size-24">
        <path
          className="intro-path"
          d="M6.5 26.5 16 5.5l9.5 21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        <circle
          className="intro-dot origin-center [transform-box:fill-box]"
          cx="16"
          cy="19"
          r="2.4"
          fill="var(--color-ember)"
        />
      </svg>
      <p className="intro-name mt-8 flex overflow-hidden text-sm font-medium tracking-[0.3em] text-bone-2 uppercase">
        {site.name.split("").map((char, index) => (
          <span key={index} className="inline-block whitespace-pre">
            {char}
          </span>
        ))}
      </p>
      <span
        ref={counter}
        className="absolute right-[var(--gutter)] bottom-8 font-mono text-xs text-muted tabular-nums"
      >
        000
      </span>
    </div>
  );
}
