import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import type { ShapeName } from "@/components/three/shapes";
import score from "./assets/score.wav";
import { ParticleField, type FieldState } from "./components/ParticleField";
import { HelloScene } from "./scenes/Hello";
import { LogoScene } from "./scenes/Logo";
import { OutroScene } from "./scenes/Outro";
import { StackScene } from "./scenes/Stack";
import { TaglineScene } from "./scenes/Tagline";
import { CapabilitiesScene } from "./scenes/Capabilities";
import { colors, ease } from "./theme";
import { timeline as T } from "./timeline";

type Key = { frame: number; x: number; y: number; scale: number; alpha: number };

/** Camera/particle direction across the whole film — one continuous shot, like the site. */
const keys: Key[] = [
  { frame: 0, x: 1.35, y: -0.05, scale: 1, alpha: 1 },
  { frame: T.tagline.from - 15, x: 1.35, y: -0.05, scale: 1, alpha: 1 },
  { frame: T.tagline.from + 30, x: 0, y: 0, scale: 1.25, alpha: 0.5 },
  { frame: T.capabilities.from - 15, x: 0, y: 0, scale: 1.3, alpha: 0.5 },
  { frame: T.capabilities.from + 30, x: 0, y: -0.55, scale: 1, alpha: 0.32 },
  { frame: T.stack.from - 15, x: 0, y: -0.55, scale: 1, alpha: 0.32 },
  { frame: T.stack.from + 30, x: 2.05, y: 0, scale: 0.95, alpha: 0.8 },
  { frame: T.outro.from - 15, x: 2.05, y: 0, scale: 0.95, alpha: 0.8 },
  { frame: T.outro.from + 30, x: 0, y: 0, scale: 1.35, alpha: 0.55 },
  { frame: T.outro.from + T.outro.duration - 22, x: 0, y: 0, scale: 1.45, alpha: 0.55 },
  { frame: T.outro.from + T.outro.duration, x: 0, y: 0, scale: 1.5, alpha: 0 },
];

const morphs: { at: number; from: ShapeName; to: ShapeName }[] = [
  { at: T.tagline.from, from: "portrait", to: "galaxy" },
  { at: T.capabilities.from, from: "galaxy", to: "wave" },
  { at: T.stack.from, from: "wave", to: "sphere" },
  { at: T.outro.from, from: "sphere", to: "vortex" },
];

function fieldAt(frame: number, fps: number): FieldState {
  const pick = (prop: keyof Omit<Key, "frame">) =>
    interpolate(
      frame,
      keys.map((k) => k.frame),
      keys.map((k) => k[prop]),
      { easing: ease.inOutQuart, extrapolateRight: "clamp" },
    );

  let from: ShapeName = "portrait";
  let to: ShapeName = "portrait";
  let morph = 0;
  for (const m of morphs) {
    if (frame >= m.at - 12) {
      from = m.from;
      to = m.to;
      morph = interpolate(frame, [m.at - 12, m.at + 40], [0, 1], { extrapolateRight: "clamp" });
    }
  }

  return {
    from,
    to,
    morph,
    x: pick("x"),
    y: pick("y"),
    scale: pick("scale"),
    alpha: pick("alpha"),
    reveal: interpolate(frame, [T.portrait.from - 20, T.portrait.from + 110], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease.inOutQuart,
    }),
    time: frame / fps,
  };
}

export function Intro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: colors.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(80% 60% at 70% 40%, ${colors.ink2}, ${colors.ink} 70%)`,
        }}
      />
      <ParticleField state={fieldAt(frame, fps)} />

      <Sequence from={T.logo.from} durationInFrames={T.logo.duration}>
        <LogoScene />
      </Sequence>
      <Sequence from={T.portrait.from} durationInFrames={T.portrait.duration}>
        <HelloScene />
      </Sequence>
      <Sequence from={T.tagline.from} durationInFrames={T.tagline.duration}>
        <TaglineScene />
      </Sequence>
      <Sequence from={T.capabilities.from} durationInFrames={T.capabilities.duration}>
        <CapabilitiesScene />
      </Sequence>
      <Sequence from={T.stack.from} durationInFrames={T.stack.duration}>
        <StackScene />
      </Sequence>
      <Sequence from={T.outro.from} durationInFrames={T.outro.duration}>
        <OutroScene />
      </Sequence>

      {/* Film grain + vignette */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, #000000aa)",
          pointerEvents: "none",
        }}
      />
      <Audio src={score} />
    </AbsoluteFill>
  );
}
