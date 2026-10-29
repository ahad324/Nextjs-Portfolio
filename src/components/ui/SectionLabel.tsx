import { cn } from "@/lib/cn";

/** "(02) — Selected work" style chapter marker. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: string;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-3 eyebrow", className)}>
      <span className="text-ember">({index})</span>
      <span className="h-px w-8 bg-line-strong" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-2", className)} aria-hidden>
      <span className="absolute inset-0 animate-pulse-dot rounded-full bg-ok" />
      <span className="relative inline-flex size-2 rounded-full bg-ok" />
    </span>
  );
}
