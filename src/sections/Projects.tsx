import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Check } from 'lucide-react';
import { getFeaturedProjects, getNonFeaturedProjects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const featuredProjects = getFeaturedProjects().map((project, index) => ({
    id: index + 1,
    year: project.year,
    title: project.title,
    description: project.description,
    features: project.results?.map(r => r.title) || [],
    image: project.image,
    link: project.link,
    tags: project.tech,
  }));

  const moreProjects = getNonFeaturedProjects();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each project card on scroll
      projectRefs.current.forEach((project, index) => {
        if (!project) return;

        const direction = index % 2 === 0 ? -50 : 50;

        gsap.fromTo(
          project,
          { opacity: 0, x: direction, rotateX: 10 },
          {
            opacity: 1,
            x: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <span className="inline-block px-4 py-2 text-sm font-medium text-accent-green bg-accent-green/10 rounded-full mb-4">
            REAL-WORLD RESULTS
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            FEATURED <span className="text-gradient">PROJECTS</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            See how I transformed concepts into engaging digital experiences.
          </p>
        </div>
      </div>

      {/* Projects grid - staggered layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { projectRefs.current[index] = el; }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-3/5 relative group">
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-accent-green text-dark font-semibold rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Year badge */}
                <div className="absolute -top-4 -left-4 px-4 py-2 bg-dark-gray border border-white/10 rounded-full">
                  <span className="text-sm font-medium text-accent-green">{project.year}</span>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-2/5">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-white/60 bg-white/5 rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                  {project.title}
                </h3>

                <p className="text-white/50 mb-6">
                  {project.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white/70">
                      <Check className="w-5 h-5 text-accent-green flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-green hover:text-accent-green/80 transition-colors group"
                >
                  <span className="font-medium">Visit Live Site</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional projects grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-12">
          <h3 className="font-display text-3xl font-bold text-white mb-2">More Projects</h3>
          <p className="text-white/50">Explore my complete collection of work</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moreProjects.map((project, idx) => (
            <div
              key={idx}
              className="group relative bg-dark-gray border border-white/10 rounded-xl overflow-hidden hover-lift"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-accent-green text-dark font-semibold rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs text-white/50 bg-white/5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">
                  {project.title}
                </h4>
                <p className="text-sm text-white/50">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
