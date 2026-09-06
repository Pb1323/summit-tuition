import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SHORT_EASE_OUT } from "../theme";

type ShortSceneProps = {
  durationInFrames: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
  children: React.ReactNode;
};

/**
 * Fades foreground beat content in/out over the persistent checkered
 * background (rendered once, separately, behind every beat) — so the
 * background never resets/flashes between text beats.
 */
export const ShortScene: React.FC<ShortSceneProps> = ({
  durationInFrames,
  fadeInFrames = 10,
  fadeOutFrames = 10,
  children,
}) => {
  const frame = useCurrentFrame();

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
      easing: SHORT_EASE_OUT,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>{children}</div>
  );
};
