import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import logo from "@/assets/bb-leagues-logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (!acceptTerms) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    setIsLoading(true);
    // Simular registro
    setTimeout(() => {
      setIsLoading(false);
      toast.success("¡Registro exitoso! Por favor, inicia sesión.");
      navigate("/login");
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
              className="text-2xl font-bold text-center text-primary mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Crear Cuenta
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-bold mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Nombre Completo
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
                  htmlFor="password" 
                  className="block text-sm font-bold mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Contraseña
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full"
                />
              </div>

              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-sm font-bold mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Confirmar Contraseña
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full"
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm cursor-pointer">
                  Acepto los{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Términos y Condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    Política de Privacidad
                  </Link>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full font-bold"
                disabled={isLoading}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {isLoading ? "Registrando..." : "Crear Cuenta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
