import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useToast } from "@/hooks/use-toast";

// This would typically come from a CDN or be properly imported
declare global {
  interface Window {
    THREE: any;
  }
}

const Index = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for user preference in localStorage first
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // If no preference is saved, check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    }

    // Listen for changes in system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      // Only apply system preference if there's no saved preference
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          setDarkMode(true);
          document.documentElement.classList.add('dark');
        } else {
          setDarkMode(false);
          document.documentElement.classList.remove('dark');
        }
      }
    };

    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    // Load Three.js from CDN
    const loadThreeJs = () => {
      if (window.THREE) return Promise.resolve();

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.min.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadThreeJs()
      .then(() => {
        console.log("Three.js loaded successfully");
      })
      .catch((error) => {
        console.error("Failed to load Three.js:", error);
        toast({
          title: "Aviso",
          description: "Alguns efeitos visuais podem não funcionar corretamente.",
          variant: "destructive",
        });
      });
  }, [toast]);

  useEffect(() => {
    // Fade in animation for elements when they come into view
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => animationObserver.observe(el));

    return () => {
      elements.forEach((el) => animationObserver.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-alfatech-950 dark:text-white">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton phoneNumber="5511900000000" />
    </div>
  );
};

export default Index;
