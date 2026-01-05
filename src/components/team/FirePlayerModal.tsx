import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, UserMinus } from "lucide-react";
import { PlayerDetail } from "./PlayerDetailModal";

interface FirePlayerModalProps {
  player: PlayerDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (playerId: string) => void;
}

const FirePlayerModal = ({
  player,
  isOpen,
  onClose,
  onConfirm
}: FirePlayerModalProps) => {
  if (!player) return null;

  const handleConfirm = () => {
    onConfirm(player.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive" style={{ fontFamily: 'Georgia, serif' }}>
            <UserMinus className="w-5 h-5" />
            Despedir Jugador
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Advertencia */}
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">¡Atención!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Esta acción es irreversible. El jugador será eliminado permanentemente del equipo.
              </p>
            </div>
          </div>

          {/* Jugador info */}
          <div className="bg-muted p-4 rounded-lg text-center">
            <div className="text-3xl font-bold mb-2">#{player.number}</div>
            <div className="font-bold text-lg">{player.name}</div>
            <div className="text-sm text-muted-foreground">{player.position}</div>
            <div className="mt-2 text-sm">
              <span className="text-muted-foreground">Valor:</span>{" "}
              <span className="font-semibold">{player.cost.toLocaleString()} MO</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Experiencia:</span>{" "}
              <span className="font-semibold">{player.spp} PE ({player.level})</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            ¿Estás seguro de que quieres despedir a este jugador?
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="flex-1">
            <UserMinus className="w-4 h-4 mr-2" />
            Despedir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FirePlayerModal;
