"use client";
import { Fragment } from "react";

const words = [
  "Performant",
  "Accessible",
  "Secure",
  "Interactive",
  "Scalable",
  "User Friendly",
  "Responsive",
  "Maintainable",
  "Search Optimized",
  "Usable",
  "Reliable",
];

export const TapeSection = () => {
  return (
    <div className="py-24 overflow-x-clip bg-white border-y-4 border-black">
      <div className="bg-swiss-accent border-y-4 border-black -rotate-1 -mx-4 py-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:30s]">
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {words.map((word) => (
                  <div key={word} className="inline-flex items-center gap-8">
                    <span className="text-black uppercase font-black text-2xl tracking-tighter">
                      {word}
                    </span>
                    <div className="size-4 bg-black rotate-45" />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

