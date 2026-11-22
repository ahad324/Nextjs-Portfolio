"use client";

/**
 * The loading screen (components/layout/Intro) is driven by an inline script
 * that marks <html> with `intro-done` and fires `intro:done` once the page has
 * really loaded. Sections that animate on load wait for it, so their entrances
 * land as the curtain lifts. `intro-seen` means the screen was skipped.
 */
const EVENT = "intro:done";

export function isIntroDone() {
  const classes = document.documentElement.classList;
  return classes.contains("intro-done") || classes.contains("intro-seen");
}

export function onIntroDone(callback: () => void) {
  if (isIntroDone()) {
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}
