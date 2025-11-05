import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/bb-leagues-logo.png";

interface TeamStanding {
  position: number;
  name: string;
  coach: string;
  race: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  noShow: number;
  tdf: number;
  tdc: number;
  passes: number;
  interceptions: number;
  fouls: number;
  casualties: number;
}

const mockStandings: TeamStanding[] = [
  {
    position: 1,
    name: "Repartidorez Valdikanoz",
    coach: "Tio_Sam",
    race: "Orcos",
    points: 10,
    played: 4,
    won: 3,
    drawn: 1,
    lost: 0,
    noShow: 0,
    tdf: 5,
    tdc: 2,
    passes: 3,
    interceptions: 0,
    fouls: 12,
    casualties: 7,
  },
  {
    position: 2,
    name: "Killing me softly with listro",
    coach: "Verch",
    race: "No Muertos",
    points: 8,
    played: 4,
    won: 2,
    drawn: 2,
    lost: 0,
    noShow: 0,
    tdf: 5,
    tdc: 3,
    passes: 0,
    interceptions: 0,
    fouls: 6,
    casualties: 1,
  },
  {
    position: 3,
    name: "Almadén Pascasios",
    coach: "Otis",
    race: "Enanos",
    points: 7,
    played: 3,
    won: 2,
    drawn: 1,
    lost: 0,
    noShow: 0,
    tdf: 4,
    tdc: 1,
    passes: 0,
    interceptions: 0,
    fouls: 4,
    casualties: 1,
  },
  {
    position: 3,
    name: "Bacterias fecales",
    coach: "Morgano",
    race: "Gnoilmgo",
    points: 7,
    played: 3,
    won: 2,
    drawn: 1,
    lost: 0,
    noShow: 0,
    tdf: 5,
    tdc: 2,
    passes: 0,
    interceptions: 0,
    fouls: 13,
    casualties: 13,
  },
  {
    position: 3,
    name: "Sylvanian Streetfighthuggers",
    coach: "Shaman",
    race: "Humanos",
    points: 7,
    played: 4,
    won: 2,
    drawn: 1,
    lost: 1,
    noShow: 0,
    tdf: 5,
    tdc: 3,
    passes: 15,
    interceptions: 0,
    fouls: 9,
    casualties: 7,
  },
  {
    position: 6,
    name: "Peñafrita's Herd",
    coach: "LOBERAS",
    race: "Elegidos del Caos",
    points: 6,
    played: 3,
    won: 2,
    drawn: 0,
    lost: 1,
    noShow: 0,
    tdf: 5,
    tdc: 3,
    passes: 1,
    interceptions: 0,
    fouls: 7,
    casualties: 5,
  },
];

const LeagueDetail = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const [activeTab, setActiveTab] = useState("clasificaciones");
  const [username] = useState("tirkha");
  const [lastConnection] = useState("2025-11-04 22:13:27");
  const [hasNotifications] = useState(true);

  const handleLogout = () => {
    navigate("/");
  };

  const leagueName = "VillaverdeBowl XXIII Edition";
  const divisionName = "División Villaverde Alto";

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
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Button 
            onClick={() => navigate("/dashboard")}
            className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" 
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
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

        {/* League Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          {leagueName}
        </h2>

        {/* League Navigation */}
        <div className="bb-nav-bar mb-6 flex flex-wrap gap-1 justify-center">
          <Button 
            variant="ghost" 
            className={`text-primary-foreground hover:bg-primary-foreground/20 font-bold ${activeTab === 'clasificaciones' ? 'bg-primary-foreground/20' : ''}`}
            onClick={() => setActiveTab('clasificaciones')}
          >
            Clasificaciones
          </Button>
          <Button 
            variant="ghost" 
            className={`text-primary-foreground hover:bg-primary-foreground/20 font-bold ${activeTab === 'resultados' ? 'bg-primary-foreground/20' : ''}`}
            onClick={() => setActiveTab('resultados')}
          >
            Resultados y partidos
          </Button>
          <Button 
            variant="ghost" 
            className={`text-primary-foreground hover:bg-primary-foreground/20 font-bold ${activeTab === 'playoffs' ? 'bg-primary-foreground/20' : ''}`}
            onClick={() => setActiveTab('playoffs')}
          >
            Playoffs
          </Button>
          <Button 
            variant="ghost" 
            className={`text-primary-foreground hover:bg-primary-foreground/20 font-bold ${activeTab === 'halloffame' ? 'bg-primary-foreground/20' : ''}`}
            onClick={() => setActiveTab('halloffame')}
          >
            Hall of fame
          </Button>
          <Button 
            variant="ghost" 
            className={`text-primary-foreground hover:bg-primary-foreground/20 font-bold ${activeTab === 'comisario' ? 'bg-primary-foreground/20' : ''}`}
            onClick={() => setActiveTab('comisario')}
          >
            Comisario
          </Button>
        </div>

        {/* Content Section */}
        {activeTab === 'clasificaciones' && (
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Clasificación de la Liga
            </h3>

            <div className="bb-content-area">
              {/* Division Title */}
              <h4 className="text-2xl md:text-3xl font-bold text-center mb-4 py-3 bg-muted rounded" style={{ fontFamily: 'Georgia, serif' }}>
                {divisionName}
              </h4>

              {/* Standings Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-primary">
                      <th className="py-2 px-2 text-center font-bold">Pos</th>
                      <th className="py-2 px-2 text-left font-bold">Equipo</th>
                      <th className="py-2 px-2 text-center font-bold">Puntos</th>
                      <th className="py-2 px-2 text-center font-bold">Jugados</th>
                      <th className="py-2 px-2 text-center font-bold">Ganados</th>
                      <th className="py-2 px-2 text-center font-bold">Empatados</th>
                      <th className="py-2 px-2 text-center font-bold">Perdidos</th>
                      <th className="py-2 px-2 text-center font-bold">No<br/>Presentados</th>
                      <th className="py-2 px-2 text-center font-bold">TDF</th>
                      <th className="py-2 px-2 text-center font-bold">TDC</th>
                      <th className="py-2 px-2 text-center font-bold">Pases</th>
                      <th className="py-2 px-2 text-center font-bold">INT</th>
                      <th className="py-2 px-2 text-center font-bold">HER<br/>F</th>
                      <th className="py-2 px-2 text-center font-bold">HER<br/>C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStandings.map((team, index) => (
                      <tr key={index} className="bb-table-row hover:bg-muted/50">
                        <td className="py-2 px-2 text-center font-bold">{team.position}</td>
                        <td className="py-2 px-2">
                          <div className="text-primary font-bold">{team.name}</div>
                          <div className="text-xs text-muted-foreground">
                            ({team.race}) {team.coach}
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center font-bold">{team.points}</td>
                        <td className="py-2 px-2 text-center">{team.played}</td>
                        <td className="py-2 px-2 text-center">{team.won}</td>
                        <td className="py-2 px-2 text-center">{team.drawn}</td>
                        <td className="py-2 px-2 text-center">{team.lost}</td>
                        <td className="py-2 px-2 text-center">{team.noShow}</td>
                        <td className="py-2 px-2 text-center">{team.tdf}</td>
                        <td className="py-2 px-2 text-center">{team.tdc}</td>
                        <td className="py-2 px-2 text-center">{team.passes}</td>
                        <td className="py-2 px-2 text-center">{team.interceptions}</td>
                        <td className="py-2 px-2 text-center">{team.fouls}</td>
                        <td className="py-2 px-2 text-center">{team.casualties}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resultados' && (
          <div className="bb-content-area">
            <h3 className="text-2xl font-bold mb-4">Resultados y Partidos</h3>
            <p className="text-muted-foreground">Contenido de resultados y partidos...</p>
          </div>
        )}

        {activeTab === 'playoffs' && (
          <div className="bb-content-area">
            <h3 className="text-2xl font-bold mb-4">Playoffs</h3>
            <p className="text-muted-foreground">Contenido de playoffs...</p>
          </div>
        )}

        {activeTab === 'halloffame' && (
          <div className="bb-content-area">
            <h3 className="text-2xl font-bold mb-4">Hall of Fame</h3>
            <p className="text-muted-foreground">Contenido de hall of fame...</p>
          </div>
        )}

        {activeTab === 'comisario' && (
          <div className="bb-content-area">
            <h3 className="text-2xl font-bold mb-4">Panel de Comisario</h3>
            <p className="text-muted-foreground">Contenido del panel de comisario...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueDetail;
