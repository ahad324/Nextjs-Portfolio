"use client";

/**
 * The opening curtain plays once per session. Sections that animate on load
 * wait for it, so their entrances land right as the curtain lifts.
 */
const EVENT = "intro:done";
let done = false;

export function markIntroDone() {
  if (done) return;
  done = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onIntroDone(callback: () => void) {
  if (done || document.documentElement.classList.contains("intro-seen")) {
    done = true;
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}
