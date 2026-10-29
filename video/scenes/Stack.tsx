import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { skillCount, skillGroups } from "@/content/skills";
import { Appear, Rise } from "../components/Text";
import { colors, ease, fonts } from "../theme";

const everything = skillGroups.flatMap((group) => group.items);

export function StackScene() {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [134, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.inExpo,
  });
  return (
    <AbsoluteFill style={{ padding: "120px 140px", justifyContent: "center", opacity: 1 - out }}>
      <div style={{ width: 1000 }}>
        <Appear>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 24,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: colors.muted,
            }}
          >
            <span style={{ color: colors.ember }}>(03)</span> — The stack
          </div>
        </Appear>
        <div
          style={{
            marginTop: 26,
            fontFamily: fonts.sans,
            fontWeight: 600,
            fontSize: 130,
            lineHeight: 0.95,
            letterSpacing: "-0.05em",
            color: colors.bone,
          }}
        >
          <Rise text={`${skillCount} tools,`} by="words" delay={2} stagger={5} />
          <br />
          <Rise
            text="every layer."
            by="words"
            delay={10}
            stagger={5}
            style={{
              fontFamily: fonts.serif,
              fontStyle: "italic",
              fontWeight: 400,
              color: colors.ember,
            }}
          />
        </div>
        <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: 12 }}>
          {everything.map((item, i) => {
            const p = interpolate(frame - 22 - i * 1.4, [0, 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease.outExpo,
            });
            return (
              <span
                key={item}
                style={{
                  opacity: p,
                  transform: `translateY(${(1 - p) * 16}px) scale(${0.9 + p * 0.1})`,
                  border: `1.5px solid ${colors.bone}30`,
                  borderRadius: 99,
                  padding: "9px 18px",
                  fontFamily: fonts.sans,
                  fontSize: 21,
                  color: colors.bone,
                  background: `${colors.ink2}cc`,
                }}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}
