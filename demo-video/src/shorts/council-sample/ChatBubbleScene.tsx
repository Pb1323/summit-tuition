import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SHORT_COLORS, SHORT_FONT_SANS } from "../theme";

export type Bubble = { text: string; from: "user" | "ai" };

type ChatBubbleSceneProps = {
  bubbles: Bubble[];
  stagger?: number;
};

/**
 * Simulated chat exchange — one rounded speech bubble per line, popping in
 * bottom-to-top with a stagger, dark = "ai", light-outline = "user". Used to
 * dramatize a back-and-forth rather than just stating it as a caption.
 */
export const ChatBubbleScene: React.FC<ChatBubbleSceneProps> = ({ bubbles, stagger = 22 }) => {
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
        alignItems: "center",
        gap: 22,
        padding: "0 90px",
      }}
    >
      {bubbles.map((b, i) => {
        const progress = spring({
          frame: frame - i * stagger,
          fps,
          config: { damping: 13, mass: 0.6 },
          durationInFrames: 16,
        });
        const isAi = b.from === "ai";
        return (
          <div
            key={i}
            style={{
              alignSelf: isAi ? "flex-start" : "flex-end",
              maxWidth: "78%",
              padding: "20px 26px",
              borderRadius: 22,
              backgroundColor: isAi ? SHORT_COLORS.ink : "transparent",
              border: isAi ? "none" : `3px solid ${SHORT_COLORS.ink}`,
              opacity: progress,
              transform: `translateY(${(1 - progress) * 26}px) scale(${0.9 + progress * 0.1})`,
            }}
          >
            <span
              style={{
                fontFamily: SHORT_FONT_SANS,
                fontWeight: 600,
                fontSize: 34,
                color: isAi ? SHORT_COLORS.cream : SHORT_COLORS.ink,
                lineHeight: 1.25,
              }}
            >
              {b.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};
