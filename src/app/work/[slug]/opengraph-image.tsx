import { getProject, projects } from "@/content/projects";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return renderOg({
    eyebrow: project ? `Case study · ${project.year}` : "Case study",
    title: project?.title ?? "Project",
    subtitle: project?.tagline ?? "",
    accent: project?.accent,
  });
}
