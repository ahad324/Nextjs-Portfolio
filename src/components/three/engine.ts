import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { brand } from "@/content/site";
import { mulberry32 } from "@/lib/rng";
import { chapters, sceneState } from "./scene-state";
import { fragmentShader, vertexShader } from "./shaders";
import { galaxy, helix, loadPortrait, randoms, SHAPES, sphere, vortex, wave } from "./shapes";

const PORTRAIT_URL = "/media/portrait-map.png";
const MOBILE_BREAKPOINT = 768;
const FOV = 35;
const CAMERA_Z = 6;

/** Fractions of the particle budget to step down through when frames drop. */
const BUDGET_STEPS = [1, 0.6, 0.35, 0.2];
/** Sustained average below this (fps) triggers the next degradation step. */
const MIN_FPS = 45;
const SAMPLE_MS = 2000;

export type Quality = { count: number; dpr: [number, number]; lite: boolean };

type Options = {
  quality: Quality;
  reducedMotion: boolean;
  onReady: () => void;
  /** Called when the engine decides the device needs lite mode. */
  onStruggle: () => void;
};

/**
 * Plain three.js particle renderer — one draw call for the whole site.
 * Imports only the classes it uses (tree-shakeable), owns its render loop,
 * pauses when the tab is hidden, and degrades in steps when frames drop:
 * pixel ratio → lite CSS → particle count → a frozen still frame.
 */
export class ParticleEngine {
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
  private geometry: BufferGeometry;
  private material: ShaderMaterial;
  private points: Points;
  private frame = 0;
  private last = 0;
  private elapsed = 0;
  private disposed = false;
  private frozen = false;
  private dpr: number;
  private step = 0;
  private perf = { frames: 0, time: 0, declines: 0 };
  private width = 1;
  private height = 1;
  private live = {
    fast: new Float32Array([0, 1, 0, 0, 0, 0]),
    slow: new Float32Array([0, 1, 0, 0, 0, 0]),
    x: 0,
    y: 0,
    scale: 1,
    dim: 0,
    reveal: 0,
    pointerX: 99,
    pointerY: 99,
    force: 0,
    velocity: 0,
  };

  constructor(
    private canvas: HTMLCanvasElement,
    private options: Options,
  ) {
    const { quality } = options;
    this.dpr = Math.min(window.devicePixelRatio || 1, quality.dpr[1]);
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: quality.lite ? "low-power" : "high-performance",
    });
    this.renderer.setClearColor(0x000000, 0);
    this.camera.position.set(0, 0, CAMERA_Z);

    this.geometry = buildGeometry(quality.count);
    this.material = buildMaterial();
    this.points = new Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);

    this.resize();
    window.addEventListener("resize", this.resize);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.loadPortrait(quality.count);
    this.frame = requestAnimationFrame(this.tick);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    window.removeEventListener("resize", this.resize);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }

  private resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    if (this.frozen) this.renderer.render(this.scene, this.camera);
  };

  private onVisibility = () => {
    if (document.hidden || this.frozen) {
      cancelAnimationFrame(this.frame);
    } else {
      this.last = 0;
      this.frame = requestAnimationFrame(this.tick);
    }
  };

  private async loadPortrait(count: number) {
    try {
      const { positions, brightness } = await loadPortrait(PORTRAIT_URL, count);
      if (this.disposed) return;
      const position = this.geometry.getAttribute("position") as BufferAttribute;
      (position.array as Float32Array).set(positions);
      position.needsUpdate = true;
      const random = this.geometry.getAttribute("aRandom") as BufferAttribute;
      const values = random.array as Float32Array;
      for (let i = 0; i < count; i++) values[i * 4 + 3] = brightness[i]!;
      random.needsUpdate = true;
    } catch {
      // The site works without the portrait; the cloud simply stays a galaxy.
    } finally {
      sceneState.portraitReady = true;
      if (!this.disposed) this.options.onReady();
    }
  }

  /** Frame-rate watchdog: step down quality when the device can't keep up. */
  private monitor(deltaMs: number) {
    if (this.elapsed < 3) return; // ignore start-up hitches
    this.perf.frames++;
    this.perf.time += deltaMs;
    if (this.perf.time < SAMPLE_MS) return;
    const fps = (this.perf.frames * 1000) / this.perf.time;
    this.perf.frames = 0;
    this.perf.time = 0;
    if (fps >= MIN_FPS) return;

    const { quality } = this.options;
    if (this.dpr > quality.dpr[0]) {
      this.dpr = Math.max(quality.dpr[0], this.dpr - 0.5);
      this.resize();
      return;
    }
    this.options.onStruggle();
    if (this.step < BUDGET_STEPS.length - 1) {
      this.step++;
      this.geometry.setDrawRange(0, Math.round(quality.count * BUDGET_STEPS[this.step]!));
      return;
    }
    // Still too slow at the lowest budget: hold a still frame instead of stuttering.
    this.frozen = true;
    cancelAnimationFrame(this.frame);
  }

  private tick = (now: number) => {
    if (this.disposed || this.frozen) return;
    const deltaMs = this.last ? now - this.last : 16.7;
    this.last = now;
    const dt = Math.min(deltaMs / 1000, 1 / 30);
    this.elapsed += dt;
    this.update(dt);
    this.renderer.render(this.scene, this.camera);
    this.monitor(deltaMs);
    this.frame = requestAnimationFrame(this.tick);
  };

  private update(dt: number) {
    const s = this.live;
    const u = this.material.uniforms;
    const reduced = this.options.reducedMotion;
    const isMobile = this.width < MOBILE_BREAKPOINT;
    const chapter = chapters[sceneState.chapter];
    const speed = reduced ? 60 : 1;
    const viewHeight = 2 * Math.tan(((FOV / 2) * Math.PI) / 180) * CAMERA_Z;
    const viewWidth = viewHeight * (this.width / this.height);

    // Blend weights towards the active form. The portrait slot only becomes
    // a target once it has been sampled.
    const target = sceneState.portraitReady || sceneState.shape !== 0 ? sceneState.shape : 1;
    const kFast = 1 - Math.exp(-dt * 3.4 * speed);
    const kSlow = 1 - Math.exp(-dt * 1.7 * speed);
    let maxWeight = 0;
    for (let i = 0; i < SHAPES.length; i++) {
      const goal = i === target ? 1 : 0;
      s.fast[i]! += (goal - s.fast[i]!) * kFast;
      s.slow[i]! += (goal - s.slow[i]!) * kSlow;
      maxWeight = Math.max(maxWeight, (s.fast[i]! + s.slow[i]!) / 2);
    }
    (u.uWFastA!.value as Vector3).set(s.fast[0]!, s.fast[1]!, s.fast[2]!);
    (u.uWFastB!.value as Vector3).set(s.fast[3]!, s.fast[4]!, s.fast[5]!);
    (u.uWSlowA!.value as Vector3).set(s.slow[0]!, s.slow[1]!, s.slow[2]!);
    (u.uWSlowB!.value as Vector3).set(s.slow[3]!, s.slow[4]!, s.slow[5]!);
    u.uTransit!.value = reduced ? 0 : Math.min(1, (1 - maxWeight) * 2.2);

    // Placement for this chapter, eased.
    const k = 1 - Math.exp(-dt * 2.4 * speed);
    const goalX = isMobile ? chapter.xMobile : chapter.x;
    const goalY = (isMobile ? (chapter.yMobile ?? chapter.y) : chapter.y) ?? 0;
    const goalScale = (isMobile ? (chapter.scaleMobile ?? chapter.scale) : chapter.scale) ?? 1;
    const fit = Math.min(1, viewWidth / 4.2);
    s.x += (goalX * Math.min(1, viewWidth / 7.5) - s.x) * k;
    s.y += (goalY - s.y) * k;
    s.scale += (goalScale * (isMobile ? fit : 1) - s.scale) * k;
    s.dim += ((chapter.dim ?? 0) - s.dim) * k;
    this.points.position.set(s.x, s.y, 0);
    this.points.scale.setScalar(s.scale);

    // Opening reveal.
    const revealGoal = sceneState.revealed ? 1 : 0;
    s.reveal += (revealGoal - s.reveal) * (1 - Math.exp(-dt * (reduced ? 60 : 1.4)));

    // Pointer in normalised device coordinates (matches the shader).
    const p = sceneState.pointer;
    const kp = 1 - Math.exp(-dt * 14);
    s.pointerX += (p.x - s.pointerX) * kp;
    s.pointerY += (p.y - s.pointerY) * kp;
    const forceGoal = p.active && !reduced ? (chapter.pointer ?? 0.6) : 0;
    s.force += (forceGoal - s.force) * (1 - Math.exp(-dt * 4));
    s.velocity +=
      (Math.min(Math.abs(sceneState.velocity), 60) - s.velocity) * (1 - Math.exp(-dt * 6));

    u.uTime!.value = this.elapsed;
    u.uPixelRatio!.value = this.dpr;
    u.uSize!.value = isMobile ? 13 : 15;
    (u.uPointer!.value as Vector3).set(s.pointerX, s.pointerY, 0);
    u.uAspect!.value = this.width / this.height;
    u.uPointerForce!.value = s.force;
    u.uVelocity!.value = reduced ? 0 : s.velocity;
    u.uDim!.value = s.dim;
    u.uReveal!.value = s.reveal;
    u.uMotion!.value = reduced ? 0.15 : 1;
  }
}

function buildGeometry(count: number) {
  const geometry = new BufferGeometry();
  // Shuffle every form with one shared permutation: any prefix of the buffer
  // is then an even sample of each shape (so lowering the draw range thins
  // the cloud evenly instead of cutting shapes in half).
  const order = permutation(count);
  const g = shuffle(galaxy(count), order, 3);
  // Until the portrait is sampled, its slot holds the galaxy so nothing pops.
  geometry.setAttribute("position", new BufferAttribute(g.slice(), 3));
  geometry.setAttribute("aGalaxy", new BufferAttribute(g, 3));
  geometry.setAttribute("aWave", new BufferAttribute(shuffle(wave(count), order, 3), 3));
  geometry.setAttribute("aSphere", new BufferAttribute(shuffle(sphere(count), order, 3), 3));
  geometry.setAttribute("aHelix", new BufferAttribute(shuffle(helix(count), order, 3), 3));
  geometry.setAttribute("aVortex", new BufferAttribute(shuffle(vortex(count), order, 3), 3));
  geometry.setAttribute("aRandom", new BufferAttribute(randoms(count), 4));
  return geometry;
}

function buildMaterial() {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 15 },
      uPixelRatio: { value: 1 },
      uWFastA: { value: new Vector3(0, 1, 0) },
      uWFastB: { value: new Vector3() },
      uWSlowA: { value: new Vector3(0, 1, 0) },
      uWSlowB: { value: new Vector3() },
      uPointer: { value: new Vector3(99, 99, 0) },
      uAspect: { value: 1 },
      uPointerForce: { value: 0 },
      uTransit: { value: 0 },
      uVelocity: { value: 0 },
      uDim: { value: 0 },
      uReveal: { value: 0 },
      uMotion: { value: 1 },
      uColor: { value: new Color(brand.bone) },
      uEmber: { value: new Color(brand.ember) },
    },
  });
}

/** Deterministic Fisher–Yates permutation of 0..n-1. */
function permutation(n: number) {
  const rand = mulberry32(99);
  const order = new Uint32Array(n);
  for (let i = 0; i < n; i++) order[i] = i;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const t = order[i]!;
    order[i] = order[j]!;
    order[j] = t;
  }
  return order;
}

function shuffle(source: Float32Array, order: Uint32Array, stride: number) {
  const out = new Float32Array(source.length);
  for (let i = 0; i < order.length; i++) {
    const from = order[i]! * stride;
    for (let k = 0; k < stride; k++) out[i * stride + k] = source[from + k]!;
  }
  return out;
}
