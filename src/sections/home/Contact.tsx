import { sections } from "@/content/navigation";
import { site } from "@/content/site";
import { ContactForm } from "@/features/contact/ContactForm";
import { FadeIn, SplitReveal } from "@/components/motion/Reveal";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ArrowUpRight, socialIcons } from "@/components/ui/Icons";
import { SectionLabel, StatusDot } from "@/components/ui/SectionLabel";

export function Contact() {
  return (
    <section
      id={sections.contact}
      data-chapter="contact"
      aria-labelledby="contact-title"
      className="relative py-28 md:py-40"
    >
      <div className="container-x">
        <SectionLabel index="07">Contact</SectionLabel>
        <SplitReveal as="h2" by="words" className="mt-6 max-w-[14ch] text-mega font-semibold">
          <span id="contact-title">
            Let&apos;s build something{" "}
            <span className="font-serif font-normal text-ember italic">real.</span>
          </span>
        </SplitReveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <FadeIn stagger={0.1} className="flex flex-col gap-10 md:col-span-4">
            <div>
              <p className="eyebrow">Availability</p>
              <p className="mt-3 flex items-center gap-3 text-lg">
                <StatusDot /> {site.availability.label}
              </p>
            </div>
            <div>
              <p className="eyebrow">Email</p>
              <CopyEmail className="mt-3 text-lg break-all" />
            </div>
            <div>
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-3 flex flex-col gap-2">
                {site.socials.map((social) => {
                  const Icon = socialIcons[social.label];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 border-b border-line py-3 transition-colors hover:text-ember"
                      >
                        <Icon className="size-4.5" />
                        <span className="text-lg">{social.label}</span>
                        <span className="ml-auto text-sm text-muted">{social.handle}</span>
                        <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>
          <FadeIn className="md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
