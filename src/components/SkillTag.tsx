import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface SkillTagProps extends ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
  variant?: "default" | "pill";
}

export const SkillTag = ({
  children,
  variant = "default",
  className,
  ...props
}: SkillTagProps) => {
  const baseClasses = "text-sm text-white/80 transition-all duration-200";

  const variantClasses = {
    default: "px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20",
    pill: "px-3 py-1 bg-white/10 rounded-full"
  };

  return (
    <span
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
