"use client";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const ContactSection = () => {
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="container relative z-[2]">
        <div className="border-4 border-black bg-black text-white p-6 md:p-12 lg:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-10 swiss-diagonal pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 z-10"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter">
              Let&apos;s architect <br />
              something <span className="text-swiss-accent">Objective</span>.
            </h2>
            <p className="text-xl md:text-2xl mt-8 font-medium text-white/60 max-w-xl">
              Equipped for strategic system integration. 
              Initiate communication to discuss high-precision technical requirements.
            </p>
          </motion.div>

          <motion.a 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            href="mailto:ahadg446@gmail.com"
            className="group/btn relative z-10 w-full md:w-auto overflow-hidden border-4 border-white bg-white text-black hover:bg-swiss-accent hover:border-swiss-accent transition-all duration-300 px-6 py-8 md:px-12 flex items-center justify-center gap-2"
          >
            <span className="font-black uppercase tracking-widest text-lg whitespace-nowrap">Send Message</span>
            <ArrowUpRight className="size-8 flex-shrink-0 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </motion.a>

          {/* Decorative Section Number */}
          <div className="absolute top-0 right-0 p-8">
            <span className="text-swiss-accent font-black text-6xl opacity-20 tracking-tighter">SYS_04</span>
          </div>
        </div>
      </div>
    </section>
  );
};

