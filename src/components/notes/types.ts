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
  /** "click-error" renders questions as ClickErrorQuestion[] via ClickErrorPracticeQuestions; omitted/"fill" uses PracticeQuestion[] via PracticeQuestions. */
  kind?: "click-error";
  questions: PracticeQuestion[] | ClickErrorQuestion[];
  mistakes: string[];
  examTip: string;
  searchTerms: string[];
}

export interface TopicContent {
  slug: string;
  subject: "Maths" | "English";
  subjectSlug: string;
  title: string;
  description: string;
  /** Header/intro decorative glyphs; defaults to maths symbols if omitted. */
  glyphs?: string[];
  subtopics: Subtopic[];
}
