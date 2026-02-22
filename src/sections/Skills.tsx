import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: ['React.js', 'Angular', 'Next.js', 'Vue.js', 'Redux Toolkit', 'Tailwind CSS', 'MUI', 'Bootstrap'],
    color: '#c8f07d',
  },
  {
    title: 'Backend Development',
    skills: ['Node.js', 'Express.js', 'NestJS', 'Python', 'Django', 'FastAPI', 'PHP', 'Laravel', 'RESTful APIs', 'GraphQL'],
    color: '#7de5f0',
  },
  {
    title: 'Database Management',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'Mongoose', 'Sequelize'],
    color: '#d07df0',
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Heroku', 'Vercel', 'DigitalOcean', 'Docker', 'CI/CD Pipelines'],
    color: '#f07d9d',
  },
  {
    title: 'Automation & Integrations',
    skills: ['n8n', 'Make.com', 'Puppeteer', 'Selenium', 'BeautifulSoup', 'Stripe', 'Twilio', 'Google Maps', 'Teams Integration', 'Zoom Integration'],
    color: '#f0d77d',
  },
];

const toolbox = [
  'JavaScript', 'HTML5', 'CSS3', 'React', 'GitHub', 'TypeScript', 'Git', 'C++', 'Node.js', 'Next.js', 'Tailwind', 'VSCode',
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill categories
      gsap.fromTo(
        '.skill-category',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate toolbox items
      gsap.fromTo(
        '.toolbox-item',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.toolbox-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-green/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 text-sm font-medium text-accent-green bg-accent-green/10 rounded-full mb-4">
            MY EXPERTISE
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            TECHNICAL <span className="text-gradient">SKILLS</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on development experience.
          </p>
        </div>

        {/* Skills grid */}
        <div ref={skillsRef} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-24">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-category p-6 bg-dark-gray border border-white/10 rounded-2xl hover:border-opacity-50 transition-all duration-300 group"
              style={{ '--category-color': category.color } as React.CSSProperties}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="font-display text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm text-white/70 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Toolbox section */}
        <div className="text-center mb-12">
          <h3 className="font-display text-3xl font-bold text-white mb-2">
            My Toolbox
          </h3>
          <p className="text-white/50">
            Explore the technologies and tools I use to craft digital experiences.
          </p>
        </div>

        {/* Toolbox marquee */}
        <div className="toolbox-grid flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {toolbox.map((tool) => (
            <div
              key={tool}
              className="toolbox-item px-6 py-3 bg-dark-gray border border-white/10 rounded-full flex items-center gap-3 hover:border-accent-green/50 hover:bg-accent-green/5 transition-all duration-300 group"
            >
              <span className="w-2 h-2 rounded-full bg-accent-green group-hover:scale-150 transition-transform" />
              <span className="text-white/70 group-hover:text-white transition-colors">
                {tool}
              </span>
            </div>
          ))}
        </div>

        {/* Hobbies section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl font-bold text-white mb-2">
              Beyond the Code
            </h3>
            <p className="text-white/50">
              Explore my interests and hobbies beyond the digital realm.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Cricket', emoji: '🏏' },
              { name: 'Football', emoji: '⚽' },
              { name: 'Hiking', emoji: '🥾' },
              { name: 'Gaming', emoji: '🎮' },
              { name: 'Music', emoji: '🎵' },
              { name: 'Fitness', emoji: '🏋️‍♂️' },
              { name: 'Reading', emoji: '📚' },
            ].map((hobby) => (
              <div
                key={hobby.name}
                className="px-6 py-3 bg-gradient-to-r from-accent-green/20 to-accent-blue/20 border border-white/10 rounded-full flex items-center gap-3 hover:scale-105 transition-transform"
              >
                <span className="text-2xl">{hobby.emoji}</span>
                <span className="text-white font-medium">{hobby.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
