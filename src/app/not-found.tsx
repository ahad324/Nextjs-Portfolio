import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeft } from "@/components/ui/Icons";
import { FadeIn, SplitReveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section
      data-chapter="lost"
      className="relative flex min-h-svh flex-col justify-center pt-[var(--header-h)]"
    >
      <div className="container-x">
        <FadeIn immediate>
          <p className="eyebrow">
            <span className="text-ember">(404)</span> — Not found
          </p>
        </FadeIn>
        <SplitReveal as="h1" immediate by="chars" className="mt-6 text-mega font-semibold">
          Page not found.
        </SplitReveal>
        <FadeIn immediate delay={0.3}>
          <p className="mt-6 max-w-md text-lg text-bone-2">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <ButtonLink href="/" size="lg" className="mt-10" icon={<ArrowLeft className="size-4" />}>
            Back home
          </ButtonLink>
        </FadeIn>
      </div>
    </section>
  );
}
