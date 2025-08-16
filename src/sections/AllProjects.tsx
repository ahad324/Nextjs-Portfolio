"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { SectionHeader } from "@/components/SectionHeader"
import { Button } from "@/components/Button"
import { NavigationButton } from "@/components/NavigationButton"

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

// Project Modal Component
const ProjectModal = ({
  project,
  isOpen,
  onClose,
  cardRef,
}: {
  project: (typeof allProjects)[0]
  isOpen: boolean
  onClose: () => void
  cardRef: React.RefObject<HTMLDivElement>
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [cardRect, setCardRect] = useState<DOMRect | null>(null)
  const [animationPhase, setAnimationPhase] = useState<"opening" | "open" | "closing">("opening")

  useEffect(() => {
    if (isOpen && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setCardRect(rect)
      setAnimationPhase("opening")

      document.body.style.overflow = "hidden"

      // Trigger opening animation
      setTimeout(() => {
        setAnimationPhase("open")
      }, 50)
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, cardRef])

  const handleClose = () => {
    setAnimationPhase("closing")
    setIsAnimating(true)

    setTimeout(() => {
      onClose()
      setIsAnimating(false)
      setCardRect(null)
      setAnimationPhase("opening")
    }, 500)
  }

  if (!isOpen || !cardRect) return null

  const modalWidth = Math.min(window.innerWidth - 32, 1000)
  const modalHeight = Math.min(window.innerHeight - 32, 700)

  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  const cardCenterX = cardRect.left + cardRect.width / 2
  const cardCenterY = cardRect.top + cardRect.height / 2

  const translateX = cardCenterX - centerX
  const translateY = cardCenterY - centerY

  const scaleX = cardRect.width / modalWidth
  const scaleY = cardRect.height / modalHeight

  const getTransformStyle = () => {
    switch (animationPhase) {
      case "opening":
        return {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
          opacity: 0.8,
        }
      case "open":
        return {
          transform: "translate(0px, 0px) scale(1, 1)",
          opacity: 1,
        }
      case "closing":
        return {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
          opacity: 0,
        }
      default:
        return {}
    }
  }

  return (
    <>
      {/* Enhanced Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-all duration-500 ease-out ${
          animationPhase === "closing" ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative overflow-hidden rounded-3xl bg-gray-800/95 backdrop-blur-xl border border-white/20 shadow-2xl pointer-events-auto"
          style={{
            width: modalWidth,
            height: modalHeight,
            transformOrigin: "center center",
            transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            ...getTransformStyle(),
          }}
        >
          {/* Grain Background Effect */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url(${grainImage.src})` }} />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20 cursor-pointer select-none"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Content - PERFECT responsive scrolling implementation */}
          <div
            className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden modal-scroll"
            style={{
              opacity: animationPhase === "open" ? 1 : 0,
              transition: "opacity 0.3s ease-out",
              transitionDelay: animationPhase === "open" ? "0.2s" : "0s",
            }}
          >
            {/* Image Section - Fixed height on large devices */}
            <div className="relative w-full lg:w-2/5 aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden flex-shrink-0">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Year Badge */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-emerald-500/90 text-white text-xs md:text-sm font-bold rounded-full select-text">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Content Section - PERFECT scrolling implementation */}
            <div className="flex-1 p-4 md:p-6 lg:p-8 xl:p-10 lg:modal-content-scroll relative z-10">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white leading-tight select-text cursor-text">
                {project.title}
              </h2>

              {/* Tech Stack */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-xs md:text-sm font-semibold text-white/60 uppercase tracking-wider mb-3 md:mb-4 select-text cursor-text">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-emerald-500/20 text-emerald-300 text-xs md:text-sm font-medium rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 hover:scale-105 transition-all duration-200 cursor-default select-text"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-xs md:text-sm font-semibold text-white/60 uppercase tracking-wider mb-3 md:mb-4 select-text cursor-text">
                  Project Overview
                </h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed select-text cursor-text hover:text-white/90 transition-colors duration-200">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons - Using Button Component for Consistency */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
                <Button
                  variant="primary"
                  size="sm"
                  showArrow
                  onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                  className="flex-1 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200"
                >
                  View Project
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleClose}
                  className="flex-1 hover:scale-[0.98] transition-all duration-200"
                >
                  Close Details
                </Button>
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
  const [cardRefs, setCardRefs] = useState<React.RefObject<HTMLDivElement>[]>([])
  const projectsPerPage = 3
  const totalPages = Math.ceil(allProjects.length / projectsPerPage)

  // Initialize card refs
  React.useEffect(() => {
    setCardRefs(Array.from({ length: allProjects.length }, () => React.createRef<HTMLDivElement>()))
  }, [])

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
    // Small delay to ensure DOM is ready for position calculation
    setTimeout(() => {
      setIsModalOpen(true)
    }, 50)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedProject(null)
    }, 400)
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
              const globalIndex = startIndex + index
              const cardRef = cardRefs[globalIndex]

              return (
                <div
                  key={project.title}
                  ref={cardRef}
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
                      <span className="px-2.5 py-1.5 bg-emerald-500/90 text-white text-xs font-medium rounded-full">
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

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
          cardRef={cardRefs[allProjects.findIndex((p) => p.title === selectedProject.title)] || React.createRef()}
        />
      )}
    </section>
  )
}
