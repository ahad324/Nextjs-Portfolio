import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import { brand, site } from "@/content/site";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/layout/Intro";
import { Cursor } from "@/components/motion/Cursor";
import { SceneLoader } from "@/components/three/SceneLoader";
import { SceneDirector } from "@/components/three/SceneDirector";
import { cn } from "@/lib/cn";
import "@/styles/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: brand.ink,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.pitch,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.pitch,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: site.verification.google },
  formatDetection: { telephone: false, email: false, address: false },
};

/**
 * Runs before paint: flags JS for reveal styles, flags low-end devices (`low`:
 * ≤4 cores, ≤4 GB RAM, data-saver or 2G) and skips the intro for returning or
 * low-end visitors.
 */
const bootScript = `(function(){var d=document.documentElement,n=navigator;d.classList.add('js');try{var c=n.connection||{},low=(n.hardwareConcurrency||8)<=4||(n.deviceMemory||8)<=4||c.saveData||/2g/.test(c.effectiveType||'');if(low)d.classList.add('low');if(low||location.hash||sessionStorage.getItem('intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-seen')}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn(geist.variable, geistMono.variable, instrument.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[200] -translate-y-24 rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <Intro />
          <SceneLoader />
          <SceneDirector />
          <Header />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
