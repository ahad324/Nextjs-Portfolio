// Project type definition
export interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
  category: string;
  tech: string[];
  year: string;
  featured?: boolean;
  company?: string;
  results?: { title: string }[];
}

// All projects data with featured field
export const allProjects: Project[] = [
  {
    title: "The Site Scout Chrome Extension",
    description:
      "Developed a comprehensive Chrome extension for real-time on-page SEO analysis and auditing. Built with Chrome Extension APIs (Manifest V3), JavaScript, and modern web technologies, the extension provides instant insights into page metadata, structured data, keyword usage, and heading structure directly within the browser.",
    link: "https://www.upwork.com/freelancers/~01fca1f62ecf781358?p=1990469203680608256",
    image: "/assets/projectimages/sitescout.png",
    category: "Browser Extensions",
    tech: [
      "Google Chrome Extension",
      "SEO Audit",
      "JavaScript",
      "Web Scraping",
      "PSD to XHTML",
    ],
    year: "2024",
    featured: false,
    company: "Upwork Client",
    results: [
      { title: "Real-time on-page SEO analysis" },
      { title: "Manifest V3 Chrome extension architecture" },
      { title: "Automated content and metadata auditing" },
    ],
  },
  {
    title: "AI-Driven Data Automation Workflow",
    description:
      "It starts with a webhook triggering the workflow, followed by image and audio analysis, where the data is downloaded and analyzed. Then, the data is passed to a condition that routes it for further processing. The workflow includes integrations with a third-party platform (TAKE APP) for managing orders, inventory, and customer data, while interacting with Google Docs for descriptions and AI for generating replies and responses. This setup automates the flow of data between services for tasks like analyzing content, managing orders, and interacting with AI models for insights.",
    link: "https://www.upwork.com/freelancers/~01fca1f62ecf781358?p=1952776433532428288",
    image: "/assets/projectimages/ai-driven.png",
    category: "AI/ML",
    tech: ["n8n", "Automated Workflow", "AI Bot", "Third-Party Integration"],
    year: "2024",
    featured: true,
    company: "Year",
    results: [
      { title: "Automated Multi-Step Workflows" },
      { title: "Third-Party Platform Integrations" },
      { title: "AI-Powered Data Insights" },
    ],
  },
  {
    title: "Refrax Healthcare Platform",
    description:
      "RefraX is a secure healthcare document exchange platform with React frontend and Node.js backend. The system uses unique tokens for patient document uploads, ensuring privacy and GDPR compliance. Features include encrypted storage (Supabase), role-based access control, email notifications, and mobile-responsive design. Built with React, TailwindCSS, and Express, RefraX streamlines secure document collection between healthcare providers and patients without exposing personal information.",
    link: "https://refrax.co.uk/",
    image: "/assets/projectimages/refrax.png",
    category: "Healthcare",
    tech: ["React", "Node.js", "GDPR", "Responsive Design", "Supabase"],
    year: "2024",
    featured: true,
    company: "Year",
    results: [
      { title: "Encrypted Data Storage" },
      { title: "Role-Based Access Control" },
      { title: "GDPR-Compliant Document Sharing" },
    ],
  },
  {
    title: "StarStruck Platform",
    description:
      "Winning revenue, faster, Growing partners & listings, Ranking higher, Closing more deals, and Increasing buyer reach",
    link: "https://www.getstarstruck.com/",
    image: "/assets/projectimages/starstruck.png",
    category: "Web Development",
    tech: [
      "Front-End Development",
      "Python",
      "Web Scraping",
      "Bug Fix",
      "Selenium",
    ],
    year: "2024",
    featured: true,
    company: "Year",
    results: [
      { title: "Full Stack Development" },
      { title: "Web Scraping Solutions" },
      { title: "Performance Optimization" },
    ],
  },
  {
    title: "The Current News Platform",
    description: "Website which shows daily news, top trends etc.",
    link: "https://thecurrent.pk/",
    image: "/assets/projectimages/thecurrent.png",
    category: "News Platform",
    tech: ["React", "Front-End Development", "API Integration", "OpenAPI"],
    year: "2023",
    featured: true,
    company: "Year",
    results: [
      { title: "Live News Feed Integration" },
      { title: "Trending Topics Display" },
      { title: "Clean and Responsive UI" },
    ],
  },
  {
    title: "Pulsebot AI Assistant",
    description:
      "Ai based shoping assistant and buy things using cryptocurrencies",
    link: "https://pulsebot.cc/",
    image: "/assets/projectimages/pulsebot.png",
    category: "AI/ML",
    tech: ["React", "Blockchain", "API Integration", "ChatGPT API Integration"],
    year: "2023",
    featured: false,
    results: [
      { title: "Advanced machine learning algorithms" },
      { title: "Real-time data processing and automation" },
      { title: "Multi-platform API integrations" },
    ],
  },
  {
    title: "MealsDeals Web & Scraper",
    description:
      "Fixed major bugs and optimized the MealsDeals website and scraper. Improved data scraping with Puppeteer, added Redis caching for faster performance, and automated deployments using CI/CD pipelines for reliability and scalability.",
    link: "https://mealsdeals.app/",
    image: "/assets/projectimages/mealsdeals.png",
    category: "Web Scraping / Automation",
    tech: [
      "Puppeteer",
      "Redis",
      "CI/CD",
      "Deployment Automation",
      "Web Scraping",
    ],
    year: "2024",
    featured: false,
    company: "MealsDeals",
    results: [
      { title: "Improved Scraper Reliability" },
      { title: "Optimized Redis Caching" },
      { title: "Automated Deployment via CI/CD" },
    ],
  },

  {
    title: "N8n Facebook Leads Manager",
    description:
      "This n8n automation workflow is designed to streamline the management of Facebook lead data. It triggers when a new lead is submitted via Facebook Ads, stores the lead data in a Supabase database, and sends a message to a moderator for review. The workflow also includes outgoing messages and follow-up actions, such as retrieving data, editing fields, and scheduling follow-up tasks. This automated system enhances efficiency and ensures timely follow-up for better lead management.",
    link: "https://www.upwork.com/freelancers/~01fca1f62ecf781358?p=1952770404081303552",
    image: "/assets/projectimages/n8n-facebook.png",
    category: "Automation",
    tech: [
      "ChatGPT API Integration",
      "Database Management",
      "Automation",
      "Supabase",
      "Automated Workflow",
    ],
    year: "2023",
    featured: false,
    results: [
      { title: "Automated Lead Management" },
      { title: "Database Integration with Supabase" },
      { title: "Streamlined Review Process" },
    ],
  },
  {
    title: "Score Spot UI Design",
    description: "Complete amd pixel perfect UI design from figma to REACT",
    link: "https://score-spot-eta.vercel.app/",
    image: "/assets/projectimages/scorespot.png",
    category: "Web Development",
    tech: ["React", "Tailwind CSS", "Responsive Design", "API Integration"],
    year: "2023",
    featured: false,
    results: [
      { title: "Responsive design across all devices" },
      { title: "Optimized performance and loading" },
      { title: "Modern UI/UX design patterns" },
    ],
  },
  {
    title: "Paragon CRM System",
    description: "CRM for leads management",
    link: "https://portal.paragoneducation.pk/admin/crm-dashboard",
    image: "/assets/projectimages/paragon.png",
    category: "Web Development",
    tech: ["JavaScript", "Laravel", "PostgreSQL"],
    year: "2023",
    featured: false,
    results: [
      { title: "Responsive design across all devices" },
      { title: "Optimized performance and loading" },
      { title: "Efficient Lead Management" },
    ],
  },
  {
    title: "Naqtax Website",
    description:
      "Created a website according to the requirement of client. Completed both frontend and backend based on client requirements. Delivered the project on time and with high-quality of code.",
    link: "https://www.upwork.com/freelancers/~01fca1f62ecf781358?p=1670119039946682368",
    image: "/assets/projectimages/naqtax.png",
    category: "Web Development",
    tech: [
      "HTML",
      "CSS",
      "Bootstrap",
      "Angular",
      "Node.js",
      "PSD to HTML",
      "JavaScript",
      "MongoDB",
      "Responsive Design",
    ],
    year: "2023",
    featured: false,
    results: [
      { title: "Responsive design across all devices" },
      { title: "Optimized performance and loading" },
      { title: "Cross-platform Compatibility" },
    ],
  },
  {
    title: "Digitalismd",
    description:
      "An innovative health-tech company creating smart, user-friendly tools that make doctors' work easier, faster, and more accurate. I created the landing page, user panel, and admin panel, and also integrated Stripe as a payment gateway.",
    link: "https://digitalismd.com/",
    image: "/assets/projectimages/digitalismd.png",
    category: "Healthcare",
    tech: ["Stripe", "Landing Page", "Amazon EC2", "Amazon S3", "OAuth"],
    year: "2024",
    featured: false,
    company: "Digitalismd",
    results: [
      { title: "Landing Page Development" },
      { title: "Admin & User Panels" },
      { title: "Stripe Payment Integration" },
    ],
  },
  {
    title: "Reddit Login Automation",
    description:
      "Built a stealth Puppeteer script that launches an undetectable browser and automates login with provided Reddit account credentials.",
    link: "https://www.upwork.com/freelancers/~01fca1f62ecf781358?p=1960603243748724736",
    image: "/assets/projectimages/redditloginautomation.png",
    category: "Automation",
    tech: ["Scripting", "Web Scraping", "Node.js", "Puppeteer", "Reddit"],
    year: "2024",
    featured: false,
    company: "Upwork Client",
    results: [
      { title: "Undetectable Browser Automation" },
      { title: "Reddit Login Workflow" },
      { title: "Web Scraping with Puppeteer" },
    ],
  },
  {
    title: "Drippy",
    description:
      "Drippy is a marketplace where fans can bid on and purchase authenticated items directly from their favorite athletes and celebrities. A portion of every sale supports a charity of their choice. I contributed as a frontend developer by integrating APIs, refactoring code, and building features on Google Cloud Platform.",
    link: "https://www.getdrippy.io/",
    image: "/assets/projectimages/drippy.png",
    category: "Marketplace",
    tech: [
      "API Integration",
      "Front-End Development",
      "React",
      "Code Refactoring",
      "Google Cloud Platform",
    ],
    year: "2024",
    featured: false,
    company: "Drippy",
    results: [
      { title: "Frontend Development" },
      { title: "API Integrations" },
      { title: "Performance Optimizations" },
    ],
  },
  {
    title: "CESR Track",
    description:
      "An AI-assisted interactive portfolio builder for doctors applying for Specialist Registration in the UK via the Portfolio pathway (formerly known as CESR). I worked as a full stack developer on the project, implementing core features and integrations.",
    link: "https://cesrtrack.co.uk/",
    image: "/assets/projectimages/cstrack.png",
    category: "Healthcare / AI",
    tech: ["NGINX", "Next.js", "Supabase", "Gemini", "Third-Party Integration"],
    year: "2024",
    featured: false,
    company: "CESR Track",
    results: [
      { title: "Full Stack Development" },
      { title: "AI-Assisted Portfolio Builder" },
      { title: "Third-Party Integrations" },
    ],
  },
];

// Get featured projects only
export const getFeaturedProjects = (): Project[] => {
  return allProjects.filter((project) => project.featured === true);
};

// Get non-featured projects only
export const getNonFeaturedProjects = (): Project[] => {
  return allProjects.filter((project) => project.featured !== true);
};
