import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * A project's visual. Screenshots go through next/image (AVIF/WebP, blur
 * placeholder); projects without one get a designed API-console cover.
 */
export function ProjectCover({
  project,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} — screenshot`}
        sizes={sizes}
        placeholder="blur"
        priority={priority}
        className={cn("size-full object-cover object-top", className)}
      />
    );
  }
  return <ConsoleCover project={project} className={className} />;
}

const requests = [
  { method: "POST", path: "/api/v1/auth/login", status: 200, ms: 38 },
  { method: "POST", path: "/api/v1/transfers", status: 201, ms: 54 },
  { method: "GET", path: "/api/v1/accounts/me/transactions?page=2", status: 200, ms: 12 },
  { method: "WS", path: "/ws/notifications", status: 101, ms: 3 },
  { method: "PATCH", path: "/api/v1/admin/loans/1842", status: 200, ms: 41 },
  { method: "GET", path: "/api/v1/cards", status: 200, ms: 9 },
];

function ConsoleCover({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${project.title} — API activity illustration`}
      className={cn("relative flex size-full flex-col overflow-hidden bg-ink-2 font-mono text-[clamp(0.6rem,1.1vw,0.85rem)]", className)}
      style={{ ["--accent" as string]: project.accent }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)]"
      />
      <div className="relative flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="size-2.5 rounded-full bg-ink-4" />
        <span className="size-2.5 rounded-full bg-ink-4" />
        <span className="size-2.5 rounded-full bg-ink-4" />
        <span className="ml-3 text-muted">{project.slug} — uvicorn · redis · ws</span>
      </div>
      <div className="relative flex flex-1 flex-col justify-center gap-[0.9em] px-5 py-6 md:px-8">
        {requests.map((request) => (
          <div key={request.path} className="flex items-center gap-[1.2em] whitespace-nowrap">
            <span className="w-[4.5em] text-[var(--accent)]">{request.method}</span>
            <span className="truncate text-bone-2">{request.path}</span>
            <span className="ml-auto text-ok">{request.status}</span>
            <span className="w-[3.5em] text-right text-muted">{request.ms}ms</span>
          </div>
        ))}
        <div className="mt-[0.6em] flex items-center gap-2 text-muted">
          <span className="inline-block h-[1.1em] w-[0.55em] animate-pulse bg-[var(--accent)]" />
          listening on :8000
        </div>
      </div>
    </div>
  );
}
