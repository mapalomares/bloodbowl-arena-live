import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, Bell, Send, Users, Calendar, AlertTriangle, MessageSquare, CheckCircle, Clock, Inbox, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Team {
  id: number;
  name: string;
  coach: string;
}

interface Message {
  id: number;
  from: string;
  fromTeam?: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  type: "incoming" | "sent";
}

const ManageNotifications = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const { toast } = useToast();

  const [notificationType, setNotificationType] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [subject, setSubject] = useState("");

  const teams: Team[] = [
    { id: 1, name: "Los Destructores", coach: "coach_destructor" },
    { id: 2, name: "Elfos del Norte", coach: "coach_elfos" },
    { id: 3, name: "Chaos Warriors", coach: "coach_chaos" },
    { id: 4, name: "Undead Legion", coach: "coach_undead" },
    { id: 5, name: "Orcos del Norte", coach: "orcos_fc" },
    { id: 6, name: "Humanos Unidos", coach: "human_team" },
    { id: 7, name: "Skaven FC", coach: "skaven_master" },
    { id: 8, name: "Lizardmen", coach: "cold_blooded" },
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "coach_destructor", fromTeam: "Los Destructores", subject: "Solicitud de aplazamiento", preview: "Hola comisario, me gustaría solicitar un aplazamiento para el partido de la jornada 5...", date: "2024-10-25 14:30", read: false, type: "incoming" },
    { id: 2, from: "coach_chaos", fromTeam: "Chaos Warriors", subject: "Duda sobre reglas", preview: "Tengo una duda sobre la aplicación del reglamento en caso de...", date: "2024-10-24 18:15", read: true, type: "incoming" },
    { id: 3, from: "Comisario", subject: "Recordatorio Jornada 4", preview: "Recordad que la jornada 4 finaliza el próximo domingo...", date: "2024-10-23 10:00", read: true, type: "sent" },
    { id: 4, from: "orcos_fc", fromTeam: "Orcos del Norte", subject: "Problema con acta", preview: "Creo que hay un error en el acta del último partido...", date: "2024-10-22 09:45", read: true, type: "incoming" },
  ]);

  const notificationTypes = [
    { value: "reminder", label: "Recordatorio de partidos", icon: Calendar },
    { value: "schedule_change", label: "Cambio de programación", icon: AlertTriangle },
    { value: "result_rejected", label: "Resultado rechazado", icon: AlertTriangle },
    { value: "custom", label: "Mensaje personalizado", icon: MessageSquare },
  ];

  const handleSelectAll = () => {
    if (selectedTeams.length === teams.length) {
      setSelectedTeams([]);
    } else {
      setSelectedTeams(teams.map(t => t.id));
    }
  };

  const handleTeamToggle = (teamId: number) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSendNotification = () => {
    if (!notificationType || selectedTeams.length === 0) {
      toast({
        title: "Error",
        description: "Selecciona el tipo de notificación y al menos un equipo.",
        variant: "destructive"
      });
      return;
    }

    if (notificationType === "custom" && !customMessage.trim()) {
      toast({
        title: "Error",
        description: "Escribe un mensaje para el aviso personalizado.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Notificación enviada",
      description: `Se ha enviado la notificación a ${selectedTeams.length} equipo${selectedTeams.length > 1 ? "s" : ""}.`,
    });

    // Reset form
    setNotificationType("");
    setSelectedTeams([]);
    setCustomMessage("");
    setSubject("");
  };

  const handleMarkAsRead = (messageId: number) => {
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, read: true } : m
    ));
  };

  const unreadCount = messages.filter(m => !m.read && m.type === "incoming").length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" onClick={() => navigate(`/comisario/${leagueId}`)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Panel
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                Notificaciones y Mensajes
              </h1>
              <p className="text-muted-foreground mt-1">
                Comunícate con los entrenadores de la liga
              </p>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground gap-1">
                <Inbox className="h-4 w-4" />
                {unreadCount} sin leer
              </Badge>
            )}
          </div>

          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="send" className="gap-2">
                <Send className="h-4 w-4" />
                Enviar Avisos
              </TabsTrigger>
              <TabsTrigger value="inbox" className="gap-2">
                <Inbox className="h-4 w-4" />
                Bandeja de Entrada
                {unreadCount > 0 && <Badge variant="destructive" className="ml-1">{unreadCount}</Badge>}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="send">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                  <Card className="bb-content-area">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Enviar Aviso a Equipos
                      </CardTitle>
                      <CardDescription>
                        Selecciona el tipo de aviso y los destinatarios
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Notification Type */}
                      <div>
                        <Label htmlFor="notificationType">Tipo de Aviso</Label>
                        <Select value={notificationType} onValueChange={setNotificationType}>
                          <SelectTrigger id="notificationType" className="mt-2">
                            <SelectValue placeholder="Selecciona el tipo de aviso" />
                          </SelectTrigger>
                          <SelectContent>
                            {notificationTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <span className="flex items-center gap-2">
                                  <type.icon className="h-4 w-4" />
                                  {type.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Subject */}
                      <div>
                        <Label htmlFor="subject">Asunto</Label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Asunto del mensaje..."
                          className="mt-2"
                        />
                      </div>

                      {/* Custom Message */}
                      <div>
                        <Label htmlFor="customMessage">Mensaje</Label>
                        <Textarea
                          id="customMessage"
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          placeholder={
                            notificationType === "reminder" 
                              ? "Recordatorio: La jornada X finaliza el día Y. Por favor, jugad vuestros partidos antes de esa fecha."
                              : notificationType === "result_rejected"
                              ? "El acta del partido X vs Y ha sido rechazada por el siguiente motivo: ..."
                              : "Escribe tu mensaje aquí..."
                          }
                          className="mt-2"
                          rows={5}
                        />
                      </div>

                      <Button onClick={handleSendNotification} className="w-full gap-2" size="lg">
                        <Send className="h-4 w-4" />
                        Enviar Aviso ({selectedTeams.length} destinatario{selectedTeams.length !== 1 ? "s" : ""})
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Team Selection */}
                <div>
                  <Card className="bb-content-area">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Destinatarios
                        </span>
                        <Button variant="outline" size="sm" onClick={handleSelectAll}>
                          {selectedTeams.length === teams.length ? "Ninguno" : "Todos"}
                        </Button>
                      </CardTitle>
                      <CardDescription>
                        {selectedTeams.length} de {teams.length} equipos seleccionados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-3">
                          {teams.map((team) => (
                            <div
                              key={team.id}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedTeams.includes(team.id) 
                                  ? "bg-primary/10 border-primary" 
                                  : "bg-muted/30 hover:bg-muted/50"
                              }`}
                              onClick={() => handleTeamToggle(team.id)}
                            >
                              <Checkbox
                                checked={selectedTeams.includes(team.id)}
                                onCheckedChange={() => handleTeamToggle(team.id)}
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{team.name}</p>
                                <p className="text-xs text-muted-foreground">{team.coach}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inbox">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Mensajes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {messages.length === 0 ? (
                      <div className="py-12 text-center text-muted-foreground">
                        <Inbox className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No hay mensajes</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                            !message.read && message.type === "incoming" ? "bg-primary/5 border-primary/30" : "bg-muted/30"
                          }`}
                          onClick={() => handleMarkAsRead(message.id)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {message.type === "incoming" ? (
                                  <Badge variant="outline" className="text-xs">
                                    {message.fromTeam}
                                  </Badge>
                                ) : (
                                  <Badge className="bg-primary/20 text-primary text-xs">Enviado</Badge>
                                )}
                                {!message.read && message.type === "incoming" && (
                                  <Badge className="bg-primary text-xs">Nuevo</Badge>
                                )}
                              </div>
                              <h4 className="font-medium">{message.subject}</h4>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {message.preview}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">{message.date}</p>
                              {message.read && message.type === "incoming" && (
                                <CheckCircle className="h-4 w-4 text-green-500 mt-2 ml-auto" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
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

export default ManageNotifications;