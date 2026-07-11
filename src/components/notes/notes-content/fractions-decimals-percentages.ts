import type { TopicContent } from "../types";
import { FractionPercentBar } from "../notes-diagrams/fraction-percent-bar";
import { CommonDenominatorBars } from "../notes-diagrams/common-denominator-bars";
import { PercentOfAmount } from "../notes-diagrams/percent-of-amount";

export const fractionsDecimalsPercentagesTopic: TopicContent = {
  slug: "fractions-decimals-percentages",
  subject: "Maths",
  title: "Fractions, Decimals & Percentages",
  description:
    "Fractions, decimals and percentages are three ways of writing the same value. This module builds fluency in converting between them, combining fractions with different denominators, and finding a percentage of an amount — all frequent 11+ arithmetic staples.",
  subtopics: [
    {
      id: "equivalence",
      title: "Equivalent Fractions, Decimals & Percentages",
      tier: "Foundation",
      objective: "Convert confidently between fractions, decimals and percentages representing the same value.",
      whyMatters:
        "11+ papers often switch representation mid-question — a fraction in the question, a percentage expected in the answer — so fluent conversion saves time and avoids careless errors.",
      conceptTitle: "Three faces of the same number",
      conceptBullets: [
        "A fraction, decimal and percentage can all describe the exact same amount.",
        "To turn a fraction into a decimal, divide the numerator by the denominator.",
        "To turn a decimal into a percentage, multiply by 100 (shift the decimal point two places right).",
        "Common ones worth memorising: ½ = 0.5 = 50%, ¼ = 0.25 = 25%, ⅕ = 0.2 = 20%.",
      ],
      conceptNote:
        "<b>Common mistake:</b> forgetting to simplify a fraction before comparing it to another — 4/8 and 1/2 are the same value, but only one is in its simplest form.",
      glossary: [
        { term: "numerator", def: "the top number in a fraction" },
        { term: "denominator", def: "the bottom number in a fraction" },
        { term: "equivalent", def: "equal in value, even if written differently" },
        { term: "simplify", def: "reduce a fraction to its lowest terms" },
      ],
      diagramLabel: "Interactive · Fraction, Decimal & Percentage Bar",
      Diagram: FractionPercentBar,
      worked: {
        question: "Write 3/5 as a decimal and a percentage.",
        fastMethod: "3 ÷ 5 = 0.6, and 0.6 × 100 = <b>60%</b>.",
        steps: [
          "Divide the numerator by the denominator: 3 ÷ 5 = 0.6.",
          "To convert a decimal to a percentage, multiply by 100.",
          "0.6 × 100 = 60, so 3/5 = 0.6 = 60%.",
        ],
        answer: "3/5 = <b>0.6</b> = <b>60%</b>",
      },
      selfCheck: { prompt: "Before the practice set — what is 1/4 as a percentage?", answer: "1/4 = 0.25 = <b>25%</b>." },
      questions: [
        { id: "edp-q1", prompt: "Write 1/2 as a percentage.", accept: ["50", "50%"], hint: "Half of 100 is..." },
        { id: "edp-q2", prompt: "Write 0.75 as a fraction in its simplest form.", accept: ["3/4"], hint: "0.75 = 75/100 — divide top and bottom by 25." },
        { id: "edp-q3", prompt: "Write 20% as a decimal.", accept: ["0.2", ".2"], hint: "Divide the percentage by 100." },
      ],
      mistakes: [
        "Mixing up which way to divide when converting a fraction to a decimal (it's always numerator ÷ denominator, not the other way round).",
        "Leaving a fraction unsimplified when the question asks for the simplest form.",
      ],
      examTip: "If a question gives you an \"ugly\" fraction, convert it to a decimal first — decimals are often easier to compare and order quickly under time pressure.",
      searchTerms: ["fraction", "decimal", "percentage", "equivalent", "convert", "simplify"],
    },
    {
      id: "adding-fractions",
      title: "Adding & Subtracting Fractions",
      tier: "Standard",
      objective: "Add and subtract fractions with different denominators by finding a common denominator.",
      whyMatters:
        "Fraction addition with unlike denominators is one of the most commonly mis-stepped 11+ topics — examiners deliberately choose denominators that don't match.",
      conceptTitle: "Why you need a common denominator",
      conceptBullets: [
        "You can only add or subtract fractions once they're measured in the same-sized parts.",
        "The <b style=\"color:#C9A24B\">common denominator</b> is a shared multiple of both denominators — the LCM is the simplest choice.",
        "Scale each fraction up so both share that denominator, then add or subtract the numerators only.",
        "Always simplify your final answer if possible.",
      ],
      conceptNote: "<b>Remember:</b> never add the denominators together — only the numerators change once the denominators match.",
      glossary: [
        { term: "common denominator", def: "a shared denominator for two or more fractions" },
        { term: "LCM", def: "lowest common multiple — the smallest matching denominator" },
        { term: "mixed number", def: "a whole number combined with a fraction" },
        { term: "improper fraction", def: "a fraction where the numerator is larger than the denominator" },
      ],
      diagramLabel: "Interactive · Common Denominator Bars",
      Diagram: CommonDenominatorBars,
      worked: {
        question: "Work out 1/3 + 1/4.",
        fastMethod: "The LCM of 3 and 4 is 12, so 1/3 = 4/12 and 1/4 = 3/12: 4/12 + 3/12 = <b>7/12</b>.",
        steps: [
          "Find the LCM of the denominators 3 and 4, which is 12.",
          "Convert each fraction: 1/3 = 4/12 (×4/4) and 1/4 = 3/12 (×3/3).",
          "Add the numerators only: 4/12 + 3/12 = 7/12. This cannot be simplified further.",
        ],
        answer: "1/3 + 1/4 = <b>7/12</b>",
      },
      selfCheck: { prompt: "Before the practice set — what is the LCM of 2 and 5?", answer: "The LCM of 2 and 5 is <b>10</b>." },
      questions: [
        { id: "add-q1", prompt: "Work out 1/2 + 1/3.", accept: ["5/6"], hint: "The LCM of 2 and 3 is 6 — convert both fractions to sixths first." },
        { id: "add-q2", prompt: "Work out 3/4 − 1/2.", accept: ["1/4"], hint: "Convert 1/2 to quarters, then subtract the numerators." },
        { id: "add-q3", prompt: "Work out 1/6 + 1/3.", accept: ["1/2"], hint: "Convert 1/3 to sixths (2/6), add, then simplify the result." },
      ],
      mistakes: [
        "Adding denominators together (1/3 + 1/4 is not 2/7).",
        "Forgetting to scale the numerator by the same factor as the denominator when converting.",
      ],
      examTip: "If the denominators share no common factor, their product is always a safe (if not always smallest) common denominator to use under time pressure.",
      searchTerms: ["fraction", "add", "subtract", "common denominator", "lcm", "mixed number"],
    },
    {
      id: "percentage-of-amount",
      title: "Percentages of Amounts",
      tier: "Extension",
      objective: "Calculate a percentage of a given quantity, and use this to solve percentage-change word problems.",
      whyMatters:
        "\"Percentage of an amount\" questions appear throughout 11+ papers in money, discount and data-handling contexts, often needing two steps rather than one.",
      conceptTitle: "Finding a percentage of a quantity",
      conceptBullets: [
        "\"Per cent\" means \"out of 100\" — so a percentage is really a fraction with denominator 100.",
        "To find a percentage of an amount: (percentage ÷ 100) × amount.",
        "Useful shortcuts: 10% = divide by 10, 50% = divide by 2, 25% = divide by 4, 1% = divide by 100.",
        "Build harder percentages from easy ones, e.g. 15% = 10% + 5%.",
      ],
      conceptNote: "<b>Common mistake:</b> multiplying by the percentage number directly instead of dividing by 100 first (25% of 80 is not 25 × 80).",
      glossary: [
        { term: "percentage", def: "a number expressed as parts per hundred" },
        { term: "of", def: "in maths, usually means \"multiplied by\"" },
        { term: "percentage change", def: "the increase or decrease expressed as a percentage of the original" },
        { term: "discount", def: "a percentage reduction from an original price" },
      ],
      diagramLabel: "Interactive · Percentage of an Amount",
      Diagram: PercentOfAmount,
      worked: {
        question: "Find 15% of 60.",
        fastMethod: "10% of 60 = 6, and 5% of 60 = 3, so 15% = 6 + 3 = <b>9</b>.",
        steps: [
          "Break 15% into easier pieces: 10% + 5%.",
          "10% of 60 = 60 ÷ 10 = 6.",
          "5% is half of 10%, so 5% of 60 = 3. Add the pieces: 6 + 3 = 9.",
        ],
        answer: "15% of 60 = <b>9</b>",
      },
      selfCheck: { prompt: "Before the practice set — what is 50% of 36?", answer: "50% of 36 = <b>18</b> (half of 36)." },
      questions: [
        { id: "poa-q1", prompt: "Find 25% of 80.", accept: ["20"], hint: "25% is a quarter — divide 80 by 4." },
        { id: "poa-q2", prompt: "Find 10% of 250.", accept: ["25"], hint: "10% means divide by 10." },
        { id: "poa-q3", prompt: "A £40 jacket is reduced by 20%. What is the new price?", accept: ["32", "£32"], hint: "First find 20% of 40, then subtract it from 40." },
      ],
      mistakes: [
        "Forgetting to subtract (or add) the calculated percentage in a discount/increase word problem — the question often wants the new total, not just the percentage amount.",
        "Multiplying by the raw percentage number instead of dividing by 100 first.",
      ],
      examTip: "For \"increase/decrease by X%\" questions, always re-read whether the answer needed is the change itself or the new total after the change.",
      searchTerms: ["percentage", "percent", "amount", "discount", "increase", "decrease", "money"],
    },
  ],
};
