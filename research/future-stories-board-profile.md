# Future Stories / FSCE — board profile

Research task: verify Future Stories/FSCE is real, pin down its full name and which real exam(s) it feeds, and document its format for the Teachitright (Chris Pearse) re-engagement sample.

Same sourcing caveat as the QUEST profile: **all page-fetching (WebFetch, `curl`) was blocked by this environment's network egress policy** for every domain tried (including the official FSCE familiarisation-guide PDFs hosted on school websites). Everything below is drawn from WebSearch's synthesized snippets of those pages, not a first-hand read. The existence and locations of the official PDFs are confirmed (see §5); their literal content (actual sample question text) was not directly recoverable this session.

## 1. Full name and origin

**Future Stories Community Enterprise (FSCE) Ltd** — a not-for-profit trading company created in **2022**, linked to / effectively owned by **Reading School** (a boys' state grammar school in Reading, Berkshire). Explicitly positioned as an alternative to the older GL Assessment and CEM 11+ formats, with a stated design goal of being **less coachable** and more accessible to children without expensive tutoring — it assesses how well a child can *apply* KS2 knowledge rather than recall it, and deliberately **changes its exact format each year** to resist rote/paper-specific coaching.

## 2. Which real exams it feeds — schools using FSCE

**Reading School** (Berkshire) is the founding/flagship user and the one directly relevant to Chris Pearse's Reading-based centre. Its own bespoke FSCE test is the best-documented instance (see §4).

**Confirmed live now (testing from Sept 2027, i.e. for Sept 2027 entry)**, beyond Reading School:
- Chelmsford County High School for Girls (Essex)
- Queen Elizabeth Grammar School, Penrith (Cumbria)
- Heckmondwike Grammar School, The North Halifax Grammar School, The Crossley Heath School (West Yorkshire)
- Ermysted's Grammar School, Skipton Girls' High School (North Yorkshire)
- Lancaster Girls' Grammar School, Clitheroe Royal Grammar School (Lancashire)

**Announced future adopters (from Sept 2028 entry)**:
- All seven Gloucestershire grammar schools
- The five Trafford consortium schools (Altrincham Grammar School for Boys, Altrincham Grammar School for Girls, Sale Grammar, Stretford Grammar, Urmston Grammar) — switching from GL

**Correction to the task brief's premise**: the brief speculated FSCE might also serve **Kendrick School** (the other Reading grammar school, girls'). This is confirmed **false** — Kendrick's 11+ provider changed from CEM to **GL Assessment** in September 2023 and remains GL Assessment for the current cycle. Kendrick is not an FSCE school. The third Reading-area selective state school, Reading Girls' School, was not clearly confirmed either way (one source describes it historically running its own automatically-marked online assessment, separate from both GL and FSCE) — flagged as unresolved in STATUS, not chased further.

## 3. Exam structure — two formats exist; Reading School uses the newer 4-paper one

Sources describe **two possible FSCE formats**: an original **two-paper** format (Paper 1: Maths+English MCQ, 45 min; Paper 2: Maths+English constrained/free-response, 35 min) and a newer **four-paper** format that "most schools have now adopted." **Reading School's current bespoke test uses the four-paper format**, with each paper individually named:

| Paper | Name | Format | Subjects | Timing |
|---|---|---|---|---|
| 1 | **Adventure** | Multiple choice | Reading, Vocabulary, Grammar, **Maths** | 50 minutes, 50 questions |
| 2 | **Beacon** | Short written answers (every answer written down, working space provided) | Missing-letters English tasks, short English answers, **Maths calculations** | 45 minutes |
| 3 | **Compass** | Multiple choice, 3 short topic blocks | Foundation subjects: **Science, History, Geography, Computing, Design & Technology** | not separately confirmed |
| 4 | **Discovery** | Creative written response | Creative writing task | 5 minutes planning + 20 minutes writing |

- **No Verbal Reasoning or Non-Verbal Reasoning component at all** — confirmed by multiple independent sources as a deliberate, defining difference from GL/CEM-style 11+ exams.
- From **September 2025**, some schools' Compass-equivalent papers may draw even more broadly across KS2 subjects (Art & Design, Languages, Music, PE added to the list above) — Reading School's own paper may or may not have adopted the fuller list; not confirmed either way.
- The official FSCE Familiarisation Guide is described as covering **"all 4 test papers, 11 subjects, answer sheet tips, sample questions with answers & creative writing tasks."**
- Curriculum scope: most sources say **"built around the KS2 national curriculum up to the end of Year 5"** (i.e. nothing a child hasn't yet been taught in school by test time); one source instead describes **"the full range of Year 6 curriculum content."** These are in tension — flagged as an unresolved discrepancy in STATUS; the "up to end of Year 5" framing is the more consistently repeated one across sources and is the safer one to build to (avoids including content the real candidates wouldn't yet have covered).
- One parent (Mumsnet) reported the test felt **easier in difficulty** than other 11+ formats they'd seen, but with a **very high volume of questions** to get through in the time given — i.e. the challenge is pace/stamina/breadth, not depth per question. Consistent with the "less coachable, tests application not recall" design goal.

## 4. Maths content (Adventure + Beacon papers)

- Topics confirmed: number and place value (rounding, negative numbers, Roman numerals), the four operations, factors, prime/square/cube numbers, fractions/decimals/percentages, ratio, geometry, statistics, and problem-solving — i.e. standard broad KS2 coverage, not narrowed to a specific sub-topic.
- Format: MCQ within Adventure; short written/free-response with working space shown within Beacon ("space provided in your question booklet for working out").
- **Calculator policy: not found either way** in any source searched — flag as unconfirmed; UK 11+ maths papers are near-universally non-calculator by convention, so defaulting to non-calculator is the safe assumption, but it's an assumption, not a confirmed fact.
- No official sample maths question text was recoverable (blocked PDFs); topic list and paper mechanics are well-triangulated across independent sources plus the confirmed existence of an official familiarisation guide with real sample maths questions.

## 5. English content (Adventure + Beacon + Discovery papers)

- **Adventure**: Reading, Vocabulary and Grammar MCQ, alongside Maths, within the same 50-question/50-minute paper.
- **Beacon**: "missing letters" tasks (a word-completion/cloze-adjacent format) plus short written English answers.
- **Discovery**: a genuine creative writing task — 5 minutes planning, 20 minutes writing — marked holistically across **seven categories**, confirmed to include plot, characterisation, vocabulary/word choice, sentence structure, imagination/originality, spelling and punctuation (the full canonical list of exactly seven wasn't recoverable verbatim from any source — see STATUS gap). "All students with an eligible score from Papers 1 and 2 [Adventure/Beacon] will have their creative writing element assessed" — i.e. Discovery is a second-stage gate, only scored for candidates who clear a threshold on the MCQ/written papers first.
- Passage/text type for the comprehension component: fiction or non-fiction, short.
- Official familiarisation guide confirmed to include "word completion exercises and other language tasks" and real creative writing task prompts.

## 6. Marking and scoring

- MCQ (Adventure, part of Compass) answers are **scanned and machine-marked**.
- Free-response answers (Beacon, Discovery) are **marked by trained markers against a published mark scheme**.
- Raw marks convert to a **Standardised Age Score (SAS)**, adjusting for the child's exact age in months at test time — same SAS convention used by GL/CEM.
- **Exact timings and mark allocations for each paper are not fully publicly disclosed and may vary by school/year** — treat any specific number above as "typically reported," not a guaranteed constant; the format is stated to deliberately change year to year.

## Build implications (for the next session)

- Reading School's own 4-paper, named structure (Adventure/Beacon/Compass/Discovery) is FSCE's best-documented single instance and the one most relevant to Chris Pearse's actual Reading-area students — build against this specifically, not a generic "FSCE" abstraction.
- No VR/NVR content should appear at all — this is a defining, load-bearing difference from GL that a knowledgeable prospect like Chris would immediately notice if we got it wrong (the same class of mistake that got our GL-format content rejected).
- Since Compass (foundation subjects) and Discovery (creative writing) are out of scope for a Maths-or-English MCQ/short-answer sample mock, build the Maths sample from **Adventure + Beacon's maths content** (MCQ + written-working-shown calculations), and treat any English sample from this board as **Adventure + Beacon's English content** (comprehension/vocab/grammar MCQ + missing-letters/short-answer), not Discovery's creative writing (out of scope for an auto-markable "mock exam" on this platform anyway — see CLAUDE.md Known Limitations: "Creative writing / free-text essays cannot be auto-marked anywhere on the platform").
- Diagram/visual needs: standard KS2 maths visual set already built in `question-visuals.tsx`/Summit's Maths mock-authoring conventions (geometry shapes, bar charts, fraction bars, number lines, tables) — no genuinely new visual type is required for a Maths sample from this board, unlike QUEST's Creative Comprehension. If a future session also wants Compass-style foundation-subject content, that would need new science/geography-diagram visual types not yet built — out of scope for this round.

## Sources

- [Future Stories Community Enterprise (FSCE): What You Need to Know - Exam Papers Plus](https://exampapersplus.co.uk/advice/11-plus-year-6/future-stories-community-enterprise-fsce-what-you-need-to-know/)
- [FSCE 11+ Exam 2026: Format, Schools and How to Prepare | Atom Learning](https://www.atomlearning.com/blog/fsce-11-plus)
- [11+ Reading School FSCE-Style Practice Test 1 - Exam Papers Plus](https://exampapersplus.co.uk/browse/papers/eleven-plus/reading-school-fsce-style-11-plus-practice-test-1/)
- [11+ Reading School FSCE-Style Practice Test 2 - Exam Papers Plus](https://exampapersplus.co.uk/browse/papers/eleven-plus/reading-school-fsce-style-11-plus-practice-test-2/)
- [11+ Reading School Skills Practice Questions Pack 1 - Exam Papers Plus](https://exampapersplus.co.uk/browse/papers/eleven-plus/reading-school-11-plus-exam-skills-practice-multiple-choice-and-short-written-answer-questions-pack-1/)
- [11+ Reading School Skills Practice Questions Pack 2 - Exam Papers Plus](https://exampapersplus.co.uk/browse/papers/eleven-plus/reading-school-11-plus-exam-skills-practice-multiple-choice-and-short-written-answer-questions-pack-2/)
- [Reading School For Boys 11 Plus (11+) Exam, Year 7 Entry - 2026 - Exam Papers Plus](https://exampapersplus.co.uk/advice/11-plus-year-6/reading-school-boys-11-plus-11-exam-information/)
- [Reading School outsource 11-plus entrance test marking | ePC](https://www.epc.co.uk/media-centre/case-studies/reading-school)
- [A parent's guide to the Reading School FSCE entrance test | Teachitright](https://teachitright.com/a-parents-guide-to-the-reading-school-fsce-entrance-test/) — the prospect's own site
- [FSCE 11+: Which schools use it, format and how to prepare – Cognito](https://cognito.org/blog/fsce-11-plus-guide)
- [FSCE 11+ Exam 2026/27: Format, Schools & Practice Papers - Prep4All](https://prep4all.co.uk/fsce-11-plus-exam-guide)
- [Free FSCE-Style 11+ Practice Questions - Prep4All](https://prep4all.co.uk/11-plus-fsce-hub/practice-questions)
- [FSCE 11 Plus Exam: Subjects, Format, Marks | PiAcademy](https://piacademy.co.uk/blog/fsce-11-plus-exam-advice/)
- [FSCE Practice Papers | Gulliford Tutors](https://www.gullifordtutors.com/11-plus-fsce-practice-papers)
- [FSCE Entrance Exams - Pass the paper](https://www.passthepaper.co.uk/fsce-future-stories-community-enterprise-exam)
- [FSCE 11+ Exam Guide 2026: Schools, Format and How to Prepare - EdifyPod](https://edifypod.com/blog/fsce-11-plus-guide/)
- [FSCE 11+ Exam 2026: What It Is and How to Prepare | Leading Tuition](https://www.leadingtuition.co.uk/blog/fsce-11-exam-2026-what-it-is-and-how-to-prepare)
- [FSCE Familiarisation Guide (children) — Lancs/Skipton schools, hosted on ermysteds.uk](https://ermysteds.uk/wp-content/uploads/2025/12/FSCE-Familiarisation-Guide-Information-for-Children-LancsSkipt.pdf) (existence confirmed; content not fetched — see STATUS)
- [FSCE Familiarisation Guide (parents), hosted on reading-school.co.uk](https://www.reading-school.co.uk/attachments/download.asp?file=1049&type=pdf) (existence confirmed; content not fetched — see STATUS)
- [Reading School official download page](https://www.reading-school.co.uk/attachments/download.asp?file=1048&type=pdf) (existence confirmed; content not fetched)
- [Entrance Test for Schools Familiarisation Guide, hosted on heckgrammar.co.uk](https://www.heckgrammar.co.uk/wp-content/uploads/2024/05/FSCE-Familiarisation-Paper-for-website.pdf) (existence confirmed; content not fetched)
- [FSCE Familiarisation Guide (children), hosted on cchs.co.uk](https://www.cchs.co.uk/wp-content/uploads/2026/02/FSCE-Familiarisation-Guide-Information-for-Children.pdf) (existence confirmed; content not fetched)
- [FSCE Familiarisation Guide (parents), hosted on crgs.org.uk](https://crgs.org.uk/wp-content/uploads/2026/02/FSCE-Familiarisation-Guide-Information-for-Parents-LCSE.pdf) (existence confirmed; content not fetched)
- [FSCE 2026 11+ Familiarisation Guides – Parents and Children - Slager](https://slager.co.uk/blogs/grammar-school-11-updates-and-information/reading-school-has-released-two-familiarisation-guides-one-for-parents-and-one-for-children)
- [FSCE Familiarisation Guide 2026 — CCHS Year 7 Entrance Test for Children - ElevenAce](https://elevenace.com/fsce-familiarisation-guide-2026-cchs-year-7-entrance-test-for-children/)
- [Anyone with experience of FSCE for the Gloucestershire 11 plus? | Mumsnet](https://www.mumsnet.com/talk/secondary/5517612-anyone-with-experience-of-fsce-for-the-gloucestershire-11-plus)
- [Trafford Grammar Schools Consortium: 11 Plus Exam - Exam Papers Plus](https://exampapersplus.co.uk/advice/11-plus-year-6/trafford-grammar-schools-consortium-11-plus-11-exam-information/)
- [Trafford Grammar Schools Switch From GL to FSCE - Exam Happy](https://examhappy.co.uk/trafford-grammar-schools-switch-to-fsce/)
- [Gloucestershire Grammar Schools: 11 Plus Exam - Exam Papers Plus](https://exampapersplus.co.uk/advice/11-plus-year-6/gloucestershire-grammar-schools-11-plus-11-exam-information/)
- [Understanding the FSCE 11+ in Gloucestershire - Cheltenham Tutors](https://cheltenhamtutors.co.uk/new-fsce-11-assessment-in-gloucestershire/)
- [Berkshire Grammar Schools (Kendrick & Reading) 11+ Exam - Exam Papers Plus](https://exampapersplus.co.uk/advice/11-plus-year-6/berkshire-grammar-schools-11-plus-11-exam-information/)
- [Reading grammar schools 11+ (11 plus) guide | Atom Learning](https://www.atomlearning.com/blog/berkshire-11-plus)
- [Kendrick School 11 Plus (11+) Entrance Exam - Exam Papers Plus](https://exampapersplus.co.uk/advice/11-plus-year-6/kendrick-school-11-plus-11-exam-information/)
- [2026 11 Plus For Reading School | Marie Redmond Tuition](https://marieredmond.co.uk/schools/reading-school-11-plus-tuition/)
- [Kendrick & Reading School 11 Plus Exams | Marie Redmond Tuition](https://marieredmond.co.uk/information/kendrick-and-reading-school-11-plus-exam/)
- [11 Plus Grammar School Courses | Teachitright](https://teachitright.com/11-plus-courses/) — the prospect's own site, confirms Teachitright already teaches to "GL Assessment, CEM Select, and Future Stories entrance tests" for Reading School boys
