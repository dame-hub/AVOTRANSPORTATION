import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Backyard } from "./components/Backyard";
import { Crew } from "./components/Crew";
import { Customer } from "./components/Customer";
import { SpeechBubble } from "./components/SpeechBubble";
import { Sfx } from "./components/Sfx";
import { Sparkle } from "./components/Effects";
import { WaterSpray } from "./components/WaterSpray";
import { PressureWasher } from "./components/PressureWasher";
import { ServiceTag, Lower, Stamp } from "./components/Captions";
import { EndCard } from "./components/EndCard";
import { C, W } from "./theme";

const S2 = 46, S3 = 96, S4 = 250, S5 = 372;
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

export const DeckWash: React.FC = () => {
  const frame = useCurrentFrame();
  const wash = interpolate(frame, [S3, S3 + 150], [0, 1], clamp);
  const front = interpolate(wash, [0, 1], [0, W * 0.98]);
  const crewX = interpolate(wash, [0, 1], [90, 720]);
  const wandY = 1360 + Math.sin(frame * 0.5) * 120;

  return (
    <AbsoluteFill style={{ backgroundColor: C.skyBot }}>
      <Backyard />

      {/* dirty -> clean deck */}
      <svg viewBox={`0 0 ${W} 1920`} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs><clipPath id="deckrev"><rect x="0" y="1150" width={Math.max(0, front)} height="770" /></clipPath></defs>
        <rect x="0" y="1150" width={W} height="770" fill="#8f7a55" />
        <ellipse cx="300" cy="1450" rx="200" ry="70" fill="#6f5f42" opacity="0.5" />
        <ellipse cx="760" cy="1650" rx="240" ry="80" fill="#6f5f42" opacity="0.45" />
        <ellipse cx="520" cy="1780" rx="200" ry="70" fill="#5f5238" opacity="0.4" />
        <g clipPath="url(#deckrev)">
          <rect x="0" y="1150" width={W} height="770" fill="#caa06a" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="0" y1={1150 + i * 86} x2={W} y2={1150 + i * 86} stroke="#b3854f" strokeWidth="4" opacity="0.6" />
          ))}
          <rect x="0" y="1150" width={W} height="16" fill="#d8b582" />
        </g>
      </svg>

      {/* sparkles on the cleaned strip */}
      {frame >= S3 && frame < S4 && wash > 0.12 && (
        <>
          <Sparkle x={130} y={1280} />
          <Sparkle x={320} y={1380} delay={8} />
          <Sparkle x={520} y={1320} delay={16} />
        </>
      )}

      {/* washer crew moving across the deck */}
      {frame >= S2 - 6 && frame < S4 && (
        <>
          <div style={{ position: "absolute", left: crewX - 150, top: 1230, width: 205 }}>
            <Crew skin={C.skin1} capColor={C.orange} expr="cool" armL={-26} armR={18 + Math.sin(frame * 0.5) * 14} legL={6} legR={-6} />
          </div>
          <div style={{ position: "absolute", left: crewX - 44, top: 1356, width: 205, transform: "rotate(10deg)" }}><PressureWasher /></div>
          <div style={{ position: "absolute", left: front, top: wandY }}><WaterSpray len={200} dir={1} /></div>
        </>
      )}

      {/* crew posing on the right after the wash */}
      {frame >= S4 && (
        <>
          <div style={{ position: "absolute", left: 560, top: 1300, width: 210 }}><Crew skin={C.skin1} capColor={C.orange} expr="cool" armL={62} armR={-22} legL={6} legR={-6} /></div>
          <div style={{ position: "absolute", left: 800, top: 1300, width: 210 }}><Crew skin={C.skin3} capColor={C.orange} expr="grin" armL={20} armR={-16} legL={6} legR={-6} /></div>
        </>
      )}

      {/* SFX */}
      <Sequence from={S3 + 14} durationInFrames={26}><div style={{ position: "absolute", left: 520, top: 1300 }}><Sfx text="SPLOOSH!" rotate={-8} fontSize={80} /></div></Sequence>
      <Sequence from={S3 + 92} durationInFrames={26}><div style={{ position: "absolute", left: 300, top: 1260 }}><Sfx text="SHINE!" color={C.orange} rotate={8} /></div></Sequence>

      {/* context */}
      <Sequence from={6} durationInFrames={64}><ServiceTag>PRESSURE WASHING</ServiceTag></Sequence>
      <Sequence from={S2 + 2} durationInFrames={58}><Lower eyebrow="DECKS · PATIOS · FENCES">Bring the grime — we&rsquo;ll bring the shine.</Lower></Sequence>
      <Sequence from={20} durationInFrames={66}><div style={{ position: "absolute", left: 640, top: 1250 }}><Stamp text="BEFORE" /></div></Sequence>
      <Sequence from={S3 + 120} durationInFrames={70}><div style={{ position: "absolute", left: 640, top: 1250 }}><Stamp text="AFTER" color="#1f7a4d" /></div></Sequence>

      {/* customer exits the sliding door (left) */}
      <CustomerLayer frame={frame} />
      <Sequence from={S4 + 8} durationInFrames={46}><Bubble x={90} y={1000} w={600} tail="left">Is that the <span style={{ color: C.orange }}>SAME deck?!</span></Bubble></Sequence>
      <Sequence from={S4 + 54} durationInFrames={34}><Bubble x={480} y={1120} w={470} tail="right">Grime? <span style={{ color: C.orange }}>Gone.</span></Bubble></Sequence>
      <Sequence from={S4 + 88} durationInFrames={36}><Bubble x={90} y={1000} w={540} tail="left">It&rsquo;s <span style={{ color: C.orange }}>GLOWING!</span></Bubble></Sequence>

      {/* end card */}
      <Sequence from={S5}><Flash /><EndCard headline={<>LIKE NEW. <span style={{ color: C.orange }}>AGAIN.</span></>} /></Sequence>
    </AbsoluteFill>
  );
};

const CustomerLayer: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < S4) return null;
  const f = frame - S4;
  const slideX = interpolate(f, [0, 18], [-130, 0], clamp);
  const op = interpolate(f, [0, 12], [0, 1], clamp);
  const wob = Math.sin(f * 0.8) * (f > 6 && f < 26 ? 5 : 0);
  return (
    <div style={{ position: "absolute", left: 90 + slideX, top: 1300, width: 240, opacity: op }}>
      <Customer expr="shock" lean={wob} armR={-26 + Math.sin(f * 0.5) * 8} />
    </div>
  );
};

const Bubble: React.FC<{ x: number; y: number; w: number; tail: "down" | "left" | "right"; children: React.ReactNode }> = ({ x, y, w, tail, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w }}><SpeechBubble width={w} tail={tail}>{children}</SpeechBubble></div>
);

const Flash: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 4, 12], [0.9, 0.5, 0], clamp);
  return <AbsoluteFill style={{ backgroundColor: "#fff", opacity: o }} />;
};
