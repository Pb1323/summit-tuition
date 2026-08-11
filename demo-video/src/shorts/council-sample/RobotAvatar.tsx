import React from "react";
import { SHORT_COLORS } from "../theme";

type RobotAvatarProps = {
  size?: number;
  color?: string;
};

/**
 * Small mascot icon reused across the council-sample beats (swarm, adviser
 * cards, round table) — a simple geometric "robot" head-and-legs glyph, not
 * a copy of any specific brand's mascot art.
 */
export const RobotAvatar: React.FC<RobotAvatarProps> = ({ size = 64, color = SHORT_COLORS.orange }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="14" y="16" width="36" height="28" rx="10" fill={color} />
    <circle cx="26" cy="30" r="4" fill={SHORT_COLORS.cream} />
    <circle cx="38" cy="30" r="4" fill={SHORT_COLORS.cream} />
    <line x1="32" y1="16" x2="32" y2="6" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="4" r="4" fill={color} />
    <line x1="20" y1="44" x2="16" y2="58" stroke={color} strokeWidth="5" strokeLinecap="round" />
    <line x1="32" y1="44" x2="32" y2="58" stroke={color} strokeWidth="5" strokeLinecap="round" />
    <line x1="44" y1="44" x2="48" y2="58" stroke={color} strokeWidth="5" strokeLinecap="round" />
  </svg>
);
