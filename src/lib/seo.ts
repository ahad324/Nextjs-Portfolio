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
  const url = absoluteUrl(`/work/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        headline: project.tagline,
        description: project.summary,
        url,
        image: absoluteUrl(`/work/${project.slug}/opengraph-image`),
        dateCreated: String(project.year),
        genre: project.category,
        keywords: project.stack.join(", "),
        author: { "@id": absoluteUrl("/#person") },
        ...(project.links.live ? { sameAs: [project.links.live] } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/#work") },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}

/** Serialises JSON-LD safely for an inline <script>. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
