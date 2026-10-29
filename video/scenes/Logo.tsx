import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { site } from "@/content/site";
import { Rise } from "../components/Text";
import { colors, ease, fonts } from "../theme";

export function LogoScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [4, 40], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.inOutQuart,
  });
  const dot = spring({ frame: frame - 34, fps, config: { damping: 9, stiffness: 160 } });
  const out = interpolate(frame, [72, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.inExpo,
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: 1 - out,
        transform: `scale(${1 + out * 0.15})`,
      }}
    >
      <svg viewBox="0 0 32 32" width={220} height={220}>
        <path
          d="M6.5 26.5 16 5.5l9.5 21"
          fill="none"
          stroke={colors.bone}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={draw}
        />
        <circle cx={16} cy={19} r={2.4 * dot} fill={colors.ember} />
      </svg>
      <div
        style={{
          marginTop: 44,
          fontFamily: fonts.sans,
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: colors.bone,
        }}
      >
        <Rise text={site.name} delay={28} stagger={1.4} />
      </div>
    </AbsoluteFill>
  );
}
