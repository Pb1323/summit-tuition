"use client";

import { Container } from "@/components/ui/container";
import { RequireAuth, RevealOnScroll } from "@/components/platform/ui";
import { StudentDashboard } from "@/components/platform/dashboards";

export default function DashboardPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <RevealOnScroll>
          <StudentDashboard />
        </RevealOnScroll>
      </Container>
    </RequireAuth>
  );
}
