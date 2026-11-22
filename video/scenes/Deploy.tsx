import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Appear } from "../components/Text";
import { colors, ease, fonts } from "../theme";

/** "Ship it": a CI/CD run from push to production, then an uptime trace. */

const STEPS = [
  { label: "Install dependencies", time: "6.1s" },
  { label: "Lint & type-check", time: "4.3s" },
  { label: "Run tests", time: "9.8s" },
  { label: "Build production bundle", time: "12.4s" },
  { label: "Build & push Docker image", time: "8.7s" },
  { label: "Deploy to production", time: "3.2s" },
];

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const STEP_START = 34;
const STEP_GAP = 18;

export function DeployScene() {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 18], [0, 1], { ...clamp, easing: ease.outExpo });
  const exit = interpolate(frame, [196, 210], [0, 1], { ...clamp, easing: ease.inExpo });
  const typed = "git push origin main".slice(0, Math.max(0, Math.floor((frame - 8) / 1.2)));
  const doneAt = STEP_START + STEPS.length * STEP_GAP + 6;
  const done = interpolate(frame, [doneAt, doneAt + 14], [0, 1], {
    ...clamp,
    easing: ease.outExpo,
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: enter * (1 - exit),
        transform: `translateY(${(1 - enter) * 40 - exit * 40}px)`,
      }}
    >
      <Appear delay={2} style={{ position: "absolute", top: 110, left: 140 }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 24,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: colors.muted,
          }}
        >
          <span style={{ color: colors.ember }}>03</span> — Ship it
        </div>
      </Appear>

      {/* Terminal starts centred, then slides left as the health panel arrives. */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "stretch",
          transform: `translateX(${(1 - done) * 230}px)`,
        }}
      >
        {/* Terminal */}
        <div
          style={{
            width: 1000,
            borderRadius: 24,
            border: `1.5px solid ${colors.bone}22`,
            background: `${colors.ink2}f2`,
            boxShadow: "0 60px 140px -40px #000",
            overflow: "hidden",
            fontFamily: fonts.mono,
            fontSize: 26,
          }}
        >
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
                style={{ width: 13, height: 13, borderRadius: 99, background: "#2a2d33" }}
              />
            ))}
            <span style={{ marginLeft: 16, fontSize: 19, color: colors.muted }}>
              pipeline · main
            </span>
          </div>
          <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ color: colors.bone }}>
              <span style={{ color: colors.ok }}>➜</span>{" "}
              <span style={{ color: colors.muted }}>~/app</span> {typed}
            </div>
            {STEPS.map((step, i) => {
              const at = STEP_START + i * STEP_GAP;
              const shown = interpolate(frame, [at, at + 6], [0, 1], clamp);
              const finished = frame >= at + STEP_GAP - 4;
              const spinner = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏"[Math.floor(frame / 2) % 10];
              return (
                <div
                  key={step.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    opacity: shown,
                    transform: `translateX(${(1 - shown) * 20}px)`,
                    color: finished ? colors.bone : colors.muted,
                  }}
                >
                  <span style={{ width: 26, color: finished ? colors.ok : colors.ember }}>
                    {finished ? "✓" : spinner}
                  </span>
                  <span style={{ flex: 1 }}>{step.label}</span>
                  <span style={{ color: colors.muted, opacity: finished ? 1 : 0 }}>
                    {step.time}
                  </span>
                </div>
              );
            })}
            <div
              style={{
                marginTop: 10,
                padding: "16px 20px",
                borderRadius: 14,
                background: `${colors.ok}18`,
                border: `1.5px solid ${colors.ok}66`,
                color: colors.ok,
                opacity: done,
                transform: `scale(${0.96 + done * 0.04})`,
              }}
            >
              ● Live in production · 44.5s · zero downtime
            </div>
          </div>
        </div>

        {/* Health panel */}
        <div
          style={{
            width: 420,
            borderRadius: 24,
            border: `1.5px solid ${colors.bone}22`,
            background: `${colors.ink2}f2`,
            padding: 34,
            display: "flex",
            flexDirection: "column",
            gap: 26,
            opacity: done,
            transform: `translateX(${(1 - done) * 40}px)`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 19,
              color: colors.muted,
              letterSpacing: "0.08em",
            }}
          >
            HEALTH
          </div>
          {[
            ["Uptime", "99.98%"],
            ["p95 latency", "38 ms"],
            ["Error rate", "0.01%"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
            >
              <span
                style={{ fontFamily: fonts.sans, fontSize: 24, color: colors.bone, opacity: 0.7 }}
              >
                {k}
              </span>
              <span
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 40,
                  fontWeight: 600,
                  color: colors.bone,
                }}
              >
                {v}
              </span>
            </div>
          ))}
          <svg viewBox="0 0 352 90" width={352} height={90}>
            <polyline
              fill="none"
              stroke={colors.ok}
              strokeWidth={3}
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - interpolate(frame, [doneAt + 8, doneAt + 50], [0, 1], clamp)}
              points={Array.from(
                { length: 23 },
                (_, i) => `${i * 16},${45 + Math.sin(i * 1.7) * 10 + Math.cos(i * 0.6) * 8}`,
              ).join(" ")}
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
}
