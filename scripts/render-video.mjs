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
 *      intro.mp4   H.264 720p, two-pass ≈1.8 Mbps, faststart (plays everywhere)
 *    (AV1/VP9 were tested: far slower to encode and no smaller for particle footage.)
 * 4. Poster frame + captions
 */
import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { webpackOverride } from "../video/webpack-override.ts";
import { skillCount } from "../src/content/skills.ts";

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

  await renderStill({
    serveUrl,
    composition,
    frame: 230,
    output: media("intro-poster.jpg"),
    scale: 0.75,
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

const h264Args = [
  "-vf",
  "scale=1280:-2:flags=lanczos",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-b:v",
  "1800k",
];

if (!skipEncode) {
  console.log("encoding H.264…");
  const log = ["-passlogfile", path.join(out, "x264")];
  run([...h264Args, "-pass", "1", ...log, "-an", "-f", "null", nullOut]);
  run([
    ...h264Args,
    ...["-maxrate", "2600k", "-bufsize", "4000k", "-pass", "2", ...log],
    ...["-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart"],
    ...["-c:a", "aac", "-b:a", "128k", media("intro.mp4")],
  ]);
  for (const file of ["x264-0.log", "x264-0.log.mbtree"]) {
    await rm(path.join(out, file), { force: true });
  }
}

// Captions: the film has no speech, so these describe the music and on-screen story.
await writeFile(
  media("intro.vtt"),
  `WEBVTT

00:00.000 --> 00:03.000
[Ambient electronic music] Abdul Ahad

00:03.000 --> 00:09.000
Abdul Ahad — full-stack engineer at Floty.ai.

00:09.000 --> 00:14.000
From the socket to the screen.

00:14.000 --> 00:30.000
Real-time by default. Secure from the first commit. Interfaces that feel instant. One engineer, every layer.

00:30.000 --> 00:35.000
${skillCount} tools across the stack.

00:35.000 --> 00:40.000
Let's work together.
`,
);
console.log("captions ✓ — done");
