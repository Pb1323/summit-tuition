"use client";

import { Container } from "@/components/ui/container";
import { RequireAuth, RevealOnScroll } from "@/components/platform/ui";
import { AdminDashboard } from "@/components/platform/dashboards";

export default function AdminPage() {
  return (
    <RequireAuth role="admin">
      <Container className="py-10">
        <RevealOnScroll className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">Master admin</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-navy">Summit Tuition control room</h1>
          <p className="mt-3 max-w-3xl text-muted">Approve students, assign plans, unlock mocks, publish GL-style originals, review attempts and release reports manually after marking.</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.06}>
          <AdminDashboard />
        </RevealOnScroll>
      </Container>
    </RequireAuth>
  );
}
