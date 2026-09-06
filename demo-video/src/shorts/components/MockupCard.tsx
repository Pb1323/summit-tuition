import React from "react";
import { COLORS as PRODUCT_COLORS, FONT_SANS as PRODUCT_FONT_SANS } from "../../theme";

type MockupCardProps = {
  url?: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
};

/**
 * Browser-chrome card that frames a recreated product UI, styled with the
 * REAL Summit Tuition navy/gold palette (not the short template's own
 * beige/orange) so it reads as an actual screen recording of the app rather
 * than more kinetic-typography decoration. This is the "real content"
 * anchor the reference genre always has and the old full-text template
 * lacked entirely.
 */
export const MockupCard: React.FC<MockupCardProps> = ({
  url = "summit-tuition.vercel.app",
  children,
  width = 940,
  height = 760,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 50px 110px rgba(23,32,51,0.38), 0 8px 24px rgba(23,32,51,0.22)",
        backgroundColor: PRODUCT_COLORS.white,
        border: "1px solid rgba(23,32,51,0.08)",
      }}
    >
      <div
        style={{
          height: 46,
          backgroundColor: "#eef0f4",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 18px",
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          {["#e2564f", "#e6b84f", "#5cb562"].map((c) => (
            <div
              key={c}
              style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: c }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 24,
            borderRadius: 999,
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            fontFamily: PRODUCT_FONT_SANS,
            fontSize: 12,
            color: "#5a5f6e",
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ width: "100%", height: height - 46 }}>{children}</div>
    </div>
  );
};
