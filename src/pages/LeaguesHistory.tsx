import { useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Calendar, Users, Medal, ChevronRight, Crown, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for league history
const leagues = [
  { id: "1", name: "Liga Nacional", editions: 12 },
  { id: "2", name: "Copa Élite", editions: 8 },
  { id: "3", name: "Liga Regional Norte", editions: 5 },
];

const historyData = [
  {
    id: "1",
    leagueId: "1",
    edition: 12,
    year: "2024",
    season: "Primavera",
    champion: { name: "Chaos All-Stars", race: "Chaos", coach: "DragonSlayer" },
    runnerUp: { name: "Undead Legends", race: "No Muertos", coach: "NecroMaster" },
    third: { name: "Orc Crushers", race: "Orcos", coach: "GreenBeast" },
    teams: 16,
    matches: 120,
    topScorer: { name: "Grashnak el Terrible", team: "Orc Crushers", touchdowns: 24 },
    mvp: { name: "Vlad el Empalador", team: "Undead Legends", mvps: 8 },
  },
  {
    id: "2",
    leagueId: "1",
    edition: 11,
    year: "2023",
    season: "Otoño",
    champion: { name: "Undead Legends", race: "No Muertos", coach: "NecroMaster" },
    runnerUp: { name: "Dwarf Ironbreakers", race: "Enanos", coach: "HammerTime" },
    third: { name: "High Elf Princes", race: "Altos Elfos", coach: "StarLight" },
    teams: 14,
    matches: 91,
    topScorer: { name: "Thordak Ironfoot", team: "Dwarf Ironbreakers", touchdowns: 18 },
    mvp: { name: "Aelindril", team: "High Elf Princes", mvps: 7 },
  },
  {
    id: "3",
    leagueId: "1",
    edition: 10,
    year: "2023",
    season: "Primavera",
    champion: { name: "Skaven Runners", race: "Skaven", coach: "RatKing" },
    runnerUp: { name: "Chaos All-Stars", race: "Chaos", coach: "DragonSlayer" },
    third: { name: "Undead Legends", race: "No Muertos", coach: "NecroMaster" },
    teams: 12,
    matches: 66,
    topScorer: { name: "Screek Veloz", team: "Skaven Runners", touchdowns: 32 },
    mvp: { name: "Gorthor el Maldito", team: "Chaos All-Stars", mvps: 6 },
  },
  {
    id: "4",
    leagueId: "1",
    edition: 9,
    year: "2022",
    season: "Otoño",
    champion: { name: "Orc Crushers", race: "Orcos", coach: "GreenBeast" },
    runnerUp: { name: "Skaven Runners", race: "Skaven", coach: "RatKing" },
    third: { name: "Human Knights", race: "Humanos", coach: "SirLancelot" },
    teams: 10,
    matches: 45,
    topScorer: { name: "Varag Destrozahuesos", team: "Orc Crushers", touchdowns: 21 },
    mvp: { name: "Varag Destrozahuesos", team: "Orc Crushers", mvps: 9 },
  },
  {
    id: "5",
    leagueId: "2",
    edition: 8,
    year: "2024",
    season: "Verano",
    champion: { name: "Dark Elf Corsairs", race: "Elfos Oscuros", coach: "ShadowBlade" },
    runnerUp: { name: "Lizardmen Aztecs", race: "Hombres Lagarto", coach: "SunGod" },
    third: { name: "Wood Elf Wanderers", race: "Elfos Silvanos", coach: "TreeHugger" },
    teams: 8,
    matches: 28,
    topScorer: { name: "Malekith Veneno", team: "Dark Elf Corsairs", touchdowns: 15 },
    mvp: { name: "Tlaxtlan", team: "Lizardmen Aztecs", mvps: 5 },
  },
];

const LeaguesHistory = () => {
  const [selectedLeague, setSelectedLeague] = useState<string>("all");

  const filteredHistory = selectedLeague === "all" 
    ? historyData 
    : historyData.filter(h => h.leagueId === selectedLeague);

  const getLeagueName = (leagueId: string) => {
    return leagues.find(l => l.id === leagueId)?.name || "Liga";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Link to="/leagues" className="hover:text-primary transition-colors">
              Ligas
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Historial</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Trophy className="h-8 w-8 text-primary" />
                Historial de Ediciones
              </h1>
              <p className="text-muted-foreground mt-1">
                Revive las glorias pasadas y los campeones de cada temporada
              </p>
            </div>
            
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Filtrar por liga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ligas</SelectItem>
                {leagues.map(league => (
                  <SelectItem key={league.id} value={league.id}>
                    {league.name} ({league.editions} ediciones)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{filteredHistory.length}</p>
              <p className="text-sm text-muted-foreground">Ediciones</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-secondary-foreground" />
              <p className="text-2xl font-bold">
                {filteredHistory.reduce((sum, h) => sum + h.teams, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Equipos participantes</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-accent-foreground" />
              <p className="text-2xl font-bold">
                {filteredHistory.reduce((sum, h) => sum + h.matches, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Partidos jugados</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-4 text-center">
              <Crown className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold">
                {new Set(filteredHistory.map(h => h.champion.name)).size}
              </p>
              <p className="text-sm text-muted-foreground">Campeones únicos</p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
          
          <div className="space-y-8">
            {filteredHistory.map((edition, index) => (
              <div 
                key={edition.id} 
                className={`relative flex flex-col md:flex-row gap-4 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 mt-6" />
                
                {/* Content */}
                <div className={`flex-1 ml-10 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">
                      {getLeagueName(edition.leagueId)}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {edition.season} {edition.year}
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 ml-10 md:ml-0">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Edición {edition.edition}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      {/* Podium */}
                      <div className="space-y-2">
                        {/* Champion */}
                        <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                              <Crown className="h-5 w-5 text-yellow-500" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{edition.champion.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {edition.champion.race} • {edition.champion.coach}
                            </p>
                          </div>
                          <Badge className="bg-yellow-500 text-yellow-950">1º</Badge>
                        </div>
                        
                        {/* Runner-up */}
                        <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gray-400/20 flex items-center justify-center">
                              <Medal className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{edition.runnerUp.name}</p>
                            <p className="text-xs text-muted-foreground">{edition.runnerUp.coach}</p>
                          </div>
                          <Badge variant="secondary">2º</Badge>
                        </div>
                        
                        {/* Third */}
                        <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-orange-600/20 flex items-center justify-center">
                              <Award className="h-4 w-4 text-orange-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{edition.third.name}</p>
                            <p className="text-xs text-muted-foreground">{edition.third.coach}</p>
                          </div>
                          <Badge variant="outline">3º</Badge>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Equipos</p>
                          <p className="font-bold">{edition.teams}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Partidos</p>
                          <p className="font-bold">{edition.matches}</p>
                        </div>
                      </div>
                      
                      {/* Highlights */}
                      <div className="pt-3 border-t space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">Top Scorer:</span>
                          <span className="font-medium">{edition.topScorer.name}</span>
                          <Badge variant="outline" className="ml-auto">
                            {edition.topScorer.touchdowns} TD
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">MVP:</span>
                          <span className="font-medium">{edition.mvp.name}</span>
                          <Badge variant="outline" className="ml-auto">
                            {edition.mvp.mvps} MVPs
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="pt-3 border-t">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to={`/liga/${edition.leagueId}`}>
                            Ver detalles de la liga
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredHistory.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">No hay historial disponible</h3>
              <p className="text-muted-foreground">
                Aún no hay ediciones pasadas registradas para esta selección.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LeaguesHistory;
