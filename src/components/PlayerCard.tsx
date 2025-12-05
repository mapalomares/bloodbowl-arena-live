import { Users } from "lucide-react";

interface Player {
  number: number;
  name: string;
  position: string;
  ma: number;
  st: number;
  ag: number;
  pa: number;
  av: number;
  skills: string[];
  spp: number;
  level: string;
  cost: number;
  team?: string;
  specialRules?: string;
}

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  return (
    <div className="bg-amber-50 border-4 border-yellow-600 rounded-lg shadow-xl overflow-hidden w-full max-w-[280px]">
      {/* Player Name Header */}
      <div className="bg-gradient-to-b from-amber-100 to-amber-50 px-2 py-2 border-b-2 border-yellow-600">
        <h3 
          className="text-lg md:text-xl font-black text-center uppercase tracking-wide"
          style={{ 
            fontFamily: 'Georgia, serif',
            color: '#1a1a2e',
            textShadow: '1px 1px 0px #c9a227'
          }}
        >
          {player.name}
        </h3>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Stats Column - Left Side */}
        <div className="flex flex-col w-14 shrink-0">
          {/* MV */}
          <div className="flex">
            <div className="bg-blue-800 text-yellow-400 font-black text-xs px-1.5 py-2 flex items-center justify-center" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              MV
            </div>
            <div className="bg-red-600 text-yellow-400 font-black text-xl px-2 py-1 flex items-center justify-center flex-1" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              {player.ma}
            </div>
          </div>
          {/* FU */}
          <div className="flex">
            <div className="bg-blue-800 text-yellow-400 font-black text-xs px-1.5 py-2 flex items-center justify-center" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              FU
            </div>
            <div className="bg-red-600 text-yellow-400 font-black text-xl px-2 py-1 flex items-center justify-center flex-1" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              {player.st}
            </div>
          </div>
          {/* AG */}
          <div className="flex">
            <div className="bg-blue-800 text-yellow-400 font-black text-xs px-1.5 py-2 flex items-center justify-center" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              AG
            </div>
            <div className="bg-red-600 text-yellow-400 font-black text-xl px-2 py-1 flex items-center justify-center flex-1" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              {player.ag}+
            </div>
          </div>
          {/* PS */}
          <div className="flex">
            <div className="bg-blue-800 text-yellow-400 font-black text-xs px-1.5 py-2 flex items-center justify-center" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              PS
            </div>
            <div className="bg-red-600 text-yellow-400 font-black text-xl px-2 py-1 flex items-center justify-center flex-1" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              {player.pa}+
            </div>
          </div>
          {/* AR */}
          <div className="flex">
            <div className="bg-blue-800 text-yellow-400 font-black text-xs px-1.5 py-2 flex items-center justify-center" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              AR
            </div>
            <div className="bg-red-600 text-yellow-400 font-black text-xl px-2 py-1 flex items-center justify-center flex-1" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              {player.av}+
            </div>
          </div>
          
          {/* Cost Shield */}
          <div className="mt-auto p-1">
            <div className="relative bg-gradient-to-b from-red-600 to-red-800 rounded-t-lg rounded-b-2xl border-2 border-blue-900 px-1 py-2 text-center shadow-lg">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="text-yellow-400 font-black text-[10px]" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                ★MO★
              </div>
              <div className="text-white font-black text-xs" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                {player.cost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col">
          {/* Player Image */}
          <div className="bg-gradient-to-b from-slate-300 to-slate-400 aspect-square flex items-center justify-center border-l-2 border-yellow-600">
            <Users className="w-16 h-16 text-slate-500" />
          </div>

          {/* Info Section */}
          <div className="p-2 flex-1 text-xs space-y-2 bg-amber-50">
            {/* Skills */}
            <div>
              <h4 className="font-black text-xs uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                Habilidades y Rasgos
              </h4>
              <p className="text-[10px] leading-tight">
                {player.skills.length > 0 ? player.skills.join(", ") : "Ninguna"}
              </p>
            </div>

            {/* Team */}
            {player.team && (
              <div>
                <h4 className="font-black text-xs uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                  Juega Para
                </h4>
                <p className="text-[10px] leading-tight">{player.team}</p>
              </div>
            )}

            {/* Special Rules */}
            {player.specialRules && (
              <div>
                <h4 className="font-black text-xs uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                  Reglas Especiales
                </h4>
                <p className="text-[10px] leading-tight">{player.specialRules}</p>
              </div>
            )}

            {/* SPP / Level */}
            <div className="text-[10px] text-blue-800 font-bold">
              [{player.spp} PE - {player.level}]
            </div>
          </div>

          {/* Position Footer */}
          <div className="bg-amber-100 border-t-2 border-yellow-600 py-1 px-2 text-center">
            <span 
              className="text-xs font-bold italic"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              ({player.position})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
