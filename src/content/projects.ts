import type { StaticImageData } from "next/image";
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
      "Lobby system with unique room codes — no accounts, no friction, straight into a match.",
      "Virtual joystick and full-screen layouts so the same game works on phones and desktops.",
      "Live emoji reactions, persistent usernames and dynamic themes for replayability.",
    ],
    stack: ["React", "TypeScript", "Vite", "Node.js", "Express", "Socket.IO", "Tailwind CSS", "Framer Motion"],
    links: { live: "https://pixelarena.netlify.app", repo: "https://github.com/ahad324/pixel-arena" },
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
      "Mutual TLS with certificate pinning and automatic certificate generation — encrypted by default.",
      "mDNS discovery: devices on the same network find each other with zero setup.",
      "Chunked, compressed streaming for large files with real-time progress.",
      "Native Qt 6 interface with drag-and-drop, dark/light themes and a splash screen.",
      "Packaged and published as a Windows app on the Microsoft Store.",
    ],
    stack: ["Python", "PyQt6", "TLS / mTLS", "mDNS", "Sockets"],
    links: { live: "https://transferx.netlify.app", repo: "https://github.com/ahad324/TransferXWeb" },
    image: transferx,
    badge: "On the Microsoft Store",
    accent: "#7c9cff",
  },
  {
    slug: "aut-bank",
    title: "AUT Bank",
    tagline: "A banking backend with real-time money movement.",
    year: 2025,
    category: "Backend · FinTech",
    role: "Solo — API design, backend, admin dashboard",
    summary:
      "A full banking API — accounts, transfers, loans and cards — with role-based access, caching and live notifications, plus a Next.js admin dashboard on top.",
    highlights: [
      "FastAPI services with JWT auth, role-based access control and rate limiting.",
      "Deposits, withdrawals, transfers and history with filtering, pagination and CSV export.",
      "WebSocket notifications and live analytics for the admin dashboard.",
      "Redis caching and auto-generated OpenAPI docs; SQLAlchemy over SQL Server with a clean modular layout.",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "SQL Server", "Redis", "WebSockets", "Next.js", "TypeScript"],
    links: { live: "https://aut-bank-web.vercel.app", repo: "https://github.com/ahad324/AUT-Bank" },
    accent: "#3ddc97",
  },
  {
    slug: "docnow",
    title: "DocNow",
    tagline: "Drag, drop, done — documents that update live.",
    year: 2024,
    category: "Real-time · Web app",
    role: "Solo — frontend, backend integration",
    summary:
      "A document-sharing app where uploads, downloads and deletions appear instantly for everyone, with an authenticated admin to moderate content.",
    highlights: [
      "Realtime subscriptions — files appear and disappear for every viewer without a reload.",
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
    tagline: "Personal finance without the spreadsheet.",
    year: 2024,
    category: "Web app · Finance",
    role: "Solo — product, design, frontend",
    summary:
      "A budgeting app to track income and expenses, set budgets and see where the money goes — fast, themeable and pleasant on any screen.",
    highlights: [
      "Dashboard that summarises spending, budgets and trends at a glance.",
      "Add, edit and filter income and expenses with instant recalculation.",
      "Custom themes and motion that keep a dry task feeling light.",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    links: { live: "https://homebudget-react.netlify.app", repo: "https://github.com/ahad324/HomeBudget" },
    image: homebudget,
    accent: "#ff7ab6",
  },
  {
    slug: "gradegenie",
    title: "GradeGenie",
    tagline: "Every GPA calculation a student needs, in one place.",
    year: 2023,
    category: "Web app · Education",
    role: "Solo — product, design, frontend",
    summary:
      "GPA, CGPA and SGPA calculators with customisable grading inputs, built to be quick on a phone in the middle of results week.",
    highlights: [
      "Multiple calculators sharing one flexible grading model.",
      "Mobile-first layout and SEO-friendly routes with generated sitemaps.",
    ],
    stack: ["React", "Vite", "React Router", "styled-components"],
    links: { live: "https://gradegenie.netlify.app", repo: "https://github.com/ahad324/GradeGenie" },
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
