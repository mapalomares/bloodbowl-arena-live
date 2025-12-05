import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/bb-leagues-logo.png";
import { Share2, Trophy, Users } from "lucide-react";

interface Player {
  number: number;
  name: string;
  position: string;
  ma: number;
  st: number;
  ag: number;
  pa: number;
  av: number;
  skills: string[];
  spp: number;
  level: string;
  cost: number;
  borderColor: string;
}

const mockPlayers: Player[] = [
  { number: 2, name: "Diana", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 0, level: "Novato", cost: 70000, borderColor: "border-sky-400" },
  { number: 5, name: "Milla", position: "Lanzador", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Pasar", "Líder"], spp: 3, level: "Experimentado", cost: 115000, borderColor: "border-sky-400" },
  { number: 6, name: "Mario Martin II", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 2, level: "Novato", cost: 70000, borderColor: "border-sky-400" },
  { number: 8, name: "Argarabarri", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 2, level: "Novato", cost: 70000, borderColor: "border-sky-400" },
  { number: 13, name: "David Soria", position: "Hombre Árbol de Lorien", ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: ["Cabeza Dura", "Brazo Fuerte", "Mantenerse Firme", "Golpe Mortífero (+1)", "Lanzar Compañero", "Echar Raíces", "Solitario (4+)"], spp: 5, level: "Novato", cost: 120000, borderColor: "border-red-500" },
  { number: 14, name: "jpalomares14", position: "Bailarín Guerrero", ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["Saltar", "Esquivar", "Placar", "Placaje Defensivo", "Echarse a un lado"], spp: 0, level: "Veterano", cost: 165000, borderColor: "border-red-500" },
  { number: 20, name: "Coba", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 4, level: "Novato", cost: 70000, borderColor: "border-sky-400" },
  { number: 21, name: "Iglesias", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Placar"], spp: 1, level: "Experimentado", cost: 90000, borderColor: "border-sky-400" },
  { number: 23, name: "Liso", position: "Receptor", ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["Atrapar", "Esquivar"], spp: 0, level: "Novato", cost: 90000, borderColor: "border-yellow-400" },
  { number: 39, name: "Mei", position: "Bailarín Guerrero", ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["Placar", "Esquivar", "Saltar"], spp: 3, level: "Novato", cost: 125000, borderColor: "border-red-500" },
  { number: 98, name: "Noname", position: "Independiente", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Solitario (4+)"], spp: 0, level: "Novato", cost: 70000, borderColor: "border-red-500" },
  { number: 99, name: "Noname", position: "Independiente", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Solitario (4+)"], spp: 0, level: "Novato", cost: 70000, borderColor: "border-red-500" },
];

const TeamDetail = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [username] = useState("tirkha");
  const [lastConnection] = useState("2025-11-04 22:13:27");
  const [hasNotifications] = useState(true);

  const handleLogout = () => {
    navigate("/");
  };

  const teamName = "Gelftafe N.0";
  const teamRace = "Elfos Silvanos";
  const leagueName = "VillaverdeBowl XXIII Edition";

  const staff = {
    sd: 1,
    fh: 3,
    ae: 0,
    aa: 0,
    me: 1,
    te: 50000,
    valoracion: 110,
    reglasEspeciales: "Liga de los Reinos Élficos",
  };

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
              Ideal para aficionados al fútbol de tablero
            </p>
            <p className="text-xs md:text-sm text-foreground uppercase" style={{ fontFamily: 'Georgia, serif' }}>
              tipo Blood Bowl
            </p>
          </div>

          <div className="bb-content-area text-sm">
            <div className="space-y-2">
              <div className="font-bold text-primary">{username}</div>
              <div className="text-xs text-muted-foreground">
                [última conexión: {lastConnection}]
              </div>
              <Button 
                onClick={handleLogout}
                size="sm"
                className="w-full font-bold"
                style={{ fontFamily: 'Georgia, serif' }}
              >
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

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Button 
            onClick={() => navigate("/dashboard")}
            className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" 
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            Inicio
          </Button>
          <Button className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Hall of Fame
          </Button>
          <Button className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            Ligas
          </Button>
          <Button 
            onClick={() => navigate("/equipos")}
            className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg" 
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            Equipos
          </Button>
        </div>

        {/* Team Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          {teamName} ({teamRace}) en {leagueName}
        </h2>

        {/* Players Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {mockPlayers.map((player, index) => (
            <div 
              key={index} 
              className={`bg-card border-4 ${player.borderColor} rounded shadow-md overflow-hidden`}
            >
              {/* Player Header */}
              <div className="flex justify-between items-start p-1 bg-muted">
                <span className="font-bold text-lg">{player.number}</span>
                <div className="text-right">
                  <div className="font-bold text-sm text-red-700" style={{ fontFamily: 'serif' }}>{player.name}</div>
                  <div className="text-xs text-muted-foreground italic">{player.position}</div>
                </div>
              </div>

              {/* Player Image Placeholder */}
              <div className="relative">
                <div className="w-full aspect-square bg-gradient-to-b from-muted to-muted/50 flex items-center justify-center">
                  <Users className="w-16 h-16 text-muted-foreground/50" />
                </div>
                {/* Stats on right side */}
                <div className="absolute top-1 right-1 flex flex-col gap-0.5">
                  <div className="bg-card border border-border px-2 py-0.5 text-xs font-bold text-right">{player.ma}</div>
                  <div className="bg-card border border-border px-2 py-0.5 text-xs font-bold text-right">{player.st}</div>
                  <div className="bg-card border border-border px-2 py-0.5 text-xs font-bold text-right">{player.ag}</div>
                  <div className="bg-card border border-border px-2 py-0.5 text-xs font-bold text-right">{player.pa}</div>
                </div>
                {/* AV at bottom */}
                <div className="absolute bottom-1 right-1">
                  <div className="bg-card border border-border px-2 py-0.5 text-xs font-bold">{player.av}</div>
                </div>
              </div>

              {/* Skills and SPP */}
              <div className="p-1 bg-card min-h-[60px]">
                <div className="text-xs text-primary font-bold">
                  [{player.spp} PE ({player.level})]
                </div>
                {player.skills.length > 0 && (
                  <div className="text-xs mt-1">
                    {player.skills.join(", ")}
                  </div>
                )}
              </div>

              {/* Cost */}
              <div className="bg-muted p-1 text-center text-sm font-bold border-t border-border">
                {player.cost.toLocaleString()} mo
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Fichar Jugador */}
          <div className="bg-card border-4 border-border rounded shadow-md p-4 flex flex-col items-center justify-center">
            <div className="text-6xl mb-2">👤</div>
            <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
              Fichar
            </div>
            <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
              jugador
            </div>
            <div className="text-xs text-muted-foreground mt-2">[0 PE]...</div>
            <div className="text-sm font-bold mt-2">$$$ monedas de oro</div>
          </div>

          {/* Staff */}
          <div className="bg-card border-4 border-border rounded shadow-md p-4">
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>Staff</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span>🏠</span> SD: {staff.sd}
              </div>
              <div className="flex items-center gap-2">
                <span>💀</span> FH: {staff.fh}
              </div>
              <div className="flex items-center gap-2">
                <span>🏥</span> AE: {staff.ae}
              </div>
              <div className="flex items-center gap-2">
                <span>🏟️</span> AA: {staff.aa}
              </div>
              <div className="flex items-center gap-2">
                <span>➕</span> ME: {staff.me}
              </div>
              <div className="flex items-center gap-2">
                <span>💰</span> TE: {staff.te.toLocaleString()}
              </div>
              <div className="mt-2 font-bold">BB Valoración: {staff.valoracion}</div>
              <div className="text-xs text-muted-foreground">Reglas Especiales de Raza:</div>
              <div className="text-xs">{staff.reglasEspeciales}</div>
            </div>
          </div>

          {/* Acciones */}
          <div className="bg-card border-4 border-border rounded shadow-md p-4">
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>Acciones</h3>
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" size="icon" className="w-12 h-12 bg-orange-500 hover:bg-orange-600 border-orange-700">
                <Share2 className="w-6 h-6 text-white" />
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12 bg-orange-500 hover:bg-orange-600 border-orange-700">
                <Trophy className="w-6 h-6 text-white" />
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12 bg-orange-500 hover:bg-orange-600 border-orange-700">
                <Users className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
