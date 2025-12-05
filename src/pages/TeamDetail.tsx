import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/bb-leagues-logo.png";
import { Share2, Trophy, Users } from "lucide-react";
import PlayerCard from "@/components/PlayerCard";

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
  team?: string;
  specialRules?: string;
}

const mockPlayers: Player[] = [
  { number: 2, name: "Diana", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 0, level: "Novato", cost: 70000, borderColor: "border-sky-400", team: "Gelftafe N.0" },
  { number: 5, name: "Milla", position: "Lanzador", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Pasar", "Líder"], spp: 3, level: "Experimentado", cost: 115000, borderColor: "border-sky-400", team: "Gelftafe N.0" },
  { number: 6, name: "Mario Martin II", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 2, level: "Novato", cost: 70000, borderColor: "border-sky-400", team: "Gelftafe N.0" },
  { number: 8, name: "Argarabarri", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 2, level: "Novato", cost: 70000, borderColor: "border-sky-400", team: "Gelftafe N.0" },
  { number: 13, name: "David Soria", position: "Hombre Árbol", ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: ["Cabeza Dura", "Brazo Fuerte", "Mantenerse Firme", "Golpe Mortífero (+1)", "Lanzar Compañero", "Echar Raíces", "Solitario (4+)"], spp: 5, level: "Novato", cost: 120000, borderColor: "border-red-500", team: "Gelftafe N.0", specialRules: "Echar Raíces: Este jugador puede elegir echar raíces al inicio de su activación." },
  { number: 14, name: "jpalomares14", position: "Bailarín Guerrero", ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["Saltar", "Esquivar", "Placar", "Placaje Defensivo", "Echarse a un lado"], spp: 0, level: "Veterano", cost: 165000, borderColor: "border-red-500", team: "Gelftafe N.0" },
  { number: 20, name: "Coba", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [], spp: 4, level: "Novato", cost: 70000, borderColor: "border-sky-400", team: "Gelftafe N.0" },
  { number: 21, name: "Iglesias", position: "Línea Elfo Silvano", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Placar"], spp: 1, level: "Experimentado", cost: 90000, borderColor: "border-sky-400", team: "Gelftafe N.0" },
  { number: 23, name: "Liso", position: "Receptor", ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["Atrapar", "Esquivar"], spp: 0, level: "Novato", cost: 90000, borderColor: "border-yellow-400", team: "Gelftafe N.0" },
  { number: 39, name: "Mei", position: "Bailarín Guerrero", ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["Placar", "Esquivar", "Saltar"], spp: 3, level: "Novato", cost: 125000, borderColor: "border-red-500", team: "Gelftafe N.0" },
  { number: 98, name: "Noname", position: "Independiente", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Solitario (4+)"], spp: 0, level: "Novato", cost: 70000, borderColor: "border-red-500", team: "Gelftafe N.0" },
  { number: 99, name: "Noname", position: "Independiente", ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["Solitario (4+)"], spp: 0, level: "Novato", cost: 70000, borderColor: "border-red-500", team: "Gelftafe N.0" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6 justify-items-center">
          {mockPlayers.map((player, index) => (
            <PlayerCard key={index} player={player} />
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
