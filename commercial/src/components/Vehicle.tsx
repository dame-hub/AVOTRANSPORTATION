import { interpolateColors } from "remotion";
import { C } from "../theme";

// Customer pickup. dirt: 1 = muddy, 0 = showroom clean.
export const Vehicle: React.FC<{ dirt: number; body?: string }> = ({ dirt, body = "#2f6fb0" }) => {
  const col = interpolateColors(dirt, [0, 1], [body, "#766347"]);
  const dark = interpolateColors(dirt, [0, 1], ["#234f80", "#5c4d36"]);
  return (
    <svg viewBox="0 0 470 250" width="100%" style={{ display: "block", overflow: "visible" }}>
      <ellipse cx="235" cy="232" rx="205" ry="18" fill="#000" opacity="0.18" />
      <rect x="36" y="126" width="226" height="78" rx="12" fill={col} stroke={dark} strokeWidth="4" />
      <path d="M256,204 L256,92 Q258,74 278,72 L366,72 Q388,74 404,116 L432,128 L432,204 Z" fill={col} stroke={dark} strokeWidth="4" />
      <path d="M286,108 L360,108 L376,122 L286,122 Z" fill={C.window} stroke={dark} strokeWidth="3" />
      <Wheel cx={120} />
      <Wheel cx={372} />
      {/* mud (dirty) */}
      <g opacity={dirt}>
        {([[80, 162, 16], [150, 182, 12], [210, 150, 14], [300, 160, 15], [360, 172, 11], [110, 192, 10]] as const).map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#5e4f39" opacity="0.8" />
        ))}
        <path d="M40,196 q40,-12 90,0 q60,12 130,0" stroke="#5e4f39" strokeWidth="8" fill="none" opacity="0.6" />
      </g>
      {/* shine (clean) */}
      <g opacity={1 - dirt}>
        <rect x="60" y="138" width="80" height="9" rx="4" fill="#fff" opacity="0.55" />
        <rect x="280" y="132" width="50" height="8" rx="4" fill="#fff" opacity="0.5" />
      </g>
    </svg>
  );
};

const Wheel: React.FC<{ cx: number }> = ({ cx }) => (
  <g>
    <circle cx={cx} cy={206} r="40" fill="#181c22" />
    <circle cx={cx} cy={206} r="18" fill="#6b727c" />
  </g>
);
