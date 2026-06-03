import { C, W, H } from "../theme";

// Inside-the-house living room: wall, wood floor, window, art, doorway (right), rug.
export const Interior: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#efe3d0" />
        <stop offset="1" stopColor="#e4d6be" />
      </linearGradient>
      <linearGradient id="winSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9fd6f5" />
        <stop offset="0.7" stopColor="#cfeeff" />
        <stop offset="0.72" stopColor="#86c55f" />
        <stop offset="1" stopColor="#6fae49" />
      </linearGradient>
    </defs>

    {/* wall + floor */}
    <rect x="0" y="0" width={W} height="1268" fill="url(#wall)" />
    <rect x="0" y="1268" width={W} height={H - 1268} fill="#c89a61" />
    {[150, 310, 470, 630, 790, 950].map((x) => (
      <line key={x} x1={x} y1="1268" x2={x} y2={H} stroke="#b3854f" strokeWidth="3" opacity="0.6" />
    ))}
    <rect x="0" y="1268" width={W} height="12" fill="#000" opacity="0.08" />
    <rect x="0" y="1240" width={W} height="30" fill="#f6f0e4" />

    {/* window with a backyard view */}
    <rect x="110" y="360" width="380" height="330" rx="8" fill="#ffffff" stroke="#d6cab6" strokeWidth="10" />
    <rect x="128" y="378" width="344" height="294" fill="url(#winSky)" />
    <line x1="300" y1="378" x2="300" y2="672" stroke="#fff" strokeWidth="12" />
    <line x1="128" y1="525" x2="472" y2="525" stroke="#fff" strokeWidth="12" />
    <rect x="96" y="690" width="408" height="18" rx="6" fill="#e7dcc8" />
    <path d="M110,356 q42,180 -6,338 l-46,0 l0,-340 Z" fill="#cf7d4e" opacity="0.92" />
    <path d="M490,356 q-42,180 6,338 l46,0 l0,-340 Z" fill="#cf7d4e" opacity="0.92" />

    {/* framed art */}
    <rect x="640" y="430" width="270" height="200" rx="6" fill="#8a5a3b" />
    <rect x="658" y="448" width="234" height="164" fill="#e9ddc9" />
    <circle cx="722" cy="540" r="34" fill={C.orange} />
    <rect x="772" y="512" width="100" height="68" rx="8" fill="#5b8a72" />

    {/* doorway (right) — where people enter */}
    <rect x="930" y="470" width="150" height="800" fill="#b6a98f" />
    <rect x="952" y="492" width="128" height="778" fill="#cdbfa9" />

    {/* rug */}
    <ellipse cx="520" cy="1648" rx="380" ry="96" fill="#aebfcf" />
    <ellipse cx="520" cy="1648" rx="380" ry="96" fill="none" stroke="#8ea3b6" strokeWidth="10" />
    <ellipse cx="520" cy="1648" rx="300" ry="70" fill="none" stroke="#c8d4df" strokeWidth="8" />
  </svg>
);
