import { cn } from "@/lib/cn";
import { manifesto, services, stats } from "@/content/about";
import { sections } from "@/content/navigation";
import { CountUp } from "@/components/motion/CountUp";
import { FadeIn } from "@/components/motion/Reveal";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Statement() {
  return (
    <section
      id={sections.intro}
      data-chapter="intro"
      aria-labelledby="statement-title"
      className="relative py-28 md:py-44"
    >
      <div className="container-x">
        <SectionLabel index="02">Overview</SectionLabel>
        <h2 id="statement-title" className="sr-only">
          About my work
        </h2>
        <ScrubWords
          text={manifesto}
          className="mt-10 max-w-[22ch] text-headline font-medium md:max-w-[26ch] lg:max-w-[30ch]"
        />

        <dl className="mt-20 grid grid-cols-2 items-end gap-x-6 gap-y-10 border-t border-line pt-10 md:mt-28 md:grid-cols-3">
          {stats.map((stat) => (
            <FadeIn
              key={stat.label}
              className={cn(
                "flex flex-col-reverse gap-2",
                stat.kind === "text" && "col-span-2 md:col-span-1",
              )}
            >
              <dt className="text-sm text-muted">{stat.label}</dt>
              {stat.kind === "number" ? (
                <dd className="text-display font-semibold tabular-nums">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              ) : (
                <dd className="text-title leading-tight font-semibold md:min-h-[2lh] lg:min-h-0 lg:text-[clamp(1.5rem,1rem+1.4vw,2.25rem)]">
                  {stat.text}
                </dd>
              )}
            </FadeIn>
          ))}
        </dl>

        <FadeIn
          stagger={0.1}
          className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:mt-28 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative bg-ink/85 p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-ink-2/90 md:p-9"
            >
              <span className="font-mono text-xs text-ember">0{index + 1}</span>
              <h3 className="mt-10 text-title font-semibold">{service.title}</h3>
              <p className="mt-3 text-bone-2">{service.body}</p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </article>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
