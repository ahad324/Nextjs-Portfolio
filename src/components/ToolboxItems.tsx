"use client";
import { TechIcon } from "@/components/TechIcon";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export const ToolboxItems = ({
  items,
  className,
  itemsWrapperClassName,
}: {
  items: {
    title: string;
    iconType?: React.ElementType;
    iconUrl?: string;
  }[];
  className?: string;
  itemsWrapperClassName?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex overflow-hidden",
        className
      )}
    >
      <div
        className={twMerge(
          "flex flex-none py-1 gap-4 pr-4 hover:[animation-play-state:paused]",
          itemsWrapperClassName
        )}
      >
        {[...new Array(2)].fill(0).map((_, idx) => (
          <Fragment key={idx}>
            {items.map((item) => (
              <div
                key={item.title}
                className="group relative inline-flex items-center gap-4 py-4 px-8 border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 cursor-default overflow-hidden"
              >
                {/* Mechanical Hover Accent */}
                <div className="absolute top-0 right-0 size-2 bg-swiss-accent translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                
                <div className="grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
                  <TechIcon component={item.iconType} iconUrl={item.iconUrl} />
                </div>
                <span className="font-black uppercase tracking-widest text-[10px] text-white/50 group-hover:text-white transition-colors duration-300">{item.title}</span>
                
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-swiss-accent/0 to-swiss-accent/0 group-hover:from-swiss-accent/5 group-hover:to-transparent transition-all duration-500" />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

