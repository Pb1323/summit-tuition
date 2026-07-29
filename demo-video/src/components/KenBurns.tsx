import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EASE_IN_OUT } from "../theme";

type KenBurnsProps = {
  durationInFrames: number;
  startScale?: number;
  endScale?: number;
  startX?: number;
  endX?: number;
  startY?: number;
  endY?: number;
  children: React.ReactNode;
};

/** Slow, subtle pan+zoom — never enough to feel like a startup-flashy effect. */
export const KenBurns: React.FC<KenBurnsProps> = ({
  durationInFrames,
  startScale = 1,
  endScale = 1.06,
  startX = 0,
  endX = -12,
  startY = 0,
  endY = -8,
  children,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    easing: EASE_IN_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = startScale + (endScale - startScale) * t;
  const x = startX + (endX - startX) * t;
  const y = startY + (endY - startY) * t;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
};
