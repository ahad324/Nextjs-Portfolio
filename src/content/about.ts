import { projects } from "./projects";
import { skillCount } from "./skills";

export const manifesto =
  "I'm Abdul Ahad — a full-stack engineer who likes the hard parts. Sockets that stay in sync, data that stays safe, and interfaces that stay out of your way. I build the whole thing, then I sweat the details.";

/** Derived, never hand-typed — stays true as content changes. */
export const stats = [
  { value: projects.length, suffix: "", label: "Products shipped" },
  { value: skillCount, suffix: "", label: "Technologies in the toolbox" },
  { value: 1, suffix: "", label: "App on the Microsoft Store" },
  { value: new Date().getFullYear() - 2023, suffix: " yrs", label: "Writing code in public" },
] as const;

export const hobbies = [
  { label: "Cricket", emoji: "🏏" },
  { label: "Football", emoji: "⚽" },
  { label: "Hiking", emoji: "🥾" },
  { label: "Gaming", emoji: "🎮" },
  { label: "Fitness", emoji: "🏋️" },
  { label: "Reading", emoji: "📚" },
  { label: "Sleeping", emoji: "😴" },
] as const;

export const services = [
  {
    title: "Full-stack products",
    body: "From database schema to the last hover state — one person accountable for the whole thing.",
  },
  {
    title: "Real-time systems",
    body: "Live dashboards, multiplayer, chat and notifications over WebSockets and Socket.IO.",
  },
  {
    title: "APIs & backends",
    body: "Secure, documented REST and GraphQL services in Node.js, NestJS or FastAPI.",
  },
] as const;
