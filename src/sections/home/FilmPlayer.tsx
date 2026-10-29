"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/media";
import { Pause, Play } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export const FILM = {
  mp4: "/media/intro.mp4",
  webm: "/media/intro.webm",
  poster: "/media/intro-poster.jpg",
  captions: "/media/intro.vtt",
};

/**
 * The intro film. Autoplays muted while on screen (never for reduced motion),
 * pauses when you scroll away, and only downloads once it's near the viewport.
 */
export function FilmPlayer() {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [userPaused, setUserPaused] = useState(false);

  // Load the source only when the section approaches.
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => entry?.isIntersecting && setNear(true), {
      rootMargin: "600px 0px",
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Autoplay in view, pause out of view.
  useEffect(() => {
    const element = frame.current;
    const media = video.current;
    if (!element || !media || !near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !userPaused && !prefersReducedMotion()) {
          media.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          media.pause();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [near, userPaused]);

  // Frame grows from an inset window to full width as it scrolls in.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        frame.current,
        { clipPath: "inset(8% 10% 8% 10% round 2rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top 95%", end: "top 30%", scrub: true },
        },
      );
    },
    { scope: frame },
  );

  const toggle = () => {
    const media = video.current;
    if (!media) return;
    if (media.paused) {
      setUserPaused(false);
      media.play().catch(() => {});
    } else {
      setUserPaused(true);
      media.pause();
    }
  };

  const toggleSound = () => {
    const media = video.current;
    if (!media) return;
    media.muted = !media.muted;
    setMuted(media.muted);
    if (!media.muted && media.paused) media.play().catch(() => {});
  };

  const seek = (event: React.PointerEvent<HTMLDivElement>) => {
    const media = video.current;
    if (!media || !media.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    media.currentTime = ((event.clientX - rect.left) / rect.width) * media.duration;
  };

  return (
    <div
      ref={frame}
      className="group relative mt-14 aspect-video w-full overflow-hidden rounded-3xl border border-line bg-ink-2 md:mt-20"
      data-cursor={playing ? undefined : "Play"}
    >
      <video
        ref={video}
        className="size-full object-cover"
        poster={FILM.poster}
        muted={muted}
        playsInline
        loop
        preload="none"
        aria-label={`Intro film — ${site.name}, ${site.role}`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => {
          const media = event.currentTarget;
          if (media.duration) setProgress(media.currentTime / media.duration);
        }}
        onClick={toggle}
      >
        {near && (
          <>
            <source src={FILM.webm} type="video/webm" />
            <source src={FILM.mp4} type="video/mp4" />
            <track kind="captions" src={FILM.captions} srcLang="en" label="English" />
          </>
        )}
      </video>

      {/* Big play affordance while paused */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause film" : "Play film"}
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
          playing ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <span className="flex size-20 items-center justify-center rounded-full bg-bone text-ink shadow-2xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 md:size-24">
          <Play className="ml-1 size-7" />
        </span>
      </button>

      {/* Control bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-ink/80 to-transparent p-4 opacity-100 transition-opacity duration-500 md:p-6 md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="flex size-10 items-center justify-center rounded-full bg-bone/10 backdrop-blur-md transition-colors hover:bg-bone/20"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={seek}
          onKeyDown={(event) => {
            const media = video.current;
            if (!media) return;
            if (event.key === "ArrowRight") media.currentTime += 3;
            if (event.key === "ArrowLeft") media.currentTime -= 3;
          }}
          className="relative h-1 flex-1 cursor-pointer rounded-full bg-bone/20"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-ember"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          className="rounded-full bg-bone/10 px-4 py-2 font-mono text-xs tracking-wider uppercase backdrop-blur-md transition-colors hover:bg-bone/20"
        >
          {muted ? "Sound off" : "Sound on"}
        </button>
      </div>
    </div>
  );
}
