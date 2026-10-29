"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { onIntroDone } from "@/lib/intro";
import { chapters, sceneState, setChapter, type ChapterName } from "./scene-state";

/** The line (as a fraction of viewport height) that decides which chapter is "on stage". */
const FOCUS_LINE = 0.55;

/**
 * Tells the 3D layer which chapter is on screen: the `[data-chapter]`
 * element under the focus line wins, or the closest one if none is.
 * Position-based rather than enter/leave events, so it stays correct after
 * jumps (nav links, back/forward, reloads mid-page). Also feeds the pointer.
 */
export function SceneDirector() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (elements.length === 0) return;
    let frame = 0;

    const pick = () => {
      frame = 0;
      const line = window.innerHeight * FOCUS_LINE;
      let best: HTMLElement | undefined;
      let bestDistance = Infinity;
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const distance =
          rect.top > line ? rect.top - line : rect.bottom < line ? line - rect.bottom : 0;
        if (distance < bestDistance) {
          bestDistance = distance;
          best = element;
        }
      }
      const name = best?.dataset.chapter;
      if (name && name in chapters && name !== sceneState.chapter) setChapter(name as ChapterName);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => onIntroDone(() => (sceneState.revealed = true)), []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      sceneState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
      sceneState.pointer.active = event.pointerType === "mouse" || event.pointerType === "pen";
    };
    const onLeave = () => (sceneState.pointer.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
