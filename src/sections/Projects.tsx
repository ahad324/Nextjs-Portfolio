"use client";
import transferx from "@/assets/images/transferx.png";
import docnow from "@/assets/images/docnow.png";
import gradegenie from "@/assets/images/gradegenie.png";
import homebudget from "@/assets/images/homebudget.png";
import pixelarena from "@/assets/images/pixelarena.png"
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ElasticLine } from "@/components/ElasticLine";

const portfolioProjects = [
  {
    title: "PixelArena",
    company: "PixelArena",
    year: "2025",
    description: "A vibrant gaming platform designed to bring players together with retro-inspired aesthetics and dynamic themes.",
    link: "https://pixelarena.netlify.app/",
    image: pixelarena,
    results: ["Retro-Inspired Design", "Dynamic Theme System", "Immersive Experience"],
  },
  {
    title: "TransferX",
    company: "TransferX",
    year: "2024",
    description: "The ultimate offline file-sharing solution, meticulously crafted to make transferring files intuitive and secure.",
    link: "https://transferx.netlify.app/",
    image: transferx,
    results: ["Intuitive Interface", "Secure Transfers", "Offline Sharing"],
  },
  {
    title: "DocNow",
    company: "DocNow",
    year: "2024",
    description: "Easily upload, download, and manage files with real-time updates and admin controls.",
    link: "https://docnow.netlify.app",
    image: docnow,
    results: ["File Management", "Admin Controls", "Real-time Updates"],
  },
  {
    title: "GradeGenie",
    company: "GradeGenie",
    year: "2023",
    description: "A powerful tool for calculating GPA and tracking academic progress across devices.",
    link: "https://gradegenie.netlify.app",
    image: gradegenie,
    results: ["GPA Calculators", "Progress Tracking", "Responsive Design"],
  },
];

export const ProjectsSection = () => {
  return (
    <section className="py-24 border-t-4 border-black swiss-noise" id="projects">
      <div className="container">
        <SectionHeader
          number="02"
          eyebrow="Expertise"
          title="Case Studies"
          description="A systematic breakdown of technical solutions focused on high-performance engineering and architectural excellence."
        />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-0 border-t-4 border-l-4 border-black">
          {portfolioProjects.map((project, index) => (
            <motion.div 
              key={project.title} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="border-r-4 border-b-4 border-black bg-white group hover:bg-black transition-colors duration-500 relative overflow-hidden"
            >
              <div className="p-6 md:p-12 relative z-10">
                <div className="flex justify-between items-start gap-4 mb-12">
                  <div className="flex flex-col min-w-0">
                    <span className="text-swiss-accent font-black text-sm tracking-widest uppercase mb-2">
                      {project.company} / {project.year}
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-black group-hover:text-white transition-colors duration-200 break-words">
                      {project.title}
                    </h3>
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    className="p-3 md:p-5 border-4 border-black bg-white group-hover:bg-swiss-accent transition-all duration-300 flex-shrink-0 group/link"
                  >
                    <ArrowUpRight className="size-5 md:size-8 lg:size-10 text-black group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>

                <div className="aspect-video relative mb-12 overflow-hidden border-4 border-black bg-swiss-muted">
                  <Image
                    src={project.image}
                    alt={`${project.title} - High-performance web system architecture`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-none scale-100 group-hover:scale-105"
                  />
                </div>

                <p className="text-lg font-medium text-black/60 group-hover:text-white/60 mb-8 max-w-md">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.results.map((result) => (
                    <span 
                      key={result}
                      className="px-3 py-1 border-2 border-black text-xs font-bold uppercase tracking-widest group-hover:border-white group-hover:text-white"
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[120px]">
        <ElasticLine />
      </div>
    </section>
  );
};

