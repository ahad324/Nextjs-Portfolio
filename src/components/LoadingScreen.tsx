"use client";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { useState, useEffect } from "react";
import grainImage from "@/assets/images/grain.jpg";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"loading" | "textFade" | "ringShrink" | "bgFade" | "done">("loading");

  // Phase control sequence
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setPhase("textFade"), 3000));       // Phase 2
    timers.push(setTimeout(() => setPhase("ringShrink"), 3800));     // Phase 3
    timers.push(setTimeout(() => setPhase("bgFade"), 5800));         // Phase 4
    timers.push(setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 6600));                                                       // Phase 5

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

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
    })
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
                      : phase === "bgFade" || phase === "textFade"
                        ? "loading" // Keep pulsing until shrink starts
                        : "hidden"
                }
                variants={ringVariants}
              />
            ))}
          </div>

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
              initial={{ opacity: 1 }}
              animate={{ opacity: phase === "textFade" || phase === "ringShrink" || phase === "bgFade" ? 0 : 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
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
