"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, MapPin, Calendar, ExternalLink } from "lucide-react";
import { ElasticLine } from "@/components/ElasticLine";
import { useLoading } from "@/context/LoadingContext";

const experiences = [
  {
    company: "FLOTY",
    role: "Full-stack Developer",
    duration: "Feb 2026 - Present",
    location: "Lahore, Pakistan",
    type: "Full-time",
    link: "https://floty.ai/",
    description: "Architecting high-performance AI-driven systems and streamlining end-to-end web architectures.",
    tech: ["Next.js", "AI Integration", "FastAPI", "PostgreSQL"]
  },
  {
    company: "INNOVENT Tech",
    role: "Full/MERN Stack Developer",
    duration: "Jul 2025 - Sep 2025",
    location: "Lahore, Pakistan",
    type: "Internship",
    link: "https://www.innovent.io/",
    description: "Engineered scalable modular components and optimized backend service layers for client-facing applications.",
    tech: ["MERN Stack", "Express.js", "MongoDB", "Redux"]
  }
];

export const ExperienceSection = () => {
    const { isLoading } = useLoading();
    const isReady = !isLoading;

    return (
        <section className="py-24 border-t-4 border-black swiss-grid-pattern relative overflow-hidden" id="experience">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                >
                    <SectionHeader
                        number="03"
                        eyebrow="Progression"
                        title="Engineering Ledger"
                        description="A chronological log of professional contributions, focused on building robust system architectures and high-impact digital solutions."
                    />
                </motion.div>

                <div className="mt-24 relative">
                    {/* Vertical Timeline Line - Hidden on small mobile, visible on tablet+ */}
                    <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-[4px] bg-black hidden sm:block -translate-x-1/2 opacity-10" />

                    <div className="flex flex-col gap-12 sm:gap-24">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                transition={{ duration: 1, delay: index * 0.2 + 0.5, ease: [0.33, 1, 0.68, 1] }}
                                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[-2px] lg:left-1/2 top-0 size-4 bg-swiss-accent border-4 border-black -translate-x-1/2 z-20 hidden sm:block" />

                                {/* Experience Card */}
                                <div className="w-full lg:w-[45%] group">
                                    <div className="border-4 border-black bg-white p-8 md:p-12 relative overflow-hidden group-hover:bg-black transition-colors duration-500">
                                        {/* Background Decorative Type */}
                                        <div className="absolute top-0 right-0 p-4 font-black text-6xl opacity-5 group-hover:opacity-10 group-hover:text-white transition-all">
                                            {exp.company === "FLOTY" ? "01" : "02"}
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <span className="text-swiss-accent font-black text-xs tracking-[0.3em] uppercase block mb-2">
                                                        {exp.type} // {exp.duration}
                                                    </span>
                                                    <h3 className="text-3xl md:text-4xl font-black uppercase text-black group-hover:text-white transition-colors duration-200">
                                                        {exp.role}
                                                    </h3>
                                                </div>
                                                <a 
                                                    href={exp.link} 
                                                    target="_blank"
                                                    className="p-3 border-4 border-black bg-white group-hover:bg-swiss-accent transition-all group-hover:border-white"
                                                >
                                                    <ArrowUpRight className="size-6 text-black" />
                                                </a>
                                            </div>

                                            <div className="flex flex-wrap gap-6 mb-8 border-t-2 border-black/10 pt-6 group-hover:border-white/20">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="size-4 text-swiss-accent" />
                                                    <span className="text-sm font-bold uppercase tracking-wider text-black/60 group-hover:text-white/60">
                                                        {exp.company}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="size-4 text-swiss-accent" />
                                                    <span className="text-sm font-bold uppercase tracking-wider text-black/60 group-hover:text-white/60">
                                                        {exp.location}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-lg font-medium text-black/60 group-hover:text-white/70 mb-8 leading-relaxed">
                                                {exp.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {exp.tech.map((t) => (
                                                    <span 
                                                        key={t}
                                                        className="px-3 py-1 border-2 border-black text-[10px] font-black uppercase tracking-widest group-hover:border-white group-hover:text-white"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Corner Accent (Hover) */}
                                        <div className="absolute bottom-0 right-0 w-12 h-12 bg-swiss-accent translate-x-12 translate-y-12 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                                    </div>
                                </div>
                                
                                {/* Spacer for Timeline Centering */}
                                <div className="hidden lg:block lg:w-[10%]" />
                                <div className="hidden lg:block lg:w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none">
                <ElasticLine />
            </div>
        </section>
    );
};
