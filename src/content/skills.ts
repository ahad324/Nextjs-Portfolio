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
    blurb: "Primary languages across web, backend, systems and desktop work.",
    items: ["TypeScript", "JavaScript", "Python", "C / C++", "Rust", "Dart", "SQL"],
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
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "SQLite",
      "Redis",
      "Supabase",
      "Appwrite",
      "Mongoose",
      "TypeORM",
      "SQLAlchemy",
    ],
  },
  {
    id: "ops",
    label: "Deployment & DevOps",
    blurb: "Containers, CI/CD and production hosting.",
    items: [
      "Docker",
      "Nginx",
      "Linux",
      "GitHub Actions",
      "CI/CD",
      "Railway",
      "Vercel",
      "Netlify",
      "Git",
    ],
  },
  {
    id: "desktop",
    label: "Desktop, IoT & automation",
    blurb: "Desktop applications, connected devices and browser automation.",
    items: ["PyQt6", "Tkinter", "Arduino", "Playwright", "Puppeteer", "Selenium", "Scrapy"],
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
