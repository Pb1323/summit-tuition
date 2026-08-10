import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SHORT_COLORS } from "../theme";

type StarburstProps = {
  corner: "tl" | "tr" | "bl" | "br";
  size?: number;
  delay?: number;
};

const CORNER_STYLE: Record<StarburstProps["corner"], React.CSSProperties> = {
  tl: { top: -30, left: -30 },
  tr: { top: -30, right: -30 },
  bl: { bottom: -30, left: -30 },
  br: { bottom: -30, right: -30 },
};

// 8-point spiky star polygon, alternating outer/inner radius.
const starPoints = (outer: number, inner: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 8) * i - Math.PI / 2;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
};

/**
 * Orange 8-point "sparkle" burst, one of the recurring corner decorations in
 * kinetic-typography explainer shorts. Pops in with a spring and drifts with
 * a slow continuous rotation for the rest of the beat.
 */
export const Starburst: React.FC<StarburstProps> = ({ corner, size = 220, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 11, mass: 0.7 },
    durationInFrames: 18,
  });

  const rotate = interpolate(frame, [0, 300], [0, 14], { extrapolateRight: "extend" });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        ...CORNER_STYLE[corner],
        opacity: pop,
        transform: `scale(${0.6 + pop * 0.4}) rotate(${rotate}deg)`,
        filter: "drop-shadow(6px 10px 14px rgba(43,36,28,0.28))",
      }}
    >
      <polygon points={starPoints(48, 9)} fill={SHORT_COLORS.orange} />
    </svg>
  );
};
