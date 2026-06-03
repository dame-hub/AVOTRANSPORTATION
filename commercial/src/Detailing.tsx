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
import { Suds } from "./components/Suds";
import { ShineGlint } from "./components/ShineGlint";
import { Vehicle } from "./components/Vehicle";
import { ServiceTag, Lower, Stamp } from "./components/Captions";
import { EndCard } from "./components/EndCard";
import { C, W } from "./theme";

const S2 = 44, S3 = 92, S4 = 248, S5 = 372;
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

export const Detailing: React.FC = () => {
  const frame = useCurrentFrame();
  const dirt = interpolate(frame, [S3 + 10, S3 + 118], [1, 0], clamp);
  const scrubbing = frame >= S2 && frame < S4;

  // pickup sits in the foreground
  const pickup = { left: 232, top: 1392, width: 620 };

  return (
    <AbsoluteFill style={{ backgroundColor: C.skyBot }}>
      <Background />

      {/* the customer's pickup (muddy -> clean) */}
      <div style={{ position: "absolute", left: pickup.left, top: pickup.top, width: pickup.width }}>
        <Vehicle dirt={frame < S3 + 10 ? 1 : dirt} />
      </div>

      {/* shine + sparkles as it gets clean */}
      <Sequence from={S3 + 96} durationInFrames={40}>
        <div style={{ position: "absolute", left: pickup.left, top: pickup.top, width: pickup.width, height: 360 }}>
          <ShineGlint w={pickup.width} h={360} dur={26} />
        </div>
      </Sequence>
      {frame >= S3 + 100 && frame < S4 && (
        <>
          <Sparkle x={320} y={1430} />
          <Sparkle x={700} y={1430} delay={10} />
          <Sparkle x={520} y={1400} delay={18} />
        </>
      )}

      {/* crew detailing around the pickup */}
      <CrewLayer frame={frame} />

      {/* suds while scrubbing */}
      {scrubbing && frame < S3 + 110 && (
        <div style={{ position: "absolute", left: pickup.left - 10, top: pickup.top + 30, opacity: interpolate(frame, [S3 + 80, S3 + 110], [1, 0], clamp) }}>
          <Suds w={640} h={320} count={24} />
        </div>
      )}

      {/* SFX */}
      <Sequence from={S3 + 16} durationInFrames={26}><div style={{ position: "absolute", left: 300, top: 1300 }}><Sfx text="SCRUB!" rotate={-8} fontSize={82} /></div></Sequence>
      <Sequence from={S3 + 60} durationInFrames={26}><div style={{ position: "absolute", left: 640, top: 1280 }}><Sfx text="SUDS!" color={C.orange} rotate={8} fontSize={80} /></div></Sequence>
      <Sequence from={S3 + 104} durationInFrames={26}><div style={{ position: "absolute", left: 430, top: 1240 }}><Sfx text="SHINE!" color={C.orange} rotate={-6} /></div></Sequence>

      {/* context */}
      <Sequence from={6} durationInFrames={62}><ServiceTag>AUTO &amp; FLEET DETAILING</ServiceTag></Sequence>
      <Sequence from={S2 + 2} durationInFrames={58}><Lower eyebrow="CARS · TRUCKS · FLEETS">Mud to showroom — inside &amp; out.</Lower></Sequence>
      <Sequence from={20} durationInFrames={64}><div style={{ position: "absolute", left: 150, top: 1150 }}><Stamp text="BEFORE" /></div></Sequence>
      <Sequence from={S3 + 120} durationInFrames={70}><div style={{ position: "absolute", left: 150, top: 1150 }}><Stamp text="AFTER" color="#1f7a4d" /></div></Sequence>

      {/* customer reaction + jokes */}
      <CustomerLayer frame={frame} />
      <Sequence from={S4 + 8} durationInFrames={46}><Bubble x={150} y={720} w={640} tail="right">Is that <span style={{ color: C.orange }}>MY truck?!</span></Bubble></Sequence>
      <Sequence from={S4 + 54} durationInFrames={34}><Bubble x={120} y={1300} w={520} tail="left">Showroom <span style={{ color: C.orange }}>clean.</span></Bubble></Sequence>
      <Sequence from={S4 + 88} durationInFrames={38}><Bubble x={150} y={720} w={660} tail="right">I can see my <span style={{ color: C.orange }}>FACE</span> in it!</Bubble></Sequence>

      {/* end card */}
      <Sequence from={S5}><Flash /><EndCard headline={<>SHOWROOM <span style={{ color: C.orange }}>CLEAN.</span></>} /></Sequence>
    </AbsoluteFill>
  );
};

const CrewLayer: React.FC<{ frame: number }> = ({ frame }) => {
  const defs = [
    { skin: C.skin1, cap: C.orange, left: 150 },
    { skin: C.skin2, cap: C.ink, left: 470 },
    { skin: C.skin3, cap: C.orange, left: 760 },
  ];
  return (
    <>
      {defs.map((d, i) => {
        const inScrub = frame >= S2 && frame < S4;
        const op = frame >= S2 - 2 ? 1 : 0;
        const bob = inScrub ? Math.sin((frame + i * 5) * 0.9) * 12 : 0;
        const armA = inScrub ? 30 + Math.sin((frame + i * 6) * 1.6) * 50 : 14;
        let armL = armA, armR = -armA, expr: "happy" | "grin" | "shout" | "cool" = "happy", left = d.left, top = 1440 - bob, width = 210, o = op;
        if (frame >= S4) {
          if (i === 0) { expr = "grin"; armL = 20; armR = -16; left = 180; top = 1470; }
          else if (i === 2) { expr = "cool"; armL = 60; armR = -22; left = 760; top = 1470; }
          else { o = 0; }
        }
        if (frame < S2) o = 0;
        return (
          <div key={i} style={{ position: "absolute", left, top, width, opacity: o }}>
            <Crew skin={d.skin} capColor={d.cap} expr={expr} armL={armL} armR={armR} legL={6} legR={-6} />
          </div>
        );
      })}
    </>
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
    <div style={{ position: "absolute", left: 650, top: 792 + slide, width: 240, opacity: op }}>
      <Customer expr="shock" lean={wob} armR={-26 + Math.sin(f * 0.5) * 8} />
    </div>
  );
};
