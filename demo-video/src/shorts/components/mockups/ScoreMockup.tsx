import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_SANS, FONT_SERIF } from "../../../theme";

const TOPICS: { label: string; pct: number }[] = [
  { label: "Algebra", pct: 92 },
  { label: "Geometry", pct: 74 },
  { label: "Ratio & Proportion", pct: 58 },
  { label: "Number", pct: 88 },
];

/** Recreation of an instant score + topic-breakdown screen. */
export const ScoreMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const scoreCount = Math.round(
    interpolate(frame, [0, 34], [0, 42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.cream,
        padding: "34px 34px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: COLORS.slate,
          marginBottom: 14,
          alignSelf: "flex-start",
        }}
      >
        Your Score
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginBottom: 30,
        }}
      >
        <span style={{ fontFamily: FONT_SERIF, fontSize: 84, fontWeight: 700, color: COLORS.navy }}>
          {scoreCount}
        </span>
        <span style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 600, color: COLORS.slate }}>
          / 50
        </span>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 18 }}>
        {TOPICS.map((t, i) => {
          const barW = interpolate(
            frame,
            [10 + i * 6, 30 + i * 6],
            [0, t.pct],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <div key={t.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: FONT_SANS,
                  fontSize: 17,
                  fontWeight: 600,
                  color: COLORS.navy,
                  marginBottom: 8,
                }}
              >
                <span>{t.label}</span>
                <span>{Math.round(barW)}%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 14,
                  borderRadius: 999,
                  backgroundColor: "rgba(23,32,51,0.07)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${barW}%`,
                    height: "100%",
                    borderRadius: 999,
                    backgroundColor: COLORS.gold,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
