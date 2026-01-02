import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, Trophy, Shield, Edit, Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlayoffMatch {
  id: number;
  round: string;
  position: number;
  team1: string | null;
  team2: string | null;
  score1: number | null;
  score2: number | null;
  winner: string | null;
}

const ManagePlayoffs = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const { toast } = useToast();
  
  const [playoffsEnabled, setPlayoffsEnabled] = useState(true);
  const [playoffFormat, setPlayoffFormat] = useState("8");
  const [isEditing, setIsEditing] = useState(false);

  const [matches, setMatches] = useState<PlayoffMatch[]>([
    // Quarterfinals
    { id: 1, round: "Cuartos", position: 1, team1: "Los Destructores", team2: "Skaven Runners", score1: 2, score2: 1, winner: "Los Destructores" },
    { id: 2, round: "Cuartos", position: 2, team1: "Elfos del Norte", team2: "Chaos Warriors", score1: 3, score2: 0, winner: "Elfos del Norte" },
    { id: 3, round: "Cuartos", position: 3, team1: "Undead Legion", team2: "Orcos Salvajes", score1: 1, score2: 2, winner: "Orcos Salvajes" },
    { id: 4, round: "Cuartos", position: 4, team1: "Enanos de Hierro", team2: "Humanos Unidos", score1: null, score2: null, winner: null },
    // Semifinals
    { id: 5, round: "Semifinales", position: 1, team1: "Los Destructores", team2: "Elfos del Norte", score1: null, score2: null, winner: null },
    { id: 6, round: "Semifinales", position: 2, team1: null, team2: null, score1: null, score2: null, winner: null },
    // Final
    { id: 7, round: "Final", position: 1, team1: null, team2: null, score1: null, score2: null, winner: null },
  ]);

  const teams = [
    "Los Destructores", "Elfos del Norte", "Undead Legion", "Chaos Warriors",
    "Skaven Runners", "Orcos Salvajes", "Enanos de Hierro", "Humanos Unidos"
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Playoffs guardados",
      description: "La configuración de playoffs se ha actualizado correctamente.",
    });
  };

  const BracketMatch = ({ match }: { match: PlayoffMatch }) => (
    <div className="bg-muted/50 rounded-lg p-3 border-2 border-primary/20 min-w-[220px]">
      <div className="text-xs text-muted-foreground mb-2 text-center font-medium">
        {match.round} - Partido {match.position}
      </div>
      
      {/* Team 1 */}
      <div className={`flex items-center justify-between p-2 rounded mb-1 ${match.winner === match.team1 ? "bg-green-100 border border-green-500" : "bg-background"}`}>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{match.team1 || "Por determinar"}</span>
        </div>
        <span className="font-bold">{match.score1 ?? "-"}</span>
      </div>
      
      {/* Team 2 */}
      <div className={`flex items-center justify-between p-2 rounded ${match.winner === match.team2 ? "bg-green-100 border border-green-500" : "bg-background"}`}>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{match.team2 || "Por determinar"}</span>
        </div>
        <span className="font-bold">{match.score2 ?? "-"}</span>
      </div>

      {isEditing && match.team1 && match.team2 && (
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full mt-2"
          onClick={() => navigate(`/comisario/${leagueId}/acta?playoff=${match.id}`)}
        >
          <Edit className="h-3 w-3 mr-1" />
          Introducir resultado
        </Button>
      )}
    </div>
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

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
              Configurar Playoffs
            </h1>
            <div className="flex gap-2">
              {isEditing ? (
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
            </div>
          </div>

          {/* Settings */}
          <Card className="bb-content-area mb-8">
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Activar Playoffs</Label>
                  <p className="text-sm text-muted-foreground">Habilita la fase de playoffs para esta liga</p>
                </div>
                <Switch
                  checked={playoffsEnabled}
                  onCheckedChange={setPlayoffsEnabled}
                  disabled={!isEditing}
                />
              </div>

              {playoffsEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                  <div>
                    <Label>Formato de Playoffs</Label>
                    <Select value={playoffFormat} onValueChange={setPlayoffFormat} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4 equipos (Semifinales + Final)</SelectItem>
                        <SelectItem value="8">8 equipos (Cuartos + Semi + Final)</SelectItem>
                        <SelectItem value="16">16 equipos (Octavos + Cuartos + Semi + Final)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Estado</Label>
                    <Badge className="block w-fit mt-2 bg-blue-500">En Curso</Badge>
                  </div>
                  <div>
                    <Label>Equipos Clasificados</Label>
                    <p className="text-2xl font-bold mt-1">{playoffFormat}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bracket */}
          {playoffsEnabled && (
            <Card className="bb-content-area">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Cuadro de Playoffs
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="flex gap-8 min-w-max p-4">
                  {/* Quarterfinals */}
                  <div className="space-y-4">
                    <h3 className="text-center font-bold text-primary mb-4">Cuartos de Final</h3>
                    <div className="space-y-8">
                      {matches.filter(m => m.round === "Cuartos").map((match) => (
                        <BracketMatch key={match.id} match={match} />
                      ))}
                    </div>
                  </div>

                  {/* Connector Lines */}
                  <div className="flex items-center">
                    <div className="w-8 border-t-2 border-primary/40"></div>
                  </div>

                  {/* Semifinals */}
                  <div className="space-y-4 pt-16">
                    <h3 className="text-center font-bold text-primary mb-4">Semifinales</h3>
                    <div className="space-y-24">
                      {matches.filter(m => m.round === "Semifinales").map((match) => (
                        <BracketMatch key={match.id} match={match} />
                      ))}
                    </div>
                  </div>

                  {/* Connector Lines */}
                  <div className="flex items-center">
                    <div className="w-8 border-t-2 border-primary/40"></div>
                  </div>

                  {/* Final */}
                  <div className="space-y-4 pt-40">
                    <h3 className="text-center font-bold text-primary mb-4">Final</h3>
                    {matches.filter(m => m.round === "Final").map((match) => (
                      <BracketMatch key={match.id} match={match} />
                    ))}
                  </div>

                  {/* Champion */}
                  <div className="flex items-center pl-4">
                    <div className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-500">
                      <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-muted-foreground">Campeón</p>
                      <p className="font-bold text-lg">Por determinar</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Teams Selection */}
          {playoffsEnabled && isEditing && (
            <Card className="bb-content-area mt-6">
              <CardHeader>
                <CardTitle>Equipos Clasificados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {teams.map((team, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <span className="font-bold text-primary">{index + 1}.</span>
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="font-medium">{team}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManagePlayoffs;
