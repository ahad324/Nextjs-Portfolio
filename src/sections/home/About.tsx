import { journey } from "@/content/journey";
import { sections } from "@/content/navigation";
import { site } from "@/content/site";
import { FadeIn, SplitReveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Playground } from "./Playground";
import { PortraitCard } from "./PortraitCard";
import { Timeline } from "./Timeline";

export function About() {
  return (
    <section
      id={sections.about}
      data-chapter="about"
      aria-labelledby="about-title"
      className="relative py-28 md:py-40"
    >
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-6">
            <SectionLabel index="06">About</SectionLabel>
            <SplitReveal as="h2" className="mt-6 text-display font-semibold">
              <span id="about-title">
                The person behind{" "}
                <span className="font-serif font-normal text-ember italic">the commits</span>
              </span>
            </SplitReveal>
          </div>
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4 md:col-start-2">
            <PortraitCard />
          </div>
          <FadeIn
            stagger={0.12}
            className="space-y-6 text-lg text-bone-2 md:col-span-6 md:col-start-7 md:text-xl"
          >
            <p>
              <span className="text-bone">
                I&apos;m a {site.education.degree} student at {site.education.school}
              </span>{" "}
              and a full-stack engineer at Floty.ai. I started rebuilding small websites in public
              in 2023, and I&apos;ve been chasing harder problems ever since — multiplayer state,
              encrypted transfers, real-time money movement.
            </p>
            <p>
              I like owning the whole thing: the schema, the API, the socket layer and the last
              hover state. Fewer handoffs, more care — that&apos;s where good products come from.
            </p>
            <p>
              Day to day I ship product at Floty.ai. Outside of that, I&apos;m always up for talking
              about a hard real-time problem.
            </p>
          </FadeIn>
        </div>

        <div className="mt-24 grid gap-12 md:mt-36 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4 md:col-start-2">
            <p className="eyebrow">The journey so far</p>
            <p className="mt-4 max-w-xs text-bone-2">
              From piano games in plain JavaScript to an app on the Microsoft Store.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Timeline items={journey} />
          </div>
        </div>

        <div className="mt-24 md:mt-36">
          <Playground />
        </div>
      </div>
    </section>
  );
}
