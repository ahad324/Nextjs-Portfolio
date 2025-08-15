"use client";
import { useState, useEffect } from "react";
import { LoadingScreen } from "./LoadingScreen";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      // Already loaded → start animation sequence
      setPageLoaded(true);
    } else {
      // Listen for page load
      const handleLoad = () => {
        setPageLoaded(true);
      };
      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  const handleComplete = () => {
    setShowLoader(false);
    setContentVisible(true); // Show content immediately when loading screen completes
  };

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleComplete} pageLoaded={pageLoaded} />}
      <div className={`transition-opacity duration-500 ease-in-out ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  );
}
