"use client"
import Link from "next/link";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import { HeroOrbit } from "@/components/HeroOrbit";

export const HeroSection = () => {
    // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 20, // Adjust for header height
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      className="py-40 md:py-72 lg:py-72 relative z-0 overflow-x-clip"
      id="hero"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5 pointer-events-none"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>
        <HeroOrbit
          size={430}
          rotation={-14}
          shouldOrbit
          orbitDuration="30s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={440}
          rotation={79}
          shouldOrbit
          orbitDuration="32s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
          <div className="size-2 rounded-full bg-emerald-300/20"></div>
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={178}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={500}
          rotation={20}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={98}
          shouldOrbit
          orbitDuration="40s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-8 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
          <div className="size-2 rounded-full bg  -emerald-300/20"></div>
        </HeroOrbit>
        <HeroOrbit
          size={710}
          rotation={144}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-14 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full bg-emerald-300/20"></div>
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="48s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-20 text-emerald-300" />
        </HeroOrbit>
      </div>
      <div className="container relative mt-28 md:mt-auto z-[2] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-full h-[350px] md:h-[400px] -top-52 md:-top-60 absolute -z-10 rounded-br-full ml-16">
            <iframe 
              src='https://my.spline.design/genkubgreetingrobot-l9LkjVwKy5x6iNABPdyUJOfa/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="rounded-br-full"
              title="3D Greeting Robot"
            />
          </div>
          <div className="bg-gray-950 border border-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 inline-flex items-center gap-2 sm:gap-4 rounded-lg sm:rounded-xl">
            <div className="bg-green-500 size-2 sm:size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 animate-ping-large rounded-full"></div>
            </div>
            <div className="text-xs sm:text-sm font-medium">
              Available for new projects
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mt-8 sm:mt-12 lg:mt-16">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center tracking-wide leading-tight">
            Building Exceptional User Experiences
          </h1>
          <p className="mt-4 sm:mt-6 text-center text-white/60 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto leading-relaxed">
            I specialize in transforming designs into functional,
            high-performing web applications. Let&apos;s discuss your next
            project.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 sm:mt-12 lg:mt-16 gap-4 sm:gap-6 w-full max-w-md mx-auto">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl"
            onClick={(e) => handleAnchorClick(e, "projects")}
          >
            <span className="font-semibold">Explore My Work </span>
            <ArrowDown className="size-4" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl"
            onClick={(e) => handleAnchorClick(e, "contact")}
          >
            <span>👋</span>
            <span className="font-semibold">Let&apos;s Connect</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
