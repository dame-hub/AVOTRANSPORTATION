import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../theme";

type Tail = "down" | "left" | "right";

export const SpeechBubble: React.FC<{
  width?: number;
  tail?: Tail;
  bg?: string;
  color?: string;
  fontSize?: number;
  children: React.ReactNode;
}> = ({ width = 540, tail = "down", bg = "#ffffff", color = C.ink, fontSize = 50, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 11, mass: 0.7 }, durationInFrames: 16 });
  const s = interpolate(pop, [0, 1], [0.25, 1]);
  const origin = tail === "left" ? "left bottom" : tail === "right" ? "right bottom" : "center bottom";

  return (
    <div style={{ transform: `scale(${s})`, transformOrigin: origin }}>
      <div
        style={{
          position: "relative",
          width,
          background: bg,
          border: `7px solid ${C.ink}`,
          borderRadius: 30,
          padding: "24px 30px",
          boxShadow: "0 12px 0 rgba(0,0,0,0.14)",
        }}
      >
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize, lineHeight: 1.06, color, textAlign: "center" }}>
          {children}
        </div>
        <Tail tail={tail} bg={bg} />
      </div>
    </div>
  );
};

const Tail: React.FC<{ tail: Tail; bg: string }> = ({ tail, bg }) => {
  if (tail === "down") {
    return (
      <>
        <div style={{ position: "absolute", bottom: -34, left: "50%", marginLeft: -24, width: 0, height: 0, borderLeft: "24px solid transparent", borderRight: "24px solid transparent", borderTop: `34px solid ${C.ink}` }} />
        <div style={{ position: "absolute", bottom: -22, left: "50%", marginLeft: -15, width: 0, height: 0, borderLeft: "15px solid transparent", borderRight: "15px solid transparent", borderTop: `24px solid ${bg}` }} />
      </>
    );
  }
  const side = tail === "left" ? { left: 40 } : { right: 40 };
  return (
    <>
      <div style={{ position: "absolute", bottom: -32, ...side, width: 0, height: 0, borderLeft: "20px solid transparent", borderRight: "20px solid transparent", borderTop: `34px solid ${C.ink}` }} />
      <div style={{ position: "absolute", bottom: -20, ...(tail === "left" ? { left: 48 } : { right: 48 }), width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: `24px solid ${bg}` }} />
    </>
  );
};
