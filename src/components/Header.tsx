
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
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
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3 dark:bg-alfatech-950/80"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#inicio" className="flex items-center space-x-3 z-10">
          <img 
            src="/lovable-uploads/bbfb1bf9-8832-4b3b-9536-4a9e7e605eb3.png" 
            alt="AlfaCodeTech Logo" 
            className="h-10 md:h-12" 
          />
        </a>

        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className={cn(
            "p-2 rounded-full transition-colors mr-2 md:mr-0",
            scrolled 
              ? "bg-alfatech-100 text-alfatech-900 hover:bg-alfatech-200 dark:bg-alfatech-800 dark:text-white dark:hover:bg-alfatech-700" 
              : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm dark:bg-alfatech-900/40 dark:hover:bg-alfatech-900/60"
          )}
          aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          title={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className={cn(
            "md:hidden z-10 p-2 transition-colors",
            scrolled ? "text-alfatech-950 dark:text-white" : "text-white"
          )}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              className={cn(
                "text-sm font-medium relative animated-underline transition-colors",
                scrolled ? "text-alfatech-950 dark:text-white" : "text-white",
                activeSection === link.id ? "opacity-100" : "opacity-70 hover:opacity-100"
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
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all",
              scrolled 
                ? "bg-alfatech-600 text-white hover:bg-alfatech-700 dark:bg-alfatech-700 dark:hover:bg-alfatech-600" 
                : "bg-white text-alfatech-950 hover:bg-gray-100 dark:bg-alfatech-800 dark:text-white dark:hover:bg-alfatech-700"
            )}
          >
            Fale Conosco
          </a>
        </nav>

        {/* Mobile menu */}
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
              className="mt-4 px-6 py-3 bg-white text-alfatech-950 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors dark:bg-alfatech-700 dark:text-white dark:hover:bg-alfatech-600"
            >
              Fale Conosco
            </a>
            
            {/* Dark mode toggle in mobile menu */}
            <button
              onClick={toggleDarkMode}
              className="mt-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              {darkMode ? (
                <>
                  <Sun size={20} />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon size={20} />
                  <span>Modo Escuro</span>
                </>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
