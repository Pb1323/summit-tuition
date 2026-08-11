import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SHORT_COLORS, SHORT_FONT_SANS } from "../theme";

type BulletListSceneProps = {
  lines: string[];
  stagger?: number;
};

/**
 * Rapid-fire bullet reveal — one diamond-bullet line pops in at a time.
 * Used for the "quick list of things that happen" beats in the reference.
 */
export const BulletListScene: React.FC<BulletListSceneProps> = ({ lines, stagger = 18 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 26,
        padding: "0 110px",
      }}
    >
      {lines.map((line, i) => {
        const progress = spring({
          frame: frame - i * stagger,
          fps,
          config: { damping: 13, mass: 0.55 },
          durationInFrames: 14,
        });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              opacity: progress,
              transform: `translateX(${(1 - progress) * -24}px)`,
            }}
          >
            <span style={{ color: SHORT_COLORS.orange, fontSize: 30, lineHeight: 1.4 }}>&#10022;</span>
            <span
              style={{
                fontFamily: SHORT_FONT_SANS,
                fontWeight: 600,
                fontSize: 42,
                color: SHORT_COLORS.ink,
                lineHeight: 1.3,
              }}
            >
              {line}
            </span>
          </div>
        );
      })}
    </div>
  );
};
