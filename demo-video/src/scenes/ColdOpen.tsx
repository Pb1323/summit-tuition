import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { Wordmark } from "../components/Wordmark";
import { EASE_OUT } from "../theme";

export const COLD_OPEN_DURATION = 150; // 5s @ 30fps

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();

  const wordmarkOpacity = interpolate(frame, [10, 70], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wordmarkScale = interpolate(frame, [10, 70], [0.96, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene durationInFrames={COLD_OPEN_DURATION} fadeInFrames={0}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            opacity: wordmarkOpacity,
            transform: `scale(${wordmarkScale})`,
          }}
        >
          <Wordmark scale={1} />
        </div>
      </div>
    </Scene>
  );
};
