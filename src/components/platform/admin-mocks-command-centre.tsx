"use client";

import { useMemo, useState } from "react";
import { Archive, BookOpenCheck, CheckCircle2, ClipboardList, Copy, Eye, FileSearch, FlaskConical, ListChecks, PencilLine } from "lucide-react";
import { usePlatform } from "@/context/platform-context";
import { evaluateMockQuality, qualityTone } from "@/lib/mock-quality";
import { AnimatedButton, GlowCard, PremiumBadge, QuestionRenderer, RevealOnScroll, StaggerReveal } from "@/components/platform/ui";
import { AdminMockWorkspace } from "@/components/platform/admin-mock-workspace";
import type { MockExam, Passage, Question } from "@/types/platform";

export function AdminMocksCommandCentre() {
  const { mocks, questions, passages, attempts, references, setMockPublished, cloneMock, archiveMock, addFeedback, releaseReport } = usePlatform();
  const [selectedVisualId, setSelectedVisualId] = useState("show-table");
  const [actionMessage, setActionMessage] = useState("");
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const quality = useMemo(() => new Map(mocks.map((mock) => [mock.id, evaluateMockQuality(mock, questions, passages)])), [mocks, passages, questions]);
  const archivedMocks = mocks.filter((mock) => mock.tier === "Archived");
  const visibleMocks = mocks.filter((mock) => mock.tier !== "Archived");
  const draftMocks = visibleMocks.filter((mock) => !mock.published);
  const publishedMocks = mocks.filter((mock) => mock.published);
  const generatedNeedsReview = mocks.filter((mock) => mock.generatedFromReferenceId && quality.get(mock.id)?.status !== "Ready");
  const pendingAttempts = attempts.filter((attempt) => attempt.status === "submitted");
  const reportsAwaitingRelease = pendingAttempts.length;
  const showcase = visualShowcaseQuestions(passages);
  const selectedVisual = showcase.find((item) => item.question.id === selectedVisualId) ?? showcase[0];

  return (
    <div className="space-y-10">
      <StaggerReveal className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
        <SummaryCard label="Draft mocks" value={draftMocks.length} icon={<PencilLine />} />
        <SummaryCard label="Published mocks" value={publishedMocks.length} icon={<BookOpenCheck />} />
        <SummaryCard label="Generated needs review" value={generatedNeedsReview.length} icon={<ListChecks />} />
        <SummaryCard label="Pending attempts" value={pendingAttempts.length} icon={<ClipboardList />} />
        <SummaryCard label="Reports awaiting release" value={reportsAwaitingRelease} icon={<FileSearch />} />
        <SummaryCard label="Question bank size" value={questions.length} icon={<FlaskConical />} />
      </StaggerReveal>

      <GlowCard className="p-5">
        <nav className="flex flex-wrap gap-2 text-sm font-bold" aria-label="Mock command centre sections">
          {[
            ["Overview", "#overview"],
            ["Drafts", "#drafts"],
            ["Published", "#published"],
            ["Generate Mock", "#generate"],
            ["Question Bank", "#question-bank"],
            ["Attempts", "#attempts"],
            ["References", "#references"],
            ["Quality Checks", "#quality"],
            ["Archive", "#archive"],
          ].map(([label, href]) => <a key={href} href={href} className="rounded-full border border-line bg-white px-4 py-2 text-navy hover:border-gold">{label}</a>)}
        </nav>
        {actionMessage && <p className="mt-3 rounded-xl bg-cream px-4 py-2 text-sm font-bold text-navy" role="status">{actionMessage}</p>}
      </GlowCard>

      <section id="overview" className="space-y-5 scroll-mt-28">
        <SectionTitle title="Mock Overview" text="Every mock shows publish readiness, attempts, and safe admin preview controls." />
        <div className="grid gap-5 xl:grid-cols-2">
          {visibleMocks.map((mock) => (
            <MockAdminCard
              key={mock.id}
              mock={mock}
              questions={questions}
              attempts={attempts}
              quality={quality.get(mock.id)!}
              onTogglePublish={() => setMockPublished(mock.id, !mock.published)}
              onClone={() => {
                const result = cloneMock(mock.id);
                setActionMessage(result.ok ? `Cloned "${mock.title}" as an unpublished draft.` : result.message);
              }}
              onArchive={() => {
                archiveMock(mock.id);
                setActionMessage(`Archived "${mock.title}" and unpublished it.`);
              }}
            />
          ))}
          {visibleMocks.length === 0 && <EmptyPanel title="No mocks yet" text="Generate your first GL-style mock to begin reviewing question quality." />}
        </div>
      </section>

      <section id="drafts" className="scroll-mt-28">
        <SectionTitle title="Drafts" text="Unpublished mocks stay admin-only until you review and publish them." />
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          {draftMocks.map((mock) => (
            <MockAdminCard
              key={mock.id}
              mock={mock}
              questions={questions}
              attempts={attempts}
              quality={quality.get(mock.id)!}
              onTogglePublish={() => setMockPublished(mock.id, true)}
              onClone={() => {
                const result = cloneMock(mock.id);
                setActionMessage(result.ok ? `Cloned "${mock.title}" as an unpublished draft.` : result.message);
              }}
              onArchive={() => {
                archiveMock(mock.id);
                setActionMessage(`Archived "${mock.title}" and unpublished it.`);
              }}
            />
          ))}
          {draftMocks.length === 0 && <EmptyPanel title="No draft mocks yet" text="Generate your first GL-style mock from the generator section." />}
        </div>
      </section>

      <section id="published" className="scroll-mt-28">
        <SectionTitle title="Published" text="Published mocks can be unlocked for approved students from the admin overview." />
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          {publishedMocks.map((mock) => (
            <MockAdminCard
              key={mock.id}
              mock={mock}
              questions={questions}
              attempts={attempts}
              quality={quality.get(mock.id)!}
              onTogglePublish={() => setMockPublished(mock.id, false)}
              onClone={() => {
                const result = cloneMock(mock.id);
                setActionMessage(result.ok ? `Cloned "${mock.title}" as an unpublished draft.` : result.message);
              }}
              onArchive={() => {
                archiveMock(mock.id);
                setActionMessage(`Archived "${mock.title}" and unpublished it.`);
              }}
            />
          ))}
          {publishedMocks.length === 0 && <EmptyPanel title="No published mocks" text="Reviewed mocks will appear here after publishing." />}
        </div>
      </section>

      <section id="generate" className="scroll-mt-28">
        <SectionTitle title="Generate Mock" text="Create original GL-style Maths or English drafts, then inspect and preview before publishing." />
        <div className="mt-5">
          <AdminMockWorkspace />
        </div>
      </section>

      <section id="question-bank" className="scroll-mt-28">
        <SectionTitle title="Question Visual Showcase" text="Use this panel to quickly inspect the new Maths visuals and English layouts." />
        <div className="mt-5 grid gap-6 xl:grid-cols-[0.38fr_0.62fr]">
          <GlowCard className="p-5">
            <div className="grid gap-2">
              {showcase.map((item) => (
                <button key={item.question.id} onClick={() => setSelectedVisualId(item.question.id)} className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${selectedVisualId === item.question.id ? "border-gold bg-gold/10 text-navy" : "border-line bg-white text-muted hover:border-gold"}`}>
                  <span className="block text-navy">{item.label}</span>
                  <span className="text-xs font-semibold text-muted">{item.question.subject} / {item.question.topic}</span>
                </button>
              ))}
            </div>
          </GlowCard>
          <GlowCard className="p-5">
            <QuestionRenderer question={selectedVisual.question} passage={selectedVisual.passage} questionNumber={1} value="" onChange={() => undefined} adminPreview />
          </GlowCard>
        </div>
      </section>

      <section id="attempts" className="scroll-mt-28">
        <SectionTitle title="Attempts" text="Submitted attempts awaiting marking and report release." />
        <div className="mt-5 grid gap-4">
          {attempts.filter((attempt) => attempt.status !== "in_progress").map((attempt) => {
            const mock = mocks.find((item) => item.id === attempt.mockId);
            return (
              <GlowCard key={attempt.id} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-black text-navy">{mock?.title ?? "Unknown mock"}</h3>
                    <p className="text-sm text-muted">Generic demo account / {attempt.score}/{attempt.maxScore} / {attempt.status.replaceAll("_", " ")}</p>
                  </div>
                  <PremiumBadge tone={attempt.status === "report_released" ? "green" : "navy"}>{attempt.status.replaceAll("_", " ")}</PremiumBadge>
                </div>
                {attempt.status === "submitted" && (
                  <div className="mt-4 space-y-3">
                    <textarea value={feedback[attempt.id] ?? attempt.adminFeedback} onChange={(event) => setFeedback((prev) => ({ ...prev, [attempt.id]: event.target.value }))} placeholder="Manual feedback notes" className="min-h-20 w-full rounded-xl border border-line p-3 text-sm outline-none focus:border-gold" />
                    <div className="flex gap-3">
                      <button onClick={() => addFeedback(attempt.id, feedback[attempt.id] ?? attempt.adminFeedback)} className="rounded-full border border-line px-3 py-1 text-sm font-bold text-navy">Save feedback</button>
                      <button onClick={() => releaseReport(attempt.id, feedback[attempt.id] ?? attempt.adminFeedback)} className="rounded-full bg-gold px-3 py-1 text-sm font-bold text-navy">Release report</button>
                    </div>
                  </div>
                )}
              </GlowCard>
            );
          })}
          {attempts.filter((attempt) => attempt.status !== "in_progress").length === 0 && <EmptyPanel title="No attempts submitted yet" text="Submitted mock attempts will appear here for marking." />}
        </div>
      </section>

      <section id="references" className="scroll-mt-28">
        <SectionTitle title="References" text="Reference profiles classify source style only; generated questions remain original." />
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {references.map((reference) => (
            <GlowCard key={reference.id} className="p-5">
              <PremiumBadge tone={reference.style === "GL-style" ? "gold" : "navy"}>{reference.style}</PremiumBadge>
              <h3 className="mt-3 font-black text-navy">{reference.title}</h3>
              <p className="mt-2 text-sm text-muted">{reference.subject} / analysed {reference.lastAnalysedAt}</p>
              <p className="mt-2 text-sm text-muted">{reference.notes}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <section id="quality" className="scroll-mt-28">
        <SectionTitle title="Quality Checks" text="Publish readiness checklist for every mock." />
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          {mocks.map((mock) => {
            const result = quality.get(mock.id)!;
            return (
              <GlowCard key={mock.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-navy">{mock.title}</h3>
                    <p className="text-sm text-muted">{mock.subject} / {mock.questionIds.length} questions</p>
                  </div>
                  <PremiumBadge tone={qualityTone(result.status)}>{result.status}</PremiumBadge>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {result.checks.map((check) => (
                    <div key={check.label} className="flex items-center gap-2 rounded-xl bg-cream p-3 text-sm font-semibold text-navy">
                      <CheckCircle2 className={`h-4 w-4 ${check.passed ? "text-emerald-600" : "text-red-600"}`} />
                      {check.label}
                    </div>
                  ))}
                </div>
              </GlowCard>
            );
          })}
        </div>
      </section>

      <section id="archive" className="scroll-mt-28">
        <SectionTitle title="Archive" text="Archived mocks are unpublished and kept for admin reference." />
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          {archivedMocks.map((mock) => (
            <MockAdminCard
              key={mock.id}
              mock={mock}
              questions={questions}
              attempts={attempts}
              quality={quality.get(mock.id)!}
              onTogglePublish={() => setMockPublished(mock.id, true)}
              onClone={() => {
                const result = cloneMock(mock.id);
                setActionMessage(result.ok ? `Cloned archived mock "${mock.title}" as a fresh draft.` : result.message);
              }}
              onArchive={() => setActionMessage(`"${mock.title}" is already archived.`)}
            />
          ))}
          {archivedMocks.length === 0 && <EmptyPanel title="No archived mocks" text="Archived mocks will appear here after admin moves them out of the active lists." />}
        </div>
      </section>
    </div>
  );
}

function MockAdminCard({ mock, questions, attempts, quality, onTogglePublish, onClone, onArchive }: { mock: MockExam; questions: Question[]; attempts: { mockId: string; status: string }[]; quality: ReturnType<typeof evaluateMockQuality>; onTogglePublish: () => void; onClone: () => void; onArchive: () => void }) {
  const mockQuestions = questions.filter((question) => mock.questionIds.includes(question.id));
  const mockAttempts = attempts.filter((attempt) => attempt.mockId === mock.id);
  const pendingReports = mockAttempts.filter((attempt) => attempt.status === "submitted").length;
  return (
    <GlowCard className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2">
            <PremiumBadge tone={mock.published ? "green" : "navy"}>{mock.published ? "Published" : "Draft"}</PremiumBadge>
            <PremiumBadge tone={mock.style === "GL-style" ? "gold" : "navy"}>{mock.style}</PremiumBadge>
            <PremiumBadge tone={qualityTone(quality.status)}>{quality.status}</PremiumBadge>
          </div>
          <h3 className="mt-3 text-2xl font-black text-navy">{mock.title}</h3>
          <p className="mt-2 text-sm text-muted">{mock.description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <MiniMetric label="Subject" value={mock.subject} />
        <MiniMetric label="Difficulty" value={mock.difficultyLabel ?? "Standard"} />
        <MiniMetric label="Questions" value={mockQuestions.length} />
        <MiniMetric label="Time" value={`${mock.durationMinutes} min`} />
        <MiniMetric label="Marks" value={mock.totalMarks} />
        <MiniMetric label="Attempts" value={mockAttempts.length} />
      </div>
      {quality.warnings.length > 0 && (
        <div className="mt-4 rounded-2xl border border-gold/25 bg-cream p-4 text-sm text-muted">
          <strong className="text-navy">Warnings:</strong> {quality.warnings.slice(0, 4).join(", ")}{quality.warnings.length > 4 ? "..." : ""}
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        <AnimatedButton href={`/admin/mocks/${mock.id}/preview`} className="h-10"><Eye className="h-4 w-4" /> Preview as Student</AnimatedButton>
        <a href="#generate" className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-bold text-navy hover:border-gold"><PencilLine className="h-4 w-4" /> Edit / Review Questions</a>
        <button onClick={onTogglePublish} className="h-10 rounded-full border border-line px-4 text-sm font-bold text-navy hover:border-gold">{mock.published ? "Unpublish" : "Publish"}</button>
        <a href="#attempts" className="h-10 rounded-full border border-line px-4 py-2 text-sm font-bold text-navy hover:border-gold">View Attempts ({pendingReports})</a>
        <button onClick={onClone} className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-bold text-navy hover:border-gold"><Copy className="h-4 w-4" /> Clone</button>
        <button onClick={onArchive} className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-bold text-navy hover:border-gold"><Archive className="h-4 w-4" /> Archive</button>
      </div>
    </GlowCard>
  );
}

function SummaryCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return <GlowCard className="p-5"><div className="text-gold-dark">{icon}</div><p className="mt-4 text-3xl font-black text-navy">{value}</p><p className="text-sm text-muted">{label}</p></GlowCard>;
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl bg-cream p-3"><p className="text-xs font-black uppercase tracking-[0.14em] text-muted">{label}</p><p className="mt-1 font-black text-navy">{value}</p></div>;
}

function SectionTitle({ title, text }: { title: string; text: string }) {
  return <RevealOnScroll><h2 className="text-2xl font-black text-navy">{title}</h2><p className="mt-2 max-w-3xl text-sm text-muted">{text}</p></RevealOnScroll>;
}

function EmptyPanel({ title, text }: { title: string; text: string }) {
  return <GlowCard className="p-6"><h3 className="text-xl font-black text-navy">{title}</h3><p className="mt-2 text-muted">{text}</p></GlowCard>;
}

function visualShowcaseQuestions(passages: Passage[]) {
  const passage = passages[0];
  const base = {
    subject: "Maths" as const,
    difficulty: "standard" as const,
    questionType: "table_graph" as const,
    correctAnswer: "4",
    markScheme: "Read the visual carefully and calculate the requested value.",
    explanation: "This preview checks the visual style rather than a live student answer.",
    marks: 1,
    tags: ["visual-showcase"],
    timeEstimateSeconds: 60,
    sourceStyle: "GL-style" as const,
    originalGenerated: true,
  };
  const items: { label: string; question: Question; passage?: Passage }[] = [
    { label: "Data table", question: { ...base, id: "show-table", topic: "Data handling", subtopic: "Tables", text: "Use the table to find the missing total.", visual: { type: "table", title: "Club points", data: { headers: ["Team", "A", "B", "C"], rows: [["Points", "12", "15", "?"]] } } } },
    { label: "Bar chart", question: { ...base, id: "show-bar", topic: "Data handling", subtopic: "Bar charts", text: "Which pupil read the most books?", options: ["Ari", "Leo", "Sofia", "Mina"], correctAnswer: "Sofia", visual: { type: "barChart", title: "Books read", data: { labels: ["Ari", "Leo", "Sofia", "Mina"], values: [7, 5, 9, 6] } } } },
    { label: "Line graph", question: { ...base, id: "show-line", topic: "Data handling", subtopic: "Line graphs", text: "How much did the plant grow from Week 2 to Week 4?", options: ["4 cm", "5 cm", "6 cm", "8 cm"], correctAnswer: "6 cm", visual: { type: "lineGraph", title: "Plant height", data: { labels: ["W1", "W2", "W3", "W4"], values: [5, 8, 11, 14] } } } },
    { label: "Coordinate grid", question: { ...base, id: "show-coordinate", topic: "Coordinates", subtopic: "Grid points", text: "What are the coordinates of point B?", options: ["(2, 5)", "(5, 2)", "(4, 3)", "(3, 4)"], correctAnswer: "(5, 2)", visual: { type: "coordinateGrid", title: "Coordinate grid", data: { points: [[2, 5], [5, 2], [4, 3]] } } } },
    { label: "Number line", question: { ...base, id: "show-number-line", topic: "Fractions", subtopic: "Number line", text: "What value is highlighted?", options: ["2.25", "2.5", "2.75", "3.5"], correctAnswer: "2.5", visual: { type: "numberLine", title: "Number line", data: { ticks: [0, 1, 2, 2.5, 3, 4], highlight: 2.5 } } } },
    { label: "Geometry diagram", question: { ...base, id: "show-geometry", topic: "Geometry", subtopic: "Perimeter", questionType: "geometry", text: "Find the perimeter of the compound shape.", correctAnswer: "34", visual: { type: "geometry", title: "Compound shape", data: { width: 10, height: 7, cutWidth: 4, cutHeight: 3 } } } },
    { label: "Fraction bar", question: { ...base, id: "show-fraction", topic: "Fractions", subtopic: "Shaded fractions", text: "What fraction is shaded?", correctAnswer: "3/8", visual: { type: "fraction", title: "Shaded fraction bar", data: { numerator: 3, denominator: 8 } } } },
    { label: "Ratio blocks", question: { ...base, id: "show-ratio", topic: "Ratio", subtopic: "Sharing", text: "Use the ratio blocks to compare the shares.", correctAnswer: "5", visual: { type: "ratioBlocks", title: "Prize share ratio", data: { labels: ["Ben", "Isla"], values: [2, 5] } } } },
    { label: "Venn diagram", question: { ...base, id: "show-venn", topic: "Data handling", subtopic: "Sets", text: "How many pupils are in both sets?", options: ["3", "4", "5", "7"], correctAnswer: "4", visual: { type: "venn", title: "Club membership", data: { leftLabel: "Chess", rightLabel: "Choir", left: 6, overlap: 4, right: 5 } } } },
    { label: "Analogue clock", question: { ...base, id: "show-clock", topic: "Time", subtopic: "Clock reading", text: "What time is shown on the clock?", options: ["8:00", "8:15", "9:00", "10:00"], correctAnswer: "8:00", visual: { type: "clock", title: "Clock face", data: { hour: 8, minute: 0 } } } },
  ];
  if (passage) {
    items.push(
      { label: "English passage card", passage, question: { ...base, id: "show-english-passage", subject: "English", topic: "Retrieval", subtopic: "Paragraph reference", questionType: "retrieval", passageId: passage.id, paragraphRefs: [2], text: "What does the telescope seem like in paragraph 2?", options: ["A sleeping giant", "A small toy", "A noisy machine", "A broken clock"], correctAnswer: "A sleeping giant" } },
      { label: "Vocabulary question", passage, question: { ...base, id: "show-vocab", subject: "English", topic: "Vocabulary", subtopic: "Meaning in context", questionType: "vocabulary", passageId: passage.id, paragraphRefs: [4], text: "Which word is closest in meaning to 'steady'?", options: ["still", "bright", "regular", "hidden"], correctAnswer: "regular" } },
      { label: "Cloze question", passage, question: { ...base, id: "show-cloze", subject: "English", topic: "Cloze", subtopic: "Context", questionType: "cloze", passageId: passage.id, paragraphRefs: [3], text: "Mara opened the notebook, sharpened her pencil, and waited ____.", options: ["patiently", "angrily", "carelessly", "noisily"], correctAnswer: "patiently" } },
      { label: "Grammar question", passage, question: { ...base, id: "show-grammar", subject: "English", topic: "Grammar", subtopic: "Punctuation", questionType: "grammar", passageId: passage.id, paragraphRefs: [3], text: "Which sentence is punctuated correctly?", options: ["Mara waited quietly.", "Mara, waited quietly.", "Mara waited, quietly.", "Mara waited quietly,"], correctAnswer: "Mara waited quietly." } }
    );
  }
  return items;
}
