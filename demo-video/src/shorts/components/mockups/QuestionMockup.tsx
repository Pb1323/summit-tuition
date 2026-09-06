import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_SANS, FONT_SERIF } from "../../../theme";

const OPTIONS = ["14", "18", "21", "24"];
const CORRECT_INDEX = 2;

/** Recreation of a Summit Tuition mock question card — one MCQ, options, a
 * correct-answer highlight animating in partway through the beat. */
export const QuestionMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const revealCorrect = interpolate(frame, [28, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.cream,
        padding: "36px 34px",
        display: "flex",
        flexDirection: "column",
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
          marginBottom: 10,
        }}
      >
        Question 14 of 50 &middot; Maths
      </div>
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontSize: 34,
          fontWeight: 600,
          color: COLORS.navy,
          lineHeight: 1.28,
          marginBottom: 26,
        }}
      >
        A ribbon is cut into pieces in the ratio 3 : 4. The shorter piece is
        18cm. How long is the longer piece?
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {OPTIONS.map((opt, i) => {
          const isCorrect = i === CORRECT_INDEX;
          const bg = isCorrect
            ? `rgba(34,150,90,${0.12 * revealCorrect})`
            : "rgba(23,32,51,0.04)";
          const border = isCorrect
            ? `2px solid rgba(34,150,90,${0.35 + 0.65 * revealCorrect})`
            : "2px solid rgba(23,32,51,0.08)";
          return (
            <div
              key={opt}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderRadius: 14,
                backgroundColor: bg,
                border,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  backgroundColor: isCorrect
                    ? `rgba(34,150,90,${0.18 * revealCorrect + 0.06})`
                    : "rgba(23,32,51,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_SANS,
                  fontWeight: 700,
                  fontSize: 16,
                  color: isCorrect ? "#1f7a4d" : COLORS.navy,
                  flexShrink: 0,
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 22,
                  fontWeight: 600,
                  color: COLORS.navy,
                }}
              >
                {opt}cm
              </div>
              {isCorrect ? (
                <div
                  style={{
                    marginLeft: "auto",
                    fontFamily: FONT_SANS,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#1f7a4d",
                    opacity: revealCorrect,
                  }}
                >
                  ✓ Correct
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
