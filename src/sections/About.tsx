"use client";
import Image from "next/image";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import bookImage from "@/assets/images/book-cover.png";
import JavascriptIcon from "@/assets/icons/js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CSSIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import GithubIcon from "@/assets/icons/github.svg";
import GitIcon from "@/assets/icons/git.svg";
import NextJsIcon from "@/assets/icons/nextjs.svg";
import NodeJsIcon from "@/assets/icons/nodejs.svg";
import CppIcon from "@/assets/icons/cpp.svg";
import TailwindIcon from "@/assets/icons/tailwind.svg";
import TypescriptIcon from "@/assets/icons/typescript.svg";
import VSCodeIcon from "@/assets/icons/vscode.svg";
import mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import { Button } from "@/components/Button";
import { SkillTag } from "@/components/SkillTag";
import { GradientAccent } from "@/components/GradientAccent";

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
];

const hobbies = [
  { title: "Cricket", emoji: "🏏", left: "5%", top: "5%" },
  { title: "Footbal", emoji: "⚽", left: "50%", top: "5%" },
  { title: "Hiking", emoji: "🥾", left: "35%", top: "40%" },
  { title: "Gaming", emoji: "🎮", left: "10%", top: "35%" },
  { title: "Music", emoji: "🎵", left: "70%", top: "45%" },
  { title: "Fitness", emoji: "🏋️‍♂️", left: "5%", top: "65%" },
  { title: "Reading", emoji: "📚", left: "45%", top: "70%" },
];

const skills = {
  frontend: ["React.js", "Angular", "Next.js", "Vue.js", "Redux Toolkit", "Tailwind CSS", "MUI", "Bootstrap"],
  backend: ["Node.js", "Express.js", "NestJS", "Python", "Django", "FastAPI", "PHP", "Laravel", "RESTful APIs", "GraphQL"],
  databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase", "Mongoose", "Sequelize"],
  cloud: ["AWS", "Heroku", "Vercel", "DigitalOcean", "Docker", "CI/CD Pipelines"],
  automation: ["n8n", "Make.com", "Puppeteer", "Selenium", "BeautifulSoup", "Stripe", "Twilio", "Google Maps","Teams Integration","Google Meet integration","Zoom Integration","Third Party Integrations"]
};

export const AboutSection = () => {
  const constrainRef = useRef(null);

  return (
    <section className="py-20 lg:py-28" id="about">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn more about who I am, what I do, and what inspires me."
        />

        {/* Professional Introduction */}
        <div className="mt-16 lg:mt-20">
          <Card className="p-8 lg:p-12">
            {/* Name and Title */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                {/* Subtle background accent */}
                <div className="absolute inset-0 -m-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-sky-500/10"></div>

                {/* Professional name container */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/10">
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-3">
                    Muhammad Hussnain
                  </h3>

                  {/* Professional accent line */}
                  <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-sky-400 mx-auto rounded-full"></div>
                </div>
              </div>

              <h4 className="text-xl lg:text-2xl font-semibold text-white/90 mb-4 mt-6">
                Full-Stack Web & Automation Engineer
              </h4>
              <p className="text-white/70 text-lg">
                JavaScript | Node.js | React | Python | Automation
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                "6+ Years Experience",
                "100% Success Rate",
                "Clean & Scalable Code",
                "Fast Communication"
              ].map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircleIcon className="size-4 text-emerald-400 flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Main Description */}
            <div className="space-y-4 mb-8">
              <p className="text-white/80 text-lg leading-relaxed">
                I&apos;m a results-oriented full-stack developer with over 6 years of experience delivering high-performance web applications, backend systems, and powerful automation solutions for startups, SMEs, and enterprise clients.
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                More than just a coder, I&apos;m a strategic partner—translating business needs into robust technical solutions that scale and drive real impact.
              </p>
            </div>

            {/* What I Bring to the Table - Redesigned */}
            <div className="mb-8">
              <div className="text-center mb-12">
                <h4 className="text-2xl lg:text-3xl font-serif font-semibold text-white mb-3">
                  Core Competencies
                </h4>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "Strategic Development",
                    subtitle: "Architecture & Scalability",
                    description: "From MVPs to production systems, I architect clean, modular codebases that grow with your business."
                  },
                  {
                    title: "Proactive Communication",
                    subtitle: "Transparency & Speed",
                    description: "Regular updates, clear timelines, and quick responses ensure your project moves forward smoothly."
                  },
                  {
                    title: "Automation Expertise",
                    subtitle: "Efficiency & Innovation",
                    description: "Deep knowledge of n8n, Make.com, and custom pipelines to automate workflows and boost efficiency."
                  },
                  {
                    title: "Business-Focused Engineering",
                    subtitle: "Impact & Results",
                    description: "I understand your goals and deliver smart, user-centric solutions that make a real impact."
                  }
                ].map((item, index) => (
                  <div key={index} className="group relative min-h-[16rem] md:min-h-[18rem] lg:min-h-[16rem]">
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="space-y-4 flex-1 flex flex-col">
                        <div>
                          <h5 className="text-lg md:text-xl font-bold text-white mb-2">
                            {item.title}
                          </h5>
                          <p className="text-xs md:text-sm font-medium text-white/60 uppercase tracking-wider">
                            {item.subtitle}
                          </p>
                        </div>

                        <p className="text-white/70 text-sm leading-relaxed flex-1">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-2 pt-2 mt-auto">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full"></div>
                          <span className="text-xs text-white/40 uppercase tracking-wider">Core Strength</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Download Button */}
            <div className="flex justify-center">
              <a href="/Muhammad-Hussnain-Resume.pdf" target="_blank" download>
                <Button variant="white" size="lg" showArrow>
                  Download Resume
                </Button>
              </a>
            </div>
          </Card>
        </div>

        {/* Technical Skillset */}
        <div className="mt-12">
          <Card className="p-8 lg:p-12">
            <div className="text-center mb-12">
              <h4 className="text-2xl lg:text-3xl font-serif font-semibold text-white mb-3">
                Technical Expertise
              </h4>
              <GradientAccent variant="line" size="lg" className="mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <GradientAccent variant="bar" size="md" />
                    <h5 className="text-lg font-semibold text-white">Frontend Development</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill, index) => (
                      <SkillTag key={index}>
                        {skill}
                      </SkillTag>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <GradientAccent variant="bar" size="md" />
                    <h5 className="text-lg font-semibold text-white">Backend Development</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill, index) => (
                      <SkillTag key={index}>
                        {skill}
                      </SkillTag>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <GradientAccent variant="bar" size="md" />
                    <h5 className="text-lg font-semibold text-white">Database Management</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.databases.map((skill, index) => (
                      <SkillTag key={index}>
                        {skill}
                      </SkillTag>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <GradientAccent variant="bar" size="md" />
                    <h5 className="text-lg font-semibold text-white">Cloud & DevOps</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.cloud.map((skill, index) => (
                      <SkillTag key={index}>
                        {skill}
                      </SkillTag>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <GradientAccent variant="bar" size="md" />
                    <h5 className="text-lg font-semibold text-white">Automation & Integrations</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.automation.map((skill, index) => (
                      <SkillTag key={index}>
                        {skill}
                      </SkillTag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Original Toolbox and Hobbies Cards */}
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1">
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description=" Explore the technologis and tools I use to creaft the digital
                experiences."
              />
              <ToolboxItems
                items={toolboxItems}
                itemsWrapperClassName="animate-move-left [animation-duration:40s]"
              />
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
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              <Image
                src={mapImage}
                alt="map"
                className="h-full w-full object-cover object-left-top"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full  after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from bg-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from bg-emerald-300 to-sky-400 -z-10"></div>
                <Image
                  src={smileMemoji}
                  alt="smiling Memoji"
                  className="size-20"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
