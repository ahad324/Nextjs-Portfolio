"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  onExitStart?: () => void;
  pageLoaded: boolean;
}

export const LoadingScreen = ({ onComplete, onExitStart, pageLoaded }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  
  // Persistence for start time to prevent resets on re-renders
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // 1. Minimum visibility (1.8s)
    const minTimeTimer = setTimeout(() => setMinTimeElapsed(true), 1800);

    // 2. STABLE & SMOOTH PROGRESS LOGIC
    const targetDuration = 4000; 

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      
      if (pageLoaded && minTimeElapsed) {
        setProgress(100);
        clearInterval(interval);
        return;
      }

      // Smooth logical increment
      let calculated = (elapsed / targetDuration) * 99;
      
      // Asymptotic slowdown near 99%
      if (calculated >= 99) {
        calculated = 99 + (0.9 * (1 - Math.exp(-(elapsed - targetDuration) / 1000)));
      }

      setProgress(Math.max(0, Math.min(calculated, 100)));
    }, 16);

    return () => {
      clearTimeout(minTimeTimer);
      clearInterval(interval);
    };
  }, [pageLoaded, minTimeElapsed]);

  useEffect(() => {
    if (pageLoaded && minTimeElapsed && progress >= 100) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        if (onExitStart) onExitStart();
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [pageLoaded, minTimeElapsed, progress]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-8 select-none"
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Static Background Texture */}
          <div className="absolute inset-0 opacity-15 brand-noise pointer-events-none z-0" />
          <div className="absolute inset-0 opacity-10 brand-grid pointer-events-none z-0" />
          
          <div className="w-full max-w-5xl relative z-10">
            {/* Header Area */}
            <div className="flex justify-between items-end mb-10 font-black uppercase tracking-tighter">
              <div className="flex flex-col">
                <span className="text-white text-3xl md:text-5xl lg:text-7xl leading-none tracking-tighter">Terminal</span>
                <span className="text-swiss-accent text-3xl md:text-5xl lg:text-7xl leading-none tracking-[-0.05em]">Initialized</span>
                <div className="flex items-center gap-3 mt-4">
                  <div className="size-3 bg-swiss-accent animate-pulse" />
                  <span className="text-white/40 text-[10px] md:text-xs tracking-[0.5em] font-bold">
                    {pageLoaded ? "SYSTEM_READY" : "LOADING_RESOURCES"}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-end opacity-40">
                <span className="text-white/20 text-xs md:text-sm tracking-widest font-black uppercase">Core_State_V3</span>
              </div>
            </div>
            
            {/* PROGRESS BAR */}
            <div className="h-12 md:h-16 w-full border-4 border-white bg-white/5 relative overflow-hidden flex items-center justify-center">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-white z-20"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "linear", duration: 0.05 }}
              />
              
              <div className="relative z-50 mix-blend-difference">
                <span className="text-white font-black text-2xl md:text-3xl tracking-tighter tabular-nums antialiased">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="absolute inset-0 z-30 bg-[linear-gradient(rgba(255,255,255,0.05)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />
            </div>

            {/* TAGS GRID */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-12 border-t-4 border-white/10 pt-12">
               {[
                 { label: "FRONTEND", tag: "MOD_01" },
                 { label: "BACKEND", tag: "MOD_02" },
                 { label: "DATABASE", tag: "MOD_03" },
                 { label: "ARCHITECTURE", tag: "MOD_04" }
               ].map((item) => (
                 <div key={item.label} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-swiss-accent text-[10px] font-black tracking-widest px-2 py-0.5 border-2 border-swiss-accent">
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>

          
        </motion.div>
      )}
    </AnimatePresence>
  );
};




