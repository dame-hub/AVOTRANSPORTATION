import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../theme";

// Comic-style sound-effect burst word. Pops in, holds, fades. Wrap in a <Sequence>.
export const Sfx: React.FC<{
  text: string;
  color?: string;
  rotate?: number;
  fontSize?: number;
  hold?: number;
}> = ({ text, color = C.orange, rotate = -8, fontSize = 96, hold = 16 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 9, mass: 0.55 }, durationInFrames: 12 });
  const s = interpolate(pop, [0, 1], [0.1, 1]);
  const out = interpolate(frame, [hold, hold + 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ transform: `scale(${s}) rotate(${rotate}deg)`, opacity: out, position: "relative" }}>
      <svg viewBox="0 0 220 220" width="320" height="320" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", overflow: "visible" }}>
        <Burst color={C.sun} />
      </svg>
      <div
        style={{
          position: "relative",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize,
          color,
          WebkitTextStroke: `5px ${C.ink}`,
          paintOrder: "stroke fill",
          textShadow: `5px 6px 0 ${C.ink}`,
          letterSpacing: 1,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const Burst: React.FC<{ color: string }> = ({ color }) => {
  const pts: string[] = [];
  const spikes = 14;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 108 : 66;
    const a = (Math.PI / spikes) * i;
    pts.push(`${110 + r * Math.cos(a)},${110 + r * Math.sin(a)}`);
  }
  return <polygon points={pts.join(" ")} fill={color} stroke={C.ink} strokeWidth="5" strokeLinejoin="round" />;
};
