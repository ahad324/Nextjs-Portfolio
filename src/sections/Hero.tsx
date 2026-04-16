"use client"
import Link from "next/link";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section
      className="pt-40 pb-20 md:pt-60 md:pb-32 relative z-0 overflow-hidden swiss-grid-pattern"
      id="hero"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Section Number & Vertical Line */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center gap-4">
            <span className="text-swiss-accent font-black text-xl tracking-tighter">01</span>
            <div className="w-1 h-32 bg-swiss-accent" />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-11 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-black text-white px-4 py-1 mb-8"
            >
              <span className="uppercase font-bold tracking-[0.3em] text-[10px] md:text-xs text-swiss-accent">
                Available for new projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              className="text-[clamp(3.5rem,11vw,14rem)] font-black leading-[0.85] tracking-tighter uppercase mb-12"
            >
              Building <br />
              <span className="text-swiss-accent">Radical</span> <br />
              Digital
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-end mt-12 md:mt-24">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl font-medium max-w-lg leading-tight text-black/70 border-l-4 border-black pl-8"
              >
                I specialize in transforming complex concepts into functional, 
                high-performing web applications through the lens of objective communication.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-0 border-4 border-black box-content"
              >
                <Link
                  href="#projects"
                  className="bg-black text-white px-10 py-6 font-black uppercase tracking-widest text-sm hover:bg-swiss-accent transition-colors duration-200 text-center"
                >
                  Explore Work
                </Link>
                <Link
                  download
                  href="/assets/AbdulAhad-Resume.pdf"
                  className="bg-white text-black px-10 py-6 font-black uppercase tracking-widest text-sm hover:bg-swiss-muted transition-colors duration-200 text-center border-t-4 sm:border-t-0 sm:border-l-4 border-black"
                >
                  Download CV
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Geometric Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full hidden xl:block -z-10 bg-swiss-muted border-l-4 border-black">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-swiss-accent rounded-none border-4 border-black -translate-x-1/2 rotate-45" />
        <div className="absolute bottom-24 right-24 w-64 h-64 border-swiss swiss-dots" />
      </div>
    </section>
  );
};
