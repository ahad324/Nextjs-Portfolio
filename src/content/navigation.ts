/** Section ids double as anchors and as scroll-story chapters. */
export const sections = {
  hero: "top",
  intro: "intro",
  work: "work",
  film: "film",
  skills: "skills",
  about: "about",
  contact: "contact",
} as const;

export type SectionId = (typeof sections)[keyof typeof sections];

export const navLinks = [
  { label: "Work", id: sections.work },
  { label: "Stack", id: sections.skills },
  { label: "About", id: sections.about },
  { label: "Contact", id: sections.contact },
] as const;
