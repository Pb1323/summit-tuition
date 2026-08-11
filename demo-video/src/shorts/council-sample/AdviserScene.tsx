import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SHORT_COLORS, SHORT_FONT_SANS } from "../theme";
import { RobotAvatar } from "./RobotAvatar";

type AdviserSceneProps = {
  title: string;
  description: string;
};

/**
 * One "adviser" beat — avatar icon, bold title, a divider line, then the
 * one-line description. Cut fast (see script durations) so a run of these
 * feels like a rapid roll call.
 */
export const AdviserScene: React.FC<AdviserSceneProps> = ({ title, description }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const avatarPop = spring({ frame, fps, config: { damping: 11, mass: 0.6 }, durationInFrames: 14 });
  const titlePop = spring({ frame: frame - 4, fps, config: { damping: 200 }, durationInFrames: 12 });
  const linePop = spring({ frame: frame - 12, fps, config: { damping: 200 }, durationInFrames: 12 });
  const descPop = spring({ frame: frame - 18, fps, config: { damping: 200 }, durationInFrames: 14 });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 90px",
      }}
    >
      <div style={{ opacity: avatarPop, transform: `scale(${0.5 + avatarPop * 0.5})`, marginBottom: 20 }}>
        <RobotAvatar size={90} />
      </div>

      <div
        style={{
          fontFamily: SHORT_FONT_SANS,
          fontWeight: 800,
          fontSize: 64,
          color: SHORT_COLORS.ink,
          opacity: titlePop,
          transform: `translateY(${(1 - titlePop) * 16}px)`,
          textAlign: "center",
        }}
      >
        {title}
      </div>

      <div
        style={{
          width: 90,
          height: 4,
          backgroundColor: SHORT_COLORS.orange,
          margin: "18px 0",
          transform: `scaleX(${linePop})`,
        }}
      />

      <div
        style={{
          fontFamily: SHORT_FONT_SANS,
          fontWeight: 500,
          fontSize: 36,
          color: SHORT_COLORS.ink,
          opacity: descPop,
          transform: `translateY(${(1 - descPop) * 14}px)`,
          textAlign: "center",
          maxWidth: 760,
        }}
      >
        {description}
      </div>
    </div>
  );
};
