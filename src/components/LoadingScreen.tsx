"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  onExitStart?: () => void; // New prop to signal start of exit animation
  pageLoaded: boolean;
}

export const LoadingScreen = ({ onComplete, onExitStart, pageLoaded }: LoadingScreenProps) => {
  const [isSqueezing, setIsSqueezing] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (pageLoaded) {
      // 1. Start squeezing effect
      setIsSqueezing(true);

      // 2. Start exit (curtain up) after squeeze is done
      // Squeeze sequence: Pupil (0.3s) -> Eyeball (0.3s) -> Socket (0.3s) + delays
      // Total time approx 1s
      const timer = setTimeout(() => {
        setIsExiting(true);
        if (onExitStart) onExitStart(); // Trigger navbar animation immediately
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [pageLoaded]);

  return (
    <AnimatePresence
      onExitComplete={onComplete}
    >
      {!isExiting ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900"
          exit={{
            opacity: 0, // Fade out instead of slide up
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* Eye Loader */}
          <div className="relative flex items-center justify-center gap-8">
            {/* Left Eye */}
            <div className="relative">
              {/* Eye socket */}
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/20 shadow-lg backdrop-blur-sm"
                animate={isSqueezing ? { scale: 0 } : { scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6, ease: "backIn" }} // Last to shrink
              />

              {/* Eyeball - rotating clockwise */}
              <motion.div
                className="absolute inset-2 md:inset-3 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg"
                animate={isSqueezing ? { scale: 0, rotate: 0 } : { scale: 1, rotate: 360 }}
                transition={isSqueezing ? { duration: 0.3, delay: 0.3, ease: "backIn" } : { rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
              >
                {/* Pupil - nested inside eyeball to rotate with it */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-black z-10"
                  style={{ top: "30%", left: "30%" }} // Offset to create orbit effect
                  animate={isSqueezing ? { scale: 0 } : { scale: 1 }}
                  transition={{ duration: 0.3, delay: 0, ease: "backIn" }} // First to shrink
                />
              </motion.div>
            </div>

            {/* Right Eye */}
            <div className="relative">
              {/* Eye socket */}
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/20 shadow-lg backdrop-blur-sm"
                animate={isSqueezing ? { scale: 0 } : { scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6, ease: "backIn" }}
              />

              {/* Eyeball - rotating counter-clockwise */}
              <motion.div
                className="absolute inset-2 md:inset-3 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg"
                animate={isSqueezing ? { scale: 0, rotate: 0 } : { scale: 1, rotate: -360 }}
                transition={isSqueezing ? { duration: 0.3, delay: 0.3, ease: "backIn" } : { rotate: { duration: 1, repeat: Infinity, ease: "linear", delay: -0.1 } }}
              >
                {/* Pupil */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-black z-10"
                  style={{ top: "30%", left: "30%" }} // Offset to create orbit effect
                  animate={isSqueezing ? { scale: 0 } : { scale: 1 }}
                  transition={{ duration: 0.3, delay: 0, ease: "backIn" }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};