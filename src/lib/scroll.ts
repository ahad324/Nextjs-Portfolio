"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

/** Scrolls to an element id with Lenis when available, natively otherwise. */
export function useScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (id: string) => {
      const target = id === "top" ? 0 : document.getElementById(id);
      if (target === null) return false;
      if (lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else if (target === 0) {
        window.scrollTo({ top: 0 });
      } else {
        target.scrollIntoView();
      }
      history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
      return true;
    },
    [lenis],
  );
}
