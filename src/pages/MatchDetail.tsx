import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { 
  ArrowLeft,
  Trophy,
  Shield,
  Download,
  Edit,
  Star
} from "lucide-react";

interface PlayerStats {
  number: number;
  name: string;
  position: string;
  passes: number;
  td: number;
  injuries: number;
  interceptions: number;
  mvp: boolean;
}

const mockLocalStats: PlayerStats[] = [
  { number: 1, name: "Grashnak", position: "Black Orc", passes: 0, td: 0, injuries: 2, interceptions: 0, mvp: false },
  { number: 3, name: "Smasher", position: "Blitzer", passes: 1, td: 1, injuries: 1, interceptions: 0, mvp: true },
  { number: 5, name: "Gobbo", position: "Goblin", passes: 0, td: 1, injuries: 0, interceptions: 0, mvp: false },
  { number: 6, name: "Bonecrusher", position: "Troll", passes: 0, td: 0, injuries: 3, interceptions: 0, mvp: false },
];

const mockVisitorStats: PlayerStats[] = [
  { number: 7, name: "Legolas", position: "Catcher", passes: 2, td: 1, injuries: 0, interceptions: 1, mvp: false },
  { number: 8, name: "Elrond", position: "Thrower", passes: 4, td: 0, injuries: 0, interceptions: 0, mvp: true },
  { number: 10, name: "Galadriel", position: "Lineman", passes: 0, td: 0, injuries: 1, interceptions: 0, mvp: false },
];

const MatchDetail = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();

  const matchInfo = {
    date: "08 Enero 2025",
    time: "18:00",
    round: 7,
    league: "Liga Nacional Blood Bowl",
    local: {
      name: "Los Destructores",
      score: 2,
      coach: "Juan García"
    },
    visitor: {
      name: "Elfos del Norte",
      score: 1,
      coach: "María López"
    },
    mvp: "Smasher (Los Destructores)"
  };

  const StatsTable = ({ stats, teamName }: { stats: PlayerStats[], teamName: string }) => (
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
              <TableHead className="text-center">MVP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((player) => (
              <TableRow key={player.number}>
                <TableCell className="font-medium">{player.number}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.position}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">{player.passes}</TableCell>
                <TableCell className="text-center font-bold">{player.td}</TableCell>
                <TableCell className="text-center">{player.injuries}</TableCell>
                <TableCell className="text-center">{player.interceptions}</TableCell>
                <TableCell className="text-center">
                  {player.mvp && <Star className="h-4 w-4 text-yellow-500 mx-auto fill-yellow-500" />}
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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>

          {/* Match Header */}
          <Card className="bb-content-area mb-8">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">{matchInfo.league} • Jornada {matchInfo.round}</p>
                <p className="text-sm text-muted-foreground">{matchInfo.date} - {matchInfo.time}</p>
              </div>

              <div className="flex items-center justify-center gap-8 md:gap-16">
                {/* Local Team */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{matchInfo.local.name}</h3>
                  <p className="text-sm text-muted-foreground">{matchInfo.local.coach}</p>
                </div>

                {/* Score */}
                <div className="text-center">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold">{matchInfo.local.score}</span>
                    <span className="text-2xl text-muted-foreground">-</span>
                    <span className="text-5xl font-bold">{matchInfo.visitor.score}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Final</p>
                </div>

                {/* Visitor Team */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{matchInfo.visitor.name}</h3>
                  <p className="text-sm text-muted-foreground">{matchInfo.visitor.coach}</p>
                </div>
              </div>

              {/* MVP */}
              <div className="text-center mt-6 pt-6 border-t border-primary/20">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600 fill-yellow-600" />
                  <span className="font-medium">MVP: {matchInfo.mvp}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Acta
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="space-y-6">
            <StatsTable stats={mockLocalStats} teamName={matchInfo.local.name} />
            <StatsTable stats={mockVisitorStats} teamName={matchInfo.visitor.name} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MatchDetail;
