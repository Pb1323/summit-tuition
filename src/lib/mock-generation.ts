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

export const EnglishGLProfile = {
  fullMockQuestionCount: 50,
  passageLengthPresets: {
    shortDiagnostic: "250-350 words",
    standardMock: "450-650 words",
    longMock: "650-900 words",
  },
  fullMockDistribution: {
    retrieval: 10,
    inference: 10,
    vocabulary: 8,
    grammar: 6,
    cloze: 6,
    languageEffect: 5,
    sequencingSummary: 3,
    challenge: 2,
  },
  genres: ["mystery", "adventure", "historical fiction", "realistic fiction", "nature writing", "travel", "myth-inspired", "science non-fiction", "biography", "persuasive article", "diary"],
  questionTypes: ["retrieval", "inference", "vocabulary", "language_analysis", "character motivation", "sequencing", "main idea", "grammar", "cloze", "synonyms_antonyms"],
  answerFormat: "Mostly multiple choice with clear paragraph references",
};

export const MathsGLProfile = {
  fullMockQuestionCount: 50,
  topics: ["arithmetic", "fractions", "decimals", "percentages", "ratio", "word problems", "measurement", "time", "money", "geometry", "area/perimeter", "angles", "coordinates", "sequences", "data handling", "multi-step reasoning"],
  fullMockDistribution: {
    arithmetic: 6,
    fractionsDecimals: 5,
    percentages: 5,
    ratio: 5,
    multiStep: 6,
    geometry: 5,
    measurementTimeMoney: 4,
    dataHandling: 4,
    coordinates: 3,
    sequences: 3,
    vennProbability: 2,
    challenge: 2,
  },
  visualQuestionRatio: { standard: "20-30%", summitStretch: "30-40%" },
  answerFormat: "Multiple choice and short numerical answer",
};

export function calculateTopicDistribution(subject: Subject, questionCount: number) {
  if (questionCount >= 50 && subject === "English") {
    return {
      Retrieval: 10,
      Inference: 10,
      Vocabulary: 8,
      Grammar: 6,
      Cloze: 6,
      "Language analysis": 5,
      "Main idea": 3,
      Challenge: 2,
    };
  }

  if (questionCount >= 50 && subject === "Maths") {
    return {
      Arithmetic: 6,
      Fractions: 5,
      Percentages: 5,
      Ratio: 5,
      "Multi-step reasoning": 6,
      Geometry: 5,
      Measurement: 4,
      "Data handling": 4,
      Coordinates: 3,
      "Algebra basics": 3,
      "Venn/probability": 2,
      Challenge: 2,
    };
  }

  const mathsWeights = [
    ["Arithmetic", 0.18],
    ["Fractions", 0.16],
    ["Percentages", 0.12],
    ["Ratio", 0.12],
    ["Algebra basics", 0.1],
    ["Geometry", 0.14],
    ["Data handling", 0.12],
    ["Measurement", 0.06],
    ["Time and money", 0.05],
    ["Coordinates", 0.05],
    ["Multi-step reasoning", 0.06],
  ] as const;

  const englishWeights = [
    ["Retrieval", 0.16],
    ["Inference", 0.24],
    ["Vocabulary", 0.2],
    ["Language analysis", 0.14],
    ["Character motivation", 0.08],
    ["Sequencing", 0.06],
    ["Main idea", 0.06],
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
  const allQuestions = buildMathsQuestions(suffix, input.difficultyLabel, input.questionCount);
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
  const passageId = `passage-river-map-${suffix}`;
  const passage: Passage = {
    id: passageId,
    title: "The River Map",
    source: "original",
    paragraphs: [
      "The map arrived folded inside a brown envelope, though nobody in the house admitted to posting it. It was not a modern map with tidy roads and bright symbols. It was drawn in blue ink on thick cream paper, and the river curled across it like a question waiting to be answered.",
      "Nia found it on the kitchen table before breakfast. Her father was searching for his keys, her little brother was arguing with a cereal box, and the rain tapped busily against the windows. At first, Nia assumed it belonged to school, but then she saw her grandmother's initials written beside the compass rose.",
      "Grandmother Isha had been a surveyor before she became too ill to climb the valley paths. She had once told Nia that a good map did not simply show where places were; it showed what mattered to the person who made it. On this map, the village was only a cluster of dots, but the river was careful and detailed, marked with bends, shallows and tiny handwritten notes.",
      "One note, beside a narrow loop of water, read: Listen where the stones are white. Another, close to the old railway bridge, said: The answer is not always downstream. Nia felt a small tightening in her chest, the kind that came before a difficult maths problem or a secret.",
      "By nine o'clock the rain had thinned to mist. Nia packed the map in a plastic folder, pulled on her boots, and told her father she was walking to the library. This was not exactly untrue; the path to the library crossed the river twice. Still, she avoided mentioning the envelope.",
      "At the first crossing, the river looked ordinary: brown-green water, nettles along the bank, a crisp packet trapped under a root. Nia checked the map. The blue ink showed stepping stones just beyond the bridge, but in real life the water covered them completely. She waited, listening. Beneath the rush of the current, she heard a faint hollow tapping, as if pebbles were knocking together under the surface.",
      "The sound led her upstream to a bank of pale stones. They were arranged in a crescent, not naturally scattered but placed with patient care. Nia crouched and noticed that one stone was flatter than the rest. Under it lay a metal key, dark with age but wrapped in oilcloth.",
      "For a moment she simply stared. The valley, which had always seemed familiar, rearranged itself around her. The river was no longer just a route through the village; it was a sentence Grandmother Isha had written slowly over many years, and Nia had only just learned how to read the first word.",
      "The key was smaller than Nia expected and strangely warm from the oilcloth. She turned it over in her palm and saw three tiny lines scratched into the metal. They matched three blue marks on the map near the railway bridge, where the river narrowed and slipped beneath an arch of blackened brick.",
      "Nia nearly went home then. The sensible part of her mind began listing objections: her boots were already muddy, her father would notice if she was late, and old keys did not always open interesting doors. Yet the map seemed to pull her attention back each time she tried to fold it away.",
      "At the bridge, ivy hung over the parapet like a curtain. Behind it, half-hidden by leaves, was a square iron door set into the stonework. Nia fitted the key into the lock. It resisted at first, then turned with a reluctant click that seemed much louder than the river.",
      "Inside was not treasure, not exactly. A narrow chamber held measuring rods, notebooks wrapped in cloth and a brass instrument in a wooden case. On the first page of the top notebook, Grandmother Isha had written: Some places disappear only because nobody is taught how to notice them. Nia read the sentence twice, understanding that the map was not a puzzle made for one morning, but an invitation to become more observant than she had been before.",
    ],
    text: "",
  };
  passage.text = passage.paragraphs?.join("\n\n") ?? "";

  const questions = buildEnglishQuestions(suffix, passageId, input.difficultyLabel, input.questionCount);
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
  const difficulty = difficultyLabel === "Standard" ? "standard" : "stretch";
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
      visual: { type: "ratioBlocks", title: "Junior to senior ratio", data: { labels: ["Juniors", "Seniors"], values: [5, 3] } },
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
      visual: { type: "geometry", title: "Compound rectilinear shape", data: { width: 10, height: 7, cutWidth: 4, cutHeight: 3 } },
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
      visual: { type: "sequence", title: "Equal sequence steps", data: { totalTerms: 8, knownPositions: [2, 5], knownValues: [11, 26], targetPosition: 8 } },
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
    {
      id: `gen-maths-clock-${suffix}`,
      subject: "Maths",
      topic: "Time",
      subtopic: "Analogue clocks",
      difficulty,
      questionType: "multiple_choice",
      text: "The clock shows the time a train left. The journey took 45 minutes. What time did the train arrive?",
      options: ["8:30", "8:45", "9:00", "9:15"],
      correctAnswer: "8:45",
      marks: 1,
      visual: { type: "clock", title: "Train departure time", data: { hour: 8, minute: 0 } },
      markScheme: createMarkScheme(["The clock shows 8:00.", "8:00 plus 45 minutes is 8:45."]),
      explanation: createExplanations("Time", "Read the clock first, then add the journey duration."),
      tags: ["time", "clock", "GL-style"],
      timeEstimateSeconds: 90,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-maths-coordinate-${suffix}`,
      subject: "Maths",
      topic: "Coordinates",
      subtopic: "Reading points",
      difficulty,
      questionType: "multiple_choice",
      text: "Point B is shown on the grid. What are its coordinates?",
      options: ["(2, 5)", "(5, 2)", "(4, 3)", "(3, 4)"],
      correctAnswer: "(5, 2)",
      marks: 1,
      visual: { type: "coordinateGrid", title: "Coordinate grid", data: { points: [[2, 5], [5, 2], [4, 3]] } },
      markScheme: "Coordinates are read across first, then up. Point B is at (5, 2).",
      explanation: createExplanations("Coordinates", "The x-coordinate comes before the y-coordinate."),
      tags: ["coordinates", "visual", "GL-style"],
      timeEstimateSeconds: 90,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-maths-venn-${suffix}`,
      subject: "Maths",
      topic: "Data handling",
      subtopic: "Venn diagrams",
      difficulty,
      questionType: "multiple_choice",
      text: "The Venn diagram shows pupils in two clubs. How many pupils are in exactly one club?",
      options: ["9", "11", "15", "20"],
      correctAnswer: "11",
      marks: 2,
      visual: { type: "venn", title: "Club membership", data: { leftLabel: "Chess", rightLabel: "Choir", left: 6, overlap: 4, right: 5 } },
      markScheme: createMarkScheme(["Exactly one club means left-only plus right-only.", "6 + 5 = 11."]),
      explanation: createExplanations("Venn diagrams", "Do not include the overlap when the question asks for exactly one club."),
      tags: ["data", "venn", "sets", "GL-style"],
      timeEstimateSeconds: 120,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-maths-measure-${suffix}`,
      subject: "Maths",
      topic: "Measurement",
      subtopic: "Unit conversion",
      difficulty,
      questionType: "word_problem",
      text: "A ribbon is 2.4 metres long. It is cut into pieces of 30 cm. How many pieces can be cut?",
      options: ["6", "8", "10", "12"],
      correctAnswer: "8",
      marks: 2,
      markScheme: createMarkScheme(["2.4 m = 240 cm.", "240 divided by 30 = 8."]),
      explanation: createExplanations("Measurement", "Convert metres to centimetres before dividing."),
      tags: ["measurement", "division", "GL-style"],
      timeEstimateSeconds: 110,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
  ];
}

function englishTemplates(suffix: string, passageId: string, difficultyLabel: MockDifficulty): Question[] {
  const difficulty = difficultyLabel === "Standard" ? "standard" : "stretch";
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
      text: "What was unusual about the map when it arrived?",
      options: ["It was folded inside a brown envelope", "It was printed on plastic", "It showed bright modern roads", "It was sent by Nia's teacher"],
      correctAnswer: "It was folded inside a brown envelope",
      marks: 1,
      markScheme: "Award 1 mark for identifying the brown envelope detail.",
      explanation: "The first paragraph states that the map arrived folded inside a brown envelope.",
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
      text: "Which word is closest in meaning to 'assumed' as it is used in paragraph 2?",
      options: ["guessed", "carried", "proved", "forgot"],
      correctAnswer: "guessed",
      marks: 1,
      markScheme: "Assumed means guessed or supposed without being certain.",
      explanation: "Nia thinks the map belongs to school before she has checked properly.",
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
      text: "Why does Nia avoid mentioning the envelope to her father?",
      options: ["She senses the map may be private or mysterious", "She has lost the map", "She dislikes walking to the library", "She wants to avoid breakfast"],
      correctAnswer: "She senses the map may be private or mysterious",
      marks: 1,
      markScheme: "Award 1 mark for recognising that Nia is secretive because the map feels significant or mysterious.",
      explanation: "The passage says she avoids mentioning the envelope after feeling it may contain a secret.",
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
      paragraphRefs: [8],
      text: "What effect is created by describing the river as 'a sentence Grandmother Isha had written slowly over many years'?",
      options: ["It suggests the river carries hidden meaning", "It shows the river is drying up", "It proves the map is inaccurate", "It makes the valley seem crowded"],
      correctAnswer: "It suggests the river carries hidden meaning",
      marks: 1,
      markScheme: "Award 1 mark for recognising that the metaphor suggests a hidden message or meaning.",
      explanation: "A sentence can be read, so the image suggests Nia is learning to interpret the river.",
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
      paragraphRefs: [4],
      text: "Choose the word that best completes the sentence: Nia felt a small _____ in her chest.",
      options: ["tightening", "celebration", "echo", "shadow"],
      correctAnswer: "tightening",
      marks: 1,
      markScheme: "Tightening matches the exact phrase and the feeling of tension.",
      explanation: "The surrounding mood is secretive and tense, so 'tightening' fits best.",
      tags: ["cloze", "vocabulary", "GL-style"],
      timeEstimateSeconds: 60,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-eng-sequence-${suffix}`,
      subject: "English",
      topic: "Sequencing",
      subtopic: "Events",
      difficulty,
      questionType: "reading_comprehension",
      passageId,
      paragraphRefs: [5, 6, 7],
      text: "Which event happens first after Nia leaves the house?",
      options: ["She reaches the first crossing", "She finds the metal key", "She hears hollow tapping", "She lifts the flat stone"],
      correctAnswer: "She reaches the first crossing",
      marks: 1,
      markScheme: "At the first crossing comes before hearing the tapping and finding the key.",
      explanation: "The events move from the crossing, to listening, to the pale stones, then to the key.",
      tags: ["sequencing", "comprehension", "GL-style"],
      timeEstimateSeconds: 70,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-eng-main-idea-${suffix}`,
      subject: "English",
      topic: "Main idea",
      subtopic: "Summary",
      difficulty,
      questionType: "reading_comprehension",
      passageId,
      paragraphRefs: [1, 8],
      text: "Which is the best summary of the passage?",
      options: ["A girl begins to understand a mysterious map left by her grandmother", "A family prepares breakfast during heavy rain", "A village library closes after a storm", "A girl loses a key near a railway bridge"],
      correctAnswer: "A girl begins to understand a mysterious map left by her grandmother",
      marks: 1,
      markScheme: "Award 1 mark for the summary that covers the map, Nia and her grandmother's hidden message.",
      explanation: "The passage centres on Nia following clues from her grandmother's map.",
      tags: ["summary", "main idea", "GL-style"],
      timeEstimateSeconds: 80,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
    {
      id: `gen-eng-grammar-${suffix}`,
      subject: "English",
      topic: "Grammar",
      subtopic: "Sentence control",
      difficulty,
      questionType: "grammar",
      passageId,
      paragraphRefs: [5],
      text: "Which sentence is punctuated correctly?",
      options: ["Nia packed the map in a plastic folder, pulled on her boots, and left.", "Nia packed, the map in a plastic folder pulled on her boots and left.", "Nia packed the map, in a plastic folder pulled on her boots, and left.", "Nia packed the map in a plastic folder pulled, on her boots and left."],
      correctAnswer: "Nia packed the map in a plastic folder, pulled on her boots, and left.",
      marks: 1,
      markScheme: "The correct sentence uses commas to separate actions in a list.",
      explanation: "The commas help separate the sequence of actions clearly.",
      tags: ["grammar", "punctuation", "GL-style"],
      timeEstimateSeconds: 70,
      sourceStyle: "GL-style",
      originalGenerated: true,
    },
  ];
}

function buildMathsQuestions(suffix: string, difficultyLabel: MockDifficulty, questionCount: number): Question[] {
  const base = mathsTemplates(suffix, difficultyLabel);
  const topicPlan = [
    ["Arithmetic", 6],
    ["Fractions", 5],
    ["Percentages", 5],
    ["Ratio", 5],
    ["Multi-step reasoning", 6],
    ["Geometry", 5],
    ["Measurement", 4],
    ["Data handling", 4],
    ["Coordinates", 3],
    ["Algebra basics", 3],
    ["Venn/probability", 2],
    ["Challenge", 2],
  ] as const;
  const plannedTopics = topicPlan.flatMap(([topic, count]) => Array.from({ length: count }, () => topic)).slice(0, questionCount);
  return plannedTopics.map((topic, index) => {
    const template = chooseMathsTemplate(base, topic, index);
    const stretch = difficultyLabel === "Summit Stretch";
    return {
      ...template,
      id: `${template.id}-q${index + 1}`,
      topic,
      subtopic: subtopicForMaths(topic, index),
      difficulty: difficultyLabel === "Standard" && index < 32 ? "standard" : "stretch",
      text: tuneMathsStem(template.text, topic, index, stretch),
      marks: stretch && (topic === "Challenge" || topic === "Multi-step reasoning") ? Math.max(2, template.marks) : template.marks,
      tags: Array.from(new Set([...(template.tags ?? []), topic.toLowerCase(), difficultyLabel, "50-question-full-mock"])),
      timeEstimateSeconds: stretch ? Math.max(template.timeEstimateSeconds, 110) : template.timeEstimateSeconds,
    };
  });
}

function buildEnglishQuestions(suffix: string, passageId: string, difficultyLabel: MockDifficulty, questionCount: number): Question[] {
  const base = englishTemplates(suffix, passageId, difficultyLabel);
  const topicPlan = [
    ["Retrieval", 10],
    ["Inference", 10],
    ["Vocabulary", 8],
    ["Grammar", 6],
    ["Cloze", 6],
    ["Language analysis", 5],
    ["Main idea", 3],
    ["Challenge", 2],
  ] as const;
  const plannedTopics = topicPlan.flatMap(([topic, count]) => Array.from({ length: count }, () => topic)).slice(0, questionCount);
  return plannedTopics.map((topic, index) => {
    const template = chooseEnglishTemplate(base, topic, index);
    const paragraphRefs = paragraphRefsForEnglish(topic, index);
    return {
      ...template,
      id: `${template.id}-q${index + 1}`,
      topic,
      subtopic: subtopicForEnglish(topic, index),
      paragraphRefs,
      difficulty: difficultyLabel === "Standard" && index < 34 ? "standard" : "stretch",
      text: tuneEnglishStem(template.text, topic, index, difficultyLabel === "Summit Stretch"),
      tags: Array.from(new Set([...(template.tags ?? []), topic.toLowerCase(), difficultyLabel, "50-question-full-mock"])),
      timeEstimateSeconds: difficultyLabel === "Summit Stretch" ? Math.max(template.timeEstimateSeconds, 75) : template.timeEstimateSeconds,
    };
  });
}

function chooseMathsTemplate(base: Question[], topic: string, index: number) {
  const keyword = topic.toLowerCase().includes("venn") ? "venn" : topic.toLowerCase().split(" ")[0];
  const candidates = base.filter((question) => question.topic === topic || question.tags.some((tag) => tag.toLowerCase().includes(keyword)));
  return (candidates.length ? candidates : base)[index % (candidates.length || base.length)];
}

function chooseEnglishTemplate(base: Question[], topic: string, index: number) {
  const candidates = base.filter((question) => question.topic === topic || question.tags.some((tag) => tag.toLowerCase().includes(topic.toLowerCase().split(" ")[0])));
  return (candidates.length ? candidates : base)[index % (candidates.length || base.length)];
}

function subtopicForMaths(topic: string, index: number) {
  const map: Record<string, string[]> = {
    Arithmetic: ["BIDMAS", "mental calculation", "missing operations"],
    Fractions: ["fractions and decimals", "equivalence", "fraction of amount"],
    Percentages: ["percentage change", "money", "reverse comparison"],
    Ratio: ["sharing", "changing ratio", "proportion"],
    "Multi-step reasoning": ["mixed operations", "word problem", "checking constraints"],
    Geometry: ["perimeter", "area", "angles"],
    Measurement: ["unit conversion", "time", "money"],
    "Data handling": ["tables", "charts", "Venn diagrams"],
    Coordinates: ["coordinate grids", "reading points", "translation"],
    "Algebra basics": ["sequences", "term rules", "patterns"],
    "Venn/probability": ["sets", "exactly one group", "probability"],
    Challenge: ["mixed topic", "multi-step", "Summit Stretch"],
  };
  const values = map[topic] ?? ["GL-style"];
  return values[index % values.length];
}

function subtopicForEnglish(topic: string, index: number) {
  const map: Record<string, string[]> = {
    Retrieval: ["precise detail", "direct understanding"],
    Inference: ["deduction", "character motivation", "evidence across paragraphs"],
    Vocabulary: ["meaning in context", "synonyms", "antonyms"],
    Grammar: ["punctuation", "sentence structure"],
    Cloze: ["word choice", "tone"],
    "Language analysis": ["effect", "imagery", "atmosphere"],
    "Main idea": ["summary", "sequencing", "theme"],
    Challenge: ["multi-paragraph inference", "authorial purpose"],
  };
  const values = map[topic] ?? ["GL-style"];
  return values[index % values.length];
}

function paragraphRefsForEnglish(topic: string, index: number) {
  if (topic === "Challenge") return [Math.max(1, (index % 6) + 1), Math.min(12, (index % 6) + 6)];
  if (topic === "Main idea") return [1, 12];
  return [Math.max(1, (index % 12) + 1)];
}

function tuneMathsStem(text: string, topic: string, index: number, stretch: boolean) {
  const prefix = stretch && index % 3 === 0 ? "Summit Stretch: " : "";
  if (topic === "Challenge") return `${prefix}${text} Check both steps before choosing the closest answer.`;
  if (topic === "Multi-step reasoning") return `${prefix}${text} You may need to combine two operations.`;
  return `${prefix}${text}`;
}

function tuneEnglishStem(text: string, topic: string, index: number, stretch: boolean) {
  const prefix = stretch && (topic === "Inference" || topic === "Challenge") ? "Using evidence from the passage, " : "";
  if (topic === "Challenge") return `${prefix}${text} Choose the answer that is best supported overall.`;
  if (topic === "Main idea" && index % 2 === 0) return "Which option best summarises the writer's main idea in the passage?";
  return `${prefix}${text}`;
}
