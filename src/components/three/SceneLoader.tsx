"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isIntroDone } from "@/lib/intro";
import { setLiteMode } from "@/lib/lite-mode";
import type { Quality } from "./engine";

const Experience = dynamic(() => import("./Experience"), { ssr: false });

/**
 * Decides whether — and how richly — to run WebGL, then loads the 3D chunk
 * only once the browser is idle so it never competes with first paint.
 */
export function SceneLoader() {
  const [quality, setQuality] = useState<Quality | null>(null);

  useEffect(() => {
    const picked = pickQuality();
    if (!picked) {
      // Tell the loading screen there is no 3D scene to wait for.
      window.dispatchEvent(new Event("scene:skip"));
      return;
    }
    if (picked.lite) setLiteMode(true);
    const start = () => setQuality(picked);
    // While the loading screen covers the page, build the scene right away;
    // otherwise wait for an idle moment so it never competes with the page.
    if (!isIntroDone()) {
      start();
      return;
    }
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

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  // Respect data-saver and very slow networks: the site works fully without WebGL.
  if (nav.connection?.saveData || /(^|-)2g$/.test(nav.connection?.effectiveType ?? "")) return null;

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const small = window.matchMedia("(max-width: 767px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (small || coarse) {
    if (cores >= 8 && memory >= 6) return { count: 13000, dpr: [1, 1.75], lite: false };
    if (cores >= 4 && memory >= 3) return { count: 8000, dpr: [1, 1.5], lite: true };
    return { count: 5000, dpr: [1, 1], lite: true };
  }
  if (cores >= 8 && memory >= 8) return { count: 26000, dpr: [1, 2], lite: false };
  if (cores >= 4) return { count: 16000, dpr: [1, 1.5], lite: false };
  return { count: 9000, dpr: [1, 1], lite: true };
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
