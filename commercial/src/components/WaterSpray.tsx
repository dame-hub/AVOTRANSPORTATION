import { interpolate, random, useCurrentFrame } from "remotion";

// Cone of water droplets from origin (0,0). dir=1 sprays down-right, dir=-1 down-left.
export const WaterSpray: React.FC<{ len?: number; dir?: number; color?: string; n?: number }> = ({
  len = 240,
  dir = 1,
  color = "#cdeeff",
  n = 18,
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute" }}>
      <svg width={len * 1.6} height={len * 1.4} style={{ overflow: "visible", transform: `scaleX(${dir})` }}>
        {new Array(n).fill(0).map((_, i) => {
          const t = (f * 0.07 + random(`d${i}`)) % 1;
          const a = (40 + (random(`s${i}`) - 0.5) * 48) * (Math.PI / 180);
          const dist = t * len * (0.7 + random(`v${i}`) * 0.5);
          const x = Math.cos(a) * dist;
          const y = Math.sin(a) * dist;
          const r = interpolate(t, [0, 1], [6, 2]);
          const op = interpolate(t, [0, 0.85, 1], [0.95, 0.7, 0]);
          return <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={op} />;
        })}
        {[-12, 0, 12].map((d, i) => {
          const a = (40 + d) * (Math.PI / 180);
          return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 80} y2={Math.sin(a) * 80} stroke={color} strokeWidth={5} opacity={0.45} strokeLinecap="round" />;
        })}
      </svg>
    </div>
  );
};
