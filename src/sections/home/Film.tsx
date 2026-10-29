import { sections } from "@/content/navigation";
import { SplitReveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FilmPlayer } from "./FilmPlayer";

export function Film() {
  return (
    <section
      id={sections.film}
      data-chapter="film"
      aria-labelledby="film-title"
      className="relative py-28 md:py-40"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="04">Introduction</SectionLabel>
            <SplitReveal as="h2" className="mt-6 text-display font-semibold">
              <span id="film-title">
                A 40-second{" "}
                <span className="font-serif font-normal text-ember italic">introduction</span>
              </span>
            </SplitReveal>
          </div>
          <p className="max-w-xs text-bone-2">
            An overview of what I build and how I work, rendered in code with the same particle
            system used on this site.
          </p>
        </div>
        <FilmPlayer />
      </div>
    </section>
  );
}
