import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeCoach: string;
  awayCoach: string;
  homeTeamValue: string;
  awayTeamValue: string;
  status: 'scheduled' | 'live' | 'finished';
}

const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'Voranus komodorensis',
    awayTeam: 'Salvame (2001-2025)',
    homeScore: 0,
    awayScore: 0,
    homeCoach: 'Zoddlo (90.0)',
    awayCoach: 'chombristopie (112.5)',
    homeTeamValue: '90.0',
    awayTeamValue: '112.5',
    status: 'scheduled'
  },
  {
    id: '2',
    homeTeam: 'Bacterias locas',
    awayTeam: 'Repartidorez Valdikavez',
    homeScore: 1,
    awayScore: 1,
    homeCoach: 'Morgano (50.0)',
    awayCoach: 'Tio_Sam (124.0)',
    homeTeamValue: '50.0',
    awayTeamValue: '124.0',
    status: 'scheduled'
  },
  {
    id: '3',
    homeTeam: 'Killing me softly with listro',
    awayTeam: 'Getxotites',
    homeScore: 1,
    awayScore: 0,
    homeCoach: 'Verch (110.0)',
    awayCoach: 'Duende Enco (90.0)',
    homeTeamValue: '110.0',
    awayTeamValue: '90.0',
    status: 'scheduled'
  }
];

const MatchList = () => {
  const navigate = useNavigate();

  const handlePlayMatch = (matchId: string) => {
    navigate(`/partido/${matchId}`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="bb-title mb-2">El Mejor Gestor de Ligas</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Ideal para aficionados al fútbol de tablero tipo Blood Bowl
          </p>
        </div>

        {/* Navigation Bar */}
        <nav className="bb-nav-bar mb-6 flex flex-wrap gap-2 justify-center">
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            Clasificaciones
          </Button>
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20 font-bold">
            Resultados y partidos
          </Button>
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            Playoffs
          </Button>
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            Hall of fame
          </Button>
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            Comisario
          </Button>
        </nav>

        {/* League Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          VillaverdeBowl XXiii Edition
        </h2>

        {/* Content Section */}
        <div className="bb-content-area">
          <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Resultados y Partidos
          </h3>

          {/* Journada Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num) => (
              <button
                key={num}
                className={`px-3 py-1 rounded text-sm font-bold ${
                  num === 1 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/70'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Matches Section */}
          <div className="bg-secondary p-4 rounded">
            <h4 className="text-xl font-bold text-center mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              JORNADA 1 <span className="text-sm font-normal">(03/01/2025-28/01/2025)</span>
            </h4>

            {/* Matches Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {mockMatches.map((match, index) => (
                    <tr key={match.id} className="bb-table-row">
                      <td className="py-3 px-2 text-right w-1/4">
                        <div className="flex items-center justify-end gap-2">
                          <div className="text-right">
                            <div className="font-bold text-primary">{match.homeTeam}</div>
                            <div className="text-xs text-muted-foreground">{match.homeCoach}</div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">🛡️</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center w-20">
                        <div className="font-bold text-2xl">
                          {match.homeScore} - {match.awayScore}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-left w-1/4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">🛡️</span>
                          </div>
                          <div>
                            <div className="font-bold text-primary">{match.awayTeam}</div>
                            <div className="text-xs text-muted-foreground">{match.awayCoach}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center w-1/6">
                        <Button 
                          onClick={() => handlePlayMatch(match.id)}
                          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6"
                        >
                          Jugar Partido
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchList;
