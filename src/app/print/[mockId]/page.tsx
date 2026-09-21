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
.pp-q.wide { margin-bottom: 10px; }
.pp-num { flex: none; width: 24px; height: 24px; border-radius: 999px; background: #172033; color: #fde68a; font: 700 9.5pt/24px Arial, sans-serif; text-align: center; }
.pp-body { flex: 1; min-width: 0; }
.pp-text { margin: 1px 0 5px; font-size: 10.5pt; }
.pp-marks { float: right; margin: 2px 0 0 8px; font: 700 8pt Arial, sans-serif; color: #b45309; }
.pp-opts { list-style: none; margin: 5px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 3px 10px; font-size: 10pt; }
.pp-opts.one { grid-template-columns: 1fr; }
.pp-opts li { display: flex; gap: 6px; align-items: baseline; }
.pp-opts .l { flex: none; width: 17px; height: 17px; border: 1.2px solid #172033; border-radius: 4px; font: 700 8pt/15px Arial, sans-serif; text-align: center; }
.pp-vis { margin: 4px 0 5px; max-width: 88mm; }
.pp-vis > div { box-shadow: none !important; border-radius: 8px !important; }
.pp-vis svg { max-width: 100%; height: auto; }
.pp-vis table { width: 100% !important; table-layout: fixed; }
.pp-vis th, .pp-vis td { padding: 5px 4px !important; font-size: 9pt !important; overflow-wrap: anywhere; }
.pp-vis th { white-space: nowrap; letter-spacing: 0 !important; font-size: 6.8pt !important; }
.pp-work { margin-top: 5px; min-height: 9mm; border: 1px dashed #d6c7a1; border-radius: 4px; padding: 2px 6px; font: 600 7.5pt Arial, sans-serif; color: #9a8a5f; }
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

.pp-sec { font: 700 11pt Arial, sans-serif; color: #fff; background: #26344f; padding: 6px 12px; border-radius: 4px; margin: 14px 0 10px; break-after: avoid; }
.pp-sec small { font-weight: 400; color: #fde68a; margin-left: 8px; font-size: 8.5pt; }
.pp-boxes { display: flex; align-items: center; gap: 3px; margin: 8px 0 2px; font: 700 11pt Arial, sans-serif; color: #172033; }
.pp-boxes .bx { width: 8mm; height: 9mm; border: 1.4px solid #172033; border-radius: 3px; background: #fff; text-align: center; }
.pp-boxes .sep { width: 3mm; text-align: center; }
.pp-boxes .un { margin-left: 4px; font-weight: 600; color: #26344f; }
.pp-hint { font: italic 8.5pt Arial, sans-serif; color: #6b7280; margin-top: 3px; }
.pp-qopts { list-style: none; margin: 5px 0 0; padding: 0; display: flex; flex-direction: column; gap: 3px; font-size: 10pt; }
.pp-qopts.row { flex-direction: row; flex-wrap: wrap; gap: 3px 22px; }
.pp-qopts li { display: flex; gap: 8px; align-items: baseline; }
.pp-qopts .l { flex: none; font: 700 9.5pt Arial, sans-serif; color: #172033; width: 12px; }
.pp-qrow { break-inside: avoid; display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid #d9d4c3; }
.pp-qrow .n { flex: none; width: 28px; font: 700 17pt/1 Arial, sans-serif; color: #172033; }
.pp-qrow .b { flex: 1; min-width: 0; }
.pp-end { text-align: center; font: 700 10pt Arial, sans-serif; margin: 18px 0 0; color: #172033; }
.pp-sheet { margin-top: 10px; }
.pp-sheet .grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.pp-sheet .cell { border: 1.2px solid #172033; border-radius: 3px; break-inside: avoid; }
.pp-sheet .cell .no { background: #172033; color: #fff; font: 700 8.5pt Arial, sans-serif; padding: 1px 5px; }
.pp-sheet .cell .r { display: flex; align-items: center; justify-content: space-between; padding: 2px 7px; font: 600 8.5pt Arial, sans-serif; }
.pp-sheet .oval { width: 11px; height: 7px; border: 1.1px solid #172033; border-radius: 6px; }
.pp-sheet .rect { width: 14px; height: 6px; border: 1.1px solid #172033; border-radius: 1px; }
.pp-sheet .wgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 22px; }
.pp-sheet .wrow { display: flex; align-items: center; gap: 6px; font: 700 9pt Arial, sans-serif; }
.pp-sheet .wrow .bx { width: 7mm; height: 8mm; border: 1.2px solid #172033; }
.pp-sheet .wrow .no { width: 28px; }
.pp-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 22px; margin: 10px 0 6px; font: 600 9pt Arial, sans-serif; }
.pp-detail span { border-bottom: 1px solid #172033; padding-bottom: 12px; }
.pp-disc { margin-top: 14px; font: 8pt Arial, sans-serif; color: #6b7280; }
`;

function Vis({ visual }: { visual: QuestionVisual }) {
  return (
    <div className="pp-vis">
      <VisualRenderer visual={visual} />
    </div>
  );
}

/** FSCE's Beacon paper takes short written answers (one digit per box), so numeric-answer items are printed as boxes instead of options. */
const BEACON_IDS = new Set(["fs7", "fs8", "fs10", "fs16", "fs18", "fs21", "fs24", "fs25", "fs30", "fs31", "fs37", "fs39"]);
const BEACON_HINTS: Record<string, string> = { fs39: "Answer using the 24-hour clock (HH:MM)." };

function splitAnswer(a: string) {
  const m = a.match(/^(£)?([\d:.,]+)\s*(.*)$/);
  return m ? { prefix: m[1] ?? "", digits: m[2], unit: m[3] } : { prefix: "", digits: a, unit: "" };
}

function AnswerBoxes({ answer }: { answer: string }) {
  const { prefix, digits, unit } = splitAnswer(answer);
  return (
    <div className="pp-boxes">
      {prefix ? <span>{prefix}</span> : null}
      {digits.split("").map((c, i) =>
        c === ":" || c === "." || c === "," ? (
          <span className="sep" key={i}>
            {c}
          </span>
        ) : (
          <span className="bx" key={i} />
        ),
      )}
      {unit ? <span className="un">{unit}</span> : null}
    </div>
  );
}

function FsceQuestion({ q, n, beacon }: { q: Question; n: number; beacon: boolean }) {
  const longOpts = (q.options ?? []).some((o) => o.length > 26);
  return (
    <div className="pp-q wide">
      <div className="pp-num">{n}</div>
      <div className="pp-body">
        <div className="pp-text">
          <span className="pp-marks">[{q.marks}]</span>
          {q.text}
        </div>
        {q.visual ? <Vis visual={q.visual} /> : null}
        {beacon ? (
          <>
            <AnswerBoxes answer={String(q.correctAnswer)} />
            <div className="pp-hint">{BEACON_HINTS[q.id] ?? "Write one digit in each box."}</div>
          </>
        ) : (
          <ol className={`pp-opts${longOpts ? " one" : ""}`}>
            {(q.options ?? []).map((o, i) => (
              <li key={i}>
                <span className="l">{String.fromCharCode(65 + i)}</span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
        )}
        <div className="pp-work">Working (no marks for working)</div>
      </div>
    </div>
  );
}

function QuestRow({ q, n }: { q: Question; n: number }) {
  const opts = q.options ?? [];
  const short = opts.every((o) => o.length <= 14);
  return (
    <div className="pp-qrow">
      <div className="n">{n}</div>
      <div className="b">
        <div style={{ font: "10.5pt/1.45 Arial, sans-serif" }}>{q.text}</div>
        <ol className={`pp-qopts${short ? " row" : ""}`}>
          {opts.map((o, i) => (
            <li key={i}>
              <span className="l">{String.fromCharCode(65 + i)}</span>
              <span>{o}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function CandidateBlock() {
  return (
    <div className="pp-detail">
      <span>Name:</span>
      <span>Date:</span>
      <span>School:</span>
      <span>Candidate number:</span>
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

function AnswerItem({ label, q, text }: { label: string; q: Question; text: string }) {
  return (
    <div className="pp-ans">
      <div>
        <span className="k">{label}</span> &nbsp;<b className="a">{text}</b> &nbsp;<span className="t">[{q.marks}]</span>
      </div>
      <div>{q.markScheme}</div>
    </div>
  );
}

const DISCLAIMER =
  "Original Summit Tuition sample paper, written from published descriptions of the exam format. It is not an official paper and Summit Tuition is not affiliated with the exam provider.";

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

  // Sources: each distinct visual once, sorted by its "Source X" title.
  const sources: QuestionVisual[] = [];
  for (const q of questions) {
    if (q.visual && !sources.some((s) => s.title === q.visual!.title)) sources.push(q.visual);
  }
  sources.sort((a, b) => a.title.localeCompare(b.title));
  const lastSource = String.fromCharCode(64 + 1 + sources.length);

  // FSCE splits into an Adventure-style multiple-choice section and a Beacon-style short-written section.
  const sec1 = isEnglish ? questions : questions.filter((q) => !BEACON_IDS.has(q.id));
  const sec2 = isEnglish ? [] : questions.filter((q) => BEACON_IDS.has(q.id));
  const shortTitle = mock.title;

  const meta: [string, string][] = [
    ["Time allowed", `${mock.durationMinutes} minutes`],
    ["Total marks", String(mock.totalMarks)],
    ["Questions", String(questions.length)],
    ...(isEnglish ? [] : ([["Calculator", "Not allowed"]] as [string, string][])),
  ];

  const sourcesBlock = (
    <>
      <TitleBlock
        kicker="Summit Tuition · Sample paper"
        title={`Source Booklet — ${mock.title.replace(/^QUEST-Style Sample Paper — /, "")}`}
        meta={[
          ["Contains", `Sources A to ${lastSource}`],
          ["Assessment duration", `${mock.durationMinutes} minutes`],
        ]}
      />
      <div className="pp-instr">
        Read all of the sources carefully before you begin. Several questions ask you to use more than one source. Answer the questions in the separate question paper and mark your answers on the answer sheet.
      </div>
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

  const questPaper = (
    <>
      <TitleBlock kicker="Summit Tuition · Sample paper" title={shortTitle} meta={meta} />
      <CandidateBlock />
      <div className="pp-instr">
        <b>Instructions</b>
        <ul>
          <li>You are about to do an assessment in English (Creative Comprehension).</li>
          <li>
            You have {mock.durationMinutes} minutes to answer {questions.length} questions.
          </li>
          <li>If you are stuck on a question, move on to the next one. If you have spare time at the end, go back to any questions you skipped.</li>
          <li>Use the separate Source Booklet (Sources A to {lastSource}) to answer the questions. Some questions need more than one source.</li>
          <li>
            Mark your answers on the answer sheet by drawing a line clearly through the rectangle with a pencil. Choose <b>one</b> answer for each question.
          </li>
          <li>Mistakes should be rubbed out. Do not cross out answers.</li>
        </ul>
      </div>
      <div className="pp-break" />
      <div>
        {questions.map((q, i) => (
          <QuestRow key={q.id} q={q} n={i + 1} />
        ))}
      </div>
      <div className="pp-end">END OF TEST</div>
      <div className="pp-break" />
      <div className="pp-sheet">
        <TitleBlock kicker="Summit Tuition · Sample paper" title="Answer Sheet — Creative Comprehension" meta={[["Candidate", "____________________"]]} />
        <div className="pp-instr">Draw a line clearly through the rectangle next to your answer. To change your answer, rub out the original marking. Do not cross out.</div>
        <div className="grid">
          {questions.map((q, i) => (
            <div className="cell" key={q.id}>
              <div className="no">{i + 1}</div>
              {(q.options ?? []).map((_, k) => (
                <div className="r" key={k}>
                  <span>{String.fromCharCode(65 + k)}</span>
                  <span className="rect" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pp-disc">{DISCLAIMER}</div>
      </div>
    </>
  );

  const fscePaper = (
    <>
      <TitleBlock kicker="Summit Tuition · Sample paper" title={shortTitle} meta={meta} />
      <CandidateBlock />
      <div className="pp-instr">
        <b>Instructions</b>
        <ul>
          <li>Answer on the separate answer sheet using a black pen. Only the answer sheet is marked, not this booklet.</li>
          <li>
            <b>Section 1 (Adventure-style, multiple choice):</b> shade one oval for each question. There is only one correct answer.
          </li>
          <li>
            <b>Section 2 (Beacon-style, short written answers):</b> write one digit in each box. Give your answer in the format the question asks for. You will get no marks if the format is wrong.
          </li>
          <li>There is space for working out, but you will not get marks for working.</li>
          <li>You will not lose marks for a wrong answer, so try every question. If you get stuck, move on and come back to it.</li>
          <li>Diagrams are not drawn to scale. You may not use a calculator.</li>
        </ul>
      </div>
      <div className="pp-sec">
        Section 1: Multiple Choice <small>Questions 1 to {sec1.length}</small>
      </div>
      {sec1.map((q, i) => (
        <FsceQuestion key={q.id} q={q} n={i + 1} beacon={false} />
      ))}
      <div className="pp-break" />
      <div className="pp-sec">
        Section 2: Short Written Answers <small>Questions 1 to {sec2.length}</small>
      </div>
      {sec2.map((q, i) => (
        <FsceQuestion key={q.id} q={q} n={i + 1} beacon />
      ))}
      <div className="pp-end">This was the last question. You can use any spare time to check your work.</div>
      <div className="pp-break" />
      <div className="pp-sheet">
        <TitleBlock kicker="Summit Tuition · Sample paper" title="Answer Sheet — Maths" meta={[["Use", "black pen"]]} />
        <CandidateBlock />
        <div className="pp-h2">Section 1: Multiple choice. Shade one oval per question.</div>
        <div className="grid">
          {sec1.map((_, i) => (
            <div className="cell" key={i}>
              <div className="no">{i + 1}</div>
              {["A", "B", "C", "D"].map((l) => (
                <div className="r" key={l}>
                  <span>{l}</span>
                  <span className="oval" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pp-h2">Section 2: Short written answers. One digit per box.</div>
        <div className="wgrid">
          {sec2.map((q, i) => {
            const { prefix, digits, unit } = splitAnswer(String(q.correctAnswer));
            return (
              <div className="wrow" key={q.id}>
                <span className="no">Q{i + 1}</span>
                {prefix}
                {digits.split("").map((c, k) => (c === ":" || c === "." || c === "," ? <span key={k}>{c}</span> : <span className="bx" key={k} />))}
                {unit}
              </div>
            );
          })}
        </div>
        <div className="pp-disc">{DISCLAIMER}</div>
      </div>
    </>
  );

  const paperBlock = isEnglish ? questPaper : fscePaper;

  const answersBlock = (
    <>
      <TitleBlock kicker="Summit Tuition · Sample paper" title={`Answers & Mark Scheme — ${shortTitle}`} meta={[["Total marks", String(mock.totalMarks)]]} />
      {isEnglish ? (
        <div style={{ marginTop: 12 }}>
          {questions.map((q, i) => (
            <AnswerItem key={q.id} label={`Q${i + 1}`} q={q} text={answerText(q)} />
          ))}
        </div>
      ) : (
        <>
          <div className="pp-sec">Section 1: Multiple Choice</div>
          {sec1.map((q, i) => (
            <AnswerItem key={q.id} label={`Q${i + 1}`} q={q} text={answerText(q)} />
          ))}
          <div className="pp-sec">Section 2: Short Written Answers</div>
          {sec2.map((q, i) => (
            <AnswerItem key={q.id} label={`Q${i + 1}`} q={q} text={String(q.correctAnswer)} />
          ))}
        </>
      )}
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
