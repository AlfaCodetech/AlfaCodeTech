
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const TermosDeUso = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Termos de Uso | AlfaCodeTech";
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
        
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Bem-vindo à AlfaCodeTech. Ao acessar e utilizar nosso site, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá utilizar nossos serviços.
          </p>
          
          <h2>2. Descrição dos Serviços</h2>
          <p>
            A AlfaCodeTech oferece serviços de desenvolvimento de software, consultoria em TI, design de interfaces, aplicativos móveis e desenvolvimento web. Nossos serviços estão sujeitos a mudanças sem aviso prévio.
          </p>
          
          <h2>3. Uso do Site</h2>
          <p>
            Você concorda em utilizar nosso site apenas para fins legais e de acordo com estes Termos. Você não deve usar o site de qualquer maneira que possa danificar, desabilitar, sobrecarregar ou prejudicar o site ou interferir no uso de terceiros.
          </p>
          
          <h2>4. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo do site, incluindo, mas não se limitando a, textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados são propriedade da AlfaCodeTech e estão protegidos por leis de direitos autorais e propriedade intelectual.
          </p>
          
          <h2>5. Limitação de Responsabilidade</h2>
          <p>
            A AlfaCodeTech não será responsável por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do seu acesso ou uso do site, ou da impossibilidade de acessar ou usar o site.
          </p>
          
          <h2>6. Privacidade</h2>
          <p>
            Nossa Política de Privacidade descreve como coletamos, usamos e compartilhamos informações pessoais. Ao utilizar nossos serviços, você concorda com nossa coleta e uso de informações de acordo com nossa Política de Privacidade.
          </p>
          
          <h2>7. Modificações dos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento. As modificações entrarão em vigor imediatamente após a publicação dos Termos atualizados. Seu uso continuado do site após a publicação de quaisquer modificações constitui aceitação destas modificações.
          </p>
          
          <h2>8. Lei Aplicável</h2>
          <p>
            Estes Termos são regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa decorrente ou relacionada a estes Termos será submetida à jurisdição exclusiva dos tribunais de São Paulo.
          </p>
          
          <h2>9. Contato</h2>
          <p>
            Se você tiver dúvidas sobre estes Termos, entre em contato conosco pelo e-mail contato@alfacodetech.com ou pelo telefone +55 (11) 9000-0000.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermosDeUso;
