
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const PoliticaDePrivacidade = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Política de Privacidade | AlfaCodeTech";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container-custom py-24 mt-16 flex-grow">
        <Link 
          to="/" 
          className="inline-flex items-center mb-6 text-alfatech-600 hover:text-alfatech-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar à página inicial
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2>1. Introdução</h2>
          <p>
            A AlfaCodeTech está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais quando você utiliza nosso site e serviços.
          </p>
          
          <h2>2. Informações que Coletamos</h2>
          <p>
            Podemos coletar os seguintes tipos de informações:
          </p>
          <ul>
            <li>Informações de contato, como nome, endereço de e-mail, número de telefone e endereço;</li>
            <li>Informações de uso, como páginas visitadas, tempo gasto no site e cliques em links;</li>
            <li>Informações técnicas, como endereço IP, tipo de navegador e sistema operacional;</li>
            <li>Cookies e tecnologias similares para melhorar sua experiência e entender como você utiliza nosso site.</li>
          </ul>
          
          <h2>3. Como Usamos Suas Informações</h2>
          <p>
            Utilizamos suas informações para:
          </p>
          <ul>
            <li>Fornecer, manter e melhorar nossos serviços;</li>
            <li>Processar e responder às suas solicitações;</li>
            <li>Enviar comunicações sobre nossos serviços, promoções e eventos;</li>
            <li>Personalizar sua experiência em nosso site;</li>
            <li>Analisar e monitorar o uso do site e tendências de uso;</li>
            <li>Proteger a segurança e integridade de nossos serviços.</li>
          </ul>
          
          <h2>4. Compartilhamento de Informações</h2>
          <p>
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
          </p>
          <ul>
            <li>Com fornecedores de serviços que nos auxiliam a operar nosso site e fornecer serviços;</li>
            <li>Para cumprir com obrigações legais;</li>
            <li>Para proteger e defender nossos direitos e propriedade;</li>
            <li>Com seu consentimento ou seguindo suas instruções.</li>
          </ul>
          
          <h2>5. Seus Direitos</h2>
          <p>
            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
          </p>
          <ul>
            <li>Acessar e receber uma cópia das informações que temos sobre você;</li>
            <li>Retificar ou atualizar suas informações pessoais;</li>
            <li>Solicitar a exclusão de suas informações pessoais;</li>
            <li>Opor-se ao processamento de suas informações pessoais;</li>
            <li>Retirar seu consentimento a qualquer momento.</li>
          </ul>
          
          <h2>6. Segurança</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou alteração.
          </p>
          
          <h2>7. Cookies</h2>
          <p>
            Utilizamos cookies e tecnologias similares para melhorar sua experiência, entender como você utiliza nosso site e personalizar nosso conteúdo. Você pode controlar os cookies através das configurações do seu navegador.
          </p>
          
          <h2>8. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre disponível em nosso site com a data da última atualização.
          </p>
          
          <h2>9. Contato</h2>
          <p>
            Se você tiver dúvidas sobre nossa Política de Privacidade ou quiser exercer seus direitos, entre em contato conosco pelo e-mail contato@alfacodetech.com ou pelo telefone +55 (11) 9000-0000.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PoliticaDePrivacidade;
