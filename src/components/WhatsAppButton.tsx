
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton = ({
  phoneNumber,
  message = "Olá! Gostaria de mais informações sobre os serviços da AlfaCodeTech.",
}: WhatsAppButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll to hide/show button when scrolling up/down
  const controlButton = () => {
    if (typeof window !== "undefined") {
      // Hide button when scrolling down, show when scrolling up
      if (window.scrollY > lastScrollY && window.scrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlButton);
      
      // Cleanup
      return () => {
        window.removeEventListener("scroll", controlButton);
      };
    }
  }, [lastScrollY]);

  const handleClick = () => {
    // Format phone number by removing any non-digit characters
    const formattedNumber = phoneNumber.replace(/\D/g, "");
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed left-6 bottom-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 transform",
        "bg-green-500 hover:bg-green-600 text-white",
        "focus:outline-none focus:ring-2 focus:ring-green-400",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
      )}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default WhatsAppButton;
