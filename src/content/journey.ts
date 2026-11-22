/**
 * Career history, kept separate from education. Newest first.
 */
export type Entry = {
  period: string;
  title: string;
  org: string;
  /** Employment type or credential, e.g. "Full-time", "Internship". */
  kind: string;
  points: readonly string[];
};

export const experience: readonly Entry[] = [
  {
    period: "Feb 2026 — Present",
    title: "Full-stack Engineer",
    org: "Floty.ai",
    kind: "Full-time",
    points: [
      "Build product features end to end, across backend APIs, real-time functionality and user interfaces.",
      "Own deployment and infrastructure, including build pipelines, environments and production releases.",
      "Integrate tracking devices with backend services and live dashboards.",
    ],
  },
  {
    period: "Ongoing",
    title: "Full-stack Developer",
    org: "Independent / Upwork",
    kind: "Freelance",
    points: [
      "Design, build and deploy web, mobile and desktop applications and APIs for clients.",
      "Handle projects end to end, from requirements and architecture to delivery and support.",
    ],
  },
  {
    period: "Jul — Sep 2025",
    title: "Full-stack (MERN) Intern",
    org: "Innovent Tech",
    kind: "Internship",
    points: [
      "Developed and maintained features for production web applications.",
      "Debugged and tested releases, and improved interface usability with the team.",
    ],
  },
];

export const education: readonly Entry[] = [
  {
    period: "2023 — 2027",
    title: "BS Computer Science",
    org: "Superior University, Lahore",
    kind: "Degree",
    points: [
      "Final-year project: an AI-powered robotics system built on ESP32 (in progress).",
      "Coursework in data structures, computer networks, databases and software engineering.",
    ],
  },
];
