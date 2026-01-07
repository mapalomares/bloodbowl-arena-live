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
import { Gift, Plus, Search, Copy, Trash2, Power, PowerOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminBonuses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const bonuses = [
    { id: "1", code: "WELCOME2024", type: "credits", value: 100, maxUses: 100, used: 45, expiresAt: "2024-12-31", status: "active" },
    { id: "2", code: "NEWYEAR50", type: "discount", value: 50, maxUses: 50, used: 50, expiresAt: "2024-01-31", status: "expired" },
    { id: "3", code: "PREMIUM30", type: "credits", value: 30, maxUses: 200, used: 89, expiresAt: "2024-06-30", status: "active" },
    { id: "4", code: "SPECIAL100", type: "credits", value: 100, maxUses: 20, used: 20, expiresAt: "2024-03-15", status: "used" },
    { id: "5", code: "SUMMER2024", type: "discount", value: 25, maxUses: 500, used: 123, expiresAt: "2024-08-31", status: "active" },
    { id: "6", code: "BETA_TESTER", type: "premium", value: 1, maxUses: 10, used: 8, expiresAt: "2025-12-31", status: "active" },
  ];

  const filteredBonuses = bonuses.filter((bonus) => {
    const matchesStatus = statusFilter === "all" || bonus.status === statusFilter;
    const matchesSearch = bonus.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Activo</Badge>;
      case "expired":
        return <Badge variant="secondary">Expirado</Badge>;
      case "used":
        return <Badge className="bg-yellow-600">Agotado</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactivo</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "credits":
        return <Badge variant="outline">Créditos</Badge>;
      case "discount":
        return <Badge variant="outline" className="border-blue-500 text-blue-600">Descuento %</Badge>;
      case "premium":
        return <Badge variant="outline" className="border-purple-500 text-purple-600">Premium</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado",
      description: `El código ${code} ha sido copiado al portapapeles`,
    });
  };

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 10; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
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
          <span className="text-foreground font-medium">Bonificaciones</span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="bb-title text-primary">Gestión de Bonificaciones</h1>
            <p className="text-muted-foreground text-center md:text-left">Crear y administrar códigos promocionales</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Código
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{bonuses.length}</p>
              <p className="text-sm text-muted-foreground">Total Códigos</p>
            </CardContent>
          </Card>
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{bonuses.filter(b => b.status === "active").length}</p>
              <p className="text-sm text-muted-foreground">Activos</p>
            </CardContent>
          </Card>
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{bonuses.reduce((acc, b) => acc + b.used, 0)}</p>
              <p className="text-sm text-muted-foreground">Usos Totales</p>
            </CardContent>
          </Card>
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-muted-foreground">{bonuses.filter(b => b.status === "expired" || b.status === "used").length}</p>
              <p className="text-sm text-muted-foreground">Expirados/Agotados</p>
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
                  placeholder="Buscar código..."
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
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="expired">Expirados</SelectItem>
                  <SelectItem value="used">Agotados</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bonuses Table */}
        <Card className="bb-content-area">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Códigos de Bonificación ({filteredBonuses.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-center">Valor</TableHead>
                  <TableHead className="text-center">Usos</TableHead>
                  <TableHead>Expiración</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBonuses.map((bonus) => (
                  <TableRow key={bonus.id} className="bb-table-row">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-2 py-1 rounded font-mono text-sm">{bonus.code}</code>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyCode(bonus.code)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(bonus.type)}</TableCell>
                    <TableCell className="text-center font-medium">
                      {bonus.type === "discount" ? `${bonus.value}%` : bonus.value}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={bonus.used >= bonus.maxUses ? "text-destructive" : ""}>
                        {bonus.used} / {bonus.maxUses}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{bonus.expiresAt}</TableCell>
                    <TableCell>{getStatusBadge(bonus.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {bonus.status === "active" ? (
                          <Button variant="ghost" size="icon" title="Desactivar">
                            <PowerOff className="h-4 w-4" />
                          </Button>
                        ) : bonus.status === "inactive" ? (
                          <Button variant="ghost" size="icon" title="Activar">
                            <Power className="h-4 w-4" />
                          </Button>
                        ) : null}
                        <Button variant="ghost" size="icon" className="text-destructive" title="Eliminar">
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

      {/* Create Bonus Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Código de Bonificación</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Código</Label>
              <div className="flex gap-2">
                <Input placeholder="Ej: WELCOME2024" defaultValue={generateRandomCode()} />
                <Button variant="outline" type="button" onClick={() => {}}>Generar</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Bono</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credits">Créditos</SelectItem>
                    <SelectItem value="discount">Descuento %</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Valor</Label>
                <Input type="number" placeholder="100" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Uso Máximo</Label>
                <Input type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label>Fecha Expiración</Label>
                <Input type="date" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
            <Button onClick={() => setShowCreateModal(false)}>Crear Código</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminBonuses;
