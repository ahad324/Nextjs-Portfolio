"use client"
import Image from "next/image"
import { Card } from "@/components/Card"
import { SectionHeader } from "@/components/SectionHeader"
import profileImage from "@/assets/images/profile.png"
import bookImage from "@/assets/images/book-cover.png"
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ToolboxItems } from "@/components/ToolboxItems"
import { ElasticLine } from "@/components/ElasticLine"
import { Magnetic } from "@/components/Magnetic"

const toolboxItemsTop = [
  { title: "NextJs", iconUrl: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { title: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
  { title: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
  { title: "Javascript", iconUrl: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { title: "Tailwind", iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { title: "Nestjs", iconUrl: "https://cdn.simpleicons.org/nestjs/E0234E" },
  { title: "NodeJs", iconUrl: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { title: "Expressjs", iconUrl: "https://cdn.simpleicons.org/express/000000" },
  { title: "FastAPI", iconUrl: "https://cdn.simpleicons.org/fastapi/05998B" },
  { title: "Python", iconUrl: "https://cdn.simpleicons.org/python/3776AB" },
  { title: "Tkinter", iconUrl: "https://cdn.simpleicons.org/python/3776AB" },
  { title: "PyQt6", iconUrl: "https://cdn.simpleicons.org/qt/41CD52" },
  { title: "PHP", iconUrl: "https://cdn.simpleicons.org/php/777BB4" },
  { title: "C++", iconUrl: "https://cdn.simpleicons.org/cplusplus/00599C" },
];

const toolboxItemsBottom = [
  { title: "Docker", iconUrl: "https://cdn.simpleicons.org/docker/2496ED" },
  { title: "Nginx", iconUrl: "https://cdn.simpleicons.org/nginx/009639" },
  { title: "Supabase", iconUrl: "https://cdn.simpleicons.org/supabase/3FCF8E" },
  { title: "Appwrite", iconUrl: "https://cdn.simpleicons.org/appwrite/FD366E" },
  { title: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
  { title: "PostgreSQL", iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { title: "MySQL", iconUrl: "https://cdn.simpleicons.org/mysql/4479A1" },
  { title: "SQLite", iconUrl: "https://cdn.simpleicons.org/sqlite/003B57" },
  { title: "Prisma", iconUrl: "https://cdn.simpleicons.org/prisma/2D3748" },
  { title: "Firebase", iconUrl: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { title: "Redis", iconUrl: "https://cdn.simpleicons.org/redis/DC382D" },
  { title: "Git", iconUrl: "https://cdn.simpleicons.org/git/F05032" },
  { title: "Linux", iconUrl: "https://cdn.simpleicons.org/linux/FCC624" },
  { title: "Netlify", iconUrl: "https://cdn.simpleicons.org/netlify/00C7B7" },
  { title: "Vercel", iconUrl: "https://cdn.simpleicons.org/vercel/000000" },
  { title: "Postman", iconUrl: "https://cdn.simpleicons.org/postman/FF6C37" },
  { title: "Selenium", iconUrl: "https://cdn.simpleicons.org/selenium/43B026" },
];

const hobbies = [
  { title: "Cricket", emoji: "🏏" },
  { title: "Football", emoji: "⚽" },
  { title: "Hiking", emoji: "🥾" },
  { title: "Gaming", emoji: "🎮" },
  { title: "Sleeping", emoji: "😴" },
  { title: "Fitness", emoji: "🏋️‍♂️" },
  { title: "Reading", emoji: "📚" },
];

const HobbyCard = ({ hobby, index }: { hobby: typeof hobbies[0], index: number }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);
  const springConfig = { stiffness: 150, damping: 20 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className="border-r-2 border-b-2 border-black/10 p-6 flex flex-col items-center justify-center relative hover:bg-black group/hobby transition-all duration-300 overflow-hidden perspective-1000"
    >
      <div className="absolute inset-0 bg-swiss-accent/5 opacity-0 group-hover/hobby:opacity-100 transition-opacity" />
      <div className="absolute inset-0 p-2 pointer-events-none z-20 opacity-0 group-hover/hobby:opacity-100 transition-opacity">
        <div className="size-full border border-swiss-accent/20 flex flex-col justify-between p-2">
           <div className="flex justify-between text-[6px] font-mono text-swiss-accent/60">
             <span>ID: {index.toString().padStart(2, '0')}</span>
             <span>LVL: MAX</span>
           </div>
           <div className="flex justify-between text-[6px] font-mono text-swiss-accent/60">
             <span>METRIC: OK</span>
             <span>SYNC_A</span>
           </div>
        </div>
      </div>
      <motion.span style={{ translateZ: 40 }} className="text-4xl mb-3 group-hover/hobby:drop-shadow-[0_0_15px_#FF3000]">
        {hobby.emoji}
      </motion.span>
      <motion.span style={{ translateZ: 20 }} className="font-black uppercase tracking-widest text-[9px] text-black/40 group-hover/hobby:text-swiss-accent transition-colors">
        {hobby.title}
      </motion.span>
    </motion.div>
  );
};

const KnowledgeMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const nodes = [
    { x: 30, y: 30, z: 20, label: "LOGIC", tag: "CORE" },
    { x: 70, y: 25, z: -10, label: "ARCH", tag: "SYS_A" },
    { x: 50, y: 60, z: 40, label: "DB_GEN", tag: "STORAGE" },
    { x: 80, y: 80, z: 10, label: "UI_SYS", tag: "CLIENT" },
    { x: 20, y: 85, z: -20, label: "DEVOPS", tag: "INFRA" },
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      className="mt-8 relative aspect-[4/5] border-4 border-white bg-white/5 overflow-hidden perspective-1000"
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        {/* Connection Matrix */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none p-4" viewBox="0 0 100 100">
           <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
           </defs>
           <motion.path 
             d="M 30 30 L 70 25 L 80 80 L 50 60 L 20 85 L 30 30" 
             fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="1 2" opacity="0.3"
           />
           {/* Animated Data Packets */}
           <motion.circle r="0.5" fill="#FF3000" filter="url(#glow)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 30 30 L 70 25 L 80 80 L 50 60 L 20 85 L 30 30" />
           </motion.circle>
        </svg>

        {/* 3D Nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.label}
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`, 
              translateZ: node.z,
              transform: "translate(-50%, -50%)"
            }}
            className="absolute flex flex-col items-center group/node"
          >
            <div className="size-2 bg-swiss-accent rounded-full shadow-[0_0_10px_#FF3000] relative">
               <div className="absolute inset-0 bg-swiss-accent animate-ping rounded-full opacity-40" />
            </div>
            <div className="mt-2 text-center opacity-40 group-hover/node:opacity-100 transition-opacity">
              <div className="text-[6px] font-black text-white leading-none">{node.label}</div>
              <div className="text-[4px] font-mono text-swiss-accent">[{node.tag}]</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Static HUD Decoration */}
      <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between">
         <div className="flex justify-between items-start opacity-20 text-[8px] font-mono text-white">
            <span>STATIC_HUD_V4.2</span>
            <span>OS_STABLE</span>
         </div>
         <div className="flex justify-between items-end">
            <div className="border-l-2 border-swiss-accent pl-2">
               <div className="text-[8px] font-black text-white/40 uppercase">Map Status</div>
               <div className="text-[10px] font-black text-white uppercase tracking-widest">Tracking_Active</div>
            </div>
            <div className="text-[8px] font-mono text-white/20">COORD_SYNC: 100%</div>
         </div>
      </div>
    </div>
  );
};

export const AboutSection = () => {
  return (
    <section className="py-32 border-t-4 border-black bg-white relative overflow-hidden" id="about">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none swiss-grid" />
      
      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
        >
          <SectionHeader 
            number="04" 
            eyebrow="Architecture" 
            title="The Human Hardware" 
            description="Deconstructing the technical and philosophical framework behind my engineering process." 
          />
        </motion.div>

        <div className="mt-32 flex flex-col gap-12 lg:gap-24">
          
          {/* TOP ROW: Profile & Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            {/* Profile Diagnostic Scan */}
            <div className="lg:col-span-5 relative group" data-cursor="SCAN">
              <div className="absolute -top-6 -left-6 size-12 border-t-4 border-l-4 border-swiss-accent group-hover:-top-8 group-hover:-left-8 transition-all duration-500" />
              <div className="absolute -bottom-6 -right-6 size-12 border-b-4 border-r-4 border-black group-hover:-bottom-8 group-hover:-right-8 transition-all duration-500" />
              
              <div className="border-4 border-black overflow-hidden relative aspect-[4/5] bg-swiss-muted">
                <Image 
                  src={profileImage} 
                  alt="Abdul Ahad" 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                />
                {/* Diagnostic HUD Elements */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex justify-between items-start">
                    <div className="bg-black text-white px-2 py-1 text-[8px] font-mono tracking-widest">DETECTION_ACTIVE</div>
                    <div className="text-[8px] font-mono text-black bg-white px-2 py-1 border border-black">V_1.0.2</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-0.5 bg-swiss-accent/30 relative overflow-hidden">
                       <motion.div 
                         animate={{ x: ["-100%", "100%"] }} 
                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 bg-swiss-accent" 
                       />
                    </div>
                    <div className="text-[10px] font-black text-black uppercase tracking-tighter">AHAD_DIAGNOSTIC_ANALYSIS</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-black text-white px-6 py-4 border-2 border-white z-20">
                <span className="block font-black text-2xl uppercase font-heading leading-none">Ahad.sys</span>
              </div>
            </div>

            {/* Philosophy Terminal */}
            <div className="lg:col-span-7 border-4 border-black bg-white p-8 md:p-16 relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-black/20 uppercase">Core_Philosophy</div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12 font-heading [word-break:keep-all]">
                Engineering <br/> with <span className="text-swiss-accent">Intent</span>.
              </h3>
              <p className="text-xl md:text-2xl font-medium text-black/70 leading-relaxed max-w-xl italic">
                "I don't just build websites; I architect systems. Every line of code is a structural decision, aimed at creating high-performance digital environments that scale without friction."
              </p>
              
              <div className="mt-12 flex gap-4 border-t-4 border-black pt-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-swiss-accent uppercase tracking-widest">Experience</span>
                  <span className="text-2xl font-black font-mono">04+ YRS</span>
                </div>
                <div className="w-[1px] h-12 bg-black/10 mx-4" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-swiss-accent uppercase tracking-widest">Systems Built</span>
                  <span className="text-2xl font-black font-mono">42+ UNIT</span>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE ROW: The Skill Treadmill */}
          <div className="border-y-4 border-black bg-black py-12 -mx-4 md:-mx-24 relative overflow-hidden" data-cursor="STACK">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF3000_1px,transparent_1px)] [background-size:20px_20px]" />
             <div className="container relative z-10 overflow-hidden">
                <ToolboxItems items={toolboxItemsTop} itemsWrapperClassName="animate-move-left [animation-duration:30s]" />
                <ToolboxItems items={toolboxItemsBottom} itemsWrapperClassName="animate-move-right [animation-duration:35s]" className="mt-12" />
             </div>
          </div>

          {/* BOTTOM ROW: Knowledge Map & Interests */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Read Map Terminal */}
            <div className="lg:col-span-5 border-4 border-black bg-black text-white p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative" data-cursor="MAP">
               <div className="absolute inset-0 opacity-10 swiss-grid pointer-events-none" />
               <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-3xl font-black uppercase text-swiss-accent font-heading">Neural_Map</h3>
                    <div className="size-3 bg-swiss-accent animate-pulse" />
                  </div>
                  <p className="text-white/60 font-medium text-sm leading-relaxed uppercase tracking-tighter">Mapping architectural nodes and cognitive dependencies across the full-stack landscape.</p>
               </div>
               <KnowledgeMap />
            </div>

            {/* Interests Matrix */}
            <div className="lg:col-span-7 border-4 border-black bg-white p-8 md:p-12 relative overflow-hidden" data-cursor="GRID">
               <div className="absolute top-0 right-0 p-4 font-black text-5xl opacity-[0.03] uppercase tracking-tighter font-heading">Beyond_Code</div>
               <h3 className="text-4xl font-black uppercase mb-12 border-b-4 border-black pb-4 inline-block tracking-tighter font-heading [word-break:keep-all]">Human_Interests</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t-2 border-l-2 border-black/10">
                  {hobbies.map((hobby, i) => <HobbyCard key={hobby.title} hobby={hobby} index={i} />)}
                  <div className="border-r-2 border-b-2 border-black/10 p-6 bg-swiss-muted/30 flex items-center justify-center">
                     <div className="size-4 border-2 border-black/10 rotate-45" />
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none">
        <ElasticLine />
      </div>
    </section>
  );
};

