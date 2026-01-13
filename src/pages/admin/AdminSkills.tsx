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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Zap,
  Shield,
  Target,
  Move,
  Brain,
  Dumbbell,
} from "lucide-react";

const AdminSkills = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const skills = [
    {
      id: 1,
      name: "Bloqueador",
      category: "General",
      description:
        "Permite usar la tabla de Bloqueo sin modificadores negativos",
      effect: "Evita el resultado de Ambos Caen cuando placas",
      playerTypes: ["Blitzer", "Black Orc", "Wardancer"],
      active: true,
    },
    {
      id: 2,
      name: "Esquivar",
      category: "Agilidad",
      description: "Mejora las tiradas de esquiva",
      effect: "+1 a las tiradas de esquiva, puede repetir una esquiva fallida",
      playerTypes: ["Catcher", "Wardancer", "Elfo Lineman"],
      active: true,
    },
    {
      id: 3,
      name: "Pasar",
      category: "Pase",
      description: "Especialista en lanzamientos",
      effect: "Puede repetir una tirada de pase fallida por turno",
      playerTypes: ["Thrower"],
      active: true,
    },
    {
      id: 4,
      name: "Atrapar",
      category: "Agilidad",
      description: "Mejora las recepciones",
      effect: "Puede repetir una tirada de atrapar fallida",
      playerTypes: ["Catcher", "Thrower"],
      active: true,
    },
    {
      id: 5,
      name: "Golpear",
      category: "Fuerza",
      description: "Golpes más potentes",
      effect: "+1 a la tirada de armadura al placar",
      playerTypes: ["Black Orc", "Blitzer"],
      active: true,
    },
    {
      id: 6,
      name: "Regeneración",
      category: "Mutación",
      description: "Capacidad de recuperarse de lesiones",
      effect: "4+ para ignorar cualquier resultado de lesión",
      playerTypes: ["Troll", "Hombre Lobo"],
      active: true,
    },
    {
      id: 7,
      name: "Realmente Estúpido",
      category: "Extraordinaria",
      description: "El jugador es muy tonto",
      effect:
        "Debe pasar tirada de 4+ para actuar sin compañero cerca, o pierde la acción",
      playerTypes: ["Troll", "Ogro"],
      active: true,
    },
    {
      id: 8,
      name: "Manos Grandes",
      category: "Mutación",
      description: "Facilidad para recoger el balón",
      effect: "Ignora el modificador negativo por lluvia al recoger",
      playerTypes: ["Troll", "Ogro"],
      active: true,
    },
    {
      id: 9,
      name: "Saltar",
      category: "Agilidad",
      description: "Puede saltar sobre otros jugadores",
      effect: "Permite saltar 2 casillas, incluso sobre jugadores",
      playerTypes: ["Wardancer", "Saltador"],
      active: true,
    },
    {
      id: 10,
      name: "Leer la Defensa",
      category: "Pase",
      description: "Visión táctica superior",
      effect: "+1 a la tirada de pase cuando un receptor está marcado",
      playerTypes: ["Thrower"],
      active: true,
    },
    {
      id: 11,
      name: "Agresividad",
      category: "General",
      description: "Actitud agresiva en el campo",
      effect: "Puede repetir tiradas de Atacar Pila una vez por turno",
      playerTypes: ["Black Orc", "Troll"],
      active: false,
    },
    {
      id: 12,
      name: "Finta",
      category: "Agilidad",
      description: "Movimientos engañosos",
      effect: "El rival no puede usar habilidades de marcaje contra este jugador",
      playerTypes: ["Catcher"],
      active: true,
    },
  ];

  const categories = [
    "General",
    "Agilidad",
    "Fuerza",
    "Pase",
    "Mutación",
    "Extraordinaria",
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || skill.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "General":
        return <Shield className="h-4 w-4" />;
      case "Agilidad":
        return <Move className="h-4 w-4" />;
      case "Fuerza":
        return <Dumbbell className="h-4 w-4" />;
      case "Pase":
        return <Target className="h-4 w-4" />;
      case "Mutación":
        return <Zap className="h-4 w-4" />;
      case "Extraordinaria":
        return <Brain className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "General":
        return "bg-blue-500";
      case "Agilidad":
        return "bg-green-500";
      case "Fuerza":
        return "bg-red-500";
      case "Pase":
        return "bg-yellow-500";
      case "Mutación":
        return "bg-purple-500";
      case "Extraordinaria":
        return "bg-orange-500";
      default:
        return "bg-secondary";
    }
  };

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
          <span className="text-foreground">Habilidades</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Habilidades</h1>
            <p className="text-muted-foreground">
              Gestiona las habilidades disponibles para los jugadores
            </p>
          </div>
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Habilidad
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Crear Habilidad</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre</Label>
                    <Input placeholder="Nombre de la habilidad" />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Input placeholder="Breve descripción" />
                </div>
                <div className="space-y-2">
                  <Label>Efecto</Label>
                  <Textarea placeholder="Efecto mecánico de la habilidad" />
                </div>
                <div className="space-y-2">
                  <Label>Tipos de jugador</Label>
                  <Input placeholder="Separados por comas" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="active" defaultChecked />
                  <Label htmlFor="active">Activa</Label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={() => setShowCreateModal(false)}>
                    Crear Habilidad
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => {
            const count = skills.filter((s) => s.category === category).length;
            return (
              <Card key={category}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium">
                    {category}
                  </CardTitle>
                  {getCategoryIcon(category)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar habilidades..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Habilidad</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Efecto</TableHead>
                  <TableHead>Tipos de Jugador</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSkills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {skill.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(skill.category)}>
                        <span className="flex items-center gap-1">
                          {getCategoryIcon(skill.category)}
                          {skill.category}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <span className="text-sm text-muted-foreground line-clamp-2">
                        {skill.effect}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {skill.playerTypes.slice(0, 2).map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                        {skill.playerTypes.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{skill.playerTypes.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={skill.active ? "default" : "secondary"}
                        className={skill.active ? "bg-green-500" : ""}
                      >
                        {skill.active ? "Activa" : "Inactiva"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedSkill(skill);
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
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Editar: {selectedSkill?.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input defaultValue={selectedSkill?.name} />
                </div>
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select defaultValue={selectedSkill?.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input defaultValue={selectedSkill?.description} />
              </div>
              <div className="space-y-2">
                <Label>Efecto</Label>
                <Textarea defaultValue={selectedSkill?.effect} />
              </div>
              <div className="space-y-2">
                <Label>Tipos de jugador</Label>
                <Input defaultValue={selectedSkill?.playerTypes?.join(", ")} />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="edit-active"
                  defaultChecked={selectedSkill?.active}
                />
                <Label htmlFor="edit-active">Activa</Label>
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

export default AdminSkills;
