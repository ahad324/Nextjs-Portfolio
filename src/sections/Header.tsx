"use client";
import Link from "next/link";
import Scrollspy from "react-scrollspy";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import logo from "../app/logo.webp";
import Image from "next/image";

export const Header = () => {
  const links = [
    { name: "Home", href: "/", id: "hero" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "About", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const linkRefs = useRef<(HTMLElement | null)[]>([]);

  // Ensure background element is visible on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="w-full flex justify-center items-center fixed top-3 z-50">
      <nav className="flex gap-4 md:gap-10 p-2 border border-white/15 rounded-full bg-white/10 backdrop-blur items-center justify-between w-full ml-4 mr-4 md:w-auto">
        <Link href="/" className="flex items-center justify-center rounded-full">
          <Image src={logo.src} alt="Logo" width={48} height={48} className="size-12 rounded-full" />
        </Link>
        <Scrollspy
          items={["hero", "projects", "about", "contact"]}
          currentClassName=""
          className="flex gap-1 p-2 rounded-full bg-gray-900 relative overflow-visible min-w-[120px] md:min-w-0 justify-center items-center"
          offset={-50}
          onUpdate={(el) => {
            if (el) {
              const index = links.findIndex(link => link.id === el.id);
              if (index !== -1) setActiveIndex(index);
            }
          }}
        >
          {/* Animated background for large devices */}
          {isInitialized && (
            <motion.div
            className="absolute bg-white rounded-full hidden md:block"
            initial={false}
            animate={{
              // Use fallback values to avoid undefined errors
              x: (linkRefs.current[activeIndex]?.offsetLeft ?? 0) + (linkRefs.current[activeIndex]?.offsetWidth ?? 0) / 2 - 187, // Centering logic
              width: linkRefs.current[activeIndex]?.offsetWidth ?? 0,
              height: linkRefs.current[activeIndex]?.offsetHeight ?? 0,
              top: linkRefs.current[activeIndex]?.offsetTop ?? 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
          
          )}

          {/* Large devices: Show all links */}
          <div className="hidden md:flex gap-1">
            {links.map((link, index) => (
              <Link
                key={link.id}
                href={link.href}
                className="nav-item relative z-10 text-sm md:text-base"
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
          </div>

          {/* Small devices: Dropdown navigation */}
          <div className="md:hidden relative dropdown-container z-30">
            {/* Dropdown trigger button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="nav-item relative z-10 text-sm md:text-base flex items-center gap-2 px-4 py-2 rounded-full bg-gray-500"
              style={{
                color: "#111827",
              }}
            >
              {/* White background for trigger button */}
              {isInitialized && (
                <motion.div
                  className="absolute bg-white rounded-full inset-0"
                  initial={false}
                  animate={{
                    opacity: isDropdownOpen ? 0 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{links[activeIndex].name}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} relative z-10`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-gray-900 rounded-xl shadow-lg border border-white/15 overflow-hidden z-50" style={{ width: 'fit-content', minWidth: '100px' }}>
                {/* White background for active link in dropdown */}
                {isInitialized && (
                  <motion.div
                    className="absolute bg-white rounded-full"
                    initial={false}
                    animate={{
                      width: "100%",
                      height: 40,
                      x: 0,
                      y: activeIndex * 40,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                {links.map((link, index) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="px-3 py-2 text-sm transition-colors relative z-10 font-medium text-center h-10 flex items-center justify-center"
                    style={{
                      color: activeIndex === index ? "#111827" : "rgba(255, 255, 255, 0.8)",
                    }}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setActiveIndex(index);
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Scrollspy>
      </nav>
    </div>
  );
};
