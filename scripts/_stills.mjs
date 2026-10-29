import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { webpackOverride } from "../video/webpack-override.ts";
const root = path.resolve(import.meta.dirname, "..");
const serveUrl = await bundle({ entryPoint: path.join(root, "video/index.ts"), webpackOverride });
const composition = await selectComposition({ serveUrl, id: "Intro" });
for (const frame of [50, 235, 330, 470, 640, 980, 1130]) {
  await renderStill({ serveUrl, composition, frame, output: "C:/Users/mhuss/AppData/Local/Temp/claude/d--Nextjs-Portfolio/9f80e3a9-a70e-45d7-a62a-91d4acbedb50/scratchpad/shots/v-" + frame + ".jpg", imageFormat: "jpeg", scale: 0.5 });
  console.log("frame", frame);
}
