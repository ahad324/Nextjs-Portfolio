"use client";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { useState, useEffect } from "react";
import grainImage from "@/assets/images/grain.jpg";

interface LoadingScreenProps {
  onComplete: () => void;
  pageLoaded: boolean;
}

export const LoadingScreen = ({ onComplete, pageLoaded }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"loading" | "textFade" | "ringShrink" | "bgFade" | "done">("loading");

  // Phase control sequence - only start when page is actually loaded
  useEffect(() => {
    if (!pageLoaded) return; // Don't start animation until page is loaded

    const timers: NodeJS.Timeout[] = [];

    // Start fade-out sequence immediately when page loads
    timers.push(setTimeout(() => setPhase("textFade"), 0));          // Phase 2 - start immediately
    timers.push(setTimeout(() => setPhase("ringShrink"), 800));      // Phase 3 - after text fade
    timers.push(setTimeout(() => setPhase("bgFade"), 2800));         // Phase 4 - after ring shrink
    timers.push(setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3600));                                                       // Phase 5 - total fade-out time

    return () => timers.forEach(clearTimeout);
  }, [onComplete, pageLoaded]);

  // Variants as functions, not typed as Variants (to avoid TS error)
  const ringVariants = {
    loading: (i: number): TargetAndTransition => ({
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.15
      }
    }),
    ringShrink: (i: number): TargetAndTransition => ({
      scale: 0,
      opacity: 0,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: i * 0.15
      }
    }),
    hidden: {
      scale: 0,
      opacity: 0
    }
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "bgFade" ? 0 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
        >
          {/* Background grain */}
          <div
            className="absolute inset-0 -z-10 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${grainImage.src})` }}
          />

          {/* Rings */}
          {phase !== "bgFade" && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  className={`loader-ring ring-sz-${i + 1}`}
                  style={{ x: "-50%", y: "-50%" }}
                  animate={
                    phase === "loading"
                      ? "loading"
                      : phase === "ringShrink"
                        ? "ringShrink"
                        : phase === "textFade"
                          ? "loading" // Keep pulsing until shrink starts
                          : "hidden" // Completely hidden after animation
                  }
                  variants={ringVariants}
                />
              ))}
            </div>
          )}

          {/* Spinner + text */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: phase === "textFade" || phase === "ringShrink" || phase === "bgFade" ? 0 : 1,
                y: 0
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-8 h-8 border-2 border-emerald-400/30 rounded-full"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-2 border-transparent border-t-emerald-400 rounded-full"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{
                opacity: phase === "textFade" || phase === "ringShrink" || phase === "bgFade" ? 0 : 1,
                y: 0
              }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
              className="text-white/80 text-sm tracking-wide"
            >
              Loading
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
