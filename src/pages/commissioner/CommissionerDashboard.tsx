import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import {
  Users,
  Calendar,
  Trophy,
  FileText,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  ArrowLeft
} from "lucide-react";

const CommissionerDashboard = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  
  const leagueInfo = {
    name: "VillaverdeBowl XXIII Edition",
    status: "En curso",
    currentRound: 4,
    totalRounds: 13,
    teamsCount: 14,
    pendingMatches: 3,
    pendingActs: 2,
    pendingValidations: 1
  };

  const quickActions = [
    { label: "Gestionar Equipos", icon: Users, path: `/comisario/${leagueId}/equipos`, count: leagueInfo.pendingValidations },
    { label: "Gestionar Jornadas", icon: Calendar, path: `/comisario/${leagueId}/jornadas`, count: leagueInfo.pendingMatches },
    { label: "Introducir Acta", icon: FileText, path: `/comisario/${leagueId}/acta`, count: leagueInfo.pendingActs },
    { label: "Configurar Playoffs", icon: Trophy, path: `/comisario/${leagueId}/playoffs`, count: 0 },
    { label: "Configuración Liga", icon: Settings, path: `/comisario/${leagueId}/configuracion`, count: 0 },
  ];

  const recentActivity = [
    { type: "acta", message: "Acta registrada: Los Destructores 2 - 1 Elfos del Norte", time: "Hace 2 horas", status: "success" },
    { type: "equipo", message: "Nuevo equipo pendiente de validación: Chaos Warriors", time: "Hace 5 horas", status: "warning" },
    { type: "partido", message: "Partido programado: Jornada 5 - Ronda de desempate", time: "Hace 1 día", status: "info" },
    { type: "acta", message: "Acta pendiente de revisión: Orcos vs Enanos", time: "Hace 2 días", status: "warning" },
  ];

  const pendingMatches = [
    { id: 1, local: "Almadén Pascasios", visitor: "Varangus komodoranus", round: 4, deadline: "09/11/2025" },
    { id: 2, local: "Tomb Kings", visitor: "Farrar Sona", round: 4, deadline: "09/11/2025" },
    { id: 3, local: "Peñafrita's Herd", visitor: "Bacterias fecales", round: 4, deadline: "09/11/2025" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => navigate(`/liga/${leagueId}`)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la Liga
          </Button>

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                Panel de Comisario
              </h1>
              <p className="text-muted-foreground">{leagueInfo.name}</p>
            </div>
            <Badge variant={leagueInfo.status === "En curso" ? "default" : "secondary"} className="text-sm px-3 py-1">
              {leagueInfo.status}
            </Badge>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{leagueInfo.currentRound}/{leagueInfo.totalRounds}</p>
                <p className="text-sm text-muted-foreground">Jornada Actual</p>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{leagueInfo.teamsCount}</p>
                <p className="text-sm text-muted-foreground">Equipos</p>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <Clock className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                <p className="text-2xl font-bold">{leagueInfo.pendingMatches}</p>
                <p className="text-sm text-muted-foreground">Partidos Pendientes</p>
              </CardContent>
            </Card>
            <Card className="bb-content-area">
              <CardContent className="pt-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <p className="text-2xl font-bold">{leagueInfo.pendingActs}</p>
                <p className="text-sm text-muted-foreground">Actas Pendientes</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-between h-auto py-3"
                      onClick={() => navigate(action.path)}
                    >
                      <span className="flex items-center gap-2">
                        <action.icon className="h-4 w-4" />
                        {action.label}
                      </span>
                      {action.count > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {action.count}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pending Matches */}
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Partidos Pendientes de Acta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingMatches.map((match) => (
                      <div
                        key={match.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div>
                          <p className="font-medium">{match.local} vs {match.visitor}</p>
                          <p className="text-sm text-muted-foreground">Jornada {match.round} • Límite: {match.deadline}</p>
                        </div>
                        <Button size="sm" onClick={() => navigate(`/comisario/${leagueId}/acta?partido=${match.id}`)}>
                          Introducir Acta
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        {activity.status === "success" && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                        {activity.status === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                        {activity.status === "info" && <Shield className="h-5 w-5 text-blue-500 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
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

export default CommissionerDashboard;
