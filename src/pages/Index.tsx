
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

// This would typically come from a CDN or be properly imported
declare global {
  interface Window {
    THREE: any;
  }
}

const Index = () => {
  const { toast } = useToast();

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
