import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { BrowserFrame } from "../components/BrowserFrame";
import { PlaceholderShot } from "../components/PlaceholderShot";
import { KenBurns } from "../components/KenBurns";
import { COLORS, EASE_OUT, FONT_SANS, FONT_SERIF } from "../theme";

export const PRODUCT_REVEAL_DURATION = 300; // 10s @ 30fps

export const ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 50], [0.9, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene durationInFrames={PRODUCT_REVEAL_DURATION}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <div
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: "italic",
            fontSize: 30,
            color: COLORS.goldSoft,
            opacity: captionOpacity,
            letterSpacing: 1,
          }}
        >
          One real exam room. Online.
        </div>
        <div style={{ transform: `scale(${scale})`, opacity }}>
          <BrowserFrame url="summit-tuition.vercel.app/mocks/gl-english-8">
            <KenBurns durationInFrames={PRODUCT_REVEAL_DURATION}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: COLORS.cream,
                  display: "flex",
                  flexDirection: "column",
                  padding: 28,
                  gap: 20,
                  fontFamily: FONT_SANS,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_SERIF,
                      fontSize: 22,
                      color: COLORS.navy,
                    }}
                  >
                    English GL-Style Paper VIII
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      color: COLORS.navy,
                      backgroundColor: "#e7e3d8",
                      padding: "6px 16px",
                      borderRadius: 999,
                    }}
                  >
                    38:24 remaining
                  </div>
                </div>
                <PlaceholderShot
                  label="REAL SCREENSHOT HERE — mock exam question interface"
                  height="100%"
                />
              </div>
            </KenBurns>
          </BrowserFrame>
        </div>
      </div>
    </Scene>
  );
};
