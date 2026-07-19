import type { TopicContent } from "../types";
import { PlaceValueHouse } from "../notes-diagrams/place-value-house";
import { FactorVennSort } from "../notes-diagrams/factor-venn-sort";
import { SquareCubeArray } from "../notes-diagrams/square-cube-array";

export const numbersTopic: TopicContent = {
  slug: "numbers",
  subject: "Maths",
  subjectSlug: "maths",
  title: "Numbers",
  description:
    "A foundation module covering place value, factors and multiples, and the structure of square and cube numbers — the essential number sense that underpins the 11+ Maths paper.",
  subtopics: [
    {
      id: "place-value",
      title: "Place Value",
      tier: "Foundation",
      objective: "Understand how the position of a digit determines its value, for whole numbers and decimals.",
      whyMatters:
        "place value questions appear in nearly every 11+ arithmetic paper, often disguised inside multi-step word problems.",
      conceptTitle: "What is place value?",
      conceptBullets: [
        "A digit's position (its <b style=\"color:#C9A24B\">column</b>) decides its value.",
        "Moving one column left = ×10. Moving one column right = ÷10.",
        "The decimal point is a fixed anchor — digits move around it, it never moves itself.",
        "Whole numbers have an invisible decimal point straight after the units digit.",
      ],
      conceptNote:
        "<b>Common mistake:</b> students often add or remove a zero instead of shifting every digit — always move the decimal point, not the digits.",
      glossary: [
        { term: "digit", def: "a single number symbol, 0–9" },
        { term: "column", def: "a digit's position in a number" },
        { term: "decimal point", def: "separates whole numbers from parts" },
        { term: "place value", def: "the value a digit holds because of its column" },
      ],
      diagramLabel: "Interactive · The Place Value House",
      Diagram: PlaceValueHouse,
      worked: {
        question: "Calculate 4.5 × 100.",
        fastMethod: "Shift the decimal point two places right (×100 = ×10 × ×10): 4.5 → <b>450</b>.",
        steps: [
          "Write 4.5 in the place value house: the 4 sits in the units column, the 5 in the tenths column.",
          "Multiplying by 100 shifts every digit two columns to the left (100 = 10 × 10).",
          "The 4 moves from units to hundreds; the 5 moves from tenths to units. Empty columns are filled with a placeholder zero.",
        ],
        answer: "4.5 × 100 = <b>450</b>",
      },
      selfCheck: { prompt: "Before the practice set — what is 3 × 10?", answer: "3 × 10 = <b>30</b> — the digit shifts one column left." },
      questions: [
        { id: "pv-q1", prompt: "What is 3.6 × 100?", accept: ["360"], hint: "Multiplying by 100 shifts every digit two columns to the left." },
        { id: "pv-q2", prompt: "What is 720 ÷ 10?", accept: ["72"], hint: "Dividing by 10 shifts every digit one column to the right." },
        { id: "pv-q3", prompt: "What is the value of the digit 7 in 3,758?", accept: ["700", "seven hundred"], hint: "Look at which column the 7 sits in — count from the units digit." },
      ],
      mistakes: [
        "Adding a zero instead of shifting digits when multiplying by 10 (fails for decimals, e.g. 4.5 × 10 ≠ 4.50).",
        "Losing the decimal point when a whole number is divided — every whole number has an invisible decimal point after the units digit.",
      ],
      examTip:
        "Always check whether the question wants a whole number, one decimal place, or an exact value — 11+ papers penalise rounding when none was asked for.",
      searchTerms: ["place value", "digit", "decimal", "multiply", "divide", "column", "ten", "hundred"],
    },
    {
      id: "factors",
      title: "Factors, HCF & LCM",
      tier: "Standard",
      objective: "Find the factors and multiples of numbers, and use them to calculate the Highest Common Factor and Lowest Common Multiple.",
      whyMatters: "HCF and LCM questions often hide inside worded problems about sharing, grouping, or timing events together.",
      conceptTitle: "Factors vs. multiples",
      conceptBullets: [
        "<b style=\"color:#C9A24B\">Factors</b> divide exactly into a number, with nothing left over.",
        "<b style=\"color:#C9A24B\">Multiples</b> are what you get when you multiply a number by a whole number.",
        "<b>HCF</b> = largest shared factor. <b>LCM</b> = smallest shared multiple.",
        "Prime numbers have exactly two factors: 1 and themselves.",
      ],
      conceptNote: "<b>Remember:</b> 1 is a factor of every number, and every number is a multiple of itself.",
      glossary: [
        { term: "factor", def: "divides exactly into a number" },
        { term: "multiple", def: "a result of multiplying a number" },
        { term: "prime", def: "only two factors: 1 and itself" },
        { term: "product", def: "the result of multiplying numbers together" },
      ],
      diagramLabel: "Interactive · Sort the Factors",
      Diagram: FactorVennSort,
      worked: {
        question: "Find the HCF and LCM of 12 and 18.",
        fastMethod: "Spot common factors quickly: both are multiples of 6, so <b>HCF = 6</b>. For LCM, 18 × 2 = 36 is also a multiple of 12, so <b>LCM = 36</b>.",
        steps: [
          "List the factors: 12 → 1, 2, 3, 4, 6, 12. 18 → 1, 2, 3, 6, 9, 18.",
          "Common factors: 1, 2, 3, 6 — the largest is 6, so HCF = 6.",
          "List multiples: 12, 24, 36… and 18, 36… — the first shared value is 36, so LCM = 36.",
        ],
        answer: "HCF = <b>6</b> &nbsp;·&nbsp; LCM = <b>36</b>",
      },
      selfCheck: { prompt: "Before the practice set — what are the factors of 10?", answer: "1, 2, 5, 10." },
      questions: [
        { id: "fhl-q1", prompt: "What is the HCF of 8 and 12?", accept: ["4"], hint: "List the factors of each number, then find the largest one they share." },
        { id: "fhl-q2", prompt: "What is the LCM of 4 and 6?", accept: ["12"], hint: "List multiples of each number until you find the first one they share." },
        { id: "fhl-q3", prompt: "What is the HCF of 20 and 30?", accept: ["10"], hint: "Both numbers share the factor 10 — check no larger shared factor exists." },
      ],
      mistakes: [
        "Confusing HCF and LCM — HCF is always smaller than or equal to both numbers; LCM is always larger than or equal to both.",
        "Forgetting that 1 and the number itself are always factors.",
      ],
      examTip: "If a question mentions \"the largest group\" or \"sharing equally with none left over,\" it's asking for HCF. \"The soonest they'll next coincide\" means LCM.",
      searchTerms: ["factor", "multiple", "hcf", "lcm", "highest common factor", "lowest common multiple", "venn"],
    },
    {
      id: "squares",
      title: "Square & Cube Numbers",
      tier: "Extension",
      objective: "Recognise square and cube numbers and calculate them using grid and block arrays.",
      whyMatters: "square and cube numbers appear in sequences, area/volume problems, and as building blocks for algebra later on.",
      conceptTitle: "Squares and cubes, visually",
      conceptBullets: [
        "A <b style=\"color:#C9A24B\">square number</b> is n × n — picture a flat grid.",
        "A <b style=\"color:#C9A24B\">cube number</b> is n × n × n — picture a solid block.",
        "Square numbers follow a pattern of odd-number gaps: 1, 4, 9, 16… (+3, +5, +7).",
        "Only whole numbers used this way count as square/cube numbers.",
      ],
      conceptNote: "<b>Common mistake:</b> squaring is not doubling — 5² = 25, not 10. Cubing is not multiplying by 3 — 5³ = 125, not 15.",
      glossary: [
        { term: "square number", def: "n × n" },
        { term: "cube number", def: "n × n × n" },
        { term: "power", def: "how many times a number multiplies itself" },
        { term: "base", def: "the number being multiplied" },
      ],
      diagramLabel: "Interactive · Grid & Block Arrays",
      Diagram: SquareCubeArray,
      worked: {
        question: "Work out 5³.",
        fastMethod: "Know your cubes by heart: <b>5³ = 125</b>.",
        steps: [
          "5³ means 5 × 5 × 5.",
          "First multiply 5 × 5 = 25 (this is 5², one flat layer of the cube).",
          "Then multiply that layer by 5 again: 25 × 5 = 125.",
        ],
        answer: "5³ = <b>125</b>",
      },
      selfCheck: { prompt: "Before the practice set — what is 4²?", answer: "4² = 4 × 4 = <b>16</b>." },
      questions: [
        { id: "sc-q1", prompt: "What is 6²?", accept: ["36"], hint: "Multiply 6 by itself: 6 × 6." },
        { id: "sc-q2", prompt: "What is 3³?", accept: ["27"], hint: "Multiply 3 by itself, then by itself again: 3 × 3 × 3." },
        { id: "sc-q3", prompt: "What is 9²?", accept: ["81"], hint: "Multiply 9 by itself: 9 × 9." },
      ],
      mistakes: [
        "Squaring by doubling instead of multiplying by itself (5² ≠ 10).",
        "Cubing by multiplying by 3 instead of using the number three times (5³ ≠ 15).",
      ],
      examTip: "Memorise squares to 12² and cubes to 5³ — recalling them instantly saves precious time under exam conditions.",
      searchTerms: ["square", "cube", "grid", "block", "isometric", "power"],
    },
  ],
};
