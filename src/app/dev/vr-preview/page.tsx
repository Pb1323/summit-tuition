"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { BookletHeader, TopicNav, QuestionPager, ExamLayout, AnswerOvals, TwoGroupWordOptions, WriteInBox, type TopicSummary, type TopicIconKind } from "@/components/dev/gl-booklet";

/** Local-only preview of GL-style VR archetypes, using the same exam-shell (topic nav + progress,
 * one question at a time, collapsible help) as /dev/nvr-preview. Original content — format/structure
 * only is inspired by research/gl-vr-nvr-question-bank.md. Not wired into the real mock pipeline yet. */

interface VrQuestion {
  stem: ReactNode;
  answer: ReactNode;
}

interface Topic {
  id: string;
  label: string;
  icon: TopicIconKind;
  instruction: string;
  example: ReactNode;
  solution: string;
  questions: VrQuestion[];
}

function TopicHelp({ topic }: { topic: Topic }) {
  return (
    <details className="mb-5 min-w-0 overflow-hidden rounded-2xl border border-gold/20 bg-white">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm font-black text-navy marker:text-blue-600">How to answer &mdash; {topic.label}</summary>
      <div className="min-w-0 border-t border-gold/10 px-4 pb-4 pt-3">
        <p className="mb-3 break-words text-sm leading-relaxed text-ink/80">{topic.instruction}</p>
        <div className="min-w-0 rounded-xl border border-dashed border-gold-dark/45 bg-cream-dark/70 p-4">
          <p className="mb-2 text-[0.62rem] font-black uppercase tracking-[0.2em] text-gold-dark">Example</p>
          {topic.example}
          <p className="mt-3 text-[0.62rem] font-black uppercase tracking-[0.2em] text-gold-dark">Solution</p>
          <p className="break-words text-sm text-ink/75">{topic.solution}</p>
        </div>
      </div>
    </details>
  );
}

export default function VrPreviewPage() {
  const letterMove = [
    { words: ["CLAP", "ART"] },
    { words: ["STORE", "OWN"] },
    { words: ["BLINK", "OW"] },
    { words: ["TRACK", "OW"] },
  ];
  const insertBridge = [{ blanks: ["SEA_ON", "REA_ON"] }, { blanks: ["B_ND", "ST_ND"] }, { blanks: ["SM_LL", "F_LL"] }, { blanks: ["GR_ND", "S_ND"] }];
  const oddOneOutTwo = [
    ["SPARROW", "EAGLE", "SALMON", "ROBIN", "TROUT"],
    ["RED", "BLUE", "CHAIR", "GREEN", "TABLE"],
    ["APPLE", "PEAR", "CARROT", "PLUM", "POTATO"],
    ["VIOLIN", "DRUM", "HAMMER", "FLUTE", "SAW"],
  ];
  const antonymPick = [
    { g1: ["hot", "tall", "empty"], g2: ["full", "narrow", "cold"] },
    { g1: ["brave", "loose", "rapid"], g2: ["tight", "timid", "slow"] },
    { g1: ["genuine", "silent", "rough"], g2: ["smooth", "noisy", "fake"] },
    { g1: ["generous", "shallow", "stale"], g2: ["fresh", "deep", "mean"] },
  ];
  const hiddenWord = [
    { sentence: "It was too far myself to walk alone.", options: ["too far", "far myself", "myself to", "to walk", "walk alone"] },
    { sentence: "Please also verify the total amount.", options: ["Please also", "also verify", "verify the", "the total", "total amount"] },
    { sentence: "That idea stood out to everyone immediately.", options: ["That idea", "idea stood", "stood out", "out to", "to everyone"] },
    { sentence: "We received extra income this month.", options: ["We received", "received extra", "extra income", "income this", "this month"] },
  ];
  const numberSeries = ["3, 7, 11, 15, ?", "2, 6, 18, 54, ?", "1, 4, 9, 16, ?", "100, 91, 83, 76, ?"];
  const alphabetSeries = ["AC, DF, GI, ?", "BD, EG, HJ, ?", "ZX, WU, TR, ?", "AB, CD, EF, ?"];
  const analogy = [
    { stem: "Big is to Small as Fast is to (A) car (B) slow (C) road", g1: ["small", "orange", "huge"], g2: ["car", "slow", "road"] },
    { stem: "Puppy is to Dog as Kitten is to ?", g1: ["dog", "bark", "bone"], g2: ["meow", "cat", "milk"] },
    { stem: "Author is to Book as Composer is to ?", g1: ["book", "pen", "library"], g2: ["music", "piano", "concert"] },
    { stem: "Fin is to Fish as Wing is to ?", g1: ["fish", "swim", "water"], g2: ["bird", "fly", "sky"] },
  ];

  const topics: Topic[] = [
    {
      id: "lettermove", label: "Move a letter", icon: "sequence",
      instruction: "One letter can be moved from the first word to the second word to make two new, real words. Which letter is it?",
      example: <p className="text-sm font-semibold text-navy">CLAP &middot; ART &rarr; move &ldquo;C&rdquo; from CLAP to get LAP, and add it to ART to get CART. Both are real words.</p>,
      solution: "Moving the first letter of CLAP (C) leaves LAP, and adding it to ART makes CART — both real words.",
      questions: letterMove.map(({ words }) => ({ stem: <>{words[0]} &middot; {words[1]}</>, answer: <AnswerOvals options={5} /> })),
    },
    {
      id: "insertletter", label: "Insert a letter", icon: "codekey",
      instruction: "The same missing letter completes both words in each pair. Write the letter in the gap.",
      example: <p className="text-sm font-semibold text-navy">C_T &middot; H_T &rarr; the letter A makes CAT and HAT.</p>,
      solution: "Inserting S completes SEASON and REASON.",
      questions: insertBridge.map(({ blanks }) => ({ stem: <>{blanks[0]} &middot; {blanks[1]}</>, answer: <WriteInBox placeholder="Letter" /> })),
    },
    {
      id: "oddoneout2", label: "Two that don't belong", icon: "oddoneout",
      instruction: "Five words are given. Three share something in common; find the two that do not belong.",
      example: <p className="text-sm font-semibold text-navy">OAK &middot; PINE &middot; ROSE &middot; BIRCH &middot; TULIP &rarr; ROSE and TULIP are flowers, not trees.</p>,
      solution: "SALMON and TROUT are fish; the other three are birds.",
      questions: oddOneOutTwo.map((words) => ({ stem: words.join(" · "), answer: <TwoGroupWordOptions groupOne={words.slice(0, 3)} groupTwo={words.slice(3)} /> })),
    },
    {
      id: "antonym", label: "Most opposite in meaning", icon: "similarity",
      instruction: "Pick one word from group A/B/C and one from group X/Y/Z that are most opposite in meaning.",
      example: <p className="text-sm font-semibold text-navy">A) up B) big C) slow — X) fast Y) down Z) huge &rarr; up and down.</p>,
      solution: "empty (C) and full (X) are most opposite in meaning.",
      questions: antonymPick.map(({ g1, g2 }) => ({ stem: <>Group A/B/C and Group X/Y/Z</>, answer: <TwoGroupWordOptions groupOne={g1} groupTwo={g2} /> })),
    },
    {
      id: "hiddenword", label: "Hidden word", icon: "matrix",
      instruction: "A four-letter word is hidden across the boundary of two neighbouring words in the sentence. Choose which two words contain it.",
      example: <p className="text-sm font-semibold text-navy">&ldquo;We will also verify the total.&rdquo; &rarr; also verify hides OVER.</p>,
      solution: "&ldquo;far myself&rdquo; hides ARMY.",
      questions: hiddenWord.map(({ sentence, options }) => ({ stem: <>&ldquo;{sentence}&rdquo;</>, answer: <AnswerOvals options={options.length} /> })),
    },
    {
      id: "numberseries", label: "Number series", icon: "rotation",
      instruction: "Work out the rule connecting these numbers, then write the next number in the series.",
      example: <p className="text-sm font-semibold text-navy">5, 10, 15, 20, ? &rarr; each number increases by 5, so the answer is 25.</p>,
      solution: "Each term increases by 4, so the missing number is 19.",
      questions: numberSeries.map((series) => ({ stem: series, answer: <WriteInBox placeholder="Number" /> })),
    },
    {
      id: "alphabetseries", label: "Alphabet series", icon: "net",
      instruction: "These letter pairs follow a positional rule based on the alphabet (A-Z shown below). Write the next pair.",
      example: <p className="text-sm font-mono text-xs text-navy/60">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>,
      solution: "Each pair starts 3 letters after the previous pair's start, so the next pair is JL.",
      questions: alphabetSeries.map((series) => ({ stem: series, answer: <WriteInBox placeholder="Letters" /> })),
    },
    {
      id: "wordanalogy", label: "Word analogies", icon: "combine3d",
      instruction: "Complete the analogy by choosing one word from each group that best matches the relationship shown.",
      example: <p className="text-sm font-semibold text-navy">Hot is to Cold as Up is to (A) Down (B) Sky (C) High &rarr; Down.</p>,
      solution: "Book (A) and Music (X): an author creates a book, a composer creates music.",
      questions: analogy.map(({ stem, g1, g2 }) => ({ stem, answer: <TwoGroupWordOptions groupOne={g1} groupTwo={g2} /> })),
    },
  ];

  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [viewed, setViewed] = useState<Set<string>>(new Set([`${topics[0].id}:0`]));

  const activeTopic = topics.find((t) => t.id === activeTopicId) ?? topics[0];
  const question = activeTopic.questions[Math.min(activeQuestion, activeTopic.questions.length - 1)];

  const topicSummaries: TopicSummary[] = topics.map((t) => ({
    id: t.id,
    label: t.label,
    icon: t.icon,
    total: t.questions.length,
    answered: t.questions.filter((_, i) => viewed.has(`${t.id}:${i}`)).length,
  }));

  const answeredInTopic = activeTopic.questions.map((_, i) => viewed.has(`${activeTopic.id}:${i}`));

  function goTo(topicId: string, questionIndex: number) {
    setActiveTopicId(topicId);
    setActiveQuestion(questionIndex);
    setViewed((prev) => new Set(prev).add(`${topicId}:${questionIndex}`));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <BookletHeader subject="Verbal Reasoning" bookletLabel="Summit Tuition &middot; Dev preview &middot; original content, GL-style format" />
      <TopicNav topics={topicSummaries} activeId={activeTopic.id} onSelect={(id) => goTo(id, 0)} />
      <TopicHelp topic={activeTopic} />
      <ExamLayout
        questionNumber={activeQuestion + 1}
        diagram={<p className="text-lg font-semibold leading-relaxed text-navy">{question.stem}</p>}
        options={question.answer}
        pager={
          <QuestionPager
            current={activeQuestion}
            total={activeTopic.questions.length}
            answered={answeredInTopic}
            onPrev={() => goTo(activeTopic.id, Math.max(0, activeQuestion - 1))}
            onNext={() => goTo(activeTopic.id, Math.min(activeTopic.questions.length - 1, activeQuestion + 1))}
            onJump={(i) => goTo(activeTopic.id, i)}
          />
        }
      />
    </main>
  );
}
