import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import LoadingWrapper from "@/components/LoadingWrapper";
import SmoothScrolling from "@/components/SmoothScrolling";
import { SwissCursor } from "@/components/SwissCursor";
import { SystemSidebar } from "@/components/SystemSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono" 
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF3000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ahad-devsite.netlify.app"),
  title: "Abdul Ahad | Full-Stack Developer & Cybersecurity Expert",
  description:
    "Abdul Ahad is a high-performance Full-Stack Developer and Cybersecurity specialist based in Lahore, Pakistan. Expert in Next.js, React, and scalable system architecture.",
  keywords: [
    "Abdul Ahad",
    "Full-Stack Developer",
    "Cybersecurity Expert",
    "Next.js Developer",
    "React Developer",
    "Software Engineer Lahore",
    "Web Security",
    "System Architecture",
    "Performance Optimization",
    "MERN Stack",
    "Freelance Developer Pakistan",
  ],
  authors: [{ name: "Abdul Ahad" }],
  openGraph: {
    title: "Abdul Ahad | Full-Stack Developer & Cybersecurity Expert",
    description: "Abdul Ahad is a high-performance Full-Stack Developer and Cybersecurity specialist based in Lahore, Pakistan. Expert in Next.js, React, and scalable system architecture.",
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
    title: "Abdul Ahad | Full-Stack Developer",
    description: "Engineering scalable digital experiences with technical precision.",
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
  "jobTitle": "Full-Stack Web Developer & Cybersecurity Expert",
  "url": "https://ahad-devsite.netlify.app",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lahore",
    "addressCountry": "PK"
  },
  "sameAs": [
    "https://github.com/ahad324",
    "https://www.linkedin.com/in/abdul-ahad-a08263273",
    "https://www.upwork.com/freelancers/~0184f23bd97d54f1b3"
  ],
  "description": "Professional Full-Stack developer specializing in high-performance engineering, scalable Next.js applications, and digital security architecture.",
  "knowsAbout": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Systems Architecture", "Full-Stack Development", "Cybersecurity", "DevOps"]
};

import { ScrollArchitecture } from "@/components/ScrollArchitecture";

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
          spaceGrotesk.variable,
          ibmPlexMono.variable,
          "bg-white text-black antialiased font-sans cursor-none"
        )}
        suppressHydrationWarning
      >
        <SwissCursor />
        <SystemSidebar />
        <LoadingWrapper>
          <ScrollArchitecture>
            <SmoothScrolling>
              {children}
            </SmoothScrolling>
          </ScrollArchitecture>
        </LoadingWrapper>
      </body>
    </html>
  );
}

