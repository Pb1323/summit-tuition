"use client";

/**
 * Reusable print template: Summit Tuition English practice paper, GL-format-accurate
 * (page size/margins/fonts measured from real GL papers - see research/gl-layout-spec.md)
 * but entirely original content and Summit's own branding, per PROJECT_CONTEXT.md.
 * Passage lines are numbered every 5 lines, matching GL's convention of referencing
 * specific lines in comprehension questions. To reuse: swap PASSAGE_LINES and QUESTIONS.
 */

const PASSAGE_LINES: string[] = [
  "Mara had never liked the attic. The stairs creaked in places that seemed to move",
  "each time she climbed them, and the single window let in only a grey, reluctant light.",
  "But her grandmother's letter had been clear: the box she wanted was under the",
  "third beam from the chimney, wrapped in an old blue curtain.",
  "",
  "It took longer to find than Mara expected. Boxes of every shape had been stacked",
  "and re-stacked over the years, forming a maze that seemed to have no logic at all —",
  "until she noticed that the dust was thinner along one particular path. She followed",
  "it, stepping carefully over a broken lampshade, and there, exactly where the letter",
  "had promised, sat a small wooden chest beneath a curtain the colour of a winter sky.",
  "",
  "The curtain was heavier than she remembered curtains being, and when she pulled it",
  "away a cloud of dust rose and caught the light from the window, turning gold for a",
  "moment before settling. The chest itself was unremarkable: plain wood, a small",
  "brass clasp gone green with age. She hesitated before opening it, not because she",
  "was afraid of what was inside, but because once she looked, the box would no",
  "longer be a mystery — and mysteries, she had learned, were sometimes worth keeping.",
];

const QUESTIONS = [
  { number: 1, prompt: "Why had Mara never liked the attic? (lines 1-2)", options: ["A It was too cold in winter", "B The stairs were unsafe and the light was poor", "C It was full of spiders", "D Her grandmother had forbidden her to go there", "E It smelled unpleasant"] },
  { number: 2, prompt: "“reluctant light” (line 2) — what does this phrase suggest?", options: ["A The light was very bright", "B The light seemed weak, as if it did not want to enter", "C There was no light at all", "D The light came from a lamp", "E The light was warm and golden"] },
  { number: 3, prompt: "What had made the boxes difficult to search through? (lines 6-8)", options: ["A They were locked", "B They had been stacked and re-stacked with no obvious order", "C They were too heavy to move", "D They were labelled in a language Mara did not know", "E They belonged to someone else"] },
  { number: 4, prompt: "How did Mara eventually find the right path through the boxes? (lines 7-9)", options: ["A She counted the beams from the chimney", "B She noticed the dust was thinner along one path", "C Her grandmother's letter gave exact directions", "D She remembered the layout from a previous visit", "E She followed a trail of curtain fabric"] },
  { number: 5, prompt: "Why does Mara hesitate before opening the chest? (lines 15-17)", options: ["A She is frightened of what might be inside", "B The clasp is too stiff to open", "C Once opened, the mystery will be gone", "D She thinks it might be the wrong chest", "E She wants to ask permission first"] },
];

export default function EnglishMockPrintPage() {
  return (
    <div className="gl-print">
      <section className="gl-print-page">
        <div className="mb-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em]">Summit Tuition &middot; Sample Paper</p>
          <h1 className="mt-2 text-2xl font-bold">English Practice Paper</h1>
        </div>
        <p className="mb-4 font-semibold">Before you begin:</p>
        <ol className="list-decimal space-y-3 pl-6 text-[13px] leading-relaxed">
          <li>Read the passage on the next page carefully. You may look back at it as often as you like while answering the questions.</li>
          <li>This is a multiple-choice paper. For each question, circle the letter next to the answer you think is correct.</li>
          <li>Some questions refer to a specific line number in the passage — the small numbers in the margin mark every fifth line.</li>
          <li>You have 30 minutes to complete this paper.</li>
        </ol>
        <p className="mt-10 text-[11px] text-gray-500">
          Original content, Summit Tuition. Format modelled on official GL Assessment practice papers for
          familiarity — see research/gl-layout-spec.md for the measured basis of this layout.
        </p>
      </section>

      <section className="gl-print-page">
        <p className="mb-4 text-[13px] font-semibold">Read this passage carefully, then answer the questions that follow.</p>
        <h2 className="mb-4 text-lg font-bold">The Attic Chest</h2>
        <div className="gl-print-passage text-[13px] leading-[1.6]">
          {PASSAGE_LINES.map((line, i) => {
            const lineNumber = i + 1;
            const showMarker = lineNumber % 5 === 0 && line !== "";
            return (
              <p key={i} className="relative m-0 pl-8">
                {showMarker && <span className="absolute left-0 text-[10px] text-gray-400">{lineNumber}.</span>}
                {line || " "}
              </p>
            );
          })}
        </div>
      </section>

      <section className="gl-print-page">
        {QUESTIONS.map((q) => (
          <div key={q.number} className="mb-6 break-inside-avoid">
            <p className="mb-2 text-[13px] font-semibold">
              {q.number}&ensp;{q.prompt}
            </p>
            <div className="text-[13px]">
              {q.options.map((opt, i) => (
                <p key={i} className="m-0 leading-[1.5]">
                  {opt}
                </p>
              ))}
            </div>
          </div>
        ))}
        <p className="mt-6 text-center text-[11px] text-gray-500">Page 3 — end of sample</p>
      </section>
    </div>
  );
}
