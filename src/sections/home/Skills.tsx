import { sections } from "@/content/navigation";
import { skillCount } from "@/content/skills";
import { SplitReveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillsExplorer } from "./SkillsExplorer";

export function Skills() {
  return (
    <section
      id={sections.skills}
      data-chapter="skills"
      aria-labelledby="skills-title"
      className="relative py-28 md:py-40"
    >
      <div className="container-x grid md:grid-cols-12">
        <div className="md:col-span-7 lg:col-span-6">
          <SectionLabel index="05">The stack</SectionLabel>
          <SplitReveal as="h2" className="mt-6 text-display font-semibold">
            <span id="skills-title">
              One person,{" "}
              <span className="font-serif font-normal text-ember italic">every layer</span>
            </span>
          </SplitReveal>
          <p className="mt-6 max-w-md text-bone-2">
            {skillCount} technologies I&apos;ve shipped with — picked for the job, not the hype.
          </p>
          <SkillsExplorer />
        </div>
      </div>
    </section>
  );
}
