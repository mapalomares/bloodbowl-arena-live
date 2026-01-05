import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/bb-leagues-logo.png";
import { Share2, Trophy, Users, Download, UserPlus, Settings, History } from "lucide-react";
import PlayerCard from "@/components/PlayerCard";
import {
  PlayerDetailModal,
  PlayerDetail,
  CreatePlayerModal,
  EditPlayerModal,
  StaffManagementModal,
  TeamStaff,
  TeamMatchHistory,
  TeamMatch,
  TransferPlayerModal,
  FirePlayerModal
} from "@/components/team";

const mockPlayersDetailed: PlayerDetail[] = [
  { id: "p1", number: 2, name: "Diana", position: "Línea Elfo Silvano", race: "Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 0, level: "Novato", cost: 70000, team: "Gelftafe N.0", status: "active", improvements: [], sppToNextLevel: 6 },
  { id: "p2", number: 5, name: "Milla", position: "Lanzador", race: "Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Pasar", "Líder"], spp: 3, level: "Experimentado", cost: 115000, team: "Gelftafe N.0", status: "active", improvements: [{ skill: "Líder", source: "Mejora QB", date: "2024-10-15" }], sppToNextLevel: 13 },
  { id: "p3", number: 6, name: "Mario Martin II", position: "Línea Elfo Silvano", race: "Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 2, level: "Novato", cost: 70000, team: "Gelftafe N.0", status: "active", improvements: [], sppToNextLevel: 4 },
  { id: "p4", number: 8, name: "Argarabarri", position: "Línea Elfo Silvano", race: "Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 2, level: "Novato", cost: 70000, team: "Gelftafe N.0", status: "injured", injury: "Pierna Rota (-1 MOV)", improvements: [], sppToNextLevel: 4 },
  { id: "p5", number: 13, name: "David Soria", position: "Hombre Árbol", race: "Elfo Silvano", ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: ["Cabeza Dura", "Brazo Fuerte", "Mantenerse Firme", "Golpe Mortífero (+1)", "Lanzar Compañero", "Echar Raíces", "Solitario (4+)"], spp: 5, level: "Novato", cost: 120000, team: "Gelftafe N.0", status: "active", specialRules: "Echar Raíces: Este jugador puede elegir echar raíces al inicio de su activación.", improvements: [], sppToNextLevel: 1 },
  { id: "p6", number: 14, name: "jpalomares14", position: "Bailarín Guerrero", race: "Elfo Silvano", ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["Saltar", "Esquivar", "Placar", "Placaje Defensivo", "Echarse a un lado"], spp: 0, level: "Veterano", cost: 165000, team: "Gelftafe N.0", status: "active", improvements: [{ skill: "Placaje Defensivo", source: "Mejora QB", date: "2024-09-20" }, { skill: "Echarse a un lado", source: "Acta partido", date: "2024-11-01" }], sppToNextLevel: 16 },
  { id: "p7", number: 20, name: "Coba", position: "Línea Elfo Silvano", race: "Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 4, level: "Novato", cost: 70000, team: "Gelftafe N.0", status: "active", improvements: [], sppToNextLevel: 2 },
  { id: "p8", number: 21, name: "Iglesias", position: "Línea Elfo Silvano", race: "Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Placar"], spp: 1, level: "Experimentado", cost: 90000, team: "Gelftafe N.0", status: "active", improvements: [{ skill: "Placar", source: "Mejora normal", date: "2024-10-05" }], sppToNextLevel: 15 },
  { id: "p9", number: 23, name: "Liso", position: "Receptor", race: "Elfo Silvano", ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["Atrapar", "Esquivar"], spp: 0, level: "Novato", cost: 90000, team: "Gelftafe N.0", status: "active", improvements: [], sppToNextLevel: 6 },
  { id: "p10", number: 39, name: "Mei", position: "Bailarín Guerrero", race: "Elfo Silvano", ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["Placar", "Esquivar", "Saltar"], spp: 3, level: "Novato", cost: 125000, team: "Gelftafe N.0", status: "active", improvements: [], sppToNextLevel: 3 },
  { id: "p11", number: 98, name: "Noname", position: "Independiente", race: "Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Solitario (4+)"], spp: 0, level: "Novato", cost: 70000, team: "Gelftafe N.0", status: "dead", improvements: [], sppToNextLevel: 6 },
];

const mockMatches: TeamMatch[] = [
  { id: "m1", date: "2024-11-15", round: 1, opponent: "Los Destructores", opponentId: "t1", homeScore: 2, awayScore: 1, isHome: true, result: "win", leagueName: "VillaverdeBowl XXIII", hasScoresheet: true },
  { id: "m2", date: "2024-11-22", round: 2, opponent: "Caos United", opponentId: "t2", homeScore: 1, awayScore: 1, isHome: false, result: "draw", leagueName: "VillaverdeBowl XXIII", hasScoresheet: true },
  { id: "m3", date: "2024-11-29", round: 3, opponent: "Orcos FC", opponentId: "t3", homeScore: 0, awayScore: 2, isHome: true, result: "loss", leagueName: "VillaverdeBowl XXIII", hasScoresheet: true },
  { id: "m4", date: "2024-12-06", round: 4, opponent: "Enanos de Hierro", opponentId: "t4", homeScore: 0, awayScore: 0, isHome: false, result: undefined as any, leagueName: "VillaverdeBowl XXIII", hasScoresheet: false },
];

const availableSkills = [
  "Placar", "Esquivar", "Saltar", "Pasar", "Atrapar", "Líder", "Cabeza Dura",
  "Brazo Fuerte", "Golpe Mortífero", "Patada", "Defensa", "Pro", "Seguro",
  "Pies Firmes", "Finta", "Zancadillear", "Nervios de Acero", "Muy Largo"
];

const positions = [
  { id: "lineman", name: "Línea Elfo Silvano", cost: 70000, maxQty: 12, currentQty: 5, ma: 7, st: 3, ag: "2+", pa: "4+", av: "8+", skills: [] },
  { id: "thrower", name: "Lanzador", cost: 95000, maxQty: 2, currentQty: 1, ma: 7, st: 3, ag: "2+", pa: "2+", av: "8+", skills: ["Pasar"] },
  { id: "catcher", name: "Receptor", cost: 90000, maxQty: 4, currentQty: 1, ma: 8, st: 2, ag: "2+", pa: "4+", av: "8+", skills: ["Atrapar", "Esquivar"] },
  { id: "wardancer", name: "Bailarín Guerrero", cost: 125000, maxQty: 2, currentQty: 2, ma: 8, st: 3, ag: "2+", pa: "4+", av: "8+", skills: ["Placar", "Esquivar", "Saltar"] },
  { id: "treeman", name: "Hombre Árbol", cost: 120000, maxQty: 1, currentQty: 1, ma: 2, st: 6, ag: "5+", pa: "5+", av: "11+", skills: ["Brazo Fuerte", "Golpe Mortífero (+1)", "Lanzar Compañero", "Echar Raíces", "Solitario (4+)"] },
];

const availableTeams = [
  { id: "other1", name: "Los Destructores", race: "Orcos", league: "VillaverdeBowl XXIII" },
  { id: "other2", name: "Caos United", race: "Caos", league: "VillaverdeBowl XXIII" },
];

const TeamDetail = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [username] = useState("tirkha");
  const [lastConnection] = useState("2025-11-04 22:13:27");
  const [hasNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState("roster");
  const [players, setPlayers] = useState<PlayerDetail[]>(mockPlayersDetailed);

  // Modal states
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetail | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isFireModalOpen, setIsFireModalOpen] = useState(false);

  const [staff, setStaff] = useState<TeamStaff>({
    rerolls: 1,
    fanFactor: 3,
    assistantCoaches: 0,
    cheerleaders: 0,
    apothecary: 1,
    treasury: 50000
  });

  const handleLogout = () => navigate("/");

  const teamName = "Gelftafe N.0";
  const teamRace = "Elfos Silvanos";
  const leagueName = "VillaverdeBowl XXIII Edition";
  const isOwner = true;

  const handlePlayerClick = (player: PlayerDetail) => {
    setSelectedPlayer(player);
    setIsDetailModalOpen(true);
  };

  const handleEditPlayer = (player: PlayerDetail) => {
    setSelectedPlayer(player);
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleTransferPlayer = (player: PlayerDetail) => {
    setSelectedPlayer(player);
    setIsDetailModalOpen(false);
    setIsTransferModalOpen(true);
  };

  const handleFirePlayer = (player: PlayerDetail) => {
    setSelectedPlayer(player);
    setIsDetailModalOpen(false);
    setIsFireModalOpen(true);
  };

  const handleCreatePlayer = (data: { number: number; name: string; positionId: string }) => {
    const position = positions.find(p => p.id === data.positionId);
    if (!position) return;
    
    const newPlayer: PlayerDetail = {
      id: `p${Date.now()}`,
      number: data.number,
      name: data.name,
      position: position.name,
      race: teamRace,
      ma: position.ma,
      st: position.st,
      ag: parseInt(position.ag),
      pa: parseInt(position.pa),
      av: parseInt(position.av),
      skills: [...position.skills],
      spp: 0,
      level: "Novato",
      cost: position.cost,
      team: teamName,
      status: "active",
      improvements: [],
      sppToNextLevel: 6
    };
    
    setPlayers(prev => [...prev, newPlayer]);
    setStaff(prev => ({ ...prev, treasury: prev.treasury - position.cost }));
  };

  const handleUpdatePlayer = (updatedPlayer: Partial<PlayerDetail>) => {
    setPlayers(prev => prev.map(p => p.id === updatedPlayer.id ? { ...p, ...updatedPlayer } : p));
  };

  const handleConfirmTransfer = (playerId: string, targetTeamId: string, transferFee: number) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
    setStaff(prev => ({ ...prev, treasury: prev.treasury + transferFee }));
  };

  const handleConfirmFire = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  const existingNumbers = players.map(p => p.number);
  const teamValue = players.reduce((sum, p) => sum + p.cost, 0) + 
    (staff.rerolls * 50000) + (staff.fanFactor * 10000) + 
    (staff.assistantCoaches * 10000) + (staff.cheerleaders * 10000) + 
    (staff.apothecary * 50000);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-center">
          <div className="flex justify-center md:justify-start">
            <img src={logo} alt="BB Leagues Logo" className="h-24 md:h-32 object-contain" />
          </div>

          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>
              El mejor gestor de ligas
            </h1>
            <p className="text-xs md:text-sm text-foreground uppercase" style={{ fontFamily: 'Georgia, serif' }}>
              Ideal para aficionados al fútbol de tablero tipo Blood Bowl
            </p>
          </div>

          <div className="bb-content-area text-sm">
            <div className="space-y-2">
              <div className="font-bold text-primary">{username}</div>
              <div className="text-xs text-muted-foreground">[última conexión: {lastConnection}]</div>
              <Button onClick={handleLogout} size="sm" className="w-full font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                Salir
              </Button>
              {hasNotifications && (
                <div className="text-xs text-center text-primary font-bold cursor-pointer hover:underline">
                  + Tiene notificaciones +
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Button onClick={() => navigate("/dashboard")} className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Inicio
          </Button>
          <Button className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Hall of Fame
          </Button>
          <Button onClick={() => navigate("/leagues")} className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Ligas
          </Button>
          <Button onClick={() => navigate("/equipos")} className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Equipos
          </Button>
        </div>

        {/* Team Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          {teamName} ({teamRace}) en {leagueName}
        </h2>

        {/* Team Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-card border-2 border-border rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Jugadores</div>
            <div className="text-xl font-bold text-primary">{players.filter(p => p.status !== "dead").length}</div>
          </div>
          <div className="bg-card border-2 border-border rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Valoración</div>
            <div className="text-xl font-bold text-primary">{Math.round(teamValue / 10000) * 10}</div>
          </div>
          <div className="bg-card border-2 border-border rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Tesoro</div>
            <div className="text-xl font-bold text-primary">{staff.treasury.toLocaleString()}</div>
          </div>
          <div className="bg-card border-2 border-border rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Repeticiones</div>
            <div className="text-xl font-bold text-primary">{staff.rerolls}</div>
          </div>
          <div className="bg-card border-2 border-border rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Médico</div>
            <div className="text-xl font-bold text-primary">{staff.apothecary ? "Sí" : "No"}</div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="roster" className="text-sm md:text-base">
              <Users className="w-4 h-4 mr-2" /> Plantilla
            </TabsTrigger>
            <TabsTrigger value="matches" className="text-sm md:text-base">
              <History className="w-4 h-4 mr-2" /> Partidos
            </TabsTrigger>
            <TabsTrigger value="staff" className="text-sm md:text-base">
              <Settings className="w-4 h-4 mr-2" /> Staff
            </TabsTrigger>
          </TabsList>

          {/* Plantilla Tab */}
          <TabsContent value="roster">
            {isOwner && (
              <div className="flex justify-center gap-3 mb-6">
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" /> Fichar Jugador
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" /> Descargar PDF
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
              {players.map((player) => (
                <div
                  key={player.id}
                  onClick={() => handlePlayerClick(player)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  <PlayerCard
                    player={{
                      number: player.number,
                      name: player.name,
                      position: player.position,
                      ma: player.ma,
                      st: player.st,
                      ag: player.ag,
                      pa: player.pa,
                      av: player.av,
                      skills: player.skills,
                      spp: player.spp,
                      level: player.level,
                      cost: player.cost,
                      team: player.team,
                      specialRules: player.specialRules
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Partidos Tab */}
          <TabsContent value="matches">
            <div className="bg-card border-2 border-border rounded-lg p-6">
              <TeamMatchHistory matches={mockMatches} teamName={teamName} />
            </div>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border-4 border-border rounded shadow-md p-6">
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Staff del Equipo</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Repeticiones de Equipo</span>
                    <span className="font-bold">{staff.rerolls}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Factor de Hinchada</span>
                    <span className="font-bold">{staff.fanFactor}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Ayudantes de Entrenador</span>
                    <span className="font-bold">{staff.assistantCoaches}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Animadoras</span>
                    <span className="font-bold">{staff.cheerleaders}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Médico</span>
                    <span className="font-bold">{staff.apothecary ? "Sí" : "No"}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-primary/10 rounded border border-primary">
                    <span className="font-bold">Tesoro del Equipo</span>
                    <span className="font-bold text-primary">{staff.treasury.toLocaleString()} MO</span>
                  </div>
                </div>
                {isOwner && (
                  <Button onClick={() => setIsStaffModalOpen(true)} className="w-full mt-4">
                    <Settings className="w-4 h-4 mr-2" /> Gestionar Staff
                  </Button>
                )}
              </div>

              <div className="bg-card border-4 border-border rounded shadow-md p-6">
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Acciones del Equipo</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="w-4 h-4 mr-2" /> Compartir Equipo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="w-4 h-4 mr-2" /> Ver Estadísticas
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" /> Descargar PDF
                  </Button>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Reglas Especiales de Raza</h4>
                  <p className="text-sm text-muted-foreground">Liga de los Reinos Élficos</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <PlayerDetailModal
          player={selectedPlayer}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          canEdit={isOwner}
          onEdit={handleEditPlayer}
          onTransfer={handleTransferPlayer}
          onFire={handleFirePlayer}
        />

        <CreatePlayerModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePlayer}
          positions={positions}
          existingNumbers={existingNumbers}
          teamTreasury={staff.treasury}
        />

        <EditPlayerModal
          player={selectedPlayer}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdatePlayer}
          availableSkills={availableSkills}
        />

        <StaffManagementModal
          isOpen={isStaffModalOpen}
          onClose={() => setIsStaffModalOpen(false)}
          staff={staff}
          onUpdate={setStaff}
          costs={{
            reroll: 50000,
            fanFactor: 10000,
            assistantCoach: 10000,
            cheerleader: 10000,
            apothecary: 50000
          }}
        />

        <TransferPlayerModal
          player={selectedPlayer}
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          onSubmit={handleConfirmTransfer}
          availableTeams={availableTeams}
          currentTeamId={teamId || ""}
        />

        <FirePlayerModal
          player={selectedPlayer}
          isOpen={isFireModalOpen}
          onClose={() => setIsFireModalOpen(false)}
          onConfirm={handleConfirmFire}
        />
      </div>
    </div>
  );
};

export default TeamDetail;
