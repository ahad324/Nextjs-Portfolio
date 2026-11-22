import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { mulberry32 } from "@/lib/rng";
import { IntroBridge } from "./IntroBridge";

/**
 * Loading screen with real progress.
 *
 * A field of particles starts scattered and flies into formation as the page
 * loads, the counter shows the real percentage, and a line under the name
 * cycles through what Abdul does. Progress is driven by actual milestones
 * (document parsed → fonts → images → app hydrated → 3D scene ready or skipped),
 * tracked by a tiny inline script — so it paints in the first frame, before any
 * app JavaScript arrives. Capped at 8 s.
 *
 * Everything visual is CSS driven by one custom property (`--p`, the number of
 * particles in place) on the root, so the server HTML never needs patching.
 *
 * Skipped entirely (`data-intro="seen"`, set by the boot script) for returning
 * visitors in the same session, deep links, low-end devices and reduced motion.
 */
const STEPS = [
  { id: "dom", weight: 15 },
  { id: "fonts", weight: 15 },
  { id: "load", weight: 30 },
  { id: "app", weight: 20 },
  { id: "scene", weight: 20 },
] as const;

const LINES = [
  "Full-stack engineer",
  "Web · Mobile · Desktop",
  "Real-time systems",
  "IoT & connected devices",
  "Idea to production",
];

const COLS = 22;
const ROWS = 12;
const COUNT = COLS * ROWS;

/** Deterministic particles: fill order and scatter offsets (same on server and client). */
const PARTICLES = (() => {
  const rand = mulberry32(2026);
  const order = Array.from({ length: COUNT }, (_, i) => i);
  for (let i = COUNT - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j]!, order[i]!];
  }
  return order.map((fillIndex) => {
    const angle = rand() * Math.PI * 2;
    const distance = 120 + rand() * 420;
    return {
      i: fillIndex,
      dx: Math.round(Math.cos(angle) * distance),
      dy: Math.round(Math.sin(angle) * distance),
      ember: rand() < 0.07,
    };
  });
})();

const script = `(function(){
var d=document,h=d.documentElement,w=window;
if(h.getAttribute('data-intro')==='seen')return;
var steps=${JSON.stringify(STEPS)},done={},shown=0,start=performance.now(),MIN=1400,CAP=8000,finished=false,N=${COUNT};
function target(){var t=0;for(var i=0;i<steps.length;i++)if(done[steps[i].id])t+=steps[i].weight;return t}
function mark(id){done[id]=true}
function finish(){if(finished)return;finished=true;
  if(!done.app)h.setAttribute('data-reveal-all','');
  try{sessionStorage.setItem('intro-seen','1')}catch(e){}
  h.setAttribute('data-intro','done');w.dispatchEvent(new Event('intro:done'));}
function frame(now){if(finished)return;
  var elapsed=now-start,t=elapsed>CAP?100:target();
  shown+=(t-shown)*0.07;if(t-shown<0.3)shown=t;
  var n=Math.round(shown),root=d.querySelector('.intro'),num=d.getElementById('intro-num');
  if(root){root.style.setProperty('--p',String(shown/100*N));root.setAttribute('aria-valuenow',String(n));}
  if(num)num.textContent=String(n);
  if(n>=100&&elapsed>=MIN){finish();return}
  requestAnimationFrame(frame)}
if(d.readyState!=='loading')mark('dom');else d.addEventListener('DOMContentLoaded',function(){mark('dom')});
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){mark('fonts')});else mark('fonts');
if(d.readyState==='complete')mark('load');else w.addEventListener('load',function(){mark('load')});
w.addEventListener('app:hydrated',function(){mark('app')});
w.addEventListener('scene:ready',function(){mark('scene')});
w.addEventListener('scene:skip',function(){mark('scene')});
requestAnimationFrame(frame);
})();`;

export function Intro() {
  return (
    <>
      <div
        suppressHydrationWarning
        className="intro fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-ink-2"
        role="progressbar"
        aria-label={`Loading ${site.name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ "--p": 0, "--n": COUNT } as CSSProperties}
      >
        {/* Particles assembling into formation */}
        <div className="intro-field" aria-hidden>
          {PARTICLES.map((particle, index) => (
            <i
              key={index}
              className={particle.ember ? "is-ember" : undefined}
              style={
                { "--i": particle.i, "--dx": particle.dx, "--dy": particle.dy } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative flex flex-col items-center text-center">
          <svg viewBox="0 0 32 32" className="size-20 text-bone md:size-24" aria-hidden>
            <path
              className="intro-path"
              d="M6.5 26.5 16 5.5l9.5 21"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
            />
            <circle className="intro-dot" cx="16" cy="19" r="2.4" fill="var(--color-ember)" />
          </svg>
          <p className="mt-8 text-sm font-medium tracking-[0.3em] text-bone uppercase">
            {site.name}
          </p>
          <div
            className="intro-lines mt-3 h-[1.5em] overflow-hidden text-sm text-muted"
            aria-hidden
          >
            <ul>
              {[...LINES, LINES[0]].map((line, index) => (
                <li key={index} className="h-[1.5em] leading-[1.5em]">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className="absolute right-[var(--gutter)] bottom-6 flex items-start font-semibold tracking-[-0.05em] text-bone tabular-nums md:bottom-8"
          aria-hidden
        >
          <span
            id="intro-num"
            suppressHydrationWarning
            className="text-[clamp(3.5rem,9vw,7.5rem)] leading-none"
          >
            0
          </span>
          <span className="mt-2 ml-1 text-xl text-ember md:text-2xl">%</span>
        </p>
        <p className="absolute bottom-6 left-[var(--gutter)] font-mono text-xs tracking-wider text-muted uppercase md:bottom-8">
          {site.location}
        </p>

        <div className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden>
          <div className="intro-bar h-full origin-left bg-ember" />
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <IntroBridge />
    </>
  );
}
