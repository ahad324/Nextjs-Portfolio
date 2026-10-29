import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { site } from "@/content/site";
import { Appear, Rise } from "../components/Text";
import { colors, fonts } from "../theme";

export function OutroScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dot = spring({ frame: frame - 70, fps, config: { damping: 10 } });
  const fade = interpolate(frame, [128, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const host = new URL(site.url).host;

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", textAlign: "center", opacity: fade }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontWeight: 600,
          fontSize: 170,
          lineHeight: 0.92,
          letterSpacing: "-0.05em",
          color: colors.bone,
        }}
      >
        <Rise text="Let's work" by="words" delay={4} stagger={6} />
        <br />
        <Rise
          text="together."
          delay={20}
          stagger={2}
          style={{
            fontFamily: fonts.serif,
            fontStyle: "italic",
            fontWeight: 400,
            color: colors.ember,
          }}
        />
      </div>
      <Appear delay={46}>
        <div
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontFamily: fonts.sans,
            fontSize: 34,
            color: colors.bone,
          }}
        >
          <svg viewBox="0 0 32 32" width={64} height={64}>
            <path
              d="M6.5 26.5 16 5.5l9.5 21"
              fill="none"
              stroke={colors.bone}
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={16} cy={19} r={2.5 * dot} fill={colors.ember} />
          </svg>
          <span style={{ fontWeight: 600 }}>{host}</span>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: colors.ember }} />
          <span style={{ opacity: 0.7 }}>{site.email}</span>
        </div>
      </Appear>
    </AbsoluteFill>
  );
}
