"use client";
import { useState, useEffect } from "react";
import { LoadingScreen } from "./LoadingScreen";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      // Already loaded → start animation sequence
    } else {
      window.addEventListener("load", () => { });
    }
  }, []);

  const handleComplete = () => {
    setShowLoader(false);
    setTimeout(() => setContentVisible(true), 100); // Small delay for smoothness
  };

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleComplete} />}
      <div className={`transition-opacity duration-800 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  );
}
