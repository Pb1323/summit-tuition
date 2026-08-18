"use client";

import { ShapeChoicePicker, nvrSvg } from "./shape-choice-picker";
import { NOTES_GOLD } from "../notes-theme";

const STROKE = "#F8F5EE";

export function OddOneOutDemo() {
  return (
    <ShapeChoicePicker
      instruction="Four of these five figures share a rule. Click the ONE that breaks it."
      options={[
        nvrSvg.circle(STROKE),
        nvrSvg.square(STROKE),
        nvrSvg.triangle(STROKE),
        nvrSvg.circle("none"),
        nvrSvg.square(STROKE),
      ]}
      correctIdx={3}
      correction={"the rule is shading — every other figure is solid, but this circle is outline-only."}
      wrongHint="ignore the different shapes for a moment — look only at whether each figure is filled in or just an outline."
    />
  );
}

export function SeriesSequencesDemo() {
  const step = (deg: number) => (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <g transform={`rotate(${deg} 32 32)`}>
        <rect x="18" y="10" width="28" height="28" fill={NOTES_GOLD} />
      </g>
    </svg>
  );
  return (
    <ShapeChoicePicker
      instruction="Which figure comes next in the sequence?"
      context={
        <>
          {step(0)}
          <span style={{ color: "rgba(248,245,238,0.5)" }}>→</span>
          {step(45)}
          <span style={{ color: "rgba(248,245,238,0.5)" }}>→</span>
          {step(90)}
          <span style={{ color: "rgba(248,245,238,0.5)" }}>→</span>
          <span style={{ color: NOTES_GOLD, fontWeight: 700, fontSize: "1.4em" }}>?</span>
        </>
      }
      options={[step(135), step(45), nvrSvg.square("none"), step(180)]}
      correctIdx={0}
      correction={"the square rotates 45° clockwise at every step — after 0°, 45°, 90°, the next turn lands it at 135°."}
      wrongHint="work out exactly how many degrees the shape turns between each step, then apply that same turn one more time."
    />
  );
}

export function AnalogiesDemo() {
  const solidSq = (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <rect x="14" y="14" width="36" height="36" fill={NOTES_GOLD} />
    </svg>
  );
  const outlineSqRotated = (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <g transform="rotate(90 32 32)">
        <rect x="14" y="14" width="36" height="36" fill="none" stroke={STROKE} strokeWidth="3" />
      </g>
    </svg>
  );
  const solidTriangle = nvrSvg.triangle(NOTES_GOLD);
  return (
    <ShapeChoicePicker
      instruction="Figure 1 is to Figure 2 as Figure 3 is to which answer?"
      context={
        <>
          {solidSq}
          <span style={{ color: "rgba(248,245,238,0.5)" }}>is to</span>
          {outlineSqRotated}
          <span style={{ color: NOTES_GOLD, marginLeft: 12 }}>as</span>
          {solidTriangle}
          <span style={{ color: "rgba(248,245,238,0.5)" }}>is to</span>
          <span style={{ color: NOTES_GOLD, fontWeight: 700, fontSize: "1.4em" }}>?</span>
        </>
      }
      options={[nvrSvg.triangle("none", 90), nvrSvg.triangle(NOTES_GOLD), nvrSvg.triangle(NOTES_GOLD, 180), nvrSvg.circle("none")]}
      correctIdx={0}
      correction={"the rule linking figures 1 and 2 is: rotate 90° AND change from solid fill to outline only. Applying that same rule to the solid triangle gives a rotated, outline-only triangle."}
      wrongHint="work out BOTH changes between the first two figures — a rotation and a fill change — then apply both to the third figure, not just one."
    />
  );
}

export function RotationDemo() {
  const lShape = (transform?: string) => (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <g transform={transform}>
        <polygon points="16,10 48,10 48,32 32,32 32,54 16,54" fill={NOTES_GOLD} />
      </g>
    </svg>
  );
  return (
    <ShapeChoicePicker
      instruction="Which option shows the SAME figure as the original, just rotated (not mirrored)?"
      context={
        <>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            {lShape()}
            <span style={{ fontSize: "0.7em", color: "rgba(248,245,238,0.5)" }}>Original</span>
          </div>
          <span style={{ color: "rgba(248,245,238,0.5)" }}>→</span>
        </>
      }
      options={[
        lShape("rotate(90 32 32)"),
        lShape("scale(-1,1) translate(-64,0)"),
        lShape("rotate(180 32 32)"),
        lShape("scale(1,-1) translate(0,-64)"),
      ]}
      correctIdx={0}
      correction={"option A is the original figure turned 90° clockwise — a true rotation. The others are flipped (mirrored), which changes the figure into its mirror image, not a rotation of it."}
      wrongHint="trace the shape with your finger as if spinning it flat on the table — a mirrored version will look like a reversed 'flip', not a spin."
    />
  );
}

export function MirrorReflectionDemo() {
  return (
    <ShapeChoicePicker
      instruction="The dashed line is a mirror. Click the option showing the correct reflection of the original figure."
      context={
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg width="70" height="60" viewBox="0 0 70 60">
            <line x1="35" y1="0" x2="35" y2="60" stroke={NOTES_GOLD} strokeWidth="2" strokeDasharray="4,3" />
            <polygon points="6,10 6,30 26,30" fill="#F8F5EE" />
          </svg>
          <span style={{ fontSize: "0.7em", color: "rgba(248,245,238,0.5)" }}>Original + mirror line</span>
        </div>
      }
      options={[
        <svg key="a" width="30" height="30" viewBox="0 0 30 30"><polygon points="24,10 24,30 4,30" fill="#F8F5EE" /></svg>,
        <svg key="b" width="30" height="30" viewBox="0 0 30 30"><polygon points="6,10 6,30 26,30" fill="#F8F5EE" /></svg>,
        <svg key="c" width="30" height="30" viewBox="0 0 30 30"><polygon points="6,30 6,10 26,10" fill="#F8F5EE" /></svg>,
        <svg key="d" width="30" height="30" viewBox="0 0 30 30"><polygon points="24,30 24,10 4,10" fill="#F8F5EE" /></svg>,
      ]}
      correctIdx={0}
      correction={"a mirror reflection flips the figure left-right across the line, keeping it at the same height — option A is the correct flipped copy, sitting the same distance from the line as the original."}
      wrongHint="imagine folding the page along the dashed line — where would the original shape land? Watch out for options that are rotated instead of truly flipped."
    />
  );
}
