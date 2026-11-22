import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Appear } from "../components/Text";
import { colors, ease, fonts } from "../theme";

/**
 * "Connect it": an architecture map assembles itself — clients, API, services,
 * data — inside a production boundary, then live traffic flows through it.
 */

type Node = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  at: number;
  tone?: "ember" | "ok";
};

const NODES: Node[] = [
  { id: "web", label: "Web app", sub: "React · Next.js", x: 290, y: 360, at: 8 },
  { id: "desktop", label: "Desktop app", sub: "PyQt · Qt", x: 290, y: 560, at: 16 },
  {
    id: "iot",
    label: "IoT devices",
    sub: "Sensors · Arduino",
    x: 290,
    y: 760,
    at: 24,
    tone: "ember",
  },
  { id: "api", label: "API gateway", sub: "Node.js · FastAPI", x: 790, y: 560, at: 44 },
  { id: "rt", label: "Real-time", sub: "WebSockets", x: 1220, y: 380, at: 64 },
  { id: "auth", label: "Auth & access", sub: "JWT · RBAC", x: 1220, y: 560, at: 72 },
  { id: "ingest", label: "Device ingest", sub: "Streams · Queues", x: 1220, y: 740, at: 80 },
  { id: "db", label: "PostgreSQL", sub: "Primary data", x: 1620, y: 460, at: 98, tone: "ok" },
  { id: "cache", label: "Redis", sub: "Cache · Pub/Sub", x: 1620, y: 660, at: 106, tone: "ok" },
];

const EDGES: [from: string, to: string][] = [
  ["web", "api"],
  ["desktop", "api"],
  ["iot", "api"],
  ["api", "rt"],
  ["api", "auth"],
  ["api", "ingest"],
  ["rt", "cache"],
  ["auth", "db"],
  ["ingest", "db"],
  ["ingest", "cache"],
];

const W = 270;
const H = 96;
const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

type Curve = { x1: number; y1: number; mx: number; x2: number; y2: number };

function curve(a: Node, b: Node): Curve {
  const x1 = a.x + W / 2;
  const x2 = b.x - W / 2;
  return { x1, y1: a.y, mx: (x1 + x2) / 2, x2, y2: b.y };
}

/** Point on the cubic bezier (x1,y1) → (mx,y1) → (mx,y2) → (x2,y2). */
function pointAt(c: Curve, t: number) {
  const u = 1 - t;
  const x = u * u * u * c.x1 + 3 * u * u * t * c.mx + 3 * u * t * t * c.mx + t * t * t * c.x2;
  const y = u * u * u * c.y1 + 3 * u * u * t * c.y1 + 3 * u * t * t * c.y2 + t * t * t * c.y2;
  return { x, y };
}

const hex = (v: number) =>
  Math.round(Math.max(0, Math.min(255, v)))
    .toString(16)
    .padStart(2, "0");

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export function SystemScene() {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 420], [1.07, 1]);
  const exit = interpolate(frame, [400, 420], [0, 1], { ...clamp, easing: ease.inExpo });
  const boundary = interpolate(frame, [118, 150], [0, 1], { ...clamp, easing: ease.outExpo });
  const live = interpolate(frame, [150, 175], [0, 1], clamp);
  const events = Math.round(interpolate(frame, [160, 400], [0, 12480], clamp));

  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
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
          <span style={{ color: colors.ember }}>02</span> — Connect it
        </div>
      </Appear>

      <AbsoluteFill style={{ transform: `scale(${zoom}) translateY(30px)` }}>
        {/* Production boundary */}
        <div
          style={{
            position: "absolute",
            left: 1050,
            top: 270,
            width: 740,
            height: 590,
            borderRadius: 32,
            border: `1.5px dashed ${colors.ember}${hex(boundary * 110)}`,
            background: `${colors.ember}${hex(boundary * 10)}`,
            transform: `scale(${0.96 + boundary * 0.04})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -42,
              left: 4,
              fontFamily: fonts.mono,
              fontSize: 20,
              color: colors.ember,
              opacity: boundary,
              letterSpacing: "0.08em",
            }}
          >
            PRODUCTION · Docker · Nginx · CI/CD
          </div>
        </div>

        {/* Edges + traffic */}
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          {EDGES.map(([from, to], i) => {
            const a = byId[from]!;
            const b = byId[to]!;
            const c = curve(a, b);
            const start = Math.max(a.at, b.at) + 10;
            const draw = interpolate(frame, [start, start + 22], [0, 1], {
              ...clamp,
              easing: ease.inOutQuart,
            });
            const d = `M${c.x1} ${c.y1} C${c.mx} ${c.y1} ${c.mx} ${c.y2} ${c.x2} ${c.y2}`;
            return (
              <g key={`${from}-${to}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={`${colors.bone}30`}
                  strokeWidth={2}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - draw}
                />
                {[0, 0.33, 0.66].map((offset, k) => {
                  const raw = ((frame - 150) / (70 + i * 6) + offset + i * 0.13) % 1;
                  const t = raw < 0 ? raw + 1 : raw;
                  const back = k === 2;
                  const p = pointAt(c, back ? 1 - t : t);
                  const tone = back ? colors.ok : colors.ember;
                  return (
                    <circle
                      key={k}
                      cx={p.x}
                      cy={p.y}
                      r={5}
                      fill={tone}
                      opacity={live}
                      style={{ filter: `drop-shadow(0 0 8px ${tone})` }}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((node) => {
          const p = interpolate(frame, [node.at, node.at + 18], [0, 1], {
            ...clamp,
            easing: ease.outExpo,
          });
          const accent =
            node.tone === "ember" ? colors.ember : node.tone === "ok" ? colors.ok : colors.bone;
          const pulse = live * (0.5 + 0.5 * Math.sin((frame + node.x) / 9));
          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                left: node.x - W / 2,
                top: node.y - H / 2,
                width: W,
                height: H,
                borderRadius: 20,
                border: `1.5px solid ${accent}${node.tone ? "88" : "33"}`,
                background: colors.ink2,
                boxShadow: "0 24px 60px -24px #000",
                padding: "18px 22px",
                opacity: p,
                transform: `translateY(${(1 - p) * 24}px) scale(${0.9 + p * 0.1})`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: fonts.sans,
                  fontSize: 25,
                  fontWeight: 600,
                  color: colors.bone,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 99,
                    background: accent,
                    opacity: 0.4 + pulse * 0.6,
                  }}
                />
                {node.label}
              </div>
              <div
                style={{ marginTop: 6, fontFamily: fonts.mono, fontSize: 17, color: colors.muted }}
              >
                {node.sub}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Live metrics strip */}
      <div
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          bottom: 90,
          display: "flex",
          gap: 60,
          fontFamily: fonts.mono,
          fontSize: 22,
          color: colors.muted,
          opacity: live,
        }}
      >
        <span>
          <span style={{ color: colors.ok }}>●</span> live
        </span>
        <span>
          events <span style={{ color: colors.bone }}>{events.toLocaleString("en-US")}</span>
        </span>
        <span>
          p95 latency <span style={{ color: colors.bone }}>38 ms</span>
        </span>
        <span>
          clients <span style={{ color: colors.bone }}>web · desktop · iot</span>
        </span>
      </div>
    </AbsoluteFill>
  );
}
