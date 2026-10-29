import { sections } from "@/content/navigation";
import { SplitReveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FilmPlayer } from "./FilmPlayer";

export function Film() {
  return (
    <section id={sections.film} data-chapter="film" aria-labelledby="film-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="04">The short version</SectionLabel>
            <SplitReveal as="h2" className="mt-6 text-display font-semibold">
              <span id="film-title">
                Forty seconds, <span className="font-serif font-normal text-ember italic">no fluff</span>
              </span>
            </SplitReveal>
          </div>
          <p className="max-w-xs text-bone-2">
            Everything above, in motion — built in code with the same particles you&apos;re
            scrolling through.
          </p>
        </div>
        <FilmPlayer />
      </div>
    </section>
  );
}
