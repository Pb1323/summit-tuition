import type { TopicContent } from "../types";
import { RatioBar, RatioShareCalculator } from "../notes-diagrams/ratio-bar";
import { ScaleFactorLinker } from "../notes-diagrams/scale-factor-linker";

export const ratioProportionTopic: TopicContent = {
  slug: "ratio-proportion",
  subject: "Maths",
  subjectSlug: "maths",
  title: "Ratio & Proportion",
  description:
    "Ratios compare quantities to one another, while proportion describes how quantities scale together. This module covers ratio notation and simplifying, sharing an amount in a given ratio, and scaling quantities up or down — a recurring theme in 11+ word problems.",
  subtopics: [
    {
      id: "what-is-a-ratio",
      title: "What is a Ratio?",
      tier: "Foundation",
      objective: "Understand ratio notation and simplify ratios to their lowest terms.",
      whyMatters:
        "Ratios appear throughout 11+ papers describing mixtures, maps, and comparisons — misreading the order of a ratio is one of the most common avoidable mistakes.",
      conceptTitle: "Comparing two quantities",
      conceptBullets: [
        "A ratio compares two (or more) quantities, written as <b style=\"color:#C9A24B\">a : b</b>.",
        "Order matters — 2:3 is not the same as 3:2.",
        "A ratio can be simplified by dividing both parts by their highest common factor, just like a fraction.",
        "Ratios describe relative size, not the actual amounts — 2:3 could mean 2kg:3kg or 200kg:300kg.",
      ],
      conceptNote: "<b>Common mistake:</b> writing a ratio the wrong way round — always match the order to the order the quantities are named in the question.",
      glossary: [
        { term: "ratio", def: "a comparison between two or more quantities" },
        { term: "simplify", def: "reduce a ratio to its lowest terms" },
        { term: "part", def: "one of the numbers making up a ratio" },
        { term: "equivalent ratio", def: "the same comparison scaled up or down" },
      ],
      diagramLabel: "Interactive · Ratio Bar",
      Diagram: RatioBar,
      worked: {
        question: "Simplify the ratio 8 : 12.",
        fastMethod: "The HCF of 8 and 12 is 4, so divide both parts by 4: <b>2 : 3</b>.",
        steps: [
          "Find the highest common factor (HCF) of both parts: HCF of 8 and 12 is 4.",
          "Divide each part of the ratio by the HCF: 8 ÷ 4 = 2, and 12 ÷ 4 = 3.",
          "Write the simplified ratio in the same order as the original: 2 : 3.",
        ],
        answer: "8 : 12 = <b>2 : 3</b>",
      },
      selfCheck: { prompt: "Before the practice set — what is the simplified form of 6 : 9?", answer: "6 : 9 = <b>2 : 3</b> (divide both parts by 3)." },
      questions: [
        { id: "wr-q1", prompt: "Simplify the ratio 10 : 15.", accept: ["2:3", "2 : 3", "2 to 3"], hint: "Divide both parts by their HCF, which is 5." },
        { id: "wr-q2", prompt: "Simplify the ratio 4 : 20.", accept: ["1:5", "1 : 5", "1 to 5"], hint: "Divide both parts by their HCF, which is 4." },
        { id: "wr-q3", prompt: "A class has 12 boys and 18 girls. What is the ratio of boys to girls, simplified?", accept: ["2:3", "2 : 3", "2 to 3"], hint: "Write boys first, then girls, then simplify using the HCF of 12 and 18." },
      ],
      mistakes: [
        "Writing a ratio in the wrong order relative to how the question describes the quantities.",
        "Simplifying only one part of the ratio instead of dividing both parts by the same number.",
      ],
      examTip: "Read the question twice to check which quantity is named first — that quantity must come first in your ratio too.",
      searchTerms: ["ratio", "simplify", "compare", "notation", "part"],
    },
    {
      id: "sharing-in-a-ratio",
      title: "Sharing in a Ratio",
      tier: "Standard",
      objective: "Divide a quantity into parts according to a given ratio.",
      whyMatters:
        "Sharing-in-a-ratio questions are a classic 11+ word-problem format, often dressed up as money, sweets, or time being split between people.",
      conceptTitle: "Splitting a total fairly",
      conceptBullets: [
        "First add the parts of the ratio together to find the total number of equal parts.",
        "Divide the total amount by the number of parts to find the value of <b style=\"color:#C9A24B\">one part</b>.",
        "Multiply one part's value by each side of the ratio to find each share.",
        "Check your shares add back up to the original total — a quick and reliable self-check.",
      ],
      conceptNote: "<b>Remember:</b> the ratio tells you how many equal parts each side gets, not the final amounts directly.",
      glossary: [
        { term: "share", def: "one person's or one side's portion of the total" },
        { term: "total parts", def: "the sum of all numbers in the ratio" },
        { term: "one part", def: "the total amount divided by the total number of parts" },
        { term: "allocate", def: "to assign a share to each part of the ratio" },
      ],
      diagramLabel: "Interactive · Ratio Share Calculator",
      Diagram: RatioShareCalculator,
      worked: {
        question: "Share £40 between Amy and Ben in the ratio 3 : 5.",
        fastMethod: "3 + 5 = 8 parts, so one part = £40 ÷ 8 = £5. Amy gets 3 × £5 = <b>£15</b>, Ben gets 5 × £5 = <b>£25</b>.",
        steps: [
          "Add the parts of the ratio: 3 + 5 = 8 total parts.",
          "Divide the total amount by the number of parts: £40 ÷ 8 = £5 per part.",
          "Multiply each side of the ratio by the value of one part: Amy = 3 × £5 = £15, Ben = 5 × £5 = £25.",
        ],
        answer: "Amy = <b>£15</b> &nbsp;·&nbsp; Ben = <b>£25</b>",
      },
      selfCheck: { prompt: "Before the practice set — if £20 is shared in the ratio 1 : 1, what does each person get?", answer: "£10 each — equal ratio parts mean an equal split." },
      questions: [
        { id: "sr-q1", prompt: "Share £30 in the ratio 2 : 1. What is the larger share?", accept: ["20", "£20"], hint: "2 + 1 = 3 parts, so one part is £30 ÷ 3 = £10." },
        { id: "sr-q2", prompt: "Share 24 sweets in the ratio 1 : 3. What is the smaller share?", accept: ["6"], hint: "1 + 3 = 4 parts, so one part is 24 ÷ 4 = 6." },
        { id: "sr-q3", prompt: "Share £60 between two people in the ratio 5 : 7. What is the smaller share?", accept: ["25", "£25"], hint: "5 + 7 = 12 parts, so one part is £60 ÷ 12 = £5, and the smaller share is 5 parts." },
      ],
      mistakes: [
        "Dividing the total by the wrong number (forgetting to add the parts of the ratio together first).",
        "Multiplying by the wrong side of the ratio when assigning shares.",
      ],
      examTip: "Always sanity-check your final shares by adding them back together — they must equal the original total amount.",
      searchTerms: ["ratio", "share", "divide", "parts", "allocate", "money"],
    },
    {
      id: "scaling-and-proportion",
      title: "Scaling & Direct Proportion",
      tier: "Extension",
      objective: "Scale quantities up or down in direct proportion, keeping their ratio constant.",
      whyMatters:
        "Recipe, map-scale, and \"best buy\" questions all rely on direct proportion — recognising when quantities scale together is a key 11+ reasoning skill.",
      conceptTitle: "Scaling quantities together",
      conceptBullets: [
        "Two quantities are in <b style=\"color:#C9A24B\">direct proportion</b> if scaling one by a factor scales the other by the same factor.",
        "Find the scale factor by dividing the new value by the original value for one quantity.",
        "Apply that same scale factor to every other linked quantity.",
        "Doubling one quantity always doubles the other — the ratio between them never changes.",
      ],
      conceptNote: "<b>Common mistake:</b> adding the same amount to both quantities instead of multiplying by the same scale factor — proportion is about multiplying, not adding.",
      glossary: [
        { term: "direct proportion", def: "when two quantities scale by the same factor" },
        { term: "scale factor", def: "the number you multiply by to scale a quantity" },
        { term: "unitary method", def: "finding the value of one unit before scaling to the amount needed" },
        { term: "proportional", def: "changing at the same rate as another quantity" },
      ],
      diagramLabel: "Interactive · Recipe Scale Linker",
      Diagram: ScaleFactorLinker,
      worked: {
        question: "A recipe for 4 people needs 200g of flour. How much flour is needed for 10 people?",
        fastMethod: "200g ÷ 4 = 50g per person, so 10 people need 50g × 10 = <b>500g</b>.",
        steps: [
          "Use the unitary method: find the amount for one person first. 200g ÷ 4 people = 50g per person.",
          "Scale up to the number of people needed: 50g × 10 people = 500g.",
          "Check the scale factor is consistent: 10 people is 2.5 times 4 people, and 200g × 2.5 = 500g.",
        ],
        answer: "10 people need <b>500g</b> of flour",
      },
      selfCheck: { prompt: "Before the practice set — if 2 pens cost £3, what is the scale factor to find the cost of 6 pens?", answer: "6 ÷ 2 = a scale factor of <b>3</b>." },
      questions: [
        { id: "sp-q1", prompt: "A recipe for 3 people needs 90g of sugar. How much sugar is needed for 9 people?", accept: ["270", "270g"], hint: "Find the scale factor: 9 ÷ 3 = 3, then multiply 90g by that scale factor." },
        { id: "sp-q2", prompt: "5 identical books cost £20. How much do 8 of the same books cost?", accept: ["32", "£32"], hint: "Find the cost of 1 book first (£20 ÷ 5), then multiply by 8." },
        { id: "sp-q3", prompt: "A map has a scale where 2cm represents 5km. How many km does 8cm represent?", accept: ["20", "20km"], hint: "Find the scale factor: 8 ÷ 2 = 4, then multiply 5km by that scale factor." },
      ],
      mistakes: [
        "Adding a fixed amount instead of multiplying by a scale factor.",
        "Scaling only one of the two linked quantities and forgetting the other.",
      ],
      examTip: "When in doubt, use the unitary method — find the value for a single unit first, then scale up or down from there.",
      searchTerms: ["proportion", "scale", "scaling", "recipe", "map", "unitary method"],
    },
  ],
};
