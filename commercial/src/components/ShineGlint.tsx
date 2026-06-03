import { interpolate, useCurrentFrame } from "remotion";

// A diagonal gleam that sweeps once across a w×h region (clipped to it).
export const ShineGlint: React.FC<{ w: number; h: number; delay?: number; dur?: number }> = ({
  w,
  h,
  delay = 0,
  dur = 22,
}) => {
  const f = useCurrentFrame() - delay;
  if (f < 0 || f > dur) return null;
  const p = f / dur;
  const x = interpolate(p, [0, 1], [-w * 0.4, w * 1.1]);
  const op = interpolate(p, [0, 0.3, 0.7, 1], [0, 0.85, 0.85, 0]);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", overflow: "hidden" }}>
      <g transform={`translate(${x} 0) skewX(-18)`} opacity={op}>
        <rect x="0" y={-h * 0.2} width={w * 0.1} height={h * 1.4} fill="#ffffff" opacity="0.85" />
        <rect x={w * 0.15} y={-h * 0.2} width={w * 0.05} height={h * 1.4} fill="#ffffff" opacity="0.6" />
      </g>
    </svg>
  );
};
