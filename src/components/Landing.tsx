import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Calendar, Users, ChevronRight, Newspaper } from "lucide-react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import logo from "@/assets/bb-leagues-logo.png";

// Mock data for Hall of Fame
const hallOfFame = [
  { rank: 1, name: "Griff Oberwald", team: "Reikland Reavers", touchdowns: 127, race: "Humanos" },
  { rank: 2, name: "Morg 'n' Thorg", team: "Mercenario", touchdowns: 115, race: "Ogro" },
  { rank: 3, name: "Eldril Sidewinder", team: "Darkside Cowboys", touchdowns: 98, race: "Elfos Oscuros" },
  { rank: 4, name: "Varag Ghoul-Chewer", team: "Gouged Eye", touchdowns: 89, race: "Orcos" },
  { rank: 5, name: "Hakflem Skuttlespike", team: "Skavenblight Scramblers", touchdowns: 84, race: "Skaven" },
];

// Mock data for featured leagues
const featuredLeagues = [
  { id: 1, name: "VillaverdeBowl XXIII Edition", teams: 14, status: "En curso", commissioner: "Admin" },
  { id: 2, name: "Liga Nacional Blood Bowl", teams: 12, status: "Inscripción abierta", commissioner: "Comisario1" },
  { id: 3, name: "Torneo Primavera 2025", teams: 8, status: "Finalizada", commissioner: "Comisario2" },
  { id: 4, name: "Copa del Rey del Tablero", teams: 16, status: "En curso", commissioner: "Admin" },
];

// Mock data for news
const latestNews = [
  { id: 1, title: "VillaverdeBowl XXIII: Comienza la Jornada 5", date: "2025-01-10", excerpt: "La quinta jornada promete enfrentamientos épicos entre los equipos clasificados." },
  { id: 2, title: "Nuevas reglas para la temporada 2025", date: "2025-01-05", excerpt: "El comité ha aprobado cambios en las reglas de desempate para esta temporada." },
  { id: 3, title: "Inscripciones abiertas para Liga Nacional", date: "2025-01-02", excerpt: "Ya puedes inscribir tu equipo en la liga más prestigiosa del país." },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <img src={logo} alt="BB Leagues" className="h-32 md:h-40 mx-auto mb-6" />
          <h1 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
          >
            El mejor gestor de ligas
          </h1>
          <p className="text-lg md:text-xl mb-2 opacity-90" style={{ fontFamily: 'Georgia, serif' }}>
            Ideal para aficionados al fútbol de tablero tipo Blood Bowl
          </p>
          <p className="text-base opacity-80 mb-8">
            Organiza torneos, gestiona equipos y lleva el control de tus ligas
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Regístrate Gratis
            </Button>
            <Button 
              onClick={() => navigate('/leagues')}
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold px-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Ver Ligas
            </Button>
          </div>
        </div>
      </section>

      <main className="flex-1 p-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: Trophy, title: "Ligas y Torneos", desc: "Organiza competiciones con playoffs y clasificaciones" },
              { icon: Users, title: "Gestión de Equipos", desc: "Controla plantillas, jugadores y staff" },
              { icon: Calendar, title: "Calendario de Partidos", desc: "Programa y registra actas de partidos" },
              { icon: Star, title: "Hall of Fame", desc: "Reconoce a los mejores jugadores" },
            ].map((feature, index) => (
              <div key={index} className="bb-content-area p-4 text-center hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hall of Fame */}
            <div className="lg:col-span-1">
              <div className="bb-content-area h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-6 h-6 text-accent" />
                  <h2 
                    className="text-xl font-bold text-primary"
                    style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
                  >
                    Hall of Fame
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Top 5 Anotadores de Touchdowns</p>
                
                <div className="space-y-3">
                  {hallOfFame.map((player) => (
                    <div 
                      key={player.rank} 
                      className="flex items-center gap-3 p-2 rounded bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        player.rank === 1 ? 'bg-yellow-500 text-yellow-900' :
                        player.rank === 2 ? 'bg-gray-300 text-gray-700' :
                        player.rank === 3 ? 'bg-amber-600 text-amber-100' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {player.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{player.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{player.team}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">{player.touchdowns}</p>
                        <p className="text-xs text-muted-foreground">TDs</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link 
                  to="/hall-of-fame" 
                  className="flex items-center justify-center gap-1 mt-4 text-sm text-primary hover:underline font-medium"
                >
                  Ver Hall of Fame completo <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Featured Leagues */}
            <div className="lg:col-span-2">
              <div className="bb-content-area h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 
                    className="text-xl font-bold text-primary"
                    style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
                  >
                    Ligas Destacadas
                  </h2>
                  <Link 
                    to="/leagues" 
                    className="text-sm text-primary hover:underline font-medium flex items-center gap-1"
                  >
                    Ver todas <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredLeagues.map((league) => (
                    <Link
                      key={league.id}
                      to={`/liga/${league.id}`}
                      className="block p-4 rounded bg-secondary/50 hover:bg-secondary border-2 border-transparent hover:border-primary/30 transition-all"
                    >
                      <h3 className="font-bold text-primary mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        {league.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> {league.teams} equipos
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          league.status === 'En curso' ? 'bg-green-100 text-green-800' :
                          league.status === 'Inscripción abierta' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {league.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Latest News */}
          <section className="bb-content-area">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="w-6 h-6 text-primary" />
              <h2 
                className="text-xl font-bold text-primary"
                style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
              >
                Últimas Noticias
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {latestNews.map((news) => (
                <article 
                  key={news.id}
                  className="p-4 rounded bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                >
                  <time className="text-xs text-muted-foreground">
                    {new Date(news.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                  <h3 className="font-bold text-primary mt-1 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {news.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bb-content-area bg-primary text-primary-foreground text-center py-8">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
            >
              ¿Listo para empezar?
            </h2>
            <p className="mb-6 opacity-90">
              Únete a la comunidad de Blood Bowl más grande de habla hispana
            </p>
            <Button 
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Crear Cuenta Gratis
            </Button>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
