"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpenCheck, ClipboardList, CreditCard, Eye, FilePlus2, Lock, Mail, ShieldCheck, Sparkles, Users } from "lucide-react";
import { recommendationsForTopics } from "@/lib/assessment";
import { usePlatform } from "@/context/platform-context";
import { AnimatedButton, GlowCard, MockCard, PremiumBadge, ProgressBar, ReportPreview, RevealOnScroll, WeakTopicBreakdown } from "@/components/platform/ui";
import { AdminStudentsWorkspace } from "@/components/platform/admin-students-workspace";
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
  const inProgress = studentAttempts.find((attempt) => attempt.status === "in_progress");
  const nextAction = !currentUser?.approved
    ? "Your account is waiting for manual approval after payment."
    : pending.length
      ? "Your submitted mock is with the marking team."
      : nextMock
        ? "Your next unlocked mock is ready to take online."
        : "You are ready for the next mock unlock from admin.";

  if (currentUser && !currentUser.approved) {
    return (
      <div className="mx-auto max-w-4xl">
        <GlowCard className="p-8">
          <PremiumBadge tone="red">Approval pending</PremiumBadge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Your account is awaiting approval</h1>
          <p className="mt-3 max-w-2xl text-muted">You&apos;ll be able to access mocks once your account has been reviewed. If you have already paid, approval may take a short time.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-cream p-4">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-muted">Status</p>
              <p className="mt-1 text-xl font-black text-navy">Pending</p>
            </div>
            <div className="rounded-xl bg-cream p-4 sm:col-span-2">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-muted">Plan</p>
              <p className="mt-1 text-xl font-black text-navy">{currentUser.plan}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <AnimatedButton href="/contact">Contact Summit Tuition</AnimatedButton>
            <Link href="/" className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-navy hover:border-gold">Back home</Link>
          </div>
        </GlowCard>
      </div>
    );
  }

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
          <h2 className="mt-4 text-2xl font-bold text-navy">{inProgress ? "Resume saved mock" : nextMock?.title ?? "Awaiting unlock"}</h2>
          <p className="mt-2 text-sm text-muted">{inProgress ? "A draft attempt is saved locally so you can continue from the mock room." : nextMock?.description ?? "Your tutor will unlock the next online mock after approval."}</p>
          <div className="mt-4 rounded-2xl border border-gold/25 bg-gold/10 p-4 text-sm font-semibold text-navy">{nextAction}</div>
          {inProgress ? (
            <AnimatedButton href={`/mocks/${inProgress.mockId}`} className="mt-6">Resume mock</AnimatedButton>
          ) : nextMock ? (
            <AnimatedButton href={`/mocks/${nextMock.id}`} className="mt-6">Start now</AnimatedButton>
          ) : null}
        </GlowCard>
      </section>

      <section>
        <GlowCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <PremiumBadge tone="navy">New</PremiumBadge>
            <h2 className="mt-3 text-xl font-bold text-navy">Study Notes</h2>
            <p className="mt-1 max-w-xl text-sm text-muted">
              Interactive, topic-by-topic notes for your lessons and homework — concept walkthroughs, worked
              examples and self-marking practice questions.
            </p>
          </div>
          <AnimatedButton href="/notes">Open Notes</AnimatedButton>
        </GlowCard>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        {[
          ["Register", "Complete"],
          ["Pay", currentUser?.paymentStatus === "paid" ? "Complete" : "Pending"],
          ["Admin approves", currentUser?.approved ? "Complete" : "Pending"],
          ["Report released", released.length ? "Ready" : pending.length ? "In marking" : "After mock"],
        ].map(([label, state], idx) => (
          <div key={label} className="rounded-2xl border border-line bg-white/85 p-4 shadow-[0_18px_44px_-36px_rgba(17,24,39,0.42)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-gold-dark">Step {idx + 1}</p>
            <p className="mt-2 font-bold text-navy">{label}</p>
            <p className="text-sm text-muted">{state}</p>
          </div>
        ))}
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
          {unlocked.map((mock) => <MockCard key={mock.id} mock={mock} attempt={studentAttempts.find((attempt) => attempt.mockId === mock.id)} />)}
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
            return mock ? <GlowCard key={attempt.id} className="p-6"><PremiumBadge tone="navy">Report pending</PremiumBadge><h3 className="mt-3 text-xl font-bold text-navy">{mock.title}</h3><p className="mt-2 text-muted">Submitted {attempt.submittedAt?.slice(0, 10) ?? "recently"}. Your result and review will be released after marking.</p></GlowCard> : null;
          })}
          {released.length === 0 && pending.length === 0 && <EmptyState icon={<ClipboardList />} title="No reports yet" text="Completed mocks and pending marking updates will appear here." />}
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
    releaseReport,
    addFeedback,
    addReference,
  } = usePlatform();
  const students = users.filter((user) => user.role === "student");
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [newReferenceUrl, setNewReferenceUrl] = useState("");
  const [newReferenceSubject, setNewReferenceSubject] = useState<Subject>("English");
  const [referenceError, setReferenceError] = useState("");

  const stats = useMemo(() => [
    { label: "Students", value: students.length, icon: <Users /> },
    { label: "Pending approval", value: students.filter((student) => !student.approved).length, icon: <ShieldCheck /> },
    { label: "Submitted attempts", value: attempts.filter((attempt) => attempt.status === "submitted").length, icon: <ClipboardList /> },
    { label: "Published mocks", value: mocks.filter((mock) => mock.published).length, icon: <BookOpenCheck /> },
  ], [attempts, mocks, students]);
  const pendingApprovals = students.filter((student) => !student.approved).length;
  const submittedAttempts = attempts.filter((attempt) => attempt.status === "submitted").length;
  const draftMocks = mocks.filter((mock) => !mock.published).length;
  const unclassifiedReferences = references.filter((reference) => reference.style === "unknown").length;

  return (
    <div className="space-y-10">
      <GlowCard className="p-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <PremiumBadge><Sparkles className="mr-1 h-3.5 w-3.5" /> Dedicated workspace</PremiumBadge>
            <h2 className="mt-4 text-3xl font-black text-navy">Mock Command Centre</h2>
            <p className="mt-2 max-w-3xl text-muted">Generate mocks, inspect the question visual showcase, run quality checks, preview drafts, publish papers and review attempts in a spacious admin area.</p>
          </div>
          <AnimatedButton href="/admin/mocks">Go to Mock Command Centre</AnimatedButton>
        </div>
      </GlowCard>

      <AdminStudentsWorkspace compact />

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => <GlowCard key={stat.label} className="p-5"><div className="flex items-center gap-3 text-gold-dark">{stat.icon}</div><p className="mt-4 text-3xl font-black text-navy">{stat.value}</p><p className="text-sm text-muted">{stat.label}</p></GlowCard>)}
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {[
          ["Approve accounts", pendingApprovals, "Review payment and access status."],
          ["Release reports", submittedAttempts, "Mark submitted mocks and publish feedback."],
          ["Publish mocks", draftMocks, "Review drafts before student unlocks."],
          ["Classify references", unclassifiedReferences, "Tag GL, non-GL or unknown."],
        ].map(([label, value, text]) => (
          <div key={label} className="rounded-2xl border border-gold/25 bg-white/90 p-5 shadow-[0_18px_52px_-42px_rgba(180,83,9,0.55)]">
            <p className="text-3xl font-black text-navy">{value}</p>
            <p className="mt-1 font-bold text-navy">{label}</p>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </div>
        ))}
      </section>

      <AdminPanel title="Students and manual access" icon={<Users />}>
        {students.length === 0 ? (
          <AdminEmpty title="No students yet" text="New registered students will appear here." />
        ) : <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <caption className="sr-only">Student accounts, plans, payment status, approval status and mock unlock controls</caption>
            <thead className="text-xs uppercase text-muted"><tr><th scope="col" className="p-3">Student</th><th scope="col">Plan</th><th scope="col">Payment</th><th scope="col">Approved</th><th scope="col">Mock unlocks</th></tr></thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t border-line">
                  <th scope="row" className="p-3 text-left font-bold text-navy">{student.name}<br /><span className="font-normal text-muted">{student.email}</span></th>
                  <td>
                    <select aria-label={`Assign plan for ${student.name}`} value={student.plan} onChange={(event) => assignPlan(student.id, event.target.value)} className="rounded-lg border border-line bg-white px-2 py-2">
                      {products.map((product) => <option key={product.id}>{product.name}</option>)}
                    </select>
                  </td>
                  <td><PremiumBadge tone={student.paymentStatus === "paid" ? "green" : "navy"}>{student.paymentStatus}</PremiumBadge></td>
                  <td><button onClick={() => approveUser(student.id, !student.approved)} className="rounded-full border border-line px-3 py-1 font-bold text-navy">{student.approved ? "Unapprove" : "Approve"}</button></td>
                  <td className="space-y-2 py-3">
                    {mocks.filter((mock) => mock.published).map((mock) => (
                      <label key={mock.id} className="mr-2 inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1">
                        <input type="checkbox" checked={student.unlockedMockIds.includes(mock.id)} onChange={(event) => unlockMock(student.id, mock.id, event.target.checked)} />
                        {mock.title}
                      </label>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </AdminPanel>

      <AdminPanel title="Attempts, marking and report release" icon={<Eye />}>
        {attempts.filter((attempt) => attempt.status !== "in_progress").length === 0 ? (
          <AdminEmpty title="No attempts submitted yet" text="Submitted mock attempts will appear here for marking." />
        ) : <div className="space-y-4">
          {attempts.filter((attempt) => attempt.status !== "in_progress").map((attempt) => {
            const student = users.find((user) => user.id === attempt.studentId);
            const mock = mocks.find((item) => item.id === attempt.mockId);
            return (
              <div key={attempt.id} className="rounded-xl border border-line bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div><h3 className="font-bold text-navy">{student?.name} / {mock?.title}</h3><p className="text-sm text-muted">Stored score: {attempt.score}/{attempt.maxScore}. Weak topics: {attempt.weakTopics.join(", ") || "none"}</p></div>
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
        </div>}
      </AdminPanel>

      <AdminPanel title="Add a reference URL" icon={<FilePlus2 />}>
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_auto]">
          <input value={newReferenceUrl} onChange={(event) => { setNewReferenceUrl(event.target.value); setReferenceError(""); }} className="h-11 rounded-xl border border-line px-3 outline-none focus:border-gold" placeholder="Add reference URL" aria-label="Reference URL" />
          <select value={newReferenceSubject} onChange={(event) => setNewReferenceSubject(event.target.value as Subject)} className="h-11 rounded-xl border border-line bg-white px-3" aria-label="Reference subject"><option>English</option><option>Maths</option><option>VR</option><option>NVR</option></select>
          <button onClick={() => {
            if (!newReferenceUrl.trim()) {
              setReferenceError("Enter a reference URL before adding it.");
              return;
            }
            addReference({ title: "Admin reference", url: newReferenceUrl, subject: newReferenceSubject, style: "unknown", notes: "Awaiting GL/non-GL classification." });
            setNewReferenceUrl("");
            setReferenceError("");
          }} className="rounded-full bg-navy px-4 py-2 text-sm font-bold text-white">Add reference</button>
        </div>
        {referenceError && <p className="mt-2 text-sm font-semibold text-red-700" role="alert">{referenceError}</p>}
      </AdminPanel>

      <section className="grid gap-6 lg:grid-cols-2">
        <AdminPanel title="Products and pricing placeholders" icon={<CreditCard />}>
          <div className="grid gap-3">
            {products.map((product) => <div key={product.id} className="rounded-xl border border-line bg-white p-4"><strong className="text-navy">{product.name}</strong><p className="text-sm text-muted">{product.price}{product.cadence} / {product.description}</p></div>)}
          </div>
        </AdminPanel>
        <AdminPanel title="Email placeholders" icon={<Mail />}>
          <div className="grid gap-3">
            {emailTemplates.map((email) => <div key={email.id} className="rounded-xl border border-line bg-white p-4"><strong className="text-navy">{email.trigger}</strong><p className="text-sm text-muted">{email.subject} / disabled until email provider is configured</p></div>)}
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

function AdminEmpty({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-cream p-6">
      <h3 className="text-lg font-black text-navy">{title}</h3>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}
