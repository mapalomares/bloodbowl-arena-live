import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Server, Database, Download, Trash2, RefreshCw, FileText, 
  Lock, AlertTriangle, CheckCircle, Clock, Search, Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminMaintenance = () => {
  const navigate = useNavigate();
  const { section = "cache" } = useParams();
  const { toast } = useToast();
  const [logFilter, setLogFilter] = useState("all");
  const [logSearch, setLogSearch] = useState("");

  const cacheItems = [
    { name: "Caché General", size: "45 MB", lastCleared: "Hace 3 días", items: 1250 },
    { name: "Caché de Foros", size: "12 MB", lastCleared: "Hace 1 día", items: 340 },
    { name: "Caché de Sesiones", size: "8 MB", lastCleared: "Hace 5 horas", items: 89 },
    { name: "Caché de Imágenes", size: "120 MB", lastCleared: "Hace 1 semana", items: 2340 },
  ];

  const backups = [
    { id: "1", date: "2024-01-15 03:00", size: "234 MB", type: "auto", status: "completed" },
    { id: "2", date: "2024-01-14 03:00", size: "232 MB", type: "auto", status: "completed" },
    { id: "3", date: "2024-01-13 15:30", size: "231 MB", type: "manual", status: "completed" },
    { id: "4", date: "2024-01-12 03:00", size: "228 MB", type: "auto", status: "completed" },
    { id: "5", date: "2024-01-11 03:00", size: "225 MB", type: "auto", status: "failed" },
  ];

  const logs = [
    { id: "1", type: "error", message: "Error de conexión a base de datos", user: "Sistema", date: "2024-01-15 14:32:15" },
    { id: "2", type: "warning", message: "Alta carga de CPU detectada (85%)", user: "Sistema", date: "2024-01-15 14:25:00" },
    { id: "3", type: "info", message: "Usuario juan@example.com inició sesión", user: "juan@example.com", date: "2024-01-15 14:20:00" },
    { id: "4", type: "info", message: "Backup automático completado", user: "Sistema", date: "2024-01-15 03:00:00" },
    { id: "5", type: "warning", message: "Intento de acceso fallido", user: "unknown@spam.com", date: "2024-01-14 22:15:00" },
    { id: "6", type: "error", message: "Timeout en API externa", user: "Sistema", date: "2024-01-14 18:45:00" },
    { id: "7", type: "info", message: "Nueva liga creada: Torneo Primavera", user: "maria@example.com", date: "2024-01-14 16:30:00" },
  ];

  const activeSessions = [
    { id: "1", user: "juan@example.com", ip: "192.168.1.100", device: "Chrome / Windows", started: "Hace 2 horas", lastActivity: "Hace 5 min" },
    { id: "2", user: "maria@example.com", ip: "10.0.0.50", device: "Safari / MacOS", started: "Hace 1 hora", lastActivity: "Hace 2 min" },
    { id: "3", user: "pedro@example.com", ip: "172.16.0.25", device: "Firefox / Linux", started: "Hace 30 min", lastActivity: "Activo ahora" },
  ];

  const failedAttempts = [
    { id: "1", email: "hacker@spam.com", ip: "45.33.12.100", attempts: 5, lastAttempt: "Hace 10 min", blocked: true },
    { id: "2", email: "unknown@test.com", ip: "89.100.45.200", attempts: 3, lastAttempt: "Hace 1 hora", blocked: false },
  ];

  const getLogIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesType = logFilter === "all" || log.type === logFilter;
    const matchesSearch = log.message.toLowerCase().includes(logSearch.toLowerCase()) ||
                         log.user.toLowerCase().includes(logSearch.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleClearCache = (name: string) => {
    toast({
      title: "Caché limpiada",
      description: `${name} ha sido limpiada correctamente`,
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup iniciado",
      description: "El proceso de backup ha comenzado. Puede tardar unos minutos.",
    });
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
          <span className="text-foreground font-medium">Mantenimiento</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="bb-title text-primary">Mantenimiento del Sistema</h1>
          <p className="text-muted-foreground text-center">Caché, backups, logs y seguridad</p>
        </div>

        <Tabs defaultValue={section} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cache" onClick={() => navigate("/admin/maintenance/cache")} className="gap-2">
              <Database className="h-4 w-4" />
              Caché
            </TabsTrigger>
            <TabsTrigger value="backups" onClick={() => navigate("/admin/maintenance/backups")} className="gap-2">
              <Download className="h-4 w-4" />
              Backups
            </TabsTrigger>
            <TabsTrigger value="logs" onClick={() => navigate("/admin/maintenance/logs")} className="gap-2">
              <FileText className="h-4 w-4" />
              Logs
            </TabsTrigger>
            <TabsTrigger value="security" onClick={() => navigate("/admin/maintenance/security")} className="gap-2">
              <Lock className="h-4 w-4" />
              Seguridad
            </TabsTrigger>
          </TabsList>

          {/* Cache Tab */}
          <TabsContent value="cache">
            <Card className="bb-content-area">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Gestión de Caché
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cacheItems.map((cache) => (
                  <div key={cache.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{cache.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {cache.size} • {cache.items} elementos • Limpiado {cache.lastCleared}
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => handleClearCache(cache.name)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Limpiar
                    </Button>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Button className="w-full" onClick={() => handleClearCache("Todo el caché")}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Limpiar Todo el Caché
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backups Tab */}
          <TabsContent value="backups">
            <Card className="bb-content-area">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Copias de Seguridad
                  </CardTitle>
                  <Button onClick={handleBackup}>
                    <Server className="h-4 w-4 mr-2" />
                    Realizar Backup
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tamaño</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map((backup) => (
                      <TableRow key={backup.id} className="bb-table-row">
                        <TableCell className="font-medium">{backup.date}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          <Badge variant={backup.type === "auto" ? "secondary" : "outline"}>
                            {backup.type === "auto" ? "Automático" : "Manual"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {backup.status === "completed" ? (
                            <Badge className="bg-green-600">Completado</Badge>
                          ) : (
                            <Badge variant="destructive">Fallido</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" disabled={backup.status === "failed"}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled={backup.status === "failed"}>
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
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs">
            <Card className="bb-content-area">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Logs del Sistema
                  </CardTitle>
                  <div className="flex gap-2">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar..."
                        value={logSearch}
                        onChange={(e) => setLogSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={logFilter} onValueChange={setLogFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="error">Errores</SelectItem>
                        <SelectItem value="warning">Advertencias</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      {getLogIcon(log.type)}
                      <div className="flex-1">
                        <p className="text-sm">{log.message}</p>
                        <p className="text-xs text-muted-foreground">{log.user} • {log.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Sesiones Activas ({activeSessions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>Dispositivo</TableHead>
                        <TableHead>Iniciada</TableHead>
                        <TableHead>Última Actividad</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeSessions.map((session) => (
                        <TableRow key={session.id} className="bb-table-row">
                          <TableCell className="font-medium">{session.user}</TableCell>
                          <TableCell className="font-mono text-sm">{session.ip}</TableCell>
                          <TableCell>{session.device}</TableCell>
                          <TableCell>{session.started}</TableCell>
                          <TableCell>{session.lastActivity}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Revocar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Intentos de Acceso Fallidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead className="text-center">Intentos</TableHead>
                        <TableHead>Último Intento</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {failedAttempts.map((attempt) => (
                        <TableRow key={attempt.id} className="bb-table-row">
                          <TableCell className="font-medium">{attempt.email}</TableCell>
                          <TableCell className="font-mono text-sm">{attempt.ip}</TableCell>
                          <TableCell className="text-center text-destructive font-bold">{attempt.attempts}</TableCell>
                          <TableCell>{attempt.lastAttempt}</TableCell>
                          <TableCell>
                            {attempt.blocked ? (
                              <Badge variant="destructive">Bloqueado</Badge>
                            ) : (
                              <Badge variant="secondary">Activo</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {!attempt.blocked && (
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  Bloquear
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminMaintenance;
