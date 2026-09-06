# EBMC VR Paper format breakdown

**Source**: `VR paper.pdf` in the user's Downloads root (not part of this repo) — a scanned copy of "EBMC VR Paper 3" (EKS Academy), an 80-question, third-party GL-style Verbal Reasoning practice paper with its own bubble answer sheet. It is an image-scanned PDF (no extractable text; read via page-image rendering).

No file mapping this PDF to the `vr-intensive-*` mock series existed before this note (checked `research/*.md` and the wider repo on 2026-08-27) — this is that missing breakdown, written after re-reading the source PDF to confirm the format catalogue. `vr-intensive-diagnostic`, `vr-intensive-mock-2`, `-3`, `-4`/`-4-easier`, and `-5` (see `vr-mock-authoring` skill) are all hand-authored *original* Summit content built on this same 15-block format catalogue, not copies of the PDF's actual questions/numbers.

## The 15 format blocks (in the PDF's own order), 80 questions total

| Q range | Block instruction (paraphrased) | Answer mechanic | Platform `topic` label |
|---|---|---|---|
| 1–6 | Pick one word from each group to complete the analogy sentence | 2-group pick (1 of 3 + 1 of 3) | Verbal Analogies |
| 7–12 | Find the missing number in the series | Write-in number | Number Sequences |
| 13 | Read a scenario, deduce which statement is *definitely true* | 1 of 5 (A–E) | Logic Puzzles |
| 14–18 | Letters stand for numbers; evaluate the given sum | Write-in number | Letter Values |
| 19–25 | Pick one word from each group that are OPPOSITE in meaning | 2-group pick | Opposites |
| 26–32 | Find the pair of letters that completes the alphabet-position sequence | Write-in letter pair | Letter Sequences |
| 33–37 | Find the missing word: group-2's word relates to group-1's word the same way as the worked example | Write-in word (relationship-derived) | Word Bridges |
| 38–44 | Find the 4-letter word hidden across a word boundary in the sentence | Write-in word | Hidden Words |
| 45–49 | Find the TWO words (of five) that are different from the other three | Mark 2 of 5 | Odd One Out |
| 50–55 | Move one letter from the left word to the right word to make two new real words | Write-in letter | Move a Letter |
| 56–60 | Decode/encode a word using a consistent substitution cipher | Write-in word | Word Codes |
| 61–65 | Find the missing number that completes the equation | Write-in number | Number Equations |
| 66–71 | Find the one letter that completes word A and begins word B (same letter, two blanks) | Write-in letter | Insert Letter |
| 72–77 | Pick one word from each group that join to form a correctly spelled compound word | 2-group pick | Compound Words |
| 78–80 | Three of four words are given in a shared number code (order scrambled, one code missing) — decode | Write-in number/word | Number Codes |

## How the `vr-intensive-*` mocks map onto this

- **`vr-intensive-diagnostic`** and **`vr-intensive-mock-2`/`-3`**: use the full spread of blocks above (Verbal Analogies, Opposites, Number Sequences, Logic Puzzles, Letter Values, Letter Sequences, Word Bridges, Hidden Words, Odd One Out, Move a Letter, Word Codes, Number Equations, Insert Letter, Compound Words, Number Codes), all as hand-authored original content with fresh vocabulary/numbers — not the PDF's actual questions.
- **`vr-intensive-mock-4`/`-4-easier`**: deliberately *narrowed* to 6 of these blocks — Verbal Analogies, Opposites, Synonyms (a platform-native single-best-match addition, not one of the PDF's 15 blocks), Odd One Out, Logic Puzzles, and Number Analogies (the platform's own bracket-relationship format, distinct from the PDF's Number Equations/Number Codes blocks).
- **`vr-intensive-mock-5`** (added 2026-08-27): same narrowed 6-block structure as Mock 4, same question counts per block (16/16/14/14/8/12), same difficulty band — written specifically to fix a real ambiguity bug in the 2-group-pick format (see below), not to be harder or easier.

## The 2-group-pick ambiguity bug (why Mock 5 exists)

The PDF's own Analogies/Opposites blocks use a real GL Assessment archetype: "pick one word from each of two groups of three." This format is only unambiguous if, of the 9 possible cross-group word pairings, exactly one produces a true/sensible statement under the stated relationship. Two live-bank failure patterns were found on Lupin's `vr-intensive-diagnostic` attempt (2026-08-26, see the `project_vr_intensive_diagnostic_ambiguous_questions` memory) and confirmed against a wider re-check of `vrb`-prefixed questions while building Mock 5:

1. **Intra-group synonym clusters**: a bracket group contains two words that are synonyms of each other (e.g. `(permit, forbid, allow)`), so *both* can validly pair with the same correct word in the other group (`prohibit`), leaving no principled way to prefer one over the other. Fix: never put two synonyms of the target word in the same group.
2. **A genuinely valid but unintended cross-pair**: a "decoy" word in one group turns out to have its real antonym/relationship-partner sitting in the *other* group (e.g. `(modern, ancient, ornate)` — `(historic, colourful, plain)`; `ornate`/`plain` are themselves a textbook-valid antonym pair, even though the intended answer is `modern`/`historic`). This is not caught by checking synonym clusters alone — it requires checking all 9 cross-combinations for a second true relationship, not just the intended one.

`vr-intensive-mock-5`'s 32 Analogies/Opposites questions were each checked pair-by-pair against all 9 combinations before being finalised, and its Logic Puzzles/Number Analogies were re-verified for a single forced answer (a deliberately unconnected "wildcard" person/item in each Logic Puzzle; both worked examples checked against multiple candidate rules for each Number Analogy) — see the mock's own `description` field in `src/data/platform.ts` for the same detail in shorter form. The 4 originally-flagged diagnostic questions (`vrb2`, `vrb6`, `vrb23`, `vrb25`) were **not** rewritten in place this session (per the existing memory note: flagged, not yet fixed in the live mock) — that remains a separate, smaller follow-up if the founder wants `vr-intensive-diagnostic` itself corrected rather than only avoided in future mocks.
