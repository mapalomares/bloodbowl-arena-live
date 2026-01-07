import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trophy, Plus, Search, Eye, Edit, Trash2, RefreshCw, Users } from "lucide-react";

const AdminLeagues = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<any>(null);

  const leagues = [
    { id: "1", name: "Liga Nacional 2024", status: "active", commissioners: ["Juan García"], teams: 12, rounds: 11, startDate: "2024-01-15", endDate: "2024-06-30" },
    { id: "2", name: "Torneo Relámpago", status: "active", commissioners: ["María López"], teams: 8, rounds: 7, startDate: "2024-03-01", endDate: "2024-04-15" },
    { id: "3", name: "Liga Otoño 2023", status: "closed", commissioners: ["Pedro Sánchez"], teams: 16, rounds: 15, startDate: "2023-09-01", endDate: "2023-12-20" },
    { id: "4", name: "Campeonato Histórico", status: "historical", commissioners: ["Ana Martín"], teams: 10, rounds: 9, startDate: "2022-01-01", endDate: "2022-06-30" },
    { id: "5", name: "Super Liga Pro", status: "active", commissioners: ["Carlos Ruiz", "Luis Fernández"], teams: 20, rounds: 19, startDate: "2024-02-01", endDate: "2024-08-30" },
  ];

  const filteredLeagues = leagues.filter((league) => {
    const matchesStatus = statusFilter === "all" || league.status === statusFilter;
    const matchesSearch = league.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Activa</Badge>;
      case "closed":
        return <Badge className="bg-yellow-600">Cerrada</Badge>;
      case "historical":
        return <Badge variant="secondary">Histórica</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleChangeStatus = (league: any) => {
    setSelectedLeague(league);
    setShowStatusModal(true);
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
          <span className="text-foreground font-medium">Ligas</span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="bb-title text-primary">Gestión de Ligas</h1>
            <p className="text-muted-foreground text-center md:text-left">Administrar todas las ligas del sistema</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Liga
          </Button>
        </div>

        {/* Filters */}
        <Card className="bb-content-area mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar liga..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activas</SelectItem>
                  <SelectItem value="closed">Cerradas</SelectItem>
                  <SelectItem value="historical">Históricas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leagues Table */}
        <Card className="bb-content-area">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Ligas ({filteredLeagues.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Comisarios</TableHead>
                  <TableHead className="text-center">Equipos</TableHead>
                  <TableHead className="text-center">Jornadas</TableHead>
                  <TableHead>Fechas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeagues.map((league) => (
                  <TableRow key={league.id} className="bb-table-row">
                    <TableCell className="font-medium">{league.name}</TableCell>
                    <TableCell>{getStatusBadge(league.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{league.commissioners.join(", ")}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{league.teams}</TableCell>
                    <TableCell className="text-center">{league.rounds}</TableCell>
                    <TableCell className="text-sm">
                      {league.startDate} - {league.endDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/liga/${league.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/leagues/${league.id}/edit`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleChangeStatus(league)}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
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

      {/* Create League Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crear Nueva Liga</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre de la Liga</Label>
                <Input placeholder="Ej: Liga Nacional 2024" />
              </div>
              <div className="space-y-2">
                <Label>Reglamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bb2020">Blood Bowl 2020</SelectItem>
                    <SelectItem value="bb2016">Blood Bowl 2016</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea placeholder="Descripción de la liga..." />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Fecha Inicio</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Fecha Fin</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Nº de Jornadas</Label>
                <Input type="number" placeholder="11" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Comisarios</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar comisarios..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">Juan García</SelectItem>
                    <SelectItem value="user2">María López</SelectItem>
                    <SelectItem value="user3">Pedro Sánchez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Visibilidad</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Pública</SelectItem>
                    <SelectItem value="private">Privada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
            <Button onClick={() => setShowCreateModal(false)}>Crear Liga</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Status Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Estado de Liga</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Liga: <strong>{selectedLeague?.name}</strong></p>
            <p className="mb-4">Estado actual: {selectedLeague && getStatusBadge(selectedLeague.status)}</p>
            <div className="space-y-2">
              <Label>Nuevo Estado</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="closed">Cerrada</SelectItem>
                  <SelectItem value="historical">Histórica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusModal(false)}>Cancelar</Button>
            <Button onClick={() => setShowStatusModal(false)}>Cambiar Estado</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminLeagues;
