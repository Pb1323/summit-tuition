"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ClipboardCheck, ChevronDown, Plus, Search, Trash2, UserPlus, Users, X, XCircle } from "lucide-react";
import { usePlatform } from "@/context/platform-context";
import { GlowCard, PremiumBadge, StaggerReveal } from "@/components/platform/ui";
import type { MockExam, NotePage, Subject } from "@/types/platform";

function confirmDelete(name: string, email: string) {
  return window.confirm(`Permanently delete ${name} (${email})?\n\nThis removes their account, attempts and unlocks for good. This cannot be undone. Type OK to confirm.`);
}

export function AdminStudentsWorkspace({ compact = false }: { compact?: boolean }) {
  const { users, mocks, notes, products, approveUser, rejectUser, approveAndUnlockFirstMock, assignPlan, unlockMock, unlockNote, createTestStudent, setStudentLessons } = usePlatform();
  const students = users.filter((user) => user.role === "student");
  const pending = students.filter((student) => !student.approved);
  const publishedMocks = mocks.filter((mock) => mock.published);

  return (
    <div className="space-y-6">
      <GlowCard className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <PremiumBadge tone={pending.length ? "red" : "green"}>{pending.length ? `${pending.length} paused` : "No paused accounts"}</PremiumBadge>
            <h2 className="mt-3 text-2xl font-black text-navy">Paused Student Accounts</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">Students register with instant access — this list only shows accounts you&apos;ve manually paused. Re-approve, assign a plan, and unlock the first mock from one place.</p>
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
                    <PremiumBadge tone="navy">Access paused</PremiumBadge>
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
                  <button onClick={() => confirmDelete(student.name, student.email) && rejectUser(student.id)} className="inline-flex h-10 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-700">
                    <XCircle className="h-4 w-4" /> Reject &amp; delete
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
                      <button
                        onClick={() => confirmDelete(student.name, student.email) && rejectUser(student.id)}
                        className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-bold text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete account
                      </button>
                    </div>
                  </div>
                </div>
                <UnlockPanel
                  studentId={student.id}
                  studentName={student.name}
                  mocks={publishedMocks}
                  notes={notes}
                  unlockedMockIds={student.unlockedMockIds}
                  unlockedNoteIds={student.unlockedNoteIds}
                  onToggleMock={unlockMock}
                  onToggleNote={unlockNote}
                />
                <LessonsEditor
                  studentId={student.id}
                  lessonsRemaining={student.lessonsRemaining ?? 0}
                  upcomingLessons={student.upcomingLessons ?? []}
                  onSave={setStudentLessons}
                />
              </div>
            ))}
            {students.length === 0 && <div className="rounded-2xl border border-line bg-cream p-6"><h3 className="font-black text-navy">No students yet</h3><p className="mt-2 text-sm text-muted">New registered students will appear here.</p></div>}
          </StaggerReveal>
        </GlowCard>
      )}
    </div>
  );
}

function groupBySubject<T extends { subject: Subject; title: string }>(items: T[], query: string) {
  const q = query.trim().toLowerCase();
  const filtered = q ? items.filter((item) => item.title.toLowerCase().includes(q)) : items;
  const groups = new Map<Subject, T[]>();
  for (const item of filtered) {
    const list = groups.get(item.subject) ?? [];
    list.push(item);
    groups.set(item.subject, list);
  }
  return groups;
}

function UnlockPanel({
  studentId,
  studentName,
  mocks,
  notes,
  unlockedMockIds,
  unlockedNoteIds,
  onToggleMock,
  onToggleNote,
}: {
  studentId: string;
  studentName: string;
  mocks: MockExam[];
  notes: NotePage[];
  unlockedMockIds: string[];
  unlockedNoteIds: string[];
  onToggleMock: (studentId: string, mockId: string, unlocked: boolean) => void;
  onToggleNote: (studentId: string, noteId: string, unlocked: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const mockGroups = useMemo(() => groupBySubject(mocks, query), [mocks, query]);
  const noteGroups = useMemo(() => groupBySubject(notes, query), [notes, query]);
  const mockCount = unlockedMockIds.length;
  const noteCount = unlockedNoteIds.length;

  return (
    <div className="mt-4 rounded-2xl border border-line bg-cream/40">
      <button type="button" onClick={() => setExpanded((prev) => !prev)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-navy">
        <span>Unlocks for {studentName} — {mockCount}/{mocks.length} mocks, {noteCount}/{notes.length} notes</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="space-y-4 border-t border-line px-4 py-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search mocks or notes by title..."
              className="h-9 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-sm outline-none focus:border-gold"
            />
          </div>

          <UnlockGroup
            label="Mocks"
            groups={mockGroups}
            checkedIds={unlockedMockIds}
            onToggleAll={(ids, checked) => ids.forEach((id) => onToggleMock(studentId, id, checked))}
            onToggleOne={(id, checked) => onToggleMock(studentId, id, checked)}
          />
          <UnlockGroup
            label="Notes"
            groups={noteGroups}
            checkedIds={unlockedNoteIds}
            onToggleAll={(ids, checked) => ids.forEach((id) => onToggleNote(studentId, id, checked))}
            onToggleOne={(id, checked) => onToggleNote(studentId, id, checked)}
          />
        </div>
      )}
    </div>
  );
}

function UnlockGroup<T extends { id: string; subject: Subject; title: string; isFree?: boolean }>({
  label,
  groups,
  checkedIds,
  onToggleAll,
  onToggleOne,
}: {
  label: string;
  groups: Map<Subject, T[]>;
  checkedIds: string[];
  onToggleAll: (ids: string[], checked: boolean) => void;
  onToggleOne: (id: string, checked: boolean) => void;
}) {
  if (groups.size === 0) return null;
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-muted">{label}</p>
      <div className="mt-2 space-y-3">
        {Array.from(groups.entries()).map(([subject, items]) => {
          const ids = items.map((item) => item.id);
          const allChecked = ids.every((id) => checkedIds.includes(id));
          return (
            <div key={subject} className="rounded-xl border border-line bg-white p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-navy">{subject} <span className="font-semibold text-muted">({ids.filter((id) => checkedIds.includes(id)).length}/{ids.length})</span></span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => onToggleAll(ids, true)} className="rounded-full border border-line px-2 py-0.5 text-xs font-bold text-navy hover:border-gold">Unlock all</button>
                  <button type="button" onClick={() => onToggleAll(ids, false)} className="rounded-full border border-line px-2 py-0.5 text-xs font-bold text-navy hover:border-gold">Lock all</button>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {items.map((item) => (
                  <label key={item.id} className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-navy ${allChecked || checkedIds.includes(item.id) ? "bg-gold/15" : "bg-navy/5"}`}>
                    <input type="checkbox" checked={checkedIds.includes(item.id)} onChange={(event) => onToggleOne(item.id, event.target.checked)} />
                    {item.title}{item.isFree && <span className="text-xs font-black text-gold-dark">FREE</span>}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LessonsEditor({
  studentId,
  lessonsRemaining,
  upcomingLessons,
  onSave,
}: {
  studentId: string;
  lessonsRemaining: number;
  upcomingLessons: { date: string; time: string; note?: string }[];
  onSave: (studentId: string, lessonsRemaining: number, upcomingLessons: { date: string; time: string; note?: string }[]) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [remaining, setRemaining] = useState(lessonsRemaining);
  const [lessons, setLessons] = useState(upcomingLessons);

  function save(nextRemaining: number, nextLessons: typeof lessons) {
    setRemaining(nextRemaining);
    setLessons(nextLessons);
    onSave(studentId, nextRemaining, nextLessons);
  }

  return (
    <div className="mt-3 rounded-2xl border border-line bg-cream/40">
      <button type="button" onClick={() => setExpanded((prev) => !prev)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-navy">
        <span>Lessons — {remaining} remaining, {lessons.length} upcoming</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="space-y-3 border-t border-line px-4 py-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-navy">
            Lessons remaining
            <input
              type="number"
              min={0}
              value={remaining}
              onChange={(event) => save(Number(event.target.value) || 0, lessons)}
              className="h-9 w-20 rounded-lg border border-line bg-white px-2 text-sm outline-none focus:border-gold"
            />
          </label>
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <div key={index} className="flex flex-wrap items-center gap-2">
                <input type="date" value={lesson.date} onChange={(event) => save(remaining, lessons.map((item, i) => (i === index ? { ...item, date: event.target.value } : item)))} className="h-9 rounded-lg border border-line bg-white px-2 text-sm outline-none focus:border-gold" />
                <input type="time" value={lesson.time} onChange={(event) => save(remaining, lessons.map((item, i) => (i === index ? { ...item, time: event.target.value } : item)))} className="h-9 rounded-lg border border-line bg-white px-2 text-sm outline-none focus:border-gold" />
                <input type="text" placeholder="Subject / note" value={lesson.note ?? ""} onChange={(event) => save(remaining, lessons.map((item, i) => (i === index ? { ...item, note: event.target.value } : item)))} className="h-9 flex-1 min-w-32 rounded-lg border border-line bg-white px-2 text-sm outline-none focus:border-gold" />
                <button type="button" onClick={() => save(remaining, lessons.filter((_, i) => i !== index))} className="rounded-full border border-red-200 bg-red-50 p-1.5 text-red-700" aria-label="Remove lesson">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => save(remaining, [...lessons, { date: "", time: "", note: "" }])} className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-sm font-bold text-navy hover:border-gold">
            <Plus className="h-3.5 w-3.5" /> Add upcoming lesson
          </button>
        </div>
      )}
    </div>
  );
}

function EmptyApproval() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h3 className="text-lg font-black text-navy">No paused student accounts.</h3>
      <p className="mt-2 text-sm text-muted">Students register with instant access — an account only shows up here if you&apos;ve manually paused it.</p>
    </div>
  );
}
