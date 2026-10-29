// Static image imports (`import img from "./x.webp"`) → StaticImageData.
// Next also generates this via next-env.d.ts, but that file is gitignored and
// only exists after `next dev`/`build`/`typegen`; declaring it here keeps a
// fresh checkout (and the Remotion project) type-safe on its own.
/// <reference types="next/image-types/global" />
