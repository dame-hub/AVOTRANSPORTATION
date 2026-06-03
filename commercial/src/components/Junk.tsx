import { C } from "../theme";

export type JunkType = "couch" | "fridge" | "boxes" | "mattress" | "chair" | "tv";

export const Junk: React.FC<{ type: JunkType }> = ({ type }) => {
  switch (type) {
    case "couch":
      return (
        <svg viewBox="0 0 240 140" width="100%" style={{ display: "block", overflow: "visible" }}>
          <rect x="10" y="60" width="220" height="64" rx="16" fill="#a9794f" stroke="#7d5836" strokeWidth="4" />
          <rect x="6" y="40" width="48" height="78" rx="16" fill="#bb885c" stroke="#7d5836" strokeWidth="4" />
          <rect x="186" y="40" width="48" height="78" rx="16" fill="#bb885c" stroke="#7d5836" strokeWidth="4" />
          <rect x="50" y="34" width="140" height="46" rx="12" fill="#bb885c" stroke="#7d5836" strokeWidth="4" />
          <rect x="58" y="60" width="58" height="34" rx="10" fill="#c79568" stroke="#7d5836" strokeWidth="3" />
          <rect x="124" y="60" width="58" height="34" rx="10" fill="#c79568" stroke="#7d5836" strokeWidth="3" />
        </svg>
      );
    case "fridge":
      return (
        <svg viewBox="0 0 120 200" width="100%" style={{ display: "block", overflow: "visible" }}>
          <rect x="10" y="6" width="100" height="188" rx="14" fill="#e3e8ee" stroke="#aab3bf" strokeWidth="4" />
          <line x1="10" y1="74" x2="110" y2="74" stroke="#aab3bf" strokeWidth="4" />
          <rect x="18" y="16" width="10" height="44" rx="5" fill="#9aa4b1" />
          <rect x="18" y="86" width="10" height="86" rx="5" fill="#9aa4b1" />
        </svg>
      );
    case "boxes":
      return (
        <svg viewBox="0 0 180 150" width="100%" style={{ display: "block", overflow: "visible" }}>
          <rect x="8" y="58" width="100" height="86" rx="8" fill="#cf9f66" stroke="#9c763f" strokeWidth="4" />
          <line x1="58" y1="58" x2="58" y2="144" stroke="#9c763f" strokeWidth="4" />
          <rect x="44" y="46" width="28" height="14" fill="#e7cfa3" stroke="#9c763f" strokeWidth="3" />
          <rect x="98" y="30" width="74" height="64" rx="8" fill="#d9ab73" stroke="#9c763f" strokeWidth="4" />
          <line x1="135" y1="30" x2="135" y2="94" stroke="#9c763f" strokeWidth="4" />
        </svg>
      );
    case "mattress":
      return (
        <svg viewBox="0 0 220 110" width="100%" style={{ display: "block", overflow: "visible" }}>
          <rect x="8" y="10" width="204" height="90" rx="20" fill="#eef3f8" stroke="#c2ccd6" strokeWidth="4" />
          {[40, 80, 120, 160].map((x) => (
            <line key={x} x1={x} y1="14" x2={x} y2="96" stroke="#d4dde6" strokeWidth="6" />
          ))}
          {[30, 70, 110, 150, 190].map((x) =>
            [34, 76].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#bcc7d2" />)
          )}
        </svg>
      );
    case "chair":
      return (
        <svg viewBox="0 0 120 150" width="100%" style={{ display: "block", overflow: "visible" }}>
          <rect x="30" y="8" width="60" height="70" rx="10" fill="#5b8a72" stroke="#3f6753" strokeWidth="4" />
          <rect x="24" y="74" width="72" height="22" rx="8" fill="#6c9c83" stroke="#3f6753" strokeWidth="4" />
          <rect x="28" y="94" width="10" height="48" fill="#3f6753" />
          <rect x="82" y="94" width="10" height="48" fill="#3f6753" />
        </svg>
      );
    case "tv":
      return (
        <svg viewBox="0 0 150 130" width="100%" style={{ display: "block", overflow: "visible" }}>
          <rect x="8" y="10" width="134" height="100" rx="12" fill="#2c3340" stroke="#11151c" strokeWidth="4" />
          <rect x="20" y="22" width="92" height="76" rx="8" fill="#5b7d9a" />
          <circle cx="126" cy="40" r="6" fill="#8a96a5" />
          <circle cx="126" cy="62" r="6" fill="#8a96a5" />
          <rect x="50" y="110" width="50" height="14" rx="4" fill="#11151c" />
        </svg>
      );
  }
};
