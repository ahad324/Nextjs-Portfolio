import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ease } from "../theme";

/** Characters (or words) rising out of a mask, staggered. */
export function Rise({
  text,
  delay = 0,
  stagger = 1.6,
  by = "chars",
  style,
  duration = 26,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  by?: "chars" | "words";
  style?: CSSProperties;
  duration?: number;
}) {
  const frame = useCurrentFrame();
  const parts = by === "chars" ? text.split("") : text.split(" ");
  return (
    <span style={{ display: "inline-flex", overflow: "hidden", paddingBottom: "0.08em", ...style }}>
      {parts.map((part, index) => {
        const progress = interpolate(frame - delay - index * stagger, [0, duration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease.outExpo,
        });
        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              transform: `translateY(${(1 - progress) * 115}%) rotate(${(1 - progress) * 4}deg)`,
            }}
          >
            {part}
            {by === "words" && index < parts.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

/** Fades + lifts its children in at `delay`, and out at `exitAt` (relative frames). */
export function Appear({
  children,
  delay = 0,
  exitAt,
  y = 30,
  style,
}: {
  children: ReactNode;
  delay?: number;
  exitAt?: number;
  y?: number;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const enter = interpolate(frame - delay, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.outExpo,
  });
  const exit =
    exitAt === undefined
      ? 0
      : interpolate(frame - exitAt, [0, 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease.inExpo,
        });
  return (
    <div style={{ opacity: enter * (1 - exit), transform: `translateY(${(1 - enter) * y - exit * 20}px)`, ...style }}>
      {children}
    </div>
  );
}
