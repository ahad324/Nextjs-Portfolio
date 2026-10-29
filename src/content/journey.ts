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
    title: "First commits",
    body: "Taught myself the web in public — 20+ small HTML, CSS and JavaScript builds on GitHub, from a piano game to a weather app.",
  },
  {
    period: "2023 — 2027",
    title: "BS Computer Science",
    place: "Superior University",
    body: "Studying the fundamentals — data structures, networks, databases — and shipping side projects alongside.",
  },
  {
    period: "2024",
    title: "Went full-stack",
    body: "Real-time apps with Appwrite, a C++ and Node.js banking system, and React products like DocNow and HomeBudget.",
  },
  {
    period: "2025",
    title: "Backends, sockets & security",
    body: "A FastAPI banking platform, a Socket.IO multiplayer game server, and an mTLS desktop app published on the Microsoft Store.",
  },
  {
    period: "Jul — Sep 2025",
    title: "Full Stack (MERN) Intern",
    place: "Innovent Tech",
    body: "Built and maintained production features with the team, tightened quality through debugging and testing, and improved UI usability.",
  },
  {
    period: "Feb 2026 — Now",
    title: "Full-stack Engineer",
    place: "Floty.ai",
    body: "Shipping product end to end at Floty.ai — APIs, real-time features and the interfaces on top.",
  },
];
