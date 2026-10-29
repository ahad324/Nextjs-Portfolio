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
                About <span className="font-serif font-normal text-ember italic">me</span>
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
                I&apos;m a full-stack engineer at {site.company.name}
              </span>{" "}
              and a {site.education.degree} student at {site.education.school} (
              {site.education.period.replace(" — ", "–")}). I&apos;ve been building for the web
              since 2023, from small HTML, CSS and JavaScript projects to real-time apps, secure
              desktop software and backend APIs.
            </p>
            <p>
              My work covers the whole stack: database design, REST and WebSocket APIs,
              authentication and access control, and responsive interfaces in React and Next.js.
            </p>
            <p>
              Before {site.company.name}, I interned as a MERN developer at Innovent Tech and built
              independent projects including TransferX, which is available on the Microsoft Store.
            </p>
          </FadeIn>
        </div>

        <div className="mt-24 grid gap-12 md:mt-36 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4 md:col-start-2">
            <p className="eyebrow">Experience &amp; education</p>
            <p className="mt-4 max-w-xs text-bone-2">Work and study since 2023.</p>
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
