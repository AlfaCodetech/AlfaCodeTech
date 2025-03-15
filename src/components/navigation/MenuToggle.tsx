
import React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuToggleProps {
  isOpen: boolean;
  toggleMenu: () => void;
  scrolled: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ isOpen, toggleMenu, scrolled }) => {
  return (
    <button
      onClick={toggleMenu}
      className={cn(
        "md:hidden z-10 p-2 transition-colors",
        scrolled ? "text-alfatech-950" : "text-white"
      )}
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MenuToggle;
