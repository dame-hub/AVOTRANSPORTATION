import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "../theme";

export const EndCard: React.FC<{ headline?: React.ReactNode; cta?: string }> = ({
  headline,
  cta = "GET A FREE QUOTE",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (delay: number) =>
    spring({ frame: frame - delay, fps, config: { damping: 13, mass: 0.8 }, durationInFrames: 20 });
  const fade = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const logoS = interpolate(sp(0), [0, 1], [0.5, 1]);
  const headY = interpolate(sp(8), [0, 1], [40, 0]);
  const btnS = interpolate(sp(30), [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(1200px 760px at 50% 16%, #2a160b 0%, #000000 62%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 8px, rgba(255,255,255,0.025) 8px 9px)" }} />
      <div style={{ textAlign: "center", padding: "0 70px", width: "100%" }}>
        <Img
          src={staticFile("avo-logo-full.png")}
          style={{ width: 600, maxWidth: "84%", margin: "0 auto 44px", display: "block", transform: `scale(${logoS})`, opacity: fade(0, 10) }}
        />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 96,
            color: "#fff",
            letterSpacing: -1,
            lineHeight: 1,
            transform: `translateY(${headY}px)`,
            opacity: fade(8, 18),
          }}
        >
          {headline ?? (
            <>
              JUNK GONE —<br />
              <span style={{ color: C.orange }}>FAST.</span>
            </>
          )}
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", margin: "46px 0", opacity: fade(20, 30) }}>
          <Chip>SAME-DAY</Chip>
          <Chip>LICENSED &amp; INSURED</Chip>
          <Chip hot>BEATS ANY WRITTEN QUOTE 5%</Chip>
        </div>
        <div
          style={{
            display: "inline-block",
            background: C.orange,
            color: "#fff",
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 58,
            padding: "26px 60px",
            borderRadius: 18,
            transform: `scale(${btnS})`,
            boxShadow: "0 12px 0 #b8401a",
          }}
        >
          {cta}
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 52, color: "#fff", marginTop: 42, letterSpacing: 1, opacity: fade(40, 50) }}>
          avotransportation.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Chip: React.FC<{ children: React.ReactNode; hot?: boolean }> = ({ children, hot }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 30,
      color: hot ? "#fff" : "#ffd9c9",
      background: hot ? "rgba(255,107,53,0.22)" : "rgba(255,255,255,0.08)",
      border: `2px solid ${hot ? C.orange : "rgba(255,255,255,0.18)"}`,
      borderRadius: 40,
      padding: "12px 22px",
    }}
  >
    {children}
  </div>
);
