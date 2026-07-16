"use client";

import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge } from "@/components/platform/ui";
import { usePlatform } from "@/context/platform-context";
import { CalendarClock, CreditCard, GraduationCap } from "lucide-react";

export default function FamilyPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <FamilyOverview />
      </Container>
    </RequireAuth>
  );
}

function FamilyOverview() {
  const { currentUser } = usePlatform();
  const lessonsRemaining = currentUser?.lessonsRemaining ?? 0;
  const upcoming = currentUser?.upcomingLessons ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <PremiumBadge>Family</PremiumBadge>
        <h1 className="mt-3 text-3xl font-black text-navy">Lessons & payments</h1>
        <p className="mt-2 text-muted">A quick overview for parents — how many lessons are left, when the next ones are, and payment status.</p>
      </div>

      <GlowCard className="p-6">
        <div className="flex items-center gap-3 text-gold-dark"><GraduationCap className="h-5 w-5" /><h2 className="text-lg font-bold text-navy">Lessons remaining</h2></div>
        <p className="mt-3 text-4xl font-black text-navy">{lessonsRemaining}</p>
        <p className="mt-1 text-sm text-muted">Based on your current plan: <strong className="text-navy">{currentUser?.plan}</strong>.</p>
      </GlowCard>

      <GlowCard className="p-6">
        <div className="flex items-center gap-3 text-gold-dark"><CalendarClock className="h-5 w-5" /><h2 className="text-lg font-bold text-navy">Upcoming lessons</h2></div>
        <div className="mt-4 space-y-3">
          {upcoming.length === 0 && <p className="text-sm text-muted">No upcoming lessons scheduled yet — contact Summit Tuition to book.</p>}
          {upcoming.map((lesson, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-xl bg-cream px-4 py-3">
              <div>
                <p className="font-bold text-navy">{lesson.date} at {lesson.time}</p>
                {lesson.note && <p className="text-sm text-muted">{lesson.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </GlowCard>

      <GlowCard className="p-6">
        <div className="flex items-center gap-3 text-gold-dark"><CreditCard className="h-5 w-5" /><h2 className="text-lg font-bold text-navy">Payments</h2></div>
        <p className="mt-3 text-sm text-muted">
          Current status: <PremiumBadge tone={currentUser?.paymentStatus === "paid" ? "green" : "navy"}>{currentUser?.paymentStatus}</PremiumBadge>
        </p>
        <p className="mt-3 text-sm text-muted">A full payment history and invoices will appear here once online payments (Stripe) are connected.</p>
      </GlowCard>
    </div>
  );
}
