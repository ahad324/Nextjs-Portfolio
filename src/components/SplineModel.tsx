"use client";
import React, { useState, useEffect } from "react";

export const SplineModel = () => {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        // Delay the loading of the heavy 3D model until after the main content has (likely) loaded
        // This removes it from the initial Critical Rendering Path
        const timer = setTimeout(() => {
            setShouldLoad(true);
        }, 2000); // 2 second delay to let the rest of the site settle

        return () => clearTimeout(timer);
    }, []);

    if (!shouldLoad) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-transparent">
                {/* Optional: Add a subtle loading spinner or just keep it transparent */}
                <div className="animate-pulse w-10 h-10 rounded-full bg-emerald-500/20"></div>
            </div>
        );
    }

    return (
        <iframe
            src='https://my.spline.design/genkubgreetingrobot-l9LkjVwKy5x6iNABPdyUJOfa/'
            frameBorder='0'
            width='100%'
            height='100%'
            className="rounded-br-full animate-fade-in"
            title="3D Greeting Robot"
            loading="lazy"
        />
    );
};
