import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
        lg: "4rem",
      },
    },
    extend: {
      colors: {
        swiss: {
          bg: "#FFFFFF",
          fg: "#000000",
          accent: "#FF3000",
          muted: "#F2F2F2",
          border: "#000000",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        none: "0px",
      },
      borderWidth: {
        '4': '4px',
      },
      animation: {
        "move-left": "move-left 40s linear infinite",
        "move-right": "move-right 40s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "snap-color": "snap-color 0.2s ease-out forwards",
      },
      keyframes: {
        "move-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "move-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "snap-color": {
          "0%": { backgroundColor: "transparent" },
          "100%": { backgroundColor: "#FF3000" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

