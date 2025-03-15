
import React from "react";

interface LogoProps {
  scrolled?: boolean;
}

const Logo: React.FC<LogoProps> = ({ scrolled }) => {
  return (
    <a href="#inicio" className="flex items-center space-x-3 z-10">
      <img 
        src="/lovable-uploads/bbfb1bf9-8832-4b3b-9536-4a9e7e605eb3.png" 
        alt="AlfaCodeTech Logo" 
        className="h-10 md:h-12" 
      />
    </a>
  );
};

export default Logo;
