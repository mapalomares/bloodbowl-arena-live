import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/bb-leagues-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username] = useState("tirkha");
  const [lastConnection] = useState("2025-11-04 22:13:27");
  const [hasNotifications] = useState(true);

  const handleLogout = () => {
    navigate("/");
  };

  const myLeagues = [
    { id: "1", name: "La Secta Primera Edición", icon: "🏆" },
    { id: "2", name: "Paloleague Primera Edición", icon: "🏆" },
    { id: "3", name: "Liga Laberinto XXI Edición", icon: "🏆" },
    { id: "4", name: "VillaverdeBowl XXIII Edition", icon: "🏆" },
  ];

  const commissionerLeagues = [
    { id: "1", name: "La Secta Primera Edición", icon: "🏆" },
    { id: "2", name: "Paloleague Primera Edición", icon: "🏆" },
  ];

  const allLeagues = [
    { 
      id: "5",
      name: "Liga Sansera La nueva era. la edición", 
      subtitle: "Nueva edición",
      icon: "🏆" 
    },
    { 
      id: "6",
      name: "VillaverdeBowl Clanes Skavens", 
      subtitle: "Miniliga de prueba de los clanes skavens",
      icon: "🏆" 
    },
    { 
      id: "7",
      name: "VillaverdeBowl ChaosCup", 
      subtitle: "El dominio del Kaos",
      icon: "🏆" 
    },
    { 
      id: "8",
      name: "Dalebowl Dalebowl V", 
      subtitle: "",
      icon: "🏆" 
    },
    { 
      id: "9",
      name: "VillaverdeBowl X Edición", 
      subtitle: "X Edición",
      icon: "🏆" 
    },
    { 
      id: "10",
      name: "Liga Rememoradores Primera Edición", 
      subtitle: "",
      icon: "🏆" 
    },
    { 
      id: "11",
      name: "Northern Knights Bloodbowl League NKBL 12-B", 
      subtitle: "",
      icon: "🏆" 
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-center">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img src={logo} alt="BB Leagues Logo" className="h-24 md:h-32 object-contain" />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>
              El mejor gestor de ligas
            </h1>
            <p className="text-xs md:text-sm text-foreground uppercase" style={{ fontFamily: 'Georgia, serif' }}>
              Ideal para aficionados al fútbol de tablero
            </p>
            <p className="text-xs md:text-sm text-foreground uppercase" style={{ fontFamily: 'Georgia, serif' }}>
              tipo Blood Bowl
            </p>
          </div>

          {/* User Panel */}
          <div className="bb-content-area text-sm">
            <div className="space-y-2">
              <div className="font-bold text-primary">{username}</div>
              <div className="text-xs text-muted-foreground">
                [última conexión: {lastConnection}]
              </div>
              <Button 
                onClick={handleLogout}
                size="sm"
                className="w-full font-bold"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Salir
              </Button>
              {hasNotifications && (
                <div className="text-xs text-center text-primary font-bold cursor-pointer hover:underline">
                  + Tiene notificaciones +
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Inicio
          </Button>
          <Button className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Hall of Fame
          </Button>
          <Button className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Ligas
          </Button>
          <Button className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Equipos
          </Button>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - My Leagues */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Mis Ligas
            </h2>

            <div className="mb-4">
              <a href="#" className="text-primary hover:underline font-bold flex items-center gap-2">
                <span>🏆</span>
                <span>Crear una liga</span>
              </a>
            </div>

            {/* Leagues where I play */}
            <div className="bb-content-area mb-6">
              <h3 className="text-xl font-bold mb-3 bg-muted px-3 py-2 rounded" style={{ fontFamily: 'Georgia, serif' }}>
                Ligas donde juego
              </h3>
              <div className="space-y-2">
                {myLeagues.map((league, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 rounded cursor-pointer"
                    onClick={() => navigate(`/liga/${league.id}`)}
                  >
                    <span>{league.icon}</span>
                    <span className="text-primary font-bold">{league.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leagues where I'm commissioner */}
            <div className="bb-content-area">
              <h3 className="text-xl font-bold mb-3 bg-muted px-3 py-2 rounded" style={{ fontFamily: 'Georgia, serif' }}>
                Ligas donde soy comisario
              </h3>
              <div className="space-y-2">
                {commissionerLeagues.map((league, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 rounded cursor-pointer"
                    onClick={() => navigate(`/liga/${league.id}`)}
                  >
                    <span>{league.icon}</span>
                    <span className="text-primary font-bold">{league.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - All Leagues */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Todas las Ligas
            </h2>

            <div className="bb-content-area">
              <div className="space-y-3">
                {allLeagues.map((league, index) => (
                  <div key={index} className="border-b border-primary/20 last:border-0 pb-3 last:pb-0">
                    <div 
                      className="flex items-start gap-2 cursor-pointer hover:bg-muted/30 p-2 rounded"
                      onClick={() => navigate(`/liga/${league.id}`)}
                    >
                      <span className="text-xl">{league.icon}</span>
                      <div>
                        <div className="text-primary font-bold">{league.name}</div>
                        {league.subtitle && (
                          <div className="text-sm text-amber-700 italic">{league.subtitle}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
