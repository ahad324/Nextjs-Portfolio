import { projects, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** schema.org graph for the home page: who I am + the site itself. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: site.name,
        url: site.url,
        image: absoluteUrl("/opengraph-image"),
        email: `mailto:${site.email}`,
        jobTitle: site.role,
        worksFor: { "@type": "Organization", name: site.company.name, url: site.company.url },
        description: site.description,
        address: { "@type": "PostalAddress", addressCountry: "PK" },
        alumniOf: { "@type": "CollegeOrUniversity", name: site.education.school },
        knowsAbout: skillGroups.flatMap((group) => group.items),
        sameAs: site.socials.map((social) => social.href),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": absoluteUrl("/#person") },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        name: "Selected work",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/work/${project.slug}`),
          name: project.title,
        })),
      },
    ],
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    dateCreated: String(project.year),
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: project.stack.join(", "),
    ...(project.links.live ? { sameAs: [project.links.live] } : {}),
  };
}

/** Serialises JSON-LD safely for an inline <script>. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
