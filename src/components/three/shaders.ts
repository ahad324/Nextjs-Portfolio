/**
 * One draw call for the whole story. Every particle carries its position in
 * all six forms; two sets of blend weights (fast + slow) are mixed per
 * particle so transitions ripple through the cloud instead of moving in lockstep.
 */
export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uWFastA;
  uniform vec3 uWFastB;
  uniform vec3 uWSlowA;
  uniform vec3 uWSlowB;
  uniform vec3 uPointer;
  uniform float uAspect;
  uniform float uPointerForce;
  uniform float uTransit;
  uniform float uVelocity;
  uniform float uDim;
  uniform float uReveal;
  uniform float uMotion;

  attribute vec3 aGalaxy;
  attribute vec3 aWave;
  attribute vec3 aSphere;
  attribute vec3 aHelix;
  attribute vec3 aVortex;
  attribute vec4 aRandom;

  varying float vAlpha;
  varying float vEmber;

  mat2 rot(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
  }

  void main() {
    float t = uTime * uMotion;
    vec3 wa = mix(uWFastA, uWSlowA, aRandom.x);
    vec3 wb = mix(uWFastB, uWSlowB, aRandom.x);

    vec3 p = position;
    p.z += sin(t * 0.8 + position.y * 2.0) * 0.02;

    vec3 g = aGalaxy;
    g.xz = rot(t * 0.05) * g.xz;
    g.yz = rot(-0.6) * g.yz;

    vec3 w = aWave;
    w.y += sin(w.x * 1.25 + t * 0.9) * 0.22 + cos(w.z * 1.7 + t * 0.7) * 0.15;
    w.yz = rot(0.42) * w.yz;

    vec3 s = aSphere;
    s.xz = rot(t * 0.12) * s.xz;
    s.yz = rot(0.35) * s.yz;

    vec3 h = aHelix;
    h.xz = rot(t * 0.22) * h.xz;
    h.xy = rot(0.3) * h.xy;

    vec3 v = aVortex;
    v.xz = rot(t * (0.18 + aRandom.z * 0.22)) * v.xz;
    v.yz = rot(1.1) * v.yz;

    float wsum = wa.x + wa.y + wa.z + wb.x + wb.y + wb.z + 1e-4;
    vec3 pos = (p * wa.x + g * wa.y + w * wa.z + s * wb.x + h * wb.y + v * wb.z) / wsum;
    float portraitWeight = wa.x / wsum;

    // Turbulence while morphing between forms.
    vec3 n = vec3(
      sin(pos.y * 2.1 + t * 1.1 + aRandom.y * 6.283),
      cos(pos.z * 1.7 + t * 1.3 + aRandom.z * 6.283),
      sin(pos.x * 1.9 + t * 0.7 + aRandom.x * 6.283)
    );
    pos += n * uTransit * (0.25 + aRandom.y * 0.55);

    // Idle shimmer + a little kick from scroll speed.
    pos += (aRandom.xyz - 0.5) * 0.018 * sin(t * 0.6 + aRandom.w * 6.283);
    pos.y += (aRandom.y - 0.5) * uVelocity * 0.03;

    // Opening: particles fly in from a wide scatter.
    float reveal = smoothstep(aRandom.x * 0.55, aRandom.x * 0.55 + 0.45, uReveal);
    vec3 scatter = (aRandom.zxy - 0.5) * vec3(10.0, 7.0, 6.0);
    pos = mix(scatter, pos, reveal);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);

    // Cursor interaction in screen space, so it lines up with the pointer
    // for every particle regardless of its depth.
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 d = (ndc - uPointer.xy) * vec2(uAspect, 1.0);
    float dist = length(d);
    float force = smoothstep(0.32, 0.0, dist) * uPointerForce;
    float depthScale = -mv.z / 6.0;
    mv.xy += normalize(d + 1e-5) * force * 0.32 * depthScale;
    mv.z += force * 0.35;

    gl_Position = projectionMatrix * mv;

    float bright = mix(0.5 + aRandom.y * 0.25, 0.18 + aRandom.w * 1.05, portraitWeight);
    gl_PointSize = uSize * uPixelRatio * (0.55 + bright * 0.85) / -mv.z;

    vAlpha = (0.22 + bright * 0.78) * (1.0 - uDim * 0.75) * reveal;
    vEmber = step(0.962, aRandom.y) * (1.0 - portraitWeight * 0.6) + force * 0.9;
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uEmber;

  varying float vAlpha;
  varying float vEmber;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.08, d);
    if (a < 0.02) discard;
    vec3 color = mix(uColor, uEmber, clamp(vEmber, 0.0, 1.0));
    gl_FragColor = vec4(color, a * vAlpha);
  }
`;
