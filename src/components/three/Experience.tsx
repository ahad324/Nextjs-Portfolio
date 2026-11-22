"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { setLiteMode } from "@/lib/lite-mode";
import { prefersReducedMotion } from "@/lib/media";
import { ParticleEngine, type Quality } from "./engine";

export type { Quality };

/** The one WebGL canvas for the whole site. Loaded lazily by SceneLoader. */
export default function Experience({ quality }: { quality: Quality }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvas.current) return;
    let engine: ParticleEngine | null = null;
    try {
      engine = new ParticleEngine(canvas.current, {
        quality,
        reducedMotion: prefersReducedMotion(),
        onReady: () => {
          setReady(true);
          window.dispatchEvent(new Event("scene:ready"));
        },
        onStruggle: () => setLiteMode(true),
      });
    } catch {
      // WebGL context creation can still fail (blocklisted GPU, lost context);
      // the site is fully usable without the canvas.
      window.dispatchEvent(new Event("scene:skip"));
    }
    return () => engine?.dispose();
  }, [quality]);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-0 size-full transition-opacity duration-[1600ms] ease-out",
        ready ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
