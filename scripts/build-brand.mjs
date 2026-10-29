/**
 * Builds the brand kit in /brand: logo SVGs (text converted to outlines, so
 * they render identically everywhere) and PNG exports, plus the site favicon.
 *
 *   node scripts/build-brand.mjs
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "brand");
const svgDir = path.join(out, "svg");
const pngDir = path.join(out, "png");

// Brand tokens — mirror src/content/site.ts
const C = {
  ink: "#08090b",
  bone: "#ecebe6",
  muted: "#8d8c86",
  ember: "#ff5b23",
  white: "#ffffff",
  black: "#000000",
};

const font = opentype.parse(
  (await readFile(path.join(root, "assets/fonts/Geist-SemiBold.ttf"))).buffer,
);

// ── Geometry ───────────────────────────────────────────────────────────
// The mark lives on a 32×32 grid: an open "A" (two strokes meeting at a
// peak) whose crossbar is a single particle.
const MARK_PATH = "M6.5 26.5 16 5.5l9.5 21";
const STROKE = 3;
const DOT = { cx: 16, cy: 19, r: 2.6 };

function markGroup({ stroke, dot, x = 0, y = 0, scale = 1 }) {
  return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="${MARK_PATH}" fill="none" stroke="${stroke}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${DOT.cx}" cy="${DOT.cy}" r="${DOT.r}" fill="${dot}"/></g>`;
}

/**
 * Outline a glyph at the origin, then translate it ourselves. (opentype.js can
 * emit NaN for some glyphs at certain offsets; at the origin it is stable.)
 */
function placeGlyph(glyph, size, dx, dy) {
  const f = (n) => Number(n.toFixed(2));
  return glyph
    .getPath(0, 0, size)
    .commands.map((c) => {
      switch (c.type) {
        case "M":
        case "L":
          return `${c.type}${f(c.x + dx)} ${f(c.y + dy)}`;
        case "Q":
          return `Q${f(c.x1 + dx)} ${f(c.y1 + dy)} ${f(c.x + dx)} ${f(c.y + dy)}`;
        case "C":
          return `C${f(c.x1 + dx)} ${f(c.y1 + dy)} ${f(c.x2 + dx)} ${f(c.y2 + dy)} ${f(c.x + dx)} ${f(c.y + dy)}`;
        default:
          return "Z";
      }
    })
    .join("");
}

/** Lays out text as outlined paths with tracking; returns path data + bounds. */
function textPath(text, size, x, baseline, tracking = -0.03) {
  const glyphs = font.stringToGlyphs(text);
  const scale = size / font.unitsPerEm;
  let cursor = x;
  let d = "";
  glyphs.forEach((glyph, i) => {
    d += placeGlyph(glyph, size, cursor, baseline);
    const next = glyphs[i + 1];
    const kern = (next && font.getKerningValue(glyph, next)) || 0;
    cursor += (glyph.advanceWidth + kern) * scale + tracking * size;
  });
  return { d, width: cursor - x - tracking * size };
}

const svg = (w, h, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""}${body}</svg>\n`;

/** Horizontal lockup: mark + "Abdul Ahad" + ember full stop, sized as in the site header. */
function wordmark({ ink, dot, bg }) {
  const markSize = 36;
  const fontSize = 19;
  const gap = 12;
  const capHeight = (font.tables.os2?.sCapHeight ?? 700) / font.unitsPerEm;
  const baseline = markSize / 2 + (capHeight * fontSize) / 2;
  const name = textPath("Abdul Ahad", fontSize, markSize + gap, baseline);
  const stop = textPath(".", fontSize, markSize + gap + name.width + -0.03 * fontSize, baseline);
  const width = Math.ceil(markSize + gap + name.width + stop.width + 1);
  const pad = 0;
  const body =
    markGroup({ stroke: ink, dot, scale: markSize / 32 }) +
    `<path d="${name.d}" fill="${ink}"/><path d="${stop.d}" fill="${dot}"/>`;
  return svg(width + pad * 2, markSize, body, bg);
}

const markSvg = ({ stroke, dot, bg }) => svg(32, 32, markGroup({ stroke, dot }), bg);

/** Rounded-square app icon. */
const appIcon = ({ bg = C.ink, stroke = C.bone, dot = C.ember } = {}) =>
  svg(
    32,
    32,
    `<rect width="32" height="32" rx="7.5" fill="${bg}"/>` +
      markGroup({ stroke, dot, x: 3.2, y: 3.6, scale: 0.8 }),
  );

/** Square profile picture (circle-crop safe). */
const avatar = () =>
  svg(32, 32, markGroup({ stroke: C.bone, dot: C.ember, x: 7.2, y: 7.4, scale: 0.55 }), C.ink);

/** 4:1 banner (LinkedIn/X header) — wordmark + role, right-aligned so profile photos never cover it. */
function banner() {
  const W = 1584;
  const H = 396;
  const dots = `<defs><pattern id="d" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.2" fill="${C.bone}" fill-opacity="0.13"/></pattern><radialGradient id="g" cx="0.12" cy="0.1" r="0.6"><stop offset="0" stop-color="${C.ember}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.ember}" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#d)"/><rect width="${W}" height="${H}" fill="url(#g)"/>`;
  const markSize = 120;
  const y0 = (H - markSize) / 2 - 22;
  const fontSize = 76;
  const capHeight = (font.tables.os2?.sCapHeight ?? 700) / font.unitsPerEm;
  const measure = textPath("Abdul Ahad.", fontSize, 0, 0);
  const x0 = W - 120 - (markSize + 40 + measure.width);
  const baseline = y0 + markSize / 2 + (capHeight * fontSize) / 2;
  const name = textPath("Abdul Ahad", fontSize, x0 + markSize + 40, baseline);
  const stop = textPath(".", fontSize, x0 + markSize + 40 + name.width - 0.03 * fontSize, baseline);
  const role = textPath(
    "Full-stack engineer · Floty.ai",
    30,
    x0 + markSize + 44,
    baseline + 62,
    -0.01,
  );
  const body =
    dots +
    markGroup({ stroke: C.bone, dot: C.ember, x: x0, y: y0, scale: markSize / 32 }) +
    `<path d="${name.d}" fill="${C.bone}"/><path d="${stop.d}" fill="${C.ember}"/><path d="${role.d}" fill="${C.muted}"/>`;
  return svg(W, H, body, C.ink);
}

// ── Variants ───────────────────────────────────────────────────────────
const variants = {
  "logo-mark": markSvg({ stroke: C.bone, dot: C.ember }),
  "logo-mark-on-light": markSvg({ stroke: C.ink, dot: C.ember }),
  "logo-mark-mono-white": markSvg({ stroke: C.white, dot: C.white }),
  "logo-mark-mono-black": markSvg({ stroke: C.black, dot: C.black }),
  "logo-wordmark": wordmark({ ink: C.bone, dot: C.ember }),
  "logo-wordmark-on-light": wordmark({ ink: C.ink, dot: C.ember }),
  "logo-wordmark-mono-white": wordmark({ ink: C.white, dot: C.white }),
  "logo-wordmark-mono-black": wordmark({ ink: C.black, dot: C.black }),
  "app-icon": appIcon(),
  "app-icon-light": appIcon({ bg: C.bone, stroke: C.ink }),
  avatar: avatar(),
  banner: banner(),
};

// PNG exports: [variant, output name, width]
const exports = [
  ["logo-mark", "logo-mark-512.png", 512],
  ["logo-mark", "logo-mark-1024.png", 1024],
  ["logo-mark-on-light", "logo-mark-on-light-1024.png", 1024],
  ["logo-mark-mono-white", "logo-mark-mono-white-1024.png", 1024],
  ["logo-mark-mono-black", "logo-mark-mono-black-1024.png", 1024],
  ["logo-wordmark", "logo-wordmark-1200.png", 1200],
  ["logo-wordmark", "logo-wordmark-2400.png", 2400],
  ["logo-wordmark-on-light", "logo-wordmark-on-light-2400.png", 2400],
  ["logo-wordmark-mono-white", "logo-wordmark-mono-white-2400.png", 2400],
  ["logo-wordmark-mono-black", "logo-wordmark-mono-black-2400.png", 2400],
  ["app-icon", "app-icon-180.png", 180],
  ["app-icon", "app-icon-512.png", 512],
  ["app-icon", "app-icon-1024.png", 1024],
  ["app-icon-light", "app-icon-light-1024.png", 1024],
  ["avatar", "avatar-800.png", 800],
  ["banner", "banner-1584x396.png", 1584],
];

async function png(svgText, width) {
  const viewWidth = Number(/viewBox="0 0 ([\d.]+)/.exec(svgText)[1]);
  return sharp(Buffer.from(svgText), { density: Math.min(2400, (72 * width) / viewWidth) })
    .resize({ width })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Minimal ICO writer (PNG-compressed entries, supported by every modern browser). */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2);
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

await rm(out, { recursive: true, force: true });
await mkdir(svgDir, { recursive: true });
await mkdir(pngDir, { recursive: true });

for (const [name, text] of Object.entries(variants)) {
  await writeFile(path.join(svgDir, `${name}.svg`), text);
}
for (const [variant, file, width] of exports) {
  await writeFile(path.join(pngDir, file), await png(variants[variant], width));
}

// Site favicon (multi-size .ico for legacy agents; icon.svg covers modern ones).
const favicon = ico(
  await Promise.all(
    [16, 32, 48].map(async (size) => ({ size, data: await png(variants["app-icon"], size) })),
  ),
);
await writeFile(path.join(root, "src/app/favicon.ico"), favicon);

console.log(
  `brand kit → brand/ (${Object.keys(variants).length} SVGs, ${exports.length} PNGs) + src/app/favicon.ico`,
);
