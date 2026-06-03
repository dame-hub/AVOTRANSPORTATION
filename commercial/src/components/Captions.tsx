import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, W } from "../theme";

// Lower-third context caption (eyebrow + line). Wrap in a <Sequence>.
export const Lower: React.FC<{ eyebrow?: string; children: React.ReactNode; y?: number }> = ({ eyebrow, children, y = 300 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 14 }, durationInFrames: 16 });
  const x = interpolate(s, [0, 1], [-60, 0]);
  const op = interpolate(f, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: y, left: 0, width: W, display: "flex", justifyContent: "center", transform: `translateX(${x}px)`, opacity: op }}>
      <div style={{ background: "rgba(12,12,12,0.78)", borderLeft: `8px solid ${C.orange}`, borderRadius: 14, padding: "16px 30px", textAlign: "center", maxWidth: 920 }}>
        {eyebrow && <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.orange }}>{eyebrow}</div>}
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 44, color: "#fff", lineHeight: 1.06 }}>{children}</div>
      </div>
    </div>
  );
};

// Angled BEFORE / AFTER stamp. Wrap in a positioned <Sequence>.
export const Stamp: React.FC<{ text: string; color?: string }> = ({ text, color = "#d6453a" }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 9, mass: 0.6 }, durationInFrames: 12 });
  return (
    <div style={{ transform: `scale(${interpolate(s, [0, 1], [0.2, 1])}) rotate(-12deg)`, border: `6px solid ${color}`, color, fontFamily: FONT, fontWeight: 900, fontSize: 42, padding: "6px 22px", borderRadius: 10, letterSpacing: 2, background: "rgba(255,255,255,0.92)" }}>
      {text}
    </div>
  );
};

// Top service-name tag chip. Wrap in a <Sequence>.
export const ServiceTag: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const op = interpolate(f, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 92, left: 0, width: W, display: "flex", justifyContent: "center", opacity: op }}>
      <div style={{ background: C.orange, color: "#fff", fontFamily: FONT, fontWeight: 900, fontSize: 34, letterSpacing: 3, padding: "12px 30px", borderRadius: 40, boxShadow: "0 8px 0 rgba(0,0,0,0.18)" }}>
        {children}
      </div>
    </div>
  );
};
