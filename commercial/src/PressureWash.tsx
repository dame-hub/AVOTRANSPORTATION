import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "./components/Background";
import { Truck } from "./components/Truck";
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
const DRIVE = "360,1190 600,1190 760,1920 200,1920";

export const PressureWash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 13, mass: 1.1 }, durationInFrames: 40 });
  const truckLeft = interpolate(enter, [0, 1], [W + 360, 130]);

  const wash = interpolate(frame, [S3, S3 + 150], [0, 1], clamp);
  const frontY = 1190 + wash * 700;
  const wandX = 470 + Math.sin(frame * 0.5) * (130 + wash * 150);
  const washing = frame >= S2 - 4 && frame < S4;

  return (
    <AbsoluteFill style={{ backgroundColor: C.skyBot }}>
      <Background />

      {/* dirty -> clean driveway */}
      <svg viewBox={`0 0 ${W} 1920`} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <clipPath id="dw"><polygon points={DRIVE} /></clipPath>
          <clipPath id="rev"><rect x="0" y="1190" width={W} height={Math.max(0, frontY - 1190)} /></clipPath>
        </defs>
        <g clipPath="url(#dw)">
          <polygon points={DRIVE} fill="#8d876f" />
          <ellipse cx="320" cy="1520" rx="130" ry="54" fill="#6f6a55" opacity="0.5" />
          <ellipse cx="610" cy="1720" rx="170" ry="64" fill="#6f6a55" opacity="0.45" />
          <ellipse cx="470" cy="1330" rx="96" ry="40" fill="#5f5b48" opacity="0.45" />
          <g clipPath="url(#rev)">
            <polygon points={DRIVE} fill="#eef1f4" />
          </g>
        </g>
      </svg>

      {/* truck */}
      <div style={{ position: "absolute", top: 1440, left: truckLeft, width: 740 }}><Truck /></div>

      {/* sparkles on the cleaned strip */}
      {washing && wash > 0.12 && (
        <>
          <Sparkle x={330} y={1300} />
          <Sparkle x={650} y={1380} delay={8} />
          <Sparkle x={470} y={1480} delay={15} />
        </>
      )}

      {/* the washer crew + jet */}
      {frame >= S2 - 6 && frame < S4 && (
        <>
          <div style={{ position: "absolute", left: 250, top: 1150, width: 210 }}>
            <Crew skin={C.skin1} capColor={C.orange} expr="cool" armL={-26} armR={18 + Math.sin(frame * 0.5) * 14} legL={6} legR={-6} />
          </div>
          <div style={{ position: "absolute", left: 360, top: 1280, width: 210, transform: "rotate(8deg)" }}>
            <PressureWasher />
          </div>
          <div style={{ position: "absolute", left: wandX, top: frontY - 80 }}>
            <WaterSpray len={205} dir={1} />
          </div>
        </>
      )}

      {/* SFX */}
      <Sequence from={S3 + 14} durationInFrames={26}><div style={{ position: "absolute", left: 540, top: 1300 }}><Sfx text="SPLOOSH!" rotate={-8} fontSize={82} /></div></Sequence>
      <Sequence from={S3 + 92} durationInFrames={26}><div style={{ position: "absolute", left: 380, top: 1240 }}><Sfx text="SHINE!" color={C.orange} rotate={8} /></div></Sequence>

      {/* context */}
      <Sequence from={6} durationInFrames={64}><ServiceTag>PRESSURE WASHING</ServiceTag></Sequence>
      <Sequence from={S2 + 2} durationInFrames={58}><Lower eyebrow="DRIVEWAYS · DECKS · PATIOS">Years of grime — blasted away.</Lower></Sequence>
      <Sequence from={20} durationInFrames={66}><div style={{ position: "absolute", left: 150, top: 1700 }}><Stamp text="BEFORE" /></div></Sequence>
      <Sequence from={S3 + 118} durationInFrames={70}><div style={{ position: "absolute", left: 150, top: 1360 }}><Stamp text="AFTER" color="#1f7a4d" /></div></Sequence>

      {/* customer reaction + jokes */}
      <CustomerLayer frame={frame} />
      <Sequence from={S4 + 8} durationInFrames={46}><Bubble x={150} y={760} w={650} tail="right">Is that <span style={{ color: C.orange }}>MY driveway?!</span></Bubble></Sequence>
      <Sequence from={S4 + 54} durationInFrames={34}><Bubble x={120} y={1320} w={470} tail="left">Grime? <span style={{ color: C.orange }}>Gone.</span></Bubble></Sequence>
      <Sequence from={S4 + 88} durationInFrames={36}><Bubble x={180} y={760} w={580} tail="right">It&rsquo;s <span style={{ color: C.orange }}>BLINDING!</span></Bubble></Sequence>

      {/* end card */}
      <Sequence from={S5}><Flash /><EndCard headline={<>GRIME? <span style={{ color: C.orange }}>GONE.</span></>} /></Sequence>
    </AbsoluteFill>
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

const CustomerLayer: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < S4) return null;
  const f = frame - S4;
  const slide = interpolate(f, [0, 16], [-40, 0], clamp);
  const op = interpolate(f, [0, 12], [0, 1], clamp);
  const wob = Math.sin(f * 0.8) * (f > 6 && f < 26 ? 5 : 0);
  return (
    <div style={{ position: "absolute", left: 640, top: 792 + slide, width: 250, opacity: op }}>
      <Customer expr="shock" lean={wob} armR={-30 + Math.sin(f * 0.5) * 8} />
    </div>
  );
};
