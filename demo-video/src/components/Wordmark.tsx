import React from "react";
import { COLORS, FONT_SERIF } from "../theme";

type WordmarkProps = {
  scale?: number;
  color?: string;
};

export const Wordmark: React.FC<WordmarkProps> = ({
  scale = 1,
  color = COLORS.gold,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14 * scale,
      }}
    >
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 500,
          fontSize: 92 * scale,
          letterSpacing: 6 * scale,
          color,
          lineHeight: 1,
        }}
      >
        SUMMIT TUITION
      </div>
      <div
        style={{
          width: 220 * scale,
          height: 1.5,
          backgroundColor: color,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: 24 * scale,
          letterSpacing: 3 * scale,
          color: COLORS.cream,
          opacity: 0.85,
        }}
      >
        The Oxford 11+ Mock Exam Company
      </div>
    </div>
  );
};
