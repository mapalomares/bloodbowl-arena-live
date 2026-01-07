import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Database, Search, Eye, Edit, Upload, RefreshCw, Users, Zap } from "lucide-react";

const AdminRaces = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [selectedRace, setSelectedRace] = useState<any>(null);

  const races = [
    { id: "1", name: "Humanos", description: "Equipo versátil y equilibrado", playerTypes: 6, icon: "👤", tier: 1 },
    { id: "2", name: "Orcos", description: "Fuertes y resistentes", playerTypes: 5, icon: "👹", tier: 1 },
    { id: "3", name: "Elfos Silvanos", description: "Ágiles y veloces", playerTypes: 6, icon: "🧝", tier: 1 },
    { id: "4", name: "Enanos", description: "Muy resistentes, lentos", playerTypes: 4, icon: "⛏️", tier: 2 },
    { id: "5", name: "Skaven", description: "Rápidos y numerosos", playerTypes: 5, icon: "🐀", tier: 1 },
    { id: "6", name: "No-Muertos", description: "Resistentes con regeneración", playerTypes: 5, icon: "💀", tier: 2 },
    { id: "7", name: "Chaos", description: "Fuertes mutantes", playerTypes: 4, icon: "👿", tier: 2 },
    { id: "8", name: "Nurgle", description: "Pesadilla putrefacta", playerTypes: 4, icon: "🦠", tier: 3 },
  ];

  const playerTypes = [
    { id: "1", race: "Humanos", name: "Liniero", mov: 6, str: 3, agi: 3, arm: 9, skills: "Ninguna", cost: 50 },
    { id: "2", race: "Humanos", name: "Blitzer", mov: 7, str: 3, agi: 3, arm: 9, skills: "Placaje", cost: 90 },
    { id: "3", race: "Humanos", name: "Lanzador", mov: 6, str: 3, agi: 3, arm: 9, skills: "Pase, Manos Seguras", cost: 70 },
    { id: "4", race: "Humanos", name: "Receptor", mov: 8, str: 2, agi: 3, arm: 8, skills: "Atrapar", cost: 70 },
    { id: "5", race: "Orcos", name: "Liniero", mov: 5, str: 3, agi: 3, arm: 10, skills: "Ninguna", cost: 50 },
    { id: "6", race: "Orcos", name: "Blitzer Negro", mov: 6, str: 4, agi: 3, arm: 10, skills: "Placaje", cost: 100 },
    { id: "7", race: "Orcos", name: "Troll", mov: 4, str: 5, agi: 1, arm: 10, skills: "Lanzar Compañero, Regeneración", cost: 110 },
  ];

  const skills = [
    { id: "1", name: "Placaje", group: "General", description: "Permite derribar jugadores más fácilmente" },
    { id: "2", name: "Esquivar", group: "Agilidad", description: "Mejora la esquiva y evita placajes" },
    { id: "3", name: "Bloquear", group: "Fuerza", description: "Reduce el riesgo al bloquear" },
    { id: "4", name: "Pase", group: "Pase", description: "Mejora la precisión de los pases" },
    { id: "5", name: "Atrapar", group: "Agilidad", description: "Mejora la recepción de pases" },
    { id: "6", name: "Regeneración", group: "Mutación", description: "Permite recuperarse de lesiones" },
    { id: "7", name: "Furia", group: "General", description: "Permite seguir bloqueando tras empujar" },
    { id: "8", name: "Pro", group: "General", description: "Permite repetir un dado una vez por turno" },
  ];

  const filteredRaces = races.filter((race) =>
    race.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <span className="text-foreground font-medium">Datos Base</span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="bb-title text-primary">Gestión de Datos Base</h1>
            <p className="text-muted-foreground text-center md:text-left">Razas, tipos de jugador y habilidades</p>
          </div>
          <Button onClick={() => setShowSyncModal(true)} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sincronizar Datos
          </Button>
        </div>

        <Tabs defaultValue="races" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="races" className="gap-2">
              <Database className="h-4 w-4" />
              Razas
            </TabsTrigger>
            <TabsTrigger value="players" className="gap-2">
              <Users className="h-4 w-4" />
              Tipos de Jugador
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Zap className="h-4 w-4" />
              Habilidades
            </TabsTrigger>
          </TabsList>

          {/* Races Tab */}
          <TabsContent value="races">
            <Card className="bb-content-area">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Razas de Blood Bowl
                  </CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar raza..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Icono</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead className="text-center">Tipos de Jugador</TableHead>
                      <TableHead className="text-center">Tier</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRaces.map((race) => (
                      <TableRow key={race.id} className="bb-table-row">
                        <TableCell className="text-2xl">{race.icon}</TableCell>
                        <TableCell className="font-medium">{race.name}</TableCell>
                        <TableCell className="text-muted-foreground">{race.description}</TableCell>
                        <TableCell className="text-center">{race.playerTypes}</TableCell>
                        <TableCell className="text-center">Tier {race.tier}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setSelectedRace(race)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Player Types Tab */}
          <TabsContent value="players">
            <Card className="bb-content-area">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Tipos de Jugador (Posiciones)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Raza</TableHead>
                      <TableHead>Posición</TableHead>
                      <TableHead className="text-center">MOV</TableHead>
                      <TableHead className="text-center">FUE</TableHead>
                      <TableHead className="text-center">AGI</TableHead>
                      <TableHead className="text-center">ARM</TableHead>
                      <TableHead>Habilidades</TableHead>
                      <TableHead className="text-right">Coste</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {playerTypes.map((player) => (
                      <TableRow key={player.id} className="bb-table-row">
                        <TableCell className="font-medium">{player.race}</TableCell>
                        <TableCell>{player.name}</TableCell>
                        <TableCell className="text-center">{player.mov}</TableCell>
                        <TableCell className="text-center">{player.str}</TableCell>
                        <TableCell className="text-center">{player.agi}</TableCell>
                        <TableCell className="text-center">{player.arm}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{player.skills}</TableCell>
                        <TableCell className="text-right">{player.cost}K</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card className="bb-content-area">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Habilidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Grupo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skills.map((skill) => (
                      <TableRow key={skill.id} className="bb-table-row">
                        <TableCell className="font-medium">{skill.name}</TableCell>
                        <TableCell>{skill.group}</TableCell>
                        <TableCell className="text-muted-foreground">{skill.description}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Sync Modal */}
      <Dialog open={showSyncModal} onOpenChange={setShowSyncModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Sincronizar Datos Base
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              Esta acción actualizará todas las razas, tipos de jugador y habilidades
              con los datos más recientes del reglamento oficial.
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm">• Se actualizarán {races.length} razas</p>
              <p className="text-sm">• Se actualizarán {playerTypes.length} tipos de jugador</p>
              <p className="text-sm">• Se actualizarán {skills.length} habilidades</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSyncModal(false)}>Cancelar</Button>
            <Button onClick={() => setShowSyncModal(false)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Iniciar Sincronización
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminRaces;
