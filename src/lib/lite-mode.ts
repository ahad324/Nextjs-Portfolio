"use client";

/**
 * "Lite" rendering for weaker devices: swaps backdrop-filter blur (very costly
 * on top of a live WebGL canvas) for solid surfaces. Toggled by a data
 * attribute on <html> so it takes effect without re-rendering React.
 */
export function setLiteMode(on: boolean) {
  document.documentElement.toggleAttribute("data-lite", on);
}
