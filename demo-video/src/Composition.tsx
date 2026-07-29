import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import { ColdOpen, COLD_OPEN_DURATION } from "./scenes/ColdOpen";
import {
  ProblemStatement,
  PROBLEM_STATEMENT_DURATION,
} from "./scenes/ProblemStatement";
import { ProductReveal, PRODUCT_REVEAL_DURATION } from "./scenes/ProductReveal";
import {
  FeatureWalkthrough,
  FEATURE_WALKTHROUGH_DURATION,
} from "./scenes/FeatureWalkthrough";
import { Traction, TRACTION_DURATION } from "./scenes/Traction";
import { Close, CLOSE_DURATION } from "./scenes/Close";
import { COLORS } from "./theme";

// Overlap between consecutive top-level scenes so the Scene fade-in/out
// wrappers produce a crossfade instead of a hard cut.
const OVERLAP = 20;

const SCENES = [
  { Comp: ColdOpen, duration: COLD_OPEN_DURATION },
  { Comp: ProblemStatement, duration: PROBLEM_STATEMENT_DURATION },
  { Comp: ProductReveal, duration: PRODUCT_REVEAL_DURATION },
  { Comp: FeatureWalkthrough, duration: FEATURE_WALKTHROUGH_DURATION },
  { Comp: Traction, duration: TRACTION_DURATION },
  { Comp: Close, duration: CLOSE_DURATION },
];

const offsets: number[] = [];
{
  let cursor = 0;
  for (const scene of SCENES) {
    offsets.push(cursor);
    cursor += scene.duration - OVERLAP;
  }
}

export const TOTAL_DURATION =
  offsets[offsets.length - 1] + SCENES[SCENES.length - 1].duration;

export const DemoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
      {SCENES.map(({ Comp, duration }, i) => (
        <Sequence
          key={i}
          from={offsets[i]}
          durationInFrames={duration}
          layout="none"
        >
          <Comp />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const DemoVideoComposition: React.FC = () => {
  return (
    <Composition
      id="SummitTuitionDemo"
      component={DemoVideo}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
