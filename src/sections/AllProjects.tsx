"use client";
import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { NavigationButton } from "@/components/NavigationButton";

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
    category: "AI/ML",
    tech: ["Python", "AI", "Automation", "API Integration"],
    year: "2024"
  },
  {
    title: "RefraX – Secure Healthcare Document Exchange",
    description:
      "A secure platform for exchanging healthcare documents, featuring encrypted storage, role-based access control, and GDPR compliance. Designed for privacy-focused interactions between providers and patients with a mobile-friendly interface and real-time notifications.",
    link: "#",
    image: docnow,
    category: "Healthcare",
    tech: ["React", "Node.js", "Security", "GDPR"],
    year: "2024"
  },
  {
    title: "Naqtax – Custom Full-Stack Web Solution",
    description:
      "A custom-built website delivering both frontend and backend functionality tailored to client specifications. Developed with modern technologies to ensure responsive design, optimized performance, and timely delivery with comprehensive testing and deployment pipelines.",
    link: "#",
    image: gradegenie,
    category: "Web Development",
    tech: ["Full-Stack", "React", "Node.js", "Custom"],
    year: "2024"
  },
  {
    title: "The Current – Real-Time News & Trends",
    description:
      "A dynamic web platform displaying daily news updates, trending topics, and curated insights. Built with a clean frontend and real-time API integrations for fresh, relevant content with advanced filtering and personalization features.",
    link: "#",
    image: homebudget,
    category: "News Platform",
    tech: ["React", "Real-time", "API", "News"],
    year: "2023"
  },
  {
    title: "Digital Library Management System",
    description:
      "A comprehensive digital library platform with advanced search, categorization, and user management features. Includes digital asset management, advanced search algorithms, and robust user management system with analytics and reporting capabilities.",
    link: "#",
    image: bookCover,
    category: "Library System",
    tech: ["Database", "Search", "Management", "Analytics"],
    year: "2023"
  },
  {
    title: "Interactive Map Visualization",
    description:
      "An interactive mapping solution with real-time data visualization and location-based services. Features real-time data integration, interactive UI components, and comprehensive location-based services with custom markers and routing.",
    link: "#",
    image: map,
    category: "Data Visualization",
    tech: ["Maps", "Real-time", "Interactive", "Location"],
    year: "2023"
  },
];

export const AllProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const projectsPerPage = 3;
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
    <section className="pt-40 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden" id="all-projects">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-sky-950/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
      
             <div className="container relative z-0">
        <SectionHeader
          eyebrow={"Complete Portfolio"}
          title={"All Projects"}
          description={
            "Explore my complete collection of projects showcasing diverse skills and technologies."
          }
        />

        <div className="mt-16 md:mt-24">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {visibleProjects.map((project, index) => {
              const globalIndex = startIndex + index;
              const isExpanded = expandedProjects.has(globalIndex);

              return (
                <Card
                  key={project.title}
                  className="group relative overflow-hidden hover:scale-[1.02] transition-all duration-500 ease-out bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 hover:bg-white/10"
                >
                  {/* Project Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1.5 bg-emerald-500/90 text-white text-xs font-medium rounded-full">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 lg:p-7">
                    {/* Title */}
                    <h3 className="font-serif text-xl lg:text-2xl font-semibold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 bg-white/10 text-white/80 text-xs font-medium rounded-md border border-white/20 hover:bg-white/20 hover:text-white transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <div className="relative">
                        <p className={`text-white/70 text-sm leading-relaxed pr-16 transition-all duration-300 ${
                          !isExpanded ? "line-clamp-3" : ""
                        }`}>
                          {project.description}
                        </p>
                        {project.description.length > 120 && (
                          <button
                            onClick={() => toggleExpanded(globalIndex)}
                            className="absolute bottom-0 right-0 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200 hover:underline underline-offset-2"
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* View Project Button */}
                    <div className="mt-auto">
                      <a href={project.link} target="_blank" className="inline-block w-full">
                        <Button 
                          variant="white" 
                          size="sm" 
                          showArrow 
                          fullWidth
                          className="group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300"
                        >
                          View Project
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Enhanced Hover Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/30 rounded-2xl transition-all duration-500 pointer-events-none" />
                </Card>
              );
            })}
          </div>

          {/* Enhanced Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-20">
            <NavigationButton
              direction="left"
              size="lg"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="hover:scale-110 transition-transform duration-200"
            />

            {/* Modern Pagination */}
            <div className="flex gap-3">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === index 
                      ? "bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/25" 
                      : "bg-white/30 hover:bg-white/50 hover:scale-110"
                  }`}
                />
              ))}
            </div>

            <NavigationButton
              direction="right"
              size="lg"
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="hover:scale-110 transition-transform duration-200"
            />
          </div>

          {/* Enhanced Page Indicator */}
          <div className="text-center mt-8">
            <span className="text-white/60 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
