"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RequireAuth, RevealOnScroll } from "@/components/platform/ui";
import { AdminStudentsWorkspace } from "@/components/platform/admin-students-workspace";

export default function AdminStudentsPage() {
  return (
    <RequireAuth role="admin">
      <Container className="py-10">
        <RevealOnScroll>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">Student access</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-navy">Student approvals and mock unlocks</h1>
              <p className="mt-3 max-w-3xl text-muted">Review newly registered students, assign plans, approve access, and unlock mocks for testing or live use.</p>
            </div>
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy hover:border-gold">
              <ArrowLeft className="h-4 w-4" /> Admin overview
            </Link>
          </div>
        </RevealOnScroll>
        <AdminStudentsWorkspace />
      </Container>
    </RequireAuth>
  );
}
