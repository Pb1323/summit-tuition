/**
 * Shared mock-authoring verification script — replaces the throwaway `tsx`
 * script every mock-authoring session used to write from scratch. Runs the
 * standard checks documented in english-mock-authoring / maths-mock-authoring /
 * vr-mock-authoring: no duplicate mock/question ids bank-wide, every
 * correctAnswer resolves in its own options with no duplicate option values,
 * totalMarks sums correctly, visual-ratio + duplicate-visual-data (for any
 * subject that uses visuals), English section split (English mocks only),
 * and the full evaluateMockQuality() gate.
 *
 * Usage: npx tsx scripts/verify-mock.mts <mockId> [mockId2 ...]
 */
import { MOCKS, QUESTIONS, PASSAGES } from "../src/data/platform";
import { evaluateMockQuality } from "../src/lib/mock-quality";
import { getEnglishSectionId } from "../src/lib/english-sections";
import type { Question } from "../src/types/platform";

const mockIds = process.argv.slice(2);
if (mockIds.length === 0) {
  console.error("Usage: npx tsx scripts/verify-mock.mts <mockId> [mockId2 ...]");
  process.exit(1);
}

let allOk = true;

// Bank-wide duplicate checks run once, apply to every mock being checked.
const mockIdCounts = new Map<string, number>();
for (const m of MOCKS) mockIdCounts.set(m.id, (mockIdCounts.get(m.id) ?? 0) + 1);
const dupMockIds = [...mockIdCounts].filter(([, count]) => count > 1).map(([id]) => id);

const questionIdCounts = new Map<string, number>();
for (const q of QUESTIONS) questionIdCounts.set(q.id, (questionIdCounts.get(q.id) ?? 0) + 1);
const dupQuestionIds = [...questionIdCounts].filter(([, count]) => count > 1).map(([id]) => id);

if (dupMockIds.length) {
  allOk = false;
  console.log("FAIL: duplicate mock ids bank-wide:", dupMockIds.join(", "));
}
if (dupQuestionIds.length) {
  allOk = false;
  console.log("FAIL: duplicate question ids bank-wide:", dupQuestionIds.join(", "));
}

for (const mockId of mockIds) {
  console.log(`\n=== ${mockId} ===`);
  const mock = MOCKS.find((m) => m.id === mockId);
  if (!mock) {
    allOk = false;
    console.log(`FAIL: mock not found: ${mockId}`);
    continue;
  }

  const resolved: Question[] = [];
  const missing: string[] = [];
  for (const id of mock.questionIds) {
    const q = QUESTIONS.find((question) => question.id === id);
    if (q) resolved.push(q);
    else missing.push(id);
  }
  if (missing.length) {
    allOk = false;
    console.log("FAIL: missing question ids:", missing.join(", "));
  }

  for (const q of resolved) {
    const answers = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
    if (q.options) {
      for (const answer of answers) {
        if (!q.options.includes(answer)) {
          allOk = false;
          console.log(`FAIL: ${q.id} correctAnswer "${answer}" not in options`);
        }
      }
      const dupOptions = q.options.filter((o, i) => q.options!.indexOf(o) !== i);
      if (dupOptions.length) {
        allOk = false;
        console.log(`FAIL: ${q.id} duplicate option value(s): ${dupOptions.join(", ")}`);
      }
    }
  }

  const marksSum = resolved.reduce((sum, q) => sum + (q.marks ?? 0), 0);
  if (marksSum !== mock.totalMarks) {
    allOk = false;
    console.log(`FAIL: totalMarks ${mock.totalMarks} != sum of question marks ${marksSum}`);
  } else {
    console.log(`totalMarks OK: ${marksSum} (${resolved.length} questions)`);
  }

  const withVisual = resolved.filter((q) => q.visual);
  if (withVisual.length) {
    const visualRatio = ((withVisual.length / resolved.length) * 100).toFixed(0);
    const typeCounts: Record<string, number> = {};
    for (const q of withVisual) typeCounts[q.visual!.type] = (typeCounts[q.visual!.type] ?? 0) + 1;
    console.log(`visual ratio: ${withVisual.length}/${resolved.length} = ${visualRatio}% — distinct types: ${Object.keys(typeCounts).length}`, typeCounts);
    const seenVisual = new Map<string, string>();
    for (const q of withVisual) {
      const key = JSON.stringify(q.visual!.data);
      const prior = seenVisual.get(key);
      if (prior) {
        allOk = false;
        console.log(`FAIL: duplicate visual.data — ${q.id} matches ${prior}`);
      }
      seenVisual.set(key, q.id);
    }
  }

  if (mock.subject === "English") {
    const sectionCounts: Record<string, number> = {};
    for (const q of resolved) {
      const section = getEnglishSectionId(q) ?? "UNCLASSIFIED";
      sectionCounts[section] = (sectionCounts[section] ?? 0) + 1;
    }
    console.log("English section split:", sectionCounts);
    if (sectionCounts.UNCLASSIFIED) {
      allOk = false;
      console.log(`FAIL: ${sectionCounts.UNCLASSIFIED} question(s) don't classify into a section — check tags/questionType`);
    }
  }

  const quality = evaluateMockQuality(mock, QUESTIONS, PASSAGES);
  console.log("evaluateMockQuality status:", quality.status);
  if (quality.status !== "Ready") {
    allOk = false;
    console.log("  failing checks:", quality.warnings.join(", "));
  }
}

console.log(allOk ? "\nRESULT: PASS" : "\nRESULT: FAIL — see above");
process.exit(allOk ? 0 : 1);
