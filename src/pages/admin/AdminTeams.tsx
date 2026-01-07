import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Search, Eye, Edit, Users, Trophy } from "lucide-react";

const AdminTeams = () => {
  const navigate = useNavigate();
  const [leagueFilter, setLeagueFilter] = useState("all");
  const [raceFilter, setRaceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const teams = [
    { id: "1", name: "Orcos Salvajes", race: "Orcos", coach: "Juan García", league: "Liga Nacional 2024", status: "active", players: 16, value: 1250 },
    { id: "2", name: "Elfos del Bosque", race: "Elfos Silvanos", coach: "María López", league: "Liga Nacional 2024", status: "active", players: 14, value: 1180 },
    { id: "3", name: "Enanos de Hierro", race: "Enanos", coach: "Pedro Sánchez", league: "Torneo Relámpago", status: "active", players: 12, value: 1100 },
    { id: "4", name: "No-Muertos FC", race: "No-Muertos", coach: "Ana Martín", league: "Liga Nacional 2024", status: "pending", players: 11, value: 1000 },
    { id: "5", name: "Ratas del Alcantarillado", race: "Skaven", coach: "Carlos Ruiz", league: "Torneo Relámpago", status: "rejected", players: 15, value: 1150 },
    { id: "6", name: "Humanos United", race: "Humanos", coach: "Luis Fernández", league: "Liga Otoño 2023", status: "active", players: 16, value: 1300 },
  ];

  const races = [...new Set(teams.map(t => t.race))];
  const leagues = [...new Set(teams.map(t => t.league))];

  const filteredTeams = teams.filter((team) => {
    const matchesLeague = leagueFilter === "all" || team.league === leagueFilter;
    const matchesRace = raceFilter === "all" || team.race === raceFilter;
    const matchesStatus = statusFilter === "all" || team.status === statusFilter;
    const matchesSearch = 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.coach.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLeague && matchesRace && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Activo</Badge>;
      case "pending":
        return <Badge className="bg-yellow-600">Pendiente</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rechazado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-muted-foreground">
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/")}>Inicio</span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/admin")}>Administración</span>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Equipos</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="bb-title text-primary">Gestión de Equipos</h1>
          <p className="text-muted-foreground text-center">Vista global de todos los equipos del sistema</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{teams.length}</p>
              <p className="text-sm text-muted-foreground">Total Equipos</p>
            </CardContent>
          </Card>
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{teams.filter(t => t.status === "active").length}</p>
              <p className="text-sm text-muted-foreground">Equipos Activos</p>
            </CardContent>
          </Card>
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{teams.filter(t => t.status === "pending").length}</p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </CardContent>
          </Card>
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-muted-foreground">{races.length}</p>
              <p className="text-sm text-muted-foreground">Razas Diferentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bb-content-area mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o entrenador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={leagueFilter} onValueChange={setLeagueFilter}>
                <SelectTrigger className="w-full md:w-52">
                  <SelectValue placeholder="Liga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las ligas</SelectItem>
                  {leagues.map((league) => (
                    <SelectItem key={league} value={league}>{league}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={raceFilter} onValueChange={setRaceFilter}>
                <SelectTrigger className="w-full md:w-44">
                  <SelectValue placeholder="Raza" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las razas</SelectItem>
                  {races.map((race) => (
                    <SelectItem key={race} value={race}>{race}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="rejected">Rechazados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Teams Table */}
        <Card className="bb-content-area">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Equipos ({filteredTeams.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipo</TableHead>
                  <TableHead>Raza</TableHead>
                  <TableHead>Entrenador</TableHead>
                  <TableHead>Liga</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-center">Jugadores</TableHead>
                  <TableHead className="text-right">Valor (K)</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id} className="bb-table-row">
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.race}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {team.coach}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{team.league}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(team.status)}</TableCell>
                    <TableCell className="text-center">{team.players}</TableCell>
                    <TableCell className="text-right">{team.value}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/equipo/${team.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default AdminTeams;
