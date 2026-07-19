"use client";

import { useParams } from "next/navigation";
import { Printer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, QuestionRenderer } from "@/components/platform/ui";
import { usePlatform } from "@/context/platform-context";

export default function MockPrintPage() {
  return (
    <RequireAuth role="student">
      <PrintView />
    </RequireAuth>
  );
}

function PrintView() {
  const params = useParams<{ id: string }>();
  const { mocks, questions, passages, currentUser } = usePlatform();
  const mock = mocks.find((item) => item.id === params.id);

  if (!mock || !mock.printOnly || !currentUser?.unlockedMockIds.includes(mock.id)) {
    return (
      <Container className="py-16 text-center">
        <p className="text-lg font-bold text-navy">This printable mock isn&apos;t available.</p>
      </Container>
    );
  }

  const mockQuestions = mock.questionIds.map((id) => questions.find((question) => question.id === id)).filter(Boolean) as typeof questions;

  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="print:hidden">
          <GlowCard className="p-6">
            <PremiumBadge tone="navy">Printable practice</PremiumBadge>
            <h1 className="mt-3 text-2xl font-black text-navy">{mock.title}</h1>
            <p className="mt-2 text-sm text-muted">{mock.description}</p>
            <p className="mt-2 text-sm font-bold text-gold-dark">Reminder: this paper has no online marking or report — attempt it on paper, then self-check against your notes.</p>
            <button onClick={() => window.print()} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy">
              <Printer className="h-4 w-4" /> Print this paper
            </button>
          </GlowCard>
        </div>

        <div className="hidden print:block print:text-center">
          <h1 className="text-xl font-bold">{mock.title}</h1>
          <p className="text-sm">No online marking — for offline practice only.</p>
        </div>

        <div className="space-y-6">
          {mockQuestions.map((question, index) => (
            <QuestionRenderer key={question.id} question={question} passage={passages.find((passage) => passage.id === question.passageId)} questionNumber={index + 1} value="" onChange={() => undefined} />
          ))}
        </div>
      </div>
    </Container>
  );
}
