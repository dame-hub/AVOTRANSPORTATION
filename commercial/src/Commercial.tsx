import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ENABLE_MUSIC, ENABLE_VOICEOVER } from "./voiceover";
import { Background } from "./components/Background";
import { Truck } from "./components/Truck";
import { Crew } from "./components/Crew";
import { Customer } from "./components/Customer";
import { Junk, JunkType } from "./components/Junk";
import { SpeechBubble } from "./components/SpeechBubble";
import { Sfx } from "./components/Sfx";
import { DustPuff, SpeedLines, Sparkle } from "./components/Effects";
import { EndCard } from "./components/EndCard";
import { C, FONT, W } from "./theme";

// ---- scene boundaries (frames @30fps) ----
const S2 = 44;   // crew out
const S3 = 102;  // hauling montage
const S4 = 244;  // customer + jokes
const S5 = 374;  // end card

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const tri = (t: number) => 1 - Math.abs(((t % 2) + 2) % 2 - 1); // 0..1..0 triangle

export const Commercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Truck drives in and parks.
  const enter = spring({ frame, fps, config: { damping: 13, mass: 1.1 }, durationInFrames: 40 });
  const truckLeft = interpolate(enter, [0, 1], [W + 360, 130]);

  return (
    <AbsoluteFill style={{ backgroundColor: C.skyBot }}>
      {ENABLE_MUSIC && <Audio src={staticFile("music/track.mp3")} volume={0.35} />}
      {ENABLE_VOICEOVER && <Audio src={staticFile("vo/voiceover.mp3")} />}
      <Background />

      {/* garage opens for the montage */}
      <GarageDoor frame={frame} />

      {/* speed lines during the montage */}
      {frame >= S3 && frame < S4 && (
        <Sequence from={S3} durationInFrames={S4 - S3}>
          <SpeedLines top={980} height={760} />
        </Sequence>
      )}

      {/* truck */}
      <div style={{ position: "absolute", top: 1420, left: truckLeft, width: 820 }}>
        <Truck />
      </div>

      {/* dust on arrival */}
      <Sequence from={26} durationInFrames={36}>
        <div style={{ position: "absolute", top: 1690, left: 210 }}><DustPuff /></div>
        <div style={{ position: "absolute", top: 1690, left: 700 }}><DustPuff /></div>
      </Sequence>

      {/* flying junk (montage) */}
      {frame >= S3 && frame < S4 + 10 && <FlyingJunk frame={frame - S3} />}

      {/* the crew */}
      <CrewLayer frame={frame} fps={fps} />

      {/* customer */}
      <CustomerLayer frame={frame} />

      {/* counter chip + DONE stamp (montage) */}
      <Sequence from={S3} durationInFrames={S4 - S3 + 6}>
        <Counter />
      </Sequence>

      {/* ---- dialogue / SFX ---- */}
      <Sequence from={72} durationInFrames={34}>
        <Bubble x={250} y={1180} tail="down" w={420}>
          LET&rsquo;S <span style={{ color: C.orange }}>GO!</span>
        </Bubble>
      </Sequence>

      {/* montage SFX bursts */}
      <Sequence from={S3 + 16} durationInFrames={30}><div style={{ position: "absolute", left: 250, top: 1180 }}><Sfx text="WHOOSH!" rotate={-10} /></div></Sequence>
      <Sequence from={S3 + 60} durationInFrames={30}><div style={{ position: "absolute", left: 640, top: 1120 }}><Sfx text="ZOOM!" color={C.orange} rotate={8} /></div></Sequence>
      <Sequence from={S3 + 104} durationInFrames={30}><div style={{ position: "absolute", left: 360, top: 1240 }}><Sfx text="BOOM!" color={C.orange} rotate={-6} /></div></Sequence>

      {/* customer jokes */}
      <Sequence from={S4 + 8} durationInFrames={46}>
        <Bubble x={150} y={760} tail="right" w={620}>
          Did you guys <span style={{ color: C.orange }}>TELEPORT?!</span>
        </Bubble>
      </Sequence>
      <Sequence from={S4 + 54} durationInFrames={34}>
        <Bubble x={104} y={1312} tail="left" w={500}>
          Nope. Just <span style={{ color: C.orange }}>AVO.</span>
        </Bubble>
      </Sequence>
      <Sequence from={S4 + 88} durationInFrames={36}>
        <Bubble x={150} y={760} tail="right" w={640}>
          My garage is <span style={{ color: C.orange }}>GONE!</span>
        </Bubble>
      </Sequence>

      {/* end card */}
      <Sequence from={S5}>
        <Flash />
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------------------

const Bubble: React.FC<{ x: number; y: number; w: number; tail: "down" | "left" | "right"; children: React.ReactNode }> = ({ x, y, w, tail, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w }}>
    <SpeechBubble width={w} tail={tail}>{children}</SpeechBubble>
  </div>
);

const GarageDoor: React.FC<{ frame: number }> = ({ frame }) => {
  // door lifts open from S3-12 .. S3+8
  const open = interpolate(frame, [S3 - 12, S3 + 8], [0, 1], clamp);
  return (
    <svg viewBox={`0 0 ${W} 1920`} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      {/* dark interior revealed */}
      <rect x="364" y="904" width="232" height="282" rx="6" fill="#2b2f36" opacity={open} />
      {/* door panel lifts a touch and fades as it opens */}
      <rect x="364" y={904 - open * 46} width="232" height="282" rx="6" fill={C.garage} stroke={C.garageLine} strokeWidth="4" opacity={1 - open} />
      <line x1="364" y1={974 - open * 46} x2="596" y2={974 - open * 46} stroke={C.garageLine} strokeWidth="4" opacity={1 - open} />
    </svg>
  );
};

const Counter: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.min(32, Math.floor(interpolate(f, [0, 132], [1, 32], clamp)));
  const done = f > 134;
  const pop = spring({ frame: f - 134, fps: 30, config: { damping: 9, mass: 0.6 }, durationInFrames: 14 });
  return (
    <div style={{ position: "absolute", top: 96, left: 0, width: W, display: "flex", justifyContent: "center" }}>
      {!done ? (
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 46, color: "#fff", background: "rgba(12,12,12,0.72)", padding: "16px 34px", borderRadius: 40, letterSpacing: 1 }}>
          JUNK GONE: <span style={{ color: C.orange }}>{n}</span>
        </div>
      ) : (
        <div style={{ transform: `scale(${interpolate(pop, [0, 1], [0.2, 1])}) rotate(-6deg)`, fontFamily: FONT, fontWeight: 900, fontSize: 92, color: C.orange, WebkitTextStroke: `6px ${C.ink}`, paintOrder: "stroke fill", textShadow: `5px 6px 0 ${C.ink}` }}>
          DONE!
        </div>
      )}
    </div>
  );
};

const Flash: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 4, 12], [0.9, 0.5, 0], clamp);
  return <AbsoluteFill style={{ backgroundColor: "#fff", opacity: o }} />;
};

// ---- flying junk during montage ----
const FlyingJunk: React.FC<{ frame: number }> = ({ frame }) => {
  const items: { type: JunkType; from: number; w: number }[] = [
    { type: "boxes", from: 2, w: 190 },
    { type: "couch", from: 18, w: 250 },
    { type: "fridge", from: 34, w: 150 },
    { type: "mattress", from: 50, w: 240 },
    { type: "tv", from: 66, w: 170 },
    { type: "chair", from: 82, w: 150 },
    { type: "boxes", from: 98, w: 190 },
    { type: "couch", from: 112, w: 250 },
    { type: "fridge", from: 126, w: 150 },
  ];
  return (
    <>
      {items.map((it, i) => {
        const local = frame - it.from;
        if (local < 0 || local > 30) return null;
        const p = local / 30;
        const x = interpolate(p, [0, 1], [470, 600]);
        const y = interpolate(p, [0, 1], [1020, 1360]) - Math.sin(Math.PI * p) * 260;
        const sc = interpolate(p, [0, 1], [1, 0.42]);
        const op = interpolate(p, [0, 0.75, 1], [1, 1, 0]);
        const rot = interpolate(p, [0, 1], [-8, 18]) + i * 4;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: it.w, transform: `scale(${sc}) rotate(${rot}deg)`, opacity: op }}>
            <Junk type={it.type} />
          </div>
        );
      })}
    </>
  );
};

// ---- crew across the whole film ----
const CrewLayer: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const defs = [
    { skin: C.skin1, cap: C.orange, base: 150 },
    { skin: C.skin2, cap: C.ink, base: 430 },
    { skin: C.skin3, cap: C.orange, base: 690 },
  ];
  return (
    <>
      {defs.map((d, i) => {
        // entrance pop in S2
        const rise = spring({ frame: frame - (S2 + i * 7), fps, config: { damping: 12, mass: 0.8 }, durationInFrames: 18 });
        const appear = interpolate(rise, [0, 1], [120, 0]); // y offset up
        const visible = frame > S2 + i * 7 - 2 ? 1 : 0;

        // montage: furious work bob + jitter
        const inMontage = frame >= S3 && frame < S4;
        const bob = inMontage ? Math.sin((frame + i * 5) * 0.9) * 16 : 0;
        const jit = inMontage ? Math.sin((frame + i * 11) * 1.7) * 12 : 0;
        const legA = inMontage ? Math.sin((frame + i * 4) * 1.1) * 26 : 6;
        const armA = inMontage ? 40 + Math.sin((frame + i * 7) * 1.3) * 45 : 14;

        // scene 4 poses (only first two stay; third tucks behind truck)
        let expr: "happy" | "grin" | "shout" | "cool" = "happy";
        let armL = armA, armR = -armA, lean = 0, legL = legA, legR = -legA;
        let left = d.base, top = 1474 - appear + bob, width = 240, op = visible;

        if (frame >= S4) {
          if (i === 0) { expr = "grin"; armL = 20; armR = -18; legL = 6; legR = -6; left = 250; }
          else if (i === 1) { expr = "cool"; armL = 64; armR = -22; legL = 5; legR = -5; left = 560; }
          else { op = 0; }
          top = 1474;
        }
        if (frame < S2) op = 0;

        return (
          <div key={i} style={{ position: "absolute", left: left + jit, top, width, opacity: op }}>
            <Crew skin={d.skin} capColor={d.cap} expr={expr} armL={armL} armR={armR} legL={legL} legR={legR} lean={lean} />
          </div>
        );
      })}
    </>
  );
};

// ---- customer in scene 4 ----
const CustomerLayer: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < S4) return null;
  const f = frame - S4;
  const slide = interpolate(f, [0, 16], [-40, 0], clamp);
  const op = interpolate(f, [0, 12], [0, 1], clamp);
  // double-take wobble when the first joke lands
  const wob = Math.sin(f * 0.8) * (f > 6 && f < 26 ? 5 : 0);
  return (
    <div style={{ position: "absolute", left: 640, top: 792 + slide, width: 250, opacity: op }}>
      <Customer expr="shock" lean={wob} armR={-26 + Math.sin(f * 0.5) * 8} />
    </div>
  );
};
