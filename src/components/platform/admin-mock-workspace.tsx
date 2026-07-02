"use client";

import { useMemo, useState } from "react";
import { Eye, FilePlus2, PencilLine, Sparkles } from "lucide-react";
import { usePlatform } from "@/context/platform-context";
import { AnimatedButton, GlowCard, PremiumBadge, QuestionRenderer } from "@/components/platform/ui";
import type { MockDifficulty, Question, Subject } from "@/types/platform";

export function AdminMockWorkspace() {
  const {
    mocks,
    questions,
    references,
    generateMockDraft,
    setMockPublished,
    setReferenceStyle,
    updateMockDraft,
    upsertQuestion,
  } = usePlatform();
  const glReferences = references.filter((reference) => reference.style === "GL-style" && (reference.subject === "Maths" || reference.subject === "English"));
  const [referenceId, setReferenceId] = useState(glReferences[0]?.id ?? "");
  const [subject, setSubject] = useState<Extract<Subject, "Maths" | "English">>("Maths");
  const [difficultyLabel, setDifficultyLabel] = useState<MockDifficulty>("Summit Stretch");
  const [questionCount, setQuestionCount] = useState(5);
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [title, setTitle] = useState("");
  const [selectedMockId, setSelectedMockId] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [message, setMessage] = useState("");

  const draftMocks = mocks.filter((mock) => mock.tier === "Admin draft" || mock.generatedFromReferenceId);
  const selectedMock = mocks.find((mock) => mock.id === selectedMockId) ?? draftMocks[0] ?? mocks[0];
  const selectedQuestions = useMemo(
    () => questions.filter((question) => selectedMock?.questionIds.includes(question.id)),
    [questions, selectedMock]
  );
  const selectedQuestion = questions.find((question) => question.id === selectedQuestionId) ?? selectedQuestions[0];

  function handleGenerate() {
    const result = generateMockDraft({
      referenceId,
      subject,
      difficultyLabel,
      questionCount,
      durationMinutes,
      title: title || undefined,
    });
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    setSelectedMockId(result.mockId);
    setMessage("Draft generated. Review questions before publishing.");
  }

  function patchQuestion(patch: Partial<Question>) {
    if (!selectedQuestion) return;
    upsertQuestion({ ...selectedQuestion, ...patch });
  }

  return (
    <div className="space-y-6">
      <GlowCard className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <PremiumBadge><Sparkles className="mr-1 h-3.5 w-3.5" /> GL-style generator</PremiumBadge>
            <h2 className="mt-3 text-2xl font-black text-navy">Generate original mock draft</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">Uses GL-style reference profiles as structure metadata only. Questions, passages, visuals, answers and explanations are original deterministic placeholders ready for a future AI generation service.</p>
          </div>
          {message && <p className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-bold text-navy" role="status">{message}</p>}
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-6">
          <label className="lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">GL reference</span>
            <select value={referenceId} onChange={(event) => setReferenceId(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-gold">
              {glReferences.map((reference) => <option key={reference.id} value={reference.id}>{reference.title}</option>)}
            </select>
          </label>
          <label>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Subject</span>
            <select value={subject} onChange={(event) => setSubject(event.target.value as Extract<Subject, "Maths" | "English">)} className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-gold">
              <option>Maths</option>
              <option>English</option>
            </select>
          </label>
          <label>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Difficulty</span>
            <select value={difficultyLabel} onChange={(event) => setDifficultyLabel(event.target.value as MockDifficulty)} className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-gold">
              <option>Summit Stretch</option>
              <option>Standard</option>
            </select>
          </label>
          <label>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Questions</span>
            <input type="number" min={3} max={40} value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value))} className="mt-1 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-gold" />
          </label>
          <label>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Minutes</span>
            <input type="number" min={10} max={60} value={durationMinutes} onChange={(event) => setDurationMinutes(Number(event.target.value))} className="mt-1 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-gold" />
          </label>
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Optional draft title" className="h-11 rounded-xl border border-line px-3 text-sm outline-none focus:border-gold" />
          <AnimatedButton onClick={handleGenerate}>Generate draft</AnimatedButton>
        </div>
      </GlowCard>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <GlowCard className="p-6">
          <div className="flex items-center gap-3">
            <FilePlus2 className="h-5 w-5 text-gold-dark" />
            <h3 className="text-xl font-black text-navy">Reference profiles</h3>
          </div>
          <div className="mt-4 space-y-3">
            {references.map((reference) => (
              <div key={reference.id} className="rounded-2xl border border-line bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-navy">{reference.title}</h4>
                    <p className="mt-1 text-xs text-muted">{reference.subject} / analysed {reference.lastAnalysedAt}</p>
                  </div>
                  <select value={reference.style} onChange={(event) => setReferenceStyle(reference.id, event.target.value as "GL-style" | "non-GL" | "unknown")} className="h-9 rounded-full border border-line bg-cream px-3 text-xs font-bold text-navy">
                    <option>GL-style</option>
                    <option>non-GL</option>
                    <option>unknown</option>
                  </select>
                </div>
                <p className="mt-2 text-sm text-muted">{reference.notes}</p>
                {reference.topicStyleProfile && (
                  <div className="mt-3 rounded-xl bg-cream p-3 text-xs text-muted">
                    <p><strong className="text-navy">Format:</strong> {reference.topicStyleProfile.formatNotes}</p>
                    <p><strong className="text-navy">Timing:</strong> {reference.topicStyleProfile.timingNotes}</p>
                    <p><strong className="text-navy">Difficulty:</strong> {reference.topicStyleProfile.difficultyNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlowCard>

        <GlowCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <PencilLine className="h-5 w-5 text-gold-dark" />
              <h3 className="text-xl font-black text-navy">Draft review and question editor</h3>
            </div>
            {selectedMock && <AnimatedButton href={`/admin/mocks/${selectedMock.id}/preview`} className="h-10"><Eye className="h-4 w-4" /> Preview as student</AnimatedButton>}
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]">
            <select value={selectedMock?.id ?? ""} onChange={(event) => setSelectedMockId(event.target.value)} className="h-11 rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-gold">
              {mocks.map((mock) => <option key={mock.id} value={mock.id}>{mock.title}</option>)}
            </select>
            {selectedMock && <button onClick={() => setMockPublished(selectedMock.id, !selectedMock.published)} className="rounded-full border border-line px-4 py-2 text-sm font-bold text-navy">{selectedMock.published ? "Unpublish" : "Publish"}</button>}
          </div>
          {selectedMock && (
            <div className="mt-4 rounded-2xl bg-cream p-4">
              <div className="grid gap-3 text-sm sm:grid-cols-4">
                <Stat label="Subject" value={selectedMock.subject} />
                <Stat label="Difficulty" value={selectedMock.difficultyLabel ?? "Standard"} />
                <Stat label="Time" value={`${selectedMock.durationMinutes} min`} />
                <Stat label="Marks" value={selectedMock.totalMarks} />
              </div>
              <textarea value={selectedMock.description} onChange={(event) => updateMockDraft(selectedMock.id, { description: event.target.value })} className="mt-4 min-h-20 w-full rounded-xl border border-line bg-white p-3 text-sm outline-none focus:border-gold" />
            </div>
          )}
          <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-3">
              <select value={selectedQuestion?.id ?? ""} onChange={(event) => setSelectedQuestionId(event.target.value)} className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-gold">
                {selectedQuestions.map((question, index) => <option key={question.id} value={question.id}>Q{index + 1}: {question.topic}</option>)}
              </select>
              {selectedQuestion && (
                <div className="space-y-3">
                  <input value={selectedQuestion.text} onChange={(event) => patchQuestion({ text: event.target.value })} className="h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-gold" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input value={selectedQuestion.topic} onChange={(event) => patchQuestion({ topic: event.target.value })} className="h-11 rounded-xl border border-line px-3 text-sm outline-none focus:border-gold" />
                    <input value={selectedQuestion.subtopic} onChange={(event) => patchQuestion({ subtopic: event.target.value })} className="h-11 rounded-xl border border-line px-3 text-sm outline-none focus:border-gold" />
                  </div>
                  <input value={String(selectedQuestion.correctAnswer)} onChange={(event) => patchQuestion({ correctAnswer: event.target.value })} className="h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-gold" />
                  <textarea value={selectedQuestion.markScheme} onChange={(event) => patchQuestion({ markScheme: event.target.value })} className="min-h-20 w-full rounded-xl border border-line p-3 text-sm outline-none focus:border-gold" />
                  <textarea value={selectedQuestion.explanation} onChange={(event) => patchQuestion({ explanation: event.target.value })} className="min-h-20 w-full rounded-xl border border-line p-3 text-sm outline-none focus:border-gold" />
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-line bg-cream p-4">
              {selectedQuestion ? <QuestionRenderer question={selectedQuestion} value="" onChange={() => undefined} review /> : <p className="text-sm text-muted">Generate or select a question to preview it.</p>}
            </div>
          </div>
        </GlowCard>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</p><p className="mt-1 font-black text-navy">{value}</p></div>;
}
