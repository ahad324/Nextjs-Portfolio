"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { navLinks, sections } from "@/content/navigation";
import { site } from "@/content/site";
import { Wordmark } from "@/components/brand/Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { buttonClasses, RollingLabel } from "@/components/ui/Button";
import { LocalTime } from "@/components/ui/LocalTime";
import { socialIcons } from "@/components/ui/Icons";
import { StatusDot } from "@/components/ui/SectionLabel";
import { useScrollTo } from "@/lib/scroll";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrollTo = useScrollTo();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const lenis = useLenis();

  // Close the mobile menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) setHidden(y > last && y > 240);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section indicator (home only).
  useEffect(() => {
    if (!isHome) return;
    const ids = navLinks.map((link) => link.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const current = isHome ? active : null;

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) return;
    event.preventDefault();
    setOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-out-expo)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled && !open
              ? "border-line bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        />
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link
            href="/"
            onClick={(event) => go(event, sections.hero)}
            className="relative z-10 -m-2 flex items-center rounded-full p-2 transition-opacity hover:opacity-80"
            aria-label={`${site.name} — home`}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-ink-2/60 p-1 backdrop-blur-md">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    onClick={(event) => go(event, link.id)}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      current === link.id ? "text-ink" : "text-bone-2 hover:text-bone",
                    )}
                    aria-current={current === link.id ? "location" : undefined}
                  >
                    {current === link.id && (
                      <m.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-bone"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-5">
            <LocalTime className="hidden font-mono text-xs tracking-wider text-bone-2 tabular-nums lg:block" />
            <div className="hidden md:block">
              <Magnetic strength={0.25}>
                <Link
                  href={`/#${sections.contact}`}
                  onClick={(event) => go(event, sections.contact)}
                  className={buttonClasses({ size: "md" })}
                >
                  <StatusDot />
                  <RollingLabel>Get in touch</RollingLabel>
                </Link>
              </Magnetic>
            </div>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="relative flex size-11 items-center justify-center rounded-full border border-line-strong bg-ink-2/60 backdrop-blur-md md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-4.5 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "rotate-45" : "-translate-y-[3.5px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-4.5 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "-rotate-45" : "translate-y-[3.5px]",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-[var(--gutter)] pt-[calc(var(--header-h)+2rem)] pb-8 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="flex flex-col gap-1">
                {[{ label: "Home", id: sections.hero }, ...navLinks].map((link, index) => (
                  <li key={link.id} className="overflow-hidden py-0.5">
                    <m.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.25 + index * 0.06,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.id === sections.hero ? "/" : `/#${link.id}`}
                        onClick={(event) => go(event, link.id)}
                        className="flex items-baseline gap-4 py-1 text-[clamp(2.75rem,13vw,4.5rem)] leading-[1] font-semibold tracking-[-0.045em]"
                      >
                        <span className="font-mono text-xs font-normal tracking-normal text-ember">
                          0{index + 1}
                        </span>
                        {link.label}
                      </Link>
                    </m.div>
                  </li>
                ))}
              </ul>
            </nav>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col gap-5 border-t border-line pt-6"
            >
              <a href={`mailto:${site.email}`} className="text-lg">
                {site.email}
              </a>
              <div className="flex items-center justify-between">
                <ul className="flex gap-3">
                  {site.socials.map((social) => {
                    const Icon = socialIcons[social.label];
                    return (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex size-11 items-center justify-center rounded-full border border-line-strong"
                          aria-label={social.label}
                        >
                          <Icon className="size-4.5" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <LocalTime className="font-mono text-xs text-bone-2" />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
