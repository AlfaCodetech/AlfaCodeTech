
import { cn } from "@/lib/utils";
import React from "react";

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  scrollToSection: (id: string) => void;
  navLinks: Array<{ name: string; href: string; id: string }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  activeSection,
  scrollToSection,
  navLinks,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-alfatech-950/95 backdrop-blur-lg flex flex-col justify-center items-center transition-transform duration-300 ease-in-out md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <nav className="flex flex-col items-center space-y-6">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(link.id);
            }}
            className={cn(
              "text-2xl font-medium transition-colors",
              activeSection === link.id
                ? "text-white"
                : "text-white/70 hover:text-white"
            )}
          >
            {link.name}
          </a>
        ))}
        <a
          href="#contato"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contato");
          }}
          className="mt-4 px-6 py-3 bg-white text-alfatech-950 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Fale Conosco
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;
