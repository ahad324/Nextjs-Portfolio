/**
 * Single source of truth for the intro film: the player, the /video watch
 * page, its VideoObject structured data, the video sitemap and the captions
 * file (scripts/render-video.mjs) all read from here.
 */
export const film = {
  title: "Abdul Ahad — Full-stack engineering, idea to production",
  description:
    "A 45-second introduction to Abdul Ahad's work as a full-stack engineer: writing real-time services, connecting web, mobile, desktop and IoT clients to secure APIs and data, and shipping them to production through CI/CD.",
  durationSeconds: 45,
  /** ISO date the current cut was published. Update when the film is re-rendered. */
  uploadDate: "2026-11-22",
  sources: {
    desktop: "/media/intro.mp4",
    mobile: "/media/intro-540.mp4",
  },
  poster: "/media/intro-poster.jpg",
  captions: "/media/intro.vtt",
  /** Timed transcript: drives the captions file and the transcript on /video. */
  chapters: [
    {
      start: 0,
      end: 5,
      title: "Opening",
      text: "Ideas. Interfaces. APIs. Devices. Production.",
    },
    {
      start: 5,
      end: 12,
      title: "Write it",
      text: "A real-time server that authenticates clients and streams live device readings over WebSockets.",
    },
    {
      start: 12,
      end: 26,
      title: "Connect it",
      text: "Web, mobile, desktop and IoT clients connected through an API gateway to real-time, authentication and device-ingest services, backed by PostgreSQL and Redis in production.",
    },
    {
      start: 26,
      end: 33,
      title: "Ship it",
      text: "A CI/CD pipeline takes the code from git push through linting, tests, builds and a Docker image to a production deployment.",
    },
    {
      start: 33,
      end: 39,
      title: "Full-stack engineering",
      text: "Full-stack engineering, idea to production. Web, mobile, backend, real-time, IoT and deployment.",
    },
    {
      start: 39,
      end: 45,
      title: "Contact",
      text: "Abdul Ahad, full-stack engineer at Floty.ai.",
    },
  ],
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

/** "00:12.000" — WebVTT timestamp. */
export const vttTime = (seconds: number) =>
  `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}.000`;

/** "PT45S" — ISO 8601 duration for structured data. */
export const isoDuration = (seconds: number) => `PT${seconds}S`;

/** "0:12" — readable timestamp for the transcript. */
export const clockTime = (seconds: number) => `${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;

export function captionsVtt() {
  return [
    "WEBVTT",
    "",
    ...film.chapters.flatMap((chapter) => [
      `${vttTime(chapter.start)} --> ${vttTime(chapter.end)}`,
      chapter.start === 0 ? `[Electronic music] ${chapter.text}` : chapter.text,
      "",
    ]),
  ].join("\n");
}
