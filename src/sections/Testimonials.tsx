import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Olivia Green',
    role: 'Head of Design',
    company: 'GreenLeaf',
    content: 'Working with Hussnain was a pleasure. His expertise in frontend development brought our designs to life in a way we never imagined. The website has exceeded our expectations.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&backgroundColor=c8f07d',
  },
  {
    id: 2,
    name: 'Peter',
    role: 'Co-founder',
    company: 'StarStruck',
    content: 'Hussnain transformed our platform\'s UI into a modern, responsive experience while also building reliable web scraping solutions that power our business. His work brought both design precision and technical depth.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Peter&backgroundColor=7de5f0',
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Director of IT',
    company: 'MegaCorp',
    content: 'Hussnain\'s work on our website has been nothing short of exceptional. He\'s a talented developer who is also a great communicator. We highly recommend him.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=d07df0',
  },
  {
    id: 4,
    name: 'Patrick Olatunji',
    role: 'Client',
    company: 'Upwork',
    content: 'Muhammad delivered a fully functional app in just four days. He understood the workflow instantly, kept me updated, and produced professional results with minimal revisions.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patrick&backgroundColor=f07d9d',
  },
  {
    id: 5,
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechStart',
    content: 'Muhammad was fast working and very knowledgeable. Would definitely work with him again! His attention to detail and problem-solving skills are exceptional.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=f0d77d',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-header',
        { opacity: 0, y: 30 },
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

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="testimonial-header text-center mb-16">
          <span className="inline-block px-4 py-2 text-sm font-medium text-accent-green bg-accent-green/10 rounded-full mb-4">
            HAPPY CLIENTS
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            WHAT CLIENTS <span className="text-gradient">SAY</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Don't just take my word for it. See what my clients have to say about my work.
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative bg-dark-gray border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden">
            {/* Quote icon */}
            <Quote className="absolute top-8 right-8 w-16 h-16 text-accent-green/20" />

            {/* Content */}
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                >
                  <p className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-8">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full bg-white/10"
                    />
                    <div>
                      <h4 className="font-display text-xl font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/50">
                        {testimonial.role} @ {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-accent-green'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Client logos marquee */}
        <div className="mt-24 overflow-hidden">
          <div className="flex animate-marquee">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-16 items-center px-8">
                {['GreenLeaf', 'StarStruck', 'MegaCorp', 'TechStart', 'Upwork'].map(
                  (company) => (
                    <span
                      key={`${setIndex}-${company}`}
                      className="font-display text-3xl text-white/20 whitespace-nowrap"
                    >
                      {company}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
