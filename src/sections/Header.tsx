"use client";
import Link from "next/link";
import Scrollspy from "react-scrollspy";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export const Header = () => {
  const links = [
    { name: "Home", href: "/", id: "hero" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "About", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const linkRefs = useRef<(HTMLElement | null)[]>([]);

  return (
    <div className="w-full flex justify-center items-center fixed top-3 z-10">
      <nav className="flex gap-1 p-2 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <Scrollspy
          items={["hero", "projects", "about", "contact"]}
          currentClassName=""
          className="flex gap-1 p-2 rounded-full bg-gray-900 relative"
          offset={-50}
          onUpdate={(el) => {
            if (el) {
              const index = links.findIndex(link => link.id === el.id);
              if (index !== -1) setActiveIndex(index);
            }
          }}
        >
          {/* Simple animated background */}
          <motion.div
            className="absolute bg-white rounded-full"
            initial={false}
            animate={{
              x: (linkRefs.current[activeIndex]?.offsetLeft || 0) - 5,
              width: (linkRefs.current[activeIndex]?.offsetWidth || 0),
              height: (linkRefs.current[activeIndex]?.offsetHeight || 0),
              top: (linkRefs.current[activeIndex]?.offsetTop || 0) - 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />

          {links.map((link, index) => (
            <Link
              key={link.id}
              href={link.href}
              className="nav-item relative z-10"
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              style={{
                color: activeIndex === index ? "#111827" : "rgba(255, 255, 255, 0.7)",
              }}
            >
              {link.name}
            </Link>
          ))}
        </Scrollspy>
      </nav>
    </div>
  );
};
