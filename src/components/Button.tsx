import { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "white" | "dark";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  showArrow?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  showArrow = false,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors";

  const variantClasses = {
    primary: "bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white",
    secondary: "border border-white/15 text-white max-w-lg hover:bg-white/10",
    white: "bg-white text-gray-950 hover:bg-gray-100",
    dark: "bg-gray-900 text-white border border-gray-900 hover:bg-gray-800 w-max"
  };

  const sizeClasses = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6",
    lg: "h-14 px-8 text-lg"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showArrow && <ArrowUpRightIcon className="size-4" />}
    </button>
  );
};
