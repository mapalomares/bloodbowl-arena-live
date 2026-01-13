import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Shield,
  Swords,
  Heart,
} from "lucide-react";

const AdminPlayerTypes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedType, setSelectedType] = useState<any>(null);

  const playerTypes = [
    {
      id: 1,
      name: "Lineman",
      description: "Jugador básico de línea, versátil y económico",
      cost: 50000,
      ma: 6,
      st: 3,
      ag: 3,
      pa: 4,
      av: 8,
      skills: ["Ninguna"],
      maxQuantity: 16,
      races: ["Humanos", "Orcos", "Elfos"],
      active: true,
    },
    {
      id: 2,
      name: "Blitzer",
      description: "Jugador ofensivo especializado en placajes",
      cost: 90000,
      ma: 7,
      st: 3,
      ag: 3,
      pa: 4,
      av: 9,
      skills: ["Bloqueador"],
      maxQuantity: 4,
      races: ["Humanos", "Orcos"],
      active: true,
    },
    {
      id: 3,
      name: "Thrower",
      description: "Especialista en pases y lanzamientos",
      cost: 80000,
      ma: 6,
      st: 3,
      ag: 3,
      pa: 2,
      av: 8,
      skills: ["Pasar", "Leer la Defensa"],
      maxQuantity: 2,
      races: ["Humanos", "Elfos Altos"],
      active: true,
    },
    {
      id: 4,
      name: "Catcher",
      description: "Receptor ágil y veloz",
      cost: 70000,
      ma: 8,
      st: 2,
      ag: 2,
      pa: 5,
      av: 7,
      skills: ["Atrapar", "Esquivar"],
      maxQuantity: 4,
      races: ["Humanos", "Elfos"],
      active: true,
    },
    {
      id: 5,
      name: "Black Orc",
      description: "Orco negro, poderoso y lento",
      cost: 90000,
      ma: 4,
      st: 4,
      ag: 4,
      pa: 6,
      av: 10,
      skills: ["Agresividad", "Golpear"],
      maxQuantity: 6,
      races: ["Orcos"],
      active: true,
    },
    {
      id: 6,
      name: "Troll",
      description: "Gran monstruo con regeneración",
      cost: 115000,
      ma: 4,
      st: 5,
      ag: 5,
      pa: 5,
      av: 10,
      skills: ["Manos Grandes", "Regeneración", "Realmente Estúpido"],
      maxQuantity: 1,
      races: ["Orcos", "Goblins"],
      active: true,
    },
    {
      id: 7,
      name: "Wardancer",
      description: "Bailarín de guerra élfico, extremadamente ágil",
      cost: 125000,
      ma: 8,
      st: 3,
      ag: 1,
      pa: 4,
      av: 8,
      skills: ["Bloqueador", "Esquivar", "Saltar"],
      maxQuantity: 2,
      races: ["Elfos Silvanos"],
      active: false,
    },
  ];

  const filteredTypes = playerTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTypes = playerTypes.filter((t) => t.active).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Admin
          </Button>
          <span>/</span>
          <span className="text-foreground">Tipos de Jugador</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Tipos de Jugador
            </h1>
            <p className="text-muted-foreground">
              Gestiona los tipos de jugadores disponibles en el sistema
            </p>
          </div>
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Tipo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Crear Tipo de Jugador</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre</Label>
                    <Input placeholder="Nombre del tipo" />
                  </div>
                  <div className="space-y-2">
                    <Label>Coste</Label>
                    <Input type="number" placeholder="50000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea placeholder="Descripción del tipo de jugador" />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <div className="space-y-2">
                    <Label>MA</Label>
                    <Input type="number" placeholder="6" />
                  </div>
                  <div className="space-y-2">
                    <Label>ST</Label>
                    <Input type="number" placeholder="3" />
                  </div>
                  <div className="space-y-2">
                    <Label>AG</Label>
                    <Input type="number" placeholder="3" />
                  </div>
                  <div className="space-y-2">
                    <Label>PA</Label>
                    <Input type="number" placeholder="4" />
                  </div>
                  <div className="space-y-2">
                    <Label>AV</Label>
                    <Input type="number" placeholder="8" />
                  </div>
                  <div className="space-y-2">
                    <Label>Máx</Label>
                    <Input type="number" placeholder="16" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Habilidades iniciales</Label>
                  <Input placeholder="Separadas por comas" />
                </div>
                <div className="space-y-2">
                  <Label>Razas disponibles</Label>
                  <Input placeholder="Separadas por comas" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="active" defaultChecked />
                  <Label htmlFor="active">Activo</Label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={() => setShowCreateModal(false)}>
                    Crear Tipo
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tipos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{playerTypes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeTypes}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
              <Swords className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">
                {playerTypes.length - activeTypes}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Coste Medio</CardTitle>
              <Heart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  playerTypes.reduce((acc, t) => acc + t.cost, 0) /
                    playerTypes.length
                ).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar tipos de jugador..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Coste</TableHead>
                  <TableHead className="text-center">MA</TableHead>
                  <TableHead className="text-center">ST</TableHead>
                  <TableHead className="text-center">AG</TableHead>
                  <TableHead className="text-center">PA</TableHead>
                  <TableHead className="text-center">AV</TableHead>
                  <TableHead className="text-center">Máx</TableHead>
                  <TableHead>Habilidades</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {type.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{type.cost.toLocaleString()}</TableCell>
                    <TableCell className="text-center">{type.ma}</TableCell>
                    <TableCell className="text-center">{type.st}</TableCell>
                    <TableCell className="text-center">{type.ag}+</TableCell>
                    <TableCell className="text-center">{type.pa}+</TableCell>
                    <TableCell className="text-center">{type.av}+</TableCell>
                    <TableCell className="text-center">
                      {type.maxQuantity}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {type.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {type.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{type.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={type.active ? "default" : "secondary"}
                        className={type.active ? "bg-green-500" : ""}
                      >
                        {type.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedType(type);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Tipo: {selectedType?.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input defaultValue={selectedType?.name} />
                </div>
                <div className="space-y-2">
                  <Label>Coste</Label>
                  <Input type="number" defaultValue={selectedType?.cost} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea defaultValue={selectedType?.description} />
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="space-y-2">
                  <Label>MA</Label>
                  <Input type="number" defaultValue={selectedType?.ma} />
                </div>
                <div className="space-y-2">
                  <Label>ST</Label>
                  <Input type="number" defaultValue={selectedType?.st} />
                </div>
                <div className="space-y-2">
                  <Label>AG</Label>
                  <Input type="number" defaultValue={selectedType?.ag} />
                </div>
                <div className="space-y-2">
                  <Label>PA</Label>
                  <Input type="number" defaultValue={selectedType?.pa} />
                </div>
                <div className="space-y-2">
                  <Label>AV</Label>
                  <Input type="number" defaultValue={selectedType?.av} />
                </div>
                <div className="space-y-2">
                  <Label>Máx</Label>
                  <Input type="number" defaultValue={selectedType?.maxQuantity} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Habilidades iniciales</Label>
                <Input defaultValue={selectedType?.skills?.join(", ")} />
              </div>
              <div className="space-y-2">
                <Label>Razas disponibles</Label>
                <Input defaultValue={selectedType?.races?.join(", ")} />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="edit-active" defaultChecked={selectedType?.active} />
                <Label htmlFor="edit-active">Activo</Label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={() => setShowEditModal(false)}>
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPlayerTypes;
