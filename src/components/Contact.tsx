
import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const animatedElements = useRef<NodeListOf<Element> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    animatedElements.current = document.querySelectorAll("[data-animate]");
    animatedElements.current.forEach((el) => observer.observe(el));

    return () => {
      if (animatedElements.current) {
        animatedElements.current.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // EmailJS service, template, and user IDs
    // Replace these with your actual EmailJS credentials
    const serviceId = "service_your_service_id";
    const templateId = "template_your_template_id";
    const publicKey = "your_public_key";
    
    // Prepare the template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    };
    
    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully:", response);
        setFormSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        toast({
          title: "Sucesso",
          description: "Sua mensagem foi enviada com sucesso!",
          variant: "default",
        });
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        toast({
          title: "Erro",
          description: "Houve um problema ao enviar sua mensagem. Por favor, tente novamente.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contato" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-block px-3 py-1 bg-alfatech-100 text-alfatech-700 rounded-full text-sm font-medium mb-4"
            style={{ opacity: 0 }}
            data-animate="true"
          >
            Contato
          </span>
          <h2
            className="section-title"
            style={{ opacity: 0 }}
            data-animate="true"
          >
            Vamos Transformar sua Ideia em Realidade
          </h2>
          <p
            className="text-muted-foreground"
            style={{ opacity: 0 }}
            data-animate="true"
          >
            Entre em contato para discutir seu projeto e descobrir como podemos
            ajudar a impulsionar seu negócio com soluções tecnológicas
            inovadoras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            style={{ opacity: 0 }}
            data-animate="true"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border h-full">
              <h3 className="text-2xl font-semibold mb-6 text-alfatech-950">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-alfatech-50 p-3 rounded-lg text-alfatech-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-alfatech-950 mb-1">
                      Endereço
                    </h4>
                    <p className="text-muted-foreground">
                      Av. Paulista, 1000, Bela Vista <br />
                      São Paulo - SP, 01310-100
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-alfatech-50 p-3 rounded-lg text-alfatech-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-alfatech-950 mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:contato@alfacodetech.com"
                      className="text-alfatech-600 hover:text-alfatech-700 transition-colors"
                    >
                      contato@alfacodetech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-alfatech-50 p-3 rounded-lg text-alfatech-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-alfatech-950 mb-1">
                      Telefone
                    </h4>
                    <a
                      href="tel:+551190000000"
                      className="text-alfatech-600 hover:text-alfatech-700 transition-colors"
                    >
                      +55 (11) 9000-0000
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-lg font-medium text-alfatech-950 mb-6">
                  Horário de Atendimento
                </h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p>Sábado: 9h às 13h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ opacity: 0 }}
            data-animate="true"
          >
            {formSubmitted ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border h-full flex flex-col items-center justify-center text-center animate-scale-up">
                <div className="bg-alfatech-50 p-4 rounded-full text-alfatech-600 mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-alfatech-950">
                  Mensagem Enviada!
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Obrigado por entrar em contato. Nossa equipe irá analisar sua
                  mensagem e retornaremos em breve.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-3 bg-alfatech-600 text-white rounded-lg text-base font-medium hover:bg-alfatech-700 transition-colors"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border h-full">
                <h3 className="text-2xl font-semibold mb-6 text-alfatech-950">
                  Envie uma Mensagem
                </h3>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-alfatech-950 mb-2"
                      >
                        Nome Completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-alfatech-600 focus:ring-1 focus:ring-alfatech-600 outline-none transition-colors"
                        placeholder="Seu nome"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-alfatech-950 mb-2"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-alfatech-600 focus:ring-1 focus:ring-alfatech-600 outline-none transition-colors"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-alfatech-950 mb-2"
                      >
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-alfatech-600 focus:ring-1 focus:ring-alfatech-600 outline-none transition-colors"
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-alfatech-950 mb-2"
                      >
                        Assunto <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-alfatech-600 focus:ring-1 focus:ring-alfatech-600 outline-none transition-colors appearance-none"
                        required
                      >
                        <option value="" disabled>
                          Selecione um assunto
                        </option>
                        <option value="Orçamento">Orçamento</option>
                        <option value="Suporte">Suporte</option>
                        <option value="Parceria">Parceria</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-alfatech-950 mb-2"
                    >
                      Mensagem <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-alfatech-600 focus:ring-1 focus:ring-alfatech-600 outline-none transition-colors resize-none"
                      placeholder="Descreva seu projeto ou dúvida..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-6 py-4 bg-alfatech-600 text-white rounded-lg text-base font-medium hover:bg-alfatech-700 transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
