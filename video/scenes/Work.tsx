import type { StaticImageData } from "next/image";
import { AbsoluteFill, Img, interpolate, Sequence, useCurrentFrame } from "remotion";
import { projects, type Project } from "@/content/projects";
import { Appear, Rise } from "../components/Text";
import { colors, ease, fonts } from "../theme";

export const PROJECT_FRAMES = 80;

// Next imports images as objects, Remotion's bundler as plain URLs.
const src = (image: StaticImageData | string) => (typeof image === "string" ? image : image.src);

export function WorkScene() {
  return (
    <AbsoluteFill>
      {projects.map((project, index) => (
        <Sequence key={project.slug} from={index * PROJECT_FRAMES} durationInFrames={PROJECT_FRAMES}>
          <ProjectCard project={project} index={index} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 26], [0, 1], { extrapolateRight: "clamp", easing: ease.outExpo });
  const exit = interpolate(frame, [PROJECT_FRAMES - 14, PROJECT_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.inExpo,
  });
  const drift = interpolate(frame, [0, PROJECT_FRAMES], [0, -30]);
  const exitAt = PROJECT_FRAMES - 14;

  return (
    <AbsoluteFill style={{ padding: "110px 120px", flexDirection: "row", alignItems: "center", gap: 80 }}>
      <div style={{ width: 640, flexShrink: 0 }}>
        <Appear delay={2} exitAt={exitAt}>
          <div style={{ fontFamily: fonts.mono, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: colors.muted }}>
            <span style={{ color: project.accent }}>{String(index + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")} · {project.year}
          </div>
        </Appear>
        <div style={{ marginTop: 26, fontFamily: fonts.sans, fontWeight: 600, fontSize: 120, lineHeight: 0.95, letterSpacing: "-0.05em", color: colors.bone, opacity: 1 - exit }}>
          <Rise text={project.title} delay={4} stagger={1.2} duration={28} />
        </div>
        <Appear delay={12} exitAt={exitAt}>
          <p style={{ marginTop: 28, fontFamily: fonts.sans, fontSize: 36, lineHeight: 1.3, color: colors.bone, opacity: 0.75 }}>{project.tagline}</p>
        </Appear>
        <div style={{ marginTop: 34, display: "flex", flexWrap: "wrap", gap: 12 }}>
          {project.stack.slice(0, 5).map((tool, i) => (
            <Appear key={tool} delay={18 + i * 2} exitAt={exitAt} y={14}>
              <span style={{ display: "inline-block", border: `1.5px solid ${colors.bone}33`, borderRadius: 99, padding: "10px 20px", fontFamily: fonts.sans, fontSize: 22, color: colors.bone }}>
                {tool}
              </span>
            </Appear>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, perspective: 2200 }}>
        <div
          style={{
            transform: `translateX(${(1 - enter) * 260 - exit * 200 + drift}px) rotateY(${(1 - enter) * -24 + exit * 18 - 6}deg) rotateX(4deg)`,
            opacity: enter * (1 - exit),
            borderRadius: 26,
            overflow: "hidden",
            border: `1.5px solid ${colors.bone}2e`,
            background: colors.ink2,
            boxShadow: `0 60px 120px -30px #000, 0 0 140px -40px ${project.accent}66`,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${colors.bone}18` }}>
            {[0, 1, 2].map((dot) => (
              <span key={dot} style={{ width: 13, height: 13, borderRadius: 99, background: "#2a2d33" }} />
            ))}
            <span style={{ marginLeft: 16, fontFamily: fonts.mono, fontSize: 18, color: colors.muted }}>
              {project.links.live ? project.links.live.replace(/^https?:\/\//, "") : project.slug}
            </span>
          </div>
          <div style={{ aspectRatio: "16 / 10", position: "relative" }}>
            {project.image ? (
              <Img src={src(project.image)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            ) : (
              <Console accent={project.accent} />
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

const lines = [
  ["POST", "/api/v1/auth/login", "200", "38ms"],
  ["POST", "/api/v1/transfers", "201", "54ms"],
  ["GET", "/api/v1/accounts/me/transactions", "200", "12ms"],
  ["WS", "/ws/notifications", "101", "3ms"],
  ["PATCH", "/api/v1/admin/loans/1842", "200", "41ms"],
  ["GET", "/api/v1/cards", "200", "9ms"],
];

function Console({ accent }: { accent: string }) {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, padding: "48px 56px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, fontFamily: fonts.mono, fontSize: 26, background: `radial-gradient(70% 60% at 80% 10%, ${accent}38, transparent 70%)` }}>
      {lines.map(([method, path, status, ms], i) => (
        <div key={path} style={{ display: "flex", gap: 28, opacity: interpolate(frame, [8 + i * 5, 14 + i * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ width: 110, color: accent }}>{method}</span>
          <span style={{ flex: 1, color: colors.bone, opacity: 0.8 }}>{path}</span>
          <span style={{ color: "#3ddc97" }}>{status}</span>
          <span style={{ width: 90, textAlign: "right", color: colors.muted }}>{ms}</span>
        </div>
      ))}
    </div>
  );
}
