import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Appear } from "../components/Text";
import { colors, ease, fonts } from "../theme";

type Token = [text: string, color?: string];

const K = "#ff8a5c"; // keyword
const S = "#a5d6a7"; // string
const F = "#7c9cff"; // function
const C = "#5b5b57"; // comment

/** A small, realistic real-time handler — typed out character by character. */
const LINES: Token[][] = [
  [["// Broadcast live readings to every subscribed client", C]],
  [["import", K], [" { WebSocketServer } "], ["from", K], [' "ws"', S], [";"]],
  [],
  [
    ["const", K],
    [" wss = "],
    ["new", K],
    [" "],
    ["WebSocketServer", F],
    ["({ port: "],
    ["8080", S],
    [" });"],
  ],
  [],
  [
    ["wss.", undefined],
    ["on", F],
    ["("],
    ['"connection"', S],
    [", (socket, req) "],
    ["=>", K],
    [" {"],
  ],
  [["  "], ["const", K], [" user = "], ["authenticate", F], ["(req);"]],
  [
    ["  "],
    ["if", K],
    [" (!user) "],
    ["return", K],
    [" socket."],
    ["close", F],
    ["("],
    ["4401", S],
    [");"],
  ],
  [],
  [["  "], ["subscribe", F], ["(user.devices, (reading) "], ["=>", K], [" {"]],
  [["    socket."], ["send", F], ["(JSON."], ["stringify", F], ["(reading));"]],
  [["  });"]],
  [["});"]],
];

const CHARS_PER_FRAME = 2.4;

const LINE_LENGTHS = LINES.map((line) => line.reduce((n, [text]) => n + text.length, 0));

/** How many characters of each line are typed, and which line holds the cursor. */
function typingState(typed: number) {
  const visibleByLine: number[] = [];
  let remaining = typed;
  let cursorLine = LINES.length - 1;
  LINE_LENGTHS.forEach((length, index) => {
    visibleByLine.push(Math.max(0, Math.min(length, remaining)));
    if (cursorLine === LINES.length - 1 && remaining <= length && remaining >= 0)
      cursorLine = index;
    remaining -= length + 1;
  });
  return { visibleByLine, cursorLine };
}

export function CodeScene() {
  const frame = useCurrentFrame();
  const typed = Math.max(0, (frame - 10) * CHARS_PER_FRAME);
  const enter = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
    easing: ease.outExpo,
  });
  const exit = interpolate(frame, [196, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.inExpo,
  });
  const push = interpolate(frame, [0, 210], [1, 1.06]);

  const { visibleByLine, cursorLine } = typingState(typed);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: enter * (1 - exit),
        transform: `scale(${push * (0.94 + enter * 0.06)}) translateY(${exit * -40}px)`,
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
          <span style={{ color: colors.ember }}>01</span> — Write it
        </div>
      </Appear>
      <div
        style={{
          width: 1280,
          borderRadius: 24,
          border: `1.5px solid ${colors.bone}22`,
          background: `${colors.ink2}f0`,
          boxShadow: `0 60px 140px -40px #000, 0 0 140px -60px ${colors.ember}66`,
          overflow: "hidden",
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
          <span
            style={{ marginLeft: 16, fontFamily: fonts.mono, fontSize: 19, color: colors.muted }}
          >
            realtime/server.ts
          </span>
        </div>
        <div
          style={{ padding: "34px 40px", fontFamily: fonts.mono, fontSize: 27, lineHeight: 1.62 }}
        >
          {LINES.map((line, li) => {
            const showCursor = li === cursorLine;
            let budget = visibleByLine[li] ?? 0;
            return (
              <div key={li} style={{ display: "flex", minHeight: "1.62em", whiteSpace: "pre" }}>
                <span style={{ width: 56, color: `${colors.bone}33` }}>{li + 1}</span>
                {line.map(([text, color], ti) => {
                  const shown = text.slice(0, Math.max(0, budget));
                  budget -= text.length;
                  return (
                    <span key={ti} style={{ color: color ?? colors.bone }}>
                      {shown}
                    </span>
                  );
                })}
                {showCursor && (
                  <span
                    style={{
                      width: 14,
                      height: "1.15em",
                      marginTop: "0.2em",
                      background: colors.ember,
                      opacity: Math.floor(frame / 8) % 2 ? 1 : 0.25,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}
