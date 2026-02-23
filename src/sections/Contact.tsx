import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent-green/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Left content */}
          <div className="contact-content">
            <span className="inline-block px-4 py-2 text-sm font-medium text-accent-green bg-accent-green/10 rounded-full mb-4">
              GET IN TOUCH
            </span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
              LET'S CREATE <span className="text-gradient">SOMETHING</span> AMAZING
            </h2>
            <p className="text-lg text-white/50 mb-12">
              Ready to bring your next project to life? Let's connect and discuss
              how I can help you achieve your goals.
            </p>

            {/* Social links */}
            <div className="text-left">
              <p className="text-sm text-white/50 mb-4">Follow me on</p>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', href: 'https://github.com/techInnovator1999' },
                  { name: 'Upwork', href: 'https://www.upwork.com/freelancers/~01fca1f62ecf781358' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-accent-green hover:text-dark hover:border-accent-green transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
