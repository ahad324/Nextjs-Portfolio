import { site } from "@/content/site";
import { sections } from "@/content/navigation";
import { FadeIn, SplitReveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowDown, Download } from "@/components/ui/Icons";
import { StatusDot } from "@/components/ui/SectionLabel";
import { ScrollCue } from "./ScrollCue";

export function Hero() {
  return (
    <section
      id={sections.hero}
      data-chapter="hero"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col justify-end pt-[calc(var(--header-h)+2rem)] pb-8 md:pb-10"
    >
      {/* Soft vignette so text always reads over the particles. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_20%_100%,var(--color-ink)_20%,transparent_70%)]"
      />
      <div className="container-x">
        <FadeIn immediate delay={0.05}>
          <p className="flex items-center gap-3 eyebrow text-bone-2">
            <StatusDot />
            {site.availability.label}
          </p>
        </FadeIn>

        <h1 className="mt-6 text-mega font-semibold md:mt-8">
          <SplitReveal as="span" immediate by="chars" className="block">
            {site.firstName}
          </SplitReveal>
          <SplitReveal
            as="span"
            immediate
            by="chars"
            delay={0.15}
            className="block pr-[0.1em] font-serif font-normal tracking-[-0.03em] text-ember italic"
          >
            {site.lastName}
          </SplitReveal>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <FadeIn immediate delay={0.45} className="md:col-span-6 lg:col-span-5">
            <p className="text-lg text-bone-2 md:text-xl">
              <span className="text-bone">{site.role}.</span> {site.pitch}
            </p>
          </FadeIn>
          <FadeIn
            immediate
            delay={0.6}
            stagger={0.08}
            className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7"
          >
            <Magnetic>
              <ButtonLink
                href={`#${sections.work}`}
                size="lg"
                icon={<ArrowDown className="size-4" />}
              >
                See the work
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                href={site.resume.href}
                download={site.resume.fileName}
                variant="outline"
                size="lg"
                icon={<Download className="size-4" />}
              >
                Résumé
              </ButtonLink>
            </Magnetic>
          </FadeIn>
        </div>

        <FadeIn
          immediate
          delay={0.8}
          className="mt-12 flex items-center justify-between border-t border-line pt-5 font-mono text-xs tracking-wider text-muted uppercase md:mt-16"
        >
          <ScrollCue />
          <span className="hidden sm:block">Based in {site.location} — working worldwide</span>
          <span>
            <span className="text-ember">(01)</span> Hello
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
