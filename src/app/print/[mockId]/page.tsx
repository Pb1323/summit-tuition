import { notFound } from "next/navigation";
import { MOCKS, PASSAGES, QUESTIONS } from "@/data/platform";
import { VisualRenderer } from "@/components/platform/question-visuals";
import type { Question, QuestionVisual } from "@/types/platform";

/**
 * Print-only layout used to export clean sample-paper PDFs (real text + vector diagrams, no screenshots).
 * Dev-only: it exposes full question sets and answers, so it 404s in production builds.
 * Parts: paper | answers | sources | combined (sources then questions, English only).
 */
export const dynamic = "force-dynamic";

type Part = "paper" | "answers" | "sources" | "combined";

const PRINT_CSS = `
@page { size: A4; margin: 14mm 12mm 16mm; }
html, body { background: #fff !important; }
div.pointer-events-none.fixed { display: none !important; }
main#main-content { display: block; }
.pp.gl-print { display: block; min-height: 0; padding: 0; gap: 0; background: #fff; }
.pp { font-family: Georgia, "Times New Roman", serif; color: #111827; font-size: 10.5pt; line-height: 1.42; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.pp * { box-sizing: border-box; }
.pp-title { background: #172033; color: #fff; padding: 16px 20px 14px; border-bottom: 4px solid #f59e0b; border-radius: 6px 6px 0 0; }
.pp-title .kicker { font: 700 8pt/1 Arial, sans-serif; letter-spacing: .18em; text-transform: uppercase; color: #fde68a; margin-bottom: 8px; }
.pp-title h1 { font: 700 19pt/1.2 Georgia, serif; margin: 0; }
.pp-meta { display: flex; flex-wrap: wrap; gap: 6px 22px; padding: 9px 20px; background: #fff8e7; border: 1px solid #f7e8bd; border-top: 0; font: 600 9pt Arial, sans-serif; color: #172033; }
.pp-meta b { color: #b45309; }
.pp-candidate { display: flex; gap: 24px; margin: 12px 0 4px; font: 600 9pt Arial, sans-serif; color: #172033; }
.pp-candidate span { flex: 1; border-bottom: 1px solid #172033; padding-bottom: 14px; }
.pp-instr { margin: 10px 0 14px; padding: 9px 14px; border-left: 4px solid #f59e0b; background: #fffdf7; font: 9.5pt/1.45 Arial, sans-serif; color: #26344f; }
.pp-instr ul { margin: 4px 0 0 16px; padding: 0; }
.pp-cols { column-count: 1; }
.pp-q { break-inside: avoid; page-break-inside: avoid; margin: 0 0 11px; display: flex; gap: 8px; }
.pp-q.wide { margin-bottom: 14px; }
.pp-num { flex: none; width: 24px; height: 24px; border-radius: 999px; background: #172033; color: #fde68a; font: 700 9.5pt/24px Arial, sans-serif; text-align: center; }
.pp-body { flex: 1; min-width: 0; }
.pp-text { margin: 1px 0 5px; font-size: 10.5pt; }
.pp-marks { float: right; margin: 2px 0 0 8px; font: 700 8pt Arial, sans-serif; color: #b45309; }
.pp-opts { list-style: none; margin: 5px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 3px 10px; font-size: 10pt; }
.pp-opts.one { grid-template-columns: 1fr; }
.pp-opts li { display: flex; gap: 6px; align-items: baseline; }
.pp-opts .l { flex: none; width: 17px; height: 17px; border: 1.2px solid #172033; border-radius: 4px; font: 700 8pt/15px Arial, sans-serif; text-align: center; }
.pp-vis { margin: 5px 0 6px; max-width: 105mm; }
.pp-vis > div { box-shadow: none !important; border-radius: 8px !important; }
.pp-vis svg { max-width: 100%; height: auto; }
.pp-vis table { width: 100% !important; table-layout: fixed; }
.pp-vis th, .pp-vis td { padding: 5px 4px !important; font-size: 9pt !important; overflow-wrap: anywhere; }
.pp-vis th { white-space: nowrap; letter-spacing: 0 !important; font-size: 6.8pt !important; }
.pp-work { margin-top: 6px; min-height: 13mm; border: 1px dashed #d6c7a1; border-radius: 4px; padding: 2px 6px; font: 600 7.5pt Arial, sans-serif; color: #9a8a5f; }
.pp-h2 { font: 700 12pt Arial, sans-serif; color: #172033; border-bottom: 2px solid #f59e0b; padding-bottom: 3px; margin: 16px 0 8px; break-after: avoid; }
.pp-src { break-inside: avoid; margin: 0 0 14px; }
.pp-src-label { font: 700 8.5pt Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #b45309; margin-bottom: 4px; }
.pp-article p { margin: 0 0 8px; padding-left: 26px; position: relative; text-align: justify; }
.pp-article p .pn { position: absolute; left: 0; top: 1px; font: 700 8pt Arial, sans-serif; color: #b45309; }
.pp-article h3 { font: 700 13pt Georgia, serif; margin: 2px 0 8px; color: #172033; }
.pp-break { break-before: page; page-break-before: always; }
.pp-ans { break-inside: avoid; margin: 0 0 9px; padding: 6px 9px; border: 1px solid #f7e8bd; border-left: 4px solid #f59e0b; border-radius: 4px; font: 9pt/1.4 Arial, sans-serif; }
.pp-ans b.a { color: #172033; }
.pp-ans .k { color: #b45309; font-weight: 700; }
.pp-ans .t { color: #6b7280; font-size: 8pt; }
`;

function Vis({ visual }: { visual: QuestionVisual }) {
  return (
    <div className="pp-vis">
      <VisualRenderer visual={visual} />
    </div>
  );
}

function QuestionBlock({ q, n, showVisual, work }: { q: Question; n: number; showVisual: boolean; work: boolean }) {
  const longOpts = (q.options ?? []).some((o) => o.length > 26);
  return (
    <div className="pp-q">
      <div className="pp-num">{n}</div>
      <div className="pp-body">
        <div className="pp-text">
          <span className="pp-marks">[{q.marks}]</span>
          {q.text}
        </div>
        {showVisual && q.visual ? <Vis visual={q.visual} /> : null}
        {q.options ? (
          <ol className={`pp-opts${longOpts ? " one" : ""}`}>
            {q.options.map((o, i) => (
              <li key={i}>
                <span className="l">{String.fromCharCode(65 + i)}</span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
        ) : null}
        {work ? <div className="pp-work">Working</div> : null}
      </div>
    </div>
  );
}

function TitleBlock({ kicker, title, meta }: { kicker: string; title: string; meta: [string, string][] }) {
  return (
    <>
      <div className="pp-title">
        <div className="kicker">{kicker}</div>
        <h1>{title}</h1>
      </div>
      <div className="pp-meta">
        {meta.map(([k, v]) => (
          <span key={k}>
            <b>{k}:</b> {v}
          </span>
        ))}
      </div>
    </>
  );
}

function answerText(q: Question) {
  const a = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(", ") : q.correctAnswer;
  const idx = q.options ? q.options.findIndex((o) => o === a) : -1;
  return idx >= 0 ? `${String.fromCharCode(65 + idx)}. ${a}` : a;
}

export default async function PrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ mockId: string }>;
  searchParams: Promise<{ part?: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { mockId } = await params;
  const { part: rawPart } = await searchParams;
  const part = (rawPart ?? "paper") as Part;
  const mock = MOCKS.find((m) => m.id === mockId);
  if (!mock) notFound();
  const questions = mock.questionIds.map((id) => QUESTIONS.find((q) => q.id === id)).filter((q): q is Question => Boolean(q));
  const isEnglish = mock.subject === "English";
  const passage = PASSAGES.find((p) => p.id === questions[0]?.passageId);

  // Sources B..E: each distinct visual once, in first-use order.
  const sources: QuestionVisual[] = [];
  for (const q of questions) {
    if (q.visual && !sources.some((s) => s.title === q.visual!.title)) sources.push(q.visual);
  }
  sources.sort((a, b) => a.title.localeCompare(b.title));

  const shortTitle = mock.title;
  const meta: [string, string][] = [
    ["Time allowed", `${mock.durationMinutes} minutes`],
    ["Total marks", String(mock.totalMarks)],
    ["Questions", String(questions.length)],
    ...(isEnglish ? [] : ([["Calculator", "Not allowed"]] as [string, string][])),
  ];

  const sourcesBlock = (
    <>
      <TitleBlock kicker="Summit Tuition · Sample paper" title={`Source Booklet — ${shortTitle.replace(/^QUEST-Style Sample Paper — /, "")}`} meta={[["Contains", `Sources A to ${String.fromCharCode(64 + 1 + sources.length)}`]]} />
      <div className="pp-instr">Read all of the sources carefully before you begin. Several questions ask you to use more than one source. Answer the questions in the separate question paper.</div>
      {passage ? (
        <div className="pp-src pp-article" style={{ breakInside: "auto" }}>
          <div className="pp-src-label">Source A: Newspaper report</div>
          <h3>{passage.title}</h3>
          {(passage.paragraphs ?? passage.text.split("\n\n")).map((p, i) => (
            <p key={i}>
              <span className="pn">{i + 1}</span>
              {p}
            </p>
          ))}
        </div>
      ) : null}
      {sources.map((s) => (
        <div className="pp-src" key={s.title}>
          <Vis visual={s} />
        </div>
      ))}
    </>
  );

  const paperBlock = (
    <>
      <TitleBlock kicker="Summit Tuition · Sample paper" title={shortTitle} meta={meta} />
      <div className="pp-candidate">
        <span>Name:</span>
        <span>Date:</span>
      </div>
      <div className="pp-instr">
        <b>Instructions</b>
        <ul>
          <li>Answer every question. Tick the box next to the answer you think is correct.</li>
          <li>The number in square brackets [ ] shows the marks for each question.</li>
          {isEnglish ? (
            <li>Use the separate Source Booklet (Sources A to {String.fromCharCode(64 + 1 + sources.length)}) to answer the questions.</li>
          ) : (
            <>
              <li>Show your working in the boxes provided. You may not use a calculator.</li>
              <li>Diagrams are not always drawn to scale.</li>
            </>
          )}
        </ul>
      </div>
      {isEnglish ? (
        <div>
          {questions.map((q, i) => (
            <QuestionBlock key={q.id} q={q} n={i + 1} showVisual={false} work={false} />
          ))}
        </div>
      ) : (
        <div className="pp-cols">
          {questions.map((q, i) => (
            <QuestionBlock key={q.id} q={q} n={i + 1} showVisual work={q.difficulty === "stretch"} />
          ))}
        </div>
      )}
    </>
  );

  const answersBlock = (
    <>
      <TitleBlock kicker="Summit Tuition · Sample paper" title={`Answers & Mark Scheme — ${shortTitle}`} meta={[["Total marks", String(mock.totalMarks)]]} />
      <div className={isEnglish ? "" : "pp-cols"} style={{ marginTop: 12 }}>
        {questions.map((q, i) => (
          <div className="pp-ans" key={q.id}>
            <div>
              <span className="k">Q{i + 1}</span> &nbsp;<b className="a">{answerText(q)}</b> &nbsp;<span className="t">[{q.marks}]</span>
            </div>
            <div>{q.markScheme}</div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="pp gl-print">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      {part === "paper" ? paperBlock : null}
      {part === "sources" ? sourcesBlock : null}
      {part === "answers" ? answersBlock : null}
      {part === "combined" ? (
        <>
          {sourcesBlock}
          <div className="pp-break" />
          {paperBlock}
        </>
      ) : null}
    </div>
  );
}
