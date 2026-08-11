import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SHORT_COLORS, SHORT_FONT_SANS } from "../theme";

type TypingSceneProps = {
  fullText: string;
  caption?: string;
  charsPerFrame?: number;
};

/**
 * Rounded chat-input pill with text appearing character-by-character and a
 * blinking cursor — dramatizes "you just type two words" rather than
 * stating it as plain caption text.
 */
export const TypingScene: React.FC<TypingSceneProps> = ({ fullText, caption, charsPerFrame = 0.6 }) => {
  const frame = useCurrentFrame();

  const charCount = Math.min(fullText.length, Math.floor(frame * charsPerFrame));
  const shown = fullText.slice(0, charCount);
  const cursorOn = Math.floor(frame / 8) % 2 === 0;

  const boxOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: "0 90px",
      }}
    >
      {caption ? (
        <div
          style={{
            fontFamily: SHORT_FONT_SANS,
            fontWeight: 700,
            fontSize: 52,
            color: SHORT_COLORS.ink,
            textAlign: "center",
          }}
        >
          {caption}
        </div>
      ) : null}

      <div
        style={{
          width: "100%",
          maxWidth: 780,
          minHeight: 96,
          borderRadius: 48,
          backgroundColor: SHORT_COLORS.cream,
          border: `3px solid ${SHORT_COLORS.ink}`,
          display: "flex",
          alignItems: "center",
          padding: "0 42px",
          opacity: boxOpacity,
        }}
      >
        <span
          style={{
            fontFamily: SHORT_FONT_SANS,
            fontWeight: 600,
            fontSize: 40,
            color: SHORT_COLORS.ink,
          }}
        >
          {shown}
          <span style={{ opacity: cursorOn ? 1 : 0 }}>|</span>
        </span>
      </div>
    </div>
  );
};
