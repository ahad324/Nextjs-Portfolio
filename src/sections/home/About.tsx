import { education, experience } from "@/content/journey";
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
              </span>
              , where I build product features end to end and handle deployment and infrastructure.
              Alongside that, I take on freelance work, building and shipping applications for
              clients.
            </p>
            <p>
              I&apos;ve been writing software since 2022. My work covers web and desktop
              applications, real-time systems, secure APIs, IoT integrations and the pipelines that
              put them into production.
            </p>
            <p>
              I&apos;m completing a {site.education.degree} at {site.education.school}, where my
              final-year project is an AI-powered robotics system.
            </p>
          </FadeIn>
        </div>

        <div className="mt-24 grid gap-16 md:mt-36 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-2">
            <h3 className="eyebrow">Experience</h3>
            <div className="mt-8">
              <Timeline items={experience} label="Experience" />
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-4 lg:col-start-8">
            <h3 className="eyebrow">Education</h3>
            <div className="mt-8">
              <Timeline items={education} label="Education" />
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-36">
          <Playground />
        </div>
      </div>
    </section>
  );
}
