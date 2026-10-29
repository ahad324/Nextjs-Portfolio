"use client";

/** True when the visitor asked the OS for less motion. Safe on the server (returns false). */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Precise pointer with hover — i.e. a mouse or trackpad. */
export function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
