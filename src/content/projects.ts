import type { StaticImageData } from "next/image";
import eventsphere from "@/assets/projects/eventsphere.webp";
import pixelarena from "@/assets/projects/pixelarena.webp";
import transferx from "@/assets/projects/transferx.webp";
import docnow from "@/assets/projects/docnow.webp";
import gradegenie from "@/assets/projects/gradegenie.webp";
import homebudget from "@/assets/projects/homebudget.webp";

export type Project = {
  slug: string;
  title: string;
  /** One line that sells it. */
  tagline: string;
  year: number;
  category: string;
  role: string;
  summary: string;
  /** What was hard / what I'm proud of — shown on the case-study page. */
  highlights: readonly string[];
  stack: readonly string[];
  links: { live?: string; repo?: string };
  /** Screenshot; projects without one get a generated cover. */
  image?: StaticImageData;
  /** Short badge for something exceptional, e.g. store distribution. */
  badge?: string;
  /** Used for per-project accents on the case-study page. */
  accent: string;
};

export const projects = [
  {
    slug: "eventsphere",
    title: "EventSphere",
    tagline:
      "Event booking for planners, venues and vendors, from date holds to signed agreements.",
    year: 2026,
    category: "Platform · Marketplace",
    role: "Full-stack engineering and deployment",
    summary:
      "A booking platform that connects event planners with venues and vendors across Pakistan's major cities. Planners check availability, hold a date while they decide, compare quotes side by side and sign agreements in one place.",
    highlights: [
      "Venue availability calendar with date holds that reserve a slot while the planner decides.",
      "One brief sent to many vendors, with quotes compared side by side.",
      "Signed agreements where both parties sign the same terms, with names and timestamps recorded.",
      "Per-event booking files with checklists, an activity log and issue reporting.",
      "Role-based access for planners, venue owners and vendors, team invitations, two-step sign-in and verified organisations.",
    ],
    stack: ["Next.js", "React", "Railway"],
    links: { live: "https://eventsphereai.up.railway.app" },
    image: eventsphere,
    accent: "#c9a227",
  },
  {
    slug: "pixel-arena",
    title: "Pixel Arena",
    tagline: "Real-time multiplayer games you can join with a code.",
    year: 2025,
    category: "Real-time · Multiplayer",
    role: "Solo — design, frontend, game server",
    summary:
      "A multiplayer game platform where friends create or join rooms with a short code and play instantly, with low-latency state sync across several game modes.",
    highlights: [
      "Custom Node.js + Socket.IO game server that owns player state, room lifecycle and match sync.",
      "Lobby system with unique room codes, so players can join a match without signing up.",
      "Virtual joystick and full-screen layouts so the same game works on phones and desktops.",
      "Live emoji reactions, persistent usernames and dynamic themes for replayability.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "Socket.IO",
      "Tailwind CSS",
      "Framer Motion",
    ],
    links: {
      live: "https://pixelarena.netlify.app",
      repo: "https://github.com/ahad324/pixel-arena",
    },
    image: pixelarena,
    accent: "#ff5b23",
  },
  {
    slug: "transferx",
    title: "TransferX",
    tagline: "Encrypted offline file sharing — shipped on the Microsoft Store.",
    year: 2025,
    category: "Security · Desktop",
    role: "Solo — architecture, networking, desktop UI",
    summary:
      "A zero-configuration file-sharing app for local networks. Devices discover each other automatically and every transfer is end-to-end encrypted with mutual TLS.",
    highlights: [
      "Mutual TLS with certificate pinning and automatic certificate generation.",
      "mDNS discovery, so devices on the same network connect without configuration.",
      "Chunked, compressed streaming for large files with real-time progress.",
      "Native Qt 6 interface with drag-and-drop, dark/light themes and a splash screen.",
      "Packaged and published as a Windows app on the Microsoft Store.",
    ],
    stack: ["Python", "PyQt6", "TLS / mTLS", "mDNS", "Sockets"],
    links: {
      live: "https://transferx.netlify.app",
      repo: "https://github.com/ahad324/TransferXWeb",
    },
    image: transferx,
    badge: "On the Microsoft Store",
    accent: "#7c9cff",
  },
  {
    slug: "docnow",
    title: "DocNow",
    tagline: "Real-time document sharing with drag-and-drop uploads.",
    year: 2024,
    category: "Real-time · Web app",
    role: "Solo — frontend, backend integration",
    summary:
      "A document-sharing app where uploads, downloads and deletions appear instantly for everyone, with an authenticated admin to moderate content.",
    highlights: [
      "Real-time subscriptions update every viewer instantly, without reloading.",
      "Drag-and-drop uploads with live status and bulk download as a zip.",
      "Admin authentication with moderation controls.",
    ],
    stack: ["React", "Vite", "Appwrite", "Tailwind CSS", "Framer Motion"],
    links: { live: "https://docnow.netlify.app", repo: "https://github.com/ahad324/DocNow" },
    image: docnow,
    accent: "#ffc94d",
  },
  {
    slug: "homebudget",
    title: "HomeBudget",
    tagline: "Track income, expenses and budgets in one place.",
    year: 2024,
    category: "Web app · Finance",
    role: "Solo — product, design, frontend",
    summary:
      "A budgeting app to track income and expenses, set budgets and review spending, with a responsive interface and custom themes.",
    highlights: [
      "Dashboard that summarises spending, budgets and trends at a glance.",
      "Add, edit and filter income and expenses with instant recalculation.",
      "Custom themes and smooth, responsive animations.",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    links: {
      live: "https://homebudget-react.netlify.app",
      repo: "https://github.com/ahad324/HomeBudget",
    },
    image: homebudget,
    accent: "#ff7ab6",
  },
  {
    slug: "gradegenie",
    title: "GradeGenie",
    tagline: "GPA, CGPA and SGPA calculators for students.",
    year: 2023,
    category: "Web app · Education",
    role: "Solo — product, design, frontend",
    summary:
      "GPA, CGPA and SGPA calculators with customisable grading inputs and a mobile-first layout.",
    highlights: [
      "Multiple calculators sharing one flexible grading model.",
      "Mobile-first layout and SEO-friendly routes with generated sitemaps.",
    ],
    stack: ["React", "Vite", "React Router", "styled-components"],
    links: {
      live: "https://gradegenie.netlify.app",
      repo: "https://github.com/ahad324/GradeGenie",
    },
    image: gradegenie,
    accent: "#b18cff",
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length]!;
}
