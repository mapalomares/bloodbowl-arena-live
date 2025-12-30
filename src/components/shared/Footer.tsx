import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              BB Leagues
            </h3>
            <p className="text-sm opacity-80">
              La mejor plataforma de gestión de ligas para Blood Bowl y otros juegos de fútbol de tablero.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/leagues" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Ligas
                </Link>
              </li>
              <li>
                <Link to="/equipos" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Equipos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies-policy" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link to="/service-terms" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Términos de Servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Contacto
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="opacity-80">
                info@bbleagues.com
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Formulario de Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} BB Leagues. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs">
            Blood Bowl es una marca registrada de Games Workshop Limited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
