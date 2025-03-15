
import React from "react";
import NavLink from "./NavLink";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; id: string }>;
  activeSection: string;
  scrolled: boolean;
  scrollToSection: (id: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  navLinks,
  activeSection,
  scrolled,
  scrollToSection,
}) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <NavLink
          key={link.id}
          name={link.name}
          href={link.href}
          id={link.id}
          active={activeSection === link.id}
          scrolled={scrolled}
          onClick={scrollToSection}
        />
      ))}
      <a
        href="#contato"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("contato");
        }}
        className={cn(
          "px-5 py-2 rounded-full text-sm font-medium transition-all",
          scrolled
            ? "bg-alfatech-600 text-white hover:bg-alfatech-700"
            : "bg-white text-alfatech-950 hover:bg-gray-100"
        )}
      >
        Fale Conosco
      </a>
    </nav>
  );
};

export default DesktopNav;
