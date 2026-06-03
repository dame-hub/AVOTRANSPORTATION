import { C, W, H } from "../theme";

// Backyard: sky, fence, lawn, a wooden deck (foreground = the wash surface),
// the back of the house on the left with a sliding glass door, a potted plant.
export const Backyard: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
    <defs>
      <linearGradient id="bsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.skyTop} />
        <stop offset="1" stopColor={C.skyBot} />
      </linearGradient>
      <linearGradient id="bgrass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.grass} />
        <stop offset="1" stopColor={C.grassDark} />
      </linearGradient>
    </defs>

    <rect x="0" y="0" width={W} height="770" fill="url(#bsky)" />
    <circle cx="910" cy="170" r="96" fill={C.sun} opacity="0.95" />

    {/* trees behind fence */}
    <circle cx="250" cy="520" r="110" fill={C.treeDark} />
    <circle cx="770" cy="510" r="120" fill={C.treeDark} />

    {/* fence */}
    <rect x="0" y="560" width={W} height="210" fill="#caa771" />
    {Array.from({ length: 23 }).map((_, i) => (
      <rect key={i} x={i * 48} y="548" width="40" height="224" rx="6" fill="#c19a63" stroke="#a87f4c" strokeWidth="2" />
    ))}
    <rect x="0" y="602" width={W} height="14" fill="#a87f4c" />
    <rect x="0" y="724" width={W} height="14" fill="#a87f4c" />

    {/* lawn */}
    <rect x="0" y="770" width={W} height="420" fill="url(#bgrass)" />

    {/* deck (foreground) */}
    <rect x="0" y="1150" width={W} height={H - 1150} fill="#b9854f" />
    {Array.from({ length: 9 }).map((_, i) => (
      <line key={i} x1="0" y1={1150 + i * 86} x2={W} y2={1150 + i * 86} stroke="#9c6c3c" strokeWidth="4" opacity="0.6" />
    ))}
    <rect x="0" y="1150" width={W} height="16" fill="#caa06a" />

    {/* house wall + sliding glass door (left) */}
    <rect x="0" y="250" width="360" height="900" fill="#ece0cd" />
    <rect x="0" y="250" width="360" height="900" fill="#000" opacity="0.04" />
    <rect x="40" y="560" width="280" height="590" rx="6" fill="#8aa6b8" stroke="#6f8a9b" strokeWidth="8" />
    <rect x="54" y="574" width="120" height="562" fill="#bfe6ff" opacity="0.85" />
    <rect x="186" y="574" width="120" height="562" fill="#a9d8f5" opacity="0.85" />
    <rect x="176" y="760" width="14" height="120" rx="6" fill="#5f7a8b" />

    {/* potted plant (right) */}
    <rect x="930" y="1070" width="90" height="92" rx="10" fill="#b5613a" />
    <circle cx="975" cy="1040" r="58" fill={C.tree} />
    <circle cx="936" cy="1060" r="38" fill={C.treeDark} />
    <circle cx="1014" cy="1058" r="38" fill={C.treeDark} />
  </svg>
);
