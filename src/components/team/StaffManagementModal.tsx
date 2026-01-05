import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Users, Home, Skull, Stethoscope, Megaphone, Wrench } from "lucide-react";

export interface TeamStaff {
  rerolls: number;
  fanFactor: number;
  assistantCoaches: number;
  cheerleaders: number;
  apothecary: number;
  treasury: number;
}

interface StaffManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: TeamStaff;
  onUpdate: (staff: TeamStaff) => void;
  costs: {
    reroll: number;
    fanFactor: number;
    assistantCoach: number;
    cheerleader: number;
    apothecary: number;
  };
  maxValues?: {
    rerolls?: number;
    fanFactor?: number;
    assistantCoaches?: number;
    cheerleaders?: number;
    apothecary?: number;
  };
}

const StaffManagementModal = ({
  isOpen,
  onClose,
  staff,
  onUpdate,
  costs,
  maxValues = {
    rerolls: 8,
    fanFactor: 9,
    assistantCoaches: 6,
    cheerleaders: 12,
    apothecary: 1
  }
}: StaffManagementModalProps) => {
  const [localStaff, setLocalStaff] = useState<TeamStaff>(staff);

  const handleChange = (field: keyof TeamStaff, delta: number, cost: number) => {
    const newValue = localStaff[field] + delta;
    const max = maxValues[field as keyof typeof maxValues] ?? 99;
    
    if (newValue < 0 || newValue > max) return;
    
    const treasuryChange = delta > 0 ? -cost : cost;
    if (localStaff.treasury + treasuryChange < 0) return;

    setLocalStaff(prev => ({
      ...prev,
      [field]: newValue,
      treasury: prev.treasury + treasuryChange
    }));
  };

  const handleSave = () => {
    onUpdate(localStaff);
    onClose();
  };

  const staffItems = [
    {
      key: "rerolls" as const,
      label: "Repeticiones de Equipo",
      icon: <Home className="w-5 h-5" />,
      cost: costs.reroll,
      description: "Permite repetir tiradas de dados fallidas"
    },
    {
      key: "fanFactor" as const,
      label: "Factor de Hinchada",
      icon: <Megaphone className="w-5 h-5" />,
      cost: costs.fanFactor,
      description: "Aumenta el apoyo de los fans"
    },
    {
      key: "assistantCoaches" as const,
      label: "Ayudantes de Entrenador",
      icon: <Users className="w-5 h-5" />,
      cost: costs.assistantCoach,
      description: "Ayudan en la tirada de recepción"
    },
    {
      key: "cheerleaders" as const,
      label: "Animadoras",
      icon: <Skull className="w-5 h-5" />,
      cost: costs.cheerleader,
      description: "Ayudan en la tirada de recepción"
    },
    {
      key: "apothecary" as const,
      label: "Médico",
      icon: <Stethoscope className="w-5 h-5" />,
      cost: costs.apothecary,
      description: "Puede curar lesiones de jugadores"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <Wrench className="w-5 h-5" />
            Gestionar Staff del Equipo
          </DialogTitle>
        </DialogHeader>

        {/* Treasury Display */}
        <div className="bg-primary text-primary-foreground rounded-lg p-4 text-center">
          <div className="text-sm">Tesoro del Equipo</div>
          <div className="text-3xl font-bold">{localStaff.treasury.toLocaleString()} MO</div>
        </div>

        {/* Staff Items */}
        <div className="space-y-4 py-4">
          {staffItems.map((item) => (
            <div 
              key={item.key}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                  <div className="text-xs text-primary mt-1">
                    {item.cost.toLocaleString()} MO c/u
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleChange(item.key, -1, item.cost)}
                  disabled={localStaff[item.key] <= 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-bold text-lg">
                  {localStaff[item.key]}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleChange(item.key, 1, item.cost)}
                  disabled={
                    localStaff.treasury < item.cost ||
                    localStaff[item.key] >= (maxValues[item.key] ?? 99)
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Valor total */}
        <div className="bg-secondary rounded-lg p-3 text-center">
          <span className="text-sm text-muted-foreground">Valor total del staff: </span>
          <span className="font-bold">
            {(
              localStaff.rerolls * costs.reroll +
              localStaff.fanFactor * costs.fanFactor +
              localStaff.assistantCoaches * costs.assistantCoach +
              localStaff.cheerleaders * costs.cheerleader +
              localStaff.apothecary * costs.apothecary
            ).toLocaleString()} MO
          </span>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StaffManagementModal;
