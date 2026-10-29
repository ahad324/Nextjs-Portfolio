import { journey } from "@/content/journey";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** llms.txt — a plain-text summary for AI assistants and crawlers (llmstxt.org). */
export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.pitch}

- Role: ${site.role} at ${site.company.name}
- Location: ${site.location}
- Contact: ${site.email}
- Résumé: ${absoluteUrl(site.resume.href)}

## Work

${projects.map((p) => `- [${p.title}](${absoluteUrl(`/work/${p.slug}`)}): ${p.tagline} (${p.year}; ${p.stack.join(", ")})`).join("\n")}

## Experience

${journey.map((m) => `- ${m.period} — ${m.title}${m.place ? `, ${m.place}` : ""}: ${m.body}`).join("\n")}

## Skills

${skillGroups.map((g) => `- ${g.label}: ${g.items.join(", ")}`).join("\n")}

## Links

${site.socials.map((s) => `- [${s.label}](${s.href})`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
