import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SHORT_COLORS } from "../theme";

type AccentUnderlineProps = {
  width?: number;
  delay?: number;
};

/** A hand-drawn-feeling orange underline that draws in left-to-right. */
export const AccentUnderline: React.FC<AccentUnderlineProps> = ({
  width = 460,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 22,
  });

  return (
    <svg
      width={width}
      height={18}
      viewBox={`0 0 ${width} 18`}
      style={{ display: "block", marginTop: 18 }}
    >
      <path
        d={`M 4 9 Q ${width / 2} ${progress > 0.5 ? 2 : 14} ${width - 4} 9`}
        stroke={SHORT_COLORS.orange}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
      />
    </svg>
  );
};
