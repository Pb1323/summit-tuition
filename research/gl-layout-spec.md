# GL Assessment paper layout spec (measured, not eyeballed)

Extracted directly from PDF geometry (`research/gl-papers/extract_layout.py`, using `pdfplumber`) across
real GL Assessment papers in `research/gl-papers/`: Maths, English, Verbal Reasoning, Non-Verbal
Reasoning. Page size and body font size are identical across all four subjects — GL uses one house style.

## Page

- **A4**: 210mm &times; 297mm (595.3pt &times; 841.9pt) — confirmed on every subject, every paper.

## Margins (content pages, not covers)

| | Left | Right | Top | Bottom |
|---|---|---|---|---|
| Text-heavy (English, Maths, VR) | 15-20mm | 20-23mm | 28-30mm | 13mm |
| Diagram-heavy (NVR grids) | 18mm | 17.6mm | 13.3mm | 13mm |

Takeaway: **~18-20mm side margins, ~13mm bottom margin** on everything. Top margin shrinks to ~13mm on
pages that are mostly a diagram grid (less room needed for a header), and opens up to ~28-30mm on pages
carrying a passage/instruction block above the questions. Use 20mm sides / 13mm bottom as the fixed
constants, and treat top margin as content-dependent (diagram page vs. text page).

## Typography

- **Body font**: 12pt, Frutiger family (Frutiger-Roman / Frutiger-Light for body, Frutiger-Bold for
  emphasis). English also uses **Caslon540BT-Roman** — a serif — specifically for reading-passage text,
  distinct from the sans-serif Frutiger used for instructions/questions everywhere else.
- **Small print / footnotes**: 8-9pt.
- **Section headings / cover titles**: 20-48pt (varies by role — page titles are much larger than section
  headers).
- **Line spacing**: ~14-16pt gap at 12pt body size (roughly 1.2-1.3&times; leading) — tighter than typical
  web body text, part of why GL papers feel dense/exam-like rather than airy.

## Applying this

- `@page { size: A4; margin: 13mm 20mm 13mm 20mm; }` as the print-stylesheet baseline for any future
  print/PDF export of a mock, per [[project_gl_layout_template]] memory.
- Body copy: 12pt sans-serif (Frutiger isn't licensed for the product — pair a similar humanist sans,
  e.g. Inter/Source Sans, at the same 12pt/~15pt line-height ratio) for questions/instructions; a serif
  at the same 12pt only for English reading passages, matching GL's own distinction.
- This is layout/typography metadata only — never reproduce GL's actual question text/images in the
  product (see `CLAUDE.md`).

## Caveats

- Measured from 4 of the 18 downloaded papers (one per subject family) — Maths/English/VR/NVR all
  converged on the same numbers, so it's unlikely other papers differ, but not exhaustively checked.
- `avg_line_gap_pt` is noisy on pages with mixed heading/body sizes (diagram captions, etc.) — treat it as
  indicative, not exact, especially for NVR pages.
