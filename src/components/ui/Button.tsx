import type { Route } from "next";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  solid: "bg-bone text-ink before:bg-ember",
  outline:
    "text-bone ring-1 ring-inset ring-line-strong hover:ring-transparent before:bg-bone hover:text-ink",
  ghost: "text-bone before:bg-ink-3",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[0.95rem]",
};

export function buttonClasses({
  variant = "solid",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(
    "group/btn relative isolate inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-[-0.01em] whitespace-nowrap",
    "transition-[color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] active:scale-[0.97]",
    // Fill that rises from the bottom on hover.
    "before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:rounded-[inherit] before:transition-transform before:duration-500 before:ease-[var(--ease-out-expo)] hover:before:translate-y-0",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

/** Label that rolls up to an identical copy on hover. */
export function RollingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

type Common = { variant?: Variant; size?: Size; icon?: ReactNode; children: ReactNode };

export function Button({
  variant,
  size,
  icon,
  children,
  className,
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      <RollingLabel>{children}</RollingLabel>
      {icon}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  icon,
  children,
  className,
  href,
  ...props
}: Common & Omit<ComponentProps<"a">, "href"> & { href: string }) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      <RollingLabel>{children}</RollingLabel>
      {icon}
    </>
  );
  const external = /^(https?:|mailto:|tel:)/.test(href) || props.download !== undefined;
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href as Route} className={classes} {...props}>
      {content}
    </Link>
  );
}
