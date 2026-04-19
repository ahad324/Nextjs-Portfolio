"use client"
import Link from "next/link";
import { motion, Variants, Transition, Easing } from "framer-motion";
import { HeroOrbit } from "@/components/HeroOrbit";
import { Star, Circle, Square, Plus } from "lucide-react";
import { ElasticLine } from "@/components/ElasticLine";
import { useLoading } from "@/context/LoadingContext";
import { SplitText } from "@/components/SplitText";
import { Magnetic } from "@/components/Magnetic";

export const HeroSection = () => {
  const { isLoading } = useLoading();
  const isReady = !isLoading;

  return (
    <section
      className="pt-40 pb-20 md:pt-60 md:pb-32 relative z-0 overflow-hidden swiss-grid-pattern min-h-screen flex flex-col justify-center"
      id="hero"
    >
      {/* GEOMETRIC ORBIT CONSTELLATION - Cinematic Entrance */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isReady ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
      >
        <HeroOrbit size={800} rotation={-45} shouldOrbit orbitDuration="80s" shouldSpin spinDuration="10s">
          <Star className="size-12 text-swiss-accent/20 fill-swiss-accent/10" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="60s">
          <Circle className="size-4 text-black/10 fill-black/5" />
        </HeroOrbit>
        <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration="70s" shouldSpin spinDuration="20s">
          <Plus className="size-8 text-swiss-accent/20" />
        </HeroOrbit>
        <HeroOrbit size={430} rotation={79} shouldOrbit orbitDuration="50s">
          <Square className="size-6 text-black/10 border-2 border-black/10" />
        </HeroOrbit>
      </motion.div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Section Number & Vertical Line */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center gap-4">
            <span className="text-swiss-accent font-black text-xl tracking-tighter">SYS_01</span>
            <div className="w-1 h-32 bg-swiss-accent" />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-11 flex flex-col items-start px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-black text-white px-4 py-1 mb-8 inline-block"
            >
              <span className="uppercase font-bold tracking-[0.3em] text-[10px] md:text-xs text-swiss-accent">
                System Integration Status: Active
              </span>
            </motion.div>

            <h1 className="text-[clamp(2rem,9vw,14rem)] font-black leading-[0.8] tracking-tighter uppercase mb-12 flex flex-col">
              <SplitText text="Architecting" delay={0.5} />
              <SplitText text="Performant" className="text-swiss-accent" delay={0.7} />
              <SplitText text="Systems" delay={0.9} />
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-end mt-12 md:mt-16">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-xl md:text-2xl font-medium max-w-lg leading-tight text-black/70 border-l-4 border-black pl-8"
              >
                I engineer end-to-end web applications through a lens of structural discipline 
                and functional clarity. Expert in Full Stack environments and modular software design.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 1.8 }}
                className="flex flex-col sm:flex-row gap-0 border-4 border-black box-content overflow-hidden w-fit relative z-30 bg-white"
              >
                <Magnetic strength={0.3}>
                  <Link
                    href="#projects"
                    data-cursor="EXPLORE"
                    className="bg-black text-white px-10 py-6 font-black uppercase tracking-widest text-sm hover:bg-swiss-accent transition-colors duration-300 text-center cursor-pointer block"
                  >
                    Explore Work
                  </Link>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Link
                    download
                    href="/assets/AbdulAhad-Resume.pdf"
                    data-cursor="RESUME"
                    className="bg-white text-black px-10 py-6 font-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors duration-300 text-center border-t-4 sm:border-t-0 sm:border-l-4 border-black cursor-pointer block"
                  >
                    Download CV
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Geometric Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full hidden xl:block -z-10 bg-swiss-muted/30 border-l-4 border-black/5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-swiss-accent/10 rounded-none border-4 border-black/5 -translate-x-1/2 rotate-45" 
        />
        <div className="absolute bottom-24 right-24 w-64 h-64 border-swiss swiss-dots opacity-20" />
      </div>

      {/* SECTION DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full h-[120px]">
        <ElasticLine />
      </div>
    </section>
  );
};
