"use client";
import React from "react";
import { motion, Variants, Transition } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SplitText = ({ text, className = "", delay = 0 }: SplitTextProps) => {
  const letters = text.split("");

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    initial: { y: "100%", opacity: 0, rotateX: 90 },
    animate: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={`inline-block overflow-hidden perspective-1000 ${className}`}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="inline-block whitespace-pre will-change-transform"
          style={{ transformOrigin: "bottom" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
