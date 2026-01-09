import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid, List, Users, TrendingUp } from "lucide-react";

interface Team {
  id: string;
  name: string;
  race: string;
  coach: string;
  value: number;
  players: number;
  rerolls: number;
  fanFactor: number;
  treasury: number;
}

const mockTeams: Team[] = [
  { id: "1", name: "Repartidorez Valdikanoz", race: "Orcos", coach: "Tio_Sam", value: 1250000, players: 14, rerolls: 3, fanFactor: 4, treasury: 50000 },
  { id: "2", name: "Killing me softly with listro", race: "No Muertos", coach: "Verch", value: 1180000, players: 13, rerolls: 2, fanFactor: 3, treasury: 80000 },
  { id: "3", name: "Almadén Pascasios", race: "Enanos", coach: "Otis", value: 1320000, players: 12, rerolls: 4, fanFactor: 5, treasury: 20000 },
  { id: "4", name: "Bacterias fecales", race: "Gnoblar", coach: "Morgano", value: 1150000, players: 16, rerolls: 2, fanFactor: 2, treasury: 100000 },
  { id: "5", name: "Sylvanian Streetfighthuggers", race: "Humanos", coach: "Shaman", value: 1280000, players: 14, rerolls: 3, fanFactor: 4, treasury: 40000 },
  { id: "6", name: "Peñafrita's Herd", race: "Elegidos del Caos", coach: "LOBERAS", value: 1350000, players: 12, rerolls: 2, fanFactor: 3, treasury: 60000 },
  { id: "7", name: "koko-doki Shinpu", race: "Skavens", coach: "Blues", value: 1100000, players: 15, rerolls: 2, fanFactor: 2, treasury: 90000 },
  { id: "8", name: "Gutssellos", race: "Elfos Silvanos", coach: "Donde lirrico", value: 1200000, players: 13, rerolls: 3, fanFactor: 4, treasury: 30000 },
];

interface LeagueTeamsProps {
  leagueId: string;
}

const LeagueTeams = ({ leagueId }: LeagueTeamsProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTeams = mockTeams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.coach.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.race.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES").format(value) + " po";
  };

  return (
    <div>
      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
        Equipos de la Liga
      </h3>

      <div className="bb-content-area">
        {/* Search and View Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar equipo, entrenador o raza..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{mockTeams.length}</div>
            <div className="text-sm text-muted-foreground">Equipos</div>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{mockTeams.reduce((acc, t) => acc + t.players, 0)}</div>
            <div className="text-sm text-muted-foreground">Jugadores</div>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{new Set(mockTeams.map(t => t.race)).size}</div>
            <div className="text-sm text-muted-foreground">Razas</div>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{formatCurrency(Math.round(mockTeams.reduce((acc, t) => acc + t.value, 0) / mockTeams.length))}</div>
            <div className="text-sm text-muted-foreground">Valor Medio</div>
          </div>
        </div>

        {/* Teams Grid View */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeams.map((team) => (
              <div
                key={team.id}
                onClick={() => navigate(`/equipo/${team.id}`)}
                className="bg-card border-2 border-primary/20 hover:border-primary rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary">{team.name}</h4>
                    <p className="text-sm text-muted-foreground">{team.race}</p>
                    <p className="text-xs text-muted-foreground">Entrenador: {team.coach}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                  <div className="bg-muted rounded p-2">
                    <div className="font-bold">{team.players}</div>
                    <div className="text-muted-foreground">Jugadores</div>
                  </div>
                  <div className="bg-muted rounded p-2">
                    <div className="font-bold">{team.rerolls}</div>
                    <div className="text-muted-foreground">Rerolls</div>
                  </div>
                  <div className="bg-muted rounded p-2">
                    <div className="font-bold">{team.fanFactor}</div>
                    <div className="text-muted-foreground">FF</div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="font-bold text-primary">{formatCurrency(team.value)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Teams List View */}
        {viewMode === "list" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="py-2 px-2 text-center font-bold">LOGO</th>
                  <th className="py-2 px-2 text-left font-bold">EQUIPO</th>
                  <th className="py-2 px-2 text-center font-bold">JUG</th>
                  <th className="py-2 px-2 text-center font-bold">RR</th>
                  <th className="py-2 px-2 text-center font-bold">FF</th>
                  <th className="py-2 px-2 text-right font-bold">VALOR</th>
                  <th className="py-2 px-2 text-right font-bold">TESORO</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map((team) => (
                  <tr
                    key={team.id}
                    onClick={() => navigate(`/equipo/${team.id}`)}
                    className="bb-table-row hover:bg-muted/50 cursor-pointer"
                  >
                    <td className="py-2 px-2 text-center">
                      <div className="w-10 h-10 bg-muted rounded mx-auto"></div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="text-primary font-bold">{team.name}</div>
                      <div className="text-xs text-muted-foreground">{team.race} - {team.coach}</div>
                    </td>
                    <td className="py-2 px-2 text-center">{team.players}</td>
                    <td className="py-2 px-2 text-center">{team.rerolls}</td>
                    <td className="py-2 px-2 text-center">{team.fanFactor}</td>
                    <td className="py-2 px-2 text-right font-bold">{formatCurrency(team.value)}</td>
                    <td className="py-2 px-2 text-right">{formatCurrency(team.treasury)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredTeams.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No se encontraron equipos que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueTeams;
