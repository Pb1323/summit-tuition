import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SHORT_COLORS, SHORT_FONT_SANS } from "../theme";
import { RobotAvatar } from "./RobotAvatar";

type SwarmSceneProps = {
  count?: number;
  caption?: string;
};

/**
 * Grid of small avatar icons popping in with a per-tile stagger — the
 * "many advisers at once" beat, sitting between the chat-bubble problem
 * statement and the individual adviser cards.
 */
export const SwarmScene: React.FC<SwarmSceneProps> = ({ count = 10, caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cols = 5;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 48,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          columnGap: 28,
          rowGap: 28,
        }}
      >
        {Array.from({ length: count }).map((_, i) => {
          const delay = i * 3;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 10, mass: 0.6 },
            durationInFrames: 14,
          });
          return (
            <div
              key={i}
              style={{
                opacity: progress,
                transform: `scale(${0.4 + progress * 0.6})`,
              }}
            >
              <RobotAvatar size={68} />
            </div>
          );
        })}
      </div>

      {caption ? (
        <div
          style={{
            fontFamily: SHORT_FONT_SANS,
            fontWeight: 700,
            fontSize: 52,
            color: SHORT_COLORS.ink,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};
