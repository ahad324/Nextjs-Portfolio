import dynamic from "next/dynamic";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { Footer } from "@/sections/Footer";

const ProjectsSection = dynamic(() => import("@/sections/Projects").then(mod => mod.ProjectsSection), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});
const ExperienceSection = dynamic(() => import("@/sections/Experience").then(mod => mod.ExperienceSection));
const TapeSection = dynamic(() => import("@/sections/Tape").then(mod => mod.TapeSection));
const AboutSection = dynamic(() => import("@/sections/About").then(mod => mod.AboutSection));
const ContactSection = dynamic(() => import("@/sections/Contact").then(mod => mod.ContactSection));

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <TapeSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
