import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, MessageCircle } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Avatar entrance
      tl.fromTo(
        avatarRef.current,
        { opacity: 0, scale: 0.5, rotateX: 90 },
        { opacity: 1, scale: 1, rotateX: 0, duration: 1.2 },
        0.2
      );

      // Robot entrance
      tl.fromTo(
        robotRef.current,
        { opacity: 0, scale: 0, rotate: -180 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.7)' },
        0.5
      );

      // Title entrance
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.6
      );

      // Subtitle entrance
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        1
      );

      // Continuous floating animation for robot
      gsap.to(robotRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Mouse parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        gsap.to(avatarRef.current, {
          rotateY: moveX,
          rotateX: -moveY,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.to(robotRef.current, {
          x: moveX * 2,
          y: moveY * 2 - 15,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-green/5 via-transparent to-transparent" />
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-sm text-white/70">Available for new projects</span>
          </div>

          {/* Avatar and Robot container */}
          <div className="relative mb-8">
            {/* Avatar */}
            <img
              ref={avatarRef}
              src="/profile-avatar.png"
              alt="Muhammad Hussnain"
              className="w-48 h-48 sm:w-64 sm:h-64 object-cover object-top relative z-10"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            />
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
          >
            MUHAMMAD{' '}
            <span className="text-gradient">HUSSNAIN</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mb-4"
          >
            Full-Stack Web & Automation Engineer
          </p>

          {/* Description */}
          <p className="text-base text-white/50 max-w-xl mb-10">
            I specialize in transforming designs into functional, high-performing web applications. 
            Let's discuss your next project.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToProjects}
              className="group px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="group px-8 py-4 bg-accent-green text-dark font-semibold rounded-full hover:bg-accent-green/90 transition-all duration-300 hover:shadow-glow-green flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Let's Connect
            </button>
          </div>

          {/* Tech stack pills */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {['JavaScript', 'Node.js', 'React', 'Python', 'Automation'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm text-white/50 bg-white/5 rounded-full border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
};

export default Hero;
