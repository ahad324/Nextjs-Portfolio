import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Appear, Rise } from "../components/Text";
import { colors, ease, fonts } from "../theme";

/**
 * The marketing core of the film: four promises, each with an abstract,
 * animated visual. Deliberately general — no project names or screenshots.
 */
export const BEAT_FRAMES = 120;

const beats = [
  {
    index: "01",
    lead: "Real-time,",
    accent: "by default.",
    sub: "Live updates, multiplayer and sockets that stay in sync.",
    Visual: RealtimeVisual,
  },
  {
    index: "02",
    lead: "Secure from",
    accent: "the first commit.",
    sub: "Encryption, authentication and access control built in from the start.",
    Visual: SecureVisual,
  },
  {
    index: "03",
    lead: "Interfaces that",
    accent: "feel instant.",
    sub: "Fast, accessible and responsive on every device.",
    Visual: SpeedVisual,
  },
  {
    index: "04",
    lead: "One engineer,",
    accent: "every layer.",
    sub: "From database design to deployment.",
    Visual: LayersVisual,
  },
];

export function CapabilitiesScene() {
  return (
    <AbsoluteFill>
      {beats.map((beat, i) => (
        <Sequence key={beat.index} from={i * BEAT_FRAMES} durationInFrames={BEAT_FRAMES}>
          <Beat {...beat} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

function Beat({ index, lead, accent, sub, Visual }: (typeof beats)[number]) {
  const frame = useCurrentFrame();
  const exitAt = BEAT_FRAMES - 14;
  const panelIn = interpolate(frame, [4, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.outExpo,
  });
  const panelOut = interpolate(frame, [exitAt, BEAT_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.inExpo,
  });

  return (
    <AbsoluteFill
      style={{ padding: "0 130px", flexDirection: "row", alignItems: "center", gap: 90 }}
    >
      <div style={{ width: 760, flexShrink: 0 }}>
        <Appear delay={2} exitAt={exitAt}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 24,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: colors.muted,
            }}
          >
            <span style={{ color: colors.ember }}>({index})</span> — Capabilities
          </div>
        </Appear>
        <div
          style={{
            marginTop: 28,
            fontFamily: fonts.sans,
            fontWeight: 600,
            fontSize: 112,
            lineHeight: 0.98,
            letterSpacing: "-0.05em",
            color: colors.bone,
            opacity: 1 - panelOut,
          }}
        >
          <Rise text={lead} by="words" delay={4} stagger={4} duration={28} />
          <br />
          <Rise
            text={accent}
            by="words"
            delay={12}
            stagger={4}
            duration={28}
            style={{
              fontFamily: fonts.serif,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              color: colors.ember,
            }}
          />
        </div>
        <Appear delay={24} exitAt={exitAt}>
          <p
            style={{
              marginTop: 34,
              maxWidth: 640,
              fontFamily: fonts.sans,
              fontSize: 36,
              lineHeight: 1.32,
              color: colors.bone,
              opacity: 0.72,
            }}
          >
            {sub}
          </p>
        </Appear>
      </div>
      <div style={{ flex: 1, perspective: 2000 }}>
        <div
          style={{
            height: 600,
            borderRadius: 32,
            border: `1.5px solid ${colors.bone}24`,
            background: `linear-gradient(160deg, ${colors.ink2}f2, ${colors.ink}e6)`,
            boxShadow: `0 60px 140px -40px #000, 0 0 160px -60px ${colors.ember}55`,
            overflow: "hidden",
            position: "relative",
            opacity: panelIn * (1 - panelOut),
            transform: `translateX(${(1 - panelIn) * 200 - panelOut * 160}px) rotateY(${(1 - panelIn) * -20 + panelOut * 14 - 5}deg) rotateX(3deg)`,
          }}
        >
          <Visual />
        </div>
      </div>
    </AbsoluteFill>
  );
}

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "18px 24px",
          borderBottom: `1px solid ${colors.bone}14`,
        }}
      >
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            style={{ width: 12, height: 12, borderRadius: 99, background: "#2a2d33" }}
          />
        ))}
        <span style={{ marginLeft: 14, fontFamily: fonts.mono, fontSize: 19, color: colors.muted }}>
          {title}
        </span>
      </div>
      <div style={{ position: "absolute", inset: "62px 0 0 0", padding: 40 }}>{children}</div>
    </>
  );
}

/** Events streaming in live, with a latency readout. */
function RealtimeVisual() {
  const frame = useCurrentFrame();
  const events = [
    "user joined · room 7F2K",
    "message delivered",
    "cursor moved",
    "order updated",
    "presence: 12 online",
    "notification sent",
    "state synced",
  ];
  return (
    <Panel title="live · websocket connected">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {events.map((event, i) => {
          const p = interpolate(frame, [14 + i * 9, 24 + i * 9], [0, 1], {
            ...clamp,
            easing: ease.outExpo,
          });
          return (
            <div
              key={event}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                opacity: p,
                transform: `translateY(${(1 - p) * 24}px)`,
                fontFamily: fonts.mono,
                fontSize: 24,
                color: colors.bone,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 99,
                  background: i % 3 === 0 ? colors.ember : colors.ok,
                  boxShadow: `0 0 18px ${i % 3 === 0 ? colors.ember : colors.ok}`,
                }}
              />
              <span style={{ flex: 1, opacity: 0.85 }}>{event}</span>
              <span style={{ color: colors.muted }}>{8 + ((i * 7) % 11)}ms</span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 36,
          fontFamily: fonts.sans,
          fontWeight: 600,
          fontSize: 64,
          letterSpacing: "-0.04em",
          color: colors.ok,
        }}
      >
        {Math.round(interpolate(frame, [10, 70], [140, 12], { ...clamp, easing: ease.outExpo }))}
        <span style={{ fontSize: 28, color: colors.muted }}> ms</span>
      </div>
    </Panel>
  );
}

/** A handshake: two nodes, an encrypted channel, checks turning green. */
function SecureVisual() {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [16, 50], [0, 1], { ...clamp, easing: ease.inOutQuart });
  const checks = [
    "TLS 1.3 · mutual auth",
    "JWT sessions · rotation",
    "Role-based access",
    "Rate limiting · validation",
  ];
  return (
    <Panel title="handshake · verified">
      <div style={{ position: "relative", height: 180 }}>
        {[0, 1].map((side) => (
          <div
            key={side}
            style={{
              position: "absolute",
              top: 40,
              [side ? "right" : "left"]: 20,
              width: 100,
              height: 100,
              borderRadius: 28,
              border: `1.5px solid ${colors.bone}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: colors.ink,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width={46}
              height={46}
              fill="none"
              stroke={line >= 1 ? colors.ok : colors.bone}
              strokeWidth={1.6}
              strokeLinecap="round"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d={line >= 1 ? "M8 11V8a4 4 0 0 1 8 0v3" : "M8 11V8a4 4 0 0 1 7.5-2"} />
            </svg>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: 89,
            left: 130,
            right: 130,
            height: 2,
            background: `${colors.bone}1c`,
          }}
        >
          <div
            style={{
              width: `${line * 100}%`,
              height: "100%",
              background: colors.ember,
              boxShadow: `0 0 20px ${colors.ember}`,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 108,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 18,
            color: colors.muted,
            opacity: line,
          }}
        >
          a3f9·e1c0·7b22·90dd·4e81
        </div>
      </div>
      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 18 }}>
        {checks.map((check, i) => {
          const p = interpolate(frame, [48 + i * 8, 58 + i * 8], [0, 1], {
            ...clamp,
            easing: ease.outExpo,
          });
          return (
            <div
              key={check}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: 0.35 + p * 0.65,
                fontFamily: fonts.sans,
                fontSize: 28,
                color: colors.bone,
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 99,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: p > 0.5 ? colors.ok : "transparent",
                  border: `1.5px solid ${p > 0.5 ? colors.ok : colors.bone + "40"}`,
                  transform: `scale(${0.8 + p * 0.2})`,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width={18}
                  height={18}
                  fill="none"
                  stroke={colors.ink}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: p }}
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              {check}
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/** Skeleton resolving into content, scores counting to 100. */
function SpeedVisual() {
  const frame = useCurrentFrame();
  const loaded = interpolate(frame, [26, 44], [0, 1], { ...clamp, easing: ease.outExpo });
  const scores = ["Performance", "Accessibility", "Best practices", "SEO"];
  return (
    <Panel title="interface · 60fps">
      <div style={{ display: "flex", gap: 22 }}>
        {[0, 1, 2].map((card) => (
          <div
            key={card}
            style={{
              flex: 1,
              height: 170,
              borderRadius: 20,
              border: `1.5px solid ${colors.bone}1a`,
              padding: 18,
              background: colors.ink,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 70,
                borderRadius: 12,
                background:
                  loaded > 0.5
                    ? `linear-gradient(135deg, ${colors.ember}, ${colors.ion})`
                    : `${colors.bone}12`,
                opacity: 0.4 + loaded * 0.6,
                filter: `saturate(${loaded})`,
              }}
            />
            <div
              style={{
                marginTop: 16,
                height: 14,
                width: "80%",
                borderRadius: 8,
                background: `${colors.bone}${loaded > 0.5 ? "cc" : "14"}`,
              }}
            />
            <div
              style={{
                marginTop: 10,
                height: 12,
                width: "55%",
                borderRadius: 8,
                background: `${colors.bone}${loaded > 0.5 ? "55" : "10"}`,
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 44, display: "flex", justifyContent: "space-between" }}>
        {scores.map((label, i) => {
          const value = Math.round(
            interpolate(frame, [40 + i * 5, 80 + i * 5], [0, 100], {
              ...clamp,
              easing: ease.outExpo,
            }),
          );
          const r = 46;
          const c = 2 * Math.PI * r;
          return (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}
            >
              <svg width={112} height={112} viewBox="0 0 112 112">
                <circle
                  cx={56}
                  cy={56}
                  r={r}
                  fill="none"
                  stroke={`${colors.bone}18`}
                  strokeWidth={7}
                />
                <circle
                  cx={56}
                  cy={56}
                  r={r}
                  fill="none"
                  stroke={colors.ok}
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeDasharray={c}
                  strokeDashoffset={c * (1 - value / 100)}
                  transform="rotate(-90 56 56)"
                />
                <text
                  x={56}
                  y={66}
                  textAnchor="middle"
                  fontFamily={fonts.sans}
                  fontSize={30}
                  fontWeight={600}
                  fill={colors.bone}
                >
                  {value}
                </text>
              </svg>
              <span style={{ fontFamily: fonts.sans, fontSize: 19, color: colors.muted }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/** The stack as layers lighting up from data to interface. */
function LayersVisual() {
  const frame = useCurrentFrame();
  const layers = ["Interface", "API", "Real-time", "Data", "Infrastructure"];
  return (
    <Panel title="full stack · owned end to end">
      <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 6 }}>
        {layers.map((layer, i) => {
          const order = layers.length - 1 - i;
          const p = interpolate(frame, [14 + order * 9, 28 + order * 9], [0, 1], {
            ...clamp,
            easing: ease.outExpo,
          });
          return (
            <div
              key={layer}
              style={{
                height: 74,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 28px",
                border: `1.5px solid ${p > 0.5 ? colors.ember : colors.bone + "22"}`,
                background: p > 0.5 ? `${colors.ember}1f` : colors.ink,
                transform: `translateX(${(1 - p) * 60}px) scale(${0.96 + p * 0.04})`,
                opacity: 0.3 + p * 0.7,
                fontFamily: fonts.sans,
                fontSize: 30,
                fontWeight: 600,
                color: colors.bone,
              }}
            >
              {layer}
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 18,
                  fontWeight: 400,
                  color: p > 0.5 ? colors.ember : colors.muted,
                }}
              >
                0{order + 1}
              </span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
