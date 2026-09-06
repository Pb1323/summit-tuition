import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_SANS, FONT_SERIF } from "../../../theme";

/** Recreation of a Study Notes concept card with a simple animated diagram. */
export const NotesMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [0, 40], [0, 270], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          fontFamily: FONT_SANS,
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: COLORS.slate,
          marginBottom: 10,
        }}
      >
        Study Notes &middot; Geometry
      </div>
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontSize: 32,
          fontWeight: 600,
          color: COLORS.navy,
          marginBottom: 22,
        }}
      >
        Angles on a Straight Line
      </div>

      <div
        style={{
          flex: 1,
          borderRadius: 18,
          backgroundColor: COLORS.white,
          border: "1px solid rgba(23,32,51,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="260" height="180" viewBox="0 0 260 180">
          <line x1="20" y1="140" x2="240" y2="140" stroke={COLORS.navy} strokeWidth="4" />
          <line
            x1="130"
            y1="140"
            x2={130 + 90 * Math.cos((Math.PI * sweep) / 180)}
            y2={140 - 90 * Math.sin((Math.PI * sweep) / 180)}
            stroke={COLORS.gold}
            strokeWidth="4"
          />
          <circle cx="130" cy="140" r="5" fill={COLORS.navy} />
          <path
            d="M 100 140 A 30 30 0 0 1 130 110"
            fill="none"
            stroke={COLORS.gold}
            strokeWidth="3"
          />
        </svg>
      </div>

      <div
        style={{
          marginTop: 22,
          fontFamily: FONT_SANS,
          fontSize: 20,
          fontWeight: 500,
          color: COLORS.navy,
          lineHeight: 1.5,
          backgroundColor: "rgba(245,158,11,0.1)",
          borderRadius: 12,
          padding: "16px 18px",
        }}
      >
        Angles on a straight line always add up to <strong>180°</strong>.
      </div>
    </div>
  );
};
