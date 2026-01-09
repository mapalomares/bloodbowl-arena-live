import { useNavigate } from "react-router-dom";

interface TeamStanding {
  position: number;
  name: string;
  coach: string;
  race: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  noShow: number;
  tdf: number;
  tdc: number;
  passes: number;
  interceptions: number;
  fouls: number;
  casualties: number;
}

const mockStandings: TeamStanding[] = [
  {
    position: 1,
    name: "Repartidorez Valdikanoz",
    coach: "Tio_Sam",
    race: "Orcos",
    points: 10,
    played: 4,
    won: 3,
    drawn: 1,
    lost: 0,
    noShow: 0,
    tdf: 5,
    tdc: 2,
    passes: 3,
    interceptions: 0,
    fouls: 12,
    casualties: 7,
  },
  {
    position: 2,
    name: "Killing me softly with listro",
    coach: "Verch",
    race: "No Muertos",
    points: 8,
    played: 4,
    won: 2,
    drawn: 2,
    lost: 0,
    noShow: 0,
    tdf: 5,
    tdc: 3,
    passes: 0,
    interceptions: 0,
    fouls: 6,
    casualties: 1,
  },
  {
    position: 3,
    name: "Almadén Pascasios",
    coach: "Otis",
    race: "Enanos",
    points: 7,
    played: 3,
    won: 2,
    drawn: 1,
    lost: 0,
    noShow: 0,
    tdf: 4,
    tdc: 1,
    passes: 0,
    interceptions: 0,
    fouls: 4,
    casualties: 1,
  },
  {
    position: 3,
    name: "Bacterias fecales",
    coach: "Morgano",
    race: "Gnoblar",
    points: 7,
    played: 3,
    won: 2,
    drawn: 1,
    lost: 0,
    noShow: 0,
    tdf: 5,
    tdc: 2,
    passes: 0,
    interceptions: 0,
    fouls: 13,
    casualties: 13,
  },
  {
    position: 3,
    name: "Sylvanian Streetfighthuggers",
    coach: "Shaman",
    race: "Humanos",
    points: 7,
    played: 4,
    won: 2,
    drawn: 1,
    lost: 1,
    noShow: 0,
    tdf: 5,
    tdc: 3,
    passes: 15,
    interceptions: 0,
    fouls: 9,
    casualties: 7,
  },
  {
    position: 6,
    name: "Peñafrita's Herd",
    coach: "LOBERAS",
    race: "Elegidos del Caos",
    points: 6,
    played: 3,
    won: 2,
    drawn: 0,
    lost: 1,
    noShow: 0,
    tdf: 5,
    tdc: 3,
    passes: 1,
    interceptions: 0,
    fouls: 7,
    casualties: 5,
  },
];

interface LeagueStandingsProps {
  leagueId: string;
  divisionName?: string;
}

const LeagueStandings = ({ leagueId, divisionName = "División Villaverde Alto" }: LeagueStandingsProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
        Clasificación de la Liga
      </h3>

      <div className="bb-content-area">
        {/* Division Title */}
        <h4 className="text-2xl md:text-3xl font-bold text-center mb-4 py-3 bg-muted rounded" style={{ fontFamily: 'Georgia, serif' }}>
          {divisionName}
        </h4>

        {/* Standings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="py-2 px-2 text-center font-bold">Pos</th>
                <th className="py-2 px-2 text-left font-bold">Equipo</th>
                <th className="py-2 px-2 text-center font-bold">Puntos</th>
                <th className="py-2 px-2 text-center font-bold">PJ</th>
                <th className="py-2 px-2 text-center font-bold">V</th>
                <th className="py-2 px-2 text-center font-bold">E</th>
                <th className="py-2 px-2 text-center font-bold">D</th>
                <th className="py-2 px-2 text-center font-bold">NP</th>
                <th className="py-2 px-2 text-center font-bold">TDF</th>
                <th className="py-2 px-2 text-center font-bold">TDC</th>
                <th className="py-2 px-2 text-center font-bold">PAS</th>
                <th className="py-2 px-2 text-center font-bold">INT</th>
                <th className="py-2 px-2 text-center font-bold">HF</th>
                <th className="py-2 px-2 text-center font-bold">HC</th>
              </tr>
            </thead>
            <tbody>
              {mockStandings.map((team, index) => (
                <tr key={index} className="bb-table-row hover:bg-muted/50">
                  <td className="py-2 px-2 text-center font-bold">{team.position}</td>
                  <td className="py-2 px-2">
                    <div 
                      className="text-primary font-bold cursor-pointer hover:underline"
                      onClick={() => navigate(`/equipo/${index + 1}`)}
                    >
                      {team.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ({team.race}) {team.coach}
                    </div>
                  </td>
                  <td className="py-2 px-2 text-center font-bold">{team.points}</td>
                  <td className="py-2 px-2 text-center">{team.played}</td>
                  <td className="py-2 px-2 text-center">{team.won}</td>
                  <td className="py-2 px-2 text-center">{team.drawn}</td>
                  <td className="py-2 px-2 text-center">{team.lost}</td>
                  <td className="py-2 px-2 text-center">{team.noShow}</td>
                  <td className="py-2 px-2 text-center">{team.tdf}</td>
                  <td className="py-2 px-2 text-center">{team.tdc}</td>
                  <td className="py-2 px-2 text-center">{team.passes}</td>
                  <td className="py-2 px-2 text-center">{team.interceptions}</td>
                  <td className="py-2 px-2 text-center">{team.fouls}</td>
                  <td className="py-2 px-2 text-center">{team.casualties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 text-xs text-muted-foreground grid grid-cols-2 md:grid-cols-4 gap-2">
          <span><strong>PJ:</strong> Partidos Jugados</span>
          <span><strong>V/E/D:</strong> Victorias/Empates/Derrotas</span>
          <span><strong>NP:</strong> No Presentados</span>
          <span><strong>TDF/TDC:</strong> TD Favor/Contra</span>
          <span><strong>PAS:</strong> Pases Completados</span>
          <span><strong>INT:</strong> Intercepciones</span>
          <span><strong>HF/HC:</strong> Heridas Favor/Contra</span>
        </div>
      </div>
    </div>
  );
};

export default LeagueStandings;
