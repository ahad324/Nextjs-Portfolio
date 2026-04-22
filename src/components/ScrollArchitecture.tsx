"use client";
import React, { useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const NODE_COUNT = 16;

export const ScrollArchitecture = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // High-Responsiveness Spring for the ARTIFACT only (to keep it smooth but snappy)
  const artifactProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
  });

  const nodes = Array.from({ length: NODE_COUNT });

  return (
    <div className="min-h-screen relative bg-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* BASE GRID (Gray) */}
        <div 
            style={{ 
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
            }}
            className="absolute inset-0"
        />

        {/* THERMAL REVEAL GRID (Swiss Red) */}
        <motion.div 
            style={{ 
                backgroundImage: `radial-gradient(circle, rgba(255,48,0,0.15) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
                WebkitMaskImage: useTransform(
                  [mouseX, mouseY],
                  ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`
                ),
                maskImage: useTransform(
                  [mouseX, mouseY],
                  ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`
                ),
            }}
            className="absolute inset-0 z-10"
        />

        {/* NEURAL CORE ARTIFACT */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative size-[600px]">
                {nodes.map((_, i) => (
                    <CoreNode key={i} index={i} progress={artifactProgress} />
                ))}
            </div>
        </div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const CoreNode = ({ index, progress }: { index: number, progress: any }) => {
  // --- BLUEPRINT GEOMETRY ---

  // 1. PROCESSOR (Hero - 0)
  const pRow = Math.floor(index / 4);
  const pCol = index % 4;
  const pX = (pCol - 1.5) * 60;
  const pY = (pRow - 1.5) * 60;

  // 2. FRAME (Projects - 0.25)
  // Forming a rectangle [ ] using 16 nodes
  let fX = 0, fY = 0;
  if (index < 5) { fX = (index - 2) * 100; fY = -150; } // Top
  else if (index < 8) { fX = 200; fY = (index - 6) * 100; } // Right
  else if (index < 13) { fX = (10 - index) * 100; fY = 150; } // Bottom
  else { fX = -200; fY = (14 - index) * 100; } // Left

  // 3. PULSE (Experience - 0.5)
  // A clean engineering sine wave
  const waveX = (index - 7.5) * 45;
  const waveY = Math.sin((index / NODE_COUNT) * Math.PI * 4) * 80;

  // 4. PRISM (About - 0.75)
  // A diamond focus shape
  const prismAngle = (index / NODE_COUNT) * Math.PI * 2;
  const pRadius = index % 2 === 0 ? 180 : 80;
  const prismX = Math.cos(prismAngle) * pRadius;
  const prismY = Math.sin(prismAngle) * pRadius;

  // 5. TARGET (Contact - 1.0)
  // A crosshair for terminal uplink
  let tX = 0, tY = 0;
  if (index < 4) { tX = (index - 1.5) * 120; tY = 0; } // Horiz axis
  else if (index < 8) { tX = 0; tY = (index - 5.5) * 120; } // Vert axis
  else { 
    const rAngle = ((index - 8) / 8) * Math.PI * 2;
    tX = Math.cos(rAngle) * 150; 
    tY = Math.sin(rAngle) * 150; 
  }

  // --- TRANSFORMS ---
  const x = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [pX, fX, waveX, prismX, tX]);
  const y = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [pY, fY, waveY, prismY, tY]);
  
  const rotate = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, 90, 0, 45, 180]);
  const scale = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [1, 0.8, 1, 1.2, 0.5]);
  const borderRadius = useTransform(progress, [0.1, 0.2, 0.4, 0.5, 0.7, 0.8, 0.9, 1], ["0%", "0%", "0%", "50%", "50%", "0%", "50%", "50%"]);
  const opacity = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0.2, 0.15, 0.2, 0.25, 0.15]);

  return (
    <motion.div
        style={{ x, y, rotate, scale, borderRadius, opacity, left: "50%", top: "50%" }}
        className="absolute size-8 md:size-12 border-2 border-swiss-accent bg-swiss-accent/5 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 will-change-transform"
    />
  );
};
