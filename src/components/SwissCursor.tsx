"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const SwissCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"]');
            setIsHovered(!!isInteractive);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleHover);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHover);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: "-50%",
                y: "-50%",
            }}
        >
            {/* The Crosshair / Circle */}
            <motion.div 
                animate={{ 
                    scale: isHovered ? 1.5 : 1,
                    rotate: isHovered ? 45 : 0
                }}
                className="relative flex items-center justify-center"
            >
               {/* Hide lines on hover to remove 'horizontal bar' look */}
               <motion.div 
                 animate={{ opacity: isHovered ? 0 : 1 }}
                 className="absolute w-[2px] h-6 bg-swiss-accent" 
               />
               <motion.div 
                 animate={{ opacity: isHovered ? 0 : 1 }}
                 className="absolute w-6 h-[2px] bg-swiss-accent" 
               />
               
               {/* Simplified Hub for hover */}
               <motion.div 
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0
                  }}
                  className="size-12 border-2 border-swiss-accent rounded-full absolute"
               />
               <motion.div 
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="size-1 bg-swiss-accent rounded-full absolute"
               />
            </motion.div>
        </motion.div>
    );
};
