import { C, FONT } from "../theme";

export const Truck: React.FC = () => {
  return (
    <svg viewBox="0 0 780 440" width="100%" style={{ display: "block" }}>
      {/* shadow */}
      <ellipse cx="390" cy="412" rx="345" ry="24" fill="#000" opacity="0.18" />
      {/* wheels */}
      <Wheel cx={205} cy={362} />
      <Wheel cx={590} cy={362} />
      {/* cargo box */}
      <rect x="250" y="78" width="478" height="246" rx="18" fill={C.orange} stroke={C.orangeDark} strokeWidth="6" />
      <rect x="262" y="90" width="454" height="26" rx="10" fill={C.orangeLight} opacity="0.7" />
      <line x1="500" y1="120" x2="500" y2="316" stroke={C.orangeDark} strokeWidth="4" opacity="0.5" />
      <line x1="690" y1="120" x2="690" y2="316" stroke={C.orangeDark} strokeWidth="4" opacity="0.5" />
      {/* cab */}
      <polygon points="70,324 70,206 112,168 250,168 250,324" fill={C.orange} stroke={C.orangeDark} strokeWidth="6" strokeLinejoin="round" />
      <polygon points="120,206 242,206 242,252 120,252" fill={C.window} stroke={C.orangeDark} strokeWidth="3" />
      {/* bumper + headlight */}
      <rect x="52" y="300" width="26" height="34" rx="6" fill={C.ink} />
      <circle cx="92" cy="300" r="12" fill={C.sun} stroke={C.orangeDark} strokeWidth="3" />
      {/* AVO wordmark */}
      <text x="489" y="236" textAnchor="middle" fontFamily={FONT} fontSize="118" fontWeight="900" fill={C.white} letterSpacing="2">
        AVO<tspan fill={C.cream}>.</tspan>
      </text>
    </svg>
  );
};

const Wheel: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => (
  <g>
    <circle cx={cx} cy={cy} r="60" fill="#181c22" />
    <circle cx={cx} cy={cy} r="28" fill="#6b727c" />
    <circle cx={cx} cy={cy} r="10" fill="#3a3f47" />
  </g>
);
