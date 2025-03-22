"use client";
import Link from "next/link";
import Scrollspy from "react-scrollspy";

export const Header = () => {
  const links = [
    { name: "Home", href: "/", id: "hero" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "About", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <div className="w-full flex justify-center items-center fixed top-3 z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <Scrollspy
          items={["hero", "projects", "about", "contact"]}
          currentClassName="bg-white text-gray-900"
          className="flex gap-1"
          offset={-50}
        >
          {links.map((link, index) => (
            <Link key={link.id} href={link.href} className="nav-item">
              {link.name}
            </Link>
          ))}
        </Scrollspy>
      </nav>
    </div>
  );
};
