/**
 * Renders the intro film into /public/media, ready for the site.
 *
 *   npm run video:render
 *
 * Produces: intro.webm (VP9), intro.mp4 (H.264 fallback), intro-poster.jpg, intro.vtt
 */
import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { webpackOverride } from "../video/webpack-override.ts";

const root = path.resolve(import.meta.dirname, "..");
const media = (file) => path.join(root, "public/media", file);
const only = process.argv[2]; // optional: "mp4" | "webm" | "poster"

execFileSync(process.execPath, [path.join(root, "scripts/make-score.mjs")], { stdio: "inherit" });

console.log("bundling…");
const serveUrl = await bundle({ entryPoint: path.join(root, "video/index.ts"), webpackOverride });
const composition = await selectComposition({ serveUrl, id: "Intro" });

const progress =
  (label) =>
  ({ progress }) => {
    process.stdout.write(`\r${label} ${Math.round(progress * 100)}%   `);
  };

if (!only || only === "poster") {
  await renderStill({
    serveUrl,
    composition,
    frame: 230,
    output: media("intro-poster.jpg"),
    imageFormat: "jpeg",
    jpegQuality: 86,
  });
  console.log("poster ✓");
}
if (!only || only === "mp4") {
  await renderMedia({
    serveUrl,
    composition,
    codec: "h264",
    crf: 23,
    audioCodec: "aac",
    audioBitrate: "160k",
    pixelFormat: "yuv420p",
    x264Preset: "slow",
    outputLocation: media("intro.mp4"),
    onProgress: progress("mp4"),
  });
  console.log("\nmp4 ✓");
}
if (!only || only === "webm") {
  await renderMedia({
    serveUrl,
    composition,
    codec: "vp9",
    crf: 34,
    audioCodec: "opus",
    outputLocation: media("intro.webm"),
    onProgress: progress("webm"),
  });
  console.log("\nwebm ✓");
}

// Captions: the film has no speech, so these describe the music and on-screen story.
const vtt = `WEBVTT

00:00.000 --> 00:03.000
[Ambient electronic music] Abdul Ahad

00:03.000 --> 00:09.000
Abdul Ahad — full-stack engineer at Floty.ai.

00:09.000 --> 00:14.000
From the socket to the screen.

00:14.000 --> 00:30.000
Selected work: Pixel Arena, TransferX, AUT Bank, DocNow, HomeBudget, GradeGenie.

00:30.000 --> 00:35.000
The stack — every layer, end to end.

00:35.000 --> 00:40.000
Let's build something real.
`;
await writeFile(media("intro.vtt"), vtt);
console.log("captions ✓");
