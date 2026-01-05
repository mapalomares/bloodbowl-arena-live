import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowRightLeft, AlertTriangle } from "lucide-react";
import { PlayerDetail } from "./PlayerDetailModal";

interface Team {
  id: string;
  name: string;
  race: string;
  league: string;
}

interface TransferPlayerModalProps {
  player: PlayerDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (playerId: string, targetTeamId: string, transferFee: number) => void;
  availableTeams: Team[];
  currentTeamId: string;
}

const TransferPlayerModal = ({
  player,
  isOpen,
  onClose,
  onSubmit,
  availableTeams,
  currentTeamId
}: TransferPlayerModalProps) => {
  const [targetTeamId, setTargetTeamId] = useState("");
  const [transferFee, setTransferFee] = useState("0");
  const [error, setError] = useState("");

  const filteredTeams = availableTeams.filter(t => t.id !== currentTeamId);

  const handleSubmit = () => {
    setError("");

    if (!targetTeamId) {
      setError("Debes seleccionar un equipo de destino");
      return;
    }

    if (!player) return;

    onSubmit(player.id, targetTeamId, parseInt(transferFee) || 0);
    setTargetTeamId("");
    setTransferFee("0");
    onClose();
  };

  const handleClose = () => {
    setTargetTeamId("");
    setTransferFee("0");
    setError("");
    onClose();
  };

  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <ArrowRightLeft className="w-5 h-5" />
            Traspasar Jugador
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Jugador info */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="font-bold text-lg">#{player.number} {player.name}</div>
            <div className="text-sm text-muted-foreground">{player.position} • {player.race}</div>
            <div className="text-sm mt-1">
              Valor: <span className="font-semibold">{player.cost.toLocaleString()} MO</span>
            </div>
          </div>

          {/* Advertencia */}
          <div className="flex items-start gap-2 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              El traspaso es permanente. El jugador pasará a formar parte del equipo de destino.
            </p>
          </div>

          {/* Equipo destino */}
          <div className="space-y-2">
            <Label htmlFor="targetTeam">Equipo de destino</Label>
            <Select value={targetTeamId} onValueChange={setTargetTeamId}>
              <SelectTrigger id="targetTeam">
                <SelectValue placeholder="Selecciona un equipo" />
              </SelectTrigger>
              <SelectContent>
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      <div>
                        <div>{team.name}</div>
                        <div className="text-xs text-muted-foreground">{team.race} • {team.league}</div>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No hay equipos disponibles
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Precio traspaso */}
          <div className="space-y-2">
            <Label htmlFor="transferFee">Precio del traspaso (MO)</Label>
            <Input
              id="transferFee"
              type="number"
              min={0}
              value={transferFee}
              onChange={(e) => setTransferFee(e.target.value)}
              placeholder="0"
            />
            <p className="text-xs text-muted-foreground">
              Este importe se añadirá al tesoro de tu equipo
            </p>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!targetTeamId || filteredTeams.length === 0}>
            Confirmar Traspaso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferPlayerModal;
