import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Medal, Award } from "lucide-react";

interface PlayoffMatch {
  id: string;
  round: string;
  homeTeam: string | null;
  awayTeam: string | null;
  homeScore: number | null;
  awayScore: number | null;
  winner: string | null;
}

const mockPlayoffData = {
  format: "8 equipos",
  champion: null,
  runnerUp: null,
  thirdPlace: null,
  matches: {
    quarterfinals: [
      { id: "qf1", round: "Cuartos", homeTeam: "Repartidorez Valdikanoz", awayTeam: "Peñafrita's Herd", homeScore: 2, awayScore: 1, winner: "Repartidorez Valdikanoz" },
      { id: "qf2", round: "Cuartos", homeTeam: "Killing me softly", awayTeam: "Almadén Pascasios", homeScore: 1, awayScore: 1, winner: null },
      { id: "qf3", round: "Cuartos", homeTeam: "Bacterias fecales", awayTeam: "Sylvanian Street", homeScore: null, awayScore: null, winner: null },
      { id: "qf4", round: "Cuartos", homeTeam: "koko-doki Shinpu", awayTeam: "Gutssellos", homeScore: null, awayScore: null, winner: null },
    ],
    semifinals: [
      { id: "sf1", round: "Semifinal", homeTeam: "Repartidorez Valdikanoz", awayTeam: null, homeScore: null, awayScore: null, winner: null },
      { id: "sf2", round: "Semifinal", homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, winner: null },
    ],
    final: [
      { id: "f1", round: "Final", homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, winner: null },
    ],
    thirdPlace: [
      { id: "tp1", round: "3er Puesto", homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, winner: null },
    ],
  },
};

interface LeaguePlayoffsProps {
  leagueId: string;
}

const LeaguePlayoffs = ({ leagueId }: LeaguePlayoffsProps) => {
  const navigate = useNavigate();

  const BracketMatch = ({ match, className = "" }: { match: PlayoffMatch; className?: string }) => (
    <div className={`bg-card border-2 border-primary rounded-lg p-3 min-w-[200px] ${className}`}>
      <div className="text-xs text-muted-foreground mb-2 text-center font-bold">{match.round}</div>
      <div className={`flex justify-between items-center py-1 ${match.winner === match.homeTeam ? 'font-bold text-primary' : ''}`}>
        <span className="text-sm truncate">{match.homeTeam || 'Por definir'}</span>
        <span className="font-bold">{match.homeScore ?? '-'}</span>
      </div>
      <div className="border-t border-muted my-1"></div>
      <div className={`flex justify-between items-center py-1 ${match.winner === match.awayTeam ? 'font-bold text-primary' : ''}`}>
        <span className="text-sm truncate">{match.awayTeam || 'Por definir'}</span>
        <span className="font-bold">{match.awayScore ?? '-'}</span>
      </div>
      {match.winner && (
        <div className="text-xs text-center mt-2 text-primary font-bold">
          ✓ {match.winner}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
        Playoffs
      </h3>

      {/* Podium (if there are winners) */}
      {(mockPlayoffData.champion || mockPlayoffData.runnerUp || mockPlayoffData.thirdPlace) && (
        <div className="bb-content-area mb-6">
          <h4 className="text-xl font-bold text-center mb-4">Podio Final</h4>
          <div className="flex justify-center items-end gap-4">
            <div className="text-center">
              <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="bg-muted p-4 rounded-lg h-24 flex items-center justify-center">
                <span className="font-bold">{mockPlayoffData.runnerUp || '2º'}</span>
              </div>
            </div>
            <div className="text-center">
              <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
              <div className="bg-primary text-primary-foreground p-4 rounded-lg h-32 flex items-center justify-center">
                <span className="font-bold">{mockPlayoffData.champion || 'Campeón'}</span>
              </div>
            </div>
            <div className="text-center">
              <Award className="w-6 h-6 text-amber-700 mx-auto mb-2" />
              <div className="bg-muted p-4 rounded-lg h-20 flex items-center justify-center">
                <span className="font-bold">{mockPlayoffData.thirdPlace || '3º'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bracket */}
      <div className="bb-content-area">
        <h4 className="text-xl font-bold text-center mb-6 py-3 bg-muted rounded">
          Cuadro de Playoffs - {mockPlayoffData.format}
        </h4>

        <div className="overflow-x-auto">
          <div className="flex gap-8 min-w-[900px] p-4">
            {/* Quarterfinals */}
            <div className="flex flex-col gap-4">
              <div className="text-center font-bold text-primary mb-2">CUARTOS</div>
              {mockPlayoffData.matches.quarterfinals.map((match) => (
                <BracketMatch key={match.id} match={match} />
              ))}
            </div>

            {/* Connectors */}
            <div className="flex flex-col justify-around py-12">
              <div className="w-8 border-t-2 border-primary"></div>
              <div className="w-8 border-t-2 border-primary"></div>
            </div>

            {/* Semifinals */}
            <div className="flex flex-col gap-4 justify-center">
              <div className="text-center font-bold text-primary mb-2">SEMIFINALES</div>
              {mockPlayoffData.matches.semifinals.map((match) => (
                <BracketMatch key={match.id} match={match} className="my-8" />
              ))}
            </div>

            {/* Connectors */}
            <div className="flex flex-col justify-center">
              <div className="w-8 border-t-2 border-primary"></div>
            </div>

            {/* Final & Third Place */}
            <div className="flex flex-col gap-4 justify-center">
              <div className="text-center font-bold text-primary mb-2">FINAL</div>
              {mockPlayoffData.matches.final.map((match) => (
                <BracketMatch key={match.id} match={match} />
              ))}
              <div className="mt-8">
                <div className="text-center font-bold text-muted-foreground mb-2">3º PUESTO</div>
                {mockPlayoffData.matches.thirdPlace.map((match) => (
                  <BracketMatch key={match.id} match={match} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 text-sm text-muted-foreground text-center">
          <p>Los equipos clasificados se determinan según la clasificación final de la liga regular.</p>
          <p className="mt-2">
            <span className="inline-block w-3 h-3 bg-primary rounded mr-1"></span>
            Partido completado
            <span className="inline-block w-3 h-3 bg-muted rounded mx-1 ml-4"></span>
            Pendiente
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaguePlayoffs;
