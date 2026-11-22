"use client";

/**
 * True when motion should be minimised: the visitor asked the OS for less
 * motion, or the device was flagged as low-end before paint (see the boot
 * script in the root layout). Safe on the server (returns false).
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("low")
  );
}

/** Precise pointer with hover — i.e. a mouse or trackpad. */
export function hasFinePointer() {
  return (
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}
