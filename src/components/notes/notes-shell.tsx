"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getNotesTheme, NOTES_GOLD, type NotesThemeMode } from "./notes-theme";
import { loadTopicProgress, saveTopicProgress } from "./notes-progress";
import {
  TierBadge,
  WhyMatters,
  ConceptCard,
  GlossaryStrip,
  DiagramFrame,
  WorkedExampleBlock,
  SelfCheckBlock,
  PracticeQuestions,
  ClickErrorPracticeQuestions,
  EvidencePracticeQuestions,
  ClozePracticeQuestions,
  MistakeBox,
  ExamTipBox,
} from "./notes-blocks";
import type { TopicContent, PracticeQuestion, ClickErrorQuestion, EvidenceQuestion, ClozeQuestion } from "./types";

const GLYPHS = ["π", "∑", "√", "∞", "Δ", "÷", "×"];

function useIsMobile(ref: React.RefObject<HTMLElement | null>) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setIsMobile(w < 860);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return isMobile;
}

export function NotesTopicPage({ topic }: { topic: TopicContent }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const isMobile = useIsMobile(scrollRef);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState<NotesThemeMode>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(topic.subtopics[0]?.id ?? "");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({ intro: true });
  const [progress, setProgress] = useState<Record<string, { correct: number; total: number }>>({});

  const [timerRemaining, setTimerRemaining] = useState(600);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerExpanded, setTimerExpanded] = useState(false);

  const t = getNotesTheme(theme);

  // Restore saved mastery progress for this topic once mounted (after hydration, to avoid an SSR/client mismatch).
  useEffect(() => {
    const saved = loadTopicProgress(topic.slug);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration-safe restore from localStorage, not a render-time derivation
    if (Object.keys(saved).length > 0) setProgress(saved);
  }, [topic.slug]);

  useEffect(() => {
    if (Object.keys(progress).length > 0) saveTopicProgress(topic.slug, progress);
  }, [topic.slug, progress]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-reveal-id");
            if (id) setRevealed((s) => (s[id] ? s : { ...s, [id]: true }));
          }
        });
      },
      { root, threshold: 0.12 }
    );
    if (introRef.current) {
      introRef.current.setAttribute("data-reveal-id", "intro");
      io.observe(introRef.current);
    }
    topic.subtopics.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) {
        el.setAttribute("data-reveal-id", s.id);
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [topic.subtopics]);

  useEffect(() => {
    if (!timerRunning || timerRemaining <= 0) return;
    const id = window.setTimeout(() => setTimerRemaining((v) => v - 1), 1000);
    return () => window.clearTimeout(id);
  }, [timerRunning, timerRemaining]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight || 1;
    const pct = Math.min(100, Math.max(0, (el.scrollTop / max) * 100));
    setScrollProgress((prev) => (prev === pct ? prev : pct));
    const pastThreshold = el.scrollTop > 500;
    setShowBackToTop((prev) => (prev === pastThreshold ? prev : pastThreshold));

    let best: string | null = null;
    let bestDist = Infinity;
    const wrapRect = el.getBoundingClientRect();
    topic.subtopics.forEach((s) => {
      const sec = sectionRefs.current[s.id];
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const relTop = rect.top - wrapRect.top;
      const dist = Math.abs(relTop - 105);
      if (relTop < el.clientHeight * 0.6 && dist < bestDist) {
        bestDist = dist;
        best = s.id;
      }
    });
    if (best) {
      const nextActive = best;
      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    }
  }, [topic.subtopics]);

  const updateProgress = useCallback((id: string, correct: number, total: number) => {
    setProgress((p) => {
      const prev = p[id];
      if (prev && prev.correct === correct && prev.total === total) return p;
      return { ...p, [id]: { correct, total } };
    });
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
    setMobileNavOpen(false);
  }, []);

  const glyphs = topic.glyphs ?? GLYPHS;
  const headerSymbols = useMemo(
    () =>
      glyphs.slice(0, 6).map((g, i) => ({
        glyph: g,
        style: {
          position: "absolute" as const,
          left: `${8 + i * 16}%`,
          top: `${10 + (i % 3) * 22}%`,
          fontSize: `${20 + (i % 3) * 8}px`,
          color: NOTES_GOLD,
          opacity: 0.14,
          fontFamily: "var(--font-serif)",
          animation: `ntdriftsym ${10 + i * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.7}s`,
        },
      })),
    [glyphs]
  );

  const searchQ = searchQuery.trim().toLowerCase();
  const matches = useCallback(
    (subId: string) => {
      if (!searchQ) return true;
      const s = topic.subtopics.find((x) => x.id === subId);
      if (!s) return true;
      return (
        s.searchTerms.some((w) => w.includes(searchQ)) || s.title.toLowerCase().includes(searchQ)
      );
    },
    [searchQ, topic.subtopics]
  );

  const mm = Math.floor(timerRemaining / 60).toString().padStart(2, "0");
  const ss = (timerRemaining % 60).toString().padStart(2, "0");
  const activeTitle = topic.subtopics.find((s) => s.id === activeSection)?.title ?? "";

  return (
    <div
      className="relative h-screen w-full overflow-hidden font-sans transition-colors duration-500"
      style={{ background: t.pageBg }}
    >
      {/* progress wave */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[400] h-[3px] overflow-hidden">
        <div className="h-full" style={{ background: "rgba(10,31,68,0.08)" }}>
          <div
            className="h-full transition-[width] duration-150"
            style={{ width: `${scrollProgress}%`, background: NOTES_GOLD }}
          />
        </div>
      </div>

      {isMobile && mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="absolute inset-0 z-[200] backdrop-blur-[2px]"
          style={{ background: "rgba(10,31,68,0.55)" }}
        />
      )}

      <div ref={scrollRef} onScroll={handleScroll} className="notes-scrollwrap absolute inset-0 overflow-y-auto overflow-x-hidden">
        {/* header */}
        <header
          className="sticky top-0 z-[100] overflow-hidden shadow-[0_8px_30px_rgba(10,31,68,0.35)]"
          style={{ background: "linear-gradient(180deg,#0A1F44,#0d2452)" }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
            {headerSymbols.map((sym, i) => (
              <div key={i} style={sym.style}>
                {sym.glyph}
              </div>
            ))}
          </div>

          <div className="relative z-[2] mx-auto max-w-[1400px] px-8 pt-[15px]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-xl border-[1.5px] text-[1.25em] font-bold font-serif"
                  style={{
                    borderColor: NOTES_GOLD,
                    color: NOTES_GOLD,
                    background: "linear-gradient(160deg,rgba(201,162,75,0.18),rgba(201,162,75,0.04))",
                  }}
                >
                  S
                </div>
                <div>
                  <div className="font-serif text-[1.3em] font-bold leading-tight tracking-wide text-[#F8F5EE]">
                    Summit Tuition
                  </div>
                  <div className="mt-0.5 text-[0.64em] font-semibold uppercase tracking-[0.2em]" style={{ color: NOTES_GOLD }}>
                    11+ Preparation &middot; {topic.title}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md"
                  style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(201,162,75,0.3)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-none">
                    <circle cx="11" cy="11" r="7" stroke={NOTES_GOLD} strokeWidth="2" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke={NOTES_GOLD} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search this document…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[150px] bg-transparent text-[0.78em] text-[#F8F5EE] outline-none placeholder:text-[#F8F5EE]/50"
                  />
                </div>
                <button
                  onClick={() => setTheme((v) => (v === "focus" ? "default" : "focus"))}
                  title="Toggle focus mode"
                  className="rounded-full border px-3 py-1.5 text-[0.75em] font-bold text-[#F8F5EE] backdrop-blur-md transition"
                  style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(201,162,75,0.3)" }}
                >
                  {theme === "focus" ? "☀" : "☽"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="rounded-full border px-3 py-1.5 text-[0.75em] font-extrabold text-[#0A1F44]"
                  style={{ background: "linear-gradient(135deg,#C9A24B,#e0bd6c)", borderColor: NOTES_GOLD }}
                >
                  ⬇ Export
                </button>
                {isMobile && (
                  <button
                    onClick={() => setMobileNavOpen((v) => !v)}
                    className="rounded-full border px-2.5 py-1 text-[0.95em] text-[#F8F5EE] backdrop-blur-md"
                    style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(201,162,75,0.3)" }}
                  >
                    ☰
                  </button>
                )}
              </div>
            </div>

            <div
              className="mt-2.5 flex items-center gap-2 border-t py-2 text-[0.74em] text-[#F8F5EE]/65"
              style={{ borderColor: "rgba(201,162,75,0.25)" }}
            >
              <Link href={`/notes/${topic.subjectSlug}`} className="hover:text-[#F8F5EE]">
                {topic.title}
              </Link>
              <span style={{ color: NOTES_GOLD }}>›</span>
              <span className="font-semibold text-[#F8F5EE]">{activeTitle}</span>
              <span className="ml-auto font-mono" style={{ color: NOTES_GOLD }}>
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>
        </header>

        <div className="relative mx-auto flex max-w-[1400px] items-start gap-0 px-8">
          {/* sidebar */}
          <aside
            className={
              isMobile
                ? "absolute top-0 z-[300] h-full w-[300px] shadow-[10px_0_40px_rgba(0,0,0,0.3)] transition-[left] duration-300"
                : "sticky top-[100px] max-h-[calc(100vh-125px)] w-[250px] flex-none overflow-y-auto"
            }
            style={isMobile ? { left: mobileNavOpen ? 0 : "-320px" } : undefined}
          >
            <div
              className="rounded-[18px] border px-[18px] py-5 shadow-[0_4px_20px_rgba(10,31,68,0.06)]"
              style={{ background: t.sidebarBg, borderColor: t.hairline, height: isMobile ? "100%" : "auto" }}
            >
              <div className="mb-[18px] flex items-center justify-between">
                <div className="font-serif text-[1em] font-semibold" style={{ color: t.headline }}>
                  Contents
                </div>
                {isMobile && (
                  <button onClick={() => setMobileNavOpen(false)} className="text-[1.3em]" style={{ color: t.subtext }}>
                    ×
                  </button>
                )}
              </div>

              {topic.subtopics.map((s) => {
                const p = progress[s.id];
                const correct = p?.correct ?? 0;
                const total = p?.total ?? s.questions.length;
                const complete = total > 0 && correct === total;
                const isActive = activeSection === s.id;
                const circumference = 2 * Math.PI * 15.5;
                const dash = `${(correct / Math.max(1, total)) * circumference} ${circumference}`;
                return (
                  <div key={s.id} className="mb-[22px]">
                    <div
                      onClick={() => scrollToSection(s.id)}
                      className="flex cursor-pointer items-center gap-2.5 rounded-[10px] p-1.5 transition-colors"
                      style={{ background: isActive ? "rgba(201,162,75,0.1)" : "transparent" }}
                    >
                      <svg width="30" height="30" viewBox="0 0 36 36" className="flex-none">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke={t.ringTrack} strokeWidth="3" />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.5"
                          fill="none"
                          stroke={NOTES_GOLD}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={dash}
                          transform="rotate(-90 18 18)"
                          style={{ transition: "stroke-dasharray 0.5s ease" }}
                        />
                        {complete ? (
                          <text x="18" y="23" textAnchor="middle" fontSize="13" fill={NOTES_GOLD} fontWeight={700}>
                            ✓
                          </text>
                        ) : (
                          <text x="18" y="22.5" textAnchor="middle" fontSize="10.5" fill={t.subtext} fontFamily="var(--font-mono)">
                            {correct}/{total}
                          </text>
                        )}
                      </svg>
                      <div className="min-w-0 flex-1">
                        <div
                          className="truncate text-[0.86em] font-bold"
                          style={{ color: isActive ? NOTES_GOLD : t.headline }}
                        >
                          {s.title}
                        </div>
                        <div className="mt-0.5 text-[0.68em]" style={{ color: t.subtext }}>
                          {s.tier}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* main content */}
          <main className="min-w-0 flex-1 py-5 pb-[100px]">
            <div
              ref={introRef}
              className="relative mb-5 overflow-hidden rounded-[20px] border p-6 shadow-[0_8px_28px_rgba(10,31,68,0.07)] transition-all duration-700"
              style={{
                background: t.cardBg,
                borderColor: t.hairline,
                opacity: revealed.intro ? 1 : 0,
                transform: revealed.intro ? "translateY(0)" : "translateY(26px)",
              }}
            >
              <div className="text-[0.72em] font-bold uppercase tracking-wider" style={{ color: NOTES_GOLD }}>
                Topic Overview
              </div>
              <h1 className="my-2 font-serif text-[2.1em] font-bold" style={{ color: t.headline }}>
                {topic.title}
              </h1>
              <p className="max-w-[760px] text-[0.95em] leading-relaxed" style={{ color: t.body }}>
                {topic.description}
              </p>
            </div>

            {topic.subtopics.map((s, i) => {
              const on = !!revealed[s.id];
              const matched = matches(s.id);
              return (
                <section
                  key={s.id}
                  ref={(el) => {
                    sectionRefs.current[s.id] = el;
                  }}
                  className="mb-14 scroll-mt-[115px] transition-all duration-700"
                  style={{
                    opacity: !matched ? 0.32 : on ? 1 : 0,
                    transform: on ? "translateY(0)" : "translateY(26px)",
                    border: searchQ && matched ? `2px solid ${NOTES_GOLD}` : "2px solid transparent",
                    borderRadius: "18px",
                    padding: searchQ && matched ? "16px" : "0px",
                  }}
                >
                  <div className="mb-1.5 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="text-[0.7em] font-bold uppercase tracking-wider" style={{ color: NOTES_GOLD }}>
                        Subtopic {i + 1}
                      </div>
                      <h2 className="mt-1 font-serif text-[1.9em] font-bold" style={{ color: t.headline }}>
                        {s.title}
                      </h2>
                    </div>
                    <TierBadge tier={s.tier} />
                  </div>
                  <p
                    className="my-3.5 border-l-[3px] pl-3.5 text-[0.92em] leading-relaxed"
                    style={{ color: t.subtext, borderColor: NOTES_GOLD }}
                  >
                    {s.objective}
                  </p>
                  <WhyMatters>{s.whyMatters}</WhyMatters>

                  <ConceptCard theme={t} title={s.conceptTitle} bullets={s.conceptBullets} note={s.conceptNote} />
                  <GlossaryStrip theme={t} terms={s.glossary} />

                  <DiagramFrame theme={t} label={s.diagramLabel}>
                    <s.Diagram />
                  </DiagramFrame>

                  <WorkedExampleBlock theme={t} worked={s.worked} />

                  <div className="mt-6">
                    <SelfCheckBlock theme={t} prompt={s.selfCheck.prompt} answer={s.selfCheck.answer} />
                    {s.kind === "click-error" ? (
                      <ClickErrorPracticeQuestions
                        theme={t}
                        questions={s.questions as ClickErrorQuestion[]}
                        onProgress={(correct, total) => updateProgress(s.id, correct, total)}
                      />
                    ) : s.kind === "click-evidence" ? (
                      <EvidencePracticeQuestions
                        theme={t}
                        questions={s.questions as EvidenceQuestion[]}
                        onProgress={(correct, total) => updateProgress(s.id, correct, total)}
                      />
                    ) : s.kind === "cloze-fill" ? (
                      <ClozePracticeQuestions
                        theme={t}
                        questions={s.questions as ClozeQuestion[]}
                        onProgress={(correct, total) => updateProgress(s.id, correct, total)}
                      />
                    ) : (
                      <PracticeQuestions
                        theme={t}
                        questions={s.questions as PracticeQuestion[]}
                        onProgress={(correct, total) => updateProgress(s.id, correct, total)}
                      />
                    )}
                  </div>

                  <MistakeBox theme={t} mistakes={s.mistakes} />
                  <ExamTipBox theme={t} tip={s.examTip} />
                </section>
              );
            })}

            <div className="pb-2.5 pt-7 text-center text-[0.72em] tracking-wide" style={{ color: t.subtext }}>
              — End of {topic.title} module &middot; Summit Tuition —
            </div>
          </main>
        </div>
      </div>

      {/* timer widget */}
      <div
        className="absolute bottom-[26px] right-[26px] z-[150] overflow-hidden rounded-[18px] border shadow-[0_10px_34px_rgba(10,31,68,0.4)] backdrop-blur-md"
        style={{ background: "rgba(10,31,68,0.92)", borderColor: "rgba(201,162,75,0.4)" }}
      >
        <div onClick={() => setTimerExpanded((v) => !v)} className="flex cursor-pointer items-center gap-2.5 px-4 py-3">
          <span className="text-[1.1em]">⏱</span>
          <span className="font-mono text-[1em] font-bold text-[#F8F5EE]">
            {mm}:{ss}
          </span>
        </div>
        {timerExpanded && (
          <div className="flex gap-2 px-4 pb-3.5">
            <button
              onClick={() => setTimerRunning((v) => !v)}
              className="flex-1 rounded-[10px] border px-0 py-2 text-[0.76em] font-bold text-[#F8F5EE]"
              style={{ background: "rgba(201,162,75,0.12)", borderColor: "rgba(201,162,75,0.4)" }}
            >
              {timerRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => {
                setTimerRemaining(600);
                setTimerRunning(false);
              }}
              className="flex-1 rounded-[10px] border px-0 py-2 text-[0.76em] font-bold text-[#F8F5EE]"
              style={{ background: "rgba(201,162,75,0.12)", borderColor: "rgba(201,162,75,0.4)" }}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* back to top */}
      <button
        onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-[26px] z-[150] flex h-11 w-11 items-center justify-center rounded-full border text-[1.1em] font-extrabold text-[#0A1F44] shadow-[0_6px_20px_rgba(10,31,68,0.3)] transition-all duration-300"
        style={{
          bottom: timerExpanded ? "130px" : "96px",
          background: "linear-gradient(135deg,#C9A24B,#e0bd6c)",
          borderColor: "rgba(201,162,75,0.5)",
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
      >
        ↑
      </button>
    </div>
  );
}
