import Link from "next/link";
import { site } from "@/content/site";
import { navLinks } from "@/content/navigation";
import { LogoMark } from "@/components/brand/Logo";
import { ArrowUpRight } from "@/components/ui/Icons";
import { LocalTime } from "@/components/ui/LocalTime";
import { BackToTop } from "./BackToTop";
import { FooterWordmark } from "./FooterWordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-line bg-ink">
      <div className="container-x grid gap-12 pt-16 pb-10 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <LogoMark className="size-10 text-bone" />
          <p className="mt-6 max-w-sm text-lg text-bone-2">
            {site.role} building real-time, secure products. {site.tagline}
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="mb-5 eyebrow">Index</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    className="text-bone-2 transition-colors hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-5 eyebrow">Elsewhere</p>
            <ul className="space-y-2.5">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-bone-2 transition-colors hover:text-bone"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resume.href}
                  download={site.resume.fileName}
                  className="group inline-flex items-center gap-1 text-bone-2 transition-colors hover:text-bone"
                >
                  Résumé
                  <ArrowUpRight className="size-3.5 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="mb-5 eyebrow">Local time</p>
            <LocalTime className="font-mono text-bone-2 tabular-nums" />
            <p className="mt-2 text-sm text-muted">{site.location}</p>
          </div>
        </nav>
      </div>

      <FooterWordmark />

      <div className="container-x flex flex-col items-start justify-between gap-4 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © {year} {site.name}. Designed &amp; built from scratch.
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
