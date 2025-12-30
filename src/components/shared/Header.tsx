import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/bb-leagues-logo.png";

interface HeaderProps {
  showAuth?: boolean;
}

const Header = ({ showAuth = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-primary-foreground py-3 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="BB Leagues" className="h-12 object-contain" />
          <span className="text-xl font-bold hidden sm:block" style={{ fontFamily: 'Georgia, serif' }}>
            BB Leagues
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-accent transition-colors font-medium">
            Inicio
          </Link>
          <Link to="/leagues" className="hover:text-accent transition-colors font-medium">
            Ligas
          </Link>
          <Link to="/equipos" className="hover:text-accent transition-colors font-medium">
            Equipos
          </Link>
          <Link to="/forums" className="hover:text-accent transition-colors font-medium">
            Foros
          </Link>
        </nav>

        {showAuth && (
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Iniciar Sesión
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Registrarse
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
