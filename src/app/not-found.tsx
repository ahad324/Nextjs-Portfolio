"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden font-sans">
            {/* Grainy Noise Overlay */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            ></div>

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
            </div>

            <div className="relative z-20 text-center px-4">
                {/* Animated 404 Text */}
                <motion.div
                    animate={{
                        x: mousePosition.x * 2,
                        y: mousePosition.y * 2,
                        rotateX: mousePosition.y,
                        rotateY: mousePosition.x,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 30 }}
                    className="perspective-1000"
                >
                    <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white/50 to-transparent select-none font-serif">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
                        Lost inside the void?
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
                        The page you are looking for doesn&apos;t exist or has been moved to
                        another dimension.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 group"
                    >
                        <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            scale: Math.random(),
                        }}
                        animate={{
                            y: [null, Math.random() * -100 + "%"],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
