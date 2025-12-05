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
    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
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
