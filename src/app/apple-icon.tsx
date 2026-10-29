import { ImageResponse } from "next/og";
import { brand } from "@/content/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: brand.ink }}>
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path d="M6.5 26.5 16 5.5l9.5 21" fill="none" stroke={brand.bone} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="19" r="2.5" fill={brand.ember} />
        </svg>
      </div>
    ),
    size,
  );
}
