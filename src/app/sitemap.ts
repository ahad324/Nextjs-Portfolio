import type { MetadataRoute } from "next";
import { film } from "@/content/film";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: absoluteUrl("/video"),
      lastModified: new Date(film.uploadDate),
      changeFrequency: "yearly",
      priority: 0.7,
      videos: [
        {
          title: film.title,
          description: film.description,
          thumbnail_loc: absoluteUrl(film.poster),
          content_loc: absoluteUrl(film.sources.desktop),
          duration: film.durationSeconds,
          publication_date: film.uploadDate,
          family_friendly: "yes",
          requires_subscription: "no",
          uploader: { info: site.url, content: site.name },
        },
      ],
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
