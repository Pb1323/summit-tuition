# QUEST Assessments — board profile

Research task: verify QUEST is real, pin down its corporate relationship to Atom Learning, its actual exam format, and which real schools use it. Built for the Teachitright (Chris Pearse) re-engagement sample — **not for CEM**, out of scope here.

All findings below come from WebSearch snippets (Anthropic-run search, returns synthesized results + source URLs). **Direct page fetching (WebFetch and `curl`) was blocked by this environment's network egress policy for every domain tried** — including atomlearning.com, questassessments.com, exampapersplus.co.uk, prep4all.co.uk, cognito.org, edifypod.com, leadingtuition.co.uk, and even general sites like Wikipedia/Google/Reddit/Mumsnet directly. So every claim here is sourced from WebSearch's own synthesis of those pages, not a first-hand read of the page text. Treat exact wording/numbers as "reported by multiple secondary sources," not verbatim-quoted from a primary document — no actual QUEST sample question text was recoverable this session (see STATUS file).

## 1. Is QUEST real, and what's its relationship to Atom Learning?

**Real, and confirmed as an Atom Learning-owned brand**, not an independent third party merely partnered with Atom. Quest Assessments is described as owned by Atom Learning, with "the Quest team is separate to the Atom team" — i.e. a distinct product/brand under the same corporate umbrella, not two sibling companies under a shared parent. Atom Learning is the prep/practice platform; Quest Assessments is the actual exam-setting body schools contract with to run their live entrance exams.

**Correction to the task brief's premise**: the brief asked us to find "which real exam board/format [QUEST] replicates," assuming it's a prep company modeled on someone else's exam. That's not what the research shows. QUEST is not a copy of GL, CEM, or ISEB — it's a fourth, original proprietary testing framework in its own right, explicitly marketed as an alternative to GL/CEM/ISEB (see `resources.atomlearning.co.uk`'s "your guide to the key exam boards: GL, ISEB, Quest, Cambridge Insight" article, and multiple independent guides positioning "GL vs CEM vs ISEB vs Quest" as four parallel, distinct systems). It replicates nothing else; schools that use it are using it as their actual exam, same status as a school using GL or CEM.

## 2. Scale and adoption

- Quest Admissions is used by **over 160 UK schools** (one source: "150+ selective independent schools") for real Year 7 entrance selection.
- Confirmed schools/consortiums: Dulwich College, Haberdashers' Girls' School, City of London School for Girls, Mill Hill, Forest School, Whitgift, Trinity Croydon, The Perse (Cambridge), Chigwell, Surbiton High, Harrow School, the **London 11+ Consortium of 13 girls' schools**, and the **five Bexley grammar schools** (the one confirmed state-grammar/selective consortium use — taken on paper, not online, for Bexley).
- The overwhelming majority of confirmed adopters are **independent/private schools**, not state grammar schools — Bexley is the clear exception.
- **Reading-area relevance is unclear**: neither Reading School (uses FSCE — see other profile) nor Kendrick School (uses GL Assessment, confirmed unchanged for the current cycle) use QUEST. No Reading-area grammar school was found using QUEST in this research. This doesn't mean Chris Pearse is wrong that some of his students sit it — Reading has several selective independent day schools (e.g. Leighton Park, Reading Blue Coat) that could plausibly use QUEST, and pupil-premium-eligible candidates nationwide get free Atom Home access via the QUEST partnership — but no specific Reading-area QUEST-using school was confirmed. Flagged as a gap in the STATUS file, not resolved.

## 3. Exam structure — two parts, schools choose what to run

A QUEST entrance exam has up to two distinct parts. A school decides which part(s) to use and, within Part 1, which modules to include — so "Quest Part 1" at one school can differ from "Quest Part 1" at another.

### Part 1 — core academic modules, ADAPTIVE

- Modules: **English** (comprehension/grammar/vocabulary/spelling), **Maths**, **Verbal Reasoning**, **Non-Verbal Reasoning**. Schools pick which combination to run and how long each runs.
- A commonly cited standard timing split: English 30 min + Maths 20 min + NVR 10 min + VR 10 min = **70 minutes total**.
- **Adaptive by design**: as the candidate answers correctly, the next questions get harder; if they're struggling, difficulty holds rather than climbing further (deliberately not "punished" with a plummet — designed to keep the child calm/confident). There is reportedly no fixed ceiling — a child answering everything correctly keeps being pushed harder until the system finds their ceiling. Final scoring accounts for the difficulty of the questions actually presented, not just raw correct-count. This adaptive mechanism is described as applying to Maths, VR and NVR; the English module is described elsewhere as "mostly non-adaptive."
- **Maths module** (Part 1): arithmetic/number, geometry, measurement, statistics, plus mathematical reasoning/problem-solving; "a combination of multiple-choice and free-response questions"; broad KS2 National Curriculum coverage. No official sample questions were recoverable. No calculator-policy statement was found either way.
- **English module** (Part 1): a short unseen passage (fiction or non-fiction, "texts written specifically for Quest Admissions... your child will not have seen them before"), multiple-choice, testing comprehension of key ideas/author's intent/vocabulary-in-context; many (not all) schools add a SPaG layer (verb tenses, parts of speech, synonym/antonym relationships).

### Part 2 — "Puzzles & Problem-Solving" + "Creative Comprehension", NON-ADAPTIVE

- Two modules, both **non-adaptive**: every candidate sees the same fixed question set and can move freely between questions within a section — this is the one part of QUEST that behaves like a normal static paper.
- Runs roughly **40 minutes** total (school-dependent).
- **Puzzles & Problem-Solving**: interactive logic/maths puzzles, explicitly framed as testing resilience/perseverance as much as raw skill.
- **Creative Comprehension**: a themed set of **6–7 linked source materials** (a map, a graph, a data table, a news-style article, an image, etc., all tied to one theme) that the candidate must cross-reference and analyse to answer questions — explicitly multi-source, not a single passage.
- Framed by Atom/Quest as testing critical thinking, adaptability and curiosity rather than pure recall — QUEST's own marketing calls this the part that "looks beyond academics."

## 4. Marking / scoring

No detailed public mark scheme was found for QUEST specifically (unlike FSCE, where MCQ-scan + trained-marker + SAS conversion is documented). Scoring is known to be difficulty-weighted for the adaptive Part 1 sections (see above). No confirmation either way on whether Part 2 uses a simple correct-count or a rubric-based mark scheme for Creative Comprehension's short-answer items.

## 5. Build implications (for the next session)

- **Part 1 (adaptive Maths/English/VR/NVR) is a poor candidate to replicate as a static "mock paper."** Its defining feature — difficulty changing in response to the candidate's own answers — cannot exist in a fixed PDF/on-platform mock without being a misrepresentation of what a real QUEST candidate experiences. Building a "QUEST-style Maths mock" from Part 1 risks the same credibility problem that got our GL-format content rejected in the first place (wrong exam board/format), just one level more subtle (right board, wrong mechanic).
- **Part 2 (Creative Comprehension + Puzzles/Problem-Solving) is non-adaptive and fixed-format** — every candidate sees the same questions, so it CAN be faithfully built as a static sample paper without misrepresenting the real exam mechanic. It's also QUEST's most distinctive, differentiated content (nothing else in Summit's existing bank resembles a themed multi-source comprehension task), and it's the best-documented single component found for QUEST across independent sources.
- See `quest-future-stories-pairing-decision.md` for the resulting recommendation: **QUEST → English sample, built from Part 2 Creative Comprehension** (optionally flavoured with Part 1 English's unseen-passage/vocabulary-in-context style as supporting content), not from the adaptive Part 1 Maths module.
- Diagram/visual needs if this path is taken: an original SVG "map" (a simple stylised route/landmark map, not a real geographic map), an original data table, an original bar or line graph, and a styled "article/source" text block — 3-4 linked visual "sources" per Creative Comprehension question set, themed together. All must be built as original vector art per the project's no-third-party-content rule (see Design Notes in CLAUDE.md) using the `.claude/skills/question-visual-design` conventions (navy/gold/cream palette, existing `QuestionVisual`/`ShowcaseVisual` component patterns) — none of these visual types (map, multi-source "source card") currently exist in `question-visuals.tsx` or `showcase-visuals.tsx`, so at least one genuinely new renderer would be needed, not just reuse of an existing one.

## Sources

- [Quest Assessments 11+ Exams: Everything Parents Need to Know for Grammar School Entry | Atom Learning](https://www.atomlearning.com/blog/quest-admissions-grammar-schools-11-plus)
- [Quest Admissions Part 1 Exam Guide | Atom Learning](https://www.atomlearning.com/blog/quest-admissions-part-1-exam-guide)
- [Quest Admissions Explained: Format, Schools & 2026 Dates | Atom Learning](https://www.atomlearning.com/blog/quest-admissions)
- [Cracking Quest Part 2: Puzzles & Problem-Solving and Creative Comprehension | Atom Learning](https://www.atomlearning.com/blog/quest-admissions-part-2-exam-guide)
- [Familiarisation Tests for Quest Admissions Part 2 - Atom Learning](https://resources.atomlearning.co.uk/en/knowledge/familiarisation-tests-for-quest-admissions-part-2)
- [What's the difference between CEM, GL, Quest & ISEB? | Atom Learning](https://www.atomlearning.com/blog/difference-between-cem-gl-iseb)
- [Your guide to the key exam boards: GL, ISEB, Quest, Cambridge Insight, and more](https://resources.atomlearning.co.uk/en/knowledge/your-guide-to-the-key-exam-boards-gl-iseb-and-more)
- [11 Plus (11+) Exam Preparation | Atom Learning](https://www.atomlearning.com/11-plus)
- [Quest Progress | Parent Guidance](https://www.questassessments.com/parent-guidance)
- [Quest 11 Plus (11+) Exam Guide: Schools, Papers and Dates - Examberry Papers](https://examberrypapers.co.uk/exam-information/quest-11-plus-explained/)
- [A Guide to Quest Entrance Assessments - Exam Papers Plus](https://exampapersplus.co.uk/advice/news-and-insight/a-guide-to-quest-entrance-assessments/)
- [11+ Quest Admissions: A Complete Guide to Quest Assessments - Exam Papers Plus](https://exampapersplus.co.uk/advice/11-plus-year-6/11-quest-admissions-a-complete-parent-guide/)
- [Quest Assessment Part 1 Guide 2026 | Leading Tuition](https://www.leadingtuition.co.uk/blog/quest-assessment-part-1-guide)
- [Quest Assessment Part 2 Guide | Leading Tuition](https://www.leadingtuition.co.uk/blog/quest-assessment-part-2-guide/)
- [Quest Assessment Tutor - Admissions Tests | Leading Tuition](https://www.leadingtuition.co.uk/admissions-tests/quest-admissions/)
- [Pate's Grammar (Cheltenham): admissions guide | Quest Arena Blog](https://eduarchives11plus.co.uk/blog/pates-grammar-entry.html)
- [Tutor guide: Quest Assessments - Atom Learning knowledge base](https://knowledge.atomlearning.io/tutorhelpcentre/quest-assessments-1)
- [11+ Quest Admissions: The Pretest Plus Parent Guide](https://pretestplus.co.uk/11-quest-admissions-the-pretest-plus-parent-guide/)
- [The Quest Assessment: A Complete Guide for 11+ Independent School Entry | My Tutor Elite](https://www.mytutorelite.co.uk/post/quest-assessment-exam)
- [Quest Assessment Guide - Keystone Tutors](https://www.keystonetutors.com/news/quest-assessment-guide)
- [Understanding Digital 11+ Assessments | David Bell Education](https://www.davidbelleducation.co.uk/post/understanding-independent-school-pretests-iseb-quest-gl-adaptive-and-cem-select)
- [11+ Exams Explained: GL, CEM, ISEB & Quest | Study Planet](https://www.study-planet.co.uk/blog/11-exams-explained-gl-cem-iseb-and-quest)
- [Atom Learning Reviews | Trustpilot](https://uk.trustpilot.com/review/atomlearning.co.uk)
- [Atom learning - 11 Plus Exams Forum](https://www.elevenplusexams.co.uk/forum/11plus/viewtopic.php?t=66197)
- [Atom for 11+? | Mumsnet](https://www.mumsnet.com/talk/secondary/5496873-atom-for-11)
- [Reading grammar schools 11+ (11 plus) guide | Atom Learning](https://www.atomlearning.com/blog/berkshire-11-plus)
