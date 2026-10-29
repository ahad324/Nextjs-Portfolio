import { cn } from "@/lib/cn";

/**
 * The mark: an open "A" — two strokes meeting at a peak — with the crossbar
 * replaced by a single ember particle. Abdul Ahad, and the idea the whole
 * brand is built on: one small point that holds the structure together.
 */
export function LogoMark({ className, title = "Abdul Ahad" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 32" role="img" aria-label={title} className={cn("size-8", className)}>
      <path
        d="M6.5 26.5 16 5.5l9.5 21"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="19" r="2.6" fill="var(--color-ember, #ff5b23)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-7" />
      <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">
        Abdul Ahad<span className="text-ember">.</span>
      </span>
    </span>
  );
}
