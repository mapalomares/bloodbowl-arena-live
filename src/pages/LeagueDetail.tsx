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
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Resultados y partidos
            </h3>

            {/* Jornadas Navigation */}
            <div className="mb-6 text-center">
              <span className="mr-3 font-bold">JORNADA</span>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((j) => (
                <button
                  key={j}
                  className={`mx-1 px-2 py-1 ${j === 4 ? 'font-bold text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  {j}
                </button>
              ))}
            </div>

            {/* Matchday Content */}
            <div className="bb-content-area">
              <h4 className="text-2xl md:text-3xl font-bold text-center mb-4 py-3 bg-muted rounded" style={{ fontFamily: 'Georgia, serif' }}>
                JORNADA 4 <span className="text-sm text-muted-foreground ml-2">(04/11/2025-09/11/2025)</span>
              </h4>

              {/* Matches Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {/* Match 1 - Completed */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Almadén Pascasios</div>
                        <div className="text-xs text-muted-foreground">Otis (DALO)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">-</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">-</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">Varangus komodoranus</div>
                        <div className="text-xs text-muted-foreground">Zelikitita (DALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="space-y-1">
                          <div className="text-primary hover:underline font-bold cursor-pointer">Generar pdf de acta</div>
                          <div className="text-primary hover:underline font-bold cursor-pointer">Introducir acta</div>
                          <Button 
                            onClick={() => navigate(`/partido/4-1`)}
                            size="sm"
                            className="w-full font-bold text-xs"
                          >
                            Jugar partido
                          </Button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Match 2 - Pending */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Tomb Kings</div>
                        <div className="text-xs text-muted-foreground">SPJKE (DALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">-</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">-</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">Farrar Sona</div>
                        <div className="text-xs text-muted-foreground">dr crosss (DALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="space-y-1">
                          <div className="text-primary hover:underline font-bold cursor-pointer">Generar pdf de acta</div>
                          <div className="text-primary hover:underline font-bold cursor-pointer">Introducir acta</div>
                          <Button 
                            onClick={() => navigate(`/partido/4-2`)}
                            size="sm"
                            className="w-full font-bold text-xs"
                          >
                            Jugar partido
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* Match 3 - Completed */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Sylvanian Streetfighthuggers</div>
                        <div className="text-xs text-muted-foreground">Shaman (ALLS)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">2</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">0</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">Peñeroclus</div>
                        <div className="text-xs text-muted-foreground">penegrecito (DALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <a href="#" className="text-primary hover:underline font-bold">Ver acta</a>
                      </td>
                    </tr>

                    {/* Match 4 - Completed */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Irazma Kamikaze</div>
                        <div className="text-xs text-muted-foreground">Harry (DALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">1</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">1</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">Killing me softly with listro</div>
                        <div className="text-xs text-muted-foreground">Verch (AELS)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <a href="#" className="text-primary hover:underline font-bold">Ver acta</a>
                      </td>
                    </tr>

                    {/* Match 5 - Pending */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Peñafrita's Herd</div>
                        <div className="text-xs text-muted-foreground">LOBERAS (DELD)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">-</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">-</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">Bacterias fecales</div>
                        <div className="text-xs text-muted-foreground">Morgano (GALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="space-y-1">
                          <div className="text-primary hover:underline font-bold cursor-pointer">Generar pdf de acta</div>
                          <div className="text-primary hover:underline font-bold cursor-pointer">Introducir acta</div>
                          <Button 
                            onClick={() => navigate(`/partido/4-5`)}
                            size="sm"
                            className="w-full font-bold text-xs"
                          >
                            Jugar partido
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* Match 6 - Pending */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Los Blancitos y refrasaslitos</div>
                        <div className="text-xs text-muted-foreground">sneky (GALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">-</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">-</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">Sakianne (2001-2023)</div>
                        <div className="text-xs text-muted-foreground">elhombreboogie (AELS)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="space-y-1">
                          <div className="text-primary hover:underline font-bold cursor-pointer">Generar pdf de acta</div>
                          <div className="text-primary hover:underline font-bold cursor-pointer">Introducir acta</div>
                          <Button 
                            onClick={() => navigate(`/partido/4-6`)}
                            size="sm"
                            className="w-full font-bold text-xs"
                          >
                            Jugar partido
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* Match 7 - Completed */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Gutssellos</div>
                        <div className="text-xs text-muted-foreground">Donde lirrico (DALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">1</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">2</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">Repartidorez Valdikanoz</div>
                        <div className="text-xs text-muted-foreground">Tio_Sam (OLDS)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <a href="#" className="text-primary hover:underline font-bold">Ver acta</a>
                      </td>
                    </tr>

                    {/* Match 8 - Completed */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Llictronos de Llavomeda</div>
                        <div className="text-xs text-muted-foreground">Emiladus (DALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">0</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">2</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">koko-doki Shinpu</div>
                        <div className="text-xs text-muted-foreground">Blues (GALS)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <a href="#" className="text-primary hover:underline font-bold">Ver acta</a>
                      </td>
                    </tr>

                    {/* Match 9 - Completed */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Estalaxinos de parranda</div>
                        <div className="text-xs text-muted-foreground">Sosu (GALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">2</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">0</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">Nunnrgla-kong</div>
                        <div className="text-xs text-muted-foreground">gorrrra (DALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <a href="#" className="text-primary hover:underline font-bold">Ver acta</a>
                      </td>
                    </tr>

                    {/* Match 10 - Completed */}
                    <tr className="bb-table-row hover:bg-muted/50">
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="text-primary font-bold">Geckos del Druchu Harassers</div>
                        <div className="text-xs text-muted-foreground">Jevins (DALD)</div>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">1</td>
                      <td className="py-3 px-2 text-center font-bold text-xl w-16">2</td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-primary font-bold">Golftale n.0</div>
                        <div className="text-xs text-muted-foreground">tirkha (DALS)</div>
                      </td>
                      <td className="py-3 px-2 text-center w-16">
                        <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <a href="#" className="text-primary hover:underline font-bold">Ver acta</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'playoffs' && (
          <div className="bb-content-area min-h-[400px]">
            <div className="text-center py-12">
              <div className="mb-8">
                <img src={logo} alt="Andando Logo" className="h-16 mx-auto mb-4" />
                <p className="text-sm font-bold mb-2">Powered by Andando</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-center gap-4 mb-4">
                  <a href="#" className="text-primary hover:underline">TÉRMINOS DEL SERVICIO</a>
                  <span>|</span>
                  <a href="#" className="text-primary hover:underline">CONTACTO</a>
                  <span>|</span>
                  <a href="#" className="text-primary hover:underline">REGISTRO</a>
                </div>
                <p className="text-xs text-muted-foreground">Andando © Todos los derechos reservados</p>
                <p className="text-xs font-bold uppercase mt-4">
                  EL MEJOR GESTOR DE LIGAS IDEALJMANA JAFFERMAMOS AL FÚTBOL DE TABLERO TIPO BLOOD BOWL
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'halloffame' && (
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Hall of Fame
            </h3>

            <div className="bb-content-area">
              {/* Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center py-2 bg-muted rounded font-bold border-2 border-primary">
                  Por jugadores
                </div>
                <div className="text-center py-2 bg-background rounded font-bold border-2 border-muted cursor-pointer hover:bg-muted/50">
                  Por equipos
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="text-center py-2 bg-muted rounded text-sm font-bold">
                  Liga actual
                </div>
                <div className="text-center py-2 bg-background rounded text-sm font-bold cursor-pointer hover:bg-muted/50 text-primary">
                  Fuera de la liga
                </div>
                <div className="text-center py-2 bg-background rounded text-sm font-bold cursor-pointer hover:bg-muted/50">
                  Todos las ligas
                </div>
              </div>

              {/* Best Players Title */}
              <h4 className="text-xl font-bold text-center mb-4 py-2 bg-muted rounded" style={{ fontFamily: 'Georgia, serif' }}>
                MEJORES JUGADORES
              </h4>

              {/* Players Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-primary">
                      <th className="py-2 px-2 text-center font-bold">POS</th>
                      <th className="py-2 px-2 text-center font-bold">LOGO</th>
                      <th className="py-2 px-2 text-left font-bold">JUGADOR</th>
                      <th className="py-2 px-2 text-center font-bold">PUNTOS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { pos: 1, player: "Jugador 1 - Línea Eslizón", team: "Chatnoil Uzzuults (Hombres Lagarto)", points: 10 },
                      { pos: 2, player: "Subiendo - Troll Enfurrado", team: "Bacterias fecales (Gnollmgo)", points: 8 },
                      { pos: 3, player: "Jugador 7 - Vidramo", team: "Farrar Sano (Alanos Gilesoli)", points: 7 },
                      { pos: 4, player: "Jugador 6 - Corredor de Alcantarillas", team: "kazima Kiamilkaze (Skavens)", points: 7 },
                      { pos: 5, player: "Omu - Corredor de Alcantarillas", team: "koko-doki Shappo (Skavens)", points: 7 },
                      { pos: 6, player: "Plai - Pelotare Guerrero", team: "Gutssellos (Elfos Silvanos)", points: 7 },
                      { pos: 7, player: "Jumgeo - Merodano", team: "Peñafrita's Herd (Elegidos del Caos)", points: 7 },
                      { pos: 8, player: "Gencho Olarkis - Guerrero de Nurgle", team: "Mammelfackey (Nurgle)", points: 6 },
                    ].map((player, index) => (
                      <tr key={index} className="bb-table-row hover:bg-muted/50">
                        <td className="py-2 px-2 text-center font-bold">{player.pos}</td>
                        <td className="py-2 px-2 text-center">
                          <div className="w-8 h-8 bg-muted rounded mx-auto"></div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="text-primary font-bold">{player.player}</div>
                          <div className="text-xs text-muted-foreground">{player.team}</div>
                        </td>
                        <td className="py-2 px-2 text-center font-bold">{player.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comisario' && (
          <div className="bb-content-area">
            {/* Commissioner Tabs */}
            <div className="grid grid-cols-4 gap-1 mb-6" style={{ borderBottom: '2px solid hsl(var(--primary))' }}>
              <div className="text-center py-3 bg-muted font-bold border-l-4 border-primary">
                GENERAL
              </div>
              <div className="text-center py-3 bg-background font-bold cursor-pointer hover:bg-muted/50">
                EQUIPOS
              </div>
              <div className="text-center py-3 bg-background font-bold cursor-pointer hover:bg-muted/50">
                NOTIFICACIONES
              </div>
              <div className="text-center py-3 bg-background font-bold cursor-pointer hover:bg-muted/50">
                PLAYOFFS
              </div>
            </div>

            {/* Commissioner Form */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-bold">Nombre de liga:</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded bg-background" 
                    defaultValue="XXIII Edition"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-bold">Estado de la liga:</label>
                  <select className="w-full p-2 border rounded bg-background">
                    <option>En juego</option>
                    <option>Terminada</option>
                    <option>Inscripción</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-bold">Comisarios:</label>
                  <div className="space-y-2 bg-background p-3 rounded border">
                    <div className="flex items-center justify-between">
                      <span>tirkha</span>
                      <button className="text-destructive hover:underline text-sm">🗑️</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>dr crosss</span>
                      <button className="text-destructive hover:underline text-sm">🗑️</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>devilstree</span>
                      <button className="text-destructive hover:underline text-sm">🗑️</button>
                    </div>
                    <a href="#" className="text-primary hover:underline text-sm block mt-2">Añadir nuevo comisario</a>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-bold">Reglamento:</label>
                  <select className="w-full p-2 border rounded bg-background">
                    <option>Season 3 Glastheim</option>
                    <option>Season 2</option>
                    <option>Season 1</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-bold">Sistema de puntuación:</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded bg-background" 
                    defaultValue="3x1x0"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-bold">Sistema de desempate:</label>
                  <select className="w-full p-2 border rounded bg-background">
                    <option>1=TDP-TDC+P-E en las partidas entre los +</option>
                    <option>TDP-TDC</option>
                    <option>Diferencia de touchdowns</option>
                  </select>
                  <select className="w-full p-2 border rounded bg-background mt-2">
                    <option>2=TDP-TDC+P-E</option>
                    <option>TDP total</option>
                  </select>
                  <select className="w-full p-2 border rounded bg-background mt-2">
                    <option>3=P-E (que ligeros)</option>
                    <option>Diferencia general</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-bold">MVP sorteable:</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="mvp" value="yes" defaultChecked />
                      Sí/Sí
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="mvp" value="no" />
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-bold">TR inicial:</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded bg-background" 
                    defaultValue="1000000"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueDetail;
