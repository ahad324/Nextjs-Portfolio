import type { Metadata, Viewport } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import LoadingWrapper from "@/components/LoadingWrapper";
import SmoothScrolling from "@/components/SmoothScrolling";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5355d6",
};

export const metadata: Metadata = {
  title: "Abdul Ahad | Full-Stack Developer Portfolio",
  description:
    "Explore Abdul Ahad's portfolio showcasing exceptional skills in React, Next.js, and modern web development. Discover projects, testimonials, and more.",
  keywords:
    "Abdul Ahad, Full Stack developer, web developer, React, Next.js, Tailwind CSS, portfolio,expressjs, mongodb, nodejs, modern web design",
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
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-gray-900 text-white antialiased font-sans"
        )}
      >
        {/* <div className="fixed inset-0 z-[60] pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_0%,transparent_20%,transparent_80%,rgba(0,0,0,0.6)_100%)]" /> */}
        <LoadingWrapper>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </LoadingWrapper>
      </body>
    </html>
  );
}
