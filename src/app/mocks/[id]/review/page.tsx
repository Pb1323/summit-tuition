"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { isCorrect, topicBreakdown, recommendationsForTopics } from "@/lib/assessment";
import { usePlatform } from "@/context/platform-context";
import { Container } from "@/components/ui/container";
import { GlowCard, PremiumBadge, ProgressBar, QuestionRenderer, ReportPreview, RequireAuth, WeakTopicBreakdown } from "@/components/platform/ui";

export default function MockReviewPage() {
  const params = useParams<{ id: string }>();
  const { currentUser, mocks, attempts, questions: questionBank, passages } = usePlatform();
  const mock = mocks.find((item) => item.id === params.id);
  const attempt = attempts.find((item) => item.studentId === currentUser?.id && item.mockId === params.id && item.status === "report_released");
  const questions = useMemo(() => questionBank.filter((question) => mock?.questionIds.includes(question.id)), [mock, questionBank]);
  const [filterMode, setFilterMode] = useState<"all" | "wrong" | "flagged">("all");
  const [topicFilter, setTopicFilter] = useState("All topics");
  const incorrectQuestions = useMemo(() => questions.filter((question) => {
    if (!attempt) return false;
    return !isCorrect(question, attempt.answers[question.id]);
  }), [attempt, questions]);
  const flaggedIds = useMemo(() => new Set(attempt?.flaggedQuestionIds ?? []), [attempt]);
  const topics = useMemo(() => Array.from(new Set(questions.map((question) => question.topic))).sort(), [questions]);
  const visibleQuestions = useMemo(() => {
    return questions.filter((question) => {
      const modeMatch =
        filterMode === "all" ||
        (filterMode === "wrong" && incorrectQuestions.some((item) => item.id === question.id)) ||
        (filterMode === "flagged" && flaggedIds.has(question.id));
      const topicMatch = topicFilter === "All topics" || question.topic === topicFilter;
      return modeMatch && topicMatch;
    });
  }, [filterMode, flaggedIds, incorrectQuestions, questions, topicFilter]);

  return (
    <RequireAuth role="student">
      <Container className="py-10">
        {!mock || !attempt ? (
          <GlowCard className="p-8">
            <PremiumBadge tone="navy">Review locked</PremiumBadge>
            <h1 className="mt-4 text-3xl font-black text-navy">Report not released yet</h1>
            <p className="mt-2 text-muted">Your mock has been submitted. Your result and review will be released after marking.</p>
            <Link href="/dashboard" className="mt-6 inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-bold text-navy">Back to dashboard</Link>
          </GlowCard>
        ) : (
          <div className="space-y-8">
            <ReportPreview attempt={attempt} mock={mock} />
            <section className="grid gap-4 md:grid-cols-3">
              <GlowCard className="p-5">
                <p className="text-sm font-bold text-muted">Review focus</p>
                <p className="mt-2 text-3xl font-black text-navy">{incorrectQuestions.length}</p>
                <p className="text-sm text-muted">questions to revisit carefully</p>
              </GlowCard>
              <GlowCard className="p-5">
                <p className="text-sm font-bold text-muted">Marked score</p>
                <p className="mt-2 text-3xl font-black text-navy">{attempt.score}/{attempt.maxScore}</p>
                <p className="text-sm text-muted">released by admin</p>
              </GlowCard>
              <GlowCard className="p-5">
                <p className="text-sm font-bold text-muted">Next practice</p>
                <p className="mt-2 text-lg font-black text-navy">{attempt.weakTopics[0] ?? "Maintain accuracy"}</p>
                <p className="text-sm text-muted">highest priority topic</p>
              </GlowCard>
            </section>
            <div className="grid gap-6 lg:grid-cols-2">
              <GlowCard className="p-6">
                <h2 className="text-xl font-black text-navy">Topic breakdown</h2>
                <div className="mt-4 space-y-4">
                  {topicBreakdown(mock, attempt, questionBank).map((topic) => <ProgressBar key={topic.topic} value={topic.maxScore ? (topic.score / topic.maxScore) * 100 : 0} label={`${topic.topic}: ${topic.score}/${topic.maxScore}`} />)}
                </div>
              </GlowCard>
              <GlowCard className="p-6">
                <h2 className="text-xl font-black text-navy">Weak topics and next steps</h2>
                <div className="mt-4"><WeakTopicBreakdown topics={attempt.weakTopics} /></div>
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {recommendationsForTopics(attempt.weakTopics).map((item) => <li key={item} className="rounded-xl bg-cream p-3">{item}</li>)}
                </ul>
              </GlowCard>
            </div>
            <GlowCard className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-navy">Full question review</h2>
                  <p className="mt-1 text-sm text-muted">Use the filters to work through a full 50-question paper without losing your place.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setFilterMode("all")} className={`rounded-full px-4 py-2 text-sm font-bold ${filterMode === "all" ? "bg-gold text-white shadow-gold" : "border border-line bg-white text-navy"}`}>All questions</button>
                  <button type="button" onClick={() => setFilterMode("wrong")} className={`rounded-full px-4 py-2 text-sm font-bold ${filterMode === "wrong" ? "bg-gold text-white shadow-gold" : "border border-line bg-white text-navy"}`}>Wrong only</button>
                  <button type="button" onClick={() => setFilterMode("flagged")} className={`rounded-full px-4 py-2 text-sm font-bold ${filterMode === "flagged" ? "bg-gold text-white shadow-gold" : "border border-line bg-white text-navy"}`}>Flagged in exam ({flaggedIds.size})</button>
                  <select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)} className="h-10 rounded-full border border-line bg-white px-3 text-sm font-bold text-navy outline-none focus:border-gold">
                    <option>All topics</option>
                    {topics.map((topic) => <option key={topic}>{topic}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 rounded-2xl bg-cream p-3">
                {questions.map((question, index) => {
                  const wrong = incorrectQuestions.some((item) => item.id === question.id);
                  return (
                    <a key={question.id} href={`#review-q-${index + 1}`} className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black ${wrong ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`} aria-label={`Jump to question ${index + 1}`}>
                      {index + 1}
                    </a>
                  );
                })}
              </div>
              <p className="mt-4 text-sm font-bold text-muted">{visibleQuestions.length} of {questions.length} questions shown</p>
              <div className="mt-6 space-y-8">
                {visibleQuestions.map((question) => {
                  const index = questions.findIndex((item) => item.id === question.id);
                  return (
                  <div key={question.id} id={`review-q-${index + 1}`} className="scroll-mt-24 border-t border-line pt-6 first:border-t-0 first:pt-0">
                    <PremiumBadge>Question {index + 1}</PremiumBadge>
                    {incorrectQuestions.some((item) => item.id === question.id) ? <PremiumBadge tone="red">Needs review</PremiumBadge> : <PremiumBadge tone="green">Correct</PremiumBadge>}
                    {flaggedIds.has(question.id) && <PremiumBadge tone="navy">You flagged this in the exam</PremiumBadge>}
                    <div className="mt-4">
                      <QuestionRenderer question={question} passage={question.passageId ? passages.find((passage) => passage.id === question.passageId) : undefined} questionNumber={index + 1} value={attempt.answers[question.id]} onChange={() => undefined} review />
                    </div>
                  </div>
                  );
                })}
              </div>
            </GlowCard>
          </div>
        )}
      </Container>
    </RequireAuth>
  );
}
