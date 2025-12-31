import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { 
  Trophy, 
  Search,
  Users,
  Calendar,
  ChevronRight,
  Grid,
  List,
  History
} from "lucide-react";

interface League {
  id: number;
  name: string;
  edition: string;
  status: "active" | "closed" | "historic";
  teams: number;
  commissioner: string;
  startDate: string;
  endDate: string;
  logo?: string;
}

const mockLeagues: League[] = [
  { id: 1, name: "Liga Nacional Blood Bowl", edition: "Temporada 2025", status: "active", teams: 12, commissioner: "Carlos M.", startDate: "01/01/2025", endDate: "30/06/2025" },
  { id: 2, name: "Copa Regional Sur", edition: "Edición XV", status: "active", teams: 8, commissioner: "María L.", startDate: "15/01/2025", endDate: "15/04/2025" },
  { id: 3, name: "Torneo Relámpago", edition: "Primavera 2025", status: "active", teams: 16, commissioner: "Pedro S.", startDate: "01/03/2025", endDate: "31/03/2025" },
  { id: 4, name: "Liga Élite", edition: "Temporada 2024", status: "closed", teams: 10, commissioner: "Ana R.", startDate: "01/01/2024", endDate: "30/06/2024" },
  { id: 5, name: "Copa del Rey", edition: "2024", status: "closed", teams: 32, commissioner: "Luis G.", startDate: "01/09/2024", endDate: "15/12/2024" },
  { id: 6, name: "Liga Nacional Blood Bowl", edition: "Temporada 2023", status: "historic", teams: 12, commissioner: "Carlos M.", startDate: "01/01/2023", endDate: "30/06/2023" },
  { id: 7, name: "Torneo de Campeones", edition: "2022", status: "historic", teams: 8, commissioner: "Roberto F.", startDate: "01/11/2022", endDate: "20/12/2022" },
];

const Leagues = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filterLeagues = (status: League["status"]) => {
    return mockLeagues
      .filter(league => league.status === status)
      .filter(league => 
        league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        league.edition.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const getStatusBadge = (status: League["status"]) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      closed: "bg-yellow-100 text-yellow-800",
      historic: "bg-gray-100 text-gray-800"
    };
    const labels = {
      active: "Activa",
      closed: "Cerrada",
      historic: "Histórica"
    };
    return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
  };

  const LeagueCard = ({ league }: { league: League }) => (
    <Card 
      className="bb-content-area cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/liga/${league.id}`)}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          {getStatusBadge(league.status)}
        </div>
        <h3 className="font-bold text-lg mb-1">{league.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{league.edition}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{league.teams} equipos</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{league.startDate} - {league.endDate}</span>
          </div>
          <p className="text-muted-foreground">Comisario: {league.commissioner}</p>
        </div>
        <Button variant="link" className="px-0 mt-4">
          Ver Liga <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );

  const LeagueRow = ({ league }: { league: League }) => (
    <div 
      className="flex items-center justify-between p-4 bg-card rounded-lg border-2 border-primary/20 hover:border-primary cursor-pointer transition-colors"
      onClick={() => navigate(`/liga/${league.id}`)}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <Trophy className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold">{league.name}</h3>
          <p className="text-sm text-muted-foreground">{league.edition}</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <div className="text-center">
          <p className="font-medium">{league.teams}</p>
          <p className="text-xs text-muted-foreground">Equipos</p>
        </div>
        <div className="text-center">
          <p className="font-medium">{league.commissioner}</p>
          <p className="text-xs text-muted-foreground">Comisario</p>
        </div>
        {getStatusBadge(league.status)}
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  );

  const renderLeagues = (leagues: League[]) => {
    if (leagues.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          No se encontraron ligas con los filtros aplicados.
        </div>
      );
    }

    if (viewMode === "grid") {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leagues.map(league => <LeagueCard key={league.id} league={league} />)}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {leagues.map(league => <LeagueRow key={league.id} league={league} />)}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="bb-title text-3xl">Ligas</h1>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar ligas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-1 border rounded-lg p-1">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList>
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Activas ({filterLeagues("active").length})
              </TabsTrigger>
              <TabsTrigger value="closed" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Cerradas ({filterLeagues("closed").length})
              </TabsTrigger>
              <TabsTrigger value="historic" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Históricas ({filterLeagues("historic").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {renderLeagues(filterLeagues("active"))}
            </TabsContent>

            <TabsContent value="closed">
              {renderLeagues(filterLeagues("closed"))}
            </TabsContent>

            <TabsContent value="historic">
              {renderLeagues(filterLeagues("historic"))}
            </TabsContent>
          </Tabs>

          {/* League History Link */}
          <Card className="bb-content-area mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <History className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-bold">Historial de Ediciones</h3>
                    <p className="text-sm text-muted-foreground">Explora el timeline completo de todas las ediciones pasadas</p>
                  </div>
                </div>
                <Button onClick={() => navigate('/leagues/history')}>
                  Ver Historial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leagues;
