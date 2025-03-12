
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-alfatech-950 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="text-3xl font-bold">AlfaCodeTech</div>
            <p className="text-gray-400">
              Desenvolvemos soluções tecnológicas inovadoras que impulsionam o crescimento do seu negócio.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-alfatech-900 hover:bg-alfatech-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-alfatech-900 hover:bg-alfatech-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-alfatech-900 hover:bg-alfatech-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-alfatech-900 hover:bg-alfatech-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              {[
                { name: "Início", href: "#inicio" },
                { name: "Serviços", href: "#servicos" },
                { name: "Sobre Nós", href: "#sobre" },
                { name: "Portfólio", href: "#portfolio" },
                { name: "Contato", href: "#contato" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Serviços</h3>
            <ul className="space-y-4">
              {[
                "Desenvolvimento Web",
                "Aplicativos Mobile",
                "Integração de Sistemas",
                "Consultoria em TI",
                "UI/UX Design",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#servicos"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Contato</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <p>Av. Paulista, 1000, Bela Vista</p>
                <p>São Paulo - SP, 01310-100</p>
              </li>
              <li>
                <a
                  href="mailto:contato@alfacodetech.com"
                  className="hover:text-white transition-colors"
                >
                  contato@alfacodetech.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+551190000000"
                  className="hover:text-white transition-colors"
                >
                  +55 (11) 9000-0000
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-alfatech-900">
        <div className="container-custom py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} AlfaCodeTech. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/termos-de-uso"
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              to="/politica-de-privacidade"
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
