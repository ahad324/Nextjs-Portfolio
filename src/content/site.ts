/**
 * Single source of truth for identity, links and SEO.
 * Everything that mentions "who" or "where" reads from here — the site, the
 * metadata, the OG image, the JSON-LD and the intro video.
 */

const FALLBACK_URL = "https://ahad-devsite.netlify.app";

export const site = {
  name: "Abdul Ahad",
  firstName: "Abdul",
  lastName: "Ahad",
  handle: "ahad324",
  role: "Full-stack engineer",
  company: { name: "Floty.ai", url: "https://floty.ai" },
  pitch:
    "I build secure, real-time web and desktop applications, from backend APIs and databases to the user interface.",
  description:
    "Abdul Ahad is a full-stack engineer at Floty.ai, building real-time, secure web and desktop products with TypeScript, React, Next.js, Node.js, FastAPI and Python.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL).replace(/\/$/, ""),
  locale: "en_US",
  email: "ahadg446@gmail.com",
  location: "Pakistan",
  timezone: "Asia/Karachi",
  availability: {
    open: true,
    label: "Full-stack engineer at Floty.ai",
  },
  resume: {
    href: "/assets/AbdulAhad-Resume.pdf",
    fileName: "Abdul-Ahad-Resume.pdf",
  },
  education: {
    school: "Superior University",
    degree: "BS Computer Science",
    period: "2023 — 2027",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/ahad324", handle: "@ahad324" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdul-ahad-a08263273",
      handle: "in/abdul-ahad",
    },
    {
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/~0184f23bd97d54f1b3",
      handle: "Hire on Upwork",
    },
  ],
  keywords: [
    "Abdul Ahad",
    "full-stack engineer",
    "full-stack developer",
    "Floty.ai",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Node.js",
    "FastAPI",
    "real-time applications",
    "Socket.IO",
    "MERN stack",
    "Pakistan developer",
    "freelance web developer",
  ],
  verification: {
    google: "_t_voY5kuMVEL4CtmBOVDuZ0j6_MRBKwBxG5mDwkK90",
  },
} as const;

export type Social = (typeof site.socials)[number];

/** Brand tokens shared by CSS-less surfaces (OG image, manifest, video). Mirrors globals.css. */
export const brand = {
  ink: "#08090b",
  ink2: "#0f1114",
  bone: "#ecebe6",
  muted: "#8d8c86",
  ember: "#ff5b23",
  ion: "#7c9cff",
  ok: "#3ddc97",
} as const;
