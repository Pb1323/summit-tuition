import type { MockDifficulty, MockExam, Passage, Question, ReferenceSource, Subject } from "@/types/platform";

export type GenerateMockInput = {
  subject: Extract<Subject, "Maths" | "English">;
  difficultyLabel: MockDifficulty;
  questionCount: number;
  durationMinutes: number;
  reference: ReferenceSource;
  title?: string;
};

export type GeneratedMockResult = {
  mock: MockExam;
  questions: Question[];
  passages: Passage[];
};

export function calculateTopicDistribution(subject: Subject, questionCount: number) {
  const mathsWeights = [
    ["Arithmetic", 0.18],
    ["Fractions", 0.16],
    ["Percentages", 0.12],
    ["Ratio", 0.12],
    ["Algebra basics", 0.1],
    ["Geometry", 0.14],
    ["Data handling", 0.12],
    ["Multi-step reasoning", 0.06],
  ] as const;

  const englishWeights = [
    ["Retrieval", 0.16],
    ["Inference", 0.24],
    ["Vocabulary", 0.2],
    ["Language analysis", 0.14],
    ["Grammar", 0.1],
    ["Punctuation", 0.06],
    ["Cloze", 0.1],
  ] as const;

  const weights = subject === "Maths" ? mathsWeights : englishWeights;
  return Object.fromEntries(weights.map(([topic, weight]) => [topic, Math.max(1, Math.round(questionCount * weight))]));
}

export function createMarkScheme(steps: string[]) {
  return steps.join(" ");
}

export function createExplanations(topic: string, advice: string) {
  return `${topic}: ${advice}`;
}

export function detectWeakTopics(questions: Question[], answers: Record<string, string>) {
  const misses = new Map<string, number>();
  for (const question of questions) {
    const expected = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
    const answer = (answers[question.id] ?? "").trim().toLowerCase();
    const correct = expected.some((item) => item.trim().toLowerCase() === answer);
    if (!correct) misses.set(question.topic, (misses.get(question.topic) ?? 0) + question.marks);
  }
  return Array.from(misses.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([topic]) => topic);
}

export function generateMockFromReferenceProfile(input: GenerateMockInput): GeneratedMockResult {
  if (input.reference.style !== "GL-style") {
    throw new Error("Only GL-style reference profiles can generate v1 mocks.");
  }
  return input.subject === "Maths" ? generateMathsGLStyleMock(input) : generateEnglishGLStyleMock(input);
}

export function generateMathsGLStyleMock(input: GenerateMockInput): GeneratedMockResult {
  const suffix = `${Date.now()}`;
  const allQuestions = mathsTemplates(suffix, input.difficultyLabel).slice(0, input.questionCount);
  const topicMix = calculateTopicDistribution("Maths", allQuestions.length);
  const totalMarks = allQuestions.reduce((sum, question) => sum + question.marks, 0);

  return {
    passages: [],
    questions: allQuestions,
    mock: {
      id: `maths-gl-stretch-${suffix}`,
      title: input.title || "Maths GL-Style Summit Stretch Draft",
      subject: "Maths",
      style: "GL-style",
      difficultyLabel: input.difficultyLabel,
      sourceProfileId: input.reference.id,
      generatedFromReferenceId: input.reference.id,
      topicMix,
      durationMinutes: input.durationMinutes,
      totalMarks,
      questionIds: allQuestions.map((question) => question.id),
      published: false,
      releaseDate: new Date().toISOString().slice(0, 10),
      tier: "Admin draft",
      description: "Original online-only Maths draft using GL-style topic coverage with Summit Stretch wording and multi-step reasoning.",
    },
  };
}

export function generateEnglishGLStyleMock(input: GenerateMockInput): GeneratedMockResult {
  const suffix = `${Date.now()}`;
  const passageId = `passage-clockmaker-${suffix}`;
  const passage: Passage = {
    id: passageId,
    title: "The Clockmaker's Window",
    source: "original",
    paragraphs: [
      "Every morning, Elian passed the clockmaker's shop on the corner of Vale Street, and every morning the display was different. The brass watches lay in new circles, the silver chains crossed in new patterns, and the largest clock always pointed to a time that had not yet arrived.",
      "The shop had been closed for years. Dust filmed the blue door, and a faded card in the window promised repairs while you wait. Still, behind the glass, something seemed to be arranging itself with meticulous care.",
      "On Thursday, Elian noticed a miniature train beside the clocks. Its carriages were no longer than his thumb, but each one carried a folded paper star. The final star was blue, the exact blue of the scarf his sister had lost the week before.",
      "He leaned closer. For a moment, the reflection in the window showed not the street behind him, but a narrow room crowded with ticking shelves. Then the church bell struck eight, and the ordinary pavement returned.",
      "Elian did not open the door. He wrote the time in his notebook, drew the train as carefully as he could, and walked to school with the uneasy feeling that someone was leaving him instructions.",
    ],
    text: "",
  };
  passage.text = passage.paragraphs?.join("\n\n") ?? "";

  const questions = englishTemplates(suffix, passageId, input.difficultyLabel).slice(0, input.questionCount);
  const topicMix = calculateTopicDistribution("English", questions.length);
  const totalMarks = questions.reduce((sum, question) => sum + question.marks, 0);

  return {
    passages: [passage],
    questions,
    mock: {
      id: `english-gl-stretch-${suffix}`,
      title: input.title || "English GL-Style Summit Stretch Draft",
      subject: "English",
      style: "GL-style",
      difficultyLabel: input.difficultyLabel,
      sourceProfileId: input.reference.id,
      generatedFromReferenceId: input.reference.id,
      topicMix,
      durationMinutes: input.durationMinutes,
      totalMarks,
      questionIds: questions.map((question) => question.id),
      published: false,
      releaseDate: new Date().toISOString().slice(0, 10),
      tier: "Admin draft",
      description: "Original comprehension-led English draft with GL-style retrieval, inference, vocabulary, grammar and cloze coverage.",
    },
  };
}

function mathsTemplates(suffix: string, difficultyLabel: MockDifficulty): Question[] {
  const difficulty = difficultyLabel === "Summit Stretch" ? "stretch" : "standard";
  return [
    {
      id: `gen-maths-ratio-${suffix}`,
      subject: "Maths",
      topic: "Ratio",
      subtopic: "Changing ratio",
      difficulty,
      questionType: "multi_step",
      text: "A club has juniors and seniors in the ratio 5:3. There are 24 seniors. After 16 more juniors join, what is the new ratio of juniors to seniors?",
      options: ["7:3", "8:3", "3:2", "9:4"],
      correctAnswer: "7:3",
      marks: 2,
      markScheme: createMarkScheme(["3 parts = 24, so 1 part = 8.", "Juniors originally = 5 x 8 = 40.", "New juniors = 56, seniors = 24.", "56:24 simplifies to 7:3."]),
      explanation: createExplanations("Ratio", "Find one part before changing the quantity, then simplify the new ratio."),
      tags: ["ratio", "multi-step", "GL-style", "Summit Stretch"],
      timeEstimateSeconds: 150,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-maths-data-${suffix}`,
      subject: "Maths",
      topic: "Data handling",
      subtopic: "Table and mean",
      difficulty,
      questionType: "table_graph",
      text: "The table shows points scored over four games. The mean score was 18. What was the missing score in Game 4?",
      options: ["16", "17", "18", "19"],
      correctAnswer: "17",
      marks: 2,
      visual: { type: "table", title: "Tournament scores", data: { headers: ["Game", "1", "2", "3", "4"], rows: [["Points", "21", "15", "19", "?"]] } },
      markScheme: createMarkScheme(["Mean 18 over 4 games gives total 72.", "Known scores total 21 + 15 + 19 = 55.", "Missing score = 72 - 55 = 17."]),
      explanation: createExplanations("Data handling", "Use the mean to find the total first, then subtract the known values."),
      tags: ["data", "mean", "table", "GL-style"],
      timeEstimateSeconds: 135,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-maths-geometry-${suffix}`,
      subject: "Maths",
      topic: "Geometry",
      subtopic: "Compound perimeter",
      difficulty,
      questionType: "geometry",
      text: "A compound shape is made from two rectangles. Use the labelled sides to find the perimeter.",
      correctAnswer: "34",
      marks: 2,
      visual: { type: "shape", title: "Compound rectilinear shape", data: { width: 10, height: 7, cutWidth: 4, cutHeight: 3 } },
      markScheme: createMarkScheme(["Trace all outside edges carefully.", "The missing short sides are 4 cm and 3 cm.", "Perimeter = 10 + 4 + 4 + 3 + 6 + 7 = 34 cm."]),
      explanation: createExplanations("Geometry", "Do not calculate area; perimeter is the distance around the outside."),
      tags: ["geometry", "perimeter", "compound shape", "GL-style"],
      timeEstimateSeconds: 150,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-maths-sequence-${suffix}`,
      subject: "Maths",
      topic: "Algebra basics",
      subtopic: "Sequences",
      difficulty,
      questionType: "multiple_choice",
      text: "The 2nd term of a sequence is 11 and the 5th term is 26. The sequence increases by the same amount each time. What is the 8th term?",
      options: ["36", "38", "41", "44"],
      correctAnswer: "41",
      marks: 2,
      markScheme: createMarkScheme(["From term 2 to term 5 is 3 steps.", "26 - 11 = 15, so each step is 5.", "Term 8 is 3 more steps after term 5: 26 + 15 = 41."]),
      explanation: createExplanations("Sequences", "Use the gap between known terms to find the step size."),
      tags: ["algebra", "sequences", "GL-style"],
      timeEstimateSeconds: 135,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-maths-percent-${suffix}`,
      subject: "Maths",
      topic: "Percentages",
      subtopic: "Reverse-style comparison",
      difficulty,
      questionType: "word_problem",
      text: "A £60 jacket is reduced by 20%, then the sale price is increased by 15%. What is the final price?",
      options: ["£52.80", "£54.00", "£55.20", "£57.00"],
      correctAnswer: "£55.20",
      marks: 2,
      markScheme: createMarkScheme(["20% off £60 leaves 80%, so £60 x 0.8 = £48.", "Increase by 15% means multiply by 1.15.", "£48 x 1.15 = £55.20."]),
      explanation: createExplanations("Percentages", "Successive percentage changes are applied one after the other, not added together."),
      tags: ["percentages", "money", "multi-step", "GL-style"],
      timeEstimateSeconds: 150,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
  ];
}

function englishTemplates(suffix: string, passageId: string, difficultyLabel: MockDifficulty): Question[] {
  const difficulty = difficultyLabel === "Summit Stretch" ? "stretch" : "standard";
  return [
    {
      id: `gen-eng-retrieval-${suffix}`,
      subject: "English",
      topic: "Retrieval",
      subtopic: "Precise detail",
      difficulty,
      questionType: "retrieval",
      passageId,
      paragraphRefs: [1],
      text: "What changed in the clockmaker's window every morning?",
      options: ["The display", "The blue door", "The street name", "The church bell"],
      correctAnswer: "The display",
      marks: 1,
      markScheme: "Award 1 mark for identifying that the display changed each morning.",
      explanation: "The first paragraph says the display was different every morning.",
      tags: ["retrieval", "comprehension", "GL-style"],
      timeEstimateSeconds: 60,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-eng-vocab-${suffix}`,
      subject: "English",
      topic: "Vocabulary",
      subtopic: "Meaning in context",
      difficulty,
      questionType: "vocabulary",
      passageId,
      paragraphRefs: [2],
      text: "Which word is closest in meaning to 'meticulous' as it is used in paragraph 2?",
      options: ["careless", "secret", "careful", "sudden"],
      correctAnswer: "careful",
      marks: 1,
      markScheme: "Meticulous means very careful and precise.",
      explanation: "The display seems arranged with exact, careful attention.",
      tags: ["vocabulary", "context", "GL-style"],
      timeEstimateSeconds: 70,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-eng-inference-${suffix}`,
      subject: "English",
      topic: "Inference",
      subtopic: "Character response",
      difficulty,
      questionType: "inference",
      passageId,
      paragraphRefs: [4, 5],
      text: "Why does Elian write the time in his notebook instead of opening the door?",
      options: ["He is cautious but curious", "He is late for a train", "He dislikes clocks", "He wants to repair a watch"],
      correctAnswer: "He is cautious but curious",
      marks: 1,
      markScheme: "Award 1 mark for recognising both caution and curiosity.",
      explanation: "He records evidence and studies the mystery, but does not risk entering.",
      tags: ["inference", "character", "GL-style"],
      timeEstimateSeconds: 90,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-eng-language-${suffix}`,
      subject: "English",
      topic: "Language analysis",
      subtopic: "Atmosphere",
      difficulty,
      questionType: "language_analysis",
      passageId,
      paragraphRefs: [4],
      text: "What effect is created when the window briefly shows 'a narrow room crowded with ticking shelves'?",
      options: ["It makes the shop seem ordinary", "It creates a mysterious, unsettling moment", "It shows Elian has fallen asleep", "It proves the clock is broken"],
      correctAnswer: "It creates a mysterious, unsettling moment",
      marks: 1,
      markScheme: "Award 1 mark for recognising the mysterious or unsettling effect.",
      explanation: "The reflection changes impossibly, making the reader question what is real.",
      tags: ["language analysis", "atmosphere", "GL-style"],
      timeEstimateSeconds: 95,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-eng-cloze-${suffix}`,
      subject: "English",
      topic: "Cloze",
      subtopic: "Tone and meaning",
      difficulty,
      questionType: "cloze",
      passageId,
      text: "Choose the word that best completes the sentence: Elian walked to school with an _____ feeling.",
      options: ["uneasy", "ordinary", "amused", "impatient"],
      correctAnswer: "uneasy",
      marks: 1,
      markScheme: "Uneasy best matches the strange, uncertain mood at the end of the passage.",
      explanation: "The passage ends with Elian feeling that instructions are being left for him.",
      tags: ["cloze", "vocabulary", "GL-style"],
      timeEstimateSeconds: 60,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
  ];
}
