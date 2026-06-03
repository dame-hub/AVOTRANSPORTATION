import { C } from "../theme";

// Pressure-washer gun + lance. Nozzle tip sits near (212,113) in this viewBox.
export const PressureWasher: React.FC = () => (
  <svg viewBox="0 0 230 200" width="100%" style={{ display: "block", overflow: "visible" }}>
    <path d="M18,36 q-26,64 30,92" fill="none" stroke="#2c3340" strokeWidth="10" strokeLinecap="round" />
    <rect x="36" y="70" width="34" height="66" rx="12" fill={C.orange} stroke={C.orangeDark} strokeWidth="4" />
    <rect x="40" y="56" width="58" height="26" rx="10" fill="#3a4250" />
    <path d="M70,92 q24,4 22,32" fill="none" stroke="#3a4250" strokeWidth="6" />
    <g transform="rotate(20 92 69)">
      <rect x="92" y="62" width="124" height="14" rx="7" fill="#9aa4b1" stroke="#6b727c" strokeWidth="3" />
      <circle cx="220" cy="69" r="9" fill="#6b727c" />
    </g>
  </svg>
);
