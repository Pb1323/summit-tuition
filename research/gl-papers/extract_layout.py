"""One-off layout extraction from real GL Assessment PDFs.
Pulls page size, margins, font sizes/names, and line spacing directly from PDF geometry
(no manual measuring). Output feeds gl-layout-spec.md.
"""
import json
import pdfplumber

FILES = ["maths-qp1.pdf", "english-qp1.pdf", "vr-qp1.pdf", "nvr-qp1.pdf"]

PT_TO_MM = 25.4 / 72

def analyze(path, page_index=None):
    with pdfplumber.open(path) as pdf:
        candidates = pdf.pages[:6] if page_index is None else [pdf.pages[min(page_index, len(pdf.pages) - 1)]]
        page = max(candidates, key=lambda p: len(p.chars)) if page_index is None else candidates[0]
        chars = page.chars
        if len(chars) < 20:
            return {"file": path, "error": f"too little text on best of first 6 pages ({len(chars)} chars) - likely diagram-only"}
        left = min(c["x0"] for c in chars)
        right = page.width - max(c["x1"] for c in chars)
        top = min(c["top"] for c in chars)
        bottom = page.height - max(c["bottom"] for c in chars)
        sizes = sorted({round(c["size"], 1) for c in chars})
        fonts = sorted({c["fontname"] for c in chars})
        # line spacing: cluster by rounded 'top', then diff consecutive row baselines
        rows = sorted({round(c["top"]) for c in chars})
        gaps = [b - a for a, b in zip(rows, rows[1:]) if 2 < (b - a) < 40]
        avg_line_gap = round(sum(gaps) / len(gaps), 1) if gaps else None
        return {
            "file": path,
            "page_pt": [round(page.width, 1), round(page.height, 1)],
            "page_mm": [round(page.width * PT_TO_MM, 1), round(page.height * PT_TO_MM, 1)],
            "margins_pt": {"left": round(left, 1), "right": round(right, 1), "top": round(top, 1), "bottom": round(bottom, 1)},
            "margins_mm": {k: round(v * PT_TO_MM, 1) for k, v in {"left": left, "right": right, "top": top, "bottom": bottom}.items()},
            "font_sizes_pt": sizes,
            "fonts": fonts,
            "avg_line_gap_pt": avg_line_gap,
            "page_number_in_pdf": page.page_number,
        }

results = [analyze(f) for f in FILES]
print(json.dumps(results, indent=2))
