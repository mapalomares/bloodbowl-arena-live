import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, Search, CheckCircle, XCircle, Eye, AlertTriangle, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Team {
  id: number;
  name: string;
  coach: string;
  race: string;
  division: string;
  status: "validado" | "pendiente" | "rechazado";
  players: number;
  value: number;
  createdAt: string;
}

const ManageTeams = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: "Los Destructores", coach: "Juan García", race: "Orcos", division: "División A", status: "validado", players: 16, value: 1150000, createdAt: "2024-10-15" },
    { id: 2, name: "Elfos del Norte", coach: "María López", race: "Altos Elfos", division: "División A", status: "validado", players: 14, value: 1200000, createdAt: "2024-10-16" },
    { id: 3, name: "Chaos Warriors", coach: "Pedro Ruiz", race: "Caos", division: "División B", status: "pendiente", players: 12, value: 1100000, createdAt: "2024-11-01" },
    { id: 4, name: "Undead Legion", coach: "Ana Martín", race: "No Muertos", division: "División A", status: "validado", players: 16, value: 1180000, createdAt: "2024-10-18" },
    { id: 5, name: "Skaven Runners", coach: "Carlos Díaz", race: "Skaven", division: "División B", status: "pendiente", players: 16, value: 1050000, createdAt: "2024-11-02" },
  ]);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.coach.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.race.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingTeams = teams.filter(t => t.status === "pendiente");
  const validatedTeams = teams.filter(t => t.status === "validado");

  const handleValidate = (teamId: number) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, status: "validado" as const } : t));
    toast({
      title: "Equipo validado",
      description: "El equipo ha sido validado correctamente.",
    });
  };

  const handleReject = (teamId: number) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, status: "rechazado" as const } : t));
    toast({
      title: "Equipo rechazado",
      description: "El equipo ha sido rechazado.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: Team["status"]) => {
    switch (status) {
      case "validado":
        return <Badge className="bg-green-500 hover:bg-green-600">Validado</Badge>;
      case "pendiente":
        return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-black">Pendiente</Badge>;
      case "rechazado":
        return <Badge variant="destructive">Rechazado</Badge>;
    }
  };

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
            Gestión de Equipos
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{teams.length}</p>
                <p className="text-sm text-muted-foreground">Total Equipos</p>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold">{validatedTeams.length}</p>
                <p className="text-sm text-muted-foreground">Validados</p>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <p className="text-2xl font-bold">{pendingTeams.length}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Teams Alert */}
          {pendingTeams.length > 0 && (
            <Card className="bb-content-area mb-6 border-yellow-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-5 w-5" />
                  Equipos Pendientes de Validación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTeams.map((team) => (
                    <div key={team.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-muted-foreground">{team.coach} • {team.race}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedTeam(team)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleValidate(team.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Validar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(team.id)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Rechazar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar equipo, entrenador o raza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Teams Table */}
          <Card className="bb-content-area">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipo</TableHead>
                    <TableHead>Entrenador</TableHead>
                    <TableHead>Raza</TableHead>
                    <TableHead>División</TableHead>
                    <TableHead className="text-center">Jugadores</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          {team.name}
                        </div>
                      </TableCell>
                      <TableCell>{team.coach}</TableCell>
                      <TableCell>{team.race}</TableCell>
                      <TableCell>{team.division}</TableCell>
                      <TableCell className="text-center">{team.players}</TableCell>
                      <TableCell className="text-right">{team.value.toLocaleString()} gp</TableCell>
                      <TableCell className="text-center">{getStatusBadge(team.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/equipo/${team.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {team.status === "pendiente" && (
                            <>
                              <Button size="sm" variant="ghost" className="text-green-500" onClick={() => handleValidate(team.id)}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleReject(team.id)}>
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Team Detail Dialog */}
      <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles del Equipo</DialogTitle>
            <DialogDescription>Información del equipo pendiente de validación</DialogDescription>
          </DialogHeader>
          {selectedTeam && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nombre</p>
                  <p className="font-medium">{selectedTeam.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entrenador</p>
                  <p className="font-medium">{selectedTeam.coach}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Raza</p>
                  <p className="font-medium">{selectedTeam.race}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">División</p>
                  <p className="font-medium">{selectedTeam.division}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jugadores</p>
                  <p className="font-medium">{selectedTeam.players}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="font-medium">{selectedTeam.value.toLocaleString()} gp</p>
                </div>
              </div>
              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedTeam(null)}>
                  Cerrar
                </Button>
                <Button className="bg-green-500 hover:bg-green-600" onClick={() => { handleValidate(selectedTeam.id); setSelectedTeam(null); }}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Validar
                </Button>
                <Button variant="destructive" onClick={() => { handleReject(selectedTeam.id); setSelectedTeam(null); }}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Rechazar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTeams;
