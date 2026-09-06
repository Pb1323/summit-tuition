import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MockupCard } from "./MockupCard";
import { SHORT_EASE_OUT } from "../theme";

type TopZoneProps = {
  children: React.ReactNode;
  /** Small random-feeling tilt per beat so consecutive beats don't look identical. */
  tilt?: number;
};

/**
 * Top ~58% "screen recording" zone: the mockup card floats in, gets a slow
 * continuous Ken Burns zoom for the hold, and a quick scale-punch on entry
 * so each beat lands like a hard cut rather than a soft crossfade.
 */
export const TopZone: React.FC<TopZoneProps> = ({ children, tilt = 0 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const entry = interpolate(frame, [0, 10], [0, 1], {
    easing: SHORT_EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Punch in slightly past 1 then settle — the "cut" feel.
  const punch = interpolate(frame, [0, 6, 14], [0.9, 1.035, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slowZoom = interpolate(frame, [0, durationInFrames], [1, 1.045], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "58%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          opacity: entry,
          transform: `scale(${punch * slowZoom}) rotate(${tilt}deg)`,
        }}
      >
        <MockupCard>{children}</MockupCard>
      </div>
    </div>
  );
};
