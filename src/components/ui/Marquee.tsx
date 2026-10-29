import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Infinite CSS marquee — GPU-only, never wraps, pauses on hover, static for reduced motion. */
export function Marquee({
  items,
  duration = 40,
  className,
  reverse = false,
  separator = <span className="size-2 shrink-0 rounded-full bg-ember" aria-hidden />,
  renderItem = (item) => item,
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  reverse?: boolean;
  separator?: ReactNode;
  renderItem?: (item: string, index: number) => ReactNode;
}) {
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {items.map((item, index) => (
              <Fragment key={item}>
                <span className="shrink-0 px-5 whitespace-nowrap md:px-8">
                  {renderItem(item, index)}
                </span>
                {separator}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
