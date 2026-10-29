import { shapeIndex, type ShapeName } from "./shapes";

/**
 * Chapter → camera/particle direction. The single place that decides what
 * the 3D layer does for each part of the story.
 * x / y are offsets in world units (desktop / mobile), dim fades particles.
 */
export type Chapter = {
  shape: ShapeName;
  x: number;
  xMobile: number;
  y?: number;
  yMobile?: number;
  scale?: number;
  scaleMobile?: number;
  dim?: number;
  /** How strongly the cursor pushes particles around. */
  pointer?: number;
};

export type ChapterName =
  | "hero"
  | "intro"
  | "work"
  | "film"
  | "skills"
  | "about"
  | "contact"
  | "ambient"
  | "lost";

export const chapters: Record<ChapterName, Chapter> = {
  hero: { shape: "portrait", x: 1.45, xMobile: 0, y: -0.05, yMobile: 1.12, scale: 1, scaleMobile: 0.78, pointer: 1 },
  intro: { shape: "galaxy", x: 0.6, xMobile: 0, y: 0.1, scale: 1, scaleMobile: 0.75, dim: 0.45, pointer: 0.6 },
  work: { shape: "wave", x: 0, xMobile: 0, y: -0.2, scale: 1, scaleMobile: 0.7, dim: 0.55, pointer: 0.8 },
  film: { shape: "galaxy", x: 0, xMobile: 0, scale: 1.25, scaleMobile: 0.9, dim: 0.75, pointer: 0.3 },
  skills: { shape: "sphere", x: 2.05, xMobile: 0, y: 0, yMobile: 0.4, scale: 0.86, scaleMobile: 0.72, dim: 0.25, pointer: 1 },
  about: { shape: "helix", x: -2.35, xMobile: 0, scale: 0.9, scaleMobile: 0.75, dim: 0.5, pointer: 0.6 },
  contact: { shape: "vortex", x: 1.2, xMobile: 0, y: -0.1, yMobile: 0.6, scale: 1.05, scaleMobile: 0.75, dim: 0.35, pointer: 1 },
  ambient: { shape: "galaxy", x: 0, xMobile: 0, scale: 1.2, scaleMobile: 0.9, dim: 0.7, pointer: 0.4 },
  lost: { shape: "vortex", x: 0, xMobile: 0, scale: 1.2, scaleMobile: 0.85, dim: 0.2, pointer: 1 },
};

/**
 * Mutable, render-free state shared between DOM (scroll, pointer) and the
 * WebGL loop. Written by the SceneDirector, read every frame in useFrame —
 * no React re-renders involved.
 */
export const sceneState = {
  chapter: "hero" as ChapterName,
  shape: shapeIndex("portrait"),
  /** -1..1 normalised pointer, y up. */
  pointer: { x: 0, y: 0, active: false },
  /** Smoothed scroll velocity from Lenis (px/frame). */
  velocity: 0,
  /** False until the opening curtain lifts — particles hold as a loose cloud. */
  revealed: false,
  /** False once the portrait map has been sampled. */
  portraitReady: false,
};

export function setChapter(name: ChapterName) {
  sceneState.chapter = name;
  sceneState.shape = shapeIndex(chapters[name].shape);
}
