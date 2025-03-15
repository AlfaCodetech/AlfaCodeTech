
import { cn } from "@/lib/utils";
import React from "react";

interface NavLinkProps {
  name: string;
  href: string;
  id: string;
  active: boolean;
  scrolled: boolean;
  onClick: (id: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  name,
  href,
  id,
  active,
  scrolled,
  onClick,
}) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick(id);
      }}
      className={cn(
        "text-sm font-medium relative animated-underline transition-colors",
        scrolled ? "text-alfatech-950" : "text-white",
        active ? "opacity-100" : "opacity-70 hover:opacity-100"
      )}
    >
      {name}
    </a>
  );
};

export default NavLink;
