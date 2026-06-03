import { Composition } from "remotion";
import { Commercial } from "./Commercial";
import { Dev } from "./Dev";

// 15 seconds @ 30fps = 450 frames, vertical 9:16 (1080x1920)
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Commercial"
        component={Commercial}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Dev"
        component={Dev}
        durationInFrames={60}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
