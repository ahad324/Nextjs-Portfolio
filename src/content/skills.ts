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
    blurb: "Primary languages across web, backend and desktop work.",
    items: ["TypeScript", "JavaScript", "Python", "C++", "SQL"],
  },
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Web applications, interfaces and interactive 3D.",
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
    blurb: "APIs, services and real-time communication.",
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
    blurb: "Relational and document databases, caching and ORMs.",
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
    blurb: "Containers, deployment and API tooling.",
    items: ["Docker", "Nginx", "Git", "GitHub", "Postman", "Netlify", "Vercel"],
  },
  {
    id: "desktop",
    label: "Desktop & automation",
    blurb: "Desktop applications, browser automation and data collection.",
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
