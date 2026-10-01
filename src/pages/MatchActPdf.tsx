import { useEffect } from "react";
import logoLocal from "@/assets/acta/logo_local.png.asset.json";
import logoVisitor from "@/assets/acta/logo_visitor.png.asset.json";
import icoFan from "@/assets/acta/ico_fan.png.asset.json";
import icoCoin from "@/assets/acta/ico_coin.png.asset.json";

// Printable replica of the official match sheet (A4 landscape).
// Skills: text wrapped in _underscores_ renders italic (acquired skills).

interface ActaPlayer { n: number; name: string; pos: string; stats: string; skills: string; }
interface ActaTeam { name: string; tv: string; ff: number; so: number; asst: number; cheer: number; treasury: number; logo: string; players: ActaPlayer[]; }

const local: ActaTeam = {
  name: "ALMADéN PASCASIOS", tv: "174.0", ff: 6, so: 3, asst: 0, cheer: 0, treasury: 475000, logo: logoLocal.url,
  players: [
    { n: 2, name: "DeeDee", pos: "Línea Defensa Enano", stats: "4/3/4/5/10", skills: "Placar, Placaje Defensivo, Cabeza Dura, _Defensa_, _Imparable_ (2)" },
    { n: 8, name: "TeeJay", pos: "Corredor", stats: "6/3/3/4/9", skills: "Manos Seguras, Cabeza Dura, _Placar_, _Patada_, _Esquivar_, _Defensa_ (5)" },
    { n: 26, name: "KenJay", pos: "Corredor", stats: "6/3/3/4/9", skills: "Manos Seguras, Cabeza Dura, _Robar Balón_ (0)" },
    { n: 44, name: "DeeKey", pos: "Matatrolls", stats: "5/3/4/X/9", skills: "Placar, Agallas, Furia, Cabeza Dura, _Golpe Mortífero (+1)_, _Placaje Defensivo_, _Defensa_ (10)" },
    { n: 49, name: "JayRay", pos: "Matatrolls", stats: "5/3/4/X/9", skills: "Placar, Agallas, Furia, Cabeza Dura, _Apartar_ (1)" },
    { n: 57, name: "RayRay", pos: "Línea Defensa Enano", stats: "4/3/4/5/10", skills: "Placar, Placaje Defensivo, Cabeza Dura, _Defensa_, _Golpe Mortífero (+1)_ (11)" },
    { n: 67, name: "CeeCee", pos: "Línea Defensa Enano", stats: "4/3/4/5/10", skills: "Placar, Placaje Defensivo, Cabeza Dura, _Defensa_, _Luchador_ (0)" },
    { n: 74, name: "Hubbard", pos: "Línea Defensa Enano", stats: "4/3/4/5/10", skills: "Placar, Placaje Defensivo, Cabeza Dura," },
    { n: 76, name: "JayCee", pos: "Línea Defensa Enano", stats: "4/3/4/5/10", skills: "Placar, Placaje Defensivo, Cabeza Dura, _Defensa_, _Golpe Mortífero (+1)_ (1)" },
    { n: 78, name: "CeeDee", pos: "Blitzer", stats: "5/3/3/4/10", skills: "Placar, Cabeza Dura, _Defensa_, _Golpe Mortífero (+1)_ (1)" },
    { n: 84, name: "GeeGee", pos: "Línea Defensa Enano", stats: "4/3/4/5/10", skills: "Placar, Placaje Defensivo, Cabeza Dura, _Defensa_, _Golpe Mortífero (+1)_, _Mantenerse Firme_ (4)" },
    { n: 85, name: "JeyJey", pos: "Blitzer", stats: "5/3/3/4/10", skills: "Placar, Cabeza Dura, _Apartar_, _Defensa_ (2)" },
    { n: 92, name: "KayCee", pos: "Línea Defensa Enano", stats: "4/3/4/5/10", skills: "Placar, Placaje Defensivo, Cabeza Dura, _Defensa_, _Golpe Mortífero (+1)_ (1)" },
  ],
};

const visitor: ActaTeam = {
  name: "QUETZAL LIZZARDS", tv: "177.0", ff: 5, so: 3, asst: 0, cheer: 0, treasury: 105000, logo: logoVisitor.url,
  players: [
    { n: 1, name: "Rock", pos: "Kroxigor", stats: "6/5/5/X/10", skills: "Estúpido, Solitario (4+), Golpe Mortífero (+1), Cabeza Dura, Cola Prensil, _Abrirse Paso_, _Defensa_ (3)" },
    { n: 2, name: "Grok", pos: "Saurio", stats: "6/4/5/6/10", skills: "(2)" },
    { n: 3, name: "Grakar", pos: "Saurio", stats: "6/4/5/6/10", skills: "_Placar_, _Golpe Mortífero (+1)_, _Apartar_ (2)" },
    { n: 4, name: "Lemmak", pos: "Saurio", stats: "6/4/5/6/10", skills: "_Placar_, _Agallas_ (4)" },
    { n: 5, name: "Strong", pos: "Saurio", stats: "6/4/5/6/10", skills: "_Placaje Múltiple_ (3)" },
    { n: 6, name: "Sticky", pos: "Eslizón Camaleón", stats: "7/2/3/3/8", skills: "Escurridizo, Perseguir, Esquivar, Atento al Balón, _Esprintar_ (3)" },
    { n: 7, name: "Stitch", pos: "Eslizón Camaleón", stats: "7/2/3/3/8", skills: "Escurridizo, Perseguir, Esquivar, Atento al Balón, _Echarse a un lado_, _Placar_, _En pie de un Salto_ (4)" },
    { n: 8, name: "zimma", pos: "Línea Eslizón", stats: "8/2/3/4/7", skills: "Escurridizo, Esquivar, _Echarse a un lado_, _Placar_, _Esprintar_ (6)" },
    { n: 9, name: "rubik", pos: "Línea Eslizón", stats: "8/2/3/4/8", skills: "Escurridizo, Esquivar, _Furtivo_, _Echarse a un lado_, _Placaje Heroico_ (0)" },
    { n: 10, name: "string", pos: "Línea Eslizón", stats: "8/2/3/4/8", skills: "Escurridizo, Esquivar, _Recepción Heroica_, _Placaje Heroico_ (3)" },
    { n: 13, name: "Rom", pos: "Saurio", stats: "6/4/5/6/10", skills: "_Placar_, _Placaje Defensivo_, _Llave de Brazo_, _Defensa_ (4)" },
    { n: 14, name: "Grim", pos: "Saurio", stats: "6/4/5/6/10", skills: "(0)" },
    { n: 98, name: "Noname", pos: "Línea Eslizón", stats: "8/2/3/4/8", skills: "Escurridizo, Esquivar (0)" },
    { n: 99, name: "Noname", pos: "Línea Eslizón", stats: "8/2/3/4/8", skills: "Escurridizo, Esquivar (0)" },
  ],
};

const Skills = ({ text }: { text: string }) => (
  <>{text.split(/(_[^_]+_)/).map((p, i) => p.startsWith("_") ? <i key={i}>{p.slice(1, -1)}</i> : <span key={i}>{p}</span>)}</>
);

const TeamHeader = ({ t, side }: { t: ActaTeam; side: "l" | "r" }) => (
  <div className={`th th-${side}`}>
    {side === "l" && <img src={t.logo} className="logo" alt="" />}
    <div className="th-box">
      <div className="th-name">{t.name} ({t.tv})</div>
      <table className="grid hdr"><tbody>
        <tr><td>TD</td><td>HERIDAS</td><td style={{ width: "50%" }}>GANANCIAS</td><td>HINCHAS</td></tr>
        <tr><td>&nbsp;</td><td /><td /><td /></tr>
      </tbody></table>
    </div>
    {side === "r" && <img src={t.logo} className="logo" alt="" />}
  </div>
);

const statCols = ["COM", "TD", "INT", "INF", "CAS", "NUF", "MVP"];

const MatchActPdf = () => {
  useEffect(() => {
    document.title = "acta_372_1096740";
    const id = setTimeout(() => window.print(), 600);
    return () => clearTimeout(id);
  }, []);

  const rows = Math.max(local.players.length, visitor.players.length);
  const meta = (t: ActaTeam) => (
    <span className="meta">FF:{t.ff}, SO:{t.so}, Ayudantes:{t.asst}, Animadoras:{t.cheer}
      <img src={icoFan.url} alt="" /><img src={icoCoin.url} alt="" />{t.treasury}</span>
  );

  return (
    <div className="acta">
      <style>{css}</style>
      <div className="top">
        <TeamHeader t={local} side="l" />
        <div className="title">VILLAVERDEBOWL<br />XXIII EDITION</div>
        <TeamHeader t={visitor} side="r" />
      </div>
      <div className="metarow">
        <div className="m-l">{meta(local)}</div>
        <div className="clima">CLIMA: _____________</div>
        <div className="m-r">{meta(visitor)}</div>
      </div>

      <table className="grid main">
        <colgroup>
          <col style={{ width: 18 }} /><col style={{ width: 120 }} /><col style={{ width: 46 }} /><col style={{ width: 190 }} />
          {Array.from({ length: 16 }).map((_, i) => <col key={i} style={{ width: 25 }} />)}
          <col style={{ width: 18 }} /><col style={{ width: 120 }} /><col style={{ width: 46 }} /><col style={{ width: 190 }} />
        </colgroup>
        <thead>
          <tr>
            <th>N</th><th>NOMBRE<br />(POS)</th><th /><th>HABILIDADES</th>
            {statCols.map(c => <th key={"l" + c}>{c}</th>)}<th className="sep-r">HER.<br />REC</th>
            {statCols.map(c => <th key={"r" + c}>{c}</th>)}<th>HER.<br />REC</th>
            <th>N</th><th>NOMBRE<br />(POS)</th><th /><th>HABILIDADES</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => {
            const a = local.players[i], b = visitor.players[i];
            return (
              <tr key={i}>
                <td className="n">{a?.n}</td>
                <td className="c">{a && <>{a.name}<br /><i>({a.pos})</i></>}</td>
                <td>{a?.stats}</td>
                <td className="sk">{a && <Skills text={a.skills} />}</td>
                {Array.from({ length: 8 }).map((_, k) => <td key={"a" + k} className={k === 7 ? "sep-r" : ""} />)}
                {Array.from({ length: 8 }).map((_, k) => <td key={"b" + k} />)}
                <td className="n">{b?.n}</td>
                <td className="c">{b && <>{b.name}<br /><i>({b.pos})</i></>}</td>
                <td>{b?.stats}</td>
                <td className="sk">{b && <Skills text={b.skills} />}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="bottom">
        <div className="col1">
          <div className="pair">
            <table className="grid ref">
              <thead><tr><th colSpan={2}>LESIONES</th></tr><tr><th>D16</th><th>Resultado</th></tr></thead>
              <tbody>{[["1-6","Contusión"],["7-9","LPPE"],["10-12","Lesión Permanente"],["13-14","Perdida de Característica"],["15-16","MUERTO"]].map(r=><tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody>
            </table>
            <table className="grid ref">
              <thead><tr><th colSpan={3}>PERDIDA CARACTERISTICAS</th></tr><tr><th>D6</th><th>Resultado</th><th>Efecto</th></tr></thead>
              <tbody>{[["1-2","Herida en la cabeza","-1 AR"],["3","Menisco Destrozado","-1 MO"],["4","Brazo Fracturado","-1 PA"],["5","Herida en el Cuello","-1 AG"],["6","Hombro Dislocado","-1 FU"]].map(r=><tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
            </table>
          </div>
          <table className="grid ref txt clima-t">
            <thead><tr><th>2D6</th><th>CLIMA</th></tr></thead>
            <tbody>
              <tr><td>2</td><td><b>Calor asfixiante</b>: 1d3 jugadores pasan a reserva y no pueden pueden jugar la siguiente entrada.</td></tr>
              <tr><td>3</td><td><b>Muy soleado</b>: -1 a las tiradas en las que se usa el atributo PASE.</td></tr>
              <tr><td>4-10</td><td><b>Día perfecto</b></td></tr>
              <tr><td>11</td><td><b>Lluvioso</b>: -1 a las tiradas de AG para coger el balón del suelo, atrapar o interferir un pase</td></tr>
              <tr><td>12</td><td><b>Ventisca</b>: 1 ó 2 fallo a por ellos. Sólo pases Rápidos y Cortos.</td></tr>
            </tbody>
          </table>
        </div>

        <table className="grid ref txt kick">
          <thead><tr><th>2D6</th><th>PATADA INICIAL</th></tr></thead>
          <tbody>
            <tr><td>2</td><td><b>A por el Árbitro</b>: Cada equipo recibe un soborno adicional para ser usado durante el partido. El soborno podrá usarse para evitar la expulsión tras una falta o usar armas secretas. Tira 1D6: 2-6 el soborno hará efecto, 1 no y se podrá volver a protestar.</td></tr>
            <tr><td>3</td><td><b>Disturbios</b>: Si el equipo pateador está en el turno 6, 7 o 8, ambos retrasan un turno; si no, avanza un turno.</td></tr>
            <tr><td>4</td><td><b>Defensa perfecta</b>: El equipo pateador recoloca 1d3+3 jugadores que no estén en zona de defensa rival.</td></tr>
            <tr><td>5</td><td><b>Patada alta</b>: Un jugador del equipo receptor que no esté en la zona de defensa de un jugador contrario podrá situarse en la casilla donde vaya a aterrizar el balón, siempre que esta casilla esté vacía</td></tr>
            <tr><td>6</td><td><b>Los Hinchas Animan</b>: 1D6 + Animadoras. Resultado mayor recibe una tirada en plegarias de Nuffle. En caso de empate: nada.</td></tr>
            <tr><td>7</td><td><b>Táctica brillante</b>: 1D6 + ayudantes de entrenador. El total más alto recibe una segunda oportunidad para esta entrada (si no la usa la pierde). Empate, ninguno.</td></tr>
            <tr><td>8</td><td><b>Clima variable</b>: Repetir Clima. Si el resultado es <i>Día perfecto</i>, la pelota se desvía 3d8 antes de aterrizar.</td></tr>
            <tr><td>9</td><td><b>Anticipación:</b>: El equipo receptor puede mover 1d3+3 jugadores a su elección (siempre que no estén en zona de defensa de un rival) una casilla. Puede emplearse para entrar en la mitad del campo contrario</td></tr>
            <tr><td>10</td><td><b>¡Penetración!</b>: El equipo lanzador recibe un turno “adicional” de manera gratuita. Sólo podrán actuar 1d3+3 jugadores que no se encuentren en una zona de defensa contraria al inicio de este turno adicional. El equipo lanzador puede utilizar segundas oportunidades de equipo durante la Penetración. Si cualquier jugador provoca un cambio de turno, este turno adicional terminará inmediatamente.</td></tr>
            <tr><td>11</td><td><b>Árbitro Estricto</b>: 1D6 + Fan Factor. Resultado más bajo selecciona a un jugador aleatorio y 1d6: 1 expulsado; 2-6 boca abajo. En caso de empate, ambos equipos seleccionan un jugador.</td></tr>
            <tr><td>12</td><td><b>Invasión del campo</b>: 1D6 + Fan Factor. El más bajo 1d3 jugadore aleatorios boca abajo. EN caso de empate, ambos equipos 1d3 aleatorio boca abajo.</td></tr>
          </tbody>
        </table>

        <table className="grid ref txt seq">
          <thead><tr><th colSpan={2}>SECUENCIA</th></tr></thead>
          <tbody>
            <tr><td>1</td><td><b>Fan Factor</b>: 1D3 + Fans Dedicados</td></tr>
            <tr><td>2</td><td><b>Clima</b>: 2D6</td></tr>
            <tr><td>3</td><td><b>Añadir solitarios</b>: Obligatorio tener hasta 11 jugadores. Cuentan TV</td></tr>
            <tr><td>4</td><td><b>Incentivos</b>Se calcula TV. El menor suma su diferencia para gastar:<br /><i>Añadir Tesoria</i> Cada entrenador puede meter monedas.<br /><i>Comprar Incentivos</i>Cada entrenador gasta el dinero en incentivos.<br /><i>Recalcular TV</i>El equipo con menor TV gana una tirada en plegarias de Nuffle por cada 50k de diferencia</td></tr>
            <tr><td>5</td><td><b>Tiradas en tabla plegarias Nuffle</b></td></tr>
            <tr><td>6</td><td><b>Determina uién saca</b>: 2D6 superior</td></tr>
            <tr><td>7</td><td><b>JUGAR PARTIDO</b></td></tr>
            <tr><td>8</td><td><b>Sube el acta</b>:<br />Y que tu rival valide tras comprobarlo</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Fixed print palette: this page replicates a paper form, independent of the app theme.
const css = `
@page { size: A4 landscape; margin: 6mm; }
html, body { background: #fff; }
.acta { width: 285mm; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; color: #000; background: #fff; font-size: 7.6pt; padding: 4mm 0; }
.acta .top { display: flex; justify-content: space-between; align-items: flex-start; }
.acta .th { display: flex; align-items: center; gap: 6px; width: 105mm; }
.acta .th-l { margin-left: 2mm; } .acta .th-r { margin-right: 2mm; }
.acta .logo { width: 15mm; height: 13mm; object-fit: contain; }
.acta .th-box { flex: 1; }
.acta .th-name { text-align: center; font-weight: bold; font-size: 10pt; margin-bottom: 2px; }
.acta .title { text-align: center; font-weight: bold; font-size: 13pt; line-height: 1.15; margin-top: 2mm; }
.acta table.grid { border-collapse: collapse; }
.acta table.grid td, .acta table.grid th { border: 1px solid #000; padding: 1px 2px; vertical-align: top; }
.acta .hdr { width: 100%; } .acta .hdr td { text-align: center; height: 11px; font-size: 7pt; }
.acta .metarow { display: flex; justify-content: space-between; align-items: flex-end; margin: 4px 0 2px; }
.acta .m-l { width: 100mm; text-align: right; } .acta .m-r { width: 98mm; }
.acta .meta img { height: 11px; vertical-align: middle; margin: 0 1px; }
.acta .clima { padding-top: 8px; }
.acta .main { width: 100%; table-layout: fixed; font-size: 7.2pt; }
.acta .main th { font-weight: normal; text-align: center; }
.acta .main td { height: 28px; }
.acta .main td.c { text-align: center; }
.acta .main td.sk { line-height: 1.15; }
.acta .main .sep-r { border-right: 3px double #000; }
.acta .bottom { display: flex; gap: 12mm; margin-top: 4mm; padding-left: 3mm; align-items: flex-start; }
.acta .col1 { width: 78mm; }
.acta .pair { display: flex; gap: 3mm; margin-bottom: 7mm; }
.acta .ref { font-size: 6pt; }
.acta .ref th { background: #b2f5b2; font-weight: normal; text-align: center; }
.acta .ref td { text-align: center; padding: 2px 3px; }
.acta .ref.txt td:last-child { text-align: left; }
.acta .pair .ref:first-child { width: 37mm; } .acta .pair .ref:last-child { width: 40mm; }
.acta .clima-t { width: 75mm; }
.acta .kick { width: 150mm; }
.acta .seq { width: 42mm; margin-left: auto; margin-right: 3mm; }
@media print { .acta { padding: 0; } }
`;

export default MatchActPdf;
