import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Code2, MessageSquare, Zap, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '6+', label: 'Years Experience', icon: Code2 },
  { value: '100%', label: 'Success Rate', icon: Target },
  { value: '50+', label: 'Projects Completed', icon: Zap },
  { value: '24h', label: 'Fast Communication', icon: MessageSquare },
];

const competencies = [
  {
    title: 'Strategic Development',
    subtitle: 'Architecture & Scalability',
    description: 'From MVPs to production systems, I architect clean, modular codebases that grow with your business.',
    icon: Code2,
  },
  {
    title: 'Proactive Communication',
    subtitle: 'Transparency & Speed',
    description: 'Regular updates, clear timelines, and quick responses ensure your project moves forward smoothly.',
    icon: MessageSquare,
  },
  {
    title: 'Automation Expertise',
    subtitle: 'Efficiency & Innovation',
    description: 'Deep knowledge of n8n, Make.com, and custom pipelines to automate workflows and boost efficiency.',
    icon: Zap,
  },
  {
    title: 'Business-Focused Engineering',
    subtitle: 'Impact & Results',
    description: 'I understand your goals and deliver smart, user-centric solutions that make a real impact.',
    icon: Target,
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate image slices
      gsap.fromTo(
        '.image-slice',
        { opacity: 0, x: (i) => (i % 2 === 0 ? -50 : 50) },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate content
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate stats
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%',
          },
        }
      );

      // Animate competencies
      gsap.fromTo(
        '.competency-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.competencies-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 font-display text-[20vw] font-bold text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        6+ YEARS
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 text-sm font-medium text-accent-green bg-accent-green/10 rounded-full mb-4">
            ABOUT ME
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            A GLIMPSE INTO <span className="text-gradient">MY WORLD</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Learn more about who I am, what I do, and what inspires me.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image with slice effect */}
          <div ref={imageRef} className="relative">
            <div className="relative flex justify-center">
              {/* Sliced image container */}
              <div className="relative w-80 h-80">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="image-slice absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: `inset(0 ${(2 - i) * 33.33}% 0 ${i * 33.33}%)`,
                    }}
                  >
                    <img
                      src="/profile-avatar.png"
                      alt="Muhammad Hussnain"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent-green/20 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h3 className="font-display text-4xl font-bold text-white mb-2">
              Muhammad Hussnain
            </h3>
            <p className="text-xl text-accent-green mb-4">
              Full-Stack Web & Automation Engineer
            </p>
            <p className="text-white/50 mb-2">
              JavaScript | Node.js | React | Python | Automation
            </p>
            
            <p className="text-white/70 leading-relaxed mb-8">
              I'm a results-oriented full-stack developer with over 6 years of experience 
              delivering high-performance web applications, backend systems, and powerful 
              automation solutions for startups, SMEs, and enterprise clients.
            </p>
            
            <p className="text-white/70 leading-relaxed mb-8">
              More than just a coder, I'm a strategic partner—translating business needs 
              into robust technical solutions that scale and drive real impact.
            </p>

            <a
              href="/Muhammad-Hussnain-Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-green text-dark font-semibold rounded-full hover:bg-accent-green/90 transition-all duration-300 hover:shadow-glow-green"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item p-6 bg-dark-gray border border-white/10 rounded-2xl text-center hover-lift"
            >
              <stat.icon className="w-8 h-8 text-accent-green mx-auto mb-4" />
              <div className="font-display text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core competencies */}
        <div className="competencies-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {competencies.map((comp) => (
            <div
              key={comp.title}
              className="competency-card p-8 bg-dark-gray border border-white/10 rounded-2xl hover:border-accent-green/30 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-green/10 rounded-xl group-hover:bg-accent-green/20 transition-colors">
                  <comp.icon className="w-6 h-6 text-accent-green" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white mb-1">
                    {comp.title}
                  </h4>
                  <p className="text-sm text-accent-green mb-3">{comp.subtitle}</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {comp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
