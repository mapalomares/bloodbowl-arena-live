import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, X } from "lucide-react";
import { PlayerDetail } from "./PlayerDetailModal";

interface EditPlayerModalProps {
  player: PlayerDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<PlayerDetail>) => void;
  availableSkills: string[];
}

const EditPlayerModal = ({
  player,
  isOpen,
  onClose,
  onSubmit,
  availableSkills
}: EditPlayerModalProps) => {
  const [formData, setFormData] = useState({
    number: 0,
    name: "",
    status: "active" as PlayerDetail["status"],
    injury: "",
    skills: [] as string[],
    spp: 0
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (player) {
      setFormData({
        number: player.number,
        name: player.name,
        status: player.status,
        injury: player.injury || "",
        skills: [...player.skills],
        spp: player.spp
      });
    }
  }, [player]);

  const handleSubmit = () => {
    onSubmit({
      ...player,
      ...formData,
      injury: formData.status === "injured" ? formData.injury : undefined
    });
    onClose();
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <Edit className="w-5 h-5" />
            Editar Jugador: {player.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Datos</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="status">Estado</TabsTrigger>
          </TabsList>

          {/* Datos básicos */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="editNumber">Número</Label>
              <Input
                id="editNumber"
                type="number"
                min={1}
                max={99}
                value={formData.number}
                onChange={(e) => setFormData(prev => ({ ...prev, number: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editName">Nombre</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editSpp">Puntos de Experiencia (PE)</Label>
              <Input
                id="editSpp"
                type="number"
                min={0}
                value={formData.spp}
                onChange={(e) => setFormData(prev => ({ ...prev, spp: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </TabsContent>

          {/* Habilidades */}
          <TabsContent value="skills" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Habilidades actuales</Label>
              <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-muted rounded-lg">
                {formData.skills.length > 0 ? (
                  formData.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="py-1 px-3">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground italic">Sin habilidades</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Añadir habilidad</Label>
              <div className="flex gap-2">
                <Select value={newSkill} onValueChange={setNewSkill}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecciona una habilidad" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {availableSkills
                      .filter(s => !formData.skills.includes(s))
                      .map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button onClick={addSkill} disabled={!newSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Estado */}
          <TabsContent value="status" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="editStatus">Estado del jugador</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: PlayerDetail["status"]) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger id="editStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="injured">Lesionado</SelectItem>
                  <SelectItem value="dead">Muerto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.status === "injured" && (
              <div className="space-y-2">
                <Label htmlFor="editInjury">Tipo de lesión</Label>
                <Select 
                  value={formData.injury} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, injury: value }))}
                >
                  <SelectTrigger id="editInjury">
                    <SelectValue placeholder="Selecciona la lesión" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cabeza-dura">Cabeza Dura (-1 ARM)</SelectItem>
                    <SelectItem value="cuello-roto">Cuello Roto (-1 AGI)</SelectItem>
                    <SelectItem value="brazo-roto">Brazo Roto (-1 PA)</SelectItem>
                    <SelectItem value="pierna-rota">Pierna Rota (-1 MOV)</SelectItem>
                    <SelectItem value="cadera-fracturada">Cadera Fracturada (-1 MOV)</SelectItem>
                    <SelectItem value="espalda-dañada">Espalda Dañada (-1 FUE)</SelectItem>
                    <SelectItem value="conmocion">Conmoción (Pierde próximo partido)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="bg-muted p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-sm mb-2">Información del estado</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• <strong>Activo:</strong> Disponible para jugar</li>
                <li>• <strong>Lesionado:</strong> Tiene una lesión permanente</li>
                <li>• <strong>Muerto:</strong> No puede volver a jugar</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlayerModal;
