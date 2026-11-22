import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, ease, fonts } from "../theme";

/** Fast kinetic cold open: one word per beat, the last one held. */
const WORDS = ["Ideas.", "Interfaces.", "APIs.", "Devices.", "Production."];
const BEAT = 27; // frames per word (≈ 0.9 s)

export function OpenScene() {
  const frame = useCurrentFrame();
  const index = Math.min(WORDS.length - 1, Math.floor(frame / BEAT));
  const local = frame - index * BEAT;
  const isLast = index === WORDS.length - 1;
  const enter = interpolate(local, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    easing: ease.outExpo,
  });
  const exit = isLast
    ? interpolate(frame, [138, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : interpolate(local, [BEAT - 5, BEAT], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const word = WORDS[index]!;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: isLast ? fonts.serif : fonts.sans,
          fontStyle: isLast ? "italic" : "normal",
          fontWeight: isLast ? 400 : 600,
          fontSize: isLast ? 260 : 240,
          letterSpacing: isLast ? "-0.03em" : "-0.055em",
          color: isLast ? colors.ember : colors.bone,
          opacity: enter * (1 - exit),
          transform: `translateY(${(1 - enter) * 60}px) scale(${1 + local * 0.0016})`,
          filter: `blur(${(1 - enter) * 10}px)`,
        }}
      >
        {word}
      </div>
      {/* Beat counter, bottom-left */}
      <div
        style={{
          position: "absolute",
          left: 120,
          bottom: 100,
          display: "flex",
          gap: 12,
          opacity: 1 - exit * (isLast ? 1 : 0),
        }}
      >
        {WORDS.map((w, i) => (
          <span
            key={w}
            style={{
              width: 44,
              height: 3,
              borderRadius: 2,
              background: i <= index ? colors.ember : `${colors.bone}26`,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}
