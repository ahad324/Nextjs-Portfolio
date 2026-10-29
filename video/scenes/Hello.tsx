import { AbsoluteFill } from "remotion";
import { site } from "@/content/site";
import { Appear, Rise } from "../components/Text";
import { colors, fonts } from "../theme";

/** Particles assemble into the portrait (driven globally); the name lands beside it. */
export function HelloScene() {
  const exit = 160;
  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 140px" }}>
      <Appear delay={40} exitAt={exit}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: fonts.mono, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: colors.muted }}>
          <span style={{ width: 12, height: 12, borderRadius: 99, background: colors.ok }} />
          {site.role} · {site.company.name}
        </div>
      </Appear>
      <Appear delay={0} exitAt={exit} y={0}>
        <div style={{ marginTop: 30, fontFamily: fonts.sans, fontWeight: 600, fontSize: 230, lineHeight: 0.86, letterSpacing: "-0.055em", color: colors.bone }}>
          <Rise text={site.firstName} delay={30} stagger={2.2} duration={34} />
          <br />
          <Rise
            text={site.lastName}
            delay={42}
            stagger={2.2}
            duration={34}
            style={{ fontFamily: fonts.serif, fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.03em", color: colors.ember, paddingRight: "0.1em" }}
          />
        </div>
      </Appear>
      <Appear delay={70} exitAt={exit}>
        <p style={{ marginTop: 44, maxWidth: 780, fontFamily: fonts.sans, fontSize: 38, lineHeight: 1.35, color: colors.bone, opacity: 0.75 }}>
          {site.pitch}
        </p>
      </Appear>
    </AbsoluteFill>
  );
}
