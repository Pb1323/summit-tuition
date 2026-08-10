import React from "react";
import { AbsoluteFill } from "remotion";
import { SHORT_COLORS } from "../theme";

const DOT = 4;
const GAP = 34;

/**
 * Flat cream background with a faint dot grid — the "text card" look from
 * kinetic-typography explainer shorts (dot-grid + big bold statement +
 * decorative bursts), distinct from the checkerboard used by the
 * screen-recording-style template in ../ShortComposition.tsx.
 */
export const CardBackground: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: SHORT_COLORS.cream }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, ${SHORT_COLORS.ink}22 ${DOT}px, transparent ${DOT}px)`,
          backgroundSize: `${GAP}px ${GAP}px`,
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
