import { AbsoluteFill } from "remotion";
import { Crew } from "./components/Crew";
import { Customer } from "./components/Customer";
import { C } from "./theme";

// Isolated layout to inspect character designs. Not part of the final film.
export const Dev: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#dfefff" }}>
    <div style={{ position: "absolute", bottom: 700, left: 30, width: 250 }}>
      <Crew skin={C.skin1} expr="grin" />
    </div>
    <div style={{ position: "absolute", bottom: 700, left: 290, width: 250 }}>
      <Crew skin={C.skin2} capColor={C.ink} expr="cool" armL={70} armR={-50} />
    </div>
    <div style={{ position: "absolute", bottom: 700, left: 550, width: 250 }}>
      <Crew skin={C.skin3} expr="shout" legL={28} legR={-24} armL={-40} />
    </div>
    <div style={{ position: "absolute", bottom: 660, left: 810, width: 250 }}>
      <Customer expr="shock" />
    </div>
  </AbsoluteFill>
);
