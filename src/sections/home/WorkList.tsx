"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "@/content/projects";
import { ProjectCover } from "@/components/project/ProjectCover";
import { ArrowUpRight } from "@/components/ui/Icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/media";
import { cn } from "@/lib/cn";

/**
 * Index of projects. On desktop a preview window follows the cursor and
 * slides between screenshots; on touch devices each row shows its image.
 */
export function WorkList() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const list = root.current;
      const box = preview.current;
      if (!list || !box || !hasFinePointer()) return;
      const reduced = prefersReducedMotion();
      const xTo = gsap.quickTo(box, "x", { duration: reduced ? 0 : 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(box, "y", { duration: reduced ? 0 : 0.7, ease: "power3.out" });
      const onMove = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      gsap.from(list.querySelectorAll("li > a"), {
        y: 60,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1.2,
        scrollTrigger: { trigger: list, start: "top 85%", once: true },
      });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mt-16 md:mt-24" onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-line">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className={cn(
              "border-b border-line transition-opacity duration-500",
              active !== null && active !== index && "md:opacity-35",
            )}
          >
            <Link
              href={`/work/${project.slug}`}
              data-cursor="View"
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group grid grid-cols-12 items-center gap-x-4 gap-y-5 py-7 md:py-9"
            >
              <span className="col-span-2 font-mono text-xs text-muted md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="col-span-10 md:col-span-6">
                <span className="block text-headline font-semibold transition-transform duration-700 ease-[var(--ease-out-expo)] md:group-hover:translate-x-4">
                  {project.title}
                </span>
                <span className="mt-2 block text-bone-2 md:hidden">{project.tagline}</span>
              </span>
              <span className="hidden text-sm text-bone-2 md:col-span-3 md:block">
                {project.category}
              </span>
              <span className="hidden font-mono text-sm text-muted md:col-span-1 md:block">
                {project.year}
              </span>
              <span className="hidden justify-end md:col-span-1 md:flex">
                <span className="flex size-12 items-center justify-center rounded-full border border-line-strong transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
                  <ArrowUpRight className="size-4 rotate-45" />
                </span>
              </span>
              {/* Touch: inline image */}
              <span className="col-span-12 block aspect-[16/10] overflow-hidden rounded-2xl border border-line md:hidden">
                <ProjectCover project={project} sizes="100vw" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop: cursor-following preview */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
      >
        <div
          className={cn(
            "relative -mt-[9.5rem] ml-8 aspect-[16/10] w-[30rem] overflow-hidden rounded-2xl border border-line-strong shadow-2xl shadow-black/60 transition-[opacity,scale,rotate] duration-500 ease-[var(--ease-out-expo)]",
            active === null ? "scale-75 -rotate-6 opacity-0" : "scale-100 rotate-0 opacity-100",
          )}
        >
          <div
            className="absolute inset-x-0 top-0 transition-transform duration-700 ease-[var(--ease-out-expo)]"
            style={{ transform: `translateY(${-(active ?? 0) * 100}%)`, height: "100%" }}
          >
            {projects.map((project) => (
              <div key={project.slug} className="aspect-[16/10] w-full">
                <ProjectCover project={project} sizes="480px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
