"use client";

import { useMemo, useState } from "react";
import { BookOpenCheck, ClipboardList, CreditCard, Eye, FilePlus2, Lock, Mail, Settings2, ShieldCheck, Users } from "lucide-react";
import { QUESTIONS } from "@/data/platform";
import { recommendationsForTopics } from "@/lib/assessment";
import { usePlatform } from "@/context/platform-context";
import { AnimatedButton, GlowCard, MockCard, PremiumBadge, ProgressBar, ReportPreview, RevealOnScroll, WeakTopicBreakdown } from "@/components/platform/ui";
import type { Subject } from "@/types/platform";

export function StudentDashboard() {
  const { currentUser, mocks, attempts } = usePlatform();
  const studentAttempts = attempts.filter((attempt) => attempt.studentId === currentUser?.id);
  const released = studentAttempts.filter((attempt) => attempt.status === "report_released");
  const pending = studentAttempts.filter((attempt) => attempt.status === "submitted");
  const weakTopics = Array.from(new Set(released.flatMap((attempt) => attempt.weakTopics)));
  const unlocked = mocks.filter((mock) => currentUser?.unlockedMockIds.includes(mock.id) && mock.published);
  const locked = mocks.filter((mock) => mock.published && !currentUser?.unlockedMockIds.includes(mock.id));
  const nextMock = unlocked.find((mock) => !studentAttempts.some((attempt) => attempt.mockId === mock.id && attempt.status !== "in_progress"));

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <GlowCard className="p-8">
          <PremiumBadge tone={currentUser?.approved ? "green" : "red"}>{currentUser?.approved ? "Approved student" : "Approval pending"}</PremiumBadge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Welcome back, {currentUser?.name}</h1>
          <p className="mt-3 max-w-2xl text-muted">Complete mocks inside the platform, then wait for Summit Tuition to release your marked report and full review.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Metric label="Available mocks" value={unlocked.length} />
            <Metric label="Completed" value={released.length} />
            <Metric label="Pending reports" value={pending.length} />
          </div>
        </GlowCard>
        <GlowCard className="p-8">
          <PremiumBadge>Next mock</PremiumBadge>
          <h2 className="mt-4 text-2xl font-bold text-navy">{nextMock?.title ?? "Awaiting unlock"}</h2>
          <p className="mt-2 text-sm text-muted">{nextMock?.description ?? "Your tutor will unlock the next online mock after approval."}</p>
          {nextMock && <AnimatedButton href={`/mocks/${nextMock.id}`} className="mt-6">Start now</AnimatedButton>}
        </GlowCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <RevealOnScroll className="lg:col-span-2">
          <GlowCard className="p-6">
            <h2 className="text-xl font-bold text-navy">Progress overview</h2>
            <div className="mt-5 space-y-4">
              <ProgressBar value={currentUser?.approved ? 100 : 35} label="Access readiness" />
              <ProgressBar value={released.length ? 72 : 20} label="Mock completion" />
              <ProgressBar value={weakTopics.length ? 55 : 82} label="Weak-topic confidence" />
            </div>
          </GlowCard>
        </RevealOnScroll>
        <RevealOnScroll delay={0.08}>
          <GlowCard className="p-6">
            <h2 className="text-xl font-bold text-navy">Recommended practice</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {recommendationsForTopics(weakTopics).map((item) => <li key={item} className="rounded-xl bg-cream p-3">{item}</li>)}
            </ul>
          </GlowCard>
        </RevealOnScroll>
      </section>

      <section>
        <h2 className="text-2xl font-black text-navy">Available mocks</h2>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          {unlocked.map((mock) => <MockCard key={mock.id} mock={mock} attempt={studentAttempts.find((attempt) => attempt.mockId === mock.id && attempt.status !== "in_progress")} />)}
          {unlocked.length === 0 && <EmptyState icon={<Lock />} title="No mocks unlocked yet" text="Register, complete payment, then wait for manual admin approval." />}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black text-navy">Completed reports</h2>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          {released.map((attempt) => {
            const mock = mocks.find((item) => item.id === attempt.mockId);
            return mock ? <ReportPreview key={attempt.id} attempt={attempt} mock={mock} /> : null;
          })}
          {pending.map((attempt) => {
            const mock = mocks.find((item) => item.id === attempt.mockId);
            return mock ? <GlowCard key={attempt.id} className="p-6"><PremiumBadge tone="navy">Report pending</PremiumBadge><h3 className="mt-3 text-xl font-bold text-navy">{mock.title}</h3><p className="mt-2 text-muted">Your mock has been submitted. Your result and review will be released after marking.</p></GlowCard> : null;
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black text-navy">Locked mocks</h2>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          {locked.map((mock) => <MockCard key={mock.id} mock={mock} locked />)}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <GlowCard className="p-6">
          <h2 className="text-xl font-bold text-navy">Weak topics</h2>
          <div className="mt-4"><WeakTopicBreakdown topics={weakTopics} /></div>
        </GlowCard>
        <GlowCard className="p-6">
          <h2 className="text-xl font-bold text-navy">Content protection</h2>
          <p className="mt-3 text-sm text-muted">Mocks are online-only, require an approved login, and do not include PDF downloads or print views. Basic copy protection is active in the mock room while keeping form controls accessible.</p>
        </GlowCard>
      </section>
    </div>
  );
}

export function AdminDashboard() {
  const {
    users,
    mocks,
    attempts,
    references,
    products,
    emailTemplates,
    approveUser,
    assignPlan,
    unlockMock,
    setMockPublished,
    releaseReport,
    addFeedback,
    addReference,
    createOriginalMockFromReference,
  } = usePlatform();
  const students = users.filter((user) => user.role === "student");
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [newReferenceUrl, setNewReferenceUrl] = useState("");
  const [newReferenceSubject, setNewReferenceSubject] = useState<Subject>("English");

  const stats = useMemo(() => [
    { label: "Students", value: students.length, icon: <Users /> },
    { label: "Pending approval", value: students.filter((student) => !student.approved).length, icon: <ShieldCheck /> },
    { label: "Submitted attempts", value: attempts.filter((attempt) => attempt.status === "submitted").length, icon: <ClipboardList /> },
    { label: "Published mocks", value: mocks.filter((mock) => mock.published).length, icon: <BookOpenCheck /> },
  ], [attempts, mocks, students]);

  return (
    <div className="space-y-10">
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => <GlowCard key={stat.label} className="p-5"><div className="flex items-center gap-3 text-gold-dark">{stat.icon}</div><p className="mt-4 text-3xl font-black text-navy">{stat.value}</p><p className="text-sm text-muted">{stat.label}</p></GlowCard>)}
      </section>

      <AdminPanel title="Students and manual access" icon={<Users />}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase text-muted"><tr><th className="p-3">Student</th><th>Plan</th><th>Payment</th><th>Approved</th><th>Mock unlocks</th></tr></thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t border-line">
                  <td className="p-3 font-bold text-navy">{student.name}<br /><span className="font-normal text-muted">{student.email}</span></td>
                  <td>
                    <select value={student.plan} onChange={(event) => assignPlan(student.id, event.target.value)} className="rounded-lg border border-line bg-white px-2 py-2">
                      {products.map((product) => <option key={product.id}>{product.name}</option>)}
                    </select>
                  </td>
                  <td><PremiumBadge tone={student.paymentStatus === "paid" ? "green" : "navy"}>{student.paymentStatus}</PremiumBadge></td>
                  <td><button onClick={() => approveUser(student.id, !student.approved)} className="rounded-full border border-line px-3 py-1 font-bold text-navy">{student.approved ? "Unapprove" : "Approve"}</button></td>
                  <td className="space-y-2 py-3">
                    {mocks.filter((mock) => mock.published).map((mock) => (
                      <label key={mock.id} className="mr-2 inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1">
                        <input type="checkbox" checked={student.unlockedMockIds.includes(mock.id)} onChange={(event) => unlockMock(student.id, mock.id, event.target.checked)} />
                        {mock.subject}
                      </label>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminPanel>

      <AdminPanel title="Mock management and question bank" icon={<Settings2 />}>
        <div className="grid gap-4 lg:grid-cols-2">
          {mocks.map((mock) => (
            <div key={mock.id} className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div><h3 className="font-bold text-navy">{mock.title}</h3><p className="text-sm text-muted">{mock.description}</p></div>
                <PremiumBadge tone={mock.published ? "green" : "navy"}>{mock.published ? "Published" : "Draft"}</PremiumBadge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => setMockPublished(mock.id, !mock.published)} className="rounded-full border border-line px-3 py-1 text-sm font-bold text-navy">{mock.published ? "Unpublish" : "Publish"}</button>
                <PremiumBadge>{mock.releaseDate}</PremiumBadge>
                <PremiumBadge tone={mock.style === "GL-style" ? "gold" : "navy"}>{mock.style}</PremiumBadge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl bg-cream p-4">
          <h3 className="font-bold text-navy">Question bank</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {QUESTIONS.map((question) => <div key={question.id} className="rounded-lg bg-white p-3 text-sm"><strong>{question.subject}</strong> · {question.topic} · {question.questionType}</div>)}
          </div>
        </div>
      </AdminPanel>

      <AdminPanel title="Attempts, marking and report release" icon={<Eye />}>
        <div className="space-y-4">
          {attempts.filter((attempt) => attempt.status !== "in_progress").map((attempt) => {
            const student = users.find((user) => user.id === attempt.studentId);
            const mock = mocks.find((item) => item.id === attempt.mockId);
            return (
              <div key={attempt.id} className="rounded-xl border border-line bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div><h3 className="font-bold text-navy">{student?.name} · {mock?.title}</h3><p className="text-sm text-muted">Score stored server-side in future DB layer: {attempt.score}/{attempt.maxScore}. Weak topics: {attempt.weakTopics.join(", ") || "none"}</p></div>
                  <PremiumBadge tone={attempt.status === "report_released" ? "green" : "navy"}>{attempt.status.replaceAll("_", " ")}</PremiumBadge>
                </div>
                <textarea value={feedback[attempt.id] ?? attempt.adminFeedback} onChange={(event) => setFeedback((prev) => ({ ...prev, [attempt.id]: event.target.value }))} className="mt-3 min-h-20 w-full rounded-xl border border-line p-3 text-sm outline-none focus:border-gold" placeholder="Manual feedback notes" />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => addFeedback(attempt.id, feedback[attempt.id] ?? attempt.adminFeedback)} className="rounded-full border border-line px-3 py-1 text-sm font-bold text-navy">Save feedback</button>
                  <button onClick={() => releaseReport(attempt.id, feedback[attempt.id] ?? attempt.adminFeedback)} className="rounded-full bg-gold px-3 py-1 text-sm font-bold text-navy">Release report</button>
                </div>
              </div>
            );
          })}
        </div>
      </AdminPanel>

      <AdminPanel title="Reference Library" icon={<FilePlus2 />}>
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_auto]">
          <input value={newReferenceUrl} onChange={(event) => setNewReferenceUrl(event.target.value)} className="h-11 rounded-xl border border-line px-3 outline-none focus:border-gold" placeholder="Add reference URL" />
          <select value={newReferenceSubject} onChange={(event) => setNewReferenceSubject(event.target.value as Subject)} className="h-11 rounded-xl border border-line bg-white px-3"><option>English</option><option>Maths</option><option>VR</option><option>NVR</option></select>
          <button onClick={() => { if (newReferenceUrl) { addReference({ title: "Admin reference", url: newReferenceUrl, subject: newReferenceSubject, style: "unknown", notes: "Awaiting GL/non-GL classification." }); setNewReferenceUrl(""); } }} className="rounded-full bg-navy px-4 py-2 text-sm font-bold text-white">Add reference</button>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {references.map((reference) => (
            <div key={reference.id} className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-start justify-between gap-3"><h3 className="font-bold text-navy">{reference.title}</h3><PremiumBadge tone={reference.style === "GL-style" ? "gold" : "navy"}>{reference.style}</PremiumBadge></div>
              <p className="mt-2 text-sm text-muted">{reference.notes}</p>
              <p className="mt-2 text-xs text-muted">{reference.subject} · analysed {reference.lastAnalysedAt}</p>
              <button onClick={() => createOriginalMockFromReference(reference.id, reference.subject)} className="mt-4 rounded-full border border-gold/50 px-3 py-1 text-sm font-bold text-gold-dark">Generate original GL-style mock from this reference profile</button>
            </div>
          ))}
        </div>
      </AdminPanel>

      <section className="grid gap-6 lg:grid-cols-2">
        <AdminPanel title="Products and pricing placeholders" icon={<CreditCard />}>
          <div className="grid gap-3">
            {products.map((product) => <div key={product.id} className="rounded-xl border border-line bg-white p-4"><strong className="text-navy">{product.name}</strong><p className="text-sm text-muted">{product.price}{product.cadence} · {product.description}</p></div>)}
          </div>
        </AdminPanel>
        <AdminPanel title="Email placeholders" icon={<Mail />}>
          <div className="grid gap-3">
            {emailTemplates.map((email) => <div key={email.id} className="rounded-xl border border-line bg-white p-4"><strong className="text-navy">{email.trigger}</strong><p className="text-sm text-muted">{email.subject} · disabled until email provider is configured</p></div>)}
          </div>
        </AdminPanel>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl bg-cream p-4"><p className="text-2xl font-black text-navy">{value}</p><p className="text-sm text-muted">{label}</p></div>;
}

function EmptyState({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <GlowCard className="p-6"><div className="text-gold-dark">{icon}</div><h3 className="mt-4 text-xl font-bold text-navy">{title}</h3><p className="mt-2 text-muted">{text}</p></GlowCard>;
}

function AdminPanel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <GlowCard className="p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">{icon}</div>
        <h2 className="text-xl font-black text-navy">{title}</h2>
      </div>
      {children}
    </GlowCard>
  );
}

