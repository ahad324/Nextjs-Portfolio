import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import LoadingWrapper from "@/components/LoadingWrapper";
import SmoothScrolling from "@/components/SmoothScrolling";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF3000",
};

export const metadata: Metadata = {
  title: "Abdul Ahad — Interface Architect & Full-Stack Systems Engineer",
  description:
    "Expert in Swiss International Style UI and high-performance Next.js engineering. Specializing in modular systems, objective communication, and precision software architecture.",
  keywords:
    "Abdul Ahad, Interface Architect, Systems Engineer, Swiss Design, Next.js Portfolio, Full-Stack Developer, React Expert, Minimalist UI Design",
  authors: [{ name: "Abdul Ahad" }],
  openGraph: {
    title: "Abdul Ahad | Interface Architect",
    description: "Swiss-inspired development and high-precision UI engineering.",
    url: "https://ahad-devsite.netlify.app",
    siteName: "Abdul Ahad Portfolio",
    images: [
      {
        url: "favicon.ico",
        width: 1200,
        height: 630,
        alt: "Abdul Ahad Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Ahad | Systems Engineer",
    description: "Architecting objective digital experiences with precision and clarity.",
    images: ["favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ahad-devsite.netlify.app",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "google-site-verification": "_t_voY5kuMVEL4CtmBOVDuZ0j6_MRBKwBxG5mDwkK90",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abdul Ahad",
  "jobTitle": "Full-Stack Systems Engineer & Interface Architect",
  "url": "https://ahad-devsite.netlify.app",
  "sameAs": [
    "https://github.com/ahad324",
    "https://linkedin.com/in/yourprofile" // Replace with actual if known, or leave as placeholder
  ],
  "description": "Professional developer specializing in Swiss International Style UI design and high-performance Next.js applications.",
  "knowsAbout": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Swiss Design", "Systems Architecture"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={twMerge(
          inter.variable,
          "bg-white text-black antialiased font-sans"
        )}
        suppressHydrationWarning
      >
        <LoadingWrapper>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </LoadingWrapper>
      </body>
    </html>
  );
}

