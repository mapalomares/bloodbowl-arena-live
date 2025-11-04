import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamPlayer {
  id: string;
  name: string;
  number: string;
  position: string;
  stats: {
    touchdowns: number;
    casualties: number;
    completions: number;
    interceptions: number;
  };
}

interface MatchEvent {
  id: string;
  type: 'touchdown' | 'casualty' | 'turnover' | 'kick' | 'pass' | 'foul' | 'interception';
  team: 'home' | 'away';
  player: string;
  description: string;
  turn: number;
}

const LiveMatch = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [activeTeam, setActiveTeam] = useState<'home' | 'away'>('home');
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  // Mock players data
  const homePlayers: TeamPlayer[] = [
    { id: '1', name: 'Jugador 1', number: '1', position: 'Lineman', stats: { touchdowns: 0, casualties: 0, completions: 0, interceptions: 0 } },
    { id: '2', name: 'Jugador 2', number: '2', position: 'Blitzer', stats: { touchdowns: 0, casualties: 0, completions: 0, interceptions: 0 } },
    { id: '3', name: 'Jugador 3', number: '3', position: 'Thrower', stats: { touchdowns: 0, casualties: 0, completions: 0, interceptions: 0 } },
  ];

  const awayPlayers: TeamPlayer[] = [
    { id: '4', name: 'Jugador A', number: '1', position: 'Lineman', stats: { touchdowns: 0, casualties: 0, completions: 0, interceptions: 0 } },
    { id: '5', name: 'Jugador B', number: '2', position: 'Blitzer', stats: { touchdowns: 0, casualties: 0, completions: 0, interceptions: 0 } },
    { id: '6', name: 'Jugador C', number: '3', position: 'Catcher', stats: { touchdowns: 0, casualties: 0, completions: 0, interceptions: 0 } },
  ];

  const addEvent = (type: MatchEvent['type'], description: string) => {
    if (!selectedPlayer) {
      toast.error("Selecciona un jugador primero");
      return;
    }

    const newEvent: MatchEvent = {
      id: Date.now().toString(),
      type,
      team: activeTeam,
      player: selectedPlayer,
      description,
      turn: currentTurn,
    };

    setEvents([newEvent, ...events]);
    toast.success(`Evento registrado: ${description}`);
  };

  const addTouchdown = () => {
    if (activeTeam === 'home') {
      setHomeScore(homeScore + 1);
    } else {
      setAwayScore(awayScore + 1);
    }
    addEvent('touchdown', '¡Touchdown!');
  };

  const nextTurn = () => {
    setCurrentTurn(currentTurn + 1);
    setActiveTeam(activeTeam === 'home' ? 'away' : 'home');
    toast.info(`Turno ${currentTurn + 1} - ${activeTeam === 'home' ? 'Equipo visitante' : 'Equipo local'}`);
  };

  const endMatch = () => {
    toast.success("Partido finalizado");
    navigate('/');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bb-content-area mb-6">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              ← Volver
            </Button>
            <h1 className="text-2xl font-bold">Partido en Directo</h1>
            <Button onClick={endMatch} variant="destructive">
              Finalizar
            </Button>
          </div>

          {/* Scoreboard */}
          <div className="grid grid-cols-3 gap-4 items-center bg-secondary p-6 rounded-lg border-2 border-primary">
            <div className="text-center">
              <div className="text-xl font-bold mb-2">Equipo Local</div>
              <div className="text-5xl font-bold text-primary">{homeScore}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">TURNO</div>
              <div className="text-3xl font-bold">{currentTurn}</div>
              <div className="text-sm mt-2">
                Turno de: <span className="font-bold">{activeTeam === 'home' ? 'Local' : 'Visitante'}</span>
              </div>
              <Button onClick={nextTurn} className="mt-4">
                Siguiente Turno
              </Button>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold mb-2">Equipo Visitante</div>
              <div className="text-5xl font-bold text-primary">{awayScore}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actions Panel */}
          <div className="lg:col-span-1">
            <Card className="p-4 bb-content-area">
              <h2 className="text-xl font-bold mb-4">Acciones</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Seleccionar Jugador:</label>
                <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige un jugador" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="font-bold p-2 text-xs">Equipo Local</div>
                    {homePlayers.map(player => (
                      <SelectItem key={player.id} value={player.id}>
                        #{player.number} - {player.name}
                      </SelectItem>
                    ))}
                    <div className="font-bold p-2 text-xs border-t mt-2">Equipo Visitante</div>
                    {awayPlayers.map(player => (
                      <SelectItem key={player.id} value={player.id}>
                        #{player.number} - {player.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={addTouchdown} 
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={!selectedPlayer}
                >
                  Touchdown
                </Button>
                <Button 
                  onClick={() => addEvent('casualty', 'Baja')} 
                  className="w-full bg-destructive hover:bg-destructive/90"
                  disabled={!selectedPlayer}
                >
                  Baja
                </Button>
                <Button 
                  onClick={() => addEvent('pass', 'Pase completado')} 
                  className="w-full"
                  disabled={!selectedPlayer}
                >
                  Pase
                </Button>
                <Button 
                  onClick={() => addEvent('interception', 'Intercepción')} 
                  className="w-full"
                  disabled={!selectedPlayer}
                >
                  Intercepción
                </Button>
                <Button 
                  onClick={() => addEvent('foul', 'Falta')} 
                  className="w-full"
                  disabled={!selectedPlayer}
                >
                  Falta
                </Button>
                <Button 
                  onClick={() => addEvent('turnover', 'Pérdida de balón')} 
                  className="w-full bg-muted"
                  disabled={!selectedPlayer}
                >
                  Turnover
                </Button>
              </div>
            </Card>
          </div>

          {/* Events Log */}
          <div className="lg:col-span-2">
            <Card className="p-4 bb-content-area">
              <h2 className="text-xl font-bold mb-4">Registro de Eventos</h2>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {events.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No hay eventos registrados aún
                  </p>
                ) : (
                  events.map((event) => (
                    <div 
                      key={event.id} 
                      className={`p-3 rounded border-l-4 ${
                        event.type === 'touchdown' ? 'bg-accent/20 border-accent' :
                        event.type === 'casualty' ? 'bg-destructive/20 border-destructive' :
                        'bg-muted border-muted-foreground'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold">
                            Turno {event.turn} - {event.team === 'home' ? 'Local' : 'Visitante'}
                          </div>
                          <div className="text-sm">
                            {event.description} - Jugador: {event.player}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground capitalize">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="p-4 bb-content-area">
            <h3 className="text-lg font-bold mb-3">Equipo Local - Estadísticas</h3>
            <div className="space-y-2">
              {homePlayers.map((player) => (
                <div key={player.id} className="flex justify-between items-center p-2 bg-secondary rounded">
                  <span className="font-bold">#{player.number} {player.name}</span>
                  <div className="text-xs space-x-2">
                    <span>TD: {player.stats.touchdowns}</span>
                    <span>Bajas: {player.stats.casualties}</span>
                    <span>Pases: {player.stats.completions}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bb-content-area">
            <h3 className="text-lg font-bold mb-3">Equipo Visitante - Estadísticas</h3>
            <div className="space-y-2">
              {awayPlayers.map((player) => (
                <div key={player.id} className="flex justify-between items-center p-2 bg-secondary rounded">
                  <span className="font-bold">#{player.number} {player.name}</span>
                  <div className="text-xs space-x-2">
                    <span>TD: {player.stats.touchdowns}</span>
                    <span>Bajas: {player.stats.casualties}</span>
                    <span>Pases: {player.stats.completions}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;
