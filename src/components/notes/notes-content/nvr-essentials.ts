import type { TopicContent } from "../types";
import {
  OddOneOutDemo,
  SeriesSequencesDemo,
  AnalogiesDemo,
  RotationDemo,
  MirrorReflectionDemo,
} from "../notes-diagrams/nvr-essentials-demos";

export const nvrEssentialsTopic: TopicContent = {
  slug: "nvr-essentials",
  subject: "NVR",
  subjectSlug: "non-verbal-reasoning",
  title: "Non-Verbal Reasoning Essentials",
  description:
    "The five most common Non-Verbal Reasoning question types — odd one out, series, analogies, rotation and mirror reflection — explained visually with an interactive figure to try in every subtopic.",
  glyphs: ["◆", "▲", "●", "▢"],
  subtopics: [
    {
      id: "odd-one-out",
      title: "Odd One Out",
      tier: "Foundation",
      objective: "Spot the shared rule linking four figures and identify the one figure that breaks it.",
      whyMatters:
        "Odd One Out questions appear on almost every real 11+ NVR paper — they're quick marks once you know to hunt for the rule systematically, but easy to rush and get wrong under time pressure.",
      conceptTitle: "How Odd One Out questions work",
      conceptBullets: [
        "Every Odd One Out question hides a single <b style=\"color:#C9A24B\">rule</b> that four of the five figures follow — your job is to find that rule, not just spot 'the different-looking one'.",
        "Common rules include: number of sides, number of <b style=\"color:#C9A24B\">shading</b> (solid vs outline), number of dots or lines inside a shape, whether a figure has a line of <b style=\"color:#C9A24B\">symmetry</b>, and the direction a shape points.",
        "Check EVERY figure against a candidate rule before deciding — sometimes two figures look similar but only one actually breaks the rule.",
        "If your first rule doesn't cleanly split 4-and-1, look again — there is always exactly one rule that works.",
      ],
      conceptNote:
        "<b>Tip:</b> work through the figures left to right, listing what's true of each one (sides, shading, symmetry) before comparing — don't just eyeball the row.",
      glossary: [
        { term: "Rule", def: "The single shared property linking four of the five figures." },
        { term: "Shading", def: "Whether a figure is solid (filled in) or just an outline." },
        { term: "Symmetry", def: "Whether a shape looks the same when reflected across a line through its middle." },
      ],
      diagramLabel: "Try it: spot the rule-breaker",
      Diagram: OddOneOutDemo,
      worked: {
        question: "Four shapes are solid black, one is an outline only. Which is the odd one out?",
        fastMethod: "Scan for shading first — it's the fastest rule to check, faster than counting sides or symmetry.",
        steps: [
          "List each figure's shading: solid, solid, solid, outline, solid.",
          "Four figures share 'solid fill'; one does not.",
          "The outline-only figure is the odd one out.",
        ],
        answer: "The outline-only figure.",
      },
      selfCheck: {
        prompt: "True or false: in an Odd One Out question, you should look for a rule that ALL FIVE figures share.",
        answer: "False — you're looking for a rule that exactly FOUR of the five figures share; the fifth is the one that breaks it.",
      },
      questions: [
        { id: "ooo-q1", prompt: "Four figures have 4 sides, one has 3. How many sides does the odd one out have?", accept: ["3", "three"], hint: "count the sides of the figure that doesn't match the group." },
        { id: "ooo-q2", prompt: "In a set where the rule is 'number of dots = 2', how many dots does the odd one out have?", accept: ["not 2", "anything except 2", "1 or 3"], hint: "the odd one out is defined by NOT matching the rule — so it just needs a different dot count." },
        { id: "ooo-q3", prompt: "If four figures are symmetrical and one is not, is the odd one out the symmetrical or non-symmetrical figure?", accept: ["non-symmetrical", "the non-symmetrical one", "not symmetrical"], hint: "the majority rule here is 'has symmetry' — so the odd one out breaks that." },
      ],
      mistakes: [
        "Picking the figure that just 'looks different' at a glance, without checking it against a specific rule.",
        "Stopping after finding one rule that almost fits, instead of checking it holds for all five figures.",
      ],
      examTip: "If you're stuck after 10 seconds, systematically check sides, then shading, then symmetry, then dot/line count — one of these four almost always is the rule.",
      searchTerms: ["odd one out", "rule breaker", "which figure", "shading rule", "symmetry rule"],
    },
    {
      id: "series-sequences",
      title: "Series & Sequences",
      tier: "Foundation",
      objective: "Work out the pattern linking a row of figures and predict what comes next.",
      whyMatters:
        "Series questions test whether you can track more than one change at once (e.g. rotation AND size) — a skill that also underpins the harder Analogies and Matrix question types.",
      conceptTitle: "How Series questions work",
      conceptBullets: [
        "Each step in the sequence applies the same <b style=\"color:#C9A24B\">transformation</b> to the previous figure — commonly a fixed rotation, a growing/shrinking size, or a steadily increasing number of parts (dots, sides, lines).",
        "Work out the change between step 1 and step 2 first, then check it also explains step 2 to step 3 — this confirms you've found the real rule, not a coincidence.",
        "Watch for sequences that combine two rules at once, e.g. 'rotates 45° AND gains one dot' each step.",
        "The answer must continue the SAME rule one more time — not just look similar to the last figure.",
      ],
      conceptNote:
        "<b>Tip:</b> for rotation sequences, work out the exact number of degrees turned each step (e.g. 45°) rather than just the direction — this stops you picking a figure that's rotated the wrong amount.",
      glossary: [
        { term: "Sequence", def: "A row of figures where each one follows a fixed rule from the one before it." },
        { term: "Transformation", def: "A change applied to a figure — rotation, resizing, added detail, or changed shading." },
        { term: "Interval", def: "The fixed amount a pattern changes by at each step, e.g. +45° or +1 dot." },
      ],
      diagramLabel: "Try it: find the next figure",
      Diagram: SeriesSequencesDemo,
      worked: {
        question: "A square rotates 45° clockwise at each step: 0°, 45°, 90°, ?",
        fastMethod: "Add the interval (45°) to the last known rotation rather than re-tracking every earlier step.",
        steps: [
          "Find the interval between steps: 45° each time.",
          "The last figure shown is rotated 90°.",
          "Add the interval: 90° + 45° = 135°.",
        ],
        answer: "The square rotated 135°.",
      },
      selfCheck: {
        prompt: "A sequence goes 1 dot, 3 dots, 5 dots. How many dots come next?",
        answer: "7 dots — the interval is +2 dots each step.",
      },
      questions: [
        { id: "series-q1", prompt: "A shape rotates 30° each step, starting at 0°. What is the rotation after 4 steps?", accept: ["120", "120°"], hint: "multiply the interval by the number of steps." },
        { id: "series-q2", prompt: "A row of circles grows: 1, 2, 3, 4. How many circles in the 5th figure?", accept: ["5", "five"], hint: "the interval is +1 circle per step." },
        { id: "series-q3", prompt: "A hexagon shrinks by the same amount each step. After the figure becomes tiny, could it logically shrink further in the sequence?", accept: ["no", "it would disappear/go to zero", "no, it can't shrink below zero size"], hint: "think about what a shrinking pattern eventually reaches — a real exam answer never asks for an impossible size." },
      ],
      mistakes: [
        "Only checking the change between the first two figures and assuming it applies without checking a third step too.",
        "Tracking rotation direction but forgetting to check the exact number of degrees.",
      ],
      examTip: "If two things change at once (rotation AND shading, for example), write down both rules separately before picking an answer — most wrong options only get one of the two rules right.",
      searchTerms: ["series", "sequence", "next figure", "pattern rule", "rotation interval"],
    },
    {
      id: "analogies",
      title: "Analogies (Figure A is to B as C is to ?)",
      tier: "Standard",
      objective: "Work out the transformation linking a pair of figures, then apply the same transformation to a third figure.",
      whyMatters:
        "Analogy questions are one of the highest-scoring question types once mastered, because the rule is always fully shown by the first pair — there's no guessing involved if you read the transformation correctly.",
      conceptTitle: "How Analogy questions work",
      conceptBullets: [
        "The first pair of figures (A → B) shows you the exact <b style=\"color:#C9A24B\">transformation rule</b> in full — nothing is hidden.",
        "Some analogies combine two changes at once, e.g. rotate 90° AND change shading — always check for a second rule, not just the first one you spot.",
        "Apply the SAME rule(s) to the third figure (C) to work out the answer — don't invent a new rule that happens to fit one of the options.",
        "If two options both look plausible, re-check the original A → B change more carefully — one of them is usually missing a step.",
      ],
      conceptNote:
        "<b>Tip:</b> describe the A → B change out loud in words first (\"it rotates and the fill inverts\") before looking at the answer options — this stops the options from tempting you into the wrong rule.",
      glossary: [
        { term: "Analogy", def: "A comparison of the form 'A is to B as C is to ?' where the same rule links both pairs." },
        { term: "Fill inversion", def: "A change from solid to outline, or outline to solid." },
        { term: "Combined rule", def: "An analogy that changes two things at once, e.g. rotation plus fill." },
      ],
      diagramLabel: "Try it: complete the analogy",
      Diagram: AnalogiesDemo,
      worked: {
        question: "A solid square becomes a rotated, outline-only square. Apply the same rule to a solid triangle.",
        fastMethod: "Name both changes separately (rotate 90°; solid → outline) then apply both together, not one at a time.",
        steps: [
          "Compare figure A and B: the square rotates 90° AND changes from solid to outline.",
          "Two rules found: rotate 90°, and invert the fill.",
          "Apply both to the triangle: rotate it 90° and make it outline-only.",
        ],
        answer: "A rotated, outline-only triangle.",
      },
      selfCheck: {
        prompt: "In an analogy, if figure B is smaller and darker than figure A, how many separate rules are you working with?",
        answer: "Two — a size change and a shading change — both need to be applied to figure C.",
      },
      questions: [
        { id: "analogy-q1", prompt: "Circle is to smaller circle as square is to (what kind of square)?", accept: ["smaller square", "a smaller square"], hint: "the rule from the first pair is simply 'gets smaller' — apply that exact rule." },
        { id: "analogy-q2", prompt: "Triangle is to triangle-with-a-dot-added as pentagon is to pentagon with what added?", accept: ["a dot", "one dot", "pentagon with a dot"], hint: "the rule is 'gains one dot' — apply it to the second shape too." },
        { id: "analogy-q3", prompt: "If the A-to-B rule is 'rotate 180°', and figure C is a right-pointing arrow, which direction does the answer point?", accept: ["left", "left-pointing", "pointing left"], hint: "rotating an arrow 180° reverses the direction it points." },
      ],
      mistakes: [
        "Only spotting one of two combined rules (e.g. noticing the rotation but missing the shading change).",
        "Applying the rule from A to C's given figure incorrectly, e.g. rotating the wrong direction.",
      ],
      examTip: "Say the rule out loud in words before scanning the options — a rule you can describe in a full sentence is one you're far less likely to misapply.",
      searchTerms: ["analogies", "figure a is to b", "combined rule", "shape transformation", "matrix pair"],
    },
    {
      id: "rotation",
      title: "Rotation",
      tier: "Standard",
      objective: "Tell a true rotation of a figure apart from a mirrored (flipped) version of it.",
      whyMatters:
        "This is the single most common trap in NVR papers — a mirrored figure often looks almost identical to a rotated one at a glance, and exam writers deliberately place a mirror-image decoy next to the correct rotation.",
      conceptTitle: "How Rotation questions work",
      conceptBullets: [
        "A true <b style=\"color:#C9A24B\">rotation</b> spins a figure around a fixed point — like turning a flat picture on a table. Every internal detail keeps the same relative position.",
        "A <b style=\"color:#C9A24B\">mirror image</b> (reflection) flips a figure — it's the same as looking at it in a mirror, which reverses left and right. This is NOT a rotation, even though it can look similar.",
        "The fastest test: pick one distinctive feature (a notch, a dot, an uneven edge) and track exactly where it moves — in a rotation it moves around the centre; in a mirror it flips to the opposite side.",
        "Some questions include a figure that has been BOTH rotated and mirrored — this is not a valid 'rotation only' answer and should be ruled out.",
      ],
      conceptNote:
        "<b>Tip:</b> physically trace the figure's outline with your finger while imagining it spinning flat — if the answer option requires you to imagine 'flipping the page over', it's a mirror image, not a rotation.",
      glossary: [
        { term: "Rotation", def: "Turning a figure around a fixed centre point without changing its shape or flipping it." },
        { term: "Mirror image / Reflection", def: "A flipped version of a figure, reversed left-to-right or top-to-bottom." },
        { term: "Distinctive feature", def: "A small unique detail (dot, notch) used to track how a figure has moved." },
      ],
      diagramLabel: "Try it: spot the true rotation",
      Diagram: RotationDemo,
      worked: {
        question: "An L-shaped figure is shown. Which option is a genuine rotation of it, not a mirror image?",
        fastMethod: "Track one corner of the L — in a real rotation it swings around the centre; in a mirrored option it jumps to the opposite side instead.",
        steps: [
          "Pick the L-shape's longest arm as the tracked feature.",
          "In the correct option, that arm has simply turned 90° around the centre.",
          "In the incorrect options, the arm has flipped to the mirrored side instead of turning.",
        ],
        answer: "The option where the shape has genuinely turned, not flipped.",
      },
      selfCheck: {
        prompt: "True or false: a figure rotated by 180° can sometimes look identical to a mirrored version of itself.",
        answer: "True for certain symmetrical shapes — but for an irregular shape (like an L), a 180° rotation and a mirror image will look different if you track a specific feature carefully.",
      },
      questions: [
        { id: "rotation-q1", prompt: "If a shape with a dot in its top-left corner is rotated 90° clockwise, which corner does the dot move towards?", accept: ["top-right", "the top right corner"], hint: "imagine spinning the whole shape a quarter-turn clockwise — where does 'top-left' end up?" },
        { id: "rotation-q2", prompt: "Is flipping a figure left-to-right the same as rotating it 180°? (yes/no)", accept: ["no"], hint: "a left-right flip is a mirror image, not a rotation — even though both can look like a 'turn'." },
        { id: "rotation-q3", prompt: "A figure is rotated 270° clockwise. Is this the same final position as rotating it 90° anticlockwise?", accept: ["yes"], hint: "270° clockwise and 90° anticlockwise both end at the same point on a circle." },
      ],
      mistakes: [
        "Confusing a mirror image for a rotation because the overall silhouette looks similar.",
        "Rotating the wrong direction (clockwise vs anticlockwise) when working out where a feature should land.",
      ],
      examTip: "Whenever an option 'almost' matches but feels slightly wrong, check if it's actually a mirror image — this is the exam's favourite decoy for rotation questions.",
      searchTerms: ["rotation", "turn", "mirror trap", "clockwise", "anticlockwise", "spin the shape"],
    },
    {
      id: "mirror-reflection",
      title: "Mirror & Reflection",
      tier: "Extension",
      objective: "Correctly reflect a figure across a given mirror line, including figures with internal detail.",
      whyMatters:
        "Reflection questions with internal detail (a dot, a smaller shape inside) are where most marks are lost — students often flip the outline correctly but forget to flip the detail inside it too.",
      conceptTitle: "How Mirror & Reflection questions work",
      conceptBullets: [
        "A <b style=\"color:#C9A24B\">reflection</b> flips a figure across the mirror line so it lands the same distance from the line on the opposite side, like a real mirror image.",
        "Every part of the figure reflects, including any internal <b style=\"color:#C9A24B\">detail</b> (a dot, a smaller shape) — not just the outline.",
        "The distance from the mirror line stays the same before and after — a detail close to the line stays close to the line after reflecting.",
        "A vertical mirror line flips left-right; a horizontal mirror line flips top-bottom — always check which orientation the line is drawn in.",
      ],
      conceptNote:
        "<b>Tip:</b> reflect the outline first, then go back and reflect each internal detail separately, checking its distance from the mirror line matches the original.",
      glossary: [
        { term: "Mirror line", def: "The line a figure is reflected across — often shown dashed." },
        { term: "Reflection", def: "A flipped copy of a figure, the same distance from the mirror line as the original." },
        { term: "Internal detail", def: "A smaller feature (dot, line, shape) inside the main figure that must also be reflected correctly." },
      ],
      diagramLabel: "Try it: find the correct reflection",
      Diagram: MirrorReflectionDemo,
      worked: {
        question: "An L-shaped figure sits to the left of a vertical mirror line. Which option shows its correct reflection?",
        fastMethod: "Measure how far the figure's nearest edge sits from the mirror line, then find the option with a matching distance on the other side.",
        steps: [
          "Note the figure's distance from the mirror line on the original side.",
          "The reflected figure must sit the exact same distance away, on the opposite side.",
          "Check the figure's shape has also flipped left-right, not just moved across.",
        ],
        answer: "The option with the flipped shape at the matching distance from the line.",
      },
      selfCheck: {
        prompt: "A dot sits 3mm from a mirror line inside a shape. How far from the line should the dot be after reflecting?",
        answer: "Still 3mm — reflection preserves distance from the mirror line, just on the opposite side.",
      },
      questions: [
        { id: "mirror-q1", prompt: "A figure is reflected across a HORIZONTAL mirror line. Does it flip left-right or top-bottom?", accept: ["top-bottom", "top to bottom", "up and down"], hint: "a horizontal line runs left-to-right across the page — think about which direction the flip happens." },
        { id: "mirror-q2", prompt: "A shape touches the mirror line exactly. After reflecting, does its reflected copy also touch the line?", accept: ["yes"], hint: "a point exactly on the mirror line doesn't move at all when reflected — it has zero distance to flip." },
        { id: "mirror-q3", prompt: "True or false: reflecting a figure twice across the same mirror line returns it to its original position.", accept: ["true"], hint: "flipping something and then flipping it back the same way undoes the first flip." },
      ],
      mistakes: [
        "Flipping the outline correctly but forgetting to reflect a detail (dot or smaller shape) inside the figure.",
        "Reflecting the figure the wrong way when the mirror line is horizontal instead of vertical.",
      ],
      examTip: "Always check internal details separately from the outline — exam distractors often show a correctly-flipped outline with the dot left in its original (un-flipped) position.",
      searchTerms: ["mirror", "reflection", "flip", "mirror line", "internal detail"],
    },
  ],
};
