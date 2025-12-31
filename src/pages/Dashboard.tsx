import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { 
  Trophy, 
  Users, 
  Calendar, 
  TrendingUp, 
  Bell,
  Settings,
  Shield,
  Swords
} from "lucide-react";

// Mock data
const userStats = {
  totalMatches: 47,
  activeTeams: 3,
  totalPlayers: 42,
  winRate: 68
};

const myTeams = [
  { id: 1, name: "Los Destructores", race: "Orcos", league: "Liga Nacional", status: "Activo", wins: 5, losses: 2 },
  { id: 2, name: "Elfos del Norte", race: "Elfos Silvanos", league: "Copa Regional", status: "Activo", wins: 3, losses: 1 },
  { id: 3, name: "Muertos Vivientes FC", race: "No Muertos", league: "Liga Nacional", status: "En espera", wins: 0, losses: 0 },
];

const upcomingMatches = [
  { id: 1, team: "Los Destructores", opponent: "Skaven United", date: "15 Ene 2025", time: "18:00", league: "Liga Nacional" },
  { id: 2, team: "Elfos del Norte", opponent: "Humanos del Sur", date: "18 Ene 2025", time: "20:00", league: "Copa Regional" },
];

const recentNews = [
  { id: 1, title: "Nueva jornada disponible", description: "Se ha publicado la jornada 8 de la Liga Nacional", date: "Hace 2 horas" },
  { id: 2, title: "Tu partido fue validado", description: "El acta del partido contra Skaven FC ha sido aprobada", date: "Hace 1 día" },
  { id: 3, title: "Recordatorio de partido", description: "Tienes un partido programado para mañana", date: "Hace 1 día" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      {/* User Bar */}
      <div className="bg-secondary border-b-2 border-primary py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              JD
            </div>
            <div>
              <p className="font-bold text-foreground">¡Bienvenido, Juan!</p>
              <p className="text-sm text-muted-foreground">Última conexión: Hoy, 14:30</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bb-content-area">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Swords className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.totalMatches}</p>
                    <p className="text-sm text-muted-foreground">Partidos Jugados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.activeTeams}</p>
                    <p className="text-sm text-muted-foreground">Equipos Activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.totalPlayers}</p>
                    <p className="text-sm text-muted-foreground">Jugadores en Plantilla</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.winRate}%</p>
                    <p className="text-sm text-muted-foreground">Ratio de Victoria</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* My Teams */}
            <div className="lg:col-span-2">
              <Card className="bb-content-area">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Mis Equipos
                  </CardTitle>
                  <Button onClick={() => navigate('/equipos')} variant="outline" size="sm">
                    Ver Todos
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myTeams.map((team) => (
                      <div 
                        key={team.id}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary cursor-pointer transition-colors"
                        onClick={() => navigate(`/equipo/${team.id}`)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold">{team.name}</p>
                            <p className="text-sm text-muted-foreground">{team.race} • {team.league}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            team.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {team.status}
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">
                            {team.wins}V - {team.losses}D
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Matches */}
              <Card className="bb-content-area mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Próximos Partidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMatches.map((match) => (
                      <div 
                        key={match.id}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                      >
                        <div>
                          <p className="font-bold">{match.team} vs {match.opponent}</p>
                          <p className="text-sm text-muted-foreground">{match.league}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{match.date}</p>
                          <p className="text-sm text-muted-foreground">{match.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/leagues')}>
                    <Trophy className="h-4 w-4 mr-2" />
                    Ver Ligas
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/equipos/nuevo')}>
                    <Shield className="h-4 w-4 mr-2" />
                    Crear Equipo
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/forums')}>
                    <Users className="h-4 w-4 mr-2" />
                    Foros
                  </Button>
                </CardContent>
              </Card>

              {/* Recent News */}
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Noticias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentNews.map((news) => (
                      <div key={news.id} className="border-b border-primary/20 pb-3 last:border-0 last:pb-0">
                        <p className="font-medium text-sm">{news.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{news.description}</p>
                        <p className="text-xs text-accent mt-1">{news.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
