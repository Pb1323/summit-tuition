"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { QUESTIONS } from "@/data/platform";
import { topicBreakdown, recommendationsForTopics } from "@/lib/assessment";
import { usePlatform } from "@/context/platform-context";
import { Container } from "@/components/ui/container";
import { GlowCard, PremiumBadge, ProgressBar, QuestionRenderer, ReportPreview, RequireAuth, WeakTopicBreakdown } from "@/components/platform/ui";

export default function MockReviewPage() {
  const params = useParams<{ id: string }>();
  const { currentUser, mocks, attempts } = usePlatform();
  const mock = mocks.find((item) => item.id === params.id);
  const attempt = attempts.find((item) => item.studentId === currentUser?.id && item.mockId === params.id && item.status === "report_released");
  const questions = useMemo(() => QUESTIONS.filter((question) => mock?.questionIds.includes(question.id)), [mock]);

  return (
    <RequireAuth role="student">
      <Container className="py-10">
        {!mock || !attempt ? (
          <GlowCard className="p-8">
            <PremiumBadge tone="navy">Review locked</PremiumBadge>
            <h1 className="mt-4 text-3xl font-black text-navy">Report not released yet</h1>
            <p className="mt-2 text-muted">Your mock has been submitted. Your result and review will be released after marking.</p>
          </GlowCard>
        ) : (
          <div className="space-y-8">
            <ReportPreview attempt={attempt} mock={mock} />
            <div className="grid gap-6 lg:grid-cols-2">
              <GlowCard className="p-6">
                <h2 className="text-xl font-black text-navy">Topic breakdown</h2>
                <div className="mt-4 space-y-4">
                  {topicBreakdown(mock, attempt).map((topic) => <ProgressBar key={topic.topic} value={topic.maxScore ? (topic.score / topic.maxScore) * 100 : 0} label={`${topic.topic}: ${topic.score}/${topic.maxScore}`} />)}
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
              <h2 className="text-2xl font-black text-navy">Full question review</h2>
              <div className="mt-6 space-y-8">
                {questions.map((question, index) => (
                  <div key={question.id} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
                    <PremiumBadge>Question {index + 1}</PremiumBadge>
                    <div className="mt-4">
                      <QuestionRenderer question={question} value={attempt.answers[question.id]} onChange={() => undefined} review />
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        )}
      </Container>
    </RequireAuth>
  );
}

