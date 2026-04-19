"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from "framer-motion";

export const SwissCursor = () => {
    const [cursorType, setCursorType] = useState<"default" | "magnetic" | "text">("default");
    const [cursorText, setCursorText] = useState("");
    
    // Position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Physics
    const springConfig = { damping: 25, stiffness: 250 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Velocity for stretching effect
    const xVelocity = useVelocity(cursorX);
    const yVelocity = useVelocity(cursorY);
    const skewX = useTransform(xVelocity, [-2000, 2000], [-30, 30]);
    const skewY = useTransform(yVelocity, [-2000, 2000], [-30, 30]);
    const scale = useTransform(xVelocity, [-2000, 2000], [1, 1.2]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleInteractive = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"], .magnetic');
            
            if (interactive) {
                if (interactive.classList.contains('magnetic')) {
                    setCursorType("magnetic");
                } else {
                    setCursorType("text");
                    // Check for custom data-cursor text
                    const text = interactive.getAttribute('data-cursor');
                    setCursorText(text || "VIEW");
                }
            } else {
                setCursorType("default");
                setCursorText("");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleInteractive);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleInteractive);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: "-50%",
                y: "-50%",
                skewX,
                skewY,
                scale
            }}
        >
            <AnimatePresence mode="wait">
                {cursorType === "default" && (
                    <motion.div 
                        key="default"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 45 }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="absolute w-[1px] h-6 bg-swiss-accent" />
                        <div className="absolute w-6 h-[1px] bg-swiss-accent" />
                    </motion.div>
                )}

                {cursorType === "text" && (
                    <motion.div 
                        key="text"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex items-center justify-center"
                    >
                        <div className="size-20 border border-swiss-accent rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-black text-swiss-accent tracking-[0.2em] uppercase">
                                {cursorText}
                            </span>
                        </div>
                    </motion.div>
                )}

                {cursorType === "magnetic" && (
                    <motion.div 
                        key="magnetic"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="size-4 bg-swiss-accent rounded-full shadow-[0_0_20px_#FF3000]"
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};
