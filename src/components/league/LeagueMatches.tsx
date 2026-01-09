import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Match {
  id: string;
  homeTeam: string;
  homeCoach: string;
  homeCode: string;
  awayTeam: string;
  awayCoach: string;
  awayCode: string;
  homeScore: number | null;
  awayScore: number | null;
  played: boolean;
}

interface Matchday {
  number: number;
  startDate: string;
  endDate: string;
  matches: Match[];
}

const mockMatchdays: Matchday[] = [
  {
    number: 4,
    startDate: "04/11/2025",
    endDate: "09/11/2025",
    matches: [
      { id: "4-1", homeTeam: "Almadén Pascasios", homeCoach: "Otis", homeCode: "DALO", awayTeam: "Varangus komodoranus", awayCoach: "Zelikitita", awayCode: "DALD", homeScore: null, awayScore: null, played: false },
      { id: "4-2", homeTeam: "Tomb Kings", homeCoach: "SPJKE", homeCode: "DALD", awayTeam: "Farrar Sona", awayCoach: "dr crosss", awayCode: "DALD", homeScore: null, awayScore: null, played: false },
      { id: "4-3", homeTeam: "Sylvanian Streetfighthuggers", homeCoach: "Shaman", homeCode: "ALLS", awayTeam: "Peñeroclus", awayCoach: "penegrecito", awayCode: "DALD", homeScore: 2, awayScore: 0, played: true },
      { id: "4-4", homeTeam: "Irazma Kamikaze", homeCoach: "Harry", homeCode: "DALD", awayTeam: "Killing me softly with listro", awayCoach: "Verch", awayCode: "AELS", homeScore: 1, awayScore: 1, played: true },
      { id: "4-5", homeTeam: "Peñafrita's Herd", homeCoach: "LOBERAS", homeCode: "DELD", awayTeam: "Bacterias fecales", awayCoach: "Morgano", awayCode: "GALD", homeScore: null, awayScore: null, played: false },
      { id: "4-6", homeTeam: "Los Blancitos", homeCoach: "sneky", homeCode: "GALD", awayTeam: "Sakianne", awayCoach: "elhombreboogie", awayCode: "AELS", homeScore: null, awayScore: null, played: false },
      { id: "4-7", homeTeam: "Gutssellos", homeCoach: "Donde lirrico", homeCode: "DALD", awayTeam: "Repartidorez Valdikanoz", awayCoach: "Tio_Sam", awayCode: "OLDS", homeScore: 1, awayScore: 2, played: true },
      { id: "4-8", homeTeam: "Llictronos de Llavomeda", homeCoach: "Emiladus", homeCode: "DALD", awayTeam: "koko-doki Shinpu", awayCoach: "Blues", awayCode: "GALS", homeScore: 0, awayScore: 2, played: true },
    ],
  },
];

interface LeagueMatchesProps {
  leagueId: string;
}

const LeagueMatches = ({ leagueId }: LeagueMatchesProps) => {
  const navigate = useNavigate();
  const [selectedMatchday, setSelectedMatchday] = useState(4);
  const totalMatchdays = 13;

  const currentMatchday = mockMatchdays.find(md => md.number === selectedMatchday) || mockMatchdays[0];

  return (
    <div>
      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
        Resultados y partidos
      </h3>

      {/* Matchday Navigation */}
      <div className="mb-6 text-center flex flex-wrap items-center justify-center gap-2">
        <span className="font-bold">JORNADA</span>
        {Array.from({ length: totalMatchdays }, (_, i) => i + 1).map((j) => (
          <button
            key={j}
            onClick={() => setSelectedMatchday(j)}
            className={`px-3 py-1 rounded ${j === selectedMatchday ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-primary hover:bg-muted'}`}
          >
            {j}
          </button>
        ))}
      </div>

      {/* Matchday Content */}
      <div className="bb-content-area">
        <h4 className="text-2xl md:text-3xl font-bold text-center mb-4 py-3 bg-muted rounded" style={{ fontFamily: 'Georgia, serif' }}>
          JORNADA {currentMatchday.number} <span className="text-sm text-muted-foreground ml-2">({currentMatchday.startDate}-{currentMatchday.endDate})</span>
        </h4>

        {/* Matches Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {currentMatchday.matches.map((match) => (
                <tr key={match.id} className="bb-table-row hover:bg-muted/50">
                  <td className="py-3 px-2 text-center w-16">
                    <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="text-primary font-bold">{match.homeTeam}</div>
                    <div className="text-xs text-muted-foreground">{match.homeCoach} ({match.homeCode})</div>
                  </td>
                  <td className="py-3 px-2 text-center font-bold text-xl w-16">
                    {match.homeScore !== null ? match.homeScore : '-'}
                  </td>
                  <td className="py-3 px-2 text-center font-bold text-xl w-16">
                    {match.awayScore !== null ? match.awayScore : '-'}
                  </td>
                  <td className="py-3 px-2 text-left">
                    <div className="text-primary font-bold">{match.awayTeam}</div>
                    <div className="text-xs text-muted-foreground">{match.awayCoach} ({match.awayCode})</div>
                  </td>
                  <td className="py-3 px-2 text-center w-16">
                    <div className="w-12 h-12 bg-muted rounded mx-auto"></div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    {match.played ? (
                      <Button 
                        variant="link"
                        onClick={() => navigate(`/partido/${match.id}`)}
                        className="text-primary font-bold"
                      >
                        Ver acta
                      </Button>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-primary hover:underline font-bold cursor-pointer text-xs">Generar pdf de acta</div>
                        <div className="text-primary hover:underline font-bold cursor-pointer text-xs">Introducir acta</div>
                        <Button 
                          onClick={() => navigate(`/partido/${match.id}`)}
                          size="sm"
                          className="w-full font-bold text-xs"
                        >
                          Jugar partido
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
          <div className="p-3 bg-muted rounded">
            <div className="text-2xl font-bold text-primary">{currentMatchday.matches.filter(m => m.played).length}</div>
            <div className="text-muted-foreground">Jugados</div>
          </div>
          <div className="p-3 bg-muted rounded">
            <div className="text-2xl font-bold text-primary">{currentMatchday.matches.filter(m => !m.played).length}</div>
            <div className="text-muted-foreground">Pendientes</div>
          </div>
          <div className="p-3 bg-muted rounded">
            <div className="text-2xl font-bold text-primary">{currentMatchday.matches.length}</div>
            <div className="text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueMatches;
