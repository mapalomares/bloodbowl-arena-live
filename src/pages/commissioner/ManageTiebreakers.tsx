import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, Scale, FileText, Check, AlertTriangle, GripVertical, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TiedTeam {
  id: number;
  name: string;
  points: number;
  tdDiff: number;
  casDiff: number;
  tdFor: number;
  headToHead?: number;
  finalPosition?: number;
}

interface TiebreakGroup {
  id: number;
  position: number;
  teams: TiedTeam[];
  resolved: boolean;
}

const ManageTiebreakers = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const { toast } = useToast();

  const tiebreakerCriteria = [
    { id: 1, name: "2*(TDF-TDC) + HF-HC", description: "Fórmula combinada de touchdowns y heridas", order: 1 },
    { id: 2, name: "TDF - TDC", description: "Diferencia de touchdowns", order: 2 },
    { id: 3, name: "HF - HC", description: "Diferencia de heridas", order: 3 },
    { id: 4, name: "TDF", description: "Touchdowns a favor", order: 4 },
    { id: 5, name: "Head-to-head", description: "Enfrentamiento directo entre empatados", order: 5 },
    { id: 6, name: "Antigüedad", description: "Orden de inscripción del equipo", order: 6 },
  ];

  const [tiebreakGroups, setTiebreakGroups] = useState<TiebreakGroup[]>([
    {
      id: 1,
      position: 3,
      resolved: false,
      teams: [
        { id: 1, name: "Chaos Warriors", points: 12, tdDiff: 4, casDiff: 6, tdFor: 14 },
        { id: 2, name: "Undead Legion", points: 12, tdDiff: 4, casDiff: 3, tdFor: 12 },
      ]
    },
    {
      id: 2,
      position: 7,
      resolved: false,
      teams: [
        { id: 3, name: "Orcos del Norte", points: 9, tdDiff: 1, casDiff: 8, tdFor: 10 },
        { id: 4, name: "Humanos Unidos", points: 9, tdDiff: 1, casDiff: 8, tdFor: 10 },
        { id: 5, name: "Skaven FC", points: 9, tdDiff: 1, casDiff: 2, tdFor: 11 },
      ]
    },
  ]);

  const handleResolveGroup = (groupId: number) => {
    setTiebreakGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        // Simulate resolution by assigning final positions
        const resolvedTeams = [...group.teams].sort((a, b) => {
          // Apply criteria in order
          const formula1 = (2 * b.tdDiff + b.casDiff) - (2 * a.tdDiff + a.casDiff);
          if (formula1 !== 0) return formula1;
          
          const tdDiffDiff = b.tdDiff - a.tdDiff;
          if (tdDiffDiff !== 0) return tdDiffDiff;
          
          const casDiffDiff = b.casDiff - a.casDiff;
          if (casDiffDiff !== 0) return casDiffDiff;
          
          return b.tdFor - a.tdFor;
        }).map((team, idx) => ({
          ...team,
          finalPosition: group.position + idx
        }));
        
        return { ...group, teams: resolvedTeams, resolved: true };
      }
      return group;
    }));
    
    toast({
      title: "Desempate resuelto",
      description: "Se han aplicado los criterios de desempate correctamente.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Reporte generado",
      description: "El reporte de desempates se ha descargado como PDF.",
    });
  };

  const unresolvedCount = tiebreakGroups.filter(g => !g.resolved).length;

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
                Resolución de Desempates
              </h1>
              <p className="text-muted-foreground mt-1">
                Aplica los criterios de desempate para determinar posiciones finales
              </p>
            </div>
            <Button onClick={handleGenerateReport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Descargar Reporte
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Criteria Panel */}
            <div>
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Criterios de Desempate
                  </CardTitle>
                  <CardDescription>
                    Orden de aplicación configurado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tiebreakerCriteria.map((criteria, index) => (
                      <div key={criteria.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{criteria.name}</p>
                          <p className="text-xs text-muted-foreground">{criteria.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => navigate(`/comisario/${leagueId}/configuracion`)}>
                    Editar Criterios
                  </Button>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="bb-content-area mt-4">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{tiebreakGroups.length}</p>
                      <p className="text-sm text-muted-foreground">Grupos de empate</p>
                    </div>
                    {unresolvedCount > 0 ? (
                      <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    ) : (
                      <Check className="h-8 w-8 text-green-500" />
                    )}
                  </div>
                  {unresolvedCount > 0 && (
                    <Badge variant="secondary" className="mt-3">
                      {unresolvedCount} pendiente{unresolvedCount > 1 ? "s" : ""} de resolver
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Tiebreak Groups */}
            <div className="lg:col-span-2 space-y-6">
              {tiebreakGroups.length === 0 ? (
                <Card className="bb-content-area">
                  <CardContent className="py-12 text-center">
                    <Check className="h-12 w-12 mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-bold mb-2">Sin empates</h3>
                    <p className="text-muted-foreground">
                      No hay equipos empatados en la clasificación actual.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                tiebreakGroups.map((group) => (
                  <Card key={group.id} className={`bb-content-area ${group.resolved ? "border-green-500/50" : "border-yellow-500/50"}`}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Empate en posición {group.position}
                          {group.resolved ? (
                            <Badge className="bg-green-500">Resuelto</Badge>
                          ) : (
                            <Badge className="bg-yellow-500">Pendiente</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          {group.teams.length} equipos empatados con {group.teams[0].points} puntos
                        </CardDescription>
                      </div>
                      {!group.resolved && (
                        <Button onClick={() => handleResolveGroup(group.id)}>
                          <Scale className="h-4 w-4 mr-2" />
                          Resolver
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {group.resolved && <TableHead className="w-16">Pos.</TableHead>}
                            <TableHead>Equipo</TableHead>
                            <TableHead className="text-center">Pts</TableHead>
                            <TableHead className="text-center">TD Dif.</TableHead>
                            <TableHead className="text-center">Cas Dif.</TableHead>
                            <TableHead className="text-center">TDF</TableHead>
                            <TableHead className="text-center">Fórmula</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.teams.map((team) => (
                            <TableRow key={team.id} className={group.resolved ? "bg-muted/30" : ""}>
                              {group.resolved && (
                                <TableCell className="font-bold text-primary">{team.finalPosition}º</TableCell>
                              )}
                              <TableCell className="font-medium">{team.name}</TableCell>
                              <TableCell className="text-center font-bold">{team.points}</TableCell>
                              <TableCell className="text-center">
                                <span className={team.tdDiff >= 0 ? "text-green-600" : "text-red-600"}>
                                  {team.tdDiff > 0 ? "+" : ""}{team.tdDiff}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className={team.casDiff >= 0 ? "text-green-600" : "text-red-600"}>
                                  {team.casDiff > 0 ? "+" : ""}{team.casDiff}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">{team.tdFor}</TableCell>
                              <TableCell className="text-center font-mono text-sm">
                                {2 * team.tdDiff + team.casDiff}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      
                      {group.resolved && (
                        <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <p className="text-sm text-green-700 dark:text-green-400">
                            <Check className="h-4 w-4 inline mr-2" />
                            Desempate resuelto aplicando criterio: <strong>2*(TDF-TDC) + HF-HC</strong>
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageTiebreakers;