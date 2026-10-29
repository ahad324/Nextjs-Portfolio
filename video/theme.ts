import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";
import { loadFont as loadInstrument } from "@remotion/google-fonts/InstrumentSerif";
import { Easing } from "remotion";
import { brand } from "@/content/site";

const geist = loadGeist("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });
const mono = loadGeistMono("normal", { weights: ["400"], subsets: ["latin"] });
const serif = loadInstrument("italic", { weights: ["400"], subsets: ["latin"] });

export const fonts = {
  sans: geist.fontFamily,
  mono: mono.fontFamily,
  serif: serif.fontFamily,
};

export const colors = brand;

export const ease = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  inOutQuart: Easing.bezier(0.76, 0, 0.24, 1),
  inExpo: Easing.bezier(0.7, 0, 0.84, 0),
};
