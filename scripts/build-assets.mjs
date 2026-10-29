/**
 * Asset pipeline: turns the originals in /assets/source into web-ready files.
 *
 *   npm run assets
 *
 * - Project screenshots  → src/assets/projects/<slug>.webp (1600w, imported by next/image)
 * - Portrait photo       → src/assets/portrait.webp        (cut-out, used in About + OG image)
 * - OG portrait         → src/assets/og-portrait.png      (read at build time by next/og)
 * - Portrait depth map   → public/media/portrait-map.png   (tiny grayscale+alpha map the
 *                                                          particle system samples at runtime)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = (f) => path.join(root, "assets/source", f);

const projects = ["pixelarena", "transferx", "docnow", "gradegenie", "homebudget"];

// Head-and-shoulders crop of the 1024² cut-out photo.
const PORTRAIT_CROP = { left: 205, top: 0, width: 660, height: 610 };
const MAP_SIZE = 192;
const MAP_HEIGHT = Math.round((MAP_SIZE * PORTRAIT_CROP.height) / PORTRAIT_CROP.width);

async function run() {
  await mkdir(path.join(root, "src/assets/projects"), { recursive: true });
  await mkdir(path.join(root, "public/media"), { recursive: true });

  for (const slug of projects) {
    const out = path.join(root, "src/assets/projects", `${slug}.webp`);
    const info = await sharp(src(`${slug}.png`))
      .resize({ width: 1600, withoutEnlargement: true })
      .flatten({ background: "#0b0c0e" })
      .webp({ quality: 82, effort: 6 })
      .toFile(out);
    console.log(`project  ${slug}.webp  ${info.width}×${info.height}  ${kb(info.size)}`);
  }

  const portrait = await sharp(src("profile.png"))
    .resize({ width: 900 })
    .webp({ quality: 84, alphaQuality: 90, effort: 6 })
    .toFile(path.join(root, "src/assets/portrait.webp"));
  console.log(`portrait portrait.webp  ${kb(portrait.size)}`);

  // Cut-out for the generated Open Graph images (PNG — Satori doesn't read WebP).
  const og = await sharp(src("profile.png"))
    .resize({ width: 640 })
    .png({ palette: true, quality: 92, effort: 10 })
    .toFile(path.join(root, "src/assets/og-portrait.png"));
  console.log(`og       og-portrait.png  ${kb(og.size)}`);

  // Depth map: luminance in the gray channel, the cut-out mask in alpha.
  const map = await sharp(src("profile.png"))
    .extract(PORTRAIT_CROP)
    // sharp always resizes before extending, so the headroom is added in output pixels.
    .resize(MAP_SIZE, MAP_HEIGHT, { kernel: "lanczos3" })
    .extend({ top: MAP_SIZE - MAP_HEIGHT, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .normalise({ lower: 2, upper: 99 })
    .grayscale()
    .png({ compressionLevel: 9, palette: false })
    .toFile(path.join(root, "public/media/portrait-map.png"));
  console.log(`map      portrait-map.png  ${MAP_SIZE}²  ${kb(map.size)}`);
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
