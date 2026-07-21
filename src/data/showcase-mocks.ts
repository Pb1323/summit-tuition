import type { ShowcaseVisualConfig } from "@/components/sections/showcase-visuals";

export interface ShowcaseMathsQuestion {
  kind: "maths";
  visual: ShowcaseVisualConfig;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ShowcaseGrammarQuestion {
  kind: "grammar";
  prompt: string;
  segments: string[];
  /** index into segments that contains the mistake, or null if the sentence is correct */
  mistakeIndex: number | null;
  explanation: string;
}

export type ShowcaseQuestion = ShowcaseMathsQuestion | ShowcaseGrammarQuestion;

export interface ShowcaseMock {
  id: string;
  subject: "maths" | "english";
  title: string;
  tagline: string;
  questions: ShowcaseQuestion[];
}

/**
 * Exactly two official mock samples (1 Maths, 1 English) — this is deliberately not a
 * "showcase catalogue" of many small mocks. Each is 5 questions, each question using a
 * different visual/format so the sample never feels like the same template repeated.
 * All original content, written for this on-site sample — no third-party paper content reused.
 */
export const SHOWCASE_MOCKS: ShowcaseMock[] = [
  {
    id: "official-maths-sample",
    subject: "maths",
    title: "Maths Mock Sample",
    tagline: "5 questions — data, ratio, geometry and sets, each in a different format",
    questions: [
      {
        kind: "maths",
        visual: { kind: "bar-chart", max: 30, bars: [
          { label: "Chess", value: 15 },
          { label: "Art", value: 22 },
          { label: "Drama", value: 9 },
          { label: "Coding", value: 27 },
          { label: "Choir", value: 12 },
        ] },
        prompt: "The bar chart shows the number of pupils in five after-school clubs. What is the mean number of pupils per club?",
        options: ["17", "15", "19", "20"],
        correctAnswer: "17",
        explanation: "Total pupils = 15 + 22 + 9 + 27 + 12 = 85. Mean = 85 ÷ 5 = 17.",
      },
      {
        kind: "maths",
        visual: { kind: "pie-chart", sectors: [
          { label: "Blue", pct: 40 },
          { label: "Red", pct: 25 },
          { label: "Green", pct: 20 },
          { label: "Yellow", pct: 15 },
        ] },
        prompt: "360 pupils voted for a school council colour, shown in the pie chart. What is the ratio of Blue votes to Yellow votes, in simplest form?",
        options: ["8:3", "3:8", "4:1", "5:2"],
        correctAnswer: "8:3",
        explanation: "Blue = 40% of 360 = 144. Yellow = 15% of 360 = 54. 144:54 simplifies (÷18) to 8:3.",
      },
      {
        kind: "maths",
        visual: { kind: "geometry-triangle", angles: ["?", 64, 64] },
        prompt: "This isosceles triangle has two equal base angles of 64° each. What is the size of the third angle?",
        options: ["52°", "64°", "56°", "48°"],
        correctAnswer: "52°",
        explanation: "Angles in a triangle sum to 180°. 64 + 64 = 128, so the remaining angle is 180 − 128 = 52°.",
      },
      {
        kind: "maths",
        visual: { kind: "venn", setA: "Right angles", setB: "Equal sides", onlyA: 14, onlyB: 10, both: 8 },
        prompt: "40 shapes were sorted by property, shown in the diagram (some have right angles, some have all sides equal, some have both). How many shapes have at least one of these properties?",
        options: ["32", "40", "22", "18"],
        correctAnswer: "32",
        explanation: "At least one property = 14 (right angles only) + 8 (both) + 10 (equal sides only) = 32.",
      },
      {
        kind: "maths",
        visual: { kind: "ratio-table", colA: "Cement", colB: "Sand", ratioLabel: "2 : 5", rows: [
          { name: "Batch 1", a: "100 kg", b: "250 kg" },
          { name: "Batch 2", a: "140 kg", b: "", missing: "b" },
          { name: "Batch 3", a: "200 kg", b: "500 kg" },
        ] },
        prompt: "Cement and sand are always mixed in the same ratio. What mass of sand is needed for Batch 2 (140 kg cement)?",
        options: ["350 kg", "300 kg", "325 kg", "375 kg"],
        correctAnswer: "350 kg",
        explanation: "The ratio is 2:5. 140 ÷ 2 = 70, then 70 x 5 = 350 kg.",
      },
    ],
  },
  {
    id: "official-english-sample",
    subject: "english",
    title: "English Mock Sample",
    tagline: "5 questions — spot the grammar mistake, a different rule each time",
    questions: [
      {
        kind: "grammar",
        prompt: "Which part of this sentence contains a grammar mistake?",
        segments: ["The herd of elephants", "were moving slowly", "across the dry plain", "in search of water."],
        mistakeIndex: 1,
        explanation: "\"herd\" is a singular collective noun, so it needs a singular verb: \"was moving slowly.\"",
      },
      {
        kind: "grammar",
        prompt: "Which part of this sentence contains a grammar mistake?",
        segments: ["Its important", "to check your work", "carefully before", "handing it in."],
        mistakeIndex: 0,
        explanation: "\"Its\" (possessive) should be \"It's\" (a contraction of \"it is\").",
      },
      {
        kind: "grammar",
        prompt: "Which part of this sentence contains a grammar mistake?",
        segments: ["She is taller", "than me", "and runs faster", "than anyone in the class."],
        mistakeIndex: 1,
        explanation: "This compares subjects, so it should be \"than I (am)\" — the subject pronoun, not the object pronoun \"me.\"",
      },
      {
        kind: "grammar",
        prompt: "Which part of this sentence contains a grammar mistake?",
        segments: ["This cake tastes", "more sweeter", "than the one", "we made last week."],
        mistakeIndex: 1,
        explanation: "\"more sweeter\" is a double comparative — it should simply be \"sweeter.\"",
      },
      {
        kind: "grammar",
        prompt: "Which part of this sentence contains a grammar mistake?",
        segments: ["If I was you,", "I would apologise", "to her", "straight away."],
        mistakeIndex: 0,
        explanation: "This is a hypothetical (subjunctive) situation, so it needs \"were\": \"If I were you.\"",
      },
    ],
  },
];
