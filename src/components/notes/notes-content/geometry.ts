import type { TopicContent } from "../types";
import { AngleSumExplorer } from "../notes-diagrams/angle-sum-explorer";
import { ShapePropertySorter } from "../notes-diagrams/shape-property-sorter";
import { AreaPerimeterGrid } from "../notes-diagrams/area-perimeter-grid";

export const geometryTopic: TopicContent = {
  slug: "geometry",
  subject: "Maths",
  title: "Geometry: Angles & Shapes",
  description:
    "Geometry questions reward students who know a small set of angle facts and shape properties cold, and can apply them quickly under pressure. This module covers angle facts on lines, at points, in triangles and quadrilaterals, the properties of common 2D shapes, and calculating perimeter and area — all high-frequency 11+ topics.",
  subtopics: [
    {
      id: "angle-facts",
      title: "Angle Facts",
      tier: "Foundation",
      objective: "Use the key angle facts — angles on a line, angles at a point, vertically opposite angles, and angles in triangles and quadrilaterals — to find missing angles.",
      whyMatters:
        "Almost every 11+ geometry question asks you to find a missing angle using one of these facts, often chaining two or three together in a single question.",
      conceptTitle: "The angle facts you must know",
      conceptBullets: [
        "Angles on a straight line add up to <b style=\"color:#C9A24B\">180°</b>.",
        "Angles around a point add up to <b style=\"color:#C9A24B\">360°</b>.",
        "<b style=\"color:#C9A24B\">Vertically opposite</b> angles (formed when two lines cross) are always equal.",
        "Angles inside a triangle add up to <b style=\"color:#C9A24B\">180°</b>.",
        "Angles inside a quadrilateral add up to <b style=\"color:#C9A24B\">360°</b>.",
      ],
      conceptNote:
        "<b>Common mistake:</b> assuming a diagram is drawn to scale. 11+ diagrams are often deliberately not to scale — always calculate from the facts, never measure with your eyes.",
      glossary: [
        { term: "vertically opposite", def: "the pair of equal angles formed opposite each other where two straight lines cross" },
        { term: "point", def: "a single location where several angles can meet, summing to 360°" },
        { term: "quadrilateral", def: "any 2D shape with exactly 4 straight sides" },
        { term: "supplementary", def: "two angles that add up to 180°" },
      ],
      diagramLabel: "Interactive · Angle Sum Explorer",
      Diagram: AngleSumExplorer,
      worked: {
        question: "Two angles lie on a straight line. One is 112°. Find the other.",
        fastMethod: "Angles on a line sum to 180°, so the missing angle is 180 − 112 = <b>68°</b>.",
        steps: [
          "Recall the fact: angles on a straight line always add up to 180°.",
          "Set up the equation: 112 + x = 180.",
          "Solve for x: x = 180 − 112 = 68.",
        ],
        answer: "The missing angle is <b>68°</b>",
      },
      selfCheck: { prompt: "Before the practice set — three angles meet at a point: 90°, 130° and x. What is x?", answer: "90 + 130 + x = 360, so x = 360 − 220 = <b>140°</b>." },
      questions: [
        { id: "af-q1", prompt: "Two angles on a straight line are 65° and x. Find x.", accept: ["115"], hint: "Angles on a line add to 180°: 180 − 65." },
        { id: "af-q2", prompt: "A triangle has angles 50° and 60°. Find the third angle.", accept: ["70"], hint: "Angles in a triangle add to 180°: 180 − 50 − 60." },
        { id: "af-q3", prompt: "Two straight lines cross. One angle is 38°. What is its vertically opposite angle?", accept: ["38"], hint: "Vertically opposite angles are always equal." },
        { id: "af-q4", prompt: "A quadrilateral has angles 90°, 90° and 85°. Find the fourth angle.", accept: ["95"], hint: "Angles in a quadrilateral add to 360°: 360 − 90 − 90 − 85." },
        { id: "af-q5", prompt: "Four angles meet at a point: 90°, 90°, 90° and x. Find x.", accept: ["90"], hint: "Angles at a point add to 360°: 360 − 270." },
        { id: "af-q6", prompt: "A triangle has two equal angles of 45° each. Find the third angle.", accept: ["90"], hint: "180 − 45 − 45." },
      ],
      mistakes: [
        "Using 360° for a triangle or 180° for a quadrilateral — mixing up which shape uses which total.",
        "Assuming angles that look equal in a diagram are equal, without checking they're vertically opposite or given as equal.",
        "Forgetting to subtract from the correct total when several angles are already known.",
      ],
      examTip: "Before calculating, say the rule out loud in your head (\"angles on a line = 180\") — naming the fact first stops you reaching for the wrong total under time pressure.",
      searchTerms: ["angle", "angles", "line", "point", "vertically opposite", "triangle", "quadrilateral", "degrees"],
    },
    {
      id: "shape-properties",
      title: "Properties of 2D Shapes",
      tier: "Standard",
      objective: "Name and identify triangles and quadrilaterals from their side, angle and symmetry properties.",
      whyMatters:
        "11+ papers frequently ask you to identify a shape from a property list, or to state a property of a named shape — precise vocabulary (parallel, equal, symmetry) earns marks that vague descriptions lose.",
      conceptTitle: "Triangles and quadrilaterals by property",
      conceptBullets: [
        "Triangles are classified by sides (equilateral, isosceles, scalene) or by angles (right-angled, obtuse, acute).",
        "An <b style=\"color:#C9A24B\">equilateral</b> triangle has 3 equal sides and 3 equal 60° angles.",
        "An <b style=\"color:#C9A24B\">isosceles</b> triangle has exactly 2 equal sides and 2 equal angles.",
        "Quadrilaterals include the square, rectangle, parallelogram, rhombus, trapezium and kite — each has its own rule for sides, angles and parallel lines.",
        "A shape can belong to more than one family: every square is also a rectangle and a rhombus.",
      ],
      conceptNote:
        "<b>Common mistake:</b> saying a rhombus is \"just a square that's been pushed over\" — a rhombus has 4 equal sides like a square, but its angles are usually not 90°, so it is not a square.",
      glossary: [
        { term: "parallel", def: "lines that stay the same distance apart and never meet" },
        { term: "line of symmetry", def: "a line that divides a shape into two mirror-image halves" },
        { term: "rotational symmetry", def: "a shape looks the same after being rotated less than a full turn" },
        { term: "regular polygon", def: "a shape with all sides and all angles equal" },
      ],
      diagramLabel: "Interactive · Shape Property Sorter",
      Diagram: ShapePropertySorter,
      worked: {
        question: "A quadrilateral has 4 equal sides, opposite sides parallel, and no right angles. Name it.",
        fastMethod: "4 equal sides + parallel opposite sides + no right angles = <b>rhombus</b>.",
        steps: [
          "4 equal sides with opposite sides parallel narrows it to a square or a rhombus.",
          "A square must have four 90° angles — this shape doesn't, so it isn't a square.",
          "The only remaining shape with 4 equal sides and parallel opposite sides is the rhombus.",
        ],
        answer: "The shape is a <b>rhombus</b>",
      },
      selfCheck: { prompt: "Before the practice set — how many lines of symmetry does a rectangle (that isn't a square) have?", answer: "A non-square rectangle has <b>2</b> lines of symmetry." },
      questions: [
        { id: "sp-q1", prompt: "Name the triangle with exactly 2 equal sides.", accept: ["isosceles", "isosceles triangle"], hint: "Not all 3 sides equal, but a matching pair." },
        { id: "sp-q2", prompt: "Name the quadrilateral with only 1 pair of parallel sides.", accept: ["trapezium"], hint: "It's not a parallelogram because only one pair is parallel." },
        { id: "sp-q3", prompt: "How many degrees are in each angle of an equilateral triangle?", accept: ["60", "60 degrees", "60°"], hint: "180° shared equally between 3 angles." },
        { id: "sp-q4", prompt: "Name the quadrilateral with 2 pairs of equal adjacent sides and one pair of equal opposite angles.", accept: ["kite"], hint: "Think of the shape you fly on a string." },
        { id: "sp-q5", prompt: "How many lines of symmetry does a square have?", accept: ["4"], hint: "Count the two diagonals plus the two lines through opposite side midpoints." },
        { id: "sp-q6", prompt: "Name the triangle with all 3 sides different lengths.", accept: ["scalene", "scalene triangle"], hint: "No pair of sides matches at all." },
      ],
      mistakes: [
        "Confusing a rhombus with a square, or a parallelogram with a rectangle, by ignoring the angle condition.",
        "Forgetting that a square is a special case of both a rectangle and a rhombus.",
        "Miscounting lines of symmetry by forgetting diagonal lines on shapes like squares and rhombuses.",
      ],
      examTip: "When asked to \"name the shape,\" check every clue (sides, angles, parallel lines, symmetry) before answering — examiners often give one clue that rules out the \"obvious\" answer.",
      searchTerms: ["triangle", "quadrilateral", "shape", "square", "rectangle", "rhombus", "parallelogram", "trapezium", "kite", "symmetry"],
    },
    {
      id: "perimeter-area",
      title: "Perimeter & Area",
      tier: "Extension",
      objective: "Calculate the perimeter and area of rectangles, triangles and compound shapes made from combinations of them.",
      whyMatters:
        "Perimeter and area problems appear throughout 11+ papers in real-world contexts (gardens, floor plans, fencing) and compound-shape questions specifically test whether you can break a complex figure into simple rectangles and triangles.",
      conceptTitle: "Perimeter and area formulas",
      conceptBullets: [
        "<b style=\"color:#C9A24B\">Perimeter</b> is the total distance around the outside of a shape — add up every side length.",
        "Area of a rectangle = length × width.",
        "Area of a triangle = ½ × base × height (using the perpendicular height, not a slanted side).",
        "For a compound shape, split it into rectangles and triangles, find each area separately, then add (or subtract) them.",
        "Always check your units — area is measured in square units (cm², m²), perimeter in plain units (cm, m).",
      ],
      conceptNote:
        "<b>Common mistake:</b> using a triangle's slanted side as the height in the area formula — the height must be measured at a right angle to the base.",
      glossary: [
        { term: "perimeter", def: "the total distance around the outside edge of a 2D shape" },
        { term: "area", def: "the amount of surface a 2D shape covers, measured in square units" },
        { term: "base", def: "the side a triangle's area is measured from" },
        { term: "compound shape", def: "a shape made by combining two or more simple shapes" },
      ],
      diagramLabel: "Interactive · Area & Perimeter Grid Builder",
      Diagram: AreaPerimeterGrid,
      worked: {
        question: "A rectangle is 8 cm long and 5 cm wide. Find its area and perimeter.",
        fastMethod: "Area = 8 × 5 = <b>40 cm²</b>. Perimeter = 2 × (8 + 5) = <b>26 cm</b>.",
        steps: [
          "Area of a rectangle = length × width = 8 × 5 = 40 cm².",
          "Perimeter = distance around all 4 sides = 2 lengths + 2 widths.",
          "Perimeter = 2 × (8 + 5) = 2 × 13 = 26 cm.",
        ],
        answer: "Area = <b>40 cm²</b>, Perimeter = <b>26 cm</b>",
      },
      selfCheck: { prompt: "Before the practice set — what is the area of a triangle with base 10 cm and height 6 cm?", answer: "Area = ½ × 10 × 6 = <b>30 cm²</b>." },
      questions: [
        { id: "pa-q1", prompt: "Find the area of a rectangle 12 cm by 4 cm.", accept: ["48", "48cm2", "48 cm2", "48cm²", "48 cm²"], hint: "length × width." },
        { id: "pa-q2", prompt: "Find the perimeter of a rectangle 9 cm by 6 cm.", accept: ["30", "30cm", "30 cm"], hint: "2 × (length + width)." },
        { id: "pa-q3", prompt: "Find the area of a triangle with base 8 cm and height 5 cm.", accept: ["20", "20cm2", "20 cm2", "20cm²", "20 cm²"], hint: "½ × base × height." },
        { id: "pa-q4", prompt: "A square has sides of 7 cm. Find its area.", accept: ["49", "49cm2", "49 cm2", "49cm²", "49 cm²"], hint: "A square's area is side × side." },
        { id: "pa-q5", prompt: "An L-shaped room is made from a 6 cm by 4 cm rectangle and a 3 cm by 2 cm rectangle. Find the total area.", accept: ["30", "30cm2", "30 cm2", "30cm²", "30 cm²"], hint: "Find each rectangle's area separately, then add them: (6×4) + (3×2)." },
        { id: "pa-q6", prompt: "Find the perimeter of a square with sides of 9 cm.", accept: ["36", "36cm", "36 cm"], hint: "4 × side length." },
      ],
      mistakes: [
        "Mixing up perimeter and area formulas, especially adding instead of multiplying for area.",
        "Using a slanted side instead of the perpendicular height in the triangle area formula.",
        "Forgetting to add every separate part when finding the area of a compound shape.",
      ],
      examTip: "For compound shapes, sketch a dashed line splitting the figure into rectangles/triangles before you calculate — it stops you missing or double-counting a section.",
      searchTerms: ["perimeter", "area", "rectangle", "triangle", "compound shape", "length", "width", "base", "height"],
    },
  ],
};
