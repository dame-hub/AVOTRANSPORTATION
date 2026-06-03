import { C, FONT } from "../theme";

export type CrewPose = {
  skin?: string;
  capColor?: string;
  armL?: number; // near-arm rotation (deg) about shoulder
  armR?: number; // far-arm rotation (deg)
  legL?: number;
  legR?: number;
  lean?: number;
  expr?: "happy" | "grin" | "shout" | "cool";
};

export const Crew: React.FC<CrewPose> = ({
  skin = C.skin1,
  capColor = C.orange,
  armL = 14,
  armR = -14,
  legL = 6,
  legR = -6,
  lean = 0,
  expr = "happy",
}) => {
  return (
    <svg viewBox="0 0 200 320" width="100%" style={{ display: "block", overflow: "visible" }}>
      <ellipse cx="100" cy="309" rx="54" ry="13" fill="#000" opacity="0.18" />
      <g transform={`rotate(${lean} 100 196)`}>
        {/* legs */}
        <g transform={`rotate(${legL} 90 196)`}>
          <rect x="78" y="196" width="26" height="86" rx="13" fill="#2c3340" />
          <ellipse cx="91" cy="290" rx="22" ry="11" fill={C.ink} />
        </g>
        <g transform={`rotate(${legR} 110 196)`}>
          <rect x="98" y="196" width="26" height="86" rx="13" fill="#2c3340" />
          <ellipse cx="111" cy="290" rx="22" ry="11" fill={C.ink} />
        </g>
        {/* far arm */}
        <g transform={`rotate(${armR} 136 130)`}>
          <rect x="126" y="126" width="23" height="60" rx="11" fill={C.orange} stroke={C.orangeDark} strokeWidth="3" />
          <circle cx="137" cy="192" r="14" fill={skin} />
        </g>
        {/* torso */}
        <path d="M60,122 Q100,110 140,122 L133,208 Q100,220 67,208 Z" fill={C.orange} stroke={C.orangeDark} strokeWidth="4" />
        <text x="100" y="170" textAnchor="middle" fontFamily={FONT} fontSize="22" fontWeight="900" fill={C.white}>AVO</text>
        {/* near arm */}
        <g transform={`rotate(${armL} 64 130)`}>
          <rect x="51" y="126" width="23" height="60" rx="11" fill={C.orange} stroke={C.orangeDark} strokeWidth="3" />
          <circle cx="63" cy="192" r="14" fill={skin} />
        </g>
        {/* head */}
        <circle cx="100" cy="76" r="42" fill={skin} />
        <circle cx="59" cy="80" r="9" fill={skin} />
        <circle cx="141" cy="80" r="9" fill={skin} />
        <Face expr={expr} />
        {/* cap */}
        <path d="M58,70 A42,42 0 0 1 142,70 Z" fill={capColor} stroke={C.orangeDark} strokeWidth="3" />
        <path d="M132,68 q34,0 40,11 q-8,7 -26,4 Z" fill={capColor} stroke={C.orangeDark} strokeWidth="3" strokeLinejoin="round" />
        <rect x="56" y="64" width="88" height="11" rx="5" fill={capColor} />
      </g>
    </svg>
  );
};

const Face: React.FC<{ expr: string }> = ({ expr }) => (
  <g>
    <circle cx="86" cy="80" r="6" fill={C.ink} />
    <circle cx="114" cy="80" r="6" fill={C.ink} />
    {expr === "shout" ? (
      <ellipse cx="100" cy="99" rx="12" ry="14" fill="#7a2b1d" />
    ) : expr === "cool" ? (
      <path d="M86,99 q14,5 28,0" stroke={C.ink} strokeWidth="5" fill="none" strokeLinecap="round" />
    ) : expr === "grin" ? (
      <path d="M82,95 q18,18 36,0 q-18,6 -36,0 Z" fill={C.white} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
    ) : (
      <path d="M84,97 q16,12 32,0" stroke={C.ink} strokeWidth="5" fill="none" strokeLinecap="round" />
    )}
  </g>
);
