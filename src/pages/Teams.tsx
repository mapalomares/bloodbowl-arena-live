import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import logo from "@/assets/bb-leagues-logo.png";

interface Team {
  id: string;
  name: string;
  details: string;
}

interface LeagueWithTeams {
  id: string;
  name: string;
  icon: string;
  teams: Team[];
}

const Teams = () => {
  const navigate = useNavigate();
  const [username] = useState("tirkha");
  const [lastConnection] = useState("2025-11-12 22:07:00");
  const [hasNotifications] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [rulebook, setRulebook] = useState("");
  const [race, setRace] = useState("");
  const [initialTR, setInitialTR] = useState("10000");
  const [showRoster, setShowRoster] = useState(true);

  const woodElfRoster = [
    { qty: "0/12", position: "Wood Elf Lineman", cost: "70.000", ma: "7", st: "3", ag: "2+", pa: "4+", av: "8+", skills: "", primary: "AG", secondary: "S" },
    { qty: "0/2", position: "Wood Elf Thrower", cost: "95.000", ma: "7", st: "3", ag: "2+", pa: "2+", av: "8+", skills: "Pass", primary: "AGP", secondary: "S" },
    { qty: "0/4", position: "Wood Elf Catcher", cost: "90.000", ma: "8", st: "2", ag: "2+", pa: "4+", av: "8+", skills: "Catch, Dodge", primary: "AG", secondary: "PS" },
    { qty: "0/2", position: "Wardancer", cost: "125.000", ma: "8", st: "3", ag: "2+", pa: "4+", av: "8+", skills: "Block, Dodge, Leap", primary: "AG", secondary: "PS" },
    { qty: "0/1", position: "Loren Forest Treeman", cost: "120.000", ma: "2", st: "6", ag: "5+", pa: "5+", av: "11+", skills: "Loner (4+), Mighty Blow (+1), Stand Firm, Strong Arm, Take Root, Thick Skull, Throw Team-mate", primary: "S", secondary: "AG" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const myTeams: LeagueWithTeams[] = [
    {
      id: "5",
      name: "Liga Sansera La nueva era. 1a edición",
      icon: "🏆",
      teams: [
        {
          id: "t1",
          name: "Harlem Ogretrotters!",
          details: "(LBR 6.0-tirkha)"
        }
      ]
    },
    {
      id: "6",
      name: "VillaverdeBowl Clanes Skavens",
      icon: "🏆",
      teams: [
        {
          id: "t2",
          name: "(Clanes Skavens-tirkha)",
          details: ""
        }
      ]
    },
    {
      id: "7",
      name: "VillaverdeBowl ChaosCup",
      icon: "🏆",
      teams: [
        {
          id: "t3",
          name: "Peter Cook & Friends",
          details: "(Villaverde ChaosCup-tirkha)"
        }
      ]
    },
    {
      id: "9",
      name: "VillaverdeBowl X Edición",
      icon: "🏆",
      teams: [
        {
          id: "t4",
          name: "Gelfitafe",
          details: "(LBR 6.0-tirkha)"
        }
      ]
    }
  ];

  const handleDeleteTeam = (teamId: string) => {
    console.log("Eliminar equipo:", teamId);
  };

  const handleCreateTeam = () => {
    console.log("Crear equipo:", { teamName, rulebook, race, initialTR });
    setShowCreateForm(false);
    setTeamName("");
    setRulebook("");
    setRace("");
    setInitialTR("10000");
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setTeamName("");
    setRulebook("");
    setRace("");
    setInitialTR("10000");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-center">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img src={logo} alt="BB Leagues Logo" className="h-24 md:h-32 object-contain" />
          </div>

          {/* Title */}
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

          {/* User Panel */}
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
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button
            onClick={() => navigate("/dashboard")}
            size="lg"
            variant="secondary"
            className="font-bold text-base px-6"
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            INICIO
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="font-bold text-base px-6"
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            HALL OF FAME
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="font-bold text-base px-6"
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            LIGAS
          </Button>
          <Button
            size="lg"
            className="font-bold text-base px-6"
            style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
          >
            EQUIPOS
          </Button>
        </div>

        {/* Main Content */}
        <div className="bb-content-area">
          {!showCreateForm ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
                MIS EQUIPOS
              </h2>

              <div className="mb-4">
                <span 
                  onClick={() => setShowCreateForm(true)}
                  className="text-lg text-primary cursor-pointer hover:underline" 
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  🏆 Crear un equipo
                </span>
              </div>

              <div className="space-y-6">
                {myTeams.map((league) => (
                  <div key={league.id} className="space-y-2">
                    {/* League Header */}
                    <div className="bg-muted border-2 border-primary p-3 rounded">
                      <h3 className="text-lg font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                        {league.icon} {league.name}
                      </h3>
                    </div>

                    {/* Teams in League */}
                    {league.teams.map((team) => (
                      <div 
                        key={team.id}
                        className="bg-secondary/60 border-l-4 border-primary p-3 rounded flex items-center justify-between hover:bg-secondary/80 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🏈</span>
                          <div>
                            <span className="font-semibold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                              {team.name}
                            </span>
                            {team.details && (
                              <span className="text-sm text-muted-foreground ml-2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                                {team.details}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteTeam(team.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
                EQUIPO NUEVO
              </h2>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Team Name */}
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-base font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                    Nombre del equipo:
                  </Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="bg-card border-2 border-input"
                  />
                </div>

                {/* Rulebook, Race, and Initial TR Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Rulebook */}
                  <div className="space-y-2">
                    <Label htmlFor="rulebook" className="text-base font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                      Reglamento:
                    </Label>
                    <Select value={rulebook} onValueChange={setRulebook}>
                      <SelectTrigger id="rulebook" className="bg-card border-2 border-input">
                        <SelectValue placeholder="Escoge un reglamento" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-2 border-primary z-50">
                        <SelectItem value="tercera-edicion">Tercera Edición</SelectItem>
                        <SelectItem value="lbr-6.0">LBR 6.0</SelectItem>
                        <SelectItem value="lbr-5.0">LBR 5.0</SelectItem>
                        <SelectItem value="bb-2020">Blood Bowl 2020</SelectItem>
                        <SelectItem value="bb-2016">Blood Bowl 2016</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Race */}
                  <div className="space-y-2">
                    <Label htmlFor="race" className="text-base font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                      Raza:
                    </Label>
                    <Select value={race} onValueChange={setRace}>
                      <SelectTrigger id="race" className="bg-card border-2 border-input">
                        <SelectValue placeholder="Escoge una raza" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-2 border-primary z-50 max-h-[300px]">
                        <SelectItem value="elfos-silvanos">Elfos Silvanos</SelectItem>
                        <SelectItem value="humanos">Humanos</SelectItem>
                        <SelectItem value="orcos">Orcos</SelectItem>
                        <SelectItem value="elfos">Elfos</SelectItem>
                        <SelectItem value="enanos">Enanos</SelectItem>
                        <SelectItem value="skavens">Skavens</SelectItem>
                        <SelectItem value="caos">Caos</SelectItem>
                        <SelectItem value="no-muertos">No-muertos</SelectItem>
                        <SelectItem value="lagartos">Lagartos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Initial TR */}
                  <div className="space-y-2">
                    <Label htmlFor="initialTR" className="text-base font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                      TR inicial:
                    </Label>
                    <Input
                      id="initialTR"
                      type="number"
                      value={initialTR}
                      onChange={(e) => setInitialTR(e.target.value)}
                      className="bg-card border-2 border-input"
                    />
                  </div>
                </div>

                {/* Wood Elf Roster Table */}
                {rulebook === "tercera-edicion" && race === "elfos-silvanos" && (
                  <div className="space-y-2">
                    <div 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setShowRoster(!showRoster)}
                    >
                      <h3 className="text-lg font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                        Wood Elf Team Players
                      </h3>
                      <span className="text-sm">{showRoster ? "▲" : "▼"}</span>
                    </div>

                    {showRoster && (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-destructive text-destructive-foreground">
                              <th className="border border-destructive p-2 text-left font-bold">QTY</th>
                              <th className="border border-destructive p-2 text-left font-bold">POSITION</th>
                              <th className="border border-destructive p-2 text-left font-bold">COST</th>
                              <th className="border border-destructive p-2 text-center font-bold">MA</th>
                              <th className="border border-destructive p-2 text-center font-bold">ST</th>
                              <th className="border border-destructive p-2 text-center font-bold">AG</th>
                              <th className="border border-destructive p-2 text-center font-bold">PA</th>
                              <th className="border border-destructive p-2 text-center font-bold">AV</th>
                              <th className="border border-destructive p-2 text-left font-bold">SKILLS</th>
                              <th className="border border-destructive p-2 text-center font-bold">PRIMARY</th>
                              <th className="border border-destructive p-2 text-center font-bold">SECONDARY</th>
                            </tr>
                          </thead>
                          <tbody>
                            {woodElfRoster.map((player, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                <td className="border border-border p-2">{player.qty}</td>
                                <td className="border border-border p-2">{player.position}</td>
                                <td className="border border-border p-2">{player.cost}</td>
                                <td className="border border-border p-2 text-center">{player.ma}</td>
                                <td className="border border-border p-2 text-center">{player.st}</td>
                                <td className="border border-border p-2 text-center">{player.ag}</td>
                                <td className="border border-border p-2 text-center">{player.pa}</td>
                                <td className="border border-border p-2 text-center">{player.av}</td>
                                <td className="border border-border p-2 text-sm">{player.skills}</td>
                                <td className="border border-border p-2 text-center">{player.primary}</td>
                                <td className="border border-border p-2 text-center">{player.secondary}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center pt-4">
                  <Button
                    onClick={handleCreateTeam}
                    className="px-8 font-bold"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Guardar
                  </Button>
                  <Button
                    onClick={handleCancelCreate}
                    variant="secondary"
                    className="px-8 font-bold"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
