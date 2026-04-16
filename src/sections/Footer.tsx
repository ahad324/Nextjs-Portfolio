"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { title: "Github", href: "https://github.com/ahad324/" },
  { title: "LinkedIn", href: "https://www.linkedin.com/in/abdul-ahad-a08263273" },
  { title: "Upwork", href: "https://www.upwork.com/freelancers/~0184f23bd97d54f1b3" },
];

export const Footer = () => {
  return (
    <footer className="border-t-4 border-black bg-white relative z-0">
      <div className="container px-0 md:px-0 lg:px-0">
        <div className="flex flex-col lg:flex-row items-stretch">
          
          {/* Brand Block */}
          <div className="lg:w-1/2 p-12 lg:p-24 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-black text-white">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">AA</h2>
            <p className="font-bold uppercase tracking-widest text-swiss-accent text-sm">Full Stack Developer</p>
          </div>

          {/* Links Block */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
              {footerLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  className="flex items-center justify-between p-12 border-b-4 border-black md:even:border-l-0 md:border-l-4 first:border-l-0 hover:bg-black hover:text-white transition-colors duration-300 group"
                >
                  <span className="text-2xl font-black uppercase tracking-tighter transition-colors">{link.title}</span>
                  <ArrowUpRight className="size-8 group-hover:translate-x-1 group-hover:translate-y--1 transition-transform" />
                </Link>
              ))}
              <div className="p-12 border-b-4 border-black border-l-4 hidden md:block bg-swiss-muted swiss-grid-pattern" />
            </div>
            
            {/* Copyright Area */}
            <div className="p-12 flex justify-between items-center bg-white">
              <span className="font-bold uppercase tracking-widest text-xs">
                &copy; {new Date().getFullYear()} / ALL RIGHTS RESERVED
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

