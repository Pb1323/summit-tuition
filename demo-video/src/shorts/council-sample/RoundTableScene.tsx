import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SHORT_COLORS, SHORT_FONT_SANS } from "../theme";
import { RobotAvatar } from "./RobotAvatar";

type RoundTableSceneProps = {
  seats?: number;
  showChairman?: boolean;
  caption?: string;
};

/**
 * The "council table" beat — a tilted grey ellipse with avatars seated
 * around the rim and a small "Final Answer" document card in the middle.
 * When showChairman is set, a crown pops in above the table (the "chairman
 * steps in" moment).
 */
export const RoundTableScene: React.FC<RoundTableSceneProps> = ({
  seats = 5,
  showChairman = false,
  caption,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tablePop = spring({ frame, fps, config: { damping: 12, mass: 0.7 }, durationInFrames: 18 });
  const crownPop = spring({ frame: frame - 10, fps, config: { damping: 10, mass: 0.6 }, durationInFrames: 16 });
  const captionPop = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 12 });

  const radiusX = 220;
  const radiusY = 100;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
      }}
    >
      <div
        style={{
          position: "relative",
          width: radiusX * 2 + 140,
          height: radiusY * 2 + 140,
          opacity: tablePop,
          transform: `scale(${0.75 + tablePop * 0.25})`,
        }}
      >
        {showChairman ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: `translateX(-50%) scale(${0.5 + crownPop * 0.5})`,
              opacity: crownPop,
            }}
          >
            <svg width="52" height="40" viewBox="0 0 52 40">
              <polygon
                points="4,36 4,16 15,26 26,10 37,26 48,16 48,36"
                fill={SHORT_COLORS.ink}
              />
            </svg>
          </div>
        ) : null}

        <svg
          style={{ position: "absolute", top: 70, left: 70 }}
          width={radiusX * 2}
          height={radiusY * 2}
        >
          <ellipse
            cx={radiusX}
            cy={radiusY}
            rx={radiusX}
            ry={radiusY}
            fill="#d8d2c4"
            stroke={SHORT_COLORS.ink}
            strokeWidth={3}
          />
        </svg>

        <div
          style={{
            position: "absolute",
            top: 70 + radiusY - 46,
            left: 70 + radiusX - 60,
            width: 120,
            height: 92,
            backgroundColor: SHORT_COLORS.cream,
            borderRadius: 10,
            border: `2px solid ${SHORT_COLORS.ink}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: 8,
          }}
        >
          <div style={{ width: "70%", height: 5, backgroundColor: SHORT_COLORS.ink, opacity: 0.5 }} />
          <div style={{ width: "60%", height: 5, backgroundColor: SHORT_COLORS.ink, opacity: 0.5 }} />
          <div
            style={{
              fontFamily: SHORT_FONT_SANS,
              fontWeight: 700,
              fontSize: 15,
              color: SHORT_COLORS.ink,
              marginTop: 4,
            }}
          >
            Final Answer
          </div>
        </div>

        {Array.from({ length: seats }).map((_, i) => {
          const angle = (2 * Math.PI * i) / seats - Math.PI / 2;
          const x = 70 + radiusX + radiusX * Math.cos(angle);
          const y = 70 + radiusY + radiusY * Math.sin(angle);
          const seatPop = spring({
            frame: frame - i * 3,
            fps,
            config: { damping: 11, mass: 0.6 },
            durationInFrames: 14,
          });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x - 26,
                top: y - 26,
                opacity: seatPop,
                transform: `scale(${0.5 + seatPop * 0.5})`,
              }}
            >
              <RobotAvatar size={52} />
            </div>
          );
        })}
      </div>

      {caption ? (
        <div
          style={{
            fontFamily: SHORT_FONT_SANS,
            fontWeight: 700,
            fontSize: 46,
            color: SHORT_COLORS.ink,
            opacity: captionPop,
            transform: `translateY(${(1 - captionPop) * 14}px)`,
            textAlign: "center",
            padding: "0 90px",
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};
