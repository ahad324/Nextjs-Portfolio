/**
 * Renders the intro film and encodes web-ready versions into /public/media.
 *
 *   npm run video:render                  render + encode everything
 *   node scripts/render-video.mjs --render-only
 *   node scripts/render-video.mjs --encode-only
 *
 * 1. Synthesises the soundtrack (scripts/make-score.mjs)
 * 2. Renders a high-quality 1080p master  → video/out/intro-master.mp4 (gitignored)
 * 3. Encodes the web version with Remotion's bundled ffmpeg:
 *      intro.mp4      H.264 720p, two-pass ≈1.8 Mbps (desktop)
 *      intro-540.mp4  H.264 540p, two-pass ≈0.7 Mbps (phones)
 *    (AV1/VP9 were tested: far slower to encode and no smaller for particle footage.)
 * 4. Poster frame + captions
 */
import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { captionsVtt } from "../src/content/film.ts";
import { webpackOverride } from "../video/webpack-override.ts";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "video/out");
const media = (file) => path.join(root, "public/media", file);
const master = path.join(out, "intro-master.mp4");
const skipRender = process.argv.includes("--encode-only");
const skipEncode = process.argv.includes("--render-only");

await mkdir(out, { recursive: true });

if (!skipRender) {
  execFileSync(process.execPath, [path.join(root, "scripts/make-score.mjs")], { stdio: "inherit" });

  console.log("bundling…");
  const serveUrl = await bundle({ entryPoint: path.join(root, "video/index.ts"), webpackOverride });
  const composition = await selectComposition({ serveUrl, id: "Intro" });

  // Thumbnail: a dedicated still composition (video/Poster.tsx), 1280×720.
  const poster = await selectComposition({ serveUrl, id: "Poster" });
  await renderStill({
    serveUrl,
    composition: poster,
    frame: 0,
    output: media("intro-poster.jpg"),
    scale: 1280 / 1920,
    imageFormat: "jpeg",
    jpegQuality: 80,
  });
  console.log("poster ✓");

  await renderMedia({
    serveUrl,
    composition,
    codec: "h264",
    crf: 18,
    audioCodec: "aac",
    audioBitrate: "192k",
    pixelFormat: "yuv420p",
    outputLocation: master,
    onProgress: ({ progress }) =>
      process.stdout.write(`\rmaster ${Math.round(progress * 100)}%   `),
  });
  console.log("\nmaster ✓");
}

// Remotion ships a platform-specific ffmpeg build; find it next to the compositor.
const require = createRequire(import.meta.url);
const compositor = `@remotion/compositor-${process.platform}-${process.arch}${process.platform === "win32" ? "-msvc" : process.platform === "linux" ? "-gnu" : ""}`;
const ffmpeg = path.join(
  path.dirname(require.resolve(`${compositor}/package.json`)),
  process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
);
const nullOut = process.platform === "win32" ? "NUL" : "/dev/null";
const run = (args) =>
  execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", "-i", master, ...args], {
    stdio: "inherit",
  });

/** Two-pass H.264 at a target width and bitrate, web-optimised (faststart). */
async function encode({ width, kbps, maxKbps, audioKbps, file }) {
  const args = [
    "-vf",
    `scale=${width}:-2:flags=lanczos`,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-b:v",
    `${kbps}k`,
  ];
  const log = ["-passlogfile", path.join(out, "x264")];
  run([...args, "-pass", "1", ...log, "-an", "-f", "null", nullOut]);
  run([
    ...args,
    ...["-maxrate", `${maxKbps}k`, "-bufsize", `${maxKbps * 1.6}k`, "-pass", "2", ...log],
    ...["-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart"],
    ...["-c:a", "aac", "-b:a", `${audioKbps}k`, media(file)],
  ]);
  for (const name of ["x264-0.log", "x264-0.log.mbtree"]) {
    await rm(path.join(out, name), { force: true });
  }
}

if (!skipEncode) {
  console.log("encoding 720p…");
  await encode({ width: 1280, kbps: 1800, maxKbps: 2600, audioKbps: 128, file: "intro.mp4" });
  console.log("encoding 540p (phones)…");
  await encode({ width: 960, kbps: 700, maxKbps: 1100, audioKbps: 96, file: "intro-540.mp4" });
}

// Captions: generated from the transcript in src/content/film.ts.
await writeFile(media("intro.vtt"), captionsVtt());
console.log("captions ✓ — done");
