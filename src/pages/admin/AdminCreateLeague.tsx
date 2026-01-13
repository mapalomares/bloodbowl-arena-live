import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Trophy,
  Settings,
  Users,
  Calendar,
  Shield,
} from "lucide-react";

const AdminCreateLeague = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    ruleset: "bb2020",
    description: "",
    maxTeams: 8,
    minTeams: 6,
    rounds: 14,
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    visibility: "public",
    allowSpectators: true,
    maxPlayersPerTeam: 16,
    startingBudget: 1000000,
    maxRerolls: 8,
    allowStarPlayers: true,
    allowInducedPlayers: true,
    commissioners: [] as string[],
  });

  const handleSubmit = () => {
    console.log("Creating league:", formData);
    navigate("/admin/leagues");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/leagues")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Ligas
          </Button>
          <span>/</span>
          <span className="text-foreground">Nueva Liga</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Crear Nueva Liga
            </h1>
            <p className="text-muted-foreground">
              Configura todos los parámetros de la nueva liga
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/leagues")}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Crear Liga
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Reglas
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Equipos
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendario
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la Liga *</Label>
                    <Input
                      id="name"
                      placeholder="Ej: Liga Premier Temporada 2024"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ruleset">Reglamento</Label>
                    <Select
                      value={formData.ruleset}
                      onValueChange={(value) =>
                        setFormData({ ...formData, ruleset: value })
                      }
                    >
                      <SelectTrigger id="ruleset">
                        <SelectValue />
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
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Descripción de la liga, normas especiales, etc."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="visibility">Visibilidad</Label>
                    <Select
                      value={formData.visibility}
                      onValueChange={(value) =>
                        setFormData({ ...formData, visibility: value })
                      }
                    >
                      <SelectTrigger id="visibility">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Pública</SelectItem>
                        <SelectItem value="private">Privada</SelectItem>
                        <SelectItem value="invite">Solo invitación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>Permitir Espectadores</Label>
                      <p className="text-sm text-muted-foreground">
                        Los usuarios no registrados pueden ver partidos
                      </p>
                    </div>
                    <Switch
                      checked={formData.allowSpectators}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, allowSpectators: checked })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Comisarios</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Usuarios que administrarán la liga
                  </p>
                  <Input placeholder="Buscar usuarios..." />
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      <Shield className="h-3 w-3" />
                      Admin Principal (tú)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Reglas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Presupuesto Inicial</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.startingBudget}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startingBudget: parseInt(e.target.value),
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Monedas de oro para crear equipos
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPlayers">Máx. Jugadores/Equipo</Label>
                    <Input
                      id="maxPlayers"
                      type="number"
                      value={formData.maxPlayersPerTeam}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxPlayersPerTeam: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxRerolls">Máx. Re-rolls</Label>
                    <Input
                      id="maxRerolls"
                      type="number"
                      value={formData.maxRerolls}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxRerolls: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>Permitir Star Players</Label>
                      <p className="text-sm text-muted-foreground">
                        Jugadores estrella pueden ser contratados
                      </p>
                    </div>
                    <Switch
                      checked={formData.allowStarPlayers}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, allowStarPlayers: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>Permitir Induced Players</Label>
                      <p className="text-sm text-muted-foreground">
                        Jugadores inducidos por diferencia de TV
                      </p>
                    </div>
                    <Switch
                      checked={formData.allowInducedPlayers}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          allowInducedPlayers: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Equipos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="minTeams">Mínimo de Equipos</Label>
                    <Input
                      id="minTeams"
                      type="number"
                      value={formData.minTeams}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minTeams: parseInt(e.target.value),
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Equipos necesarios para iniciar
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxTeams">Máximo de Equipos</Label>
                    <Input
                      id="maxTeams"
                      type="number"
                      value={formData.maxTeams}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxTeams: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Razas Permitidas</Label>
                  <p className="text-sm text-muted-foreground">
                    Por defecto todas las razas están permitidas. Puedes
                    restringir aquí.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      "Humanos",
                      "Orcos",
                      "Elfos Silvanos",
                      "Enanos",
                      "Skaven",
                      "Caos",
                      "No Muertos",
                      "Hombres Lagarto",
                    ].map((race) => (
                      <div
                        key={race}
                        className="flex items-center gap-2 p-2 border rounded"
                      >
                        <Switch defaultChecked />
                        <span className="text-sm">{race}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Calendario y Fechas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="regDeadline">Cierre de Inscripciones</Label>
                    <Input
                      id="regDeadline"
                      type="date"
                      value={formData.registrationDeadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registrationDeadline: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de Inicio</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Fecha de Fin (estimada)</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="rounds">Número de Jornadas</Label>
                  <Input
                    id="rounds"
                    type="number"
                    value={formData.rounds}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rounds: parseInt(e.target.value),
                      })
                    }
                    className="w-32"
                  />
                  <p className="text-xs text-muted-foreground">
                    Se recomienda (N-1)*2 jornadas para N equipos (ida y vuelta)
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Resumen del Calendario</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • {formData.rounds} jornadas de liga regular
                    </li>
                    <li>• Playoffs automáticos con los 4 mejores equipos</li>
                    <li>
                      • Duración estimada:{" "}
                      {formData.rounds > 0
                        ? `${Math.ceil(formData.rounds / 2)} semanas`
                        : "Por determinar"}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submit buttons at bottom */}
        <div className="flex justify-end gap-2 mt-8">
          <Button variant="outline" onClick={() => navigate("/admin/leagues")}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Crear Liga
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminCreateLeague;
