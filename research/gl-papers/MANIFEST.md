# GL Assessment official practice papers (downloaded reference set)

Source: https://passelevenplus.co.uk/11-plus-exam-papers/gl-assessment-practice-papers/ (fetched 2026-07-11).
Official GL Assessment practice papers, question papers (QP) and mark schemes (MS). Downloaded once
so future sessions can measure real layout (margins, fonts, spacing) without re-fetching or guessing.
These are reference-only per `CLAUDE.md` — never copy their question content into the product,
only structural/layout metrics (see `gl-layout-spec.md`, generated from these).

18 unique files (some mark schemes/parent guides cover multiple question papers, which is why the
source page lists ~23-24 links but resolves to 18 distinct PDFs):

| File | Covers | Type |
|---|---|---|
| `maths-qp1.pdf` | Maths Practice Paper 1 | Question paper |
| `maths-qp2.pdf` | Maths Practice Paper 2 | Question paper |
| `maths-ms-1-2.pdf` | Maths Practice Papers 1 & 2 | Mark scheme (shared) |
| `nvr-maths-qp1.pdf` | Non-Verbal Reasoning + Maths combined paper | Question paper |
| `nvr-maths-ms1.pdf` | Non-Verbal Reasoning + Maths combined paper | Mark scheme |
| `english-qp1.pdf` | English Practice Paper 1 | Question paper |
| `english-qp2.pdf` | English Practice Paper 2 | Question paper |
| `english-ms-1-2.pdf` | English Practice Papers 1 & 2 | Mark scheme (shared) |
| `verbal-skills-qp.pdf` | Verbal Skills (combined English & VR) | Question paper |
| `verbal-skills-ms.pdf` | Verbal Skills (combined English & VR) | Mark scheme |
| `vr-qp1.pdf` | Verbal Reasoning Paper 1 | Question paper |
| `vr-qp2.pdf` | Verbal Reasoning Paper 2 | Question paper |
| `vr-qp3.pdf` | Verbal Reasoning Paper 3 | Question paper |
| `vr-ms-parents-guide.pdf` | Verbal Reasoning Papers 1, 2 & 3 | Mark scheme / parent guide (shared) |
| `nvr-qp1.pdf` | Non-Verbal Reasoning Test Booklet 1 | Question paper |
| `nvr-qp2.pdf` | Non-Verbal Reasoning Test Booklet 2 | Question paper |
| `nvr-qp3.pdf` | Non-Verbal Reasoning Test Booklet 3 | Question paper |
| `nvr-ms-answers-guide.pdf` | Non-Verbal Reasoning Test Booklets 1, 2 & 3 | Mark scheme / parent guide (shared) |

All verified as valid PDFs at download time (non-empty, `%PDF` header present). Total size ~2MB.

## Next step

Extract exact layout metrics (page size, margins, font sizes/names, line spacing, column positions)
from these via `pdfplumber`/PyMuPDF — see `gl-layout-spec.md` (once generated) for the resulting
numbers, and the `question-visual-design` skill for how they feed into the print stylesheet.
