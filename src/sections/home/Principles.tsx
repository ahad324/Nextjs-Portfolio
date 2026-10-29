import { principles } from "@/content/skills";
import { Marquee } from "@/components/ui/Marquee";

const Spark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className}>
    <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
  </svg>
);

/** Alternating sans / italic-serif words keep the rhythm interesting. */
const word = (item: string, index: number) =>
  index % 2 === 0 ? (
    <span className="font-semibold tracking-[-0.04em] uppercase">{item}</span>
  ) : (
    <span className="font-serif text-[1.15em] tracking-[-0.02em] italic">{item}</span>
  );

/** Two tapes crossing in an X, running in opposite directions. */
export function Principles() {
  const reversed = [...principles].reverse();
  return (
    <div aria-label="What I care about" className="relative z-10 overflow-x-clip py-16 md:py-24">
      <div className="relative">
        {/* Back tape */}
        <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-ember py-3 text-ink shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)] md:py-4">
          <Marquee
            items={reversed}
            duration={46}
            reverse
            renderItem={word}
            separator={<Spark className="size-4 shrink-0 md:size-5" />}
            className="text-xl leading-none md:text-3xl"
          />
        </div>
        {/* Front tape */}
        <div className="relative inset-x-0 mx-[-5%] -rotate-[2.5deg] border-y border-ink/10 bg-bone py-4 text-ink shadow-[0_30px_80px_-24px_rgb(0_0_0/0.9)] md:py-6">
          <Marquee
            items={principles}
            duration={38}
            renderItem={word}
            separator={<Spark className="size-5 shrink-0 text-ember md:size-7" />}
            className="text-3xl leading-none md:text-5xl"
          />
        </div>
      </div>
    </div>
  );
}
