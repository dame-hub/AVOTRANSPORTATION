import { interpolate, random, useCurrentFrame } from "remotion";
import { C, W } from "../theme";

// Expanding dust cloud (e.g. truck arrival, fast feet). Wrap in a positioned <Sequence>.
export const DustPuff: React.FC = () => {
  const f = useCurrentFrame();
  const puffs = [
    { dx: -34, dy: 0, d: 0 },
    { dx: 22, dy: -8, d: 2 },
    { dx: 2, dy: 8, d: 4 },
    { dx: 48, dy: 2, d: 3 },
    { dx: -12, dy: -4, d: 6 },
  ];
  return (
    <svg viewBox="0 0 220 160" width="260" style={{ overflow: "visible", display: "block" }}>
      {puffs.map((p, i) => {
        const t = interpolate(f - p.d, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const r = interpolate(t, [0, 1], [6, 42]);
        const o = interpolate(t, [0, 1], [0.55, 0]);
        return <circle key={i} cx={110 + p.dx * (0.4 + t)} cy={130 + p.dy - t * 26} r={r} fill="#d8c6a8" opacity={o} />;
      })}
    </svg>
  );
};

// Horizontal "speed" streaks for the hauling montage.
export const SpeedLines: React.FC<{ top: number; height: number }> = ({ top, height }) => {
  const f = useCurrentFrame();
  const lines = new Array(11).fill(0).map((_, i) => i);
  return (
    <svg viewBox={`0 0 ${W} ${height}`} width={W} height={height} style={{ position: "absolute", top, left: 0 }}>
      {lines.map((i) => {
        const y = random(`y${i}`) * (height - 40) + 20;
        const len = 120 + random(`l${i}`) * 240;
        const speed = 34 + random(`s${i}`) * 44;
        const x = W - ((f * speed + random(`o${i}`) * W) % (W + 460));
        const op = 0.1 + 0.18 * ((Math.sin(f * 0.6 + i) + 1) / 2);
        return <rect key={i} x={x} y={y} width={len} height={7} rx={4} fill="#ffffff" opacity={op} />;
      })}
    </svg>
  );
};

// Twinkling sparkle (the "clean!" beat).
export const Sparkle: React.FC<{ x: number; y: number; delay?: number; size?: number }> = ({ x, y, delay = 0, size = 60 }) => {
  const f = useCurrentFrame() - delay;
  const t = interpolate(((f % 34) + 34) % 34, [0, 17, 34], [0, 1, 0]);
  const s = 0.5 + t * 0.9;
  return (
    <svg viewBox="0 0 40 40" width={size} style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
      <g transform={`translate(20 20) scale(${s})`} opacity={t}>
        <path d="M0,-18 L4,-4 L18,0 L4,4 L0,18 L-4,4 L-18,0 L-4,-4 Z" fill="#fff7d6" stroke={C.sun} strokeWidth="2" />
      </g>
    </svg>
  );
};
