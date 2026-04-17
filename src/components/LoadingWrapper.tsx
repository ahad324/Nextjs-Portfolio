"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";

// Inner component to consume context
const LoadingLogic = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, setIsLoading } = useLoading();
  const [showLoader, setShowLoader] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Basic hydration wait
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setShowLoader(false);
  };

  const handleExitStart = () => {
    setIsLoading(false); // Signal that loading is exiting (start navbar expansion)
  };

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleComplete} onExitStart={handleExitStart} pageLoaded={pageLoaded} />}
      
      {/* Cinematic Reveal Sequence */}
      <div className="relative overflow-hidden">
        {/* The 'Wipe & Flash' Accent Bar */}
        <motion.div 
          initial={{ top: "-10%" }}
          animate={{ top: !isLoading ? "110%" : "-10%" }}
          transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
          className="fixed left-0 w-full h-8 bg-swiss-accent z-[9998] shadow-[0_0_50px_rgba(255,48,0,0.5)] pointer-events-none"
        />

        <motion.div 
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: !isLoading ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
          className="relative z-0"
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <LoadingLogic>
        {children}
      </LoadingLogic>
    </LoadingProvider>
  );
}
