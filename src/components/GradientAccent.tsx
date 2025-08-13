import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface GradientAccentProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "line" | "bar";
  size?: "sm" | "md" | "lg";
}

export const GradientAccent = ({
  variant = "line",
  size = "md",
  className,
  ...props
}: GradientAccentProps) => {
  const baseClasses = "bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full";

  const variantClasses = {
    line: "h-0.5",
    bar: "h-6 w-1"
  };

  const sizeClasses = {
    sm: variant === "line" ? "w-12" : "w-0.5 h-4",
    md: variant === "line" ? "w-16" : "w-1 h-6",
    lg: variant === "line" ? "w-24" : "w-1 h-8"
  };

  return (
    <div
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};
