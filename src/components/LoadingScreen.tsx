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

  useEffect(() => {
    // 1. Minimum visibility (1.8s)
    const minTimeTimer = setTimeout(() => setMinTimeElapsed(true), 1800);

    // 2. ORGANIC PROGRESS LOGIC
    // We simulate real-world asset loading with "spurts" and "stutters"
    const startTime = Date.now();
    const targetDuration = 5000; 

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      if (pageLoaded && minTimeElapsed) {
        setProgress(100);
        clearInterval(interval);
        return;
      }

      // Base progress calculation
      let base = (elapsed / targetDuration) * 100;
      
      // Inject "Liquid Noise" - organic fluctuations
      // This mimics chunks of data arriving at different speeds
      const noise = Math.sin(elapsed * 0.005) * 1.5;
      const stutter = Math.random() > 0.95 ? -0.8 : 0; // Occasional processing hang
      
      let calculated = base + noise + stutter;

      if (calculated >= 99) {
        // Asymptotically approach 99 until finished
        const factor = (calculated - 99) / 20; 
        calculated = 99 + (0.9 * (1 - Math.exp(-factor)));
      }

      setProgress(Math.max(0, Math.min(calculated, 99.9)));
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
          <div className="absolute inset-0 opacity-15 swiss-noise pointer-events-none z-0" />
          <div className="absolute inset-0 opacity-10 swiss-grid pointer-events-none z-0" />
          
          <div className="w-full max-w-5xl relative z-10">
            {/* Header Area */}
            <div className="flex justify-between items-end mb-10 font-black uppercase tracking-tighter">
              <div className="flex flex-col">
                <span className="text-white text-3xl md:text-5xl lg:text-7xl leading-none tracking-tighter">System</span>
                <span className="text-swiss-accent text-3xl md:text-5xl lg:text-7xl leading-none tracking-[-0.05em]">Synthesis</span>
                <div className="flex items-center gap-3 mt-4">
                  <div className="size-3 bg-swiss-accent animate-pulse" />
                  <span className="text-white/40 text-[10px] md:text-xs tracking-[0.5em] font-bold">
                    {pageLoaded ? "GRID_REDUNDANCY_PURGED" : "ENFORCING_TYPE_PRECISION"}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                 <span className="text-swiss-accent text-7xl md:text-9xl lg:text-[14rem] leading-[0.7] mb-2 tabular-nums">
                  {Math.round(progress)}
                </span>
                <span className="text-white/20 text-xs md:text-sm tracking-widest font-black uppercase">Core_State_Readout_V2</span>
              </div>
            </div>
            
            {/* PRECISION WHITE PROGRESS BAR */}
            <div className="h-12 md:h-16 w-full border-4 border-white bg-white/5 relative overflow-hidden flex items-center justify-center">
              {/* Solid White Progress Fill */}
              <motion.div 
                className="absolute inset-y-0 left-0 bg-white z-20"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", damping: 25, stiffness: 60 }}
              />
              
              {/* Internal Percentage Readout */}
              <div className="relative z-50 mix-blend-difference">
                <span className="text-white font-black text-xl md:text-2xl tracking-tighter tabular-nums antialiased">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Static scanline overlay */}
              <div className="absolute inset-0 z-30 bg-[linear-gradient(rgba(255,255,255,0.05)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
              
              {/* Slot indicators */}
              <div className="absolute inset-0 z-10 flex justify-between px-2">
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="w-[1px] h-full bg-white/10" />
                ))}
              </div>
            </div>

            {/* TAGS GRID */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-12 border-t-4 border-white/10 pt-12">
               {[
                 { label: "OBJECTIVE", tag: "SYS_01" },
                 { label: "FUNCTIONAL", tag: "SYS_02" },
                 { label: "ACCURATE", tag: "SYS_03" },
                 { label: "MINIMAL", tag: "SYS_04" }
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

          {/* Footer Metadata */}
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
            <div className="flex flex-col gap-1">
              <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">AA_PORTFOLIO_V2.5 // CORE_CORE</span>
              <div className="flex items-center gap-4">
                <div className="w-16 h-[4px] bg-swiss-accent" />
                <span className="text-swiss-accent font-black text-3xl uppercase tracking-tighter">SWISS_INTL</span>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-end opacity-20">
               <span className="text-white text-xs font-mono">01100001 01101000 01100001 01100100</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



