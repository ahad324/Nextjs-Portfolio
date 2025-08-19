"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { SectionHeader } from "@/components/SectionHeader"
import { Button } from "@/components/Button"
import { NavigationButton } from "@/components/NavigationButton"
import Lenis from "lenis"

// Import project images
import transferx from "@/assets/images/transferx.png"
import docnow from "@/assets/images/docnow.png"
import gradegenie from "@/assets/images/gradegenie.png"
import homebudget from "@/assets/images/homebudget.png"
import bookCover from "@/assets/images/book-cover.png"
import map from "@/assets/images/map.png"
import grainImage from "@/assets/images/grain.jpg"

const allProjects = [
  {
    title: "AI-Driven Multi-Channel Data Automation",
    description:
      "A fully automated workflow that connects multiple platforms to analyze images, audio, and text, manage orders, and generate AI-driven responses in real time. Integrates seamlessly with TAKE APP, Google Docs, and AI models for end-to-end process automation with advanced machine learning algorithms.",
    link: "#",
    image: transferx,
    category: "AI/ML",
    tech: ["Python", "AI", "Automation", "API Integration"],
    year: "2024",
  },
  {
    title: "RefraX – Secure Healthcare Document Exchange",
    description:
      "A secure platform for exchanging healthcare documents, featuring encrypted storage, role-based access control, and GDPR compliance. Designed for privacy-focused interactions between providers and patients with a mobile-friendly interface and real-time notifications.",
    link: "#",
    image: docnow,
    category: "Healthcare",
    tech: ["React", "Node.js", "Security", "GDPR"],
    year: "2024",
  },
  {
    title: "Naqtax – Custom Full-Stack Web Solution",
    description:
      "A custom-built website delivering both frontend and backend functionality tailored to client specifications. Developed with modern technologies to ensure responsive design, optimized performance, and timely delivery with comprehensive testing and deployment pipelines.",
    link: "#",
    image: gradegenie,
    category: "Web Development",
    tech: ["Full-Stack", "React", "Node.js", "Custom"],
    year: "2024",
  },
  {
    title: "The Current – Real-Time News & Trends",
    description:
      "A dynamic web platform displaying daily news updates, trending topics, and curated insights. Built with a clean frontend and real-time API integrations for fresh, relevant content with advanced filtering and personalization features.",
    link: "#",
    image: homebudget,
    category: "News Platform",
    tech: ["React", "Real-time", "API", "News"],
    year: "2023",
  },
  {
    title: "Digital Library Management System",
    description:
      "A comprehensive digital library platform with advanced search, categorization, and user management features. Includes digital asset management, advanced search algorithms, and robust user management system with analytics and reporting capabilities.",
    link: "#",
    image: bookCover,
    category: "Library System",
    tech: ["Database", "Search", "Management", "Analytics"],
    year: "2023",
  },
  {
    title: "Interactive Map Visualization",
    description:
      "An interactive mapping solution with real-time data visualization and location-based services. Features real-time data integration, interactive UI components, and comprehensive location-based services with custom markers and routing.",
    link: "#",
    image: map,
    category: "Data Visualization",
    tech: ["Maps", "Real-time", "Interactive", "Location"],
    year: "2023",
  },
]

// Project Modal Component - REDESIGNED FOR BETTER UX
const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: {
  project: (typeof allProjects)[0]
  isOpen: boolean
  onClose: () => void
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = "0px"
      document.documentElement.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
      document.documentElement.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && scrollableRef.current) {
      lenisRef.current = new Lenis({
        wrapper: scrollableRef.current,
        content: scrollableRef.current.firstElementChild as HTMLElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2,
      })

      const raf = (time: number) => {
        lenisRef.current?.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleModalScroll = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  if (!isOpen) return null

  const modalWidth = Math.min(window.innerWidth - 32, 1400)
  const modalHeight = Math.min(window.innerHeight - 64, 900)

  return (
    <>
      {/* Enhanced Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 transition-opacity duration-300 ease-out"
        onClick={handleClose}
      />

      {/* Modal Container - REDESIGNED LAYOUT */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative overflow-hidden rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto animate-in fade-in-0 zoom-in-95 duration-300"
          style={{
            width: modalWidth,
            height: modalHeight,
          }}
          onWheel={handleModalScroll}
        >
          {/* Grain Background Effect */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${grainImage.src})` }}
          />

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 hover:scale-110 border border-white/20 cursor-pointer select-none group"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col lg:flex-row h-full">
            {/* Left Side - Image Section (40% on desktop) */}
            <div className="relative lg:w-2/5 h-64 lg:h-full overflow-hidden flex-shrink-0">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-full">
                  {project.year}
                </span>
                <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full border border-white/20">
                  {project.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                <h2 className="font-serif text-xl font-bold text-white leading-tight">{project.title}</h2>
              </div>
            </div>

            {/* Right Side - Content Section (60% on desktop) */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="hidden lg:block p-6 border-b border-white/10">
                <h2 className="font-serif text-2xl xl:text-3xl font-bold text-white leading-tight mb-3">
                  {project.title}
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-white/70 text-sm">
                    {project.category} • {project.year}
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    showArrow
                    onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
                    className="hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 bg-emerald-600 hover:bg-emerald-500"
                  >
                    View Live
                  </Button>
                </div>
              </div>

              <div
                ref={scrollableRef}
                className="flex-1 overflow-y-auto"
                style={{
                  minHeight: 0,
                  maxHeight: `calc(${modalHeight}px - 120px)`,
                }}
                onWheel={(e) => e.stopPropagation()}
              >
                <div className="p-6 space-y-6">
                  <div className="lg:hidden">
                    <Button
                      variant="primary"
                      size="sm"
                      showArrow
                      fullWidth
                      onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
                      className="hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 bg-emerald-600 hover:bg-emerald-500"
                    >
                      View Live Project
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m4 4h4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Project Overview
                    </h3>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <p className="text-white/90 text-sm lg:text-base leading-relaxed">{project.description}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-300 text-sm font-medium hover:bg-emerald-500/20 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Key Features
                    </h3>
                    <div className="space-y-2">
                      {project.category === "AI/ML" && (
                        <>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Advanced machine learning algorithms</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Real-time data processing and automation</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Multi-platform API integrations</span>
                          </div>
                        </>
                      )}
                      {project.category === "Healthcare" && (
                        <>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>GDPR compliant security measures</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Role-based access control system</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Encrypted document storage</span>
                          </div>
                        </>
                      )}
                      {(project.category === "Web Development" || project.category === "News Platform") && (
                        <>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Responsive design across all devices</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Optimized performance and loading</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Modern UI/UX design patterns</span>
                          </div>
                        </>
                      )}
                      {(project.category === "Library System" || project.category === "Data Visualization") && (
                        <>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Advanced search and filtering</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Real-time data visualization</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span>Comprehensive analytics dashboard</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Technical Highlights
                    </h3>
                    <div className="grid gap-3">
                      <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 p-3 rounded-r-lg">
                        <h4 className="text-white font-medium text-sm mb-1">Performance Optimization</h4>
                        <p className="text-white/70 text-xs">
                          Advanced caching and code splitting for optimal loading times.
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 p-3 rounded-r-lg">
                        <h4 className="text-white font-medium text-sm mb-1">Scalable Architecture</h4>
                        <p className="text-white/70 text-xs">
                          Microservices architecture for high traffic and easy maintenance.
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 p-3 rounded-r-lg">
                        <h4 className="text-white font-medium text-sm mb-1">Security First</h4>
                        <p className="text-white/70 text-xs">
                          Industry-standard security with encryption and secure authentication.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Project Impact
                    </h3>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <p className="text-white/90 text-sm leading-relaxed">
                        This project demonstrates advanced technical capabilities and real-world problem-solving skills.
                        Built with scalability and maintainability in mind, showcasing proficiency in modern full-stack
                        development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const AllProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedProject, setSelectedProject] = useState<(typeof allProjects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const projectsPerPage = 3
  const totalPages = Math.ceil(allProjects.length / projectsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (project: (typeof allProjects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const startIndex = currentPage * projectsPerPage
  const visibleProjects = allProjects.slice(startIndex, startIndex + projectsPerPage)

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
          description={"Explore my complete collection of projects showcasing diverse skills and technologies."}
        />

        <div className="mt-16 md:mt-24">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {visibleProjects.map((project, index) => {
              return (
                <div
                  key={project.title}
                  className="group relative overflow-hidden hover:scale-[1.02] transition-all duration-500 ease-out bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 hover:bg-white/10 bg-gray-800 rounded-3xl relative z-0 overflow-hidden after:z-10 after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none"
                >
                  {/* Grain Background Effect */}
                  <div
                    className="absolute inset-0 -z-10 opacity-5"
                    style={{ backgroundImage: `url(${grainImage.src})` }}
                  ></div>

                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-full">
                        {project.year}
                      </span>
                    </div>

                    {/* Hover Overlay with View Details Button */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={() => openModal(project)}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl border border-emerald-500 hover:border-emerald-600 transition-all duration-200 transform scale-90 group-hover:scale-100 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 cursor-pointer select-none hover:scale-105"
                      >
                        <span className="flex items-center gap-2">
                          View Details
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </span>
                      </button>
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
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    </div>

                    {/* View Project Button */}
                    <div className="mt-auto">
                      <a href={project.link} target="_blank" className="inline-block w-full" rel="noreferrer">
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
                </div>
              )
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

      {/* Project Modal - REDESIGNED */}
      {selectedProject && <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />}
    </section>
  )
}
