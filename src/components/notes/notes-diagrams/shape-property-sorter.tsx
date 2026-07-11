"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

interface ShapeDef {
  id: string;
  label: string;
  group: "Triangles" | "Quadrilaterals";
  points: string;
  sides: string;
  angles: string;
  symmetry: string;
}

const SHAPES: ShapeDef[] = [
  {
    id: "equilateral",
    label: "Equilateral triangle",
    group: "Triangles",
    points: "150,30 70,160 230,160",
    sides: "All 3 sides equal length.",
    angles: "All 3 angles equal — each is 60°.",
    symmetry: "3 lines of symmetry, rotational symmetry of order 3.",
  },
  {
    id: "isosceles",
    label: "Isosceles triangle",
    group: "Triangles",
    points: "150,30 90,160 210,160",
    sides: "Exactly 2 sides equal length.",
    angles: "The 2 angles opposite the equal sides are equal.",
    symmetry: "1 line of symmetry, no rotational symmetry.",
  },
  {
    id: "scalene",
    label: "Scalene triangle",
    group: "Triangles",
    points: "120,30 60,160 235,140",
    sides: "All 3 sides are different lengths.",
    angles: "All 3 angles are different sizes.",
    symmetry: "No lines of symmetry, no rotational symmetry.",
  },
  {
    id: "right",
    label: "Right-angled triangle",
    group: "Triangles",
    points: "70,30 70,160 230,160",
    sides: "Sides can be all different, or two equal (right isosceles).",
    angles: "One angle is exactly 90°.",
    symmetry: "Usually no lines of symmetry (unless also isosceles).",
  },
  {
    id: "square",
    label: "Square",
    group: "Quadrilaterals",
    points: "80,30 220,30 220,170 80,170",
    sides: "All 4 sides equal length; opposite sides parallel.",
    angles: "All 4 angles are 90°.",
    symmetry: "4 lines of symmetry, rotational symmetry of order 4.",
  },
  {
    id: "rectangle",
    label: "Rectangle",
    group: "Quadrilaterals",
    points: "50,50 250,50 250,150 50,150",
    sides: "Opposite sides equal length and parallel.",
    angles: "All 4 angles are 90°.",
    symmetry: "2 lines of symmetry, rotational symmetry of order 2.",
  },
  {
    id: "parallelogram",
    label: "Parallelogram",
    group: "Quadrilaterals",
    points: "80,50 240,50 200,150 40,150",
    sides: "Opposite sides equal length and parallel.",
    angles: "Opposite angles equal; adjacent angles add to 180°.",
    symmetry: "No lines of symmetry, rotational symmetry of order 2.",
  },
  {
    id: "rhombus",
    label: "Rhombus",
    group: "Quadrilaterals",
    points: "150,20 230,100 150,180 70,100",
    sides: "All 4 sides equal length; opposite sides parallel.",
    angles: "Opposite angles equal (not usually 90°).",
    symmetry: "2 lines of symmetry, rotational symmetry of order 2.",
  },
  {
    id: "trapezium",
    label: "Trapezium",
    group: "Quadrilaterals",
    points: "90,50 210,50 250,150 50,150",
    sides: "Exactly one pair of parallel sides.",
    angles: "Angles between the parallel sides add to 180°.",
    symmetry: "Usually no symmetry (isosceles trapezium has 1 line).",
  },
  {
    id: "kite",
    label: "Kite",
    group: "Quadrilaterals",
    points: "150,20 220,90 150,180 80,90",
    sides: "2 pairs of equal adjacent sides.",
    angles: "One pair of opposite angles are equal.",
    symmetry: "1 line of symmetry, no rotational symmetry.",
  },
];

export function ShapePropertySorter() {
  const [selected, setSelected] = useState<string>("equilateral");
  const shape = SHAPES.find((s) => s.id === selected)!;

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 px-6 pt-[26px] pb-3 sm:grid-cols-[220px_1fr]">
        <div className="flex justify-center">
          <svg viewBox="0 0 300 200" className="h-[170px] w-full max-w-[240px]">
            <polygon
              points={shape.points}
              fill="rgba(201,162,75,0.22)"
              stroke={NOTES_GOLD}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center gap-2 rounded-xl border px-4 py-3.5" style={{ borderColor: "rgba(201,162,75,0.3)", background: "rgba(255,255,255,0.04)" }}>
          <div className="font-mono text-[1.05em] font-bold" style={{ color: NOTES_GOLD }}>
            {shape.label}
          </div>
          <div className="text-[0.82em] leading-relaxed text-[rgba(248,245,238,0.82)]">
            <b style={{ color: "#F8F5EE" }}>Sides:</b> {shape.sides}
          </div>
          <div className="text-[0.82em] leading-relaxed text-[rgba(248,245,238,0.82)]">
            <b style={{ color: "#F8F5EE" }}>Angles:</b> {shape.angles}
          </div>
          <div className="text-[0.82em] leading-relaxed text-[rgba(248,245,238,0.82)]">
            <b style={{ color: "#F8F5EE" }}>Symmetry:</b> {shape.symmetry}
          </div>
        </div>
      </div>

      {(["Triangles", "Quadrilaterals"] as const).map((group) => (
        <div key={group} className="flex flex-wrap items-center justify-center gap-2 px-5 pb-3">
          <span className="mr-1 text-[0.7em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.5)]">{group}</span>
          {SHAPES.filter((s) => s.group === group).map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className="rounded-full border px-3.5 py-2 text-[0.76em] font-bold transition-all"
              style={{
                background: selected === s.id ? NOTES_GOLD : "rgba(255,255,255,0.06)",
                color: selected === s.id ? "#0A1F44" : "rgba(248,245,238,0.6)",
                borderColor: selected === s.id ? NOTES_GOLD : "rgba(201,162,75,0.25)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      ))}
      <div className="pb-4" />
    </div>
  );
}
