import { site } from "./site";

export const manifesto =
  "I'm a full-stack engineer at Floty.ai, where I build product features end to end and own their deployment. My work spans real-time systems, secure APIs, web and desktop applications and IoT integrations, from the database to the interface to production.";

const yearsCoding = Math.floor(
  (Date.now() - site.startedCoding.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
);

/**
 * Headline facts. Numbers are kept deliberately general ("60+") so they stay
 * true as work grows; `text` stats render as-is instead of counting up.
 */
export type Stat =
  | { kind: "number"; value: number; suffix: string; label: string }
  | { kind: "text"; text: string; label: string };

export const stats: readonly Stat[] = [
  { kind: "number", value: yearsCoding, suffix: "+", label: "Years writing software" },
  { kind: "number", value: 60, suffix: "+", label: "Repositories on GitHub" },
  { kind: "text", text: "Web · Desktop · IoT", label: "Platforms I build for" },
  { kind: "text", text: "Full-time & freelance", label: "How I work" },
];

export const hobbies = [
  { label: "Cricket", emoji: "🏏" },
  { label: "Football", emoji: "⚽" },
  { label: "Hiking", emoji: "🥾" },
  { label: "Gaming", emoji: "🎮" },
  { label: "Fitness", emoji: "🏋️" },
  { label: "Reading", emoji: "📚" },
] as const;

export const services = [
  {
    title: "Full-stack products",
    body: "Database design, secure APIs in Node.js and FastAPI, and the web or desktop interface on top.",
  },
  {
    title: "Real-time systems",
    body: "Live dashboards, multiplayer, chat and notifications over WebSockets and Socket.IO.",
  },
  {
    title: "Deployment & infrastructure",
    body: "Containerised services, CI/CD pipelines and production hosting with Docker, Nginx and cloud platforms.",
  },
  {
    title: "IoT integrations",
    body: "Connecting devices and sensors to backend services, data storage and live dashboards.",
  },
] as const;
