import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/content/projects";
import { FadeIn, SplitReveal } from "@/components/motion/Reveal";
import { ProjectCover } from "@/components/project/ProjectCover";
import { CoverReveal } from "@/components/project/CoverReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeft, ArrowUpRight, Github } from "@/components/ui/Icons";
import { jsonLdScript, projectJsonLd } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.category}`,
    description: `${project.tagline} ${project.summary}`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: project.title,
      description: project.tagline,
    },
    twitter: { title: project.title, description: project.tagline },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);
  const index = projects.findIndex((item) => item.slug === project.slug);

  return (
    <article style={{ ["--accent" as string]: project.accent }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(projectJsonLd(project))}
      />

      <header
        data-chapter="ambient"
        className="pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]"
      >
        <div className="container-x">
          <FadeIn
            immediate
            className="flex items-center justify-between font-mono text-xs tracking-wider text-muted uppercase"
          >
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 transition-colors hover:text-bone"
            >
              <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
              All work
            </Link>
            <span>
              <span className="text-ember">{String(index + 1).padStart(2, "0")}</span> /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </FadeIn>

          <FadeIn
            immediate
            delay={0.1}
            className="mt-14 flex flex-wrap items-center gap-3 md:mt-20"
          >
            <span className="eyebrow">{project.category}</span>
            {project.badge && (
              <span className="rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                {project.badge}
              </span>
            )}
          </FadeIn>
          <SplitReveal
            as="h1"
            immediate
            by="chars"
            delay={0.1}
            className="mt-5 text-mega font-semibold"
          >
            {project.title}
          </SplitReveal>
          <SplitReveal
            as="p"
            immediate
            delay={0.35}
            className="mt-6 max-w-3xl text-lead text-bone-2"
          >
            {project.tagline}
          </SplitReveal>

          <FadeIn
            immediate
            delay={0.5}
            stagger={0.06}
            className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4"
          >
            <Meta label="Year">{project.year}</Meta>
            <Meta label="Role">{project.role}</Meta>
            <Meta label="Focus">{project.category}</Meta>
            <div className="col-span-2 flex flex-wrap items-start gap-3 md:col-span-1 md:justify-end">
              {project.links.live && (
                <Magnetic>
                  <ButtonLink href={project.links.live} icon={<ArrowUpRight className="size-4" />}>
                    Live site
                  </ButtonLink>
                </Magnetic>
              )}
              {project.links.repo && (
                <Magnetic>
                  <ButtonLink
                    href={project.links.repo}
                    variant="outline"
                    icon={<Github className="size-4" />}
                  >
                    Code
                  </ButtonLink>
                </Magnetic>
              )}
            </div>
          </FadeIn>
        </div>
      </header>

      <div data-chapter="ambient" className="container-x mt-14 md:mt-20">
        <CoverReveal>
          <div className="aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-ink-2">
            <ProjectCover project={project} priority sizes="(min-width: 1440px) 1400px, 100vw" />
          </div>
        </CoverReveal>
      </div>

      <section
        data-chapter="ambient"
        className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-36"
      >
        <div className="md:col-span-4">
          <p className="eyebrow">Overview</p>
        </div>
        <div className="md:col-span-8">
          <SplitReveal as="p" className="text-lead">
            {project.summary}
          </SplitReveal>

          <h2 className="mt-20 eyebrow">What went into it</h2>
          <ol className="mt-6 border-t border-line">
            {project.highlights.map((highlight, i) => (
              <FadeIn
                as="li"
                key={highlight}
                className="flex gap-6 border-b border-line py-6 text-lg text-bone-2"
              >
                <span className="pt-1.5 font-mono text-xs text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{highlight}</span>
              </FadeIn>
            ))}
          </ol>

          <h2 className="mt-20 eyebrow">Built with</h2>
          <FadeIn as="ul" stagger={0.04} className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tool) => (
              <li key={tool} className="rounded-full border border-line-strong px-4 py-2 text-sm">
                {tool}
              </li>
            ))}
          </FadeIn>
        </div>
      </section>

      <section data-chapter="ambient" aria-label="Next project" className="border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          data-cursor="Next"
          className="group container-x block py-20 md:py-32"
        >
          <p className="eyebrow">Next project</p>
          <div className="mt-6 flex items-end justify-between gap-6">
            <span className="text-mega font-semibold transition-[color,translate] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-ember">
              {next.title}
            </span>
            <span className="mb-3 hidden size-20 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[background-color,border-color,color,rotate] duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-ink md:flex">
              <ArrowUpRight className="size-6 rotate-45" />
            </span>
          </div>
          <p className="mt-4 max-w-xl text-bone-2">{next.tagline}</p>
        </Link>
      </section>
    </article>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-bone-2">{children}</p>
    </div>
  );
}
