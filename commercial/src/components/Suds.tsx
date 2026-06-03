import { interpolate, random, useCurrentFrame } from "remotion";

// Rising / popping soap bubbles across a w×h area.
export const Suds: React.FC<{ w: number; h: number; count?: number }> = ({ w, h, count = 22 }) => {
  const f = useCurrentFrame();
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", overflow: "visible" }}>
      {new Array(count).fill(0).map((_, i) => {
        const bx = random(`bx${i}`) * w;
        const t = (f * 0.04 + random(`bp${i}`)) % 1;
        const by = h - t * h * 1.05;
        const r = 8 + random(`br${i}`) * 22;
        const op = interpolate(t, [0, 0.85, 1], [0.85, 0.85, 0]);
        return (
          <g key={i}>
            <circle cx={bx} cy={by} r={r} fill="#ffffff" opacity={op * 0.85} />
            <circle cx={bx - r * 0.3} cy={by - r * 0.3} r={r * 0.28} fill="#ffffff" opacity={op} />
          </g>
        );
      })}
    </svg>
  );
};
