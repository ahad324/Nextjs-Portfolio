import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import LoadingWrapper from "@/components/LoadingWrapper";
import SmoothScrolling from "@/components/SmoothScrolling";
import { SwissCursor } from "@/components/SwissCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF3000",
};

export const metadata: Metadata = {
  title: "Abdul Ahad | Full-Stack Developer Portfolio",
  description:
    "I specialize in transforming designs into functional, high-performing web applications. Let's discuss your next project.",
  keywords:
    "Abdul Ahad, Full-Stack Developer, Systems Engineer, Next.js Portfolio, React Expert, Software Architecture, Web Development",
  authors: [{ name: "Abdul Ahad" }],
  openGraph: {
    title: "Abdul Ahad | Full-Stack Developer Portfolio",
    description: "I specialize in transforming designs into functional, high-performing web applications.",
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
  "jobTitle": "Full-Stack Developer & Systems Engineer",
  "url": "https://ahad-devsite.netlify.app",
  "sameAs": [
    "https://github.com/ahad324",
    "https://linkedin.com/in/yourprofile" 
  ],
  "description": "Professional developer specializing in high-performance Full-Stack engineering and scalable Next.js applications.",
  "knowsAbout": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Systems Architecture", "Full-Stack Development"]
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
          "bg-white text-black antialiased font-sans cursor-none"
        )}
        suppressHydrationWarning
      >
        <SwissCursor />
        <LoadingWrapper>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </LoadingWrapper>
      </body>
    </html>
  );
}

