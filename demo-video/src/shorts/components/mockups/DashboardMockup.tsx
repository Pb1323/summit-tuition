import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_SANS, FONT_SERIF } from "../../../theme";

const ROWS: { title: string; tag: string; locked?: boolean }[] = [
  { title: "Maths GL-Style Full Paper I", tag: "Ready" },
  { title: "English GL-Style Full Paper III", tag: "Ready" },
  { title: "Non-Verbal Reasoning — Elite", tag: "Elite", locked: true },
];

/** Recreation of the student dashboard's available-mocks list. */
export const DashboardMockup: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.cream,
        padding: "34px 34px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontSize: 32,
          fontWeight: 600,
          color: COLORS.navy,
          marginBottom: 22,
        }}
      >
        Available Mocks
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ROWS.map((row, i) => {
          const rise = interpolate(frame, [6 + i * 8, 22 + i * 8], [24, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const op = interpolate(frame, [6 + i * 8, 22 + i * 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={row.title}
              style={{
                opacity: op,
                transform: `translateY(${rise}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 22px",
                borderRadius: 16,
                backgroundColor: COLORS.white,
                border: "1px solid rgba(23,32,51,0.08)",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 19,
                  fontWeight: 600,
                  color: COLORS.navy,
                  maxWidth: 460,
                }}
              >
                {row.title}
              </div>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  color: row.locked ? COLORS.slate : "#1f7a4d",
                  backgroundColor: row.locked
                    ? "rgba(139,147,167,0.15)"
                    : "rgba(34,150,90,0.12)",
                  padding: "6px 12px",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                }}
              >
                {row.tag}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
