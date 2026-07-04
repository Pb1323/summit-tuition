"use client";

import Link from "next/link";
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
          <nav className="mt-6 flex flex-wrap gap-2 text-sm font-bold" aria-label="Admin sections">
            {[
              ["Overview", "/admin"],
              ["Mocks", "/admin/mocks"],
              ["Question Bank", "/admin/mocks#question-bank"],
              ["References", "/admin/mocks#references"],
              ["Attempts", "/admin/mocks#attempts"],
              ["Students", "/admin/students"],
              ["Payments", "/admin"],
              ["Products", "/admin"],
            ].map(([label, href]) => <Link key={`${label}-${href}`} href={href} className="rounded-full border border-line bg-white px-4 py-2 text-navy hover:border-gold">{label}</Link>)}
          </nav>
        </RevealOnScroll>
        <RevealOnScroll delay={0.06}>
          <AdminDashboard />
        </RevealOnScroll>
      </Container>
    </RequireAuth>
  );
}
