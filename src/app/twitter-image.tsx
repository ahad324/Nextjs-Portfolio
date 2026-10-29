import { site } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOg({
    eyebrow: site.role,
    title: site.name,
    subtitle: `${site.role} at ${site.company.name}. ${site.tagline}`,
    withPortrait: true,
  });
}
