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
    iconType: React.ElementType;
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
          "flex flex-none py-1 gap-4 pr-4",
          itemsWrapperClassName
        )}
      >
        {[...new Array(2)].fill(0).map((_, idx) => (
          <Fragment key={idx}>
            {items.map((item) => (
              <div
                key={item.title}
                className="inline-flex items-center gap-4 py-4 px-6 border-4 border-black bg-white hover:bg-black hover:text-white transition-colors duration-200 cursor-default"
              >
                <TechIcon component={item.iconType} />
                <span className="font-black uppercase tracking-tighter text-sm">{item.title}</span>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

