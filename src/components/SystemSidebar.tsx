"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "SYS_01", theme: "INIT" },
  { id: "projects", label: "SYS_02", theme: "PROC" },
  { id: "experience", label: "SYS_03", theme: "LOG" },
  { id: "about", label: "SYS_04", theme: "IDNT" },
  { id: "contact", label: "SYS_05", theme: "TERM" },
];

export const SystemSidebar = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const currentIdx = sections.findIndex((s) => s.id === activeSection);
  const currentSection = sections[currentIdx] || sections[0];

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-12 mix-blend-difference pointer-events-none">
      {/* Current Status */}
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
            <div className="size-2 bg-swiss-accent animate-pulse" />
            <span className="text-[10px] font-black text-swiss-accent uppercase tracking-widest">
                Status_{currentSection.theme}
            </span>
        </div>
        <span className="text-[10px] font-mono text-white/40">
           LOG_ADDR: 0x{currentIdx.toString(16).padStart(4, '0')}
        </span>
      </div>

      {/* Progress Line */}
      <div className="h-64 w-[1px] bg-white/20 relative">
        <motion.div 
            className="absolute top-0 left-0 w-full bg-swiss-accent"
            animate={{ height: `${((currentIdx + 1) / sections.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
        
        <div className="absolute inset-0 flex flex-col justify-between py-1">
            {sections.map((section, i) => (
                <div 
                    key={section.id}
                    className={`size-1 rounded-full transition-colors duration-500 ${
                        i <= currentIdx ? "bg-swiss-accent shadow-[0_0_8px_#FF3000]" : "bg-white/20"
                    }`}
                />
            ))}
        </div>
      </div>

      {/* Numerical Indicator */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black text-white">{currentSection.label}</span>
        <div className="w-8 h-[1px] bg-white/20 my-2" />
        <span className="text-[8px] font-mono text-white/40 opacity-50 rotate-90 whitespace-nowrap translate-y-4">
            CORE_SYSTEM_V4.2
        </span>
      </div>
    </div>
  );
};
