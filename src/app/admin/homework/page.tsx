"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Printer, Shuffle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlowCard, PremiumBadge, RequireAuth } from "@/components/platform/ui";
import { usePlatform } from "@/context/platform-context";
import type { Difficulty, Question, Subject } from "@/types/platform";

const SUBJECTS: Subject[] = ["Maths", "English"];
const DIFFICULTIES: { value: Difficulty | "any"; label: string }[] = [
  { value: "any", label: "Any difficulty" },
  { value: "foundation", label: "Foundation" },
  { value: "standard", label: "Standard" },
  { value: "stretch", label: "Stretch" },
];

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function HomeworkGeneratorPage() {
  return (
    <RequireAuth role="admin">
      <HomeworkGenerator />
    </RequireAuth>
  );
}

function HomeworkGenerator() {
  const { questions } = usePlatform();
  const [subject, setSubject] = useState<Subject>("Maths");
  const [topic, setTopic] = useState<string>("All topics");
  const [difficulty, setDifficulty] = useState<Difficulty | "any">("any");
  const [count, setCount] = useState(15);
  const [studentName, setStudentName] = useState("");
  const [worksheetTitle, setWorksheetTitle] = useState("");
  const [worksheet, setWorksheet] = useState<Question[] | null>(null);

  const topicsForSubject = useMemo(
    () => Array.from(new Set(questions.filter((question) => question.subject === subject).map((question) => question.topic))).sort(),
    [questions, subject]
  );

  const pool = useMemo(
    () =>
      questions.filter(
        (question) =>
          question.subject === subject &&
          (topic === "All topics" || question.topic === topic) &&
          (difficulty === "any" || question.difficulty === difficulty) &&
          // Homework goes home on paper — leave out diagram-only questions whose visual
          // can't be reproduced in this plain worksheet renderer (no VisualRenderer here).
          !question.visual
      ),
    [questions, subject, topic, difficulty]
  );

  function generate() {
    setWorksheet(shuffle(pool).slice(0, Math.min(count, pool.length)));
  }

  const title = worksheetTitle.trim() || `${subject} Homework${topic !== "All topics" ? ` — ${topic}` : ""}`;

  return (
    <Container className="py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy hover:border-gold">
          <ArrowLeft className="h-4 w-4" /> Back to admin
        </Link>
        {worksheet && worksheet.length > 0 && (
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-bold text-white hover:bg-navy-light">
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </button>
        )}
      </div>

      <div className="print:hidden">
        <GlowCard className="p-8">
          <PremiumBadge>Homework generator</PremiumBadge>
          <h1 className="mt-4 text-2xl font-black text-navy">Build a printable worksheet</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Pull a fresh worksheet straight from the question bank — subject, topic and difficulty — and print it as a
            ready-to-do paper pack with a separate answer key page at the end.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-bold text-navy">
              Subject
              <select
                value={subject}
                onChange={(event) => {
                  setSubject(event.target.value as Subject);
                  setTopic("All topics");
                  setWorksheet(null);
                }}
                className="mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-gold"
              >
                {SUBJECTS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-bold text-navy">
              Topic
              <select
                value={topic}
                onChange={(event) => {
                  setTopic(event.target.value);
                  setWorksheet(null);
                }}
                className="mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-gold"
              >
                <option>All topics</option>
                {topicsForSubject.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-bold text-navy">
              Difficulty
              <select
                value={difficulty}
                onChange={(event) => {
                  setDifficulty(event.target.value as Difficulty | "any");
                  setWorksheet(null);
                }}
                className="mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-gold"
              >
                {DIFFICULTIES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-bold text-navy">
              Number of questions
              <input
                type="number"
                min={5}
                max={50}
                value={count}
                onChange={(event) => setCount(Math.max(5, Math.min(50, Number(event.target.value) || 5)))}
                className="mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-gold"
              />
            </label>
            <label className="text-sm font-bold text-navy sm:col-span-2">
              Worksheet title (optional)
              <input
                type="text"
                placeholder={`${subject} Homework`}
                value={worksheetTitle}
                onChange={(event) => setWorksheetTitle(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-gold"
              />
            </label>
            <label className="text-sm font-bold text-navy sm:col-span-2">
              Student name (optional)
              <input
                type="text"
                placeholder="For the letterhead"
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-gold"
              />
            </label>
          </div>

          <p className="mt-4 text-xs font-semibold text-muted">{pool.length} matching question{pool.length === 1 ? "" : "s"} available in the bank.</p>

          <button
            onClick={generate}
            disabled={pool.length === 0}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy shadow-gold disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Shuffle className="h-4 w-4" /> Generate worksheet
          </button>
        </GlowCard>
      </div>

      {worksheet && worksheet.length > 0 && <PrintableWorksheet title={title} studentName={studentName} questions={worksheet} />}
      {worksheet && worksheet.length === 0 && (
        <p className="mt-6 text-sm font-bold text-red-700 print:hidden">No questions matched those filters — widen the topic or difficulty.</p>
      )}
    </Container>
  );
}

function PrintableWorksheet({ title, studentName, questions }: { title: string; studentName: string; questions: Question[] }) {
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="gl-print mt-8">
      <div className="gl-print-page p-10">
        <WorksheetLetterhead title={title} studentName={studentName} today={today} questionCount={questions.length} />
        <ol className="mt-8 space-y-7">
          {questions.map((question, index) => (
            <li key={question.id} className="break-inside-avoid">
              <div className="flex items-baseline gap-3">
                <span className="text-base font-black text-gold-dark">{index + 1}.</span>
                <div className="flex-1">
                  <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-ink">{question.text}</p>
                  {question.options && question.options.length > 0 ? (
                    <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                      {question.options.map((option, optionIndex) => (
                        <p key={option} className="text-[13px] text-ink">
                          <span className="font-bold">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 border-b border-dotted border-ink/40 pb-4" aria-hidden="true" />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="gl-print-page p-10">
        <div className="border-b border-navy/20 pb-3">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold-dark">Summit Tuition &middot; Answer key</p>
          <h2 className="mt-1 text-xl font-black text-navy">{title} — Answers</h2>
        </div>
        <ol className="mt-6 space-y-4">
          {questions.map((question, index) => (
            <li key={question.id} className="break-inside-avoid rounded-lg border border-line bg-cream/40 p-3">
              <p className="text-sm font-bold text-navy">
                {index + 1}. {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(", ") : question.correctAnswer}
              </p>
              {question.markScheme && <p className="mt-1 text-xs text-muted">{question.markScheme}</p>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function WorksheetLetterhead({ title, studentName, today, questionCount }: { title: string; studentName: string; today: string; questionCount: number }) {
  return (
    <div className="border-b-2 border-gold/40 pb-5">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-gold-dark">Summit Tuition &middot; Homework Practice</p>
      <h1 className="mt-1 font-serif text-3xl font-black text-navy">{title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-ink">
        <span>
          <span className="font-bold">Name:</span> {studentName || "________________________"}
        </span>
        <span>
          <span className="font-bold">Date:</span> {today}
        </span>
        <span>
          <span className="font-bold">Questions:</span> {questionCount}
        </span>
      </div>
    </div>
  );
}
