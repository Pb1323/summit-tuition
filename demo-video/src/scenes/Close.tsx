import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { Wordmark } from "../components/Wordmark";
import { COLORS, EASE_OUT, FONT_SANS } from "../theme";

export const CLOSE_DURATION = 450; // 15s @ 30fps — includes the final fade to navy

export const Close: React.FC = () => {
  const frame = useCurrentFrame();

  const wordmarkOpacity = interpolate(frame, [0, 40], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlOpacity = interpolate(frame, [50, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final ~5s (150 frames) of this scene fades everything to solid navy.
  const finalFadeOpacity = interpolate(
    frame,
    [CLOSE_DURATION - 150, CLOSE_DURATION - 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <Scene durationInFrames={CLOSE_DURATION} fadeOutFrames={0}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div style={{ opacity: wordmarkOpacity }}>
          <Wordmark scale={0.85} />
        </div>
        <div
          style={{
            opacity: urlOpacity,
            fontFamily: FONT_SANS,
            fontSize: 26,
            letterSpacing: 1,
            color: COLORS.slate,
          }}
        >
          summit-tuition.vercel.app
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: COLORS.navy,
          opacity: finalFadeOpacity,
        }}
      />
    </Scene>
  );
};
