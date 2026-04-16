"use client"
import Image from "next/image"
import { Card } from "@/components/Card"
import { SectionHeader } from "@/components/SectionHeader"
import profileImage from "@/assets/images/profile.png"
import bookImage from "@/assets/images/book-cover.png"
import { motion } from "framer-motion"
import { ToolboxItems } from "@/components/ToolboxItems"
import { 
  FileJson, 
  Layout, 
  Palette, 
  Atom, 
  Github, 
  Type, 
  GitBranch, 
  Terminal, 
  Server, 
  Zap, 
  Wind, 
  Laptop 
} from "lucide-react"

const toolboxItems = [
  { title: "Javascript", iconType: FileJson },
  { title: "Html5", iconType: Layout },
  { title: "CSS3", iconType: Palette },
  { title: "React", iconType: Atom },
  { title: "Github", iconType: Github },
  { title: "TypeScript", iconType: Type },
  { title: "Git", iconType: GitBranch },
  { title: "C++", iconType: Terminal },
  { title: "NodeJs", iconType: Server },
  { title: "NextJs", iconType: Zap },
  { title: "Tailwind", iconType: Wind },
  { title: "VSCode", iconType: Laptop },
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

export const AboutSection = () => {
  return (
    <section className="py-24 border-t-4 border-black swiss-dots" id="about">
      <div className="container">
        <SectionHeader
          number="03"
          eyebrow="Identity"
          title="Method & Focus"
          description="A systematic breakdown of the tools and interests that drive my objective-oriented development process."
        />

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Profile Card */}
          <div className="lg:col-span-4 border-4 border-black bg-white p-0 overflow-hidden relative group">
            <Image
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black text-white p-6 border-t-4 border-black">
              <span className="block font-black uppercase text-2xl tracking-tighter">Abdul Ahad</span>
              <span className="block text-swiss-accent font-bold uppercase text-xs tracking-widest mt-1">Full Stack Developer</span>
            </div>
          </div>

          {/* Toolbox Card */}
          <div className="lg:col-span-8 border-4 border-black bg-white p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 font-black text-4xl opacity-10">TOOLS</div>
             <h3 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4 inline-block">My Toolbox</h3>
             <ToolboxItems items={toolboxItems} itemsWrapperClassName="animate-move-left [animation-duration:40s]" />
             <ToolboxItems items={toolboxItems} className="mt-8" itemsWrapperClassName="animate-move-right [animation-duration:20s]" />
          </div>

          {/* Hobbies Grid */}
          <div className="lg:col-span-7 border-4 border-black bg-white p-8 md:p-12 relative">
             <div className="absolute top-0 right-0 p-4 font-black text-4xl opacity-10">BEYOND</div>
             <h3 className="text-3xl font-black uppercase mb-12 border-b-4 border-black pb-4 inline-block">Interests</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hobbies.map((hobby) => (
                  <div 
                    key={hobby.title}
                    className="border-4 border-black p-4 flex flex-col items-center justify-center aspect-square hover:bg-black group transition-all duration-300 cursor-default"
                  >
                    <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300 group-hover:rotate-12">{hobby.emoji}</span>
                    <span className="font-black uppercase text-[10px] tracking-widest text-black group-hover:text-white transition-colors duration-200">{hobby.title}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Reads Card -> KNOWLEDGE SCHEMATIC */}
          <div className="lg:col-span-5 border-4 border-black bg-black text-white p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative">
             {/* Background Scanner Grid */}
             <div className="absolute inset-0 opacity-10 swiss-grid pointer-events-none" />
             
             <div>
                <h3 className="text-3xl font-black uppercase mb-4 text-swiss-accent">Read Map</h3>
                <p className="text-white/60 font-medium">Mapping architectural systems and structural philosophies in real-time.</p>
             </div>

             {/* SCHEMATIC VISUALIZATION */}
             <div className="mt-8 relative aspect-[4/5] border-4 border-white bg-white/5 overflow-hidden">
                {/* Vertical Scanning Line */}
                <motion.div 
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-swiss-accent z-30 shadow-[0_0_15px_#FF3000]"
                />

                <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 125">
                   {/* Connection Lines */}
                   <motion.path 
                     d="M 20 30 L 50 60 L 80 40 M 50 60 L 60 90 L 30 100" 
                     fill="none" 
                     stroke="white" 
                     strokeWidth="0.5" 
                     strokeDasharray="2 2"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 2, ease: "easeInOut" }}
                   />

                   {[
                     { x: 20, y: 30, label: "LOGIC", tag: "SYS_A" },
                     { x: 80, y: 40, label: "TYPO", tag: "SYS_B" },
                     { x: 50, y: 60, label: "ARCH", tag: "CORE" },
                     { x: 60, y: 90, label: "MINI", tag: "SYS_C" },
                     { x: 30, y: 100, label: "SYST", tag: "SYS_D" }
                   ].map((node, i) => (
                     <g key={node.label}>
                        {/* Node Pulse */}
                        <motion.circle 
                          cx={node.x} cy={node.y} r="2" 
                          fill="#FF3000"
                          animate={{ r: [2, 4, 2], opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        />
                        {/* Technical Label */}
                        <text x={node.x + 4} y={node.y + 1} className="fill-white font-mono text-[4px] font-black tracking-tighter uppercase">
                          {node.label}
                        </text>
                        <text x={node.x + 4} y={node.y + 5} className="fill-white/30 font-mono text-[3px]">
                          [{node.tag}]
                        </text>
                     </g>
                   ))}
                </svg>

                {/* Corner Technical Decorative */}
                <div className="absolute top-2 right-2 flex flex-col items-end opacity-40">
                   <span className="text-[8px] font-mono text-white">X_REF: 44.82</span>
                   <span className="text-[8px] font-mono text-white">Z_MAP: ACTIVE</span>
                </div>
                
                <div className="absolute bottom-4 left-4 border-l-2 border-swiss-accent pl-2">
                   <span className="text-[10px] font-black text-white/50 block">STATUS</span>
                   <span className="text-[12px] font-black text-white block -mt-1 tracking-widest">STREAMING_KNOWLEDGE</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

