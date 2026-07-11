export type Role = "student" | "admin";
export type Subject = "English" | "Maths" | "VR" | "NVR";
export type ReferenceStyle = "GL-style" | "non-GL" | "unknown";
export type Difficulty = "foundation" | "standard" | "stretch";
export type MockDifficulty = "Standard" | "GL+" | "Summit Stretch";
export type QuestionType =
  | "multiple_choice"
  | "short_number"
  | "multi_step"
  | "table_graph"
  | "word_problem"
  | "geometry"
  | "reading_comprehension"
  | "vocabulary"
  | "inference"
  | "retrieval"
  | "language_analysis"
  | "grammar"
  | "punctuation"
  | "cloze"
  | "synonyms_antonyms"
  | "future_vr"
  | "future_nvr";

export type ErrorPattern = "careless_error" | "concept_gap" | "timing_pressure";

export type AttemptStatus = "in_progress" | "submitted" | "marked" | "report_released";
export type PaymentStatus = "none" | "pending" | "paid" | "refunded";

export interface StudentAccount {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: Role;
  approved: boolean;
  plan: string;
  paymentStatus: PaymentStatus;
  unlockedMockIds: string[];
  createdAt: string;
}

export interface QuestionVisual {
  type:
    | "bar_chart"
    | "barChart"
    | "line_graph"
    | "lineGraph"
    | "table"
    | "number_line"
    | "numberLine"
    | "coordinate_grid"
    | "coordinateGrid"
    | "shape"
    | "geometry"
    | "fraction"
    | "ratioBlocks"
    | "venn"
    | "clock"
    | "sequence"
    | "nvr_matrix"
    | "nvrMatrix"
    | "nvr_sequence"
    | "nvrSequence"
    | "nvr_oddoneout"
    | "nvrOddOneOut"
    | "nvr_pairanalogy"
    | "nvrPairAnalogy"
    | "nvr_similarity"
    | "nvrSimilarity"
    | "nvr_codekey"
    | "nvrCodeKey"
    | "nvr_rotation"
    | "nvrRotation"
    | "nvr_net"
    | "nvrNet"
    | "nvr_combine3d"
    | "nvrCombine3d"
    | "nvr_holepunch"
    | "nvrHolePunch"
    | "vr_code"
    | "vrCode";
  title: string;
  /** Payload shape depends on `type` — validated at render time in question-visuals.tsx, not by this type. */
  data: Record<string, unknown>;
}

export interface Question {
  id: string;
  subject: Subject;
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
  questionType: QuestionType;
  passageId?: string;
  paragraphRefs?: number[];
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  markScheme: string;
  explanation: string;
  marks: number;
  visual?: QuestionVisual;
  tags: string[];
  timeEstimateSeconds: number;
  sourceStyle?: ReferenceStyle;
  originalGenerated?: boolean;
}

export interface Passage {
  id: string;
  title: string;
  source: "original";
  text: string;
  paragraphs?: string[];
}

export interface MockExam {
  id: string;
  title: string;
  subject: Subject;
  style: ReferenceStyle;
  difficultyLabel?: MockDifficulty;
  sourceProfileId?: string;
  generatedFromReferenceId?: string;
  topicMix?: Record<string, number>;
  durationMinutes: number;
  totalMarks: number;
  questionIds: string[];
  published: boolean;
  releaseDate: string;
  tier: string;
  description: string;
}

export interface Attempt {
  id: string;
  studentId: string;
  mockId: string;
  answers: Record<string, string>;
  flaggedQuestionIds: string[];
  score: number;
  maxScore: number;
  submittedAt?: string;
  timeSpentSeconds: number;
  status: AttemptStatus;
  adminFeedback: string;
  weakTopics: string[];
  reportReady: boolean;
  errorPatterns?: Record<string, ErrorPattern>;
}

export interface ReferenceSource {
  id: string;
  title: string;
  url: string;
  subject: Subject;
  style: ReferenceStyle;
  notes: string;
  lastAnalysedAt: string;
  topicStyleProfile?: {
    formatNotes: string;
    timingNotes: string;
    topicMix: Record<string, number>;
    difficultyNotes: string;
  };
}

export interface ProductPlan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  badge?: string;
  description: string;
}

export interface EmailTemplate {
  id: string;
  trigger: string;
  subject: string;
  enabled: boolean;
}
