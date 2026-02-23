import { ArrowUp, Github, Briefcase } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/techInnovator1999', label: 'GitHub' },
    { icon: Briefcase, href: 'https://www.upwork.com/freelancers/~01fca1f62ecf781358', label: 'Upwork' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-accent-green flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="font-display text-xl font-bold text-dark">H</span>
              </div>
              <span className="font-display text-2xl font-medium text-white">
                HUSSNAIN
              </span>
            </a>
            <p className="text-sm text-white/40">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm text-white/50 hover:text-accent-green transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full text-white/50 hover:bg-accent-green hover:text-dark transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Back to top button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-white/40 hover:text-accent-green transition-colors"
          >
            <span>Back to top</span>
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-accent-green group-hover:text-dark transition-all duration-300">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
