import { useCurrentFrame } from "remotion";
import { C, W, H } from "../theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const cloud = (off: number, speed: number) =>
    (((frame * speed + off) % (W + 400)) - 200);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.skyTop} />
          <stop offset="1" stopColor={C.skyBot} />
        </linearGradient>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.grass} />
          <stop offset="1" stopColor={C.grassDark} />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect x="0" y="0" width={W} height={1200} fill="url(#sky)" />

      {/* sun */}
      <circle cx="170" cy="180" r="120" fill={C.sun} opacity="0.95" />
      <circle cx="170" cy="180" r="160" fill={C.sun} opacity="0.18" />

      {/* clouds */}
      <Cloud x={cloud(0, 0.25)} y={220} s={1.1} />
      <Cloud x={cloud(620, 0.18)} y={360} s={0.8} />
      <Cloud x={cloud(980, 0.32)} y={150} s={0.65} />

      {/* grass */}
      <rect x="0" y="1180" width={W} height={H - 1180} fill="url(#grass)" />
      <rect x="0" y="1180" width={W} height="14" fill={C.grassDark} />

      {/* driveway (garage -> foreground) */}
      <polygon
        points="360,1190 600,1190 760,1920 200,1920"
        fill={C.drive}
      />
      <polygon points="360,1190 600,1190 612,1240 348,1240" fill={C.driveEdge} />

      {/* house */}
      <g>
        {/* roof */}
        <polygon points="120,720 540,540 960,720" fill={C.roof} />
        <polygon points="120,720 540,540 540,560 150,730" fill={C.roofDark} />
        {/* wall */}
        <rect x="170" y="710" width="740" height="480" fill={C.houseWall} />
        <rect x="170" y="710" width="740" height="480" fill="none" stroke={C.roofDark} strokeWidth="3" opacity="0.25" />
        {/* garage door */}
        <rect x="360" y="900" width="240" height="290" rx="8" fill={C.garage} stroke={C.garageLine} strokeWidth="4" />
        <line x1="360" y1="970" x2="600" y2="970" stroke={C.garageLine} strokeWidth="4" />
        <line x1="360" y1="1040" x2="600" y2="1040" stroke={C.garageLine} strokeWidth="4" />
        <line x1="360" y1="1110" x2="600" y2="1110" stroke={C.garageLine} strokeWidth="4" />
        {/* front door */}
        <rect x="690" y="980" width="120" height="210" rx="6" fill={C.door} />
        <circle cx="790" cy="1090" r="7" fill={C.cream} />
        {/* windows */}
        <Window x={240} y={820} />
        <Window x={700} y={780} />
      </g>

      {/* tree */}
      <g>
        <rect x="935" y="980" width="46" height="210" fill={C.trunk} />
        <circle cx="958" cy="930" r="120" fill={C.tree} />
        <circle cx="880" cy="980" r="80" fill={C.treeDark} />
        <circle cx="1030" cy="975" r="78" fill={C.treeDark} />
        <circle cx="958" cy="900" r="92" fill={C.tree} />
      </g>
    </svg>
  );
};

const Cloud: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="0" cy="0" rx="120" ry="55" fill="#ffffff" />
    <ellipse cx="90" cy="15" rx="90" ry="45" fill="#ffffff" />
    <ellipse cx="-90" cy="18" rx="80" ry="40" fill="#ffffff" />
    <ellipse cx="0" cy="30" rx="150" ry="40" fill="#f3f9ff" />
  </g>
);

const Window: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <rect x={x} y={y} width="120" height="120" rx="8" fill={C.window} stroke={C.windowFrame} strokeWidth="8" />
    <line x1={x + 60} y1={y} x2={x + 60} y2={y + 120} stroke={C.windowFrame} strokeWidth="8" />
    <line x1={x} y1={y + 60} x2={x + 120} y2={y + 60} stroke={C.windowFrame} strokeWidth="8" />
  </g>
);
