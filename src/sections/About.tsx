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
import { twMerge } from "tailwind-merge"

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
];

const HobbyCard = ({ hobby, index }: { hobby: typeof hobbies[0], index: number }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  const isLarge = index === 0 || index === 5;

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={twMerge(
        "border border-black/10 p-6 flex flex-col justify-between relative group/hobby transition-all duration-500 overflow-hidden perspective-1000 bg-white",
        isLarge ? "md:col-span-2 md:row-span-2" : "col-span-1"
      )}
    >
      {/* Diagnostic Scan Overlay */}
      <div className="absolute inset-0 bg-swiss-accent/0 group-hover/hobby:bg-swiss-accent/[0.03] transition-colors duration-500" />
      <div className="absolute top-0 left-0 w-full h-1 bg-swiss-accent scale-x-0 group-hover/hobby:scale-x-100 transition-transform duration-700 origin-left" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-mono text-black/20 group-hover/hobby:text-swiss-accent transition-colors">UNIT_{index.toString().padStart(2, '0')}</span>
          <div className="size-1.5 bg-black/10 group-hover/hobby:bg-swiss-accent rounded-full animate-pulse" />
        </div>
        
        <div className="flex flex-col">
          <span className="text-4xl mb-4 grayscale group-hover/hobby:grayscale-0 transition-all duration-500 transform group-hover/hobby:scale-110 origin-left">
            {hobby.emoji}
          </span>
          <h4 className="font-black uppercase tracking-tighter text-lg leading-none mb-1">{hobby.title}</h4>
          <span className="text-[8px] font-mono text-black/40 uppercase">Class: Peripheral_Interest</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 relative z-10">
        <div className="flex justify-between items-end text-[8px] font-mono uppercase">
          <span className="text-black/40">Engagement</span>
          <span className="text-swiss-accent">{Math.floor(80 + Math.random() * 20)}%</span>
        </div>
        <div className="w-full h-1 bg-black/5 relative overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "85%" }}
            className="absolute inset-0 bg-black group-hover/hobby:bg-swiss-accent transition-colors"
          />
        </div>
      </div>

      {/* Mechanical Corner Brackets */}
      <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover/hobby:opacity-100 transition-opacity">
         <div className="size-1 bg-swiss-accent" />
         <div className="size-1 bg-swiss-accent" />
      </div>
    </motion.div>
  );
};

const KnowledgeMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [log, setLog] = useState<string[]>(["INITIATING_SYNC", "MAPPING_NODES..."]);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = ["SIGNAL_STABLE", "NODE_ACTIVE", "DATA_PKT_SENT", "ARCH_OPTIMIZED"];
      setLog(prev => [...prev.slice(-3), messages[Math.floor(Math.random() * messages.length)]]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
      className="mt-8 relative aspect-[4/5] border-4 border-white/10 bg-white/5 overflow-hidden perspective-1000"
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none p-4" viewBox="0 0 100 100">
           <motion.path 
             d="M 30 30 L 70 25 L 80 80 L 50 60 L 20 85 L 30 30" 
             fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="1 2" opacity="0.3"
           />
        </svg>

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
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              className="size-3 bg-swiss-accent rounded-full shadow-[0_0_15px_#FF3000] relative"
            >
               <div className="absolute inset-0 bg-swiss-accent animate-ping rounded-full opacity-40" />
            </motion.div>
            <div className="mt-3 text-center opacity-40 group-hover/node:opacity-100 transition-opacity">
              <div className="text-[8px] font-black text-white leading-none tracking-widest font-heading">{node.label}</div>
              <div className="text-[6px] font-mono text-swiss-accent mt-1">[{node.tag}]</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-4 left-4 right-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 font-mono">
         <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
            <span className="text-[8px] text-white/40 uppercase">Neural_Telemetery</span>
            <span className="text-[8px] text-swiss-accent">LIVE_SYNC</span>
         </div>
         <div className="space-y-1">
            {log.map((entry, i) => (
              <div key={i} className="text-[7px] text-white/60 flex justify-between font-mono">
                <span>&gt; {entry}</span>
                <span className="text-white/20">{Math.random().toString(16).slice(2, 6)}</span>
              </div>
            ))}
         </div>
      </div>

      <div className="absolute top-4 left-4 size-4 border-t border-l border-white/20" />
      <div className="absolute top-4 right-4 size-4 border-t border-r border-white/20" />
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
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
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
                  priority
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
                "I architect resilient systems as a Full-Stack Developer by day and a Cybersecurity Defender by night. Every line of code is a strategic decision, aimed at creating high-performance, secure digital environments."
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

