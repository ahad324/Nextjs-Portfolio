import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";

interface NavigationButtonProps extends ComponentPropsWithoutRef<"button"> {
  direction: "left" | "right";
  size?: "sm" | "md" | "lg";
}

export const NavigationButton = ({
  direction,
  size = "md",
  className,
  disabled,
  ...props
}: NavigationButtonProps) => {
  const baseClasses = "flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 group";

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14"
  };

  const iconSize = {
    sm: "size-4",
    md: "size-5",
    lg: "size-5"
  };

  const Icon = direction === "left" ? ArrowLeftIcon : ArrowRightIcon;
  const transformClass = direction === "left" ? "group-hover:translate-x-[-2px]" : "group-hover:translate-x-[2px]";

  return (
    <button
      className={twMerge(
        baseClasses,
        sizeClasses[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      <Icon className={twMerge(iconSize[size], "transition-transform", transformClass)} />
    </button>
  );
};
