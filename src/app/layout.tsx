import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Abdul Ahad" />
        <meta name="theme-color" content="#5355d6" />
        <link rel="canonical" href="https://ahad-devsite.netlify.app" />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-gray-900 text-white antialiased font-sans"
        )}
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
