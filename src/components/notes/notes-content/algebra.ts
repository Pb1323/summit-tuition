import type { TopicContent } from "../types";
import { ExpressionBalance } from "../notes-diagrams/expression-balance";
import { BalanceScaleEquation } from "../notes-diagrams/balance-scale-equation";
import { SequenceStepVisualizer } from "../notes-diagrams/sequence-step-visualizer";

export const algebraTopic: TopicContent = {
  slug: "algebra",
  subject: "Maths",
  title: "Algebra Basics",
  description:
    "Algebra uses letters to stand for unknown or changing numbers. This module covers writing and simplifying expressions, solving simple linear equations, and spotting the pattern in number sequences — foundational skills that show up throughout 11+ maths and reasoning papers.",
  subtopics: [
    {
      id: "expressions-and-substitution",
      title: "Writing & Simplifying Expressions",
      tier: "Foundation",
      objective: "Write algebraic expressions, collect like terms, and substitute numbers in for letters.",
      whyMatters:
        "Expressions are the building blocks of all algebra questions — before you can solve or simplify anything, you need to be confident turning words into symbols and tidying up what you've written.",
      conceptTitle: "Letters standing for numbers",
      conceptBullets: [
        "A letter such as <b style=\"color:#C9A24B\">x</b> stands for an unknown or changing number.",
        "\"Like terms\" contain the same letter (or combination of letters) — only like terms can be added or subtracted together.",
        "3x means 3 × x, and terms are written without a multiplication sign: 3x, not 3 × x.",
        "To substitute, replace each letter with its given value and then work out the sum using normal order of operations.",
      ],
      conceptNote: "<b>Common mistake:</b> adding terms that are not alike, e.g. treating 3x + 2y as 5xy — unlike terms must stay separate.",
      glossary: [
        { term: "expression", def: "a collection of terms and numbers, e.g. 3x + 5, with no equals sign" },
        { term: "term", def: "a single part of an expression, such as 3x or 7" },
        { term: "like terms", def: "terms with exactly the same letter part" },
        { term: "substitute", def: "replace a letter with a given number" },
      ],
      diagramLabel: "Interactive · Expression Tile Builder",
      Diagram: ExpressionBalance,
      worked: {
        question: "Simplify 5x + 3 + 2x − 1, then find its value when x = 4.",
        fastMethod: "Collect x terms: 5x + 2x = 7x. Collect numbers: 3 − 1 = 2. Simplified: <b>7x + 2</b>. When x = 4: 7 × 4 + 2 = <b>30</b>.",
        steps: [
          "Group the like terms together: (5x + 2x) + (3 − 1).",
          "Add the x terms: 5x + 2x = 7x.",
          "Add the number terms: 3 − 1 = 2.",
          "Write the simplified expression: 7x + 2.",
          "Substitute x = 4: 7 × 4 + 2 = 28 + 2 = 30.",
        ],
        answer: "Simplified: <b>7x + 2</b> &nbsp;·&nbsp; Value at x = 4: <b>30</b>",
      },
      selfCheck: { prompt: "Before the practice set — simplify 4x + 6x.", answer: "4x + 6x = <b>10x</b> (add the coefficients, keep the letter the same)." },
      questions: [
        { id: "we-q1", prompt: "Simplify 3x + 5x.", accept: ["8x"], hint: "Add the coefficients of the x terms together: 3 + 5." },
        { id: "we-q2", prompt: "Simplify 7y + 2 − 3y + 6.", accept: ["4y+8", "4y + 8"], hint: "Collect the y terms first (7y − 3y), then collect the numbers (2 + 6)." },
        { id: "we-q3", prompt: "Simplify 2x + 3y + x + y.", accept: ["3x+4y", "3x + 4y"], hint: "Collect x terms and y terms separately — they cannot be combined with each other." },
        { id: "we-q4", prompt: "If x = 5, what is the value of 3x + 4?", accept: ["19"], hint: "Substitute x = 5 first: 3 × 5 + 4." },
        { id: "we-q5", prompt: "If a = 2 and b = 3, what is the value of 4a + 2b?", accept: ["14"], hint: "Work out 4 × 2 and 2 × 3 separately, then add them." },
        { id: "we-q6", prompt: "Simplify 9x − 4x + 3.", accept: ["5x+3", "5x + 3"], hint: "9x − 4x leaves the x term, then keep the +3 separate." },
      ],
      mistakes: [
        "Combining unlike terms, such as writing 3x + 2y as 5xy.",
        "Forgetting to apply the sign in front of a term when collecting like terms (e.g. losing a minus sign).",
        "Substituting a value but forgetting the order of operations (multiplying before adding).",
      ],
      examTip: "Underline or circle matching letter terms in different colours before you start collecting — it stops terms getting mixed up.",
      searchTerms: ["algebra", "expression", "simplify", "like terms", "substitution", "collect"],
    },
    {
      id: "solving-linear-equations",
      title: "Solving Simple Linear Equations",
      tier: "Standard",
      objective: "Solve one-step and two-step linear equations by keeping both sides balanced.",
      whyMatters:
        "Solving equations is one of the most frequently tested algebra skills at 11+ — questions often disguise an equation inside a word problem, so fluency with the method is essential.",
      conceptTitle: "Keeping the equation balanced",
      conceptBullets: [
        "An equation is like a <b style=\"color:#C9A24B\">balanced set of scales</b> — whatever you do to one side, you must do to the other.",
        "To solve, work backwards through the operations applied to x, undoing them one at a time.",
        "For a two-step equation like 3x + 4 = 19, first undo the addition/subtraction, then undo the multiplication/division.",
        "Always check your answer by substituting it back into the original equation.",
      ],
      conceptNote: "<b>Remember:</b> undo operations in reverse order — addition or subtraction first, then multiplication or division, to isolate x.",
      glossary: [
        { term: "equation", def: "a statement that two expressions are equal, containing an equals sign" },
        { term: "solve", def: "find the value of the unknown letter that makes the equation true" },
        { term: "inverse operation", def: "the opposite operation, used to undo something (e.g. subtraction undoes addition)" },
        { term: "balance", def: "keeping both sides of an equation equal by doing the same thing to each side" },
      ],
      diagramLabel: "Interactive · Balance Scale",
      Diagram: BalanceScaleEquation,
      worked: {
        question: "Solve 3x + 4 = 19.",
        fastMethod: "Subtract 4 from both sides: 3x = 15. Divide both sides by 3: <b>x = 5</b>.",
        steps: [
          "Undo the addition first: subtract 4 from both sides. 3x + 4 − 4 = 19 − 4, giving 3x = 15.",
          "Undo the multiplication: divide both sides by 3. 3x ÷ 3 = 15 ÷ 3, giving x = 5.",
          "Check by substituting back: 3 × 5 + 4 = 15 + 4 = 19. ✓",
        ],
        answer: "x = <b>5</b>",
      },
      selfCheck: { prompt: "Before the practice set — solve x + 6 = 10.", answer: "x = <b>4</b> (subtract 6 from both sides)." },
      questions: [
        { id: "se-q1", prompt: "Solve x + 7 = 12.", accept: ["5", "x=5", "x = 5"], hint: "Subtract 7 from both sides." },
        { id: "se-q2", prompt: "Solve 5x = 35.", accept: ["7", "x=7", "x = 7"], hint: "Divide both sides by 5." },
        { id: "se-q3", prompt: "Solve 2x + 5 = 17.", accept: ["6", "x=6", "x = 6"], hint: "Subtract 5 from both sides first, then divide by 2." },
        { id: "se-q4", prompt: "Solve 4x − 3 = 21.", accept: ["6", "x=6", "x = 6"], hint: "Add 3 to both sides first, then divide by 4." },
        { id: "se-q5", prompt: "Solve x − 9 = 2.", accept: ["11", "x=11", "x = 11"], hint: "Add 9 to both sides." },
        { id: "se-q6", prompt: "Solve 6x + 2 = 26.", accept: ["4", "x=4", "x = 4"], hint: "Subtract 2 from both sides first, then divide by 6." },
      ],
      mistakes: [
        "Doing an operation to only one side of the equation instead of both.",
        "Undoing the operations in the wrong order (dividing before subtracting).",
        "Forgetting to check the final answer by substituting it back into the original equation.",
      ],
      examTip: "Write each step underneath the last, keeping the equals signs lined up — it makes mistakes much easier to spot.",
      searchTerms: ["algebra", "equation", "solve", "linear", "balance", "inverse operation"],
    },
    {
      id: "sequences-and-nth-term",
      title: "Number Sequences & the nth Term",
      tier: "Extension",
      objective: "Find the next terms in a linear sequence and write its nth-term rule.",
      whyMatters:
        "Sequence questions test pattern recognition alongside algebra — the nth-term rule lets you find any term instantly, a skill 11+ papers reward heavily under time pressure.",
      conceptTitle: "Spotting the pattern",
      conceptBullets: [
        "In a linear (arithmetic) sequence, the <b style=\"color:#C9A24B\">common difference</b> between consecutive terms is always the same.",
        "To find the next term, add (or subtract) the common difference to the last term.",
        "The nth-term rule has the form <b style=\"color:#C9A24B\">dn + c</b>, where d is the common difference and c is found by subtracting d from the first term.",
        "Substitute any value of n into the nth-term rule to find that term directly, without listing every term before it.",
      ],
      conceptNote: "<b>Common mistake:</b> using the first term as the coefficient of n instead of the common difference — the coefficient of n is always the common difference.",
      glossary: [
        { term: "sequence", def: "an ordered list of numbers following a rule" },
        { term: "term", def: "one number in a sequence" },
        { term: "common difference", def: "the fixed amount added (or subtracted) between consecutive terms" },
        { term: "nth term", def: "an algebraic rule that gives the value of any term, using its position n" },
      ],
      diagramLabel: "Interactive · Sequence Step Visualiser",
      Diagram: SequenceStepVisualizer,
      worked: {
        question: "Find the nth-term rule for the sequence 5, 8, 11, 14, ...",
        fastMethod: "Common difference = 3, so the rule starts 3n. First term − difference = 5 − 3 = 2, so the rule is <b>3n + 2</b>.",
        steps: [
          "Find the common difference by subtracting consecutive terms: 8 − 5 = 3, 11 − 8 = 3. The common difference is 3.",
          "Use the common difference as the coefficient of n: 3n.",
          "Find the constant by subtracting the common difference from the first term: 5 − 3 = 2.",
          "Write the full rule: 3n + 2.",
          "Check with n = 1: 3 × 1 + 2 = 5 ✓, and n = 2: 3 × 2 + 2 = 8 ✓.",
        ],
        answer: "nth term = <b>3n + 2</b>",
      },
      selfCheck: { prompt: "Before the practice set — what is the next term after 2, 6, 10, 14, ...?", answer: "<b>18</b> (the common difference is 4, so add 4 to the last term)." },
      questions: [
        { id: "sq-q1", prompt: "What is the next term in the sequence 3, 7, 11, 15, ...?", accept: ["19"], hint: "Find the common difference (4), then add it to the last term." },
        { id: "sq-q2", prompt: "What is the common difference of the sequence 20, 17, 14, 11, ...?", accept: ["-3", "−3", "minus 3"], hint: "Subtract consecutive terms: 17 − 20." },
        { id: "sq-q3", prompt: "Find the nth-term rule for the sequence 4, 7, 10, 13, ...", accept: ["3n+1", "3n + 1"], hint: "The common difference is 3, so the rule is 3n + c. Find c using the first term." },
        { id: "sq-q4", prompt: "Find the nth-term rule for the sequence 2, 4, 6, 8, ...", accept: ["2n"], hint: "The common difference is 2, and there is no constant to add or subtract." },
        { id: "sq-q5", prompt: "Using the rule 5n − 2, what is the 6th term?", accept: ["28"], hint: "Substitute n = 6 into the rule: 5 × 6 − 2." },
        { id: "sq-q6", prompt: "Find the nth-term rule for the sequence 6, 10, 14, 18, ...", accept: ["4n+2", "4n + 2"], hint: "The common difference is 4, so the rule is 4n + c." },
      ],
      mistakes: [
        "Using the first term instead of the common difference as the coefficient of n.",
        "Getting the sign of the constant wrong when the sequence is decreasing.",
        "Miscounting the term position (e.g. treating the first term as n = 0 instead of n = 1).",
      ],
      examTip: "Always check your nth-term rule by substituting n = 1 and n = 2 — it should regenerate the first two terms of the sequence exactly.",
      searchTerms: ["algebra", "sequence", "nth term", "pattern", "common difference", "linear sequence"],
    },
  ],
};
