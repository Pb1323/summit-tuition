"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePlatform } from "@/context/platform-context";
import { Container } from "@/components/ui/container";
import { GlowCard, PremiumBadge, RequireAuth } from "@/components/platform/ui";
import { StudentReportView } from "@/components/platform/student-report-view";

export default function MockReviewPage() {
  const params = useParams<{ id: string }>();
  const { currentUser, mocks, attempts } = usePlatform();
  const mock = mocks.find((item) => item.id === params.id);
  const attempt = attempts.find((item) => item.studentId === currentUser?.id && item.mockId === params.id && item.status === "report_released");

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
          <StudentReportView attempt={attempt} mock={mock} />
        )}
      </Container>
    </RequireAuth>
  );
}
