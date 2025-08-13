import transferx from "@/assets/images/transferx.png";
import docnow from "@/assets/images/docnow.png";
import gradegenie from "@/assets/images/gradegenie.png";
import homebudget from "@/assets/images/homebudget.png";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { AllProjectsSection } from "./AllProjects";

const portfolioProjects = [
  {
    title: "AI-Driven Multi-Channel Data Automation",
    company: "Year",
    year: "2025",
    description:
      "A fully automated workflow that connects multiple platforms to analyze images, audio, and text, manage orders, and generate AI-driven responses in real time. Integrates seamlessly with TAKE APP, Google Docs, and AI models for end-to-end process automation.",
    link: "#",
    image: transferx,
    results: [
      { title: "Automated Multi-Step Workflows" },
      { title: "Third-Party Platform Integrations" },
      { title: "AI-Powered Data Insights" },
    ],
  },
  {
    title: "RefraX – Secure Healthcare Document Exchange",
    company: "Year",
    year: "2025",
    description:
      "A secure platform for exchanging healthcare documents, featuring encrypted storage, role-based access control, and GDPR compliance. Designed for privacy-focused interactions between providers and patients with a mobile-friendly interface.",
    link: "#",
    image: docnow,
    results: [
      { title: "Encrypted Data Storage" },
      { title: "Role-Based Access Control" },
      { title: "GDPR-Compliant Document Sharing" },
    ],
  },
  {
    title: "Naqtax – Custom Full-Stack Web Solution",
    company: "Year",
    year: "2025",
    description:
      "A custom-built website delivering both frontend and backend functionality tailored to client specifications. Developed with modern technologies to ensure responsive design, optimized performance, and timely delivery.",
    link: "#",
    image: gradegenie,
    results: [
      { title: "Full-Stack Development" },
      { title: "Responsive UI Design" },
      { title: "On-Time Project Delivery" },
    ],
  },
  {
    title: "The Current – Real-Time News & Trends",
    company: "Year",
    year: "2025",
    description:
      "A dynamic web platform displaying daily news updates, trending topics, and curated insights. Built with a clean frontend and real-time API integrations for fresh, relevant content.",
    link: "#",
    image: homebudget,
    results: [
      { title: "Live News Feed Integration" },
      { title: "Trending Topics Display" },
      { title: "Clean and Responsive UI" },
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
                  <div className="mt-8">
                    <a href={project.link} target="_blank">
                      <Button variant="white" size="md" showArrow>
                        Visit Live Site
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="rounded-tl-3xl rounded-tr-3xl md:rounded-tl-3xl mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <AllProjectsSection />
    </section>
  );
};
