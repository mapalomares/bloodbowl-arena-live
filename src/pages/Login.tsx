import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import logo from "@/assets/bb-leagues-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    setIsLoading(true);
    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      toast.success("¡Bienvenido!");
      navigate("/dashboard");
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
              Iniciar Sesión
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-bold mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Email o Usuario
                </label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label htmlFor="remember" className="text-sm cursor-pointer">
                    Recuérdame
                  </label>
                </div>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full font-bold"
                disabled={isLoading}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-primary font-bold hover:underline">
                  Regístrate aquí
                </Link>
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex justify-center gap-2 mt-6">
              <button className="p-1 hover:opacity-80 transition-opacity">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect width='60' height='30' fill='%23012169'/%3E%3Cpath d='M0 0l60 30M60 0L0 30' stroke='%23fff' stroke-width='6'/%3E%3Cpath d='M0 0l60 30M60 0L0 30' stroke='%23C8102E' stroke-width='4'/%3E%3Cpath d='M30 0v30M0 15h60' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M30 0v30M0 15h60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E" 
                  alt="English" 
                  className="w-8 h-5 border border-muted" 
                />
              </button>
              <button className="p-1 hover:opacity-80 transition-opacity">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 500'%3E%3Crect width='750' height='500' fill='%23c60b1e'/%3E%3Crect y='166.67' width='750' height='166.67' fill='%23ffc400'/%3E%3C/svg%3E" 
                  alt="Español" 
                  className="w-8 h-5 border border-muted" 
                />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
