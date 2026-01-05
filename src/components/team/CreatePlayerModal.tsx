import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";

interface Position {
  id: string;
  name: string;
  cost: number;
  maxQty: number;
  currentQty: number;
  ma: number;
  st: number;
  ag: string;
  pa: string;
  av: string;
  skills: string[];
}

interface CreatePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { number: number; name: string; positionId: string }) => void;
  positions: Position[];
  existingNumbers: number[];
  teamTreasury: number;
}

const CreatePlayerModal = ({
  isOpen,
  onClose,
  onSubmit,
  positions,
  existingNumbers,
  teamTreasury
}: CreatePlayerModalProps) => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [positionId, setPositionId] = useState("");
  const [error, setError] = useState("");

  const selectedPosition = positions.find(p => p.id === positionId);
  const canAfford = selectedPosition ? teamTreasury >= selectedPosition.cost : true;
  const isNumberTaken = existingNumbers.includes(parseInt(number));
  const isPositionFull = selectedPosition ? selectedPosition.currentQty >= selectedPosition.maxQty : false;

  const handleSubmit = () => {
    setError("");

    if (!number || !name || !positionId) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (isNumberTaken) {
      setError("El número ya está en uso");
      return;
    }

    if (isPositionFull) {
      setError("No hay plazas disponibles para esta posición");
      return;
    }

    if (!canAfford) {
      setError("Fondos insuficientes");
      return;
    }

    onSubmit({
      number: parseInt(number),
      name,
      positionId
    });

    setNumber("");
    setName("");
    setPositionId("");
    onClose();
  };

  const handleClose = () => {
    setNumber("");
    setName("");
    setPositionId("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <UserPlus className="w-5 h-5" />
            Crear Nuevo Jugador
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Número */}
          <div className="space-y-2">
            <Label htmlFor="playerNumber">Número del jugador</Label>
            <Input
              id="playerNumber"
              type="number"
              min={1}
              max={99}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="1-99"
              className={isNumberTaken ? "border-destructive" : ""}
            />
            {isNumberTaken && (
              <p className="text-xs text-destructive">Este número ya está en uso</p>
            )}
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="playerName">Nombre del jugador</Label>
            <Input
              id="playerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Griff Oberwald"
            />
          </div>

          {/* Posición */}
          <div className="space-y-2">
            <Label htmlFor="playerPosition">Posición</Label>
            <Select value={positionId} onValueChange={setPositionId}>
              <SelectTrigger id="playerPosition">
                <SelectValue placeholder="Selecciona una posición" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((pos) => (
                  <SelectItem 
                    key={pos.id} 
                    value={pos.id}
                    disabled={pos.currentQty >= pos.maxQty}
                  >
                    <div className="flex justify-between items-center w-full gap-4">
                      <span>{pos.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({pos.currentQty}/{pos.maxQty}) - {pos.cost.toLocaleString()} MO
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isPositionFull && (
              <p className="text-xs text-destructive">No hay plazas disponibles</p>
            )}
          </div>

          {/* Resumen de stats */}
          {selectedPosition && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-sm">Estadísticas de la posición</h4>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="bg-background rounded p-2">
                  <div className="font-bold">MOV</div>
                  <div>{selectedPosition.ma}</div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="font-bold">FUE</div>
                  <div>{selectedPosition.st}</div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="font-bold">AGI</div>
                  <div>{selectedPosition.ag}</div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="font-bold">PA</div>
                  <div>{selectedPosition.pa}</div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="font-bold">ARM</div>
                  <div>{selectedPosition.av}</div>
                </div>
              </div>
              {selectedPosition.skills.length > 0 && (
                <div>
                  <div className="text-xs font-semibold mb-1">Habilidades iniciales:</div>
                  <p className="text-xs text-muted-foreground">{selectedPosition.skills.join(", ")}</p>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm">Coste:</span>
                <span className={`font-bold ${canAfford ? "text-green-600" : "text-destructive"}`}>
                  {selectedPosition.cost.toLocaleString()} MO
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Tesoro del equipo:</span>
                <span>{teamTreasury.toLocaleString()} MO</span>
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!canAfford || isPositionFull}>
            Crear Jugador
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlayerModal;
