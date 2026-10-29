import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Rise } from "../components/Text";
import { colors, ease, fonts } from "../theme";

export function TaglineScene() {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 150], [1, 1.08]);
  const out = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.inExpo,
  });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: 1 - out,
        transform: `scale(${zoom})`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 24,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: colors.muted,
        }}
      >
        <span style={{ color: colors.ember }}>●</span> What I do
      </div>
      <div
        style={{
          marginTop: 40,
          fontFamily: fonts.sans,
          fontWeight: 600,
          fontSize: 150,
          lineHeight: 0.95,
          letterSpacing: "-0.05em",
          color: colors.bone,
        }}
      >
        <Rise text="Full-stack engineering" by="words" delay={6} stagger={6} duration={30} />
        <br />
        <Rise
          text="for web and desktop."
          by="words"
          delay={30}
          stagger={6}
          duration={30}
          style={{
            fontFamily: fonts.serif,
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: colors.ember,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 50,
          fontFamily: fonts.sans,
          fontSize: 34,
          color: colors.bone,
          opacity: interpolate(frame, [60, 85], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        APIs · real-time systems · databases · interfaces
      </div>
    </AbsoluteFill>
  );
}
