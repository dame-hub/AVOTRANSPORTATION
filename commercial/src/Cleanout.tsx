import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
} from "remotion";
import { Interior } from "./components/Interior";
import { Crew } from "./components/Crew";
import { Customer } from "./components/Customer";
import { Junk, JunkType } from "./components/Junk";
import { SpeechBubble } from "./components/SpeechBubble";
import { Sfx } from "./components/Sfx";
import { ServiceTag, Lower, Stamp } from "./components/Captions";
import { EndCard } from "./components/EndCard";
import { C, FONT, W } from "./theme";

const S2 = 46, S3 = 98, S4 = 250, S5 = 372;
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

export const Cleanout: React.FC = () => {
  const frame = useCurrentFrame();
  const clutterOp = frame < S3 ? 1 : interpolate(frame, [S3 + 6, S3 + 120], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#e4d6be" }}>
      <Interior />

      {/* the clutter (clears out during the montage) */}
      <div style={{ opacity: clutterOp }}>
        <Clut type="mattress" left={110} top={1360} w={260} />
        <Clut type="couch" left={70} top={1430} w={340} />
        <Clut type="boxes" left={430} top={1520} w={210} />
        <Clut type="tv" left={300} top={1600} w={150} />
        <Clut type="chair" left={650} top={1540} w={150} />
        <Clut type="boxes" left={790} top={1600} w={170} />
      </div>

      {frame >= S3 && frame < S4 && <FlyOut frame={frame - S3} />}

      <CrewLayer frame={frame} />
      <CustomerLayer frame={frame} />

      <Sequence from={S3} durationInFrames={S4 - S3 + 6}><Counter /></Sequence>

      <Sequence from={S3 + 16} durationInFrames={28}><div style={{ position: "absolute", left: 560, top: 1360 }}><Sfx text="WHOOSH!" rotate={-8} fontSize={82} /></div></Sequence>
      <Sequence from={S3 + 80} durationInFrames={28}><div style={{ position: "absolute", left: 360, top: 1420 }}><Sfx text="POOF!" color={C.orange} rotate={8} /></div></Sequence>

      <Sequence from={6} durationInFrames={64}><ServiceTag>ESTATE &amp; GARAGE CLEANOUT</ServiceTag></Sequence>
      <Sequence from={S2 + 2} durationInFrames={58}><Lower eyebrow="WHOLE-HOME CLEANOUTS">Clutter, furniture, junk — we clear it all.</Lower></Sequence>
      <Sequence from={20} durationInFrames={66}><div style={{ position: "absolute", left: 150, top: 1320 }}><Stamp text="BEFORE" /></div></Sequence>
      <Sequence from={S3 + 122} durationInFrames={70}><div style={{ position: "absolute", left: 150, top: 1320 }}><Stamp text="AFTER" color="#1f7a4d" /></div></Sequence>

      <Sequence from={S4 + 8} durationInFrames={46}><Bubble x={120} y={720} w={680} tail="right">Where&rsquo;d all my <span style={{ color: C.orange }}>JUNK</span> go?!</Bubble></Sequence>
      <Sequence from={S4 + 54} durationInFrames={34}><Bubble x={120} y={1330} w={430} tail="left"><span style={{ color: C.orange }}>Poof.</span> Same day.</Bubble></Sequence>
      <Sequence from={S4 + 88} durationInFrames={36}><Bubble x={170} y={720} w={600} tail="right">I can see my <span style={{ color: C.orange }}>FLOOR!</span></Bubble></Sequence>

      <Sequence from={S5}><Flash /><EndCard headline={<>CLUTTER? <span style={{ color: C.orange }}>GONE.</span></>} /></Sequence>
    </AbsoluteFill>
  );
};

const Clut: React.FC<{ type: JunkType; left: number; top: number; w: number }> = ({ type, left, top, w }) => (
  <div style={{ position: "absolute", left, top, width: w }}><Junk type={type} /></div>
);

const FlyOut: React.FC<{ frame: number }> = ({ frame }) => {
  const items: { type: JunkType; from: number; sx: number; sy: number; w: number }[] = [
    { type: "boxes", from: 2, sx: 520, sy: 1540, w: 180 },
    { type: "tv", from: 16, sx: 340, sy: 1620, w: 150 },
    { type: "chair", from: 30, sx: 690, sy: 1560, w: 150 },
    { type: "couch", from: 44, sx: 120, sy: 1450, w: 250 },
    { type: "boxes", from: 60, sx: 820, sy: 1620, w: 170 },
    { type: "mattress", from: 76, sx: 160, sy: 1400, w: 240 },
    { type: "boxes", from: 92, sx: 500, sy: 1540, w: 180 },
    { type: "chair", from: 106, sx: 650, sy: 1560, w: 150 },
  ];
  return (
    <>
      {items.map((it, i) => {
        const local = frame - it.from;
        if (local < 0 || local > 28) return null;
        const p = local / 28;
        const x = interpolate(p, [0, 1], [it.sx, 1010]);
        const y = interpolate(p, [0, 1], [it.sy, 900]) - Math.sin(Math.PI * p) * 130;
        const sc = interpolate(p, [0, 1], [1, 0.3]);
        const op = interpolate(p, [0, 0.7, 1], [1, 1, 0]);
        const rot = interpolate(p, [0, 1], [0, 34]) + i * 5;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: it.w, transform: `scale(${sc}) rotate(${rot}deg)`, opacity: op }}>
            <Junk type={it.type} />
          </div>
        );
      })}
    </>
  );
};

const CrewLayer: React.FC<{ frame: number }> = ({ frame }) => {
  const defs = [
    { skin: C.skin1, cap: C.orange, base: 150 },
    { skin: C.skin2, cap: C.ink, base: 390 },
    { skin: C.skin3, cap: C.orange, base: 620 },
  ];
  return (
    <>
      {defs.map((d, i) => {
        const inWork = frame >= S2 && frame < S4;
        const rise = spring({ frame: frame - (S2 + i * 6), fps: 30, config: { damping: 13 }, durationInFrames: 18 });
        const slideX = interpolate(rise, [0, 1], [820, 0]);
        const bob = inWork ? Math.sin((frame + i * 5) * 0.9) * 12 : 0;
        const armA = inWork ? 40 + Math.sin((frame + i * 7) * 1.4) * 45 : 14;
        let expr: "happy" | "grin" | "shout" | "cool" = "happy";
        let armL = armA, armR = -armA, left = d.base + slideX, top = 1500 - bob, o = frame >= S2 ? 1 : 0;
        if (frame >= S4) {
          if (i === 0) { expr = "grin"; armL = 20; armR = -16; left = 300; }
          else if (i === 1) { expr = "cool"; armL = 60; armR = -22; left = 600; }
          else { o = 0; }
          top = 1504;
        }
        if (frame < S2) o = 0;
        return (
          <div key={i} style={{ position: "absolute", left, top, width: 210, opacity: o }}>
            <Crew skin={d.skin} capColor={d.cap} expr={expr} armL={armL} armR={armR} legL={6} legR={-6} />
          </div>
        );
      })}
    </>
  );
};

const CustomerLayer: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < S4) return null;
  const f = frame - S4;
  const slideX = interpolate(f, [0, 18], [180, 0], clamp);
  const op = interpolate(f, [0, 12], [0, 1], clamp);
  const wob = Math.sin(f * 0.8) * (f > 6 && f < 26 ? 5 : 0);
  return (
    <div style={{ position: "absolute", left: 720 + slideX, top: 1430, width: 240, opacity: op }}>
      <Customer expr="shock" lean={wob} armR={-26 + Math.sin(f * 0.5) * 8} />
    </div>
  );
};

const Counter: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.min(28, Math.floor(interpolate(f, [0, 132], [1, 28], clamp)));
  const done = f > 134;
  const pop = spring({ frame: f - 134, fps: 30, config: { damping: 9, mass: 0.6 }, durationInFrames: 14 });
  return (
    <div style={{ position: "absolute", top: 168, left: 0, width: W, display: "flex", justifyContent: "center" }}>
      {!done ? (
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 44, color: "#fff", background: "rgba(12,12,12,0.72)", padding: "14px 32px", borderRadius: 40 }}>
          HAULED: <span style={{ color: C.orange }}>{n}</span>
        </div>
      ) : (
        <div style={{ transform: `scale(${interpolate(pop, [0, 1], [0.2, 1])}) rotate(-6deg)`, fontFamily: FONT, fontWeight: 900, fontSize: 88, color: C.orange, WebkitTextStroke: `6px ${C.ink}`, paintOrder: "stroke fill", textShadow: `5px 6px 0 ${C.ink}` }}>
          DONE!
        </div>
      )}
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
