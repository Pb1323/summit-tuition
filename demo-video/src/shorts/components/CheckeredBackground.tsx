import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SHORT_COLORS } from "../theme";

const SQUARE = 96;

/**
 * Subtle two-tone beige checkerboard, drifting slowly for a "living
 * background" feel behind kinetic-typography text. The two tones are
 * intentionally close so the pattern reads as texture, not a loud grid.
 */
export const CheckeredBackground: React.FC = () => {
  const frame = useCurrentFrame();
  // One full square of drift over ~20s — slow enough to be nearly
  // imperceptible frame-to-frame, visible over a whole short.
  const drift = interpolate(frame, [0, 600], [0, SQUARE], {
    extrapolateRight: "extend",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: SHORT_COLORS.beige }}>
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(45deg, ${SHORT_COLORS.beigeAlt} 25%, transparent 25%),
            linear-gradient(-45deg, ${SHORT_COLORS.beigeAlt} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${SHORT_COLORS.beigeAlt} 75%),
            linear-gradient(-45deg, transparent 75%, ${SHORT_COLORS.beigeAlt} 75%)
          `,
          backgroundSize: `${SQUARE}px ${SQUARE}px`,
          backgroundPosition: `${drift}px 0, ${drift}px ${SQUARE / 2}px, ${
            drift + SQUARE / 2
          }px ${-(SQUARE / 2)}px, ${drift - SQUARE / 2}px 0`,
          opacity: 0.55,
        }}
      />
    </AbsoluteFill>
  );
};
