"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { brand } from "@/content/site";
import { prefersReducedMotion } from "@/lib/media";
import { chapters, sceneState } from "./scene-state";
import { fragmentShader, vertexShader } from "./shaders";
import { galaxy, helix, loadPortrait, randoms, SHAPES, sphere, vortex, wave } from "./shapes";

const PORTRAIT_URL = "/media/portrait-map.png";
const MOBILE_BREAKPOINT = 768;

type Props = { count: number; onReady?: () => void };

export function Particles({ count, onReady }: Props) {
  const points = useRef<THREE.Points>(null);
  const size = useThree((state) => state.size);
  const viewport = useThree((state) => state.viewport);
  const gl = useThree((state) => state.gl);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const g = galaxy(count);
    // Until the portrait is sampled, its slot holds the galaxy so nothing pops.
    geo.setAttribute("position", new THREE.BufferAttribute(g.slice(), 3));
    geo.setAttribute("aGalaxy", new THREE.BufferAttribute(g, 3));
    geo.setAttribute("aWave", new THREE.BufferAttribute(wave(count), 3));
    geo.setAttribute("aSphere", new THREE.BufferAttribute(sphere(count), 3));
    geo.setAttribute("aHelix", new THREE.BufferAttribute(helix(count), 3));
    geo.setAttribute("aVortex", new THREE.BufferAttribute(vortex(count), 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms(count), 4));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 15 },
          uPixelRatio: { value: 1 },
          uWFastA: { value: new THREE.Vector3(0, 1, 0) },
          uWFastB: { value: new THREE.Vector3() },
          uWSlowA: { value: new THREE.Vector3(0, 1, 0) },
          uWSlowB: { value: new THREE.Vector3() },
          uPointer: { value: new THREE.Vector3(99, 99, 0) },
          uAspect: { value: 1 },
          uPointerForce: { value: 0 },
          uTransit: { value: 0 },
          uVelocity: { value: 0 },
          uDim: { value: 0 },
          uReveal: { value: 0 },
          uMotion: { value: 1 },
          uColor: { value: new THREE.Color(brand.bone) },
          uEmber: { value: new THREE.Color(brand.ember) },
        },
      }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  // Sample the portrait off the critical path, then swap it into slot 0.
  useEffect(() => {
    let cancelled = false;
    loadPortrait(PORTRAIT_URL, count)
      .then(({ positions, brightness }) => {
        if (cancelled) return;
        const position = geometry.getAttribute("position") as THREE.BufferAttribute;
        (position.array as Float32Array).set(positions);
        position.needsUpdate = true;
        const random = geometry.getAttribute("aRandom") as THREE.BufferAttribute;
        const arr = random.array as Float32Array;
        for (let i = 0; i < count; i++) arr[i * 4 + 3] = brightness[i]!;
        random.needsUpdate = true;
        sceneState.portraitReady = true;
      })
      .catch(() => {
        sceneState.portraitReady = true;
      })
      .finally(() => onReady?.());
    return () => {
      cancelled = true;
    };
  }, [count, geometry, onReady]);

  // Per-frame animation state (kept outside React).
  const live = useRef({
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
  });
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const s = live.current;
    const u = material.uniforms;
    const isMobile = size.width < MOBILE_BREAKPOINT;
    const chapter = chapters[sceneState.chapter];
    const speed = reduced ? 60 : 1;

    // The portrait slot only becomes a target once it's sampled.
    const target = sceneState.portraitReady || sceneState.shape !== 0 ? sceneState.shape : 1;
    const kFast = 1 - Math.exp(-dt * 3.4 * speed);
    const kSlow = 1 - Math.exp(-dt * 1.7 * speed);
    let maxW = 0;
    for (let i = 0; i < SHAPES.length; i++) {
      const goal = i === target ? 1 : 0;
      s.fast[i]! += (goal - s.fast[i]!) * kFast;
      s.slow[i]! += (goal - s.slow[i]!) * kSlow;
      maxW = Math.max(maxW, (s.fast[i]! + s.slow[i]!) / 2);
    }
    u.uWFastA!.value.set(s.fast[0], s.fast[1], s.fast[2]);
    u.uWFastB!.value.set(s.fast[3], s.fast[4], s.fast[5]);
    u.uWSlowA!.value.set(s.slow[0], s.slow[1], s.slow[2]);
    u.uWSlowB!.value.set(s.slow[3], s.slow[4], s.slow[5]);
    u.uTransit!.value = reduced ? 0 : Math.min(1, (1 - maxW) * 2.2);

    // Placement for this chapter, eased.
    const k = 1 - Math.exp(-dt * 2.4 * speed);
    const goalX = isMobile ? chapter.xMobile : chapter.x;
    const goalY = (isMobile ? (chapter.yMobile ?? chapter.y) : chapter.y) ?? 0;
    const goalScale = (isMobile ? (chapter.scaleMobile ?? chapter.scale) : chapter.scale) ?? 1;
    // Keep forms inside narrow viewports.
    const fit = Math.min(1, viewport.width / 4.2);
    s.x += (goalX * Math.min(1, viewport.width / 7.5) - s.x) * k;
    s.y += (goalY - s.y) * k;
    s.scale += (goalScale * (isMobile ? fit : 1) - s.scale) * k;
    s.dim += ((chapter.dim ?? 0) - s.dim) * k;

    if (points.current) {
      points.current.position.set(s.x, s.y, 0);
      points.current.scale.setScalar(s.scale);
    }

    // Opening reveal.
    const revealGoal = sceneState.revealed ? 1 : 0;
    s.reveal += (revealGoal - s.reveal) * (1 - Math.exp(-dt * (reduced ? 60 : 1.4)));

    // Pointer in normalised device coordinates (matches the shader).
    const p = sceneState.pointer;
    const px = p.x;
    const py = p.y;
    const kp = 1 - Math.exp(-dt * 14);
    s.pointerX += (px - s.pointerX) * kp;
    s.pointerY += (py - s.pointerY) * kp;
    const forceGoal = p.active && !reduced ? (chapter.pointer ?? 0.6) : 0;
    s.force += (forceGoal - s.force) * (1 - Math.exp(-dt * 4));

    s.velocity += (Math.min(Math.abs(sceneState.velocity), 60) - s.velocity) * (1 - Math.exp(-dt * 6));

    u.uTime!.value = state.clock.elapsedTime;
    u.uPixelRatio!.value = gl.getPixelRatio();
    u.uSize!.value = isMobile ? 13 : 15;
    u.uPointer!.value.set(s.pointerX, s.pointerY, 0);
    u.uAspect!.value = size.width / size.height;
    u.uPointerForce!.value = s.force;
    u.uVelocity!.value = reduced ? 0 : s.velocity;
    u.uDim!.value = s.dim;
    u.uReveal!.value = s.reveal;
    u.uMotion!.value = reduced ? 0.15 : 1;
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
