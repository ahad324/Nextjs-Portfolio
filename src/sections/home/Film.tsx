import Link from "next/link";
import { sections } from "@/content/navigation";
import { ArrowUpRight } from "@/components/ui/Icons";
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
            <SectionLabel index="04">Video</SectionLabel>
            <SplitReveal as="h2" className="mt-6 text-display font-semibold">
              <span id="film-title">
                Introduction <span className="font-serif font-normal text-ember italic">video</span>
              </span>
            </SplitReveal>
          </div>
          <Link
            href="/video"
            className="group inline-flex items-center gap-2 text-bone-2 transition-colors hover:text-bone"
          >
            Watch with transcript
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <FilmPlayer />
      </div>
    </section>
  );
}
