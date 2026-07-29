import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { COLORS, EASE_OUT, FONT_SERIF, FONT_SANS } from "../theme";

export const PROBLEM_STATEMENT_DURATION = 300; // 10s @ 30fps

const LINES = [
  { text: "Parents preparing for the 11+ don't lack worksheets.", at: 0 },
  { text: "They lack a trustworthy answer to one question:", at: 75 },
  { text: "“Is my child actually ready?”", at: 165, emphasis: true },
];

const Line: React.FC<{
  text: string;
  appearAt: number;
  emphasis?: boolean;
}> = ({ text, appearAt, emphasis }) => {
  const frame = useCurrentFrame();
  const local = frame - appearAt;

  const opacity = interpolate(local, [0, 35], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 35], [16, 0], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily: emphasis ? FONT_SERIF : FONT_SANS,
        fontStyle: emphasis ? "italic" : "normal",
        fontWeight: emphasis ? 500 : 400,
        fontSize: emphasis ? 72 : 46,
        color: emphasis ? COLORS.gold : COLORS.cream,
        textAlign: "center",
        maxWidth: 1400,
        lineHeight: 1.3,
      }}
    >
      {text}
    </div>
  );
};

export const ProblemStatement: React.FC = () => {
  return (
    <Scene durationInFrames={PROBLEM_STATEMENT_DURATION}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          padding: "0 160px",
        }}
      >
        {LINES.map((line) => (
          <Line
            key={line.text}
            text={line.text}
            appearAt={line.at}
            emphasis={line.emphasis}
          />
        ))}
      </div>
    </Scene>
  );
};
