"use client";

import { useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { cn } from "@/lib/cn";
import { Particles } from "./Particles";

export type Quality = { count: number; dpr: [number, number] };

/** The one WebGL canvas for the whole site. Loaded lazily by SceneLoader. */
export default function Experience({ quality }: { quality: Quality }) {
  const [ready, setReady] = useState(false);
  const [dpr, setDpr] = useState(quality.dpr[1]);
  const handleReady = useCallback(() => setReady(true), []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-0 transition-opacity duration-[1600ms] ease-out",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      <Canvas
        dpr={dpr}
        flat
        camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false }}
      >
        <PerformanceMonitor
          bounds={() => [45, 58]}
          onDecline={() => setDpr((value) => Math.max(quality.dpr[0], value - 0.5))}
          onIncline={() => setDpr((value) => Math.min(quality.dpr[1], value + 0.25))}
          flipflops={3}
          onFallback={() => setDpr(quality.dpr[0])}
        />
        <Particles count={quality.count} onReady={handleReady} />
      </Canvas>
    </div>
  );
}
