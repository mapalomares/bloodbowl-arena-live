import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/bb-leagues-logo.png";
import {
  LeagueStandings,
  LeagueMatches,
  LeaguePlayoffs,
  LeagueHallOfFame,
  LeagueTeams,
  LeagueCommissioner,
} from "@/components/league";

const LeagueDetail = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const [activeTab, setActiveTab] = useState("clasificaciones");
  const [username] = useState("tirkha");
  const [lastConnection] = useState("2025-11-04 22:13:27");
  const [hasNotifications] = useState(true);

  const handleLogout = () => {
    navigate("/");
  };

  const leagueName = "VillaverdeBowl XXIII Edition";

  const tabs = [
    { id: "clasificaciones", label: "Clasificaciones" },
    { id: "resultados", label: "Resultados y partidos" },
    { id: "playoffs", label: "Playoffs" },
    { id: "halloffame", label: "Hall of fame" },
    { id: "equipos", label: "Equipos" },
    { id: "comisario", label: "Comisario" },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-center">
          <div className="flex justify-center md:justify-start">
            <img src={logo} alt="BB Leagues Logo" className="h-24 md:h-32 object-contain" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>
              El mejor gestor de ligas
            </h1>
            <p className="text-xs md:text-sm text-foreground uppercase" style={{ fontFamily: 'Georgia, serif' }}>
              Ideal para aficionados al fútbol de tablero tipo Blood Bowl
            </p>
          </div>
          <div className="bb-content-area text-sm">
            <div className="space-y-2">
              <div className="font-bold text-primary">{username}</div>
              <div className="text-xs text-muted-foreground">[última conexión: {lastConnection}]</div>
              <Button onClick={handleLogout} size="sm" className="w-full font-bold" style={{ fontFamily: 'Georgia, serif' }}>
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

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {[
            { label: "Inicio", path: "/dashboard" },
            { label: "Hall of Fame", path: "/hall-of-fame" },
            { label: "Ligas", path: "/leagues" },
            { label: "Equipos", path: "/equipos" },
          ].map((nav) => (
            <Button
              key={nav.label}
              onClick={() => navigate(nav.path)}
              className="px-6 py-4 text-base font-bold bg-card hover:bg-card/80 text-card-foreground border-2 border-primary shadow-lg"
              style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}
            >
              {nav.label}
            </Button>
          ))}
        </div>

        {/* League Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          {leagueName}
        </h2>

        {/* League Navigation Tabs */}
        <div className="bb-nav-bar mb-6 flex flex-wrap gap-1 justify-center">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`text-primary-foreground hover:bg-primary-foreground/20 font-bold ${activeTab === tab.id ? 'bg-primary-foreground/20' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "clasificaciones" && <LeagueStandings leagueId={leagueId || "1"} />}
        {activeTab === "resultados" && <LeagueMatches leagueId={leagueId || "1"} />}
        {activeTab === "playoffs" && <LeaguePlayoffs leagueId={leagueId || "1"} />}
        {activeTab === "halloffame" && <LeagueHallOfFame leagueId={leagueId || "1"} />}
        {activeTab === "equipos" && <LeagueTeams leagueId={leagueId || "1"} />}
        {activeTab === "comisario" && <LeagueCommissioner leagueId={leagueId || "1"} />}
      </div>
    </div>
  );
};

export default LeagueDetail;
