---
name: vr-mock-authoring
description: Write and wire up new Verbal Reasoning mocks for Summit Tuition as hand-authored fixtures in src/data/platform.ts, matching real GL Assessment VR archetypes rather than invented question types. Use when asked to add a new VR mock, a new Elite VR paper, or a batch of new VR questions.
---

# VR mock authoring

**Audit finding (2026-08-18): the platform's published full-length VR papers drift from real GL Assessment VR question types.** `research/gl-vr-nvr-question-bank.md` documents GL's real 18-archetype catalogue (researched from 4 GL VR familiarisation booklets), but the hand-authored VR mocks (`vr-elite-difficult`, `vr-summit-full`, `vr-horizon-full`, and later papers) were designed from "genuinely hard verbal reasoning" first principles, not checked against it. Several topics (Double Meanings/homonyms, Anagrams, single-MC vocabulary, informal number-riddle "Logic Puzzles", family-relationship puzzles, word-ladders, multi-step manipulation) aren't on GL's real list, and even overlapping topics sometimes use the wrong *answer format*. Not "wrong" content — still original, verified reasoning practice — but don't market these as authentically "GL-style" without qualification. **Read this whole skill, and the archetype table in `research/gl-vr-nvr-question-bank.md`, before writing the next VR mock.**

## The real GL VR archetype catalogue (18 types)

Full detail in `research/gl-vr-nvr-question-bank.md` — summarised here with how the existing bank maps onto it:

| # | GL archetype | Real answer format | On-platform equivalent | Status |
|---|---|---|---|---|
| 1 | Letter-move between two words | MC letter A-E | — | **missing** |
| 2 | Insert-letter bridge (`word[?]word` x2) | MC letter A-E | "Missing Letters / Bridging Words" | close, format differs (platform asks for the missing *word*, not a single bridging *letter*) |
| 3 | Bracket word-building analogy | MC word | — | **missing** |
| 4 | Odd one out — mark the **2** that don't belong | mark 2 of 5 | "Word Relationships / Odd One Out" | format differs (platform is always 1-of-5) |
| 5 | Closest in meaning — pick 1 word from each of 2 groups | 1 from each group | "Vocabulary / Synonyms and Antonyms" | format differs (platform is single MC) |
| 6 | Most opposite in meaning — pick 1 from each of 2 groups | 1 from each group | same as #5 | format differs |
| 7 | Hidden word spanning two words in a sentence | MC word-pair A-E | "Hidden Words / Word Boundaries" | matches |
| 8 | Missing 3-letter chunk in a CAPS word | MC A-E | — | **missing** |
| 9 | Word analogy (incl. alphabet-letter variant) | 1 from each group | "Verbal Analogies" | close, platform format is single MC |
| 10 | Number series | write-in number | "Number Sequences" | matches |
| 11 | Alphabet letter-pair series | write-in letter(s) | "Letter Sequences" | matches |
| 12 | Logical deduction from a short passage | MC / direct answer | "Logic Puzzles" (number riddles) | **mismatched** — GL's version is verbal/logical deduction from prose, not an algebraic number riddle |
| 13 | Letters-for-numbers algebra (A=1, B=2...) | MC letter | "Letter Values" | matches |
| 14 | Balanced equation, missing number | write-in number | — | **missing** |
| 15 | Word <-> number code (3 given, 1 missing) | write-in | "Word Codes" (numeric-code subtopics) | matches |
| 16 | Word <-> word shift cipher | write-in word | "Word Codes" (shift-cipher subtopics) | matches |
| 17 | Compound word builder (2 groups -> concatenate) | 1 from each group | "Compound Words / Bridging Word" | format differs (platform asks for the shared prefix/suffix word) |
| 18 | Word-pair truncation pattern (3rd pair missing) | MC word | — | **missing** |

**Topics on the platform with no GL equivalent** (original Summit content, fine as clearly-labelled bonus/extension material, never present as GL-style without qualifying): Double Meanings/Homonyms, Anagrams, family-relationship logic puzzles, word-ladders, "follow the instructions" multi-step manipulation, "odd pair out" (distinct from GL's mark-2-of-5 odd one out).

## Going forward: two honest paths, pick one per mock

1. **Genuinely GL-style paper**: every question maps to one of the 18 archetypes **using the real answer format** (2-of-5 odd-one-out, pick-1-from-each-of-2-groups for synonym/antonym/analogy/compound-word, single bridging letter not a whole word, etc.) — check what UI already exists (`SegmentMistakeAnswer`-style multi-part answers, two-group pickers) before assuming a new component is needed. Only call the mock `"GL-style"` in `style`/description if it actually does this.
2. **Original Summit-style paper** (what all existing full VR papers actually are): keep the broader topic list and simpler single-MC format, but say so honestly in `description` — "an original Summit Tuition paper inspired by real 11+ verbal reasoning skills, not a GL-format reproduction" (same disclaimer convention as the 2026-07-24 real-school-style mocks). **Do not label `style` `"GL-style"` if taking this path.**

Ask which path a commission needs before writing 50 questions — don't default silently to path 2.

## Question id convention

Each mock claims its own id prefix range so ids never collide. Before picking one, grep it's free:

```bash
grep -oE '"id": "yourprefix[0-9]+"|id: "yourprefix[0-9]+"' src/data/platform.ts
```

## Question shape

```ts
{
  id: "vrz1",
  subject: "VR",
  topic: "Word Codes", // matches a topic string the admin report groups by
  subtopic: "...", // the specific archetype/rule, shown in the marked report
  difficulty: "standard", // or "stretch"
  questionType: "multiple_choice",
  text: "...",
  options: ["...", "...", "...", "..."], // 4 options, order doesn't matter — QuestionRenderer shuffles per question
  correctAnswer: "...",
  markScheme: "...", // full worked reasoning — shown in the admin report under "What they don't know yet"
  explanation: "...", // the common mistake / how to avoid it
  marks: 1,
  tags: ["...", "original"],
  timeEstimateSeconds: 100,
  sourceStyle: "unknown", originalGenerated: true,
}
```

Before finalising `markScheme`/`correctAnswer` on any cipher, sequence, or letter-value question, **recompute it independently by hand or with a throwaway script** — a real recurring bug class on this platform, don't skip it because "it looked fine last time."

## Verify and deploy

```bash
npx tsx scripts/verify-mock.mts your-new-mock-id   # bank-wide dup ids, answers resolve, marks sum, evaluateMockQuality
npm.cmd run typecheck
npm run db:seed   # idempotent catalog upsert — pushing platform.ts alone does NOT make it live; production reads Postgres, not the static file. Safe to re-run, do this once reviewed.
```

## Deep ambiguity/integrity checklist (run on every new VR mock, not just spot-checks)

**2026-08-31 finding**: a first-pass check (types/order/counts, answers resolve, no dup options, cross-question repetition, answer-position spread) is not enough — running the sharper checklist below against `vr-intensive-mock-9` caught 2 real bugs the first pass missed entirely: a Move-a-Letter question where a *listed wrong* distractor letter also produced a genuine second valid solution via an obscure-but-real word (false-correct, worse than an unlisted alternate answer), and a Word-Codes cipher block whose worked example disclosed only 5 of the ~17 letter-mappings actually needed to solve the follow-on questions — genuinely unsolvable as written despite passing every mechanical check. **Treat this checklist as the real bar, not the summary list above.**

Re-derive everything from scratch — don't just re-read your own markScheme/explanation and assume it's right, and don't check only the intended answer, check whether any *other* option also resolves.

- **Analogies**: could two options each complete a valid-but-different relationship (category vs. function)? Is the stem pair's relationship looser/vaguer than the answer's, letting a defensible alternate pairing exist?
- **Number sequences**: does the rule technically fit 2+ plausible next terms from only the shown terms (under-constrained)? Re-derive the rule from scratch, don't just confirm the intended one works.
- **Logic puzzles**: read the clues in given order — does an early clue reference something only defined later, reading as contradictory on first pass? Re-enumerate every valid arrangement from scratch — is the "must be true" answer actually only "could be true"?
- **Letter-value algebra**: does the question restate its own A-E values explicitly, or silently rely on the instructions' demo values (a shifted/reversed value that isn't restated will get answered against the demo's rule by default)? Recompute independently — is `correctAnswer` a typo of the true value?
- **Opposites**: is there a second genuine antonym at a different strength/register in either bracket (e.g. correct pair is sad/happy but "joyful" also sits there)? Does the target word have multiple senses (light = weight vs brightness) the stem doesn't disambiguate?
- **Letter sequences**: does the sequence rely on monospace-only visual alignment (skip-pattern spacing) that breaks in a proportional font? Does it wrap past Z, and if so is that clearly intentional?
- **Word bridges**: re-derive from scratch — does more than one word bridge both sides? Does the bridge only work under one sense of an ambiguous word?
- **Hidden words**: re-scan the ENTIRE sentence at every possible word-boundary split (not just the intended one) for any other accidental hidden word, including any that overlaps distractor vocabulary. Does the hidden word straddle punctuation ambiguously?
- **Odd-one-out**: are the "odd two" odd for two different valid reasons, or is a third option also arguably odd by an unintended rule? Is the shared category among the "in" group broad enough that a different 3-word grouping is also defensible?
- **Move-a-letter**: for every listed wrong-answer letter, check whether removing it *also* produces a valid real word pairing (obscure dictionary words count — this is exactly the bug class that slipped through once already). Confirm the task is genuinely "move one letter," not secretly "move and reorder."
- **Word codes / ciphers**: does the worked example disclose enough letter-mappings to actually solve every follow-on question, or does the answer key quietly assume mappings never shown to the student? Does every code's length exactly match its word's length?
- **Number equations**: is there order-of-operations ambiguity not resolved by explicit brackets? Could a mistyped operator (+ vs ×) still produce a plausible-looking wrong answer among the options?
- **Shared-letter (double-pair)**: re-check all 26 letters against all 4 word-formations per question — is more than one letter genuinely valid? (A near-miss that's eliminated by the *second* pair is fine; a near-miss that survives both pairs is not.)
- **Word building**: check ALL cross-combinations between the two groups (not just the intended pair) — does any other combination also spell a real word?
- **Number-code deduction**: re-derive the full cipher from only the given codes — is it uniquely solvable, or does another digit assignment also satisfy every given constraint?

**Cross-cutting, all questions:**
- *Rendering*: smart quotes/em-dashes/symbols pasted correctly? No literal markdown/HTML leftovers (`**bold**`, `&amp;`)? Nothing depends on monospace alignment?
- *Answer-key integrity*: script-check every `correctAnswer` is an exact string match (case/spacing/punctuation) to its own `options` entry — a silent mismatch means correct clicks register as wrong. Confirm every `options` element is a `string`, never a `number`.
- *Cross-question consistency*: same-block questions phrase instructions the same way; no theme/example word/answer word reused across 2+ questions anywhere in the mock.
- *Structural*: no numbering gaps/skips/dupes; no stray reference to a diagram/passage that isn't actually a field on the question.
- *Answer-option hygiene*: no trailing spaces/stray characters in any option; no distractor so thematically mismatched it's eliminable without solving; correct answers aren't clustered on one option position (moot if `seededShuffle` still governs render order — confirm no hardcoded order path was introduced).

If ANY item fails, fix it and re-run the FULL checklist again, not just the failed item — a fix can misalign something else (e.g. editing a hidden-word sentence can introduce a new accidental hidden word).
