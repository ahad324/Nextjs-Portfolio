/** Scene timing for the intro film (frames @ 30fps). The soundtrack's cuts mirror these. */
export const FPS = 30;
const s = (seconds: number) => Math.round(seconds * FPS);

export const timeline = {
  logo: { from: 0, duration: s(3) },
  portrait: { from: s(3), duration: s(6) },
  tagline: { from: s(9), duration: s(5) },
  capabilities: { from: s(14), duration: s(16) },
  stack: { from: s(30), duration: s(5) },
  outro: { from: s(35), duration: s(5) },
} as const;

export const TOTAL_FRAMES = s(40);
