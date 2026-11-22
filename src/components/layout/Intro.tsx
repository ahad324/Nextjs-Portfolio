import { site } from "@/content/site";
import { IntroBridge } from "./IntroBridge";

/**
 * Loading screen with real progress.
 *
 * It is plain HTML + CSS + a tiny inline script, so it is painted in the very
 * first frame and starts tracking before any app JavaScript downloads. Progress
 * reflects actual milestones, and the label names what is currently loading:
 *
 *   document parsed → fonts → images & styles (window load) → app hydrated
 *   → 3D scene built (or skipped on devices that don't run it)
 *
 * When everything is in (and the mark has finished drawing), it adds
 * `intro-done` to <html>, fires `intro:done`, and the curtain lifts via CSS.
 * Capped at 8 s so a slow 3D download never holds the page hostage.
 *
 * Skipped entirely (class `intro-seen`, set by the boot script) for returning
 * visitors in the same session, deep links, low-end devices and reduced motion.
 */
const STEPS = [
  { id: "dom", label: "Loading page", weight: 15 },
  { id: "fonts", label: "Loading fonts", weight: 15 },
  { id: "load", label: "Loading images", weight: 30 },
  { id: "app", label: "Starting app", weight: 20 },
  { id: "scene", label: "Building 3D scene", weight: 20 },
] as const;

const script = `(function(){
var d=document,h=d.documentElement,w=window;
if(h.classList.contains('intro-seen'))return;
var steps=${JSON.stringify(STEPS)},done={},shown=0,start=performance.now(),MIN=900,CAP=8000,finished=false;
function el(id){return d.getElementById(id)}
function target(){var t=0;for(var i=0;i<steps.length;i++)if(done[steps[i].id])t+=steps[i].weight;return t}
function pending(){for(var i=0;i<steps.length;i++)if(!done[steps[i].id])return steps[i].label;return 'Ready'}
function mark(id){done[id]=true}
function finish(){if(finished)return;finished=true;
  if(!done.app)h.classList.add('reveal-all');
  try{sessionStorage.setItem('intro-seen','1')}catch(e){}
  h.classList.add('intro-done');w.dispatchEvent(new Event('intro:done'));}
function frame(now){if(finished)return;
  var t=target(),elapsed=now-start;
  if(elapsed>CAP){t=100;}
  shown+=(t-shown)*0.12;if(t-shown<0.4)shown=t;
  var n=Math.round(shown),bar=el('intro-bar'),num=el('intro-num'),lab=el('intro-label');
  if(bar)bar.style.transform='scaleX('+(shown/100)+')';
  if(num)num.textContent=(n<10?'00':n<100?'0':'')+n;
  if(lab)lab.textContent=elapsed>CAP?'Ready':pending();
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
        className="intro fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink-2"
        role="progressbar"
        aria-label={`Loading ${site.name}`}
        aria-valuemin={0}
        aria-valuemax={100}
      >
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
        <p className="mt-8 text-sm font-medium tracking-[0.3em] text-bone-2 uppercase">
          {site.name}
        </p>
        <div className="absolute inset-x-[var(--gutter)] bottom-8 flex items-end justify-between gap-6 font-mono text-xs text-muted">
          <span id="intro-label">Loading page</span>
          <span id="intro-num" className="tabular-nums">
            000
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-line">
          <div id="intro-bar" className="h-full origin-left scale-x-0 bg-ember" />
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <IntroBridge />
    </>
  );
}
