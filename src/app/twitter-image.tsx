import { site } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOg({
    eyebrow: site.role,
    title: site.name,
    subtitle: site.tagline + " Real-time, secure products — built end to end.",
    withPortrait: true,
  });
}
