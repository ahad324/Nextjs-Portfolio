/**
 * Synthesises the intro film's soundtrack — an original, license-free score
 * timed to the film's scene cuts. Deterministic: same output every run.
 *
 *   node scripts/make-score.mjs  →  video/assets/score.wav
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const SR = 44100;
const DURATION = 40;
const N = SR * DURATION;
const BPM = 96;
const BEAT = 60 / BPM;
const TAU = Math.PI * 2;

// Scene cuts (seconds) — keep in sync with video/timeline.ts
const CUTS = [3, 9, 14, 30, 35];

const L = new Float32Array(N);
const R = new Float32Array(N);
const busL = new Float32Array(N); // sent to reverb
const busR = new Float32Array(N);

let seed = 7;
const rand = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);
const add = (i, l, r, send = 0) => {
  if (i < 0 || i >= N) return;
  L[i] += l;
  R[i] += r;
  busL[i] += l * send;
  busR[i] += r * send;
};

// ── Pad: A minor progression, 2 bars per chord ─────────────────────────
const chords = [
  [57, 60, 64, 69], // Am
  [53, 57, 60, 65], // F
  [48, 55, 60, 64], // C
  [55, 59, 62, 67], // G
];
const chordLen = BEAT * 8;
for (let c = 0; c * chordLen < DURATION; c++) {
  const notes = c * chordLen >= 35 ? chords[0] : chords[c % 4];
  const start = c * chordLen;
  const end = Math.min(DURATION, start + chordLen + 1.2);
  for (const note of notes) {
    for (const detune of [-0.07, 0.07]) {
      const f = midi(note + detune);
      const pan = detune < 0 ? 0.35 : 0.65;
      let lp = 0;
      for (let i = Math.floor(start * SR); i < end * SR && i < N; i++) {
        const t = i / SR - start;
        const env = Math.min(1, t / 1.4) * Math.min(1, (end - i / SR) / 1.2);
        // Soft saw (few harmonics) through a one-pole low-pass.
        const ph = TAU * f * (i / SR);
        const raw = Math.sin(ph) + 0.35 * Math.sin(2 * ph) + 0.15 * Math.sin(3 * ph);
        lp += (raw - lp) * 0.12;
        const v = lp * env * 0.022;
        add(i, v * (1 - pan) * 2, v * pan * 2, 0.6);
      }
    }
  }
}

// ── Sub bass on chord roots ────────────────────────────────────────────
for (let c = 0; c * chordLen < DURATION; c++) {
  const start = c * chordLen;
  if (start < 3 || start >= 37) continue;
  const f = midi((c * chordLen >= 35 ? chords[0] : chords[c % 4])[0] - 12);
  for (let i = Math.floor(start * SR); i < (start + chordLen) * SR && i < N; i++) {
    const t = i / SR - start;
    const env = Math.min(1, t / 0.2) * Math.min(1, (chordLen - t) / 0.3);
    const v = Math.sin(TAU * f * (i / SR)) * env * 0.11;
    add(i, v, v);
  }
}

// ── Kick, hats ─────────────────────────────────────────────────────────
function kick(time, gain) {
  const s = Math.floor(time * SR);
  for (let i = 0; i < SR * 0.45; i++) {
    const t = i / SR;
    const v = Math.sin(TAU * (45 * t + (80 / 28) * (1 - Math.exp(-t * 28)))) * Math.exp(-t * 7) * gain;
    add(s + i, v, v);
  }
}
function hat(time, gain) {
  const s = Math.floor(time * SR);
  let hp = 0;
  let prev = 0;
  for (let i = 0; i < SR * 0.05; i++) {
    const n = rand() * 2 - 1;
    hp = 0.85 * (hp + n - prev);
    prev = n;
    const v = hp * Math.exp(-(i / SR) * 90) * gain;
    add(s + i, v * 0.8, v * 1.2, 0.15);
  }
}
for (let b = 0; b * BEAT < DURATION; b++) {
  const t = b * BEAT;
  if (t >= 3 && t < 35) {
    const inMontage = t >= 14 && t < 30;
    if (inMontage || b % 2 === 0) kick(t, inMontage ? 0.42 : 0.3);
    if (inMontage) hat(t + BEAT / 2, 0.12);
  }
}

// ── Plucked arpeggio from the tagline onwards ──────────────────────────
for (let s = 0; s * (BEAT / 2) < DURATION; s++) {
  const t = s * (BEAT / 2);
  if (t < 9 || t >= 35) continue;
  const chord = chords[Math.floor(t / chordLen) % 4];
  const pattern = [0, 2, 1, 3, 2, 1, 3, 2];
  const note = chord[pattern[s % 8]] + 12;
  const f = midi(note);
  const start = Math.floor(t * SR);
  const pan = 0.3 + 0.4 * ((s % 4) / 3);
  for (let i = 0; i < SR * 0.6; i++) {
    const tt = i / SR;
    const env = Math.exp(-tt * 9) * Math.min(1, tt / 0.004);
    const v = (Math.sin(TAU * f * tt) + 0.3 * Math.sin(TAU * 2 * f * tt) * Math.exp(-tt * 20)) * env * 0.05;
    add(start + i, v * (1 - pan) * 2, v * pan * 2, 0.5);
  }
}

// ── Risers into each cut, and impacts on the big ones ─────────────────
for (const cut of CUTS) {
  const len = 1.1;
  const start = Math.floor((cut - len) * SR);
  let lp = 0;
  for (let i = 0; i < len * SR; i++) {
    const t = i / SR / len;
    lp += (rand() * 2 - 1 - lp) * (0.02 + t * 0.4);
    const v = lp * t * t * 0.18;
    add(start + i, v * (1 - t * 0.5), v * (0.5 + t * 0.5), 0.4);
  }
}
for (const cut of [3, 35]) {
  const s = Math.floor(cut * SR);
  for (let i = 0; i < SR * 2.2; i++) {
    const t = i / SR;
    const v = Math.sin(TAU * 52 * t) * Math.exp(-t * 2.2) * 0.32 + (rand() * 2 - 1) * Math.exp(-t * 18) * 0.08;
    add(s + i, v, v, 0.3);
  }
}

// ── Reverb (Schroeder: 4 combs + 2 all-passes per side) ───────────────
function reverb(input, offset) {
  const out = new Float32Array(N);
  const combs = [1557, 1617, 1491, 1422].map((d) => ({ d: d + offset, buf: new Float32Array(d + offset), i: 0, f: 0 }));
  for (let n = 0; n < N; n++) {
    let sum = 0;
    for (const c of combs) {
      const y = c.buf[c.i];
      c.f = y * 0.7 + c.f * 0.3;
      c.buf[c.i] = input[n] + c.f * 0.86;
      c.i = (c.i + 1) % c.d;
      sum += y;
    }
    out[n] = sum / 4;
  }
  for (const d of [225, 556]) {
    const buf = new Float32Array(d + offset);
    let i = 0;
    for (let n = 0; n < N; n++) {
      const y = buf[i];
      const x = out[n];
      buf[i] = x + y * 0.5;
      out[n] = y - x * 0.5;
      i = (i + 1) % buf.length;
    }
  }
  return out;
}
const wetL = reverb(busL, 0);
const wetR = reverb(busR, 23);

// ── Master: mix, fade, normalise, write ───────────────────────────────
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const fade = Math.min(1, t / 0.05) * Math.min(1, (DURATION - t) / 1.8);
  L[i] = Math.tanh((L[i] + wetL[i] * 0.55) * 1.1) * fade;
  R[i] = Math.tanh((R[i] + wetR[i] * 0.55) * 1.1) * fade;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const gain = 0.89 / peak;

const data = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * gain)) * 32767), i * 4);
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * gain)) * 32767), i * 4 + 2);
}
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + data.length, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(SR, 24);
header.writeUInt32LE(SR * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(data.length, 40);

const out = path.join(root, "video/assets/score.wav");
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, Buffer.concat([header, data]));
console.log(`score → ${path.relative(root, out)} (${DURATION}s, peak normalised)`);
