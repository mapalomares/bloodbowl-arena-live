import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Target, Star, Shield, Users } from "lucide-react";

interface Player {
  position: number;
  name: string;
  playerType: string;
  team: string;
  race: string;
  value: number;
}

const mockTopScorers: Player[] = [
  { position: 1, name: "Jugador 1", playerType: "Línea Eslizón", team: "Chatnoil Uzzuults", race: "Hombres Lagarto", value: 10 },
  { position: 2, name: "Subiendo", playerType: "Troll Enfurruñado", team: "Bacterias fecales", race: "Gnoblar", value: 8 },
  { position: 3, name: "Jugador 7", playerType: "Vidramo", team: "Farrar Sona", race: "Altos Elfos", value: 7 },
  { position: 4, name: "Jugador 6", playerType: "Corredor de Alcantarillas", team: "Kazima Kamikaze", race: "Skavens", value: 7 },
  { position: 5, name: "Omu", playerType: "Corredor de Alcantarillas", team: "koko-doki Shinpu", race: "Skavens", value: 7 },
  { position: 6, name: "Plai", playerType: "Pelotare Guerrero", team: "Gutssellos", race: "Elfos Silvanos", value: 7 },
  { position: 7, name: "Jungeo", playerType: "Merodador", team: "Peñafrita's Herd", race: "Elegidos del Caos", value: 7 },
  { position: 8, name: "Gencho Olarkis", playerType: "Guerrero de Nurgle", team: "Mammelfackey", race: "Nurgle", value: 6 },
];

const mockTopKillers: Player[] = [
  { position: 1, name: "Destructix", playerType: "Bloque Negro", team: "Repartidorez Valdikanoz", race: "Orcos", value: 15 },
  { position: 2, name: "Smashface", playerType: "Ogro", team: "Bacterias fecales", race: "Gnoblar", value: 12 },
  { position: 3, name: "Bonecrusher", playerType: "Momia", team: "Killing me softly", race: "No Muertos", value: 10 },
  { position: 4, name: "Ironjaw", playerType: "Guardián de la Tumba", team: "Tomb Kings", race: "Reyes Funerarios", value: 9 },
  { position: 5, name: "Painbringer", playerType: "Verdugo", team: "Peñafrita's Herd", race: "Elegidos del Caos", value: 8 },
];

const mockMVPs: Player[] = [
  { position: 1, name: "Starplayer", playerType: "Lanzador", team: "Sylvanian Street", race: "Humanos", value: 8 },
  { position: 2, name: "Jugador 1", playerType: "Línea Eslizón", team: "Chatnoil Uzzuults", race: "Hombres Lagarto", value: 6 },
  { position: 3, name: "Destructix", playerType: "Bloque Negro", team: "Repartidorez Valdikanoz", race: "Orcos", value: 5 },
  { position: 4, name: "Speedster", playerType: "Receptor", team: "Gutssellos", race: "Elfos Silvanos", value: 4 },
  { position: 5, name: "Tankmaster", playerType: "Bloqueador", team: "Almadén Pascasios", race: "Enanos", value: 4 },
];

interface LeagueHallOfFameProps {
  leagueId: string;
}

const LeagueHallOfFame = ({ leagueId }: LeagueHallOfFameProps) => {
  const [viewMode, setViewMode] = useState<"players" | "teams">("players");
  const [scope, setScope] = useState<"current" | "historical" | "all">("current");

  const PlayerTable = ({ players, statLabel }: { players: Player[]; statLabel: string }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-primary">
            <th className="py-2 px-2 text-center font-bold">POS</th>
            <th className="py-2 px-2 text-center font-bold">LOGO</th>
            <th className="py-2 px-2 text-left font-bold">JUGADOR</th>
            <th className="py-2 px-2 text-center font-bold">{statLabel}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={`${player.name}-${player.team}`} className="bb-table-row hover:bg-muted/50">
              <td className="py-2 px-2 text-center font-bold">{player.position}</td>
              <td className="py-2 px-2 text-center">
                <div className="w-8 h-8 bg-muted rounded mx-auto"></div>
              </td>
              <td className="py-2 px-2">
                <div className="text-primary font-bold">{player.name} - {player.playerType}</div>
                <div className="text-xs text-muted-foreground">{player.team} ({player.race})</div>
              </td>
              <td className="py-2 px-2 text-center font-bold text-lg">{player.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
        Hall of Fame
      </h3>

      <div className="bb-content-area">
        {/* View Mode Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setViewMode("players")}
            className={`text-center py-2 rounded font-bold border-2 ${viewMode === "players" ? "bg-muted border-primary" : "bg-background border-muted hover:bg-muted/50"}`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Por jugadores
          </button>
          <button
            onClick={() => setViewMode("teams")}
            className={`text-center py-2 rounded font-bold border-2 ${viewMode === "teams" ? "bg-muted border-primary" : "bg-background border-muted hover:bg-muted/50"}`}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Por equipos
          </button>
        </div>

        {/* Scope Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => setScope("current")}
            className={`text-center py-2 rounded text-sm font-bold ${scope === "current" ? "bg-muted" : "bg-background hover:bg-muted/50"}`}
          >
            Liga actual
          </button>
          <button
            onClick={() => setScope("historical")}
            className={`text-center py-2 rounded text-sm font-bold ${scope === "historical" ? "bg-muted" : "bg-background hover:bg-muted/50 text-primary"}`}
          >
            Históricas
          </button>
          <button
            onClick={() => setScope("all")}
            className={`text-center py-2 rounded text-sm font-bold ${scope === "all" ? "bg-muted" : "bg-background hover:bg-muted/50"}`}
          >
            Todas las ligas
          </button>
        </div>

        {viewMode === "players" && (
          <Tabs defaultValue="scorers" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="scorers" className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Anotadores
              </TabsTrigger>
              <TabsTrigger value="killers" className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                Heridas
              </TabsTrigger>
              <TabsTrigger value="mvps" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                MVPs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scorers">
              <h4 className="text-xl font-bold text-center mb-4 py-2 bg-muted rounded">
                MEJORES ANOTADORES
              </h4>
              <PlayerTable players={mockTopScorers} statLabel="TDs" />
            </TabsContent>

            <TabsContent value="killers">
              <h4 className="text-xl font-bold text-center mb-4 py-2 bg-muted rounded">
                MEJORES DEFENSORES
              </h4>
              <PlayerTable players={mockTopKillers} statLabel="Heridas" />
            </TabsContent>

            <TabsContent value="mvps">
              <h4 className="text-xl font-bold text-center mb-4 py-2 bg-muted rounded">
                MEJORES MVPs
              </h4>
              <PlayerTable players={mockMVPs} statLabel="MVPs" />
            </TabsContent>
          </Tabs>
        )}

        {viewMode === "teams" && (
          <div>
            <h4 className="text-xl font-bold text-center mb-4 py-2 bg-muted rounded">
              MEJORES EQUIPOS
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="py-2 px-2 text-center font-bold">POS</th>
                    <th className="py-2 px-2 text-center font-bold">LOGO</th>
                    <th className="py-2 px-2 text-left font-bold">EQUIPO</th>
                    <th className="py-2 px-2 text-center font-bold">V</th>
                    <th className="py-2 px-2 text-center font-bold">E</th>
                    <th className="py-2 px-2 text-center font-bold">D</th>
                    <th className="py-2 px-2 text-center font-bold">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pos: 1, name: "Repartidorez Valdikanoz", race: "Orcos", coach: "Tio_Sam", w: 15, d: 3, l: 2, pts: 48 },
                    { pos: 2, name: "Killing me softly", race: "No Muertos", coach: "Verch", w: 12, d: 5, l: 3, pts: 41 },
                    { pos: 3, name: "Almadén Pascasios", race: "Enanos", coach: "Otis", w: 11, d: 4, l: 5, pts: 37 },
                  ].map((team) => (
                    <tr key={team.name} className="bb-table-row hover:bg-muted/50">
                      <td className="py-2 px-2 text-center font-bold">{team.pos}</td>
                      <td className="py-2 px-2 text-center">
                        <div className="w-8 h-8 bg-muted rounded mx-auto"></div>
                      </td>
                      <td className="py-2 px-2">
                        <div className="text-primary font-bold">{team.name}</div>
                        <div className="text-xs text-muted-foreground">{team.race} - {team.coach}</div>
                      </td>
                      <td className="py-2 px-2 text-center">{team.w}</td>
                      <td className="py-2 px-2 text-center">{team.d}</td>
                      <td className="py-2 px-2 text-center">{team.l}</td>
                      <td className="py-2 px-2 text-center font-bold text-lg">{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueHallOfFame;
