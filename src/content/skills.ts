export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  items: readonly string[];
};

export const skillGroups = [
  {
    id: "languages",
    label: "Languages",
    blurb: "Typed where it matters, pragmatic everywhere else.",
    items: ["TypeScript", "JavaScript", "Python", "C++", "SQL"],
  },
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces that feel fast because they are.",
    items: [
      "React",
      "Next.js",
      "Redux Toolkit",
      "React Query",
      "Tailwind CSS",
      "MUI",
      "Framer Motion",
      "Three.js",
    ],
  },
  {
    id: "backend",
    label: "Backend & real-time",
    blurb: "APIs and sockets that stay up and stay in sync.",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "FastAPI",
      "Socket.IO",
      "WebSockets",
      "GraphQL",
      "REST / OpenAPI",
    ],
  },
  {
    id: "data",
    label: "Data",
    blurb: "Schemas designed before the first query.",
    items: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Appwrite",
      "Mongoose",
      "TypeORM",
      "SQLAlchemy",
    ],
  },
  {
    id: "ops",
    label: "DevOps & tools",
    blurb: "From laptop to production without drama.",
    items: ["Docker", "Nginx", "Git", "GitHub", "Postman", "Netlify", "Vercel"],
  },
  {
    id: "desktop",
    label: "Desktop & automation",
    blurb: "When the job lives outside the browser.",
    items: ["PyQt6", "Tkinter", "Playwright", "Puppeteer", "Selenium", "Scrapy", "BeautifulSoup"],
  },
] as const satisfies readonly SkillGroup[];

export const skillCount = skillGroups.reduce((total, group) => total + group.items.length, 0);

/** Words for the marquee band — the qualities, not the tools. */
export const principles = [
  "Real-time",
  "Secure by default",
  "Performant",
  "Accessible",
  "Type-safe",
  "Tested",
  "Scalable",
  "Maintainable",
] as const;
