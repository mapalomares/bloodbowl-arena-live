import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface TeamMatch {
  id: string;
  date: string;
  round: number;
  opponent: string;
  opponentId: string;
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  result: "win" | "draw" | "loss";
  leagueName: string;
  hasScoresheet: boolean;
}

interface TeamMatchHistoryProps {
  matches: TeamMatch[];
  teamName: string;
}

const TeamMatchHistory = ({ matches, teamName }: TeamMatchHistoryProps) => {
  const navigate = useNavigate();

  const playedMatches = matches.filter(m => m.result !== undefined);
  const upcomingMatches = matches.filter(m => m.result === undefined);

  const getResultBadge = (result: TeamMatch["result"]) => {
    switch (result) {
      case "win":
        return <Badge className="bg-green-600">Victoria</Badge>;
      case "draw":
        return <Badge className="bg-yellow-600">Empate</Badge>;
      case "loss":
        return <Badge className="bg-red-600">Derrota</Badge>;
      default:
        return <Badge variant="secondary">Pendiente</Badge>;
    }
  };

  const getScore = (match: TeamMatch) => {
    if (match.isHome) {
      return `${match.homeScore} - ${match.awayScore}`;
    }
    return `${match.awayScore} - ${match.homeScore}`;
  };

  return (
    <div className="space-y-6">
      {/* Próximos partidos */}
      {upcomingMatches.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <Calendar className="w-5 h-5" />
            Próximos Partidos
          </h3>
          <div className="space-y-2">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Jornada</div>
                    <div className="font-bold">{match.round}</div>
                  </div>
                  <div>
                    <div className="font-semibold">
                      {match.isHome ? (
                        <>{teamName} vs {match.opponent}</>
                      ) : (
                        <>{match.opponent} vs {teamName}</>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{match.date}</div>
                  </div>
                </div>
                <Badge variant="secondary">Pendiente</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partidos jugados */}
      <div>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
          <Trophy className="w-5 h-5" />
          Partidos Jugados ({playedMatches.length})
        </h3>
        
        {playedMatches.length > 0 ? (
          <div className="space-y-2">
            {playedMatches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[50px]">
                    <div className="text-xs text-muted-foreground">J{match.round}</div>
                    <div className="text-lg font-bold">{getScore(match)}</div>
                  </div>
                  <div>
                    <div className="font-semibold">
                      vs {match.opponent}
                      {match.isHome ? (
                        <span className="text-xs text-muted-foreground ml-2">(Local)</span>
                      ) : (
                        <span className="text-xs text-muted-foreground ml-2">(Visitante)</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{match.date} • {match.leagueName}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {getResultBadge(match.result)}
                  {match.hasScoresheet && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/partido/${match.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Acta
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay partidos jugados todavía</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMatchHistory;
