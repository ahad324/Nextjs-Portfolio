import { projects } from "@/content/projects";
import { sections } from "@/content/navigation";
import { SplitReveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkList } from "./WorkList";

export function Work() {
  return (
    <section
      id={sections.work}
      data-chapter="work"
      aria-labelledby="work-title"
      className="relative py-28 md:py-40"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="03">Selected work</SectionLabel>
            <SplitReveal as="h2" className="mt-6 text-display font-semibold">
              <span id="work-title">
                Things I&apos;ve{" "}
                <span className="font-serif font-normal text-ember italic">shipped</span>
              </span>
            </SplitReveal>
          </div>
          <p className="max-w-xs text-bone-2">
            {projects.length} products — real-time systems, security-first desktop software and the
            backends behind them.
          </p>
        </div>
        <WorkList />
      </div>
    </section>
  );
}
