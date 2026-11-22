"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { isIntroDone, onIntroDone } from "@/lib/intro";

/**
 * Connects the app to the static loading screen: reports when React has
 * hydrated (a real progress milestone) and keeps smooth scrolling paused
 * until the curtain lifts.
 */
export function IntroBridge() {
  const lenis = useLenis();
  const [done, setDone] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event("app:hydrated"));
    return onIntroDone(() => setDone(true));
  }, []);

  useEffect(() => {
    if (done || isIntroDone()) lenis?.start();
    else lenis?.stop();
  }, [done, lenis]);

  return null;
}
