
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Logo from "./navigation/Logo";
import DesktopNav from "./navigation/DesktopNav";
import MobileMenu from "./navigation/MobileMenu";
import MenuToggle from "./navigation/MenuToggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position > 50);

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionId = section.getAttribute("id") || "";
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop <= 100 && sectionTop >= -section.clientHeight + 100) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Início", href: "#inicio", id: "inicio" },
    { name: "Serviços", href: "#servicos", id: "servicos" },
    { name: "Sobre", href: "#sobre", id: "sobre" },
    { name: "Portfólio", href: "#portfolio", id: "portfolio" },
    { name: "Contato", href: "#contato", id: "contato" },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Header height
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Logo scrolled={scrolled} />
        
        <MenuToggle 
          isOpen={isOpen} 
          toggleMenu={toggleMenu} 
          scrolled={scrolled} 
        />

        <DesktopNav 
          navLinks={navLinks}
          activeSection={activeSection}
          scrolled={scrolled}
          scrollToSection={scrollToSection}
        />

        <MobileMenu 
          isOpen={isOpen}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          navLinks={navLinks}
        />
      </div>
    </header>
  );
};

export default Header;
