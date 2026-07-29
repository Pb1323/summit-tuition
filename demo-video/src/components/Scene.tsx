import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, EASE_IN_OUT } from "../theme";

type SceneProps = {
  durationInFrames: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
  children: React.ReactNode;
};

/**
 * Wraps a scene with a soft opacity crossfade in/out so that, combined with
 * overlapping <Sequence> offsets in Root.tsx, cuts between scenes read as
 * slow dissolves rather than hard cuts.
 */
export const Scene: React.FC<SceneProps> = ({
  durationInFrames,
  fadeInFrames = 20,
  fadeOutFrames = 20,
  children,
}) => {
  const frame = useCurrentFrame();

  // interpolate() requires a strictly increasing input range, so collapse
  // zero-length fades (e.g. the very first/last scene) into a single point.
  const safeFadeIn = Math.max(fadeInFrames, 0.0001);
  const fadeOutStart = Math.min(
    durationInFrames - fadeOutFrames,
    durationInFrames - 0.0001,
  );

  const opacity = interpolate(
    frame,
    [0, safeFadeIn, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    {
      easing: EASE_IN_OUT,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: COLORS.navy,
        opacity,
      }}
    >
      {children}
    </div>
  );
};
