/** Scene timing for the intro film (frames @ 30fps). The soundtrack's cuts mirror these. */
export const FPS = 30;
const s = (seconds: number) => Math.round(seconds * FPS);

export const timeline = {
  open: { from: 0, duration: s(5) },
  code: { from: s(5), duration: s(7) },
  system: { from: s(12), duration: s(14) },
  deploy: { from: s(26), duration: s(7) },
  close: { from: s(33), duration: s(12) },
} as const;

/** Seconds where the score lands a hit — keep in sync with scripts/make-score.mjs. */
export const CUTS_SECONDS = [5, 12, 26, 33, 39];

export const TOTAL_FRAMES = s(45);
