import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Users, Bell, Trophy, Calendar, FileText } from "lucide-react";

interface LeagueCommissionerProps {
  leagueId: string;
}

const LeagueCommissioner = ({ leagueId }: LeagueCommissionerProps) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("general");

  const commissioners = ["tirkha", "dr crosss", "devilstree"];

  const sections = [
    { id: "general", label: "General", icon: Settings },
    { id: "equipos", label: "Equipos", icon: Users },
    { id: "notificaciones", label: "Notificaciones", icon: Bell },
    { id: "playoffs", label: "Playoffs", icon: Trophy },
  ];

  return (
    <div className="bb-content-area">
      {/* Commissioner Navigation */}
      <div className="grid grid-cols-4 gap-1 mb-6" style={{ borderBottom: '2px solid hsl(var(--primary))' }}>
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`text-center py-3 font-bold flex items-center justify-center gap-2 ${
                activeSection === section.id
                  ? "bg-muted border-l-4 border-primary"
                  : "bg-background hover:bg-muted/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Button
          onClick={() => navigate(`/comisario/${leagueId}/acta`)}
          className="h-auto py-4 flex flex-col gap-2"
        >
          <FileText className="w-6 h-6" />
          <span>Nueva Acta</span>
        </Button>
        <Button
          onClick={() => navigate(`/comisario/${leagueId}/jornadas`)}
          variant="outline"
          className="h-auto py-4 flex flex-col gap-2"
        >
          <Calendar className="w-6 h-6" />
          <span>Gestionar Jornadas</span>
        </Button>
        <Button
          onClick={() => navigate(`/comisario/${leagueId}/equipos`)}
          variant="outline"
          className="h-auto py-4 flex flex-col gap-2"
        >
          <Users className="w-6 h-6" />
          <span>Gestionar Equipos</span>
        </Button>
      </div>

      {/* General Section */}
      {activeSection === "general" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-bold">Nombre de liga:</label>
              <Input defaultValue="XXIII Edition" />
            </div>
            <div>
              <label className="block mb-2 font-bold">Estado de la liga:</label>
              <select className="w-full p-2 border rounded bg-background">
                <option>En juego</option>
                <option>Terminada</option>
                <option>Inscripción</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">Comisarios:</label>
              <div className="space-y-2 bg-background p-3 rounded border">
                {commissioners.map((comm) => (
                  <div key={comm} className="flex items-center justify-between">
                    <span>{comm}</span>
                    <button className="text-destructive hover:underline text-sm">🗑️</button>
                  </div>
                ))}
                <a href="#" className="text-primary hover:underline text-sm block mt-2">
                  Añadir nuevo comisario
                </a>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-bold">Reglamento:</label>
              <select className="w-full p-2 border rounded bg-background">
                <option>Season 3 Glastheim</option>
                <option>Season 2</option>
                <option>Season 1</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">Sistema de puntuación:</label>
              <Input defaultValue="3x1x0" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-bold">Sistema de desempate:</label>
              <select className="w-full p-2 border rounded bg-background">
                <option>1=TDP-TDC+P-E en las partidas entre los +</option>
                <option>TDP-TDC</option>
                <option>Diferencia de touchdowns</option>
              </select>
              <select className="w-full p-2 border rounded bg-background mt-2">
                <option>2=TDP-TDC+P-E</option>
                <option>TDP total</option>
              </select>
              <select className="w-full p-2 border rounded bg-background mt-2">
                <option>3=P-E (que ligeros)</option>
                <option>Diferencia general</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">MVP sorteable:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="mvp" value="yes" defaultChecked />
                  Sí
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="mvp" value="no" />
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-bold">TR inicial:</label>
              <Input defaultValue="1000000" />
            </div>
            <div className="pt-4">
              <Button className="w-full">Guardar Cambios</Button>
            </div>
          </div>
        </div>
      )}

      {/* Teams Section */}
      {activeSection === "equipos" && (
        <div className="text-center py-8">
          <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h4 className="text-xl font-bold mb-2">Gestión de Equipos</h4>
          <p className="text-muted-foreground mb-4">
            Administra los equipos inscritos en la liga, aprueba solicitudes y gestiona bajas.
          </p>
          <Button onClick={() => navigate(`/comisario/${leagueId}/equipos`)}>
            Ir a Gestión de Equipos
          </Button>
        </div>
      )}

      {/* Notifications Section */}
      {activeSection === "notificaciones" && (
        <div className="space-y-4">
          <h4 className="text-xl font-bold">Centro de Notificaciones</h4>
          <div className="space-y-3">
            {[
              { type: "pending", message: "3 partidos pendientes de acta", time: "Hace 2 horas" },
              { type: "request", message: "Nueva solicitud de inscripción", time: "Hace 5 horas" },
              { type: "match", message: "Partido completado: Orcos vs Elfos", time: "Ayer" },
            ].map((notif, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded">
                <div>
                  <p className="font-bold">{notif.message}</p>
                  <p className="text-xs text-muted-foreground">{notif.time}</p>
                </div>
                <Button size="sm" variant="outline">Ver</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Playoffs Section */}
      {activeSection === "playoffs" && (
        <div className="text-center py-8">
          <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h4 className="text-xl font-bold mb-2">Configuración de Playoffs</h4>
          <p className="text-muted-foreground mb-4">
            Configura el formato de playoffs, equipos clasificados y emparejamientos.
          </p>
          <Button onClick={() => navigate(`/comisario/${leagueId}/playoffs`)}>
            Configurar Playoffs
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeagueCommissioner;
