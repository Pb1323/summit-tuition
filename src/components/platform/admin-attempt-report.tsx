"use client";

import { usePlatform } from "@/context/platform-context";
import { analyseAttempt, isCorrect, recommendationsForTopics } from "@/lib/assessment";
import { PremiumBadge } from "@/components/platform/ui";
import type { Attempt, MockExam } from "@/types/platform";

// Admin-only auto-generated stats report: computed live from stored answers, never
// persisted separately, so it's always in sync with the attempt. Visible only here —
// releasing to the student/parent still goes through the existing release flow.
export function AdminAttemptReport({ attempt, mock }: { attempt: Attempt; mock: MockExam }) {
  const { users, questions: bank } = usePlatform();
  const student = users.find((user) => user.id === attempt.studentId);
  const questions = bank.filter((question) => mock.questionIds.includes(question.id));
  const wrong = questions.filter((question) => !isCorrect(question, attempt.answers[question.id]));
  const { topicBreakdown, weakTopics } = analyseAttempt(mock, attempt.answers, bank);
  const sortedTopics = [...topicBreakdown].sort((a, b) => b.maxScore - a.maxScore);
  const percentage = attempt.maxScore ? Math.round((attempt.score / attempt.maxScore) * 100) : 0;
  const recommendations = recommendationsForTopics(weakTopics.map((topic) => topic.topic));
  const spotlight = weakTopics.flatMap((topic) => {
    const topicQuestions = questions.filter((question) => question.topic === topic.topic);
    const subtopics = Array.from(new Set(topicQuestions.map((question) => question.subtopic)));
    return subtopics
      .map((subtopic) => {
        const inScope = topicQuestions.filter((question) => question.subtopic === subtopic);
        const wrongQs = inScope.filter((question) => !isCorrect(question, attempt.answers[question.id]));
        return { topic: topic.topic, subtopic, total: inScope.length, correct: inScope.length - wrongQs.length, wrongQs };
      })
      .filter((entry) => entry.wrongQs.length > 0);
  });
  const patternLabel = (pattern: string) =>
    pattern === "careless_error" ? "Careless error" : pattern === "timing_pressure" ? "Timing pressure" : "Concept gap";

  return (
    <div className="space-y-6 rounded-2xl border border-navy/15 bg-gradient-to-b from-navy/[0.04] to-white p-6 print:border-0 print:bg-white print:p-0 print:shadow-none">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-navy-dark to-navy px-6 py-5 print:rounded-none">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold-light">Summit Tuition &middot; Admin-only report</p>
          <h2 className="mt-1 text-2xl font-black text-white">{mock.title}</h2>
          <p className="text-sm text-white/70">{student?.name ?? "Unknown student"} &middot; {student?.email} &middot; {attempt.submittedAt?.slice(0, 10) ?? "recently"}</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-white/10 px-4 py-3 backdrop-blur-sm">
          <div className="text-3xl font-black text-gold-light">{percentage}%</div>
          <div className="text-sm text-white/80">{attempt.score}/{attempt.maxScore} marks</div>
        </div>
      </div>

      <section>
        <h3 className="text-sm font-black uppercase tracking-[0.12em] text-navy-dark border-b border-navy/15 pb-1.5">Marks by topic</h3>
        <div className="mt-3 space-y-2">
          {sortedTopics.map((topic) => {
            const pct = topic.maxScore ? Math.round((topic.score / topic.maxScore) * 100) : 0;
            return (
              <div key={topic.topic}>
                <div className="flex justify-between text-xs font-bold text-navy"><span>{topic.topic}</span><span>{topic.score}/{topic.maxScore} ({pct}%)</span></div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-navy/10">
                  <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {spotlight.length > 0 && (
        <section>
          <h3 className="text-sm font-black uppercase tracking-[0.12em] text-navy-dark border-b border-navy/15 pb-1.5">Skill spotlight</h3>
          <div className="mt-3 space-y-2">
            {spotlight.map((entry) => (
              <div key={`${entry.topic}-${entry.subtopic}`} className="rounded-xl border-l-4 border-navy bg-white p-3">
                <div className="flex justify-between text-sm font-bold text-navy">
                  <span>{entry.subtopic} <span className="font-semibold text-muted">({entry.topic})</span></span>
                  <span className="text-gold-dark">{entry.correct}/{entry.total} correct</span>
                </div>
                <p className="text-xs text-muted">Missed: {entry.wrongQs.map((q) => `Q${questions.findIndex((item) => item.id === q.id) + 1}`).join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-sm font-black uppercase tracking-[0.12em] text-navy-dark border-b border-navy/15 pb-1.5">Where marks were lost</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {weakTopics.length === 0 && <p className="text-sm text-muted">No significant weak topics.</p>}
          {weakTopics.map((topic) => (
            <PremiumBadge key={topic.topic} tone="navy">{topic.topic} &middot; -{topic.missedMarks} &middot; {patternLabel(topic.pattern)}</PremiumBadge>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-black uppercase tracking-[0.12em] text-navy-dark border-b border-navy/15 pb-1.5">Recommended next steps</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          {recommendations.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-sm font-black uppercase tracking-[0.12em] text-navy-dark border-b border-navy/15 pb-1.5">Every question missed ({wrong.length})</h3>
        <div className="mt-3 space-y-3">
          {wrong.map((question) => (
            <div key={question.id} className="break-inside-avoid rounded-xl border border-gold/25 bg-white p-3">
              <p className="text-xs font-bold text-gold-dark">Q{questions.findIndex((item) => item.id === question.id) + 1} &middot; {question.topic} &middot; {question.subtopic}</p>
              <p className="mt-1 text-sm text-navy">{question.text}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg bg-red-50 p-2 text-xs"><span className="font-bold text-red-700">Their answer: </span>{attempt.answers[question.id] || "No answer"}</div>
                <div className="rounded-lg bg-emerald-50 p-2 text-xs"><span className="font-bold text-emerald-700">Correct: </span>{Array.isArray(question.correctAnswer) ? question.correctAnswer.join(", ") : question.correctAnswer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="hidden text-xs text-muted print:block">Auto-generated by Summit Tuition, admin review copy only — not released to the student.</p>
    </div>
  );
}
