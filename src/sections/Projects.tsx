"use client";
import transferx from "@/assets/images/transferx.png";
import docnow from "@/assets/images/docnow.png";
import gradegenie from "@/assets/images/gradegenie.png";
import homebudget from "@/assets/images/homebudget.png";
import pixelarena from "@/assets/images/pixelarena.png"
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";

const portfolioProjects = [
  {
    title: "PixelArena",
    company: "PixelArena",
    year: "2025",
    description:
      "A vibrant gaming platform designed to bring players together with retro-inspired aesthetics, dynamic themes, and an immersive experience tailored for the modern web.",
    link: "https://pixelarena.netlify.app/",
    image: pixelarena,
    results: [
      { title: "Retro-Inspired Design" },
      { title: "Dynamic Theme System" },
      { title: "Immersive Player Experience" },
    ],
  },
  {
    title: "TransferX",
    company: "TransferX",
    year: "2024",
    description:
      "The ultimate offline file-sharing solution, meticulously crafted to make transferring files across your local network intuitive, seamless, and secure.",
    link: "https://transferx.netlify.app/",
    image: transferx,
    results: [
      { title: "Intuitive User Interface" },
      { title: "Secure File Transfers" },
      { title: "Effortless Sharing Across Networks" },
    ],
  },
  {
    title: "DocNow",
    company: "DocNow",
    year: "2024",
    description:
      "Easily upload, download, and manage files with real-time updates and admin controls. Built with a sleek drag-and-drop interface for effortless file sharing.",
    link: "https://docnow.netlify.app",
    image: docnow,
    results: [
      { title: "File Upload and Download" },
      { title: "Admin Authentication" },
      { title: "Real-time Updates" },
    ],
  },
  {
    title: "GradeGenie",
    company: "GradeGenie",
    year: "2023",
    description:
      "A powerful tool for calculating GPA, CGPA, SGPA, and more, all in one place. Customize your inputs, track your progress, and enjoy a seamless experience across devices.",
    link: "https://gradegenie.netlify.app",
    image: gradegenie,
    results: [
      { title: "Advanced GPA Calculators" },
      { title: "Customizable Inputs" },
      { title: "Responsive Design" },
    ],
  },
  {
    title: "HomeBudget",
    company: "HomeBudget",
    year: "2024",
    description:
      "A smart expense tracking and budgeting tool designed to help users manage their monthly income, control spending habits, and visualize savings goals. Built with a clean, user-friendly interface and real-time calculations for seamless financial planning.",
    link: "https://homebudget-react.netlify.app",
    image: homebudget,
    results: [
      { title: "Monthly Income & Expense Tracking" },
      { title: "Interactive Budget Visualizations" },
      { title: "Responsive and Intuitive UI" },
    ],
  },
];

export const ProjectsSection = () => {
  return (
    <section className="pb-16 lg:py-24" id="projects">
      <div className="container">
        <SectionHeader
          eyebrow={"Real-world Results"}
          title={" Featured Projects"}
          description={
            "See how i transformed concepts into engaging digital experiences."
          }
        />
        <div className="mt-10 md:mt-20 flex flex-col gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{ top: `calc(64px + ${projectIndex * 40}px` }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-4xl mt-2 md:mt-5">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li
                        key={result.title}
                        className="flex items-center gap-2 text-sm md:text-base text-white/50"
                      >
                        <CheckCircleIcon className="size-5 md:size-6" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={project.link} target="_blank">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8"
                    >
                      <span>Visit Live Site</span>
                      <ArrowUpRightIcon className="size-4" />
                    </motion.button>
                  </a>
                </div>
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="rounded-tl-3xl rounded-tr-3xl md:rounded-tl-3xl h-full w-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
