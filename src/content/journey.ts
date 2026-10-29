export type Milestone = {
  period: string;
  title: string;
  place?: string;
  body: string;
};

/** The story, oldest first. */
export const journey: readonly Milestone[] = [
  {
    period: "2023",
    title: "Started building for the web",
    body: "Published 20+ HTML, CSS and JavaScript projects on GitHub while learning web development.",
  },
  {
    period: "2023 — 2027",
    title: "BS Computer Science",
    place: "Superior University",
    body: "Coursework in data structures, computer networks, databases and software engineering.",
  },
  {
    period: "2024",
    title: "Full-stack projects",
    body: "Built real-time apps with Appwrite, a C++ and Node.js banking system, and React apps including DocNow and HomeBudget.",
  },
  {
    period: "2025",
    title: "Backend and security work",
    body: "Built a FastAPI banking backend, a Socket.IO multiplayer game server, and TransferX, an mTLS file-sharing app published on the Microsoft Store.",
  },
  {
    period: "Jul — Sep 2025",
    title: "Full Stack (MERN) Intern",
    place: "Innovent Tech",
    body: "Developed and maintained web application features, debugged and tested releases, and improved interface usability.",
  },
  {
    period: "Feb 2026 — Now",
    title: "Full-stack Engineer",
    place: "Floty.ai",
    body: "Building product features end to end — APIs, real-time functionality and user interfaces.",
  },
];
