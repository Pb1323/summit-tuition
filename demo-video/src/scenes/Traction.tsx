import React from "react";
import { interpolate, Sequence, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { COLORS, EASE_OUT, FONT_SANS, FONT_SERIF } from "../theme";

export const TRACTION_DURATION = 450; // 15s @ 30fps
const STAT_DURATION = 150;

type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: "[X] students", label: "prepared on Summit since launch" },
  { value: "[Y] mock papers", label: "GL & school-style, marked instantly" },
  { value: "[Z]% report accuracy", label: "vs. real entrance exam outcomes" },
];

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 25, STAT_DURATION - 25, STAT_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(frame, [0, 30], [0.92, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontSize: 132,
          color: COLORS.gold,
          lineHeight: 1,
        }}
      >
        {stat.value}
      </div>
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 26,
          color: COLORS.cream,
          letterSpacing: 0.5,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
};

export const Traction: React.FC = () => {
  return (
    <Scene durationInFrames={TRACTION_DURATION}>
      {STATS.map((stat, i) => (
        <Sequence
          key={stat.value}
          from={i * STAT_DURATION}
          durationInFrames={STAT_DURATION}
          layout="none"
        >
          <StatCard stat={stat} />
        </Sequence>
      ))}
    </Scene>
  );
};
