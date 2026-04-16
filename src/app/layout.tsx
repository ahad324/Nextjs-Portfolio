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
  title: "Abdul Ahad | Full Stack Developer",
  description:
    "Swiss International Style Portfolio. Engineer focusing on objective clarity, performant solutions, and functional excellence.",
  keywords:
    "Abdul Ahad, Swiss Design, Portfolio, Lead Developer, React, Next.js, Tailwind CSS, Typography",
  authors: [
    {
      name: "Abdul Ahad",
    },
  ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <meta name="google-site-verification" content="_t_voY5kuMVEL4CtmBOVDuZ0j6_MRBKwBxG5mDwkK90" />
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

