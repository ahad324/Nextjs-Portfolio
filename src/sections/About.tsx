"use client"
import Image from "next/image"
import { Card } from "@/components/Card"
import { SectionHeader } from "@/components/SectionHeader"
import bookImage from "@/assets/images/book-cover.png"
import JavascriptIcon from "@/assets/icons/js.svg"
import HTMLIcon from "@/assets/icons/html5.svg"
import CSSIcon from "@/assets/icons/css3.svg"
import ReactIcon from "@/assets/icons/react.svg"
import GithubIcon from "@/assets/icons/github.svg"
import GitIcon from "@/assets/icons/git.svg"
import NextJsIcon from "@/assets/icons/nextjs.svg"
import NodeJsIcon from "@/assets/icons/nodejs.svg"
import CppIcon from "@/assets/icons/cpp.svg"
import TailwindIcon from "@/assets/icons/tailwind.svg"
import TypescriptIcon from "@/assets/icons/typescript.svg"
import VSCodeIcon from "@/assets/icons/vscode.svg"
import profileImage from "@/assets/images/profile.png"
import { CardHeader } from "@/components/CardHeader"
import { ToolboxItems } from "@/components/ToolboxItems"
import { motion } from "framer-motion"
import { useRef } from "react"

const toolboxItems = [
  {
    title: "Javascript",
    iconType: JavascriptIcon,
  },
  {
    title: "Html5",
    iconType: HTMLIcon,
  },
  {
    title: "CSS3",
    iconType: CSSIcon,
  },
  {
    title: "React",
    iconType: ReactIcon,
  },
  {
    title: "Github",
    iconType: GithubIcon,
  },
  {
    title: "TypeScript",
    iconType: TypescriptIcon,
  },
  {
    title: "Git",
    iconType: GitIcon,
  },
  {
    title: "C++",
    iconType: CppIcon,
  },
  {
    title: "NodeJs",
    iconType: NodeJsIcon,
  },
  {
    title: "NextJs",
    iconType: NextJsIcon,
  },
  {
    title: "Tailwind",
    iconType: TailwindIcon,
  },
  {
    title: "VSCode",
    iconType: VSCodeIcon,
  },
]

const hobbies = [
  { title: "Cricket", emoji: "🏏", left: "5%", top: "5%" },
  { title: "Footbal", emoji: "⚽", left: "50%", top: "5%" },
  { title: "Hiking", emoji: "🥾", left: "35%", top: "40%" },
  { title: "Gaming", emoji: "🎮", left: "10%", top: "35%" },
  { title: "Sleeping", emoji: "😴", left: "70%", top: "45%" },
  { title: "Fitness", emoji: "🏋️‍♂️", left: "5%", top: "65%" },
  { title: "Reading", emoji: "📚", left: "45%", top: "70%" },
]

export const AboutSection = () => {
  const constrainRef = useRef(null)
  return (
    <section className="py-20 lg:py-28" id="about">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn more about who I am, what I do, and what inspires me."
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
           <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1 overflow-hidden">
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="Abdul Ahad - Professional Profile"
                className="h-full w-full object-cover object-center"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              {/* Elegant inset glow effect using emerald accent */}
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_30px_rgba(16,185,129,0.1)] pointer-events-none"></div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description=" Explore the technologis and tools I use to creaft the digital
                experiences."
              />
              <ToolboxItems items={toolboxItems} itemsWrapperClassName="animate-move-left [animation-duration:40s]" />
              <ToolboxItems
                items={toolboxItems}
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animation-duration:20s]"
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond the Code"
                description=" Explore my insterests and hobbies beyond the digital realme."
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constrainRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute hover:cursor-grab"
                    style={{ left: hobby.left, top: hobby.top }}
                    drag
                    dragConstraints={constrainRef}
                    dragElastic={0.5}
                    whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                    dragMomentum={true}
                    dragTransition={{ bounceStiffness: 100, bounceDamping: 7 }}
                  >
                    <span className="font-medium text-gray-950">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader title="My Reads" description="Explore the books shaping my perspectives." />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage.src || "/placeholder.svg"} alt="Book Cover" width={200} height={300} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
