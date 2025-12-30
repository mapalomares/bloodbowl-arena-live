import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import logo from "@/assets/bb-leagues-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor, introduce tu email");
      return;
    }

    setIsLoading(true);
    // Simular envío de email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      toast.success("Email enviado correctamente");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="bb-content-area p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src={logo} alt="BB Leagues" className="h-24 object-contain" />
            </div>

            <h1 
              className="text-2xl font-bold text-center text-primary mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Recuperar Contraseña
            </h1>

            {!emailSent ? (
              <>
                <p className="text-center text-muted-foreground mb-6 text-sm">
                  Introduce tu email y te enviaremos instrucciones para restablecer tu contraseña.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full font-bold"
                    disabled={isLoading}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {isLoading ? "Enviando..." : "Enviar Instrucciones"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <p className="text-muted-foreground">
                  Hemos enviado un email a <strong>{email}</strong> con instrucciones para restablecer tu contraseña.
                </p>
                <p className="text-sm text-muted-foreground">
                  Si no recibes el email en unos minutos, revisa tu carpeta de spam.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => setEmailSent(false)}
                  className="mt-4"
                >
                  Enviar de nuevo
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
