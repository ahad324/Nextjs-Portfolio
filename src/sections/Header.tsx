"use client";
import Link from "next/link";
import Scrollspy from "react-scrollspy";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLoading } from "@/context/LoadingContext";

export const Header = () => {
  const links = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "About", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const linkRefs = useRef<(HTMLElement | null)[]>([]);
  const { isLoading } = useLoading();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Initial check
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, index: number) => {
    // Only handle hash links (not the home link)
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        setIsDropdownOpen(false); // Close dropdown if open
        // Update active index immediately for visual feedback
        setActiveIndex(index);

        // Use a small timeout to ensure the dropdown closing doesn't interfere with scroll
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }, 50);
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center fixed top-3 z-50">
      <motion.nav
        initial={{ width: 64, opacity: 0 }} // Start small (approx logo size)
        animate={isLoading ? { width: 64, opacity: 0 } : { width: isMobile ? "calc(100% - 32px)" : "auto", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }} // Smooth expansion
        className="flex gap-4 md:gap-10 p-2 border border-white/15 rounded-full bg-white/10 backdrop-blur items-center justify-between md:overflow-hidden" // Added overflow-hidden
      >
        <Link href="/" className="flex items-center justify-center rounded-full shrink-0"> {/* Prevent shrinking */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={"/favicon.ico"} alt="Logo" width={48} height={48} className="size-12 rounded-full" />
          </motion.div>
        </Link>

        {/* Navigation Content Wrapper - fades in after expansion */}
        <motion.div
          className="flex items-center gap-4 md:gap-10"
          initial={{ opacity: 0 }}
          animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }} // Delay opacity until mostly expanded
        >
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
                  onClick={(e) => handleAnchorClick(e, link.href, index)}
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
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="absolute top-full left-0 mt-2 bg-gray-900 rounded-xl shadow-lg border border-white/15 overflow-hidden z-50" style={{ width: 'fit-content', minWidth: '100px' }}
                  >
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
                        className="block px-3 py-2 text-sm transition-colors relative z-10 font-medium text-center h-10 flex items-center justify-center"
                        style={{
                          color: activeIndex === index ? "#111827" : "rgba(255, 255, 255, 0.8)",
                        }}
                        onClick={(e) => {
                          handleAnchorClick(e, link.href, index);
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Scrollspy>
        </motion.div>
      </motion.nav>
    </div>
  );
};
