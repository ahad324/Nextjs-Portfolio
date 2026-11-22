import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { site } from "@/content/site";
import { Appear, Rise } from "../components/Text";
import { colors, ease, fonts } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Statement (6 s), then the signature card with contact details (6 s). */
export function CloseScene() {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={180}>
        <Statement />
      </Sequence>
      <Sequence from={180} durationInFrames={180}>
        <Signature />
      </Sequence>
    </AbsoluteFill>
  );
}

const DISCIPLINES = ["Web", "Mobile", "Backend", "Real-time", "IoT", "Deployment"];

function Statement() {
  const frame = useCurrentFrame();
  const exit = interpolate(frame, [166, 180], [0, 1], { ...clamp, easing: ease.inExpo });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: 1 - exit,
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontWeight: 600,
          fontSize: 150,
          lineHeight: 0.98,
          letterSpacing: "-0.05em",
          color: colors.bone,
        }}
      >
        <Rise text="Full-stack engineering," by="words" delay={4} stagger={6} duration={30} />
        <br />
        <Rise
          text="idea to production."
          by="words"
          delay={22}
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
      <div style={{ marginTop: 60, display: "flex", gap: 16 }}>
        {DISCIPLINES.map((item, i) => {
          const p = interpolate(frame, [60 + i * 6, 76 + i * 6], [0, 1], {
            ...clamp,
            easing: ease.outExpo,
          });
          return (
            <span
              key={item}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 16}px)`,
                border: `1.5px solid ${colors.bone}33`,
                borderRadius: 99,
                padding: "12px 26px",
                fontFamily: fonts.sans,
                fontSize: 28,
                color: colors.bone,
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

function Signature() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [4, 40], [1, 0], { ...clamp, easing: ease.inOutQuart });
  const dot = spring({ frame: frame - 34, fps, config: { damping: 9, stiffness: 160 } });
  const fade = interpolate(frame, [158, 180], [1, 0], clamp);
  const host = new URL(site.url).host;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: fade,
      }}
    >
      <svg viewBox="0 0 32 32" width={170} height={170}>
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
          marginTop: 40,
          fontFamily: fonts.sans,
          fontWeight: 600,
          fontSize: 110,
          letterSpacing: "-0.05em",
          color: colors.bone,
        }}
      >
        <Rise text={site.name} delay={26} stagger={1.6} />
        <span style={{ color: colors.ember, opacity: interpolate(frame, [48, 56], [0, 1], clamp) }}>
          .
        </span>
      </div>
      <Appear delay={50}>
        <div
          style={{
            marginTop: 18,
            fontFamily: fonts.sans,
            fontSize: 36,
            color: colors.bone,
            opacity: 0.75,
          }}
        >
          {site.role} at {site.company.name}
        </div>
      </Appear>
      <Appear delay={66}>
        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontFamily: fonts.mono,
            fontSize: 28,
            color: colors.bone,
          }}
        >
          <span>{host}</span>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: colors.ember }} />
          <span style={{ opacity: 0.7 }}>{site.email}</span>
        </div>
      </Appear>
    </AbsoluteFill>
  );
}
