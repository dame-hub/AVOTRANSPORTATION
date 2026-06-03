import { Composition } from "remotion";
import { Commercial } from "./Commercial";
import { PressureWash } from "./PressureWash";
import { Detailing } from "./Detailing";
import { Dev } from "./Dev";

// All spots: vertical 9:16 (1080x1920), 15s @ 30fps = 450 frames.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Commercial" component={Commercial} durationInFrames={450} fps={30} width={1080} height={1920} />
      <Composition id="PressureWash" component={PressureWash} durationInFrames={450} fps={30} width={1080} height={1920} />
      <Composition id="Detailing" component={Detailing} durationInFrames={450} fps={30} width={1080} height={1920} />
      <Composition id="Dev" component={Dev} durationInFrames={60} fps={30} width={1080} height={1920} />
    </>
  );
};
