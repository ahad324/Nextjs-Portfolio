import { projects } from "./projects";
import { skillCount } from "./skills";

export const manifesto =
  "I'm a full-stack engineer at Floty.ai. I build products end to end — real-time features over WebSockets, secure APIs in Node.js and FastAPI, and fast, accessible interfaces in React and Next.js.";

/** Derived, never hand-typed — stays true as content changes. */
export const stats = [
  { value: projects.length, suffix: "", label: "Projects shipped" },
  { value: skillCount, suffix: "", label: "Technologies I work with" },
  { value: 1, suffix: "", label: "App on the Microsoft Store" },
  { value: new Date().getFullYear() - 2023, suffix: "+", label: "Years building software" },
] as const;

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
    body: "Database design, APIs and user interfaces, built and maintained by one engineer.",
  },
  {
    title: "Real-time systems",
    body: "Live dashboards, multiplayer, chat and notifications with WebSockets and Socket.IO.",
  },
  {
    title: "APIs & backends",
    body: "Secure, documented REST and GraphQL APIs in Node.js, NestJS and FastAPI.",
  },
] as const;
