import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/bb-leagues-logo.png";

const Landing = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Implement login logic with validation
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logo and Title */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img src={logo} alt="BB Leagues Logo" className="h-32 md:h-40 object-contain" />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-2" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>
              El mejor gestor de ligas
            </h1>
            <p className="text-sm md:text-base text-foreground uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Ideal para aficionados al fútbol de tablero
            </p>
            <p className="text-sm md:text-base text-foreground uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              tipo Blood Bowl
            </p>
          </div>

          {/* Login Panel */}
          <div className="bb-content-area max-w-sm mx-auto md:mx-0 md:ml-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  Login:
                </label>
                <Input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  Password:
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleLogin} className="w-full font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                Entrar
              </Button>
              <div className="text-xs text-center space-y-1">
                <div>
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember">Recuérdame en este ordenador</label>
                </div>
                <div className="space-x-3">
                  <a href="#" className="text-primary hover:underline">Regístrate</a>
                  <a href="#" className="text-primary hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="flex justify-center gap-2 mt-2">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect width='60' height='30' fill='%23012169'/%3E%3Cpath d='M0 0l60 30M60 0L0 30' stroke='%23fff' stroke-width='6'/%3E%3Cpath d='M0 0l60 30M60 0L0 30' stroke='%23C8102E' stroke-width='4' clip-path='inset(0 round 0)'/%3E%3Cpath d='M30 0v30M0 15h60' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M30 0v30M0 15h60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E" alt="English" className="w-6 h-4 cursor-pointer" />
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 500'%3E%3Crect width='750' height='500' fill='%23c60b1e'/%3E%3Crect y='166.67' width='750' height='166.67' fill='%23ffc400'/%3E%3C/svg%3E" alt="Español" className="w-6 h-4 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button className="px-8 py-6 text-lg font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Inicio
          </Button>
          <Button className="px-8 py-6 text-lg font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Hall of Fame
          </Button>
          <Button className="px-8 py-6 text-lg font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Ligas
          </Button>
          <Button className="px-8 py-6 text-lg font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Equipos
          </Button>
        </div>

        {/* All Leagues Section */}
        <div className="bb-content-area">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
            Todas las ligas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example league cards - can be replaced with dynamic content */}
            {[
              { name: "VillaverdeBowl XXIII", teams: 14, status: "En curso" },
              { name: "Liga Nacional Blood Bowl", teams: 12, status: "Inscripción abierta" },
              { name: "Torneo Primavera 2025", teams: 8, status: "Finalizada" },
            ].map((league, index) => (
              <div key={index} className="bg-secondary p-4 rounded border-2 border-primary/30 hover:border-primary transition-colors cursor-pointer">
                <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {league.name}
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Equipos: {league.teams}</p>
                  <p className="font-bold text-accent">{league.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
