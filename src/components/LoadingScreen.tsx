"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  pageLoaded: boolean;
}

export const LoadingScreen = ({ onComplete, pageLoaded }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (pageLoaded) {
      // When page is loaded, fade out smoothly
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 800); // Wait for fade animation to complete
      }, 500); // Small delay to ensure smooth transition

      return () => clearTimeout(timer);
    }
  }, [pageLoaded, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
        >
          {/* Eye Loader */}
          <div className="relative flex items-center justify-center gap-8">
            {/* Left Eye */}
            <div className="relative">
              {/* Eye socket */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/20 shadow-lg backdrop-blur-sm"></div>

              {/* Eyeball - rotating clockwise */}
              <motion.div
                className="absolute inset-2 md:inset-3 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: "radial-gradient(farthest-side, #000 95%, transparent) 35% 35% / 12px 12px no-repeat, #fff"
                }}
              />
            </div>

            {/* Right Eye */}
            <div className="relative">
              {/* Eye socket */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/20 shadow-lg backdrop-blur-sm"></div>

              {/* Eyeball - rotating counter-clockwise */}
              <motion.div
                className="absolute inset-2 md:inset-3 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg"
                animate={{
                  rotate: -360
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -0.1
                }}
                style={{
                  background: "radial-gradient(farthest-side, #000 95%, transparent) 35% 35% / 12px 12px no-repeat, #fff"
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
