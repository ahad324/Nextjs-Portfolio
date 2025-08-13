"use client";
import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

// Import project images
import transferx from "@/assets/images/transferx.png";
import docnow from "@/assets/images/docnow.png";
import gradegenie from "@/assets/images/gradegenie.png";
import homebudget from "@/assets/images/homebudget.png";
import bookCover from "@/assets/images/book-cover.png";
import map from "@/assets/images/map.png";

const allProjects = [
  {
    title: "AI-Driven Multi-Channel Data Automation",
    description:
      "A fully automated workflow that connects multiple platforms to analyze images, audio, and text, manage orders, and generate AI-driven responses in real time. Integrates seamlessly with TAKE APP, Google Docs, and AI models for end-to-end process automation with advanced machine learning algorithms.",
    link: "#",
    image: transferx,
  },
  {
    title: "RefraX – Secure Healthcare Document Exchange",
    description:
      "A secure platform for exchanging healthcare documents, featuring encrypted storage, role-based access control, and GDPR compliance. Designed for privacy-focused interactions between providers and patients with a mobile-friendly interface and real-time notifications.",
    link: "#",
    image: docnow,
  },
  {
    title: "Naqtax – Custom Full-Stack Web Solution",
    description:
      "A custom-built website delivering both frontend and backend functionality tailored to client specifications. Developed with modern technologies to ensure responsive design, optimized performance, and timely delivery with comprehensive testing and deployment pipelines.",
    link: "#",
    image: gradegenie,
  },
  {
    title: "The Current – Real-Time News & Trends",
    description:
      "A dynamic web platform displaying daily news updates, trending topics, and curated insights. Built with a clean frontend and real-time API integrations for fresh, relevant content with advanced filtering and personalization features.",
    link: "#",
    image: homebudget,
  },
  {
    title: "Digital Library Management System",
    description:
      "A comprehensive digital library platform with advanced search, categorization, and user management features. Includes digital asset management, advanced search algorithms, and robust user management system with analytics and reporting capabilities.",
    link: "#",
    image: bookCover,
  },
  {
    title: "Interactive Map Visualization",
    description:
      "An interactive mapping solution with real-time data visualization and location-based services. Features real-time data integration, interactive UI components, and comprehensive location-based services with custom markers and routing.",
    link: "#",
    image: map,
  },
];

export const AllProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const projectsPerPage = 2;
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const toggleExpanded = (projectIndex: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectIndex)) {
      newExpanded.delete(projectIndex);
    } else {
      newExpanded.add(projectIndex);
    }
    setExpandedProjects(newExpanded);
  };

  const startIndex = currentPage * projectsPerPage;
  const visibleProjects = allProjects.slice(startIndex, startIndex + projectsPerPage);

  return (
    <section className="py-16 lg:py-24" id="all-projects">
      <div className="container">
        <SectionHeader
          eyebrow={"Complete Portfolio"}
          title={"All Projects"}
          description={
            "Explore my complete collection of projects showcasing diverse skills and technologies."
          }
        />

        <div className="mt-12 md:mt-20">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {visibleProjects.map((project, index) => {
              const globalIndex = startIndex + index;
              const isExpanded = expandedProjects.has(globalIndex);
              const shortDescription = project.description.split(' ').slice(0, 20).join(' ') + '...';

              return (
                <Card
                  key={project.title}
                  className="group relative overflow-hidden hover:scale-[1.02] transition-all duration-300 ease-out"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-3 text-white group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description with inline Show More/Less and consistent collapsed height */}
                    <div className="mb-4">
                      <div className="relative">
                        <p className={`text-white/70 text-sm leading-relaxed pr-14 ${!isExpanded ? "line-clamp-2" : ""}`}>
                          {project.description}
                        </p>
                        {project.description.length > 80 && (
                          <button
                            onClick={() => toggleExpanded(globalIndex)}
                            className="absolute bottom-0 right-0 text-[11px] text-white/60 hover:text-white/80 underline underline-offset-2 bg-black/0"
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* View Project Button - themed like site (white button) */}
                    <a href={project.link} target="_blank" className="inline-block w-full mt-4">
                      <button className="bg-white text-gray-950 h-10 w-full px-5 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                        <span>View Project</span>
                        <ArrowUpRightIcon className="size-4" />
                      </button>
                    </a>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Card>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-16">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 group"
            >
              <ArrowLeftIcon className="size-5 group-hover:translate-x-[-2px] transition-transform" />
            </button>

            {/* Pagination Dots - per page */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${currentPage === index ? "bg-white" : "bg-white/20 hover:bg-white/40"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 group"
            >
              <ArrowRightIcon className="size-5 group-hover:translate-x-[2px] transition-transform" />
            </button>
          </div>

          {/* Page Indicator */}
          <div className="text-center mt-6">
            <span className="text-white/50 text-sm">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
