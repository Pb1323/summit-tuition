import type { ComponentType } from "react";

export type NotesTier = "Foundation" | "Standard" | "Extension";

export interface PracticeQuestion {
  id: string;
  prompt: string;
  accept: string[];
  hint: string;
}

export interface ClickErrorQuestion {
  id: string;
  instruction: string;
  words: string[];
  errorIdx: number;
  correction: string;
  hint: string;
}

/** Comprehension: click the sentence in a short passage that answers/supports the question. */
export interface EvidenceQuestion {
  id: string;
  instruction: string;
  passage: string[];
  correctIdx: number;
  correction: string;
  hint: string;
}

/** Cloze: click the correct word from a small option bank to fill a single gap. */
export interface ClozeQuestion {
  id: string;
  instruction: string;
  before: string;
  options: string[];
  correctIdx: number;
  after: string;
  correction: string;
  hint: string;
}

export interface WorkedExample {
  question: string;
  fastMethod: string;
  steps: string[];
  answer: string;
}

export interface GlossaryTerm {
  term: string;
  def: string;
}

export interface Subtopic {
  id: string;
  title: string;
  tier: NotesTier;
  objective: string;
  whyMatters: string;
  conceptTitle: string;
  conceptBullets: string[];
  conceptNote: string;
  glossary: GlossaryTerm[];
  diagramLabel: string;
  Diagram: ComponentType;
  worked: WorkedExample;
  selfCheck: { prompt: string; answer: string };
  /**
   * Which practice-question renderer + question shape this subtopic uses:
   * - omitted/"fill": PracticeQuestion[] via PracticeQuestions (free-text, self-marking)
   * - "click-error": ClickErrorQuestion[] via ClickErrorPracticeQuestions (click the wrong word — Grammar/Spelling)
   * - "click-evidence": EvidenceQuestion[] via EvidencePracticeQuestions (click the sentence that answers the question — Comprehension)
   * - "cloze-fill": ClozeQuestion[] via ClozePracticeQuestions (click the word that fills the gap — Cloze)
   */
  kind?: "click-error" | "click-evidence" | "cloze-fill";
  questions: PracticeQuestion[] | ClickErrorQuestion[] | EvidenceQuestion[] | ClozeQuestion[];
  mistakes: string[];
  examTip: string;
  searchTerms: string[];
}

export interface TopicContent {
  slug: string;
  subject: "Maths" | "English" | "VR";
  subjectSlug: string;
  title: string;
  description: string;
  /** Header/intro decorative glyphs; defaults to maths symbols if omitted. */
  glyphs?: string[];
  subtopics: Subtopic[];
}
