import { AbsoluteFill } from "remotion";
import { site } from "@/content/site";
import { Backdrop } from "./components/Backdrop";
import { SystemScene } from "./scenes/System";
import { colors, fonts } from "./theme";

/**
 * Thumbnail for the intro film (search results, social cards, the player's
 * poster). Name and promise on the left, the finished architecture map —
 * the film's centrepiece — on the right.
 */
export function Poster() {
  return (
    <AbsoluteFill>
      <Backdrop />

      <div
        style={{
          position: "absolute",
          left: 790,
          top: 235,
          width: 1920,
          height: 1080,
          transform: "scale(0.57)",
          transformOrigin: "top left",
        }}
      >
        <SystemScene bare at={330} />
      </div>

      {/* Left-side scrim so the type always reads over the map. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, ${colors.ink} 0%, ${colors.ink}f2 30%, ${colors.ink}00 46%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 130,
          top: 0,
          bottom: 0,
          width: 900,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 32 32" width={96} height={96}>
          <path
            d="M6.5 26.5 16 5.5l9.5 21"
            fill="none"
            stroke={colors.bone}
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={16} cy={19} r={2.6} fill={colors.ember} />
        </svg>
        <div
          style={{
            marginTop: 40,
            fontFamily: fonts.sans,
            fontWeight: 600,
            fontSize: 128,
            lineHeight: 0.95,
            letterSpacing: "-0.05em",
            color: colors.bone,
          }}
        >
          {site.name}
          <span style={{ color: colors.ember }}>.</span>
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: fonts.serif,
            fontStyle: "italic",
            fontSize: 70,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: colors.ember,
          }}
        >
          Full-stack engineering,
          <br />
          idea to production.
        </div>
        <div
          style={{
            marginTop: 44,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: fonts.mono,
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: colors.muted,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 99,
              background: colors.bone,
            }}
          >
            <svg viewBox="0 0 24 24" width={26} height={26}>
              <path
                d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z"
                fill={colors.ink}
              />
            </svg>
          </span>
          {site.role} · {site.company.name} · 0:45
        </div>
      </div>
    </AbsoluteFill>
  );
}
