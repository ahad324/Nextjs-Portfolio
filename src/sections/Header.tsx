"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export const Header = () => {
  const links = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "About", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const scrollTracker = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          scrollTracker.current[entry.target.id] = entry;
        });

        // Precision Active Logic: Find the visible section that occupies the most space
        const visibleSections = Object.values(scrollTracker.current)
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          const activeId = visibleSections[0].target.id;
          const index = links.findIndex((link) => link.id === activeId);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], 
        rootMargin: "-10% 0px -40% 0px" 
      }
    );

    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [links]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, index: number) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        setIsDropdownOpen(false); // Close menu first
        setActiveIndex(index); 
        
        const navHeight = 84; 
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white border-b-4 border-black box-border">
      <div className="container mx-auto flex items-stretch justify-between h-20 px-0">
        {/* Logo / Brand */}
        <Link 
          href="/" 
          className="flex items-center px-8 border-r-4 border-black bg-black text-white hover:bg-swiss-accent transition-colors duration-200"
        >
          <span className="font-black text-2xl tracking-tighter uppercase">AA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1">
          <ul className="flex h-full w-full list-none p-0 m-0">
            {links.map((link, index) => (
              <li key={link.id} className="h-full flex-1 border-r-4 border-black last:border-r-0">
                <Link
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href, index)}
                  className={twMerge(
                    "group relative flex items-center justify-center h-full w-full uppercase font-bold tracking-widest text-sm overflow-hidden transition-colors duration-200",
                    activeIndex === index ? 'bg-black text-white' : 'bg-white text-black hover:bg-swiss-muted'
                  )}
                >
                  <motion.span
                    initial={false}
                    animate={{ y: 0 }}
                    whileHover={{ y: -2 }}
                    className="relative z-10"
                  >
                    {link.name}
                  </motion.span>
                  
                  {/* Active Indicator (Swiss Red Line) */}
                  {activeIndex === index && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute bottom-0 left-0 w-full h-2 bg-swiss-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="md:hidden px-8 border-l-4 border-black font-black uppercase tracking-tighter hover:bg-swiss-muted transition-colors"
        >
          {isDropdownOpen ? "Close" : "Menu"}
        </button>

        {/* Resume Button - Desktop */}
        <div className="hidden lg:flex items-center px-8 border-l-4 border-black">
          <a 
            href="/assets/AbdulAhad-Resume.pdf" 
            download 
            className="bg-swiss-accent text-white px-8 py-3 font-black uppercase tracking-widest text-xs hover:bg-black transition-colors duration-200 border-2 border-transparent hover:border-black"
          >
            Resume.PDF
          </a>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden border-t-4 border-black bg-white overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col">
              {links.map((link, index) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href, index)}
                  className={twMerge(
                    "block px-8 py-8 border-b-4 border-black last:border-b-0 uppercase font-black tracking-tighter text-3xl transition-colors",
                    activeIndex === index ? 'bg-black text-white' : 'bg-white text-black hover:bg-swiss-accent hover:text-white'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


