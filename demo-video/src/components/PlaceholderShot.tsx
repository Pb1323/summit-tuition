import React from "react";
import { COLORS, FONT_SANS } from "../theme";

type PlaceholderShotProps = {
  label: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
};

/**
 * Stand-in for a real product screenshot. Swap for a <Img src={staticFile(...)} />
 * once real screenshots are supplied — see README.md "Swapping in real screenshots".
 */
export const PlaceholderShot: React.FC<PlaceholderShotProps> = ({
  label,
  width = "100%",
  height = "100%",
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2a3245",
        border: "2px dashed #6b7488",
        borderRadius: 8,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: 1,
          color: COLORS.slate,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {label}
      </span>
    </div>
  );
};
