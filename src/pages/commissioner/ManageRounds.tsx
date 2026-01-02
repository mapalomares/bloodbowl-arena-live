import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, Calendar, Plus, Edit, Trash2, CheckCircle, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Match {
  id: number;
  local: string;
  visitor: string;
  localScore: number | null;
  visitorScore: number | null;
  status: "pendiente" | "jugado" | "aplazado";
}

interface Round {
  id: number;
  number: number;
  startDate: string;
  endDate: string;
  status: "pendiente" | "en_curso" | "finalizada";
  matches: Match[];
}

const ManageRounds = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const { toast } = useToast();
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newMatchDialogOpen, setNewMatchDialogOpen] = useState(false);

  const [rounds, setRounds] = useState<Round[]>([
    {
      id: 1, number: 1, startDate: "2024-10-01", endDate: "2024-10-07", status: "finalizada",
      matches: [
        { id: 1, local: "Los Destructores", visitor: "Elfos del Norte", localScore: 2, visitorScore: 1, status: "jugado" },
        { id: 2, local: "Chaos Warriors", visitor: "Undead Legion", localScore: 1, visitorScore: 1, status: "jugado" },
      ]
    },
    {
      id: 2, number: 2, startDate: "2024-10-08", endDate: "2024-10-14", status: "finalizada",
      matches: [
        { id: 3, local: "Elfos del Norte", visitor: "Chaos Warriors", localScore: 3, visitorScore: 0, status: "jugado" },
        { id: 4, local: "Undead Legion", visitor: "Los Destructores", localScore: 2, visitorScore: 2, status: "jugado" },
      ]
    },
    {
      id: 3, number: 3, startDate: "2024-10-15", endDate: "2024-10-21", status: "finalizada",
      matches: [
        { id: 5, local: "Los Destructores", visitor: "Chaos Warriors", localScore: 1, visitorScore: 0, status: "jugado" },
        { id: 6, local: "Elfos del Norte", visitor: "Undead Legion", localScore: 2, visitorScore: 1, status: "jugado" },
      ]
    },
    {
      id: 4, number: 4, startDate: "2024-10-22", endDate: "2024-10-28", status: "en_curso",
      matches: [
        { id: 7, local: "Chaos Warriors", visitor: "Los Destructores", localScore: null, visitorScore: null, status: "pendiente" },
        { id: 8, local: "Undead Legion", visitor: "Elfos del Norte", localScore: 2, visitorScore: 0, status: "jugado" },
      ]
    },
    {
      id: 5, number: 5, startDate: "2024-10-29", endDate: "2024-11-04", status: "pendiente",
      matches: [
        { id: 9, local: "Los Destructores", visitor: "Undead Legion", localScore: null, visitorScore: null, status: "pendiente" },
        { id: 10, local: "Chaos Warriors", visitor: "Elfos del Norte", localScore: null, visitorScore: null, status: "pendiente" },
      ]
    },
  ]);

  const getStatusBadge = (status: Round["status"]) => {
    switch (status) {
      case "finalizada":
        return <Badge className="bg-green-500 hover:bg-green-600">Finalizada</Badge>;
      case "en_curso":
        return <Badge className="bg-blue-500 hover:bg-blue-600">En Curso</Badge>;
      case "pendiente":
        return <Badge variant="secondary">Pendiente</Badge>;
    }
  };

  const getMatchStatusBadge = (status: Match["status"]) => {
    switch (status) {
      case "jugado":
        return <Badge className="bg-green-500 hover:bg-green-600" variant="secondary">Jugado</Badge>;
      case "pendiente":
        return <Badge variant="secondary">Pendiente</Badge>;
      case "aplazado":
        return <Badge variant="destructive">Aplazado</Badge>;
    }
  };

  const handleAddRound = () => {
    const newRound: Round = {
      id: rounds.length + 1,
      number: rounds.length + 1,
      startDate: "",
      endDate: "",
      status: "pendiente",
      matches: []
    };
    setRounds(prev => [...prev, newRound]);
    toast({
      title: "Jornada añadida",
      description: `Jornada ${newRound.number} creada correctamente.`,
    });
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

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
              Gestión de Jornadas
            </h1>
            <Button onClick={handleAddRound}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Jornada
            </Button>
          </div>

          {/* Rounds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rounds.map((round) => (
              <Card key={round.id} className={`bb-content-area cursor-pointer hover:shadow-lg transition-shadow ${round.status === "en_curso" ? "ring-2 ring-primary" : ""}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Jornada {round.number}</CardTitle>
                  {getStatusBadge(round.status)}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{round.startDate || "Sin fecha"} - {round.endDate || "Sin fecha"}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {round.matches.slice(0, 3).map((match) => (
                      <div key={match.id} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                        <div className="flex-1">
                          <span className="font-medium">{match.local}</span>
                          <span className="mx-2">vs</span>
                          <span className="font-medium">{match.visitor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {match.localScore !== null ? (
                            <span className="font-bold">{match.localScore} - {match.visitorScore}</span>
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    ))}
                    {round.matches.length > 3 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{round.matches.length - 3} partidos más
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => { setSelectedRound(round); setEditDialogOpen(true); }}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { setSelectedRound(round); setNewMatchDialogOpen(true); }}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Edit Round Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Jornada {selectedRound?.number}</DialogTitle>
            <DialogDescription>Modifica las fechas y partidos de la jornada</DialogDescription>
          </DialogHeader>
          {selectedRound && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Fecha Inicio</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={selectedRound.startDate}
                    onChange={(e) => setSelectedRound({ ...selectedRound, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Fecha Fin</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={selectedRound.endDate}
                    onChange={(e) => setSelectedRound({ ...selectedRound, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Estado</Label>
                <Select
                  value={selectedRound.status}
                  onValueChange={(value: Round["status"]) => setSelectedRound({ ...selectedRound, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en_curso">En Curso</SelectItem>
                    <SelectItem value="finalizada">Finalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Partidos</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Local</TableHead>
                      <TableHead>Visitante</TableHead>
                      <TableHead className="text-center">Resultado</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedRound.matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>{match.local}</TableCell>
                        <TableCell>{match.visitor}</TableCell>
                        <TableCell className="text-center">
                          {match.localScore !== null ? `${match.localScore} - ${match.visitorScore}` : "-"}
                        </TableCell>
                        <TableCell className="text-center">{getMatchStatusBadge(match.status)}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/comisario/${leagueId}/acta?partido=${match.id}`)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => {
                  setRounds(prev => prev.map(r => r.id === selectedRound.id ? selectedRound : r));
                  setEditDialogOpen(false);
                  toast({ title: "Jornada actualizada", description: "Los cambios se han guardado correctamente." });
                }}>
                  Guardar Cambios
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Match Dialog */}
      <Dialog open={newMatchDialogOpen} onOpenChange={setNewMatchDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Partido a Jornada {selectedRound?.number}</DialogTitle>
            <DialogDescription>Selecciona los equipos para el nuevo partido</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Equipo Local</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar equipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Los Destructores</SelectItem>
                  <SelectItem value="2">Elfos del Norte</SelectItem>
                  <SelectItem value="3">Chaos Warriors</SelectItem>
                  <SelectItem value="4">Undead Legion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Equipo Visitante</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar equipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Los Destructores</SelectItem>
                  <SelectItem value="2">Elfos del Norte</SelectItem>
                  <SelectItem value="3">Chaos Warriors</SelectItem>
                  <SelectItem value="4">Undead Legion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewMatchDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              setNewMatchDialogOpen(false);
              toast({ title: "Partido añadido", description: "El partido se ha añadido a la jornada." });
            }}>
              Añadir Partido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageRounds;
