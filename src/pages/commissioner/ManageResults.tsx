import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, CheckCircle, XCircle, Eye, FileText, AlertTriangle, Clock, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Match {
  id: number;
  round: number;
  local: string;
  visitor: string;
  localScore: number | null;
  visitorScore: number | null;
  date: string;
  status: "pendiente" | "sin_validar" | "validado" | "rechazado";
  actSubmittedBy?: string;
  actSubmittedAt?: string;
}

const ManageResults = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const { toast } = useToast();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [validateDialogOpen, setValidateDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [matches, setMatches] = useState<Match[]>([
    { id: 1, round: 1, local: "Los Destructores", visitor: "Elfos del Norte", localScore: 2, visitorScore: 1, date: "2024-10-05", status: "validado", actSubmittedBy: "coach_destructor", actSubmittedAt: "2024-10-05 18:30" },
    { id: 2, round: 1, local: "Chaos Warriors", visitor: "Undead Legion", localScore: 1, visitorScore: 1, date: "2024-10-06", status: "validado", actSubmittedBy: "coach_chaos", actSubmittedAt: "2024-10-06 20:15" },
    { id: 3, round: 2, local: "Elfos del Norte", visitor: "Chaos Warriors", localScore: 3, visitorScore: 0, date: "2024-10-12", status: "sin_validar", actSubmittedBy: "coach_elfos", actSubmittedAt: "2024-10-12 17:45" },
    { id: 4, round: 2, local: "Undead Legion", visitor: "Los Destructores", localScore: 2, visitorScore: 2, date: "2024-10-13", status: "sin_validar", actSubmittedBy: "coach_undead", actSubmittedAt: "2024-10-13 19:00" },
    { id: 5, round: 3, local: "Los Destructores", visitor: "Chaos Warriors", localScore: null, visitorScore: null, date: "2024-10-19", status: "pendiente" },
    { id: 6, round: 3, local: "Elfos del Norte", visitor: "Undead Legion", localScore: null, visitorScore: null, date: "2024-10-20", status: "pendiente" },
    { id: 7, round: 4, local: "Chaos Warriors", visitor: "Los Destructores", localScore: null, visitorScore: null, date: "2024-10-26", status: "pendiente" },
    { id: 8, round: 4, local: "Undead Legion", visitor: "Elfos del Norte", localScore: null, visitorScore: null, date: "2024-10-27", status: "pendiente" },
  ]);

  const pendingMatches = matches.filter(m => m.status === "pendiente");
  const unvalidatedMatches = matches.filter(m => m.status === "sin_validar");
  const validatedMatches = matches.filter(m => m.status === "validado");
  const rejectedMatches = matches.filter(m => m.status === "rechazado");

  const getStatusBadge = (status: Match["status"]) => {
    switch (status) {
      case "pendiente":
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> Pendiente</Badge>;
      case "sin_validar":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 gap-1"><AlertTriangle className="h-3 w-3" /> Sin Validar</Badge>;
      case "validado":
        return <Badge className="bg-green-500 hover:bg-green-600 gap-1"><CheckCircle className="h-3 w-3" /> Validado</Badge>;
      case "rechazado":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Rechazado</Badge>;
    }
  };

  const handleValidate = () => {
    if (selectedMatch) {
      setMatches(prev => prev.map(m => 
        m.id === selectedMatch.id ? { ...m, status: "validado" as const } : m
      ));
      toast({
        title: "Acta validada",
        description: `El partido ${selectedMatch.local} vs ${selectedMatch.visitor} ha sido validado.`,
      });
      setValidateDialogOpen(false);
      setSelectedMatch(null);
    }
  };

  const handleReject = () => {
    if (selectedMatch && rejectReason.trim()) {
      setMatches(prev => prev.map(m => 
        m.id === selectedMatch.id ? { ...m, status: "rechazado" as const } : m
      ));
      toast({
        title: "Acta rechazada",
        description: `El partido ${selectedMatch.local} vs ${selectedMatch.visitor} ha sido rechazado.`,
        variant: "destructive"
      });
      setRejectDialogOpen(false);
      setRejectReason("");
      setSelectedMatch(null);
    }
  };

  const handleCalculateStandings = () => {
    toast({
      title: "Clasificación actualizada",
      description: "Se ha recalculado la clasificación con los partidos validados.",
    });
  };

  const MatchTable = ({ matchList, showActions = false }: { matchList: Match[], showActions?: boolean }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Jornada</TableHead>
          <TableHead>Local</TableHead>
          <TableHead className="text-center">Resultado</TableHead>
          <TableHead>Visitante</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Estado</TableHead>
          {showActions && <TableHead className="text-right">Acciones</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {matchList.length === 0 ? (
          <TableRow>
            <TableCell colSpan={showActions ? 7 : 6} className="text-center text-muted-foreground py-8">
              No hay partidos en esta categoría
            </TableCell>
          </TableRow>
        ) : matchList.map((match) => (
          <TableRow key={match.id}>
            <TableCell className="font-medium">J{match.round}</TableCell>
            <TableCell className="font-medium">{match.local}</TableCell>
            <TableCell className="text-center font-bold">
              {match.localScore !== null ? `${match.localScore} - ${match.visitorScore}` : "-"}
            </TableCell>
            <TableCell className="font-medium">{match.visitor}</TableCell>
            <TableCell className="text-muted-foreground">{match.date}</TableCell>
            <TableCell>{getStatusBadge(match.status)}</TableCell>
            {showActions && (
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline" onClick={() => navigate(`/partido/${match.id}`)}>
                  <Eye className="h-4 w-4" />
                </Button>
                {match.status === "sin_validar" && (
                  <>
                    <Button size="sm" variant="default" onClick={() => { setSelectedMatch(match); setValidateDialogOpen(true); }}>
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => { setSelectedMatch(match); setRejectDialogOpen(true); }}>
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </>
                )}
                {match.status === "pendiente" && (
                  <Button size="sm" onClick={() => navigate(`/comisario/${leagueId}/acta?partido=${match.id}`)}>
                    <FileText className="h-4 w-4 mr-1" /> Acta
                  </Button>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" onClick={() => navigate(`/comisario/${leagueId}`)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Panel
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                Registro de Resultados
              </h1>
              <p className="text-muted-foreground mt-1">
                Gestiona y valida las actas de partidos
              </p>
            </div>
            <Button onClick={handleCalculateStandings} className="gap-2">
              <Calculator className="h-4 w-4" />
              Calcular Clasificación
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-2xl font-bold">{pendingMatches.length}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <p className="text-2xl font-bold">{unvalidatedMatches.length}</p>
                <p className="text-sm text-muted-foreground">Sin Validar</p>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold">{validatedMatches.length}</p>
                <p className="text-sm text-muted-foreground">Validados</p>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <XCircle className="h-8 w-8 mx-auto text-destructive mb-2" />
                <p className="text-2xl font-bold">{rejectedMatches.length}</p>
                <p className="text-sm text-muted-foreground">Rechazados</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Card className="bb-content-area">
            <Tabs defaultValue="sin_validar" className="w-full">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="pendientes" className="gap-2">
                    Pendientes
                    <Badge variant="secondary" className="ml-1">{pendingMatches.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="sin_validar" className="gap-2">
                    Sin Validar
                    <Badge className="bg-yellow-500 ml-1">{unvalidatedMatches.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="validados">
                    Validados
                    <Badge className="bg-green-500 ml-1">{validatedMatches.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="rechazados">
                    Rechazados
                    <Badge variant="destructive" className="ml-1">{rejectedMatches.length}</Badge>
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="pendientes">
                  <MatchTable matchList={pendingMatches} showActions />
                </TabsContent>
                <TabsContent value="sin_validar">
                  <MatchTable matchList={unvalidatedMatches} showActions />
                </TabsContent>
                <TabsContent value="validados">
                  <MatchTable matchList={validatedMatches} />
                </TabsContent>
                <TabsContent value="rechazados">
                  <MatchTable matchList={rejectedMatches} />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Validate Dialog */}
      <Dialog open={validateDialogOpen} onOpenChange={setValidateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Validar Acta de Partido</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas validar esta acta? Esta acción actualizará la clasificación.
            </DialogDescription>
          </DialogHeader>
          {selectedMatch && (
            <div className="py-4">
              <div className="bg-muted/50 p-4 rounded-lg text-center space-y-2">
                <p className="font-medium">Jornada {selectedMatch.round}</p>
                <p className="text-xl font-bold">
                  {selectedMatch.local} {selectedMatch.localScore} - {selectedMatch.visitorScore} {selectedMatch.visitor}
                </p>
                <p className="text-sm text-muted-foreground">
                  Enviada por: {selectedMatch.actSubmittedBy} el {selectedMatch.actSubmittedAt}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setValidateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleValidate} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Validar Acta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Acta de Partido</DialogTitle>
            <DialogDescription>
              Indica el motivo del rechazo. El entrenador será notificado.
            </DialogDescription>
          </DialogHeader>
          {selectedMatch && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <p className="font-bold">
                  {selectedMatch.local} {selectedMatch.localScore} - {selectedMatch.visitorScore} {selectedMatch.visitor}
                </p>
              </div>
              <div>
                <Label htmlFor="rejectReason">Motivo del rechazo</Label>
                <Textarea
                  id="rejectReason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Describe el motivo del rechazo..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectDialogOpen(false); setRejectReason(""); }}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()} className="gap-2">
              <XCircle className="h-4 w-4" />
              Rechazar Acta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageResults;