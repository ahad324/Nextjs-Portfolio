// Import project images
import thecurrent from "@/assets/images/thecurrent.png";
import refrax from "@/assets/images/refrax.png";
import naqtax from "@/assets/images/naqtax.png";
import aidriven from "@/assets/images/ai-driven.png";
import scorespot from "@/assets/images/scorespot.png";
import n8nfacebook from "@/assets/images/n8n-facebook.png";
import starstruck from "@/assets/images/starstruck.png";
import paragon from "@/assets/images/paragon.png";
import pulsebot from "@/assets/images/pulsebot.png";
import digitalismd from "@/assets/images/digitalismd.png";
import redditloginautomation from "@/assets/images/redditloginautomation.png"
import drippy from "@/assets/images/drippy.png"
import cstrack from "@/assets/images/cstrack.png"
import mealsdeals from "@/assets/images/mealsdeals.png"

// Import testimonial avatars
import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";

// Project type definition
export interface Project {
  title: string;
  description: string;
  link: string;
  image: any;
  category: string;
  tech: string[];
  year: string;
  featured?: boolean;
  company?: string;
  results?: { title: string }[];
}

// Testimonial type definition
export interface Testimonial {
  name: string;
  position: string;
  text: string;
  avatar: any;
}

// All projects data with featured field
export const allProjects: Project[] = [
  {
    title: "AI-Driven Data Automation Workflow",
    description:
      "It starts with a webhook triggering the workflow, followed by image and audio analysis, where the data is downloaded and analyzed. Then, the data is passed to a condition that routes it for further processing. The workflow includes integrations with a third-party platform (TAKE APP) for managing orders, inventory, and customer data, while interacting with Google Docs for descriptions and AI for generating replies and responses. This setup automates the flow of data between services for tasks like analyzing content, managing orders, and interacting with AI models for insights.",
    link: "https://www.upwork.com/freelancers/~01fca1f62ecf781358?p=1952776433532428288",
    image: aidriven,
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
    image: refrax,
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
    image: starstruck,
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
    image: thecurrent,
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
    image: pulsebot,
    category: "AI/ML",
    tech: ["React", "Blockchain", "API Integration", "ChatGPT API Integration"],
    year: "2023",
    featured: false,
  },
  {
  title: "MealsDeals Web & Scraper",
  description:
    "Fixed major bugs and optimized the MealsDeals website and scraper. Improved data scraping with Puppeteer, added Redis caching for faster performance, and automated deployments using CI/CD pipelines for reliability and scalability.",
  link: "https://mealsdeals.app/",
  image: mealsdeals,
  category: "Web Scraping / Automation",
  tech: ["Puppeteer", "Redis", "CI/CD", "Deployment Automation", "Web Scraping"],
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
    image: n8nfacebook,
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
  },
  {
    title: "Score Spot UI Design",
    description: "Complete amd pixel perfect UI design from figma to REACT",
    link: "https://score-spot-eta.vercel.app/",
    image: scorespot,
    category: "Web Development",
    tech: ["React", "Tailwind CSS", "Responsive Design", "API Integration"],
    year: "2023",
    featured: false,
  },
  {
    title: "Paragon CRM System",
    description: "CRM for leads management",
    link: "https://portal.paragoneducation.pk/admin/crm-dashboard",
    image: paragon,
    category: "Web Development",
    tech: ["JavaScript", "Laravel", "PostgreSQL"],
    year: "2023",
    featured: false,
  },
  {
    title: "Naqtax Website",
    description:
      "Created a website according to the requirement of client. Completed both frontend and backend based on client requirements. Delivered the project on time and with high-quality of code.",
    link: "https://www.upwork.com/freelancers/~01fca1f62ecf781358?p=1670119039946682368",
    image: naqtax,
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
  },
    {
    title: "Digitalismd",
    description:
      "An innovative health-tech company creating smart, user-friendly tools that make doctors' work easier, faster, and more accurate. I created the landing page, user panel, and admin panel, and also integrated Stripe as a payment gateway.",
    link: "https://digitalismd.com/",
    image: digitalismd,
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
    image: redditloginautomation,
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
    image: drippy,
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
    image: cstrack,
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

// All testimonials data
export const allTestimonials: Testimonial[] = [
  {
    name: "Patrick Olatunji",
    position: "Upwork Client",
    text: "Muhammad delivered a fully functional app in just four days. He understood the workflow instantly, kept me updated, and produced professional results with minimal revisions.",
    avatar: memojiAvatar1,
  },
  {
    name: "Olivia Green",
    position: "Head of Design @ GreenLeaf",
    text: "Working with Hussnain was a pleasure. His expertise in frontend development brought our designs to life in a way we never imagined. The website has exceeded our expectations.",
    avatar: memojiAvatar2,
  },
  {
    name: "Peter",
    position: "Co-founder @ StarStruck",
    text: "Hussnain transformed our platform’s UI into a modern, responsive experience while also building reliable web scraping solutions that power our business. His work brought both design precision and technical depth.",
    avatar: memojiAvatar3,
  },
  {
    name: "Emily Carter",
    position: "Product Manager @ GlobalTech",
    text: "Hussnain is a true frontend wizard. He took our complex product and transformed it into an intuitive and engaging user interface. We're already seeing positive feedback from our customers.",
    avatar: memojiAvatar4,
  },
  {
    name: "Michael Brown",
    position: "Director of IT @ MegaCorp",
    text: "Hussnain's work on our website has been nothing short of exceptional. He's a talented developer who is also a great communicator. We highly recommend him.",
    avatar: memojiAvatar5,
  },
];
