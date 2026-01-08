import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Trophy, Medal, Skull, Target, Shield, Search, Crown, Zap, Star } from "lucide-react";

// Mock data - Top Scorers (Touchdowns)
const topScorers = [
  { rank: 1, name: "Griff Oberwald", team: "Reikland Reavers", race: "Humanos", league: "VillaverdeBowl XXIII", touchdowns: 127, mvps: 15, games: 45 },
  { rank: 2, name: "Morg 'n' Thorg", team: "Mercenarios FC", race: "Ogro", league: "Liga Nacional", touchdowns: 115, mvps: 22, games: 52 },
  { rank: 3, name: "Eldril Sidewinder", team: "Darkside Cowboys", race: "Elfos Oscuros", league: "VillaverdeBowl XXIII", touchdowns: 98, mvps: 12, games: 38 },
  { rank: 4, name: "Varag Ghoul-Chewer", team: "Gouged Eye", race: "Orcos", league: "Copa del Rey", touchdowns: 89, mvps: 18, games: 42 },
  { rank: 5, name: "Hakflem Skuttlespike", team: "Skavenblight Scramblers", race: "Skaven", league: "Liga Nacional", touchdowns: 84, mvps: 8, games: 35 },
  { rank: 6, name: "Ripper Bolgrot", team: "The Underworld Creepers", race: "Goblins", league: "VillaverdeBowl XXIII", touchdowns: 76, mvps: 14, games: 40 },
  { rank: 7, name: "Roxanna Darknail", team: "Amazon Queens", race: "Amazonas", league: "Copa del Rey", touchdowns: 72, mvps: 11, games: 33 },
  { rank: 8, name: "Zug foe-Hammer", team: "Black Orc Boyz", race: "Orcos Negros", league: "Liga Nacional", touchdowns: 68, mvps: 9, games: 38 },
  { rank: 9, name: "Grim Ironjaw", team: "Dwarf Giants", race: "Enanos", league: "VillaverdeBowl XXIII", touchdowns: 65, mvps: 16, games: 48 },
  { rank: 10, name: "Helmut Wulf", team: "Chainsaw Massacre", race: "Humanos", league: "Copa del Rey", touchdowns: 61, mvps: 7, games: 29 },
];

// Mock data - Top Killers (Casualties)
const topKillers = [
  { rank: 1, name: "Morg 'n' Thorg", team: "Mercenarios FC", race: "Ogro", league: "Liga Nacional", casualties: 89, kills: 12, fouls: 5 },
  { rank: 2, name: "Ripper Bolgrot", team: "The Underworld Creepers", race: "Goblins", league: "VillaverdeBowl XXIII", casualties: 78, kills: 8, fouls: 23 },
  { rank: 3, name: "Max Spleenripper", team: "Chaos Allstars", race: "Caos", league: "Copa del Rey", casualties: 72, kills: 15, fouls: 3 },
  { rank: 4, name: "Varag Ghoul-Chewer", team: "Gouged Eye", race: "Orcos", league: "Copa del Rey", casualties: 68, kills: 9, fouls: 12 },
  { rank: 5, name: "Bomber Dribblesnot", team: "Goblin Bombers", race: "Goblins", league: "Liga Nacional", casualties: 65, kills: 7, fouls: 45 },
  { rank: 6, name: "Kreek Rustgouger", team: "Scrap Heap Scrapers", race: "Skaven", league: "VillaverdeBowl XXIII", casualties: 61, kills: 6, fouls: 18 },
  { rank: 7, name: "Grashnak Blackhoof", team: "Chaos Chosen", race: "Caos", league: "Liga Nacional", casualties: 58, kills: 11, fouls: 8 },
  { rank: 8, name: "Lord Borak", team: "Chaos Allstars", race: "Caos", league: "Copa del Rey", casualties: 55, kills: 10, fouls: 2 },
  { rank: 9, name: "Mighty Zug", team: "Reikland Reavers", race: "Humanos", league: "VillaverdeBowl XXIII", casualties: 52, kills: 4, fouls: 6 },
  { rank: 10, name: "Glart Smashrip", team: "Underworld Denizens", race: "Skaven", league: "Liga Nacional", casualties: 48, kills: 5, fouls: 14 },
];

// Mock data - Top MVPs
const topMVPs = [
  { rank: 1, name: "Morg 'n' Thorg", team: "Mercenarios FC", race: "Ogro", league: "Liga Nacional", mvps: 22, games: 52, ratio: 0.42 },
  { rank: 2, name: "Varag Ghoul-Chewer", team: "Gouged Eye", race: "Orcos", league: "Copa del Rey", mvps: 18, games: 42, ratio: 0.43 },
  { rank: 3, name: "Grim Ironjaw", team: "Dwarf Giants", race: "Enanos", league: "VillaverdeBowl XXIII", mvps: 16, games: 48, ratio: 0.33 },
  { rank: 4, name: "Griff Oberwald", team: "Reikland Reavers", race: "Humanos", league: "VillaverdeBowl XXIII", mvps: 15, games: 45, ratio: 0.33 },
  { rank: 5, name: "Ripper Bolgrot", team: "The Underworld Creepers", race: "Goblins", league: "VillaverdeBowl XXIII", mvps: 14, games: 40, ratio: 0.35 },
  { rank: 6, name: "Eldril Sidewinder", team: "Darkside Cowboys", race: "Elfos Oscuros", league: "VillaverdeBowl XXIII", mvps: 12, games: 38, ratio: 0.32 },
  { rank: 7, name: "Roxanna Darknail", team: "Amazon Queens", race: "Amazonas", league: "Copa del Rey", mvps: 11, games: 33, ratio: 0.33 },
  { rank: 8, name: "Lord Borak", team: "Chaos Allstars", race: "Caos", league: "Copa del Rey", mvps: 10, games: 28, ratio: 0.36 },
  { rank: 9, name: "Zug foe-Hammer", team: "Black Orc Boyz", race: "Orcos Negros", league: "Liga Nacional", mvps: 9, games: 38, ratio: 0.24 },
  { rank: 10, name: "Hakflem Skuttlespike", team: "Skavenblight Scramblers", race: "Skaven", league: "Liga Nacional", mvps: 8, games: 35, ratio: 0.23 },
];

// Mock data - Top Passers
const topPassers = [
  { rank: 1, name: "Griff Oberwald", team: "Reikland Reavers", race: "Humanos", league: "VillaverdeBowl XXIII", completions: 156, interceptions: 8, touchdownPasses: 45 },
  { rank: 2, name: "Eldril Sidewinder", team: "Darkside Cowboys", race: "Elfos Oscuros", league: "VillaverdeBowl XXIII", completions: 142, interceptions: 12, touchdownPasses: 38 },
  { rank: 3, name: "Prince Moranion", team: "High Elf Nobles", race: "Altos Elfos", league: "Liga Nacional", completions: 128, interceptions: 6, touchdownPasses: 42 },
  { rank: 4, name: "Dolfar Longstride", team: "Wood Elf Wanderers", race: "Elfos Silvanos", league: "Copa del Rey", completions: 115, interceptions: 5, touchdownPasses: 35 },
  { rank: 5, name: "Gloriel Summerbloom", team: "Elf Union Stars", race: "Unión Élfica", league: "VillaverdeBowl XXIII", completions: 108, interceptions: 9, touchdownPasses: 32 },
  { rank: 6, name: "Helmut Wulf", team: "Chainsaw Massacre", race: "Humanos", league: "Copa del Rey", completions: 95, interceptions: 11, touchdownPasses: 28 },
  { rank: 7, name: "Roxanna Darknail", team: "Amazon Queens", race: "Amazonas", league: "Copa del Rey", completions: 88, interceptions: 7, touchdownPasses: 25 },
  { rank: 8, name: "Skrull Halfheight", team: "Skaven Speedsters", race: "Skaven", league: "Liga Nacional", completions: 82, interceptions: 15, touchdownPasses: 22 },
  { rank: 9, name: "Tarion Brightblade", team: "High Elf Nobles", race: "Altos Elfos", league: "Liga Nacional", completions: 76, interceptions: 4, touchdownPasses: 28 },
  { rank: 10, name: "Jordell Freshbreeze", team: "Wood Elf Wanderers", race: "Elfos Silvanos", league: "Copa del Rey", completions: 71, interceptions: 3, touchdownPasses: 24 },
];

// Mock data - Legendary Teams
const legendaryTeams = [
  { rank: 1, name: "Reikland Reavers", coach: "Griff_Coach", race: "Humanos", league: "VillaverdeBowl XXIII", titles: 5, wins: 89, winRate: 0.78 },
  { rank: 2, name: "Gouged Eye", coach: "Varag_Boss", race: "Orcos", league: "Copa del Rey", titles: 4, wins: 76, winRate: 0.72 },
  { rank: 3, name: "Darkside Cowboys", coach: "Dark_Elf_Master", race: "Elfos Oscuros", league: "VillaverdeBowl XXIII", titles: 3, wins: 68, winRate: 0.69 },
  { rank: 4, name: "Chaos Allstars", coach: "ChaosLord", race: "Caos", league: "Liga Nacional", titles: 3, wins: 65, winRate: 0.71 },
  { rank: 5, name: "Skavenblight Scramblers", coach: "Rat_King", race: "Skaven", league: "Liga Nacional", titles: 2, wins: 58, winRate: 0.65 },
  { rank: 6, name: "Dwarf Giants", coach: "IronBeard", race: "Enanos", league: "VillaverdeBowl XXIII", titles: 2, wins: 72, winRate: 0.68 },
  { rank: 7, name: "Amazon Queens", coach: "QueenBee", race: "Amazonas", league: "Copa del Rey", titles: 2, wins: 54, winRate: 0.67 },
  { rank: 8, name: "High Elf Nobles", coach: "ElvenPrince", race: "Altos Elfos", league: "Liga Nacional", titles: 1, wins: 48, winRate: 0.62 },
  { rank: 9, name: "The Underworld Creepers", coach: "Gobbo_Master", race: "Goblins", league: "VillaverdeBowl XXIII", titles: 1, wins: 42, winRate: 0.55 },
  { rank: 10, name: "Nurgle Rotters", coach: "PlagueDoctor", race: "Nurgle", league: "Copa del Rey", titles: 1, wins: 38, winRate: 0.52 },
];

const getRankBadge = (rank: number) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="text-muted-foreground font-medium">{rank}</span>;
};

const HallOfFame = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("scorers");
  const [searchTerm, setSearchTerm] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("all");
  const [raceFilter, setRaceFilter] = useState("all");

  const leagues = ["VillaverdeBowl XXIII", "Liga Nacional", "Copa del Rey"];
  const races = ["Humanos", "Orcos", "Elfos Oscuros", "Skaven", "Enanos", "Caos", "Goblins", "Amazonas", "Ogro", "Altos Elfos", "Elfos Silvanos", "Nurgle", "Orcos Negros", "Unión Élfica"];

  const filterData = <T extends { name: string; team: string; race: string; league: string }>(data: T[]) => {
    return data.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLeague = leagueFilter === "all" || item.league === leagueFilter;
      const matchesRace = raceFilter === "all" || item.race === raceFilter;
      return matchesSearch && matchesLeague && matchesRace;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="bb-content-area text-center py-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-10 h-10 text-accent" />
              <h1 
                className="text-3xl md:text-4xl font-bold text-primary"
                style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
              >
                Hall of Fame
              </h1>
              <Trophy className="w-10 h-10 text-accent" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los mejores jugadores y equipos de todas las ligas. Leyendas que han escrito su nombre 
              en la historia del Blood Bowl con sangre, sudor y touchdowns.
            </p>
          </div>

          {/* Filters */}
          <div className="bb-content-area">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar jugador o equipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={leagueFilter} onValueChange={setLeagueFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filtrar por liga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las ligas</SelectItem>
                  {leagues.map((league) => (
                    <SelectItem key={league} value={league}>{league}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={raceFilter} onValueChange={setRaceFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrar por raza" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las razas</SelectItem>
                  {races.map((race) => (
                    <SelectItem key={race} value={race}>{race}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setLeagueFilter("all");
                  setRaceFilter("all");
                }}
              >
                Limpiar
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto bg-transparent">
              <TabsTrigger 
                value="scorers" 
                className="bb-content-area data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Anotadores</span>
              </TabsTrigger>
              <TabsTrigger 
                value="killers" 
                className="bb-content-area data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <Skull className="w-4 h-4" />
                <span className="hidden sm:inline">Carniceros</span>
              </TabsTrigger>
              <TabsTrigger 
                value="mvps" 
                className="bb-content-area data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">MVPs</span>
              </TabsTrigger>
              <TabsTrigger 
                value="passers" 
                className="bb-content-area data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Pasadores</span>
              </TabsTrigger>
              <TabsTrigger 
                value="teams" 
                className="bb-content-area data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Equipos</span>
              </TabsTrigger>
            </TabsList>

            {/* Top Scorers */}
            <TabsContent value="scorers" className="bb-content-area">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-accent" />
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  Top Anotadores de Touchdowns
                </h2>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Jugador</TableHead>
                      <TableHead>Equipo</TableHead>
                      <TableHead>Raza</TableHead>
                      <TableHead className="hidden md:table-cell">Liga</TableHead>
                      <TableHead className="text-center">TDs</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">MVPs</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">Partidos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(topScorers).map((player) => (
                      <TableRow key={player.rank} className="bb-table-row hover:bg-secondary/50">
                        <TableCell className="font-medium">{getRankBadge(player.rank)}</TableCell>
                        <TableCell className="font-bold text-primary">{player.name}</TableCell>
                        <TableCell 
                          className="cursor-pointer hover:underline text-accent"
                          onClick={() => navigate(`/equipo/${player.team.replace(/\s+/g, '-').toLowerCase()}`)}
                        >
                          {player.team}
                        </TableCell>
                        <TableCell>{player.race}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{player.league}</TableCell>
                        <TableCell className="text-center font-bold text-lg text-accent">{player.touchdowns}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">{player.mvps}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">{player.games}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Top Killers */}
            <TabsContent value="killers" className="bb-content-area">
              <div className="flex items-center gap-2 mb-4">
                <Skull className="w-6 h-6 text-destructive" />
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  Top Carniceros (Bajas Causadas)
                </h2>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Jugador</TableHead>
                      <TableHead>Equipo</TableHead>
                      <TableHead>Raza</TableHead>
                      <TableHead className="hidden md:table-cell">Liga</TableHead>
                      <TableHead className="text-center">Bajas</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">Muertes</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">Faltas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(topKillers).map((player) => (
                      <TableRow key={player.rank} className="bb-table-row hover:bg-secondary/50">
                        <TableCell className="font-medium">{getRankBadge(player.rank)}</TableCell>
                        <TableCell className="font-bold text-primary">{player.name}</TableCell>
                        <TableCell 
                          className="cursor-pointer hover:underline text-accent"
                          onClick={() => navigate(`/equipo/${player.team.replace(/\s+/g, '-').toLowerCase()}`)}
                        >
                          {player.team}
                        </TableCell>
                        <TableCell>{player.race}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{player.league}</TableCell>
                        <TableCell className="text-center font-bold text-lg text-destructive">{player.casualties}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell text-destructive">{player.kills}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">{player.fouls}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Top MVPs */}
            <TabsContent value="mvps" className="bb-content-area">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  Top MVPs
                </h2>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Jugador</TableHead>
                      <TableHead>Equipo</TableHead>
                      <TableHead>Raza</TableHead>
                      <TableHead className="hidden md:table-cell">Liga</TableHead>
                      <TableHead className="text-center">MVPs</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">Partidos</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">Ratio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(topMVPs).map((player) => (
                      <TableRow key={player.rank} className="bb-table-row hover:bg-secondary/50">
                        <TableCell className="font-medium">{getRankBadge(player.rank)}</TableCell>
                        <TableCell className="font-bold text-primary">{player.name}</TableCell>
                        <TableCell 
                          className="cursor-pointer hover:underline text-accent"
                          onClick={() => navigate(`/equipo/${player.team.replace(/\s+/g, '-').toLowerCase()}`)}
                        >
                          {player.team}
                        </TableCell>
                        <TableCell>{player.race}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{player.league}</TableCell>
                        <TableCell className="text-center font-bold text-lg text-yellow-600">{player.mvps}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">{player.games}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">{(player.ratio * 100).toFixed(0)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Top Passers */}
            <TabsContent value="passers" className="bb-content-area">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  Top Pasadores
                </h2>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Jugador</TableHead>
                      <TableHead>Equipo</TableHead>
                      <TableHead>Raza</TableHead>
                      <TableHead className="hidden md:table-cell">Liga</TableHead>
                      <TableHead className="text-center">Pases</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">Interc.</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">TD Pases</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(topPassers).map((player) => (
                      <TableRow key={player.rank} className="bb-table-row hover:bg-secondary/50">
                        <TableCell className="font-medium">{getRankBadge(player.rank)}</TableCell>
                        <TableCell className="font-bold text-primary">{player.name}</TableCell>
                        <TableCell 
                          className="cursor-pointer hover:underline text-accent"
                          onClick={() => navigate(`/equipo/${player.team.replace(/\s+/g, '-').toLowerCase()}`)}
                        >
                          {player.team}
                        </TableCell>
                        <TableCell>{player.race}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{player.league}</TableCell>
                        <TableCell className="text-center font-bold text-lg text-blue-600">{player.completions}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell text-destructive">{player.interceptions}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell text-accent">{player.touchdownPasses}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Legendary Teams */}
            <TabsContent value="teams" className="bb-content-area">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  Equipos Legendarios
                </h2>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/10">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Equipo</TableHead>
                      <TableHead>Entrenador</TableHead>
                      <TableHead>Raza</TableHead>
                      <TableHead className="hidden md:table-cell">Liga</TableHead>
                      <TableHead className="text-center">Títulos</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">Victorias</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">% Victoria</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {legendaryTeams
                      .filter((team) => {
                        const matchesSearch = 
                          team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          team.coach.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesLeague = leagueFilter === "all" || team.league === leagueFilter;
                        const matchesRace = raceFilter === "all" || team.race === raceFilter;
                        return matchesSearch && matchesLeague && matchesRace;
                      })
                      .map((team) => (
                        <TableRow key={team.rank} className="bb-table-row hover:bg-secondary/50">
                          <TableCell className="font-medium">{getRankBadge(team.rank)}</TableCell>
                          <TableCell 
                            className="font-bold text-primary cursor-pointer hover:underline"
                            onClick={() => navigate(`/equipo/${team.name.replace(/\s+/g, '-').toLowerCase()}`)}
                          >
                            {team.name}
                          </TableCell>
                          <TableCell className="text-accent">{team.coach}</TableCell>
                          <TableCell>{team.race}</TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">{team.league}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Trophy className="w-4 h-4 text-yellow-500" />
                              <span className="font-bold">{team.titles}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center hidden sm:table-cell font-medium">{team.wins}</TableCell>
                          <TableCell className="text-center hidden sm:table-cell text-accent">{(team.winRate * 100).toFixed(0)}%</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          {/* Back Button */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="font-bold"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Volver
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HallOfFame;
