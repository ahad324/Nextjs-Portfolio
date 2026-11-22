import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/** Slowly drifting engineering grid with a soft ember glow — the film's constant set. */
export function Backdrop() {
  const frame = useCurrentFrame();
  const drift = (frame * 0.35) % 64;
  const glowX = interpolate(frame, [0, 1350], [30, 70]);
  return (
    <AbsoluteFill style={{ background: colors.ink }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${colors.bone}0d 1px, transparent 1px), linear-gradient(90deg, ${colors.bone}0d 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          backgroundPosition: `${drift}px ${drift}px`,
          maskImage: "radial-gradient(70% 70% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(45% 50% at ${glowX}% 20%, ${colors.ember}1f, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, #000000b0)" }}
      />
    </AbsoluteFill>
  );
}
