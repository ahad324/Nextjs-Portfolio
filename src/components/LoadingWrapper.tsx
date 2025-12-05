"use client";
import { useState, useEffect } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";

// Inner component to consume context
const LoadingLogic = ({ children }: { children: React.ReactNode }) => {
  const { setIsLoading } = useLoading();
  const [showLoader, setShowLoader] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // We don't want to wait for the heavy 3D model (iframe) or large images involved in window.onload
    // Instead, we just wait a brief moment for the app to hydrate and initial styles to apply.
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 1000); // 1-second max wait for "feeling" of loading, or shorten as desired.

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
      <div className={`transition-opacity duration-500 ease-in-out ${pageLoaded ? "opacity-100" : "opacity-0"}`}>
        {children}
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
