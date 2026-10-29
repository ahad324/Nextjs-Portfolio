import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { continueRender, delayRender, staticFile, useVideoConfig } from "remotion";
import {
  galaxy,
  helix,
  portraitFromImageData,
  randoms,
  sphere,
  vortex,
  wave,
  type ShapeName,
} from "@/components/three/shapes";
import { colors } from "../theme";

const COUNT = 16000;
const FOV = (35 * Math.PI) / 180;

type Shapes = Record<ShapeName, Float32Array> & { random: Float32Array; brightness: Float32Array };

/** Same forms and maths as the site's shader, drawn on a 2D canvas so every frame is deterministic. */
function useShapes(): Shapes | null {
  const [shapes, setShapes] = useState<Shapes | null>(null);
  const [handle] = useState(() => delayRender("Sampling portrait"));

  useEffect(() => {
    const image = new Image();
    image.src = staticFile("media/portrait-map.png");
    image
      .decode()
      .then(() => {
        const size = image.naturalWidth;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
        ctx.drawImage(image, 0, 0);
        const { positions, brightness } = portraitFromImageData(
          ctx.getImageData(0, 0, size, size).data,
          size,
          COUNT,
        );
        setShapes({
          portrait: positions,
          brightness,
          galaxy: galaxy(COUNT),
          wave: wave(COUNT),
          sphere: sphere(COUNT),
          helix: helix(COUNT),
          vortex: vortex(COUNT),
          random: randoms(COUNT),
        });
        continueRender(handle);
      })
      .catch((error) => {
        console.error(error);
        continueRender(handle);
      });
  }, [handle]);

  return shapes;
}

export type FieldState = {
  from: ShapeName;
  to: ShapeName;
  /** 0 → `from`, 1 → `to` (staggered per particle). */
  morph: number;
  x: number;
  y: number;
  scale: number;
  /** 0..1 opacity multiplier. */
  alpha: number;
  /** 0 = scattered cloud, 1 = formed. */
  reveal: number;
  time: number;
};

const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export function ParticleField({ state }: { state: FieldState }) {
  const shapes = useShapes();
  const canvas = useRef<HTMLCanvasElement>(null);
  const { width, height } = useVideoConfig();
  const focal = height / (2 * Math.tan(FOV / 2));
  const ember = useMemo(() => colors.ember, []);

  useLayoutEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx || !shapes) return;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    const { from, to, morph, x: ox, y: oy, scale, alpha, reveal, time } = state;
    const A = shapes[from];
    const B = shapes[to];
    const rnd = shapes.random;
    const sizeK = (height / 1080) * 1.7;

    // Per-shape idle motion, mirroring the site's vertex shader.
    const place = (shape: ShapeName, arr: Float32Array, i: number, out: number[]) => {
      let x = arr[i * 3]!;
      let y = arr[i * 3 + 1]!;
      let z = arr[i * 3 + 2]!;
      const rotY = (angle: number) => {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const nx = c * x - s * z;
        z = s * x + c * z;
        x = nx;
      };
      const rotX = (angle: number) => {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const ny = c * y - s * z;
        z = s * y + c * z;
        y = ny;
      };
      if (shape === "galaxy") {
        rotY(time * 0.08);
        rotX(-0.6);
      } else if (shape === "wave") {
        y += Math.sin(x * 1.25 + time * 0.9) * 0.22 + Math.cos(z * 1.7 + time * 0.7) * 0.15;
        rotX(0.42);
      } else if (shape === "sphere") {
        rotY(time * 0.25);
        rotX(0.35);
      } else if (shape === "helix") {
        rotY(time * 0.3);
      } else if (shape === "vortex") {
        rotY(time * (0.25 + rnd[i * 4 + 2]! * 0.3));
        rotX(1.1);
      } else {
        z += Math.sin(time * 0.8 + y * 2) * 0.02;
      }
      out[0] = x;
      out[1] = y;
      out[2] = z;
    };

    const a = [0, 0, 0];
    const b = [0, 0, 0];
    const transit = Math.sin(Math.PI * Math.min(1, Math.max(0, morph)));

    for (let i = 0; i < COUNT; i++) {
      const r0 = rnd[i * 4]!;
      const r1 = rnd[i * 4 + 1]!;
      const r2 = rnd[i * 4 + 2]!;
      place(from, A, i, a);
      place(to, B, i, b);
      const t = smooth(r0 * 0.5, r0 * 0.5 + 0.5, morph);
      let px = a[0]! + (b[0]! - a[0]!) * t;
      let py = a[1]! + (b[1]! - a[1]!) * t;
      let pz = a[2]! + (b[2]! - a[2]!) * t;

      px += Math.sin(py * 2.1 + time * 1.1 + r1 * 6.283) * transit * (0.25 + r1 * 0.55);
      py += Math.cos(pz * 1.7 + time * 1.3 + r2 * 6.283) * transit * (0.25 + r1 * 0.55);
      pz += Math.sin(px * 1.9 + time * 0.7 + r0 * 6.283) * transit * (0.25 + r1 * 0.55);

      const rv = smooth(r0 * 0.55, r0 * 0.55 + 0.45, reveal);
      px = (r2 - 0.5) * 10 + (px - (r2 - 0.5) * 10) * rv;
      py = (r0 - 0.5) * 7 + (py - (r0 - 0.5) * 7) * rv;
      pz = (r1 - 0.5) * 6 + (pz - (r1 - 0.5) * 6) * rv;

      const wx = px * scale + ox;
      const wy = py * scale + oy;
      const wz = pz * scale;
      const depth = 6 - wz;
      if (depth < 0.5) continue;

      const portraitW = (from === "portrait" ? 1 - t : 0) + (to === "portrait" ? t : 0);
      const bright =
        (0.5 + r1 * 0.25) * (1 - portraitW) + (0.18 + shapes.brightness[i]! * 1.05) * portraitW;
      const size = ((sizeK * 15) / depth) * (0.55 + bright * 0.85);
      const o = (0.22 + bright * 0.78) * alpha * rv;
      if (o < 0.01) continue;

      const sx = width / 2 + (wx * focal) / depth;
      const sy = height / 2 - (wy * focal) / depth;
      ctx.globalAlpha = Math.min(1, o * 0.62);
      ctx.fillStyle = r1 > 0.962 && portraitW < 0.5 ? ember : colors.bone;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.5, size / 2), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }, [shapes, state, width, height, focal, ember]);

  return (
    <canvas ref={canvas} width={width} height={height} style={{ position: "absolute", inset: 0 }} />
  );
}
