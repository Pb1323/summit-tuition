"use client";

import Link from "next/link";
import { CheckCircle2, ClipboardCheck, UserPlus, Users, XCircle } from "lucide-react";
import { usePlatform } from "@/context/platform-context";
import { GlowCard, PremiumBadge, StaggerReveal } from "@/components/platform/ui";

export function AdminStudentsWorkspace({ compact = false }: { compact?: boolean }) {
  const { users, mocks, products, approveUser, rejectUser, approveAndUnlockFirstMock, assignPlan, unlockMock, createTestStudent } = usePlatform();
  const students = users.filter((user) => user.role === "student");
  const pending = students.filter((student) => !student.approved);
  const publishedMocks = mocks.filter((mock) => mock.published);

  return (
    <div className="space-y-6">
      <GlowCard className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <PremiumBadge tone={pending.length ? "red" : "green"}>{pending.length ? `${pending.length} pending` : "No pending approvals"}</PremiumBadge>
            <h2 className="mt-3 text-2xl font-black text-navy">Pending Student Approvals</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">Newly registered students appear here in the current demo storage. Approve, assign a plan, and unlock the first mock from one place.</p>
          </div>
          <button onClick={createTestStudent} className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-bold text-navy hover:border-gold">
            <UserPlus className="h-4 w-4" /> Create Test Student
          </button>
        </div>
        <div className="mt-5 grid gap-4">
          {pending.map((student) => (
            <div key={student.id} className="rounded-2xl border border-gold/25 bg-cream p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-navy">{student.name}</h3>
                  <p className="text-sm text-muted">{student.email}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <PremiumBadge tone="navy">Pending approval</PremiumBadge>
                    <PremiumBadge>{student.paymentStatus}</PremiumBadge>
                    <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-muted">Created {student.createdAt.slice(0, 10)}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">Requested plan: <strong className="text-navy">{student.plan}</strong></p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => approveUser(student.id, true)} className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-bold text-navy hover:border-gold">
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button onClick={() => approveAndUnlockFirstMock(student.id)} className="inline-flex h-10 items-center gap-2 rounded-full bg-gold px-4 text-sm font-bold text-navy">
                    <ClipboardCheck className="h-4 w-4" /> Approve + Unlock First Mock
                  </button>
                  <button onClick={() => rejectUser(student.id)} className="inline-flex h-10 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-700">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
          {pending.length === 0 && <EmptyApproval />}
        </div>
      </GlowCard>

      {!compact && (
        <GlowCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <PremiumBadge><Users className="mr-1 h-3.5 w-3.5" /> Students</PremiumBadge>
              <h2 className="mt-3 text-2xl font-black text-navy">All Student Accounts</h2>
            </div>
            <Link href="/admin/mocks" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy hover:border-gold">Open Mock Command Centre</Link>
          </div>
          <StaggerReveal className="mt-5 grid gap-4">
            {students.map((student) => (
              <div key={student.id} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black text-navy">{student.name}</h3>
                    <p className="text-sm text-muted">{student.email}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <PremiumBadge tone={student.approved ? "green" : "red"}>{student.approved ? "Approved" : "Pending"}</PremiumBadge>
                      <PremiumBadge tone={student.paymentStatus === "paid" ? "green" : "navy"}>{student.paymentStatus}</PremiumBadge>
                    </div>
                  </div>
                  <div className="min-w-64 space-y-3">
                    <select aria-label={`Assign plan for ${student.name}`} value={student.plan} onChange={(event) => assignPlan(student.id, event.target.value)} className="h-10 w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold outline-none focus:border-gold">
                      {products.map((product) => <option key={product.id}>{product.name}</option>)}
                    </select>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => approveUser(student.id, !student.approved)} className="rounded-full border border-line px-3 py-1 text-sm font-bold text-navy">{student.approved ? "Unapprove" : "Approve"}</button>
                      <button onClick={() => approveAndUnlockFirstMock(student.id)} className="rounded-full bg-gold px-3 py-1 text-sm font-bold text-navy">Approve + unlock</button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {publishedMocks.map((mock) => (
                    <label key={mock.id} className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-sm font-semibold text-navy">
                      <input type="checkbox" checked={student.unlockedMockIds.includes(mock.id)} onChange={(event) => unlockMock(student.id, mock.id, event.target.checked)} />
                      {mock.title}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {students.length === 0 && <div className="rounded-2xl border border-line bg-cream p-6"><h3 className="font-black text-navy">No students yet</h3><p className="mt-2 text-sm text-muted">New registered students will appear here.</p></div>}
          </StaggerReveal>
        </GlowCard>
      )}
    </div>
  );
}

function EmptyApproval() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h3 className="text-lg font-black text-navy">No pending student approvals.</h3>
      <p className="mt-2 text-sm text-muted">New registered students will appear here for review.</p>
    </div>
  );
}
