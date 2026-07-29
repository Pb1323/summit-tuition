"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { usePlatform } from "@/context/platform-context";
import { GlowCard, PremiumBadge, ProgressBar } from "@/components/platform/ui";
import { SPELLING_WORDS, type SpellingWord } from "@/data/spelling-bank";
import { setSpellingPile, useSpellingProgress, type SpellingPile } from "@/lib/spelling-progress";
import { cn } from "@/lib/utils";

type Mode = "pick" | "learn";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildOptions(word: SpellingWord): string[] {
  const distractors = shuffle(word.distractors).slice(0, 4);
  return shuffle([word.word, ...distractors]);
}

function ModeSwitcher({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  return (
    <div className="inline-flex rounded-full border border-line bg-white p-1">
      {(["pick", "learn"] as Mode[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-bold transition",
            mode === option ? "bg-navy text-white" : "text-navy hover:bg-cream"
          )}
        >
          {option === "pick" ? "Pick the correct spelling" : "Flashcard learn mode"}
        </button>
      ))}
    </div>
  );
}

function PickMode() {
  const [order] = useState(() => shuffle(SPELLING_WORDS));
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState(() => buildOptions(order[0]));
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(0);

  const word = order[index % order.length];

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);
    setAnswered((n) => n + 1);
    if (option === word.word) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((best) => Math.max(best, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  }

  function next() {
    const nextIndex = (index + 1) % order.length;
    setIndex(nextIndex);
    setOptions(buildOptions(order[nextIndex]));
    setSelected(null);
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-muted">
        <PremiumBadge tone="navy">Score {score}/{answered}</PremiumBadge>
        <PremiumBadge tone={streak > 0 ? "green" : "gold"}>Streak {streak}</PremiumBadge>
        <PremiumBadge>Best streak {bestStreak}</PremiumBadge>
      </div>
      <GlowCard className="p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-gold-dark">Fill the gap</p>
        <p className="mt-3 text-lg font-semibold text-navy sm:text-xl">{word.sentence}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const isCorrect = option === word.word;
            const isSelected = option === selected;
            const showState = selected !== null;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
                  !showState && "border-line bg-white text-navy hover:border-gold hover:bg-gold/5",
                  showState && isCorrect && "border-emerald-300 bg-emerald-50 text-emerald-800",
                  showState && isSelected && !isCorrect && "border-red-300 bg-red-50 text-red-700",
                  showState && !isSelected && !isCorrect && "border-line bg-white text-muted opacity-60"
                )}
              >
                <span>{option}</span>
                {showState && isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                {showState && isSelected && !isCorrect && <XCircle className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>
        {selected && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className={cn("text-sm font-bold", selected === word.word ? "text-emerald-700" : "text-red-600")}>
              {selected === word.word ? "Correct — well spotted." : `Not quite — the correct spelling is "${word.word}".`}
            </p>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy/90"
            >
              Next word
            </button>
          </div>
        )}
      </GlowCard>
    </div>
  );
}

function weightedQueue(words: SpellingWord[], piles: Record<string, SpellingPile>): SpellingWord[] {
  const weighted: SpellingWord[] = [];
  for (const word of words) {
    const pile = piles[word.id];
    const weight = pile === "learning" ? 3 : pile === "known" ? 1 : 2;
    for (let i = 0; i < weight; i++) weighted.push(word);
  }
  return shuffle(weighted);
}

function LearnMode() {
  const { currentUser } = usePlatform();
  const userId = currentUser?.id ?? "guest";
  const progress = useSpellingProgress(userId);
  const [queue, setQueue] = useState(() => weightedQueue(SPELLING_WORDS, {}));
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [seenCount, setSeenCount] = useState(0);

  const knownCount = Object.values(progress).filter((pile) => pile === "known").length;
  const learningCount = Object.values(progress).filter((pile) => pile === "learning").length;
  const untouchedCount = SPELLING_WORDS.length - knownCount - learningCount;

  const word = queue[position % queue.length];

  function mark(pile: SpellingPile) {
    setSpellingPile(userId, word.id, pile);
    setSeenCount((n) => n + 1);
    setRevealed(false);
    setPosition((p) => p + 1);
    if ((position + 1) % queue.length === 0) {
      setQueue(weightedQueue(SPELLING_WORDS, { ...progress, [word.id]: pile }));
    }
  }

  function restart() {
    setQueue(weightedQueue(SPELLING_WORDS, progress));
    setPosition(0);
    setRevealed(false);
    setSeenCount(0);
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-muted">
        <PremiumBadge tone="green">Know it {knownCount}</PremiumBadge>
        <PremiumBadge tone="gold">Still learning {learningCount}</PremiumBadge>
        <PremiumBadge tone="navy">Not seen yet {untouchedCount}</PremiumBadge>
        <PremiumBadge>Cards this session {seenCount}</PremiumBadge>
      </div>
      <ProgressBar value={(knownCount / SPELLING_WORDS.length) * 100} label="Words fully learned" />
      <GlowCard className="mt-6 p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-gold-dark">Flashcard</p>
        <p className="mt-3 text-lg font-semibold text-navy sm:text-xl">{word.sentence}</p>
        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-6 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-bold text-gold-dark transition hover:bg-gold/20"
          >
            Reveal correct spelling
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="rounded-xl bg-cream p-4 text-xl font-black tracking-wide text-navy">{word.word}</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => mark("known")}
                className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" /> I know it
              </button>
              <button
                type="button"
                onClick={() => mark("learning")}
                className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy-dark transition hover:bg-gold-light"
              >
                <Sparkles className="h-4 w-4" /> Still learning
              </button>
            </div>
          </div>
        )}
      </GlowCard>
      <button
        type="button"
        onClick={restart}
        className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted hover:text-navy"
      >
        <RotateCcw className="h-4 w-4" /> Reshuffle session
      </button>
    </div>
  );
}

export function SpellingTester() {
  const [mode, setMode] = useState<Mode>("pick");
  const wordCount = useMemo(() => SPELLING_WORDS.length, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <PremiumBadge tone="navy">Practice tool</PremiumBadge>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-navy">Spelling Tester</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Drill {wordCount} genuinely tricky 11+ spelling words. Not part of your scored mocks or reports —
            just a quick practice loop you can run as often as you like.
          </p>
        </div>
        <ModeSwitcher mode={mode} onChange={setMode} />
      </div>
      {mode === "pick" ? <PickMode /> : <LearnMode />}
    </div>
  );
}
