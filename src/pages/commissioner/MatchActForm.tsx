import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, Save, FileText, Trophy, Shield, Star, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlayerActStats {
  id: number;
  number: number;
  name: string;
  position: string;
  passes: number;
  td: number;
  injuries: number;
  interceptions: number;
  fouls: number;
  mvp: boolean;
  injury: string;
}

const MatchActForm = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const matchId = searchParams.get("partido") || "1";

  const [localScore, setLocalScore] = useState(0);
  const [visitorScore, setVisitorScore] = useState(0);
  const [mvpTeam, setMvpTeam] = useState<"local" | "visitor">("local");
  const [mvpPlayer, setMvpPlayer] = useState("");
  const [notes, setNotes] = useState("");
  const [weather, setWeather] = useState("soleado");

  const [localPlayers, setLocalPlayers] = useState<PlayerActStats[]>([
    { id: 1, number: 1, name: "Grashnak", position: "Black Orc", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
    { id: 2, number: 2, name: "Smashface", position: "Black Orc", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
    { id: 3, number: 3, name: "Smasher", position: "Blitzer", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
    { id: 4, number: 4, name: "Crusher", position: "Blitzer", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
    { id: 5, number: 5, name: "Gobbo", position: "Goblin", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
    { id: 6, number: 6, name: "Bonecrusher", position: "Troll", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
  ]);

  const [visitorPlayers, setVisitorPlayers] = useState<PlayerActStats[]>([
    { id: 7, number: 1, name: "Legolas", position: "Catcher", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
    { id: 8, number: 2, name: "Elrond", position: "Thrower", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
    { id: 9, number: 3, name: "Galadriel", position: "Lineman", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
    { id: 10, number: 4, name: "Aragorn", position: "Blitzer", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
    { id: 11, number: 5, name: "Gimli", position: "Lineman", passes: 0, td: 0, injuries: 0, interceptions: 0, fouls: 0, mvp: false, injury: "" },
  ]);

  const matchInfo = {
    round: 4,
    local: { name: "Los Destructores", coach: "Juan García" },
    visitor: { name: "Elfos del Norte", coach: "María López" }
  };

  const updatePlayerStat = (
    team: "local" | "visitor",
    playerId: number,
    stat: keyof PlayerActStats,
    value: number | boolean | string
  ) => {
    const setter = team === "local" ? setLocalPlayers : setVisitorPlayers;
    setter(prev => prev.map(p => 
      p.id === playerId ? { ...p, [stat]: value } : p
    ));
  };

  const incrementStat = (team: "local" | "visitor", playerId: number, stat: keyof PlayerActStats) => {
    const players = team === "local" ? localPlayers : visitorPlayers;
    const player = players.find(p => p.id === playerId);
    if (player && typeof player[stat] === "number") {
      updatePlayerStat(team, playerId, stat, (player[stat] as number) + 1);
    }
  };

  const decrementStat = (team: "local" | "visitor", playerId: number, stat: keyof PlayerActStats) => {
    const players = team === "local" ? localPlayers : visitorPlayers;
    const player = players.find(p => p.id === playerId);
    if (player && typeof player[stat] === "number" && (player[stat] as number) > 0) {
      updatePlayerStat(team, playerId, stat, (player[stat] as number) - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Acta guardada",
      description: "El acta del partido ha sido registrada correctamente.",
    });
    navigate(`/comisario/${leagueId}`);
  };

  const StatCell = ({ team, player, stat }: { team: "local" | "visitor", player: PlayerActStats, stat: keyof PlayerActStats }) => (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => decrementStat(team, player.id, stat)}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-6 text-center font-medium">{player[stat] as number}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => incrementStat(team, player.id, stat)}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );

  const PlayerStatsTable = ({ team, players, teamName }: { team: "local" | "visitor", players: PlayerActStats[], teamName: string }) => (
    <Card className="bb-content-area">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {teamName}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Jugador</TableHead>
              <TableHead className="text-center">Pases</TableHead>
              <TableHead className="text-center">TD</TableHead>
              <TableHead className="text-center">Heridas</TableHead>
              <TableHead className="text-center">INT</TableHead>
              <TableHead className="text-center">Faltas</TableHead>
              <TableHead className="text-center">MVP</TableHead>
              <TableHead>Lesión</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.number}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.position}</p>
                  </div>
                </TableCell>
                <TableCell><StatCell team={team} player={player} stat="passes" /></TableCell>
                <TableCell><StatCell team={team} player={player} stat="td" /></TableCell>
                <TableCell><StatCell team={team} player={player} stat="injuries" /></TableCell>
                <TableCell><StatCell team={team} player={player} stat="interceptions" /></TableCell>
                <TableCell><StatCell team={team} player={player} stat="fouls" /></TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={player.mvp}
                    onCheckedChange={(checked) => updatePlayerStat(team, player.id, "mvp", !!checked)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={player.injury}
                    onValueChange={(value) => updatePlayerStat(team, player.id, "injury", value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sin lesión" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin lesión</SelectItem>
                      <SelectItem value="ko">KO</SelectItem>
                      <SelectItem value="herido">Herido leve</SelectItem>
                      <SelectItem value="grave">Herido grave</SelectItem>
                      <SelectItem value="muerte">Muerte</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => navigate(`/comisario/${leagueId}`)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Panel
          </Button>

          <h1 className="text-3xl font-bold text-primary mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            Introducir Acta de Partido
          </h1>

          {/* Match Header */}
          <Card className="bb-content-area mb-8">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Jornada {matchInfo.round}</p>
              </div>

              <div className="flex items-center justify-center gap-8">
                {/* Local Team */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold">{matchInfo.local.name}</h3>
                  <p className="text-sm text-muted-foreground">{matchInfo.local.coach}</p>
                </div>

                {/* Score Input */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <Label htmlFor="localScore" className="text-xs">Local</Label>
                    <Input
                      id="localScore"
                      type="number"
                      min="0"
                      value={localScore}
                      onChange={(e) => setLocalScore(parseInt(e.target.value) || 0)}
                      className="w-16 text-center text-2xl font-bold h-14"
                    />
                  </div>
                  <span className="text-2xl text-muted-foreground">-</span>
                  <div className="text-center">
                    <Label htmlFor="visitorScore" className="text-xs">Visitante</Label>
                    <Input
                      id="visitorScore"
                      type="number"
                      min="0"
                      value={visitorScore}
                      onChange={(e) => setVisitorScore(parseInt(e.target.value) || 0)}
                      className="w-16 text-center text-2xl font-bold h-14"
                    />
                  </div>
                </div>

                {/* Visitor Team */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold">{matchInfo.visitor.name}</h3>
                  <p className="text-sm text-muted-foreground">{matchInfo.visitor.coach}</p>
                </div>
              </div>

              {/* Weather & MVP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-primary/20">
                <div>
                  <Label htmlFor="weather">Clima</Label>
                  <Select value={weather} onValueChange={setWeather}>
                    <SelectTrigger id="weather">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soleado">Soleado</SelectItem>
                      <SelectItem value="lluvia">Lluvia</SelectItem>
                      <SelectItem value="nieve">Nieve</SelectItem>
                      <SelectItem value="tormenta">Tormenta</SelectItem>
                      <SelectItem value="niebla">Niebla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>MVP del Partido</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-muted-foreground">Selecciona el MVP en la tabla de jugadores</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Player Stats Tables */}
          <div className="space-y-6 mb-8">
            <PlayerStatsTable team="local" players={localPlayers} teamName={matchInfo.local.name} />
            <PlayerStatsTable team="visitor" players={visitorPlayers} teamName={matchInfo.visitor.name} />
          </div>

          {/* Notes */}
          <Card className="bb-content-area mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Notas del Partido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Añade notas o comentarios sobre el partido..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate(`/comisario/${leagueId}`)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Guardar Acta
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MatchActForm;
