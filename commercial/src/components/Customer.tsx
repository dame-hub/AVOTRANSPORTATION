import { C } from "../theme";

export type CustomerPose = {
  armR?: number; // free arm (gesturing)
  lean?: number;
  expr?: "shock" | "laugh" | "wow";
};

// Customer in a bathrobe holding a coffee mug (just woke up — "so fast they weren't ready").
export const Customer: React.FC<CustomerPose> = ({ armR = -20, lean = 0, expr = "shock" }) => {
  return (
    <svg viewBox="0 0 200 340" width="100%" style={{ display: "block", overflow: "visible" }}>
      <ellipse cx="100" cy="330" rx="56" ry="13" fill="#000" opacity="0.18" />
      <g transform={`rotate(${lean} 100 210)`}>
        {/* legs / pajama bottoms */}
        <rect x="80" y="232" width="17" height="74" rx="9" fill="#9fb0c4" />
        <rect x="103" y="232" width="17" height="74" rx="9" fill="#9fb0c4" />
        <ellipse cx="86" cy="310" rx="20" ry="11" fill={C.ink} />
        <ellipse cx="114" cy="310" rx="20" ry="11" fill={C.ink} />

        {/* free arm (gestures) */}
        <g transform={`rotate(${armR} 140 134)`}>
          <rect x="130" y="130" width="24" height="64" rx="12" fill={C.robe} stroke={C.robeDark} strokeWidth="3" />
          <circle cx="142" cy="200" r="14" fill={C.skin1} />
        </g>

        {/* robe body */}
        <path d="M58,126 Q100,112 142,126 L150,250 Q100,266 50,250 Z" fill={C.robe} stroke={C.robeDark} strokeWidth="4" />
        {/* lapels */}
        <path d="M100,120 L80,250 L96,250 L100,150 Z" fill={C.robeDark} opacity="0.55" />
        <path d="M100,120 L120,250 L104,250 L100,150 Z" fill={C.robeDark} opacity="0.35" />
        {/* belt */}
        <rect x="52" y="206" width="96" height="18" rx="6" fill={C.robeDark} />

        {/* mug arm (holds coffee at chest) */}
        <rect x="60" y="150" width="56" height="22" rx="11" fill={C.robe} stroke={C.robeDark} strokeWidth="3" transform="rotate(-14 64 158)" />
        <g transform="translate(96 150)">
          <Steam />
          <rect x="0" y="6" width="34" height="30" rx="6" fill={C.mug} stroke="#b83a25" strokeWidth="3" />
          <rect x="6" y="2" width="22" height="7" rx="3" fill="#fff" opacity="0.85" />
          <path d="M34,12 q14,2 12,14 q-2,8 -12,6" fill="none" stroke="#b83a25" strokeWidth="5" />
        </g>

        {/* head */}
        <circle cx="100" cy="78" r="43" fill={C.skin1} />
        <circle cx="58" cy="82" r="9" fill={C.skin1} />
        <circle cx="142" cy="82" r="9" fill={C.skin1} />
        {/* bedhead hair */}
        <path d="M60,58 q-6,-26 16,-30 q-4,-12 18,-14 q16,-10 30,2 q22,-2 20,20 q14,6 6,24 q-30,-20 -90,-2 Z" fill="#5a4634" />
        <Face expr={expr} />
      </g>
    </svg>
  );
};

const Steam: React.FC = () => (
  <g stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.8" strokeLinecap="round">
    <path d="M8,4 q-6,-10 2,-18" />
    <path d="M22,4 q6,-10 -2,-18" />
  </g>
);

const Face: React.FC<{ expr: string }> = ({ expr }) => (
  <g>
    {/* raised brows */}
    <path d="M76,58 q10,-8 20,-2" stroke={C.ink} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M104,56 q10,-6 20,2" stroke={C.ink} strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* wide eyes */}
    <circle cx="86" cy="76" r="11" fill="#fff" stroke={C.ink} strokeWidth="3" />
    <circle cx="114" cy="76" r="11" fill="#fff" stroke={C.ink} strokeWidth="3" />
    <circle cx="87" cy="78" r="5" fill={C.ink} />
    <circle cx="115" cy="78" r="5" fill={C.ink} />
    {/* jaw-drop mouth */}
    {expr === "laugh" ? (
      <path d="M82,98 q18,22 36,0 q-18,8 -36,0 Z" fill="#7a2b1d" stroke={C.ink} strokeWidth="3" />
    ) : (
      <ellipse cx="100" cy="104" rx="13" ry="17" fill="#7a2b1d" stroke={C.ink} strokeWidth="3" />
    )}
  </g>
);
