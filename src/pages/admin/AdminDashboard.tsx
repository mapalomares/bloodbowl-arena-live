import { useNavigate } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Trophy, Shield, Gamepad2, Settings, Database, 
  Gift, FileText, Activity, Server, Lock, Download
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Usuarios", value: "1,247", icon: Users, trend: "+12%" },
    { label: "Ligas Activas", value: "23", icon: Trophy, trend: "+3" },
    { label: "Equipos Registrados", value: "456", icon: Shield, trend: "+28" },
    { label: "Partidos Jugados", value: "2,891", icon: Gamepad2, trend: "+156" },
  ];

  const quickActions = [
    { label: "Gestión de Ligas", icon: Trophy, path: "/admin/leagues", description: "Crear, editar y gestionar ligas" },
    { label: "Gestión de Usuarios", icon: Users, path: "/admin/users", description: "Administrar usuarios y roles" },
    { label: "Gestión de Equipos", icon: Shield, path: "/admin/teams", description: "Ver y gestionar equipos" },
    { label: "Bonificaciones", icon: Gift, path: "/admin/bonuses", description: "Códigos promocionales" },
    { label: "Datos Base", icon: Database, path: "/admin/data/races", description: "Razas, habilidades, jugadores" },
    { label: "Mantenimiento", icon: Server, path: "/admin/maintenance/cache", description: "Cache, backups, logs" },
  ];

  const recentActivity = [
    { type: "user", message: "Nuevo usuario registrado: Carlos Martínez", time: "Hace 5 min", status: "info" },
    { type: "league", message: "Liga 'Torneo Primavera' creada", time: "Hace 1 hora", status: "success" },
    { type: "error", message: "Error de autenticación detectado", time: "Hace 2 horas", status: "error" },
    { type: "team", message: "Equipo 'Orcos Salvajes' inscrito en liga", time: "Hace 3 horas", status: "success" },
    { type: "backup", message: "Backup automático completado", time: "Hace 6 horas", status: "info" },
  ];

  const systemHealth = [
    { label: "Base de Datos", status: "ok", value: "45% uso" },
    { label: "Almacenamiento", status: "ok", value: "2.3 GB / 10 GB" },
    { label: "CPU", status: "warning", value: "72% uso" },
    { label: "Memoria", status: "ok", value: "1.2 GB / 4 GB" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
      case "ok":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-muted-foreground">
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/")}>Inicio</span>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Administración</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="bb-title text-primary mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground text-center">Gestión global del sistema bbleagues</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="bb-content-area">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.trend} este mes</p>
                  </div>
                  <stat.icon className="h-10 w-10 text-primary/50" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="bb-content-area">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Accesos Rápidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <Button
                      key={action.path}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-primary/10"
                      onClick={() => navigate(action.path)}
                    >
                      <div className="flex items-center gap-2">
                        <action.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{action.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground text-left">{action.description}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <div>
            <Card className="bb-content-area">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Estado del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemHealth.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.value}</span>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/admin/maintenance/logs")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bb-content-area mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`} />
                    <span className="text-sm">{activity.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="bb-content-area">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Lock className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Seguridad</p>
                  <p className="text-sm text-muted-foreground">23 sesiones activas</p>
                </div>
              </div>
              <Button variant="link" size="sm" className="mt-2 p-0" onClick={() => navigate("/admin/maintenance/security")}>
                Ver detalles →
              </Button>
            </CardContent>
          </Card>

          <Card className="bb-content-area">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Download className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Último Backup</p>
                  <p className="text-sm text-muted-foreground">Hace 6 horas - 234 MB</p>
                </div>
              </div>
              <Button variant="link" size="sm" className="mt-2 p-0" onClick={() => navigate("/admin/maintenance/backups")}>
                Gestionar backups →
              </Button>
            </CardContent>
          </Card>

          <Card className="bb-content-area">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Gift className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Códigos Activos</p>
                  <p className="text-sm text-muted-foreground">12 códigos de bonificación</p>
                </div>
              </div>
              <Button variant="link" size="sm" className="mt-2 p-0" onClick={() => navigate("/admin/bonuses")}>
                Ver códigos →
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
