import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import logo from "@/assets/bb-leagues-logo.png";

interface Team {
  id: string;
  name: string;
  details: string;
}

interface LeagueWithTeams {
  id: string;
  name: string;
  icon: string;
  teams: Team[];
}

const Teams = () => {
  const navigate = useNavigate();
  const [username] = useState("tirkha");
  const [lastConnection] = useState("2025-11-12 22:07:00");
  const [hasNotifications] = useState(true);

  const handleLogout = () => {
    navigate("/");
  };

  const myTeams: LeagueWithTeams[] = [
    {
      id: "5",
      name: "Liga Sansera La nueva era. 1a edición",
      icon: "🏆",
      teams: [
        {
          id: "t1",
          name: "Harlem Ogretrotters!",
          details: "(LBR 6.0-tirkha)"
        }
      ]
    },
    {
      id: "6",
      name: "VillaverdeBowl Clanes Skavens",
      icon: "🏆",
      teams: [
        {
          id: "t2",
          name: "(Clanes Skavens-tirkha)",
          details: ""
        }
      ]
    },
    {
      id: "7",
      name: "VillaverdeBowl ChaosCup",
      icon: "🏆",
      teams: [
        {
          id: "t3",
          name: "Peter Cook & Friends",
          details: "(Villaverde ChaosCup-tirkha)"
        }
      ]
    },
    {
      id: "9",
      name: "VillaverdeBowl X Edición",
      icon: "🏆",
      teams: [
        {
          id: "t4",
          name: "Gelfitafe",
          details: "(LBR 6.0-tirkha)"
        }
      ]
    }
  ];

  const handleDeleteTeam = (teamId: string) => {
    console.log("Eliminar equipo:", teamId);
  };

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
          <Button
            onClick={() => navigate("/dashboard")}
            size="lg"
            variant="secondary"
            className="font-bold text-base px-6"
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            INICIO
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="font-bold text-base px-6"
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            HALL OF FAME
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="font-bold text-base px-6"
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            LIGAS
          </Button>
          <Button
            size="lg"
            className="font-bold text-base px-6"
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            EQUIPOS
          </Button>
        </div>

        {/* Main Content */}
        <div className="bb-content-area">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            MIS EQUIPOS
          </h2>

          <div className="mb-4">
            <span className="text-lg text-primary cursor-pointer hover:underline" style={{ fontFamily: 'Georgia, serif' }}>
              🏆 Crear un equipo
            </span>
          </div>

          <div className="space-y-6">
            {myTeams.map((league) => (
              <div key={league.id} className="space-y-2">
                {/* League Header */}
                <div className="bg-muted border-2 border-primary p-3 rounded">
                  <h3 className="text-lg font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                    {league.icon} {league.name}
                  </h3>
                </div>

                {/* Teams in League */}
                {league.teams.map((team) => (
                  <div 
                    key={team.id}
                    className="bg-secondary/60 border-l-4 border-primary p-3 rounded flex items-center justify-between hover:bg-secondary/80 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🏈</span>
                      <div>
                        <span className="font-semibold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                          {team.name}
                        </span>
                        {team.details && (
                          <span className="text-sm text-muted-foreground ml-2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                            {team.details}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteTeam(team.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
