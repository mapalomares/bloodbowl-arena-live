import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, Save, Settings, Trophy, Users, Calendar, FileText, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LeagueSettings = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // General
    name: "VillaverdeBowl XXIII Edition",
    description: "Liga de Blood Bowl con temática urbana. Edición 23 del torneo más prestigioso de la zona.",
    status: "en_curso",
    visibility: "publica",
    maxTeams: 16,
    
    // Rules
    edition: "bb2020",
    tiersEnabled: true,
    allowInducements: true,
    prayersEnabled: true,
    starPlayersAllowed: true,
    maxStarPlayers: 2,
    
    // Scoring
    winPoints: 3,
    drawPoints: 1,
    lossPoints: 0,
    tiebreaker1: "td_diff",
    tiebreaker2: "casualties",
    
    // Schedule
    roundDuration: 7,
    autoAdvance: false,
    allowPostponements: true,
    maxPostponements: 2,
    
    // Permissions
    coachesCanEditRoster: true,
    coachesCanSubmitActs: true,
    requireActValidation: true,
    notifyOnActSubmission: true,
  });

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios en la configuración de la liga se han guardado correctamente.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => navigate(`/comisario/${leagueId}`)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Panel
          </Button>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
              Configuración de Liga
            </h1>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="rules" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Reglas
              </TabsTrigger>
              <TabsTrigger value="scoring" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Puntuación
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendario
              </TabsTrigger>
              <TabsTrigger value="permissions" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Permisos
              </TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Información General</CardTitle>
                  <CardDescription>Datos básicos de la liga</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="name">Nombre de la Liga</Label>
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={settings.description}
                        onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Estado</Label>
                      <Select value={settings.status} onValueChange={(value) => setSettings({ ...settings, status: value })}>
                        <SelectTrigger id="status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inscripciones">Inscripciones Abiertas</SelectItem>
                          <SelectItem value="en_curso">En Curso</SelectItem>
                          <SelectItem value="playoffs">Playoffs</SelectItem>
                          <SelectItem value="finalizada">Finalizada</SelectItem>
                          <SelectItem value="cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="visibility">Visibilidad</Label>
                      <Select value={settings.visibility} onValueChange={(value) => setSettings({ ...settings, visibility: value })}>
                        <SelectTrigger id="visibility">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="publica">Pública</SelectItem>
                          <SelectItem value="privada">Privada</SelectItem>
                          <SelectItem value="oculta">Oculta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="maxTeams">Máximo de Equipos</Label>
                      <Input
                        id="maxTeams"
                        type="number"
                        min="2"
                        max="64"
                        value={settings.maxTeams}
                        onChange={(e) => setSettings({ ...settings, maxTeams: parseInt(e.target.value) || 16 })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rules Tab */}
            <TabsContent value="rules">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Reglas del Juego</CardTitle>
                  <CardDescription>Configuración de las reglas de Blood Bowl</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="edition">Edición de Blood Bowl</Label>
                    <Select value={settings.edition} onValueChange={(value) => setSettings({ ...settings, edition: value })}>
                      <SelectTrigger id="edition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bb2020">Blood Bowl 2020</SelectItem>
                        <SelectItem value="bb2016">Blood Bowl 2016</SelectItem>
                        <SelectItem value="lrb6">LRB6</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Sistema de Tiers</Label>
                        <p className="text-sm text-muted-foreground">Aplicar restricciones por tier de raza</p>
                      </div>
                      <Switch
                        checked={settings.tiersEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, tiersEnabled: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Inducciones</Label>
                        <p className="text-sm text-muted-foreground">Permitir inducciones por diferencia de valor</p>
                      </div>
                      <Switch
                        checked={settings.allowInducements}
                        onCheckedChange={(checked) => setSettings({ ...settings, allowInducements: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Plegarias</Label>
                        <p className="text-sm text-muted-foreground">Permitir plegarias a Nuffle</p>
                      </div>
                      <Switch
                        checked={settings.prayersEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, prayersEnabled: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Jugadores Estrella</Label>
                        <p className="text-sm text-muted-foreground">Permitir contratación de estrellas</p>
                      </div>
                      <Switch
                        checked={settings.starPlayersAllowed}
                        onCheckedChange={(checked) => setSettings({ ...settings, starPlayersAllowed: checked })}
                      />
                    </div>
                    {settings.starPlayersAllowed && (
                      <div className="pl-6">
                        <Label htmlFor="maxStars">Máximo de Estrellas por Partido</Label>
                        <Input
                          id="maxStars"
                          type="number"
                          min="1"
                          max="4"
                          value={settings.maxStarPlayers}
                          onChange={(e) => setSettings({ ...settings, maxStarPlayers: parseInt(e.target.value) || 2 })}
                          className="w-24"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scoring Tab */}
            <TabsContent value="scoring">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Sistema de Puntuación</CardTitle>
                  <CardDescription>Puntos y criterios de desempate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="winPoints">Puntos por Victoria</Label>
                      <Input
                        id="winPoints"
                        type="number"
                        min="0"
                        value={settings.winPoints}
                        onChange={(e) => setSettings({ ...settings, winPoints: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="drawPoints">Puntos por Empate</Label>
                      <Input
                        id="drawPoints"
                        type="number"
                        min="0"
                        value={settings.drawPoints}
                        onChange={(e) => setSettings({ ...settings, drawPoints: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lossPoints">Puntos por Derrota</Label>
                      <Input
                        id="lossPoints"
                        type="number"
                        min="0"
                        value={settings.lossPoints}
                        onChange={(e) => setSettings({ ...settings, lossPoints: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div>
                      <Label htmlFor="tiebreaker1">Primer Criterio de Desempate</Label>
                      <Select value={settings.tiebreaker1} onValueChange={(value) => setSettings({ ...settings, tiebreaker1: value })}>
                        <SelectTrigger id="tiebreaker1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="td_diff">Diferencia de Touchdowns</SelectItem>
                          <SelectItem value="td_scored">Touchdowns Anotados</SelectItem>
                          <SelectItem value="casualties">Bajas Causadas</SelectItem>
                          <SelectItem value="head_to_head">Enfrentamiento Directo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tiebreaker2">Segundo Criterio de Desempate</Label>
                      <Select value={settings.tiebreaker2} onValueChange={(value) => setSettings({ ...settings, tiebreaker2: value })}>
                        <SelectTrigger id="tiebreaker2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="td_diff">Diferencia de Touchdowns</SelectItem>
                          <SelectItem value="td_scored">Touchdowns Anotados</SelectItem>
                          <SelectItem value="casualties">Bajas Causadas</SelectItem>
                          <SelectItem value="head_to_head">Enfrentamiento Directo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Configuración de Calendario</CardTitle>
                  <CardDescription>Duración y gestión de jornadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="roundDuration">Duración de Jornada (días)</Label>
                    <Input
                      id="roundDuration"
                      type="number"
                      min="1"
                      max="30"
                      value={settings.roundDuration}
                      onChange={(e) => setSettings({ ...settings, roundDuration: parseInt(e.target.value) || 7 })}
                      className="w-24"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Avance Automático</Label>
                        <p className="text-sm text-muted-foreground">Avanzar automáticamente a la siguiente jornada al finalizar</p>
                      </div>
                      <Switch
                        checked={settings.autoAdvance}
                        onCheckedChange={(checked) => setSettings({ ...settings, autoAdvance: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Permitir Aplazamientos</Label>
                        <p className="text-sm text-muted-foreground">Permitir a los entrenadores solicitar aplazamientos</p>
                      </div>
                      <Switch
                        checked={settings.allowPostponements}
                        onCheckedChange={(checked) => setSettings({ ...settings, allowPostponements: checked })}
                      />
                    </div>
                    {settings.allowPostponements && (
                      <div className="pl-6">
                        <Label htmlFor="maxPostponements">Máximo de Aplazamientos por Equipo</Label>
                        <Input
                          id="maxPostponements"
                          type="number"
                          min="0"
                          max="10"
                          value={settings.maxPostponements}
                          onChange={(e) => setSettings({ ...settings, maxPostponements: parseInt(e.target.value) || 0 })}
                          className="w-24"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Permissions Tab */}
            <TabsContent value="permissions">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Permisos y Notificaciones</CardTitle>
                  <CardDescription>Control de acceso y alertas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Edición de Plantilla</Label>
                        <p className="text-sm text-muted-foreground">Permitir a los entrenadores editar sus plantillas</p>
                      </div>
                      <Switch
                        checked={settings.coachesCanEditRoster}
                        onCheckedChange={(checked) => setSettings({ ...settings, coachesCanEditRoster: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Envío de Actas</Label>
                        <p className="text-sm text-muted-foreground">Permitir a los entrenadores enviar actas de partido</p>
                      </div>
                      <Switch
                        checked={settings.coachesCanSubmitActs}
                        onCheckedChange={(checked) => setSettings({ ...settings, coachesCanSubmitActs: checked })}
                      />
                    </div>
                    {settings.coachesCanSubmitActs && (
                      <div className="flex items-center justify-between pl-6">
                        <div>
                          <Label className="text-base">Validación Requerida</Label>
                          <p className="text-sm text-muted-foreground">Las actas requieren aprobación del comisario</p>
                        </div>
                        <Switch
                          checked={settings.requireActValidation}
                          onCheckedChange={(checked) => setSettings({ ...settings, requireActValidation: checked })}
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Notificaciones de Actas</Label>
                        <p className="text-sm text-muted-foreground">Recibir notificación cuando se envíe un acta</p>
                      </div>
                      <Switch
                        checked={settings.notifyOnActSubmission}
                        onCheckedChange={(checked) => setSettings({ ...settings, notifyOnActSubmission: checked })}
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-2 text-destructive mb-2">
                        <AlertTriangle className="h-5 w-5" />
                        <Label className="text-base">Zona de Peligro</Label>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Estas acciones son irreversibles y afectan permanentemente a la liga.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                          Cerrar Inscripciones
                        </Button>
                        <Button variant="destructive">
                          Cancelar Liga
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LeagueSettings;
