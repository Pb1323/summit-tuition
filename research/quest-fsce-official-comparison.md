# QUEST / FSCE sample papers vs the official familiarisation booklets

Pass done 2026-09-21. Official documents were downloaded and read in full (FSCE guides as text, QUEST booklets as page images). Local copies are in `research/official-reference/` (git-excluded, third-party copyright).

## Official sources
- FSCE 2024 familiarisation paper (Heck Grammar): https://www.heckgrammar.co.uk/wp-content/uploads/2024/05/FSCE-Familiarisation-Paper-for-website.pdf
- FSCE 2026 guide for children (CCHS): https://www.cchs.co.uk/wp-content/uploads/2026/02/FSCE-Familiarisation-Guide-Information-for-Children.pdf
- FSCE 2025 guide for children (Heck Grammar): https://www.heckgrammar.co.uk/wp-content/uploads/2025/05/FSCE-Familiarisation-Guide-Information-for-Children.pdf
- QUEST English booklet: https://cdn.prod.website-files.com/68a4809730149dee652714b3/698d8f3c76c292281dfb0e9d_english_familiarizationbooklet.pdf
- QUEST Maths booklet: https://cdn.prod.website-files.com/68a4809730149dee652714b3/698d8f3ca367420b0e3780c0_c278e15353188004902fd425f0b3ffe6_maths_familiarizationbooklet.pdf
- QUEST VR / NVR booklets (not opened): same CDN, `..._VR_familiarizationbooklet.pdf`, `..._NVR_familiarizationbooklet.pdf`
- QUEST interactive taster (not opened): https://app.questassessments.com/public/taster/admissions-demo
- QUEST parent guidance index: https://www.questassessments.com/parent-guidance

## What the official documents say
**FSCE (2026 guide)**: four papers, any order. Adventure = multiple choice (A-D, shaded ovals), Beacon = short written answers (one digit or letter per box), Compass = multiple choice, Discovery = creative response. Content is cross-curricular (Art, Computing, D&T, English, Geography, History, Languages, Maths, Music, PE, Science), up to end of Year 5 only. Explicitly application, not memory ("no extra facts a tutor can help you remember"). No penalty for wrong answers. Only the answer sheet is marked, no marks for working. Wrong answer format = no marks. Practice maths items are worded problems: money change, angles, 24-hour time, decimal subtraction, reading a temperature table, cheapest ticket combination, compound area. 2021 paper had Maths and English sections plus a creative-writing Paper 3.

**QUEST (English and Maths booklets)**: 20 questions in 20 minutes per module, five options A-E, OMR answer sheet (draw a line through a rectangle with pencil, rub out mistakes, never cross out), some questions say "Choose TWO answers", separate reading booklet for English, questions point to paragraphs ("Look at the paragraph beginning..."), "Please go on to the next page" and "END OF TEST" cues. Maths items are mostly short computation (5 x 12 =, 500,000 + 3,000 + 7 =, missing-number boxes) plus charts, clock angles, compound area, volume, pyramid and long-multiplication puzzles.

## Discrepancies found, and what was done
| # | Discrepancy | Action |
|---|---|---|
| 1 | QUEST English had 4 options; official is 5 (A-E) | Fixed: added a plausible fifth option to all 12 questions (`qc1`-`qc12`), verified no option is also correct |
| 2 | QUEST paper had no instruction page, no OMR answer sheet, no END OF TEST | Fixed in print layout: instruction page, pencil-rectangle answer sheet, END OF TEST |
| 3 | QUEST source booklet separate from questions | Already matched (the official English module also uses a separate reading booklet) |
| 4 | FSCE sample was all multiple choice; official Beacon paper is short written answers in digit boxes | Fixed in print layout: 12 numeric questions printed as Beacon-style digit boxes with unit and format hints, 28 as Adventure-style multiple choice. The live website mock is unchanged (still auto-marked multiple choice) |
| 5 | FSCE had no answer sheet, no "no marks for working / wrong format / no penalty" rules | Fixed: instructions rewritten to the 2026 wording, oval and box answer sheet added |
| 6 | Diagram units wrong: L-shaped garden and sports hall floor showed "cm" while the questions said "m" | Fixed: the `shape` visual now takes a `unit` field (default `cm`), set to `m` for `fs30` and `fs31`. This bug was also live on the website |
| 7 | Both PDFs lacked a not-official disclaimer on the paper itself | Added to the answer sheet page of each paper |

## Discrepancies NOT fixed (need a decision or new content)
1. **FSCE is cross-curricular, ours is Maths-only.** The real Adventure/Compass papers mix Art, Computing, D&T, English, Geography, History, Music, PE and Science. Our sample is one subject, which is a defensible slice but is not what a child sees. A faithful version would add ~9 original cross-curricular multiple-choice items plus a Beacon short-answer set.
2. **Some of our FSCE maths items are recall, not application**: Roman numerals, `5^3`, "Work out 236 x 34", "Which is a prime number". The official guide says memory and tutor-taught facts are not tested. Roman numerals came from third-party topic lists, not the official guide. Consider replacing with worded, real-world items like the official ones.
3. **QUEST Maths module not built.** QUEST Maths is 20 mostly short-computation items (A-E). We built FSCE Maths and QUEST English only, so Chris has no QUEST Maths sample.
4. **QUEST "Choose TWO answers" question type** not represented (needs a multi-select item; the live UI supports mark-two for VR).
5. **QUEST Creative Comprehension is Part 2, which has no official booklet.** Our English sample is modelled on second-hand descriptions (6-7 sources; ours has 5). The official English booklet is a different, Part 1 style module (single narrative passage, effect-of-language questions, grammar and punctuation items).
6. **FSCE Discovery (creative response) paper** not built. It is the hand-marked one, out of scope for auto-marked mocks.
7. **Audio instructions**: real FSCE test instructions are played by voice recording; we note this nowhere.
8. **Timing**: we kept 45 minutes (Maths) and 22 minutes (English). The official documents give no FSCE timings and QUEST modules are 20 minutes for 20 questions.
