import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Trophy, Users, BarChart3, TrendingUp } from "lucide-react";

const AdminReports = () => {
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState("");

  const leagues = [
    { id: "1", name: "Liga Nacional 2024" },
    { id: "2", name: "Torneo Relámpago" },
    { id: "3", name: "Liga Otoño 2023" },
  ];

  const leagueStandings = [
    { pos: 1, team: "Orcos Salvajes", played: 11, won: 8, drawn: 2, lost: 1, tdFor: 24, tdAgainst: 12, points: 26 },
    { pos: 2, team: "Elfos del Bosque", played: 11, won: 7, drawn: 3, lost: 1, tdFor: 28, tdAgainst: 15, points: 24 },
    { pos: 3, team: "Humanos United", played: 11, won: 6, drawn: 3, lost: 2, tdFor: 20, tdAgainst: 14, points: 21 },
    { pos: 4, team: "Enanos de Hierro", played: 11, won: 5, drawn: 4, lost: 2, tdFor: 15, tdAgainst: 10, points: 19 },
    { pos: 5, team: "No-Muertos FC", played: 11, won: 4, drawn: 3, lost: 4, tdFor: 18, tdAgainst: 18, points: 15 },
  ];

  const userStats = [
    { metric: "Usuarios Registrados", thisMonth: 45, lastMonth: 38, growth: "+18%" },
    { metric: "Usuarios Activos", thisMonth: 320, lastMonth: 298, growth: "+7%" },
    { metric: "Nuevos Equipos", thisMonth: 23, lastMonth: 19, growth: "+21%" },
    { metric: "Partidos Jugados", thisMonth: 156, lastMonth: 142, growth: "+10%" },
    { metric: "Actas Registradas", thisMonth: 148, lastMonth: 135, growth: "+10%" },
  ];

  const topPlayers = [
    { rank: 1, name: "Grashnak el Demoledor", team: "Orcos Salvajes", touchdowns: 12, casualties: 8, mvps: 4 },
    { rank: 2, name: "Aelindril Veloz", team: "Elfos del Bosque", touchdowns: 15, casualties: 1, mvps: 3 },
    { rank: 3, name: "Thorin Manodefierro", team: "Enanos de Hierro", touchdowns: 4, casualties: 14, mvps: 5 },
    { rank: 4, name: "Marcus Águila", team: "Humanos United", touchdowns: 9, casualties: 5, mvps: 2 },
    { rank: 5, name: "Nekros el Eterno", team: "No-Muertos FC", touchdowns: 7, casualties: 9, mvps: 3 },
  ];

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
          <span className="text-foreground font-medium">Reportes</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="bb-title text-primary">Reportes y Exportación</h1>
          <p className="text-muted-foreground text-center">Estadísticas, clasificaciones y exportación de datos</p>
        </div>

        <Tabs defaultValue="leagues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leagues" className="gap-2">
              <Trophy className="h-4 w-4" />
              Reportes de Ligas
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Estadísticas de Usuarios
            </TabsTrigger>
            <TabsTrigger value="global" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Estadísticas Globales
            </TabsTrigger>
          </TabsList>

          {/* League Reports Tab */}
          <TabsContent value="leagues">
            <Card className="bb-content-area mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Reporte de Liga
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Seleccionar liga..." />
                      </SelectTrigger>
                      <SelectContent>
                        {leagues.map((league) => (
                          <SelectItem key={league.id} value={league.id}>{league.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" disabled={!selectedLeague}>
                      <Download className="h-4 w-4 mr-2" />
                      Exportar PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedLeague ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Clasificación Final</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">Pos</TableHead>
                            <TableHead>Equipo</TableHead>
                            <TableHead className="text-center">PJ</TableHead>
                            <TableHead className="text-center">G</TableHead>
                            <TableHead className="text-center">E</TableHead>
                            <TableHead className="text-center">P</TableHead>
                            <TableHead className="text-center">TDF</TableHead>
                            <TableHead className="text-center">TDC</TableHead>
                            <TableHead className="text-center font-bold">Pts</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leagueStandings.map((row) => (
                            <TableRow key={row.pos} className="bb-table-row">
                              <TableCell className="font-bold">{row.pos}</TableCell>
                              <TableCell className="font-medium">{row.team}</TableCell>
                              <TableCell className="text-center">{row.played}</TableCell>
                              <TableCell className="text-center text-green-600">{row.won}</TableCell>
                              <TableCell className="text-center text-yellow-600">{row.drawn}</TableCell>
                              <TableCell className="text-center text-destructive">{row.lost}</TableCell>
                              <TableCell className="text-center">{row.tdFor}</TableCell>
                              <TableCell className="text-center">{row.tdAgainst}</TableCell>
                              <TableCell className="text-center font-bold text-primary">{row.points}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Top 5 Jugadores</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">Rank</TableHead>
                            <TableHead>Jugador</TableHead>
                            <TableHead>Equipo</TableHead>
                            <TableHead className="text-center">TDs</TableHead>
                            <TableHead className="text-center">Bajas</TableHead>
                            <TableHead className="text-center">MVPs</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topPlayers.map((player) => (
                            <TableRow key={player.rank} className="bb-table-row">
                              <TableCell className="font-bold">{player.rank}</TableCell>
                              <TableCell className="font-medium">{player.name}</TableCell>
                              <TableCell className="text-muted-foreground">{player.team}</TableCell>
                              <TableCell className="text-center">{player.touchdowns}</TableCell>
                              <TableCell className="text-center">{player.casualties}</TableCell>
                              <TableCell className="text-center">{player.mvps}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Selecciona una liga para ver su reporte</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Stats Tab */}
          <TabsContent value="users">
            <Card className="bb-content-area">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Estadísticas de Usuarios
                  </CardTitle>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Métrica</TableHead>
                      <TableHead className="text-center">Este Mes</TableHead>
                      <TableHead className="text-center">Mes Anterior</TableHead>
                      <TableHead className="text-center">Crecimiento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userStats.map((stat) => (
                      <TableRow key={stat.metric} className="bb-table-row">
                        <TableCell className="font-medium">{stat.metric}</TableCell>
                        <TableCell className="text-center font-bold">{stat.thisMonth}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{stat.lastMonth}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            {stat.growth}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Global Stats Tab */}
          <TabsContent value="global">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bb-content-area">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">1,247</p>
                  <p className="text-sm text-muted-foreground">Total Usuarios</p>
                </CardContent>
              </Card>
              <Card className="bb-content-area">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">45</p>
                  <p className="text-sm text-muted-foreground">Ligas Totales</p>
                </CardContent>
              </Card>
              <Card className="bb-content-area">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">456</p>
                  <p className="text-sm text-muted-foreground">Equipos</p>
                </CardContent>
              </Card>
              <Card className="bb-content-area">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">2,891</p>
                  <p className="text-sm text-muted-foreground">Partidos Jugados</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bb-content-area">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Resumen Global
                  </CardTitle>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Generar Reporte Completo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Razas más populares</h4>
                    <ol className="space-y-1 text-sm">
                      <li>1. Humanos (23%)</li>
                      <li>2. Orcos (18%)</li>
                      <li>3. Elfos Silvanos (15%)</li>
                      <li>4. Enanos (12%)</li>
                      <li>5. Skaven (10%)</li>
                    </ol>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Ligas más activas</h4>
                    <ol className="space-y-1 text-sm">
                      <li>1. Liga Nacional 2024</li>
                      <li>2. Super Liga Pro</li>
                      <li>3. Torneo Relámpago</li>
                      <li>4. Liga Regional Norte</li>
                      <li>5. Copa Primavera</li>
                    </ol>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Estadísticas de partidos</h4>
                    <ul className="space-y-1 text-sm">
                      <li>Promedio TDs/partido: 3.2</li>
                      <li>Promedio bajas/partido: 2.1</li>
                      <li>% partidos con empate: 18%</li>
                      <li>Mayor goleada: 7-0</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminReports;
