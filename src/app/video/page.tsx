import type { Metadata } from "next";
import Link from "next/link";
import { clockTime, film } from "@/content/film";
import { FadeIn, SplitReveal } from "@/components/motion/Reveal";
import { ArrowLeft } from "@/components/ui/Icons";
import { jsonLdScript, videoJsonLd } from "@/lib/seo";
import { FilmPlayer } from "@/sections/home/FilmPlayer";

export const metadata: Metadata = {
  title: "Introduction video",
  description: film.description,
  alternates: { canonical: "/video" },
  openGraph: {
    type: "video.other",
    url: "/video",
    title: film.title,
    description: film.description,
    images: [{ url: film.poster, width: 1280, height: 720, alt: film.title }],
    videos: [{ url: film.sources.desktop, width: 1280, height: 720, type: "video/mp4" }],
  },
  twitter: { card: "summary_large_image", title: film.title, images: [film.poster] },
};

/** Watch page: the film is the main content, so search engines can index it. */
export default function VideoPage() {
  return (
    <article
      data-chapter="ambient"
      className="pt-[calc(var(--header-h)+3rem)] pb-28 md:pt-[calc(var(--header-h)+5rem)] md:pb-40"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(videoJsonLd())} />
      <div className="container-x">
        <FadeIn immediate>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase transition-colors hover:text-bone"
          >
            <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
            Home
          </Link>
        </FadeIn>
        <SplitReveal
          as="h1"
          immediate
          className="mt-10 max-w-5xl text-display font-semibold md:mt-14"
        >
          Full-stack engineering,{" "}
          <span className="font-serif font-normal text-ember italic">idea to production.</span>
        </SplitReveal>
        <FadeIn immediate delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-bone-2">{film.description}</p>
        </FadeIn>

        <FilmPlayer eager className="mt-12 md:mt-16" />

        <section
          aria-labelledby="transcript-title"
          className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12"
        >
          <h2 id="transcript-title" className="eyebrow md:col-span-3">
            Transcript
          </h2>
          <ol className="border-t border-line md:col-span-9">
            {film.chapters.map((chapter) => (
              <li
                key={chapter.start}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[6rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-sm text-ember tabular-nums">
                  {clockTime(chapter.start)}
                </span>
                <span>
                  <span className="block font-semibold text-bone">{chapter.title}</span>
                  <span className="mt-1 block text-bone-2">{chapter.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
