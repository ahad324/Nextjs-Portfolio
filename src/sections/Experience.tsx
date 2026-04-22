"use client";
import { useRef } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Building2, MapPin, Calendar, ExternalLink } from "lucide-react";
import { ElasticLine } from "@/components/ElasticLine";
import { useLoading } from "@/context/LoadingContext";
import { Magnetic } from "@/components/Magnetic";

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
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="py-24 border-t-4 border-black swiss-grid-pattern relative overflow-hidden" id="experience">
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
                    {/* ACTIVE TIMELINE SPINE - Deterministic centering */}
                    <div className="absolute inset-y-0 left-0 right-0 w-[4px] hidden sm:block mx-auto z-0">
                        <div className="absolute inset-0 bg-black opacity-10" />
                        <motion.div 
                            style={{ scaleY, originY: 0 }}
                            className="absolute inset-0 bg-swiss-accent z-10"
                        />
                    </div>

                    <div className="flex flex-col gap-12 sm:gap-24">
                        {experiences.map((exp, index) => (
                            <ExperienceCard key={exp.company} exp={exp} index={index} isReady={isReady} scrollYProgress={scrollYProgress} />
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

const ExperienceCard = ({ exp, index, isReady, scrollYProgress }: { exp: any, index: number, isReady: boolean, scrollYProgress: any }) => {
    // Each dot activates at a specific scroll point
    const threshold = index === 0 ? 0.2 : 0.8;
    const dotScale = useTransform(scrollYProgress, [threshold - 0.1, threshold, threshold + 0.1], [1, 1.8, 1]);
    const dotColor = useTransform(scrollYProgress, [threshold - 0.1, threshold], ["#000000", "#FF3000"]);

    const yTransform = useTransform(scrollYProgress, [threshold - 0.2, threshold, threshold + 0.2], [20, 0, -20]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            }`}
        >
            {/* Timeline Dot / Junction - Deterministic centering */}
            <motion.div 
                style={{ scale: dotScale, backgroundColor: dotColor }}
                className="absolute top-0 inset-x-0 mx-auto size-4 border-4 border-black z-20 hidden sm:block" 
            />

            {/* Experience Card Content */}
            <motion.div 
                style={{ y: yTransform }}
                className="w-full lg:w-[45%] group"
            >
                <div className="border-4 border-black bg-white p-8 md:p-12 relative overflow-hidden group-hover:bg-black transition-colors duration-500">
                    <div className="absolute top-0 right-0 p-4 font-black text-6xl opacity-5 group-hover:opacity-10 group-hover:text-white transition-all">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
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
                            <Magnetic strength={0.3}>
                                <a 
                                    href={exp.link} 
                                    target="_blank"
                                    data-cursor="VISIT"
                                    className="p-3 border-4 border-black bg-white group-hover:bg-swiss-accent transition-all group-hover:border-white block"
                                >
                                    <ArrowUpRight className="size-6 text-black" />
                                </a>
                            </Magnetic>
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
                            {exp.tech.map((t: string) => (
                                <span 
                                    key={t}
                                    className="px-3 py-1 border-2 border-black text-[10px] font-black uppercase tracking-widest group-hover:border-white group-hover:text-white"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-swiss-accent translate-x-12 translate-y-12 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                </div>
            </motion.div>
            
            <div className="hidden lg:block lg:w-[10%]" />
            <div className="hidden lg:block lg:w-[45%]" />
        </motion.div>
    );
};
