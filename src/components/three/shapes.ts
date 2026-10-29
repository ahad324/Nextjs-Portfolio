import { mulberry32 } from "@/lib/rng";

/**
 * Particle "forms". Each returns `count` xyz triplets in a roughly unit-sized
 * space centred on the origin. Pure functions — shared by the site and the
 * Remotion intro video so both tell the same visual story.
 */

export const SHAPES = ["portrait", "galaxy", "wave", "sphere", "helix", "vortex"] as const;
export type ShapeName = (typeof SHAPES)[number];
export const shapeIndex = (name: ShapeName) => SHAPES.indexOf(name);

const TAU = Math.PI * 2;

export function galaxy(count: number, seed = 11) {
  const rand = mulberry32(seed);
  const out = new Float32Array(count * 3);
  const arms = 3;
  for (let i = 0; i < count; i++) {
    const r = Math.pow(rand(), 0.7) * 2.6;
    const arm = (i % arms) * (TAU / arms);
    const spin = r * 1.35;
    const spread = 0.38 * Math.pow(rand(), 2) * (0.4 + r);
    const angle = arm + spin + (rand() - 0.5) * spread;
    out[i * 3] = Math.cos(angle) * r + (rand() - 0.5) * spread;
    out[i * 3 + 1] = (rand() - 0.5) * 0.22 * (2.8 - r);
    out[i * 3 + 2] = Math.sin(angle) * r + (rand() - 0.5) * spread;
  }
  return out;
}

export function wave(count: number, seed = 12) {
  const rand = mulberry32(seed);
  const out = new Float32Array(count * 3);
  const cols = Math.ceil(Math.sqrt(count * 2.2));
  const rows = Math.ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const cx = i % cols;
    const cy = Math.floor(i / cols);
    out[i * 3] = (cx / (cols - 1) - 0.5) * 7 + (rand() - 0.5) * 0.02;
    out[i * 3 + 1] = -0.9;
    out[i * 3 + 2] = (cy / Math.max(rows - 1, 1) - 0.5) * 3.2 + (rand() - 0.5) * 0.02;
  }
  return out;
}

export function sphere(count: number, seed = 13) {
  const rand = mulberry32(seed);
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const r = 1.35 + (rand() - 0.5) * 0.04;
    out[i * 3] = Math.cos(theta) * radius * r;
    out[i * 3 + 1] = y * r;
    out[i * 3 + 2] = Math.sin(theta) * radius * r;
  }
  return out;
}

export function helix(count: number, seed = 14) {
  const rand = mulberry32(seed);
  const out = new Float32Array(count * 3);
  const turns = 3.2;
  for (let i = 0; i < count; i++) {
    const strand = i % 2;
    const t = rand();
    const isRung = rand() < 0.16;
    const angle = t * turns * TAU + strand * Math.PI;
    const y = (t - 0.5) * 3.6;
    const radius = 0.62;
    if (isRung) {
      const k = rand() * 2 - 1;
      out[i * 3] = Math.cos(angle) * radius * k;
      out[i * 3 + 1] = y;
      out[i * 3 + 2] = Math.sin(angle) * radius * k;
    } else {
      const jitter = 0.05;
      out[i * 3] = Math.cos(angle) * radius + (rand() - 0.5) * jitter;
      out[i * 3 + 1] = y + (rand() - 0.5) * jitter;
      out[i * 3 + 2] = Math.sin(angle) * radius + (rand() - 0.5) * jitter;
    }
  }
  return out;
}

export function vortex(count: number, seed = 15) {
  const rand = mulberry32(seed);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rand() * TAU;
    const v = rand() * TAU;
    const R = 1.25;
    const r = 0.18 + Math.pow(rand(), 3) * 0.55;
    out[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
    out[i * 3 + 1] = r * Math.sin(v) * 0.6;
    out[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
  }
  return out;
}

/** Per-particle randoms: xyz = noise seeds, w = brightness (overwritten by the portrait). */
export function randoms(count: number, seed = 16) {
  const rand = mulberry32(seed);
  const out = new Float32Array(count * 4);
  for (let i = 0; i < count * 4; i++) out[i] = rand();
  return out;
}

/**
 * Samples a grayscale+alpha portrait map into particle positions.
 * Bright skin and strong edges get the most particles, so the face reads
 * clearly while the dark suit becomes a sparse silhouette.
 */
export function portraitFromImageData(
  data: Uint8ClampedArray,
  size: number,
  count: number,
  seed = 17,
): { positions: Float32Array; brightness: Float32Array } {
  const rand = mulberry32(seed);
  const lum = new Float32Array(size * size);
  const alpha = new Float32Array(size * size);
  for (let i = 0; i < size * size; i++) {
    lum[i] = data[i * 4]! / 255;
    alpha[i] = data[i * 4 + 3]! / 255;
  }

  const at = (arr: Float32Array, x: number, y: number) =>
    arr[Math.min(size - 1, Math.max(0, y)) * size + Math.min(size - 1, Math.max(0, x))]!;

  const weights = new Float32Array(size * size);
  let total = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      if (alpha[i]! < 0.5) continue;
      // Sobel edge strength on luminance and on the cut-out mask.
      const gx = at(lum, x + 1, y) - at(lum, x - 1, y);
      const gy = at(lum, x, y + 1) - at(lum, x, y - 1);
      const ax = at(alpha, x + 1, y) - at(alpha, x - 1, y);
      const ay = at(alpha, x, y + 1) - at(alpha, x, y - 1);
      const edge = Math.min(1, Math.hypot(gx, gy) * 2.2) + Math.min(1, Math.hypot(ax, ay)) * 0.9;
      const w = 0.035 + Math.pow(lum[i]!, 1.8) * 1.2 + edge * 0.55;
      weights[i] = w;
      total += w;
    }
  }

  // Cumulative distribution for weighted sampling.
  const cdf = new Float32Array(size * size);
  let acc = 0;
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i]! / total;
    cdf[i] = acc;
  }

  const positions = new Float32Array(count * 3);
  const brightness = new Float32Array(count);
  const scale = 1.75;
  for (let p = 0; p < count; p++) {
    const r = rand();
    let lo = 0;
    let hi = cdf.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cdf[mid]! < r) lo = mid + 1;
      else hi = mid;
    }
    const x = lo % size;
    const y = Math.floor(lo / size);
    const l = lum[lo]!;
    positions[p * 3] = ((x + rand()) / size - 0.5) * 2 * scale;
    positions[p * 3 + 1] = -((y + rand()) / size - 0.5) * 2 * scale;
    positions[p * 3 + 2] = (l - 0.45) * 0.55 + (rand() - 0.5) * 0.06;
    brightness[p] = l;
  }
  return { positions, brightness };
}

export async function loadPortrait(url: string, count: number) {
  const image = new Image();
  image.decoding = "async";
  image.src = url;
  await image.decode();
  const size = image.naturalWidth;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D canvas unavailable");
  ctx.drawImage(image, 0, 0);
  const { data } = ctx.getImageData(0, 0, size, size);
  return portraitFromImageData(data, size, count);
}
