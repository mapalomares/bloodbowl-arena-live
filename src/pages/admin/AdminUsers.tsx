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
import { Users, Search, Eye, Edit, UserX, Shield, UserCog } from "lucide-react";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    { id: "1", email: "juan@example.com", name: "Juan García", role: "admin", status: "active", registeredAt: "2023-01-15", teams: 3 },
    { id: "2", email: "maria@example.com", name: "María López", role: "commissioner", status: "active", registeredAt: "2023-03-20", teams: 2 },
    { id: "3", email: "pedro@example.com", name: "Pedro Sánchez", role: "coach", status: "active", registeredAt: "2023-05-10", teams: 5 },
    { id: "4", email: "ana@example.com", name: "Ana Martín", role: "coach", status: "inactive", registeredAt: "2023-06-01", teams: 1 },
    { id: "5", email: "carlos@example.com", name: "Carlos Ruiz", role: "commissioner", status: "active", registeredAt: "2023-07-15", teams: 4 },
    { id: "6", email: "luis@example.com", name: "Luis Fernández", role: "coach", status: "active", registeredAt: "2023-08-20", teams: 2 },
    { id: "7", email: "eva@example.com", name: "Eva González", role: "coach", status: "active", registeredAt: "2023-09-01", teams: 1 },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-600">Administrador</Badge>;
      case "commissioner":
        return <Badge className="bg-blue-600">Comisario</Badge>;
      case "coach":
        return <Badge variant="secondary">Entrenador</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge className="bg-green-600">Activo</Badge>
      : <Badge variant="destructive">Inactivo</Badge>;
  };

  const handleChangeRole = (user: any) => {
    setSelectedUser(user);
    setShowRoleModal(true);
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
          <span className="text-foreground font-medium">Usuarios</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="bb-title text-primary">Gestión de Usuarios</h1>
          <p className="text-muted-foreground text-center">Administrar usuarios y roles del sistema</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total Usuarios</p>
            </CardContent>
          </Card>
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === "admin").length}</p>
              <p className="text-sm text-muted-foreground">Administradores</p>
            </CardContent>
          </Card>
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === "commissioner").length}</p>
              <p className="text-sm text-muted-foreground">Comisarios</p>
            </CardContent>
          </Card>
          <Card className="bb-content-area">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === "active").length}</p>
              <p className="text-sm text-muted-foreground">Usuarios Activos</p>
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
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="commissioner">Comisario</SelectItem>
                  <SelectItem value="coach">Entrenador</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bb-content-area">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuarios ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-center">Equipos</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="bb-table-row">
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-center">{user.teams}</TableCell>
                    <TableCell className="text-sm">{user.registeredAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Ver perfil">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleChangeRole(user)} title="Cambiar rol">
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" title="Desactivar">
                          <UserX className="h-4 w-4" />
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

      {/* Change Role Modal */}
      <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Cambiar Rol de Usuario
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Usuario: <strong>{selectedUser?.name}</strong></p>
            <p className="mb-4">Email: {selectedUser?.email}</p>
            <p className="mb-4">Rol actual: {selectedUser && getRoleBadge(selectedUser.role)}</p>
            <div className="space-y-2">
              <Label>Nuevo Rol</Label>
              <Select defaultValue={selectedUser?.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="commissioner">Comisario</SelectItem>
                  <SelectItem value="coach">Entrenador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleModal(false)}>Cancelar</Button>
            <Button onClick={() => setShowRoleModal(false)}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminUsers;
