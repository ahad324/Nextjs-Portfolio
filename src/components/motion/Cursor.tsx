"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/cn";

type CursorState = "idle" | "hover" | "label" | "text" | "hidden";

/**
 * Custom cursor for mouse/trackpad users: a precise dot glued to the pointer
 * plus a ring that eases after it. Blends by difference so it stays visible on
 * light and dark areas alike. Grows over links, shows a label for
 * `data-cursor="View"` hints, and hands back to the native I-beam in fields.
 * Touch devices and reduced-motion visitors keep the system cursor.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery(FINE_POINTER);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const enabled = fine && !reduced;
  const [label, setLabel] = useState<string | null>(null);
  const [state, setState] = useState<CursorState>("hidden");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    const dotX = gsap.quickSetter(dot.current, "x", "px");
    const dotY = gsap.quickSetter(dot.current, "y", "px");
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.22, ease: "power3.out" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.22, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      const target = event.target as Element | null;
      const hinted = target?.closest<HTMLElement>("[data-cursor]");
      if (target?.closest("input:not([type=radio]):not([type=checkbox]), textarea, select, [contenteditable]")) {
        setState("text");
      } else if (hinted) {
        setLabel(hinted.dataset.cursor ?? null);
        setState("label");
      } else if (target?.closest("a, button, [role=button], [role=slider], label, summary")) {
        setLabel(null);
        setState("hover");
      } else {
        setLabel(null);
        setState("idle");
      }
    };
    const onLeave = () => setState("hidden");
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    html.addEventListener("pointerleave", onLeave);
    return () => {
      html.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      html.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const visible = state !== "hidden" && state !== "text";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* Trailing ring */}
      <div ref={ring} className="absolute top-0 left-0">
        <div
          className={cn(
            "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
            "transition-[width,height,background-color,border-color,opacity,scale] duration-500 ease-[var(--ease-out-expo)]",
            state === "label"
              ? "size-22 border border-transparent bg-ember"
              : "size-9 border border-white/70 mix-blend-difference",
            state === "hover" && "size-14 border-white bg-white/10",
            visible ? "opacity-100" : "opacity-0",
            pressed ? "scale-85" : "scale-100",
          )}
        >
          <span
            className={cn(
              "font-mono text-[0.68rem] tracking-[0.12em] text-ink uppercase transition-opacity duration-300",
              state === "label" && label ? "opacity-100" : "opacity-0",
            )}
          >
            {label}
          </span>
        </div>
      </div>
      {/* Precise dot */}
      <div ref={dot} className="absolute top-0 left-0 mix-blend-difference">
        <div
          className={cn(
            "size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[opacity,scale] duration-300",
            visible && state !== "label" ? "opacity-100" : "opacity-0",
            state === "hover" && "scale-0",
          )}
        />
      </div>
    </div>
  );
}
