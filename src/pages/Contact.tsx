import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    setIsLoading(true);
    // Simular envío
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Mensaje enviado correctamente. Te responderemos pronto.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 
            className="bb-title text-primary mb-8 text-center"
          >
            Contacto
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="bb-content-area p-6">
              <h2 
                className="text-xl font-bold text-primary mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Envíanos un mensaje
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Nombre
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Asunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="¿Sobre qué quieres hablar?"
                    className="w-full"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full min-h-[150px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full font-bold"
                  disabled={isLoading}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {isLoading ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </form>
            </div>

            {/* Información de contacto */}
            <div className="space-y-6">
              <div className="bb-content-area p-6">
                <h2 
                  className="text-xl font-bold text-primary mb-6"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Información de Contacto
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ fontFamily: 'Georgia, serif' }}>Email</h3>
                      <p className="text-muted-foreground">info@bbleagues.com</p>
                      <p className="text-muted-foreground">soporte@bbleagues.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ fontFamily: 'Georgia, serif' }}>Teléfono</h3>
                      <p className="text-muted-foreground">+34 900 123 456</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ fontFamily: 'Georgia, serif' }}>Dirección</h3>
                      <p className="text-muted-foreground">Calle Blood Bowl, 123</p>
                      <p className="text-muted-foreground">28001 Madrid, España</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bb-content-area p-6">
                <h2 
                  className="text-xl font-bold text-primary mb-4"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Horario de Atención
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Lunes - Viernes:</strong> 9:00 - 18:00</p>
                  <p><strong>Sábados:</strong> 10:00 - 14:00</p>
                  <p><strong>Domingos:</strong> Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
