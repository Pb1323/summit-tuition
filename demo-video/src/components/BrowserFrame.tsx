import React from "react";
import { COLORS, FONT_SANS } from "../theme";

type BrowserFrameProps = {
  url?: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
};

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url = "summit-tuition.vercel.app/mocks",
  children,
  width = 1400,
  height = 820,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 40px 90px rgba(0,0,0,0.45)",
        backgroundColor: COLORS.white,
        border: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      <div
        style={{
          height: 52,
          backgroundColor: "#e7e3d8",
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "0 20px",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {["#e2564f", "#e6b84f", "#5cb562"].map((c) => (
            <div
              key={c}
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 28,
            borderRadius: 999,
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            fontFamily: FONT_SANS,
            fontSize: 14,
            color: "#5a5f6e",
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ width: "100%", height: height - 52 }}>{children}</div>
    </div>
  );
};
