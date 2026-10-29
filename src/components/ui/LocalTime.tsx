"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.timezone,
  hour12: false,
});

// One shared ticking clock for every <LocalTime /> on the page.
function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 10_000);
  return () => clearInterval(id);
}
const getTime = () => formatter.format(Date.now());
const getServerTime = () => "--:--";

/** Live local time in Pakistan with a blinking separator. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  const [hours, minutes] = time.split(":");

  return (
    <span className={className} aria-label={`Local time ${time} Pakistan Standard Time`}>
      {hours}
      <span className="animate-pulse">:</span>
      {minutes} <span className="text-muted">PKT</span>
    </span>
  );
}
