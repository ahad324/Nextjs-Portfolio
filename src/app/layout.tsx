import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Muhammad Hussnain | Full-Stack Developer Portfolio",
  description:
    "Explore Hussnain's portfolio showcasing exceptional skills in React, Next.js, and modern web development. Discover projects, testimonials, and more.",
  keywords:
    "Hussnain, Full Stack developer, web developer, React, Next.js, Tailwind CSS, portfolio,expressjs, mongodb, nodejs, modern web design",
  authors: [
    {
      name: "Hussnain",
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
        <meta name="author" content="Hussnain" />
        <meta name="theme-color" content="#5355d6" />
        <link rel="canonical" href="https://hussnain-devsite.netlify.app" />
      </head>
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-gray-900 text-white antialiased font-sans"
        )}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
