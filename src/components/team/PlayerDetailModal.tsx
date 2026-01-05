import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Heart, Skull, Activity, TrendingUp, Edit, UserMinus, ArrowRightLeft } from "lucide-react";

export interface PlayerDetail {
  id: string;
  number: number;
  name: string;
  position: string;
  race: string;
  ma: number;
  st: number;
  ag: number;
  pa: number;
  av: number;
  skills: string[];
  spp: number;
  level: string;
  cost: number;
  team?: string;
  specialRules?: string;
  status: "active" | "injured" | "dead";
  injury?: string;
  improvements: { skill: string; source: string; date: string }[];
  sppToNextLevel: number;
  imageUrl?: string;
}

interface PlayerDetailModalProps {
  player: PlayerDetail | null;
  isOpen: boolean;
  onClose: () => void;
  canEdit?: boolean;
  onEdit?: (player: PlayerDetail) => void;
  onTransfer?: (player: PlayerDetail) => void;
  onFire?: (player: PlayerDetail) => void;
}

const getStatusBadge = (status: PlayerDetail["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-600"><Activity className="w-3 h-3 mr-1" /> Activo</Badge>;
    case "injured":
      return <Badge className="bg-yellow-600"><Heart className="w-3 h-3 mr-1" /> Lesionado</Badge>;
    case "dead":
      return <Badge className="bg-red-800"><Skull className="w-3 h-3 mr-1" /> Muerto</Badge>;
  }
};

const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "novato": return "bg-slate-500";
    case "experimentado": return "bg-green-600";
    case "veterano": return "bg-blue-600";
    case "emergente": return "bg-purple-600";
    case "estrella": return "bg-yellow-600";
    case "superestrella": return "bg-orange-600";
    case "leyenda": return "bg-red-600";
    default: return "bg-slate-500";
  }
};

const PlayerDetailModal = ({
  player,
  isOpen,
  onClose,
  canEdit = false,
  onEdit,
  onTransfer,
  onFire
}: PlayerDetailModalProps) => {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="text-2xl font-bold">#{player.number}</span>
            <span className="text-2xl">{player.name}</span>
            {getStatusBadge(player.status)}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Datos</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="improvements">Mejoras</TabsTrigger>
            <TabsTrigger value="experience">Experiencia</TabsTrigger>
          </TabsList>

          {/* Datos Personales */}
          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Imagen */}
              <div className="bg-gradient-to-b from-slate-300 to-slate-400 aspect-square flex items-center justify-center rounded-lg border-2 border-border">
                {player.imageUrl ? (
                  <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Users className="w-24 h-24 text-slate-500" />
                )}
              </div>

              {/* Info básica */}
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Posición</span>
                  <p className="font-semibold">{player.position}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Raza</span>
                  <p className="font-semibold">{player.race}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Equipo</span>
                  <p className="font-semibold">{player.team || "-"}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Coste</span>
                  <p className="font-semibold">{player.cost.toLocaleString()} MO</p>
                </div>
                {player.injury && (
                  <div>
                    <span className="text-sm text-muted-foreground">Lesión</span>
                    <p className="font-semibold text-destructive">{player.injury}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Características */}
            <div>
              <h4 className="font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>Características</h4>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: "MOV", value: player.ma },
                  { label: "FUE", value: player.st },
                  { label: "AGI", value: `${player.ag}+` },
                  { label: "PA", value: `${player.pa}+` },
                  { label: "ARM", value: `${player.av}+` },
                ].map((stat) => (
                  <div key={stat.label} className="bg-primary text-primary-foreground rounded-lg p-3 text-center">
                    <div className="text-xs font-bold">{stat.label}</div>
                    <div className="text-xl font-black">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {player.specialRules && (
              <div>
                <h4 className="font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>Reglas Especiales</h4>
                <p className="text-sm bg-muted p-3 rounded-lg">{player.specialRules}</p>
              </div>
            )}
          </TabsContent>

          {/* Habilidades */}
          <TabsContent value="skills" className="space-y-4">
            <div>
              <h4 className="font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>Habilidades Actuales</h4>
              {player.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {player.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">Sin habilidades adicionales</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-muted rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-sm">Habilidades Primarias</h5>
                <p className="text-xs text-muted-foreground">
                  Grupo de habilidades con acceso normal para esta posición.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-sm">Habilidades Secundarias</h5>
                <p className="text-xs text-muted-foreground">
                  Grupo de habilidades con acceso doble para esta posición.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Historial de Mejoras */}
          <TabsContent value="improvements" className="space-y-4">
            <h4 className="font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>Historial de Mejoras</h4>
            {player.improvements.length > 0 ? (
              <div className="space-y-2">
                {player.improvements.map((imp, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{imp.skill}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>{imp.source}</span>
                      <span className="mx-2">•</span>
                      <span>{imp.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">Sin mejoras registradas</p>
            )}
          </TabsContent>

          {/* Experiencia */}
          <TabsContent value="experience" className="space-y-4">
            <div className="text-center space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Rango Actual</span>
                <div className="mt-1">
                  <Badge className={`${getLevelColor(player.level)} text-lg py-1 px-4`}>
                    {player.level}
                  </Badge>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6">
                <div className="text-4xl font-black text-primary">{player.spp}</div>
                <div className="text-sm text-muted-foreground">Puntos de Experiencia (PE)</div>
              </div>

              <div className="bg-card border-2 border-border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">PE para siguiente rango</div>
                <div className="text-2xl font-bold">{player.sppToNextLevel} PE</div>
                <div className="w-full bg-muted rounded-full h-3 mt-2">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: `${Math.min((player.spp / (player.spp + player.sppToNextLevel)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Acciones de gestión */}
        {canEdit && (
          <div className="flex gap-3 pt-4 border-t border-border mt-4">
            <Button onClick={() => onEdit?.(player)} className="flex-1">
              <Edit className="w-4 h-4 mr-2" /> Editar
            </Button>
            <Button onClick={() => onTransfer?.(player)} variant="secondary" className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" /> Fichar
            </Button>
            <Button onClick={() => onFire?.(player)} variant="destructive" className="flex-1">
              <UserMinus className="w-4 h-4 mr-2" /> Despedir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDetailModal;
