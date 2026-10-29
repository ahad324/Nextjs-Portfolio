import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { brand, site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

let portrait: Promise<string> | null = null;
function portraitDataUrl() {
  portrait ??= readFile(path.join(process.cwd(), "src/assets/og-portrait.png")).then(
    (buffer) => `data:image/png;base64,${buffer.toString("base64")}`,
  );
  return portrait;
}

/** Branded share card. Used by the home page and every case study. */
export async function renderOg({
  eyebrow,
  title,
  subtitle,
  accent = brand.ember,
  withPortrait = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  accent?: string;
  withPortrait?: boolean;
}) {
  const photo = withPortrait ? await portraitDataUrl() : null;
  const host = new URL(site.url).host;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: brand.ink,
        color: brand.bone,
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      {/* dotted particle field */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage: `radial-gradient(${brand.bone}22 1.2px, transparent 1.2px)`,
          backgroundSize: "22px 22px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -160,
          top: -160,
          width: 620,
          height: 620,
          display: "flex",
          borderRadius: 9999,
          background: `radial-gradient(circle, ${accent}55, transparent 65%)`,
        }}
      />
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt=""
          width={460}
          height={460}
          style={{ position: "absolute", right: 30, bottom: -20, objectFit: "contain" }}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="52" height="52" viewBox="0 0 32 32">
            <path
              d="M6.5 26.5 16 5.5l9.5 21"
              fill="none"
              stroke={brand.bone}
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="19" r="2.6" fill={accent} />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: brand.muted,
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: withPortrait ? 680 : 1000 }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 0.95,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              lineHeight: 1.3,
              color: brand.muted,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            color: brand.bone,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: accent,
              display: "flex",
            }}
          />
          {host}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
