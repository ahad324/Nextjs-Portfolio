"use client";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { m } from "framer-motion";

export const Card = ({
  className,
  children,
  ...other
}: ComponentPropsWithoutRef<typeof m.div> & { children: React.ReactNode }) => {
  return (
    <m.div
      className={twMerge(
        "bg-white border-4 border-black relative z-0 overflow-hidden rounded-none swiss-noise",
        "transition-colors duration-200",
        className
      )}
      {...other}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </m.div>
  );
};

