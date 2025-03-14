
import { ArrowDown } from "lucide-react";
import ThreeAnimation from "./ThreeAnimation";

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("servicos");
    if (nextSection) {
      const yOffset = -80; // Header height
      const y = nextSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-alfatech-950"
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-alfatech-950/80 via-alfatech-950/50 to-transparent z-0"></div>
      
      {/* 3D background */}
      <ThreeAnimation />
      
      <div className="container-custom relative z-10 mt-16 md:mt-0">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 animate-fade-in">
            Inovação Digital para Negócios
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Soluções Tecnológicas para o Sucesso da Sua Empresa
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto animate-fade-in-delayed">
            Desenvolvemos sistemas e aplicações que impulsionam seus negócios, combinando tecnologia de ponta com design intuitivo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delayed">
            <a
              href="#servicos"
              onClick={(e) => {
                e.preventDefault();
                scrollToNextSection();
              }}
              className="px-8 py-4 bg-alfatech-600 text-white rounded-full text-lg font-medium hover:bg-alfatech-700 transition-colors w-full sm:w-auto"
            >
              Conheça Nossos Serviços
            </a>
            
            <a
              href="#contato"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full text-lg font-medium hover:bg-white/20 transition-colors w-full sm:w-auto"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-fade-in-delayed">
        <button
          onClick={scrollToNextSection}
          className="text-white/70 hover:text-white transition-colors flex flex-col items-center"
          aria-label="Rolar para baixo"
        >
          <span className="text-sm font-medium mb-2">Rolar para baixo</span>
          <ArrowDown size={20} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
