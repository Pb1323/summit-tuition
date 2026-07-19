"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlowCard, PremiumBadge, RequireAuth } from "@/components/platform/ui";
import { AdminAttemptReport } from "@/components/platform/admin-attempt-report";
import { usePlatform } from "@/context/platform-context";

export default function StudentAttemptReportPage() {
  const params = useParams<{ id: string }>();
  const { currentUser, attempts, mocks } = usePlatform();
  const attempt = attempts.find(
    (item) => item.studentId === currentUser?.id && item.mockId === params.id && item.status === "report_released"
  );
  const mock = attempt ? mocks.find((item) => item.id === attempt.mockId) : undefined;

  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href={`/mocks/${params.id}/review`} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy hover:border-gold">
            <ArrowLeft className="h-4 w-4" /> Back to review
          </Link>
          {attempt && mock && (
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-bold text-white hover:bg-navy-light">
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </button>
          )}
        </div>
        {!attempt || !mock ? (
          <GlowCard className="p-8">
            <PremiumBadge tone="navy">Report not available</PremiumBadge>
            <h1 className="mt-4 text-2xl font-black text-navy">Report not released yet</h1>
            <p className="mt-2 text-muted">Once your marked report is released, it will appear here as a printable PDF.</p>
          </GlowCard>
        ) : (
          <div className="gl-print">
            <div className="gl-print-page p-8">
              <AdminAttemptReport attempt={attempt} mock={mock} audience="student" />
            </div>
          </div>
        )}
      </Container>
    </RequireAuth>
  );
}
