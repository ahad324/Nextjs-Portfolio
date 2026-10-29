"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Quality } from "./Experience";

const Experience = dynamic(() => import("./Experience"), { ssr: false });

/**
 * Decides whether — and how richly — to run WebGL, then loads the 3D chunk
 * only once the browser is idle so it never competes with first paint.
 */
export function SceneLoader() {
  const [quality, setQuality] = useState<Quality | null>(null);

  useEffect(() => {
    const picked = pickQuality();
    if (!picked) return;
    const start = () => setQuality(picked);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, []);

  return quality ? <Experience quality={quality} /> : null;
}

function pickQuality(): Quality | null {
  if (!supportsWebGL()) return null;

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return null;

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const small = window.matchMedia("(max-width: 767px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (small || coarse) {
    return cores >= 8 && memory >= 6 ? { count: 13000, dpr: [1, 1.75] } : { count: 8000, dpr: [1, 1.5] };
  }
  if (cores >= 8 && memory >= 8) return { count: 26000, dpr: [1, 2] };
  return { count: 16000, dpr: [1, 1.5] };
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
