import type { MockDifficulty, MockExam, Passage, Question, ReferenceSource, Subject } from "@/types/platform";
import { allocateByWeights, allocateEnglishSectionCounts } from "@/lib/english-sections";

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
  /**
   * GL Assessment English is a 4-section paper, not a flat topic pool.
   * Ratios calibrated against a real GL familiarisation booklet (54
   * questions) read directly for research/gl-english-question-bank.md.
   */
  sectionWeights: { comprehension: 0.52, spelling: 0.17, punctuation: 0.17, cloze: 0.15 },
  comprehensionSkillWeights: { inference: 0.45, vocabulary: 0.25, retrieval: 0.2, grammarEmbedded: 0.15, literaryDevice: 0.05 },
  genres: ["mystery", "adventure", "historical fiction", "realistic fiction", "nature writing", "travel", "myth-inspired", "science non-fiction", "biography", "persuasive article", "diary"],
  questionTypes: ["retrieval", "inference", "vocabulary", "language_analysis", "grammar", "cloze"],
  answerFormat: "Section A comprehension is MC A-E off one passage; Sections B/C are 4-segment spot-the-error plus N; Section D is inline cloze with 5 options per gap.",
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
  if (subject === "English") {
    const counts = allocateEnglishSectionCounts(questionCount);
    return {
      "Reading comprehension": counts.comprehension,
      Spelling: counts.spelling,
      Punctuation: counts.punctuation,
      Cloze: counts.cloze,
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

  return Object.fromEntries(mathsWeights.map(([topic, weight]) => [topic, Math.max(1, Math.round(questionCount * weight))]));
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

  const clozePassageId = `passage-performance-day-${suffix}`;
  const clozePassage: Passage = {
    id: clozePassageId,
    title: "Performance Day",
    source: "original",
    paragraphs: [
      "Backstage, the hum of the audience grew louder as the lights dimmed. Priya smoothed the front of her costume and counted her breaths, the way her drama teacher had taught her.",
      "She could hear Theo pacing behind the curtain, his shoes tapping an uneven rhythm against the wooden floor. Neither of them had spoken since the final rehearsal ended.",
      "A stagehand leaned close and whispered that the microphones were finally working again, though nobody had explained what had gone wrong with them in the first place.",
      "Priya peered through the gap in the curtain. Rows of parents sat fanning themselves with programmes, and somewhere near the back her grandmother was already recording on her phone.",
      "The stage manager raised three fingers, then two, then one. Priya felt her stomach tighten, though she reminded herself that this feeling always faded within the first minute.",
      "When the curtain finally lifted, the applause arrived before she had taken a single step, warm and sudden, and for a moment it carried her forward better than her own legs could.",
    ],
    text: "",
  };
  clozePassage.text = clozePassage.paragraphs?.join("\n\n") ?? "";

  const questions = buildEnglishQuestions(suffix, passageId, clozePassageId, input.difficultyLabel, input.questionCount);
  const topicMix = calculateTopicDistribution("English", questions.length);
  const totalMarks = questions.reduce((sum, question) => sum + question.marks, 0);

  return {
    passages: [passage, clozePassage],
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
      description: "Original 4-section English draft matching GL Assessment's real paper structure: reading comprehension, spelling, punctuation and cloze in the researched GL ratio (see research/gl-english-question-bank.md).",
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

type ComprehensionSkill = "retrieval" | "vocabulary" | "inference" | "grammarEmbedded" | "literaryDevice";

function comprehensionTemplates(suffix: string, passageId: string, difficulty: "standard" | "stretch"): Record<ComprehensionSkill, Question[]> {
  const base = (overrides: Partial<Question> & Pick<Question, "id" | "subtopic" | "paragraphRefs" | "text" | "options" | "correctAnswer" | "markScheme" | "explanation">): Question => ({
    subject: "English",
    topic: "Reading comprehension",
    difficulty,
    questionType: "reading_comprehension",
    passageId,
    marks: 1,
    tags: ["comprehension", "GL-style"],
    timeEstimateSeconds: 70,
    sourceStyle: "GL-style",
    originalGenerated: true,
    ...overrides,
  });
  return {
    retrieval: [
      base({ id: `gen-eng-retrieval-envelope-${suffix}`, subtopic: "Precise detail", questionType: "retrieval", paragraphRefs: [1], text: "What was unusual about the map when it arrived?", options: ["It was folded inside a brown envelope", "It was printed on plastic", "It showed bright modern roads", "It was sent by Nia's teacher"], correctAnswer: "It was folded inside a brown envelope", markScheme: "Award 1 mark for identifying the brown envelope detail.", explanation: "The first paragraph states that the map arrived folded inside a brown envelope." }),
      base({ id: `gen-eng-retrieval-table-${suffix}`, subtopic: "Precise detail", questionType: "retrieval", paragraphRefs: [2], text: "Where did Nia find the map?", options: ["On the kitchen table", "In her school bag", "Under her pillow", "In the garden shed"], correctAnswer: "On the kitchen table", markScheme: "Award 1 mark for identifying the kitchen table.", explanation: "Paragraph 2 states Nia found the map on the kitchen table before breakfast." }),
      base({ id: `gen-eng-retrieval-key-${suffix}`, subtopic: "Precise detail", questionType: "retrieval", paragraphRefs: [7], text: "What did Nia find under the flatter stone?", options: ["A metal key wrapped in oilcloth", "A second map", "A handwritten letter", "A small brass compass"], correctAnswer: "A metal key wrapped in oilcloth", markScheme: "Award 1 mark for identifying the key wrapped in oilcloth.", explanation: "Paragraph 7 states that under the flatter stone lay a metal key wrapped in oilcloth." }),
    ],
    vocabulary: [
      base({ id: `gen-eng-vocab-assumed-${suffix}`, subtopic: "Meaning in context", questionType: "vocabulary", paragraphRefs: [2], text: "Which word is closest in meaning to 'assumed' as it is used in paragraph 2?", options: ["guessed", "carried", "proved", "forgot"], correctAnswer: "guessed", markScheme: "Assumed means guessed or supposed without being certain.", explanation: "Nia thinks the map belongs to school before she has checked properly." }),
      base({ id: `gen-eng-vocab-reluctant-${suffix}`, subtopic: "Meaning in context", questionType: "vocabulary", paragraphRefs: [11], text: "Which word is closest in meaning to 'reluctant' as it is used in paragraph 11 ('turned with a reluctant click')?", options: ["unwilling", "sudden", "loud", "broken"], correctAnswer: "unwilling", markScheme: "Reluctant means unwilling or hesitant.", explanation: "The lock seems to resist turning, as if unwilling to open." }),
      base({ id: `gen-eng-vocab-objections-${suffix}`, subtopic: "Meaning in context", questionType: "vocabulary", paragraphRefs: [10], text: "Which word is closest in meaning to 'objections' as it is used in paragraph 10?", options: ["reasons against", "questions", "jokes", "plans"], correctAnswer: "reasons against", markScheme: "Objections are reasons put forward against doing something.", explanation: "Nia's sensible side is listing reasons not to continue." }),
    ],
    inference: [
      base({ id: `gen-eng-inference-secret-${suffix}`, subtopic: "Character motivation", questionType: "inference", paragraphRefs: [4, 5], text: "Why does Nia avoid mentioning the envelope to her father?", options: ["She senses the map may be private or mysterious", "She has lost the map", "She dislikes walking to the library", "She wants to avoid breakfast"], correctAnswer: "She senses the map may be private or mysterious", markScheme: "Award 1 mark for recognising that Nia is secretive because the map feels significant or mysterious.", explanation: "The passage says she avoids mentioning the envelope after feeling it may contain a secret." }),
      base({ id: `gen-eng-inference-continue-${suffix}`, subtopic: "Character motivation", questionType: "inference", paragraphRefs: [10], text: "Why does Nia decide to carry on despite the objections listed in paragraph 10?", options: ["The map keeps pulling her attention back", "Her father tells her to continue", "She is no longer worried about being late", "She wants to avoid the rain"], correctAnswer: "The map keeps pulling her attention back", markScheme: "Award 1 mark for recognising the map's pull overrides her sensible doubts.", explanation: "Paragraph 10 states the map seemed to pull her attention back each time she tried to fold it away." }),
      base({ id: `gen-eng-inference-morning-${suffix}`, subtopic: "Evidence across paragraphs", questionType: "inference", paragraphRefs: [2], text: "What does the busy morning scene in paragraph 2 suggest about why nobody questions where the map came from?", options: ["Everyone is too distracted to notice properly", "Nobody in the family can read maps", "The family already knew about the map", "Nia hides the map before anyone sees it"], correctAnswer: "Everyone is too distracted to notice properly", markScheme: "Award 1 mark for linking the chaotic breakfast scene to nobody noticing.", explanation: "The father is searching for keys and the brother is arguing, so nobody is paying close attention." }),
    ],
    grammarEmbedded: [
      base({ id: `gen-eng-grammar-adjectives-${suffix}`, subtopic: "Word class in context", questionType: "grammar", paragraphRefs: [3], text: "How many adjectives are in this sentence from paragraph 3: 'but the river was careful and detailed, marked with bends, shallows and tiny handwritten notes'?", options: ["2", "3", "4", "5"], correctAnswer: "4", markScheme: "The adjectives are careful, detailed, tiny and handwritten.", explanation: "Count only the words that describe a noun: careful, detailed, tiny, handwritten." }),
      base({ id: `gen-eng-grammar-wordclass-${suffix}`, subtopic: "Word class in context", questionType: "grammar", paragraphRefs: [11], text: "What type of word is 'reluctant' in paragraph 11 ('turned with a reluctant click')?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adjective", markScheme: "Reluctant describes the click, so it is an adjective.", explanation: "An adjective describes a noun; here it describes the click." }),
      base({ id: `gen-eng-grammar-verbs-${suffix}`, subtopic: "Word class in context", questionType: "grammar", paragraphRefs: [5], text: "What type of words are the following, all taken from paragraph 5: packed, pulled, told?", options: ["Nouns", "Verbs", "Adjectives", "Prepositions"], correctAnswer: "Verbs", markScheme: "Packed, pulled and told are all doing/action words.", explanation: "Each word describes an action Nia carries out." }),
    ],
    literaryDevice: [
      base({ id: `gen-eng-literary-simile1-${suffix}`, subtopic: "Literary device", questionType: "language_analysis", paragraphRefs: [1], text: "'the river curled across it like a question waiting to be answered' (paragraph 1) is an example of...", options: ["A simile", "A metaphor", "Personification", "Alliteration"], correctAnswer: "A simile", markScheme: "The comparison uses 'like', which signals a simile.", explanation: "Similes compare two things using 'like' or 'as'." }),
      base({ id: `gen-eng-literary-metaphor1-${suffix}`, subtopic: "Literary device", questionType: "language_analysis", paragraphRefs: [8], text: "'it was a sentence Grandmother Isha had written slowly over many years' (paragraph 8) is an example of...", options: ["A metaphor", "A simile", "Onomatopoeia", "A proverb"], correctAnswer: "A metaphor", markScheme: "The river is directly described as a sentence, without 'like' or 'as', so it is a metaphor.", explanation: "Metaphors describe one thing as if it were another thing entirely." }),
    ],
  };
}

function spellingTemplates(suffix: string, difficulty: "standard" | "stretch"): Question[] {
  const base = (id: string, segments: string[], wrongSegment: number | null, correction: string): Question => {
    const sentence = segments.join(" ");
    const noMistake = wrongSegment === null;
    return {
      id,
      subject: "English",
      topic: "Spelling",
      subtopic: noMistake ? "No mistake" : "Find the mistake",
      difficulty,
      questionType: "grammar",
      text: `Find the group of words with the spelling mistake in it. If there is no mistake, choose N.\n"${sentence}"`,
      options: [...segments, "No mistake"],
      correctAnswer: noMistake ? "No mistake" : segments[wrongSegment],
      marks: 1,
      markScheme: noMistake ? "Every word is spelled correctly, so N is the answer." : correction,
      explanation: noMistake ? "A deliberately-correct item so N cannot be eliminated by pattern-guessing." : correction,
      tags: ["spelling", "segment-format", "GL-style"],
      timeEstimateSeconds: 45,
      sourceStyle: "GL-style",
      originalGenerated: true,
    };
  };
  return [
    base(`gen-eng-spell-comittee-${suffix}`, ["The comittee's decision", "to postpone the tournament", "caused widespread", "disappointment."], 0, "'Comittee's' should be 'committee's' (double t, double e)."),
    base(`gen-eng-spell-irresistable-${suffix}`, ["Her irresistable urge", "to interrupt the meeting", "embarrassed her", "colleagues."], 0, "'Irresistable' should be 'irresistible' (-ible, not -able)."),
    base(`gen-eng-spell-recieved-${suffix}`, ["Priya recieved an", "elaborate invitation", "to the exclusive", "concert."], 0, "'Recieved' should be 'received' — i before e except after c."),
    base(`gen-eng-spell-persued-${suffix}`, ["The company persued", "the customers who", "had not paid", "on time."], 0, "'Persued' should be 'pursued'."),
    base(`gen-eng-spell-consistant-${suffix}`, ["Consistant hard work", "has contributed to", "significant", "improvements."], 0, "'Consistant' should be 'consistent'."),
    base(`gen-eng-spell-correct1-${suffix}`, ["The professor's fascinating lecture", "on ancient civilisations", "captivated the", "audience."], null, ""),
    base(`gen-eng-spell-permision-${suffix}`, ["Oli asked his mother", "for permision to attend", "the charity", "concert."], 1, "'Permision' should be 'permission' (double s)."),
    base(`gen-eng-spell-correct2-${suffix}`, ["Julia regretted postponing", "her annual expedition", "to the", "mountains."], null, ""),
  ];
}

function punctuationTemplates(suffix: string, difficulty: "standard" | "stretch"): Question[] {
  const base = (id: string, sentence: string, segments: string[], wrongSegment: number | null, correction: string): Question => {
    const noMistake = wrongSegment === null;
    return {
      id,
      subject: "English",
      topic: "Punctuation",
      subtopic: noMistake ? "No mistake" : "Find the mistake",
      difficulty,
      questionType: "punctuation",
      text: `Find the group of words with the punctuation mistake in it. If there is no mistake, choose N.\n"${sentence}"`,
      options: [...segments, "No mistake"],
      correctAnswer: noMistake ? "No mistake" : segments[wrongSegment],
      marks: 1,
      markScheme: noMistake ? "Every mark of punctuation is correct, so N is the answer." : correction,
      explanation: noMistake ? "A deliberately-correct item so N cannot be eliminated by pattern-guessing." : correction,
      tags: ["punctuation", "segment-format", "GL-style"],
      timeEstimateSeconds: 45,
      sourceStyle: "GL-style",
      originalGenerated: true,
    };
  };
  return [
    base(`gen-eng-punct-its-${suffix}`, "Its clear that the students homework was finished on time.", ["Its clear that", "the students homework", "was finished", "on time"], 0, "'Its' needs an apostrophe here: 'It's clear' (it is clear)."),
    base(`gen-eng-punct-question-${suffix}`, "Mention the word hippo and you probably think of a robust animal. But how accurate is this", ["Mention the word hippo", "and you probably think", "of a robust animal.", "But how accurate is this"], 3, "The sentence needs a question mark: 'But how accurate is this?'"),
    base(`gen-eng-punct-possessive-${suffix}`, "The suns harmful rays can damage skin that is not protected.", ["The suns harmful rays", "can damage skin", "that is not", "protected"], 0, "'Suns' needs an apostrophe: 'sun's harmful rays' (possessive)."),
    base(`gen-eng-punct-contraction-${suffix}`, "Its true that hippos are omnivores, but they are not gentle creatures.", ["Its true that hippos", "are omnivores, but", "they are not", "gentle creatures"], 0, "'Its' should be 'It's' (it is true)."),
    base(`gen-eng-punct-bracket-${suffix}`, "They can run at speed (up to 30 kilometres per hour and are surprisingly fast.", ["They can run at speed", "(up to 30 kilometres", "per hour and", "are surprisingly fast."], 1, "The opening bracket is never closed — it needs a closing bracket after 'hour)'."),
    base(`gen-eng-punct-correct1-${suffix}`, "Hippos typically do their running at night, whilst hunting for food.", ["Hippos typically do", "their running at night,", "whilst hunting", "for food."], null, ""),
    base(`gen-eng-punct-list-${suffix}`, "Nia packed the map in a plastic folder pulled on her boots, and left.", ["Nia packed the map", "in a plastic folder", "pulled on her boots,", "and left."], 1, "A comma is missing after 'folder' to separate the list of actions."),
    base(`gen-eng-punct-correct2-${suffix}`, "During the day, hippos usually stay in the water to keep their skin cool.", ["During the day, hippos", "usually stay in", "the water to keep", "their skin cool."], null, ""),
  ];
}

function clozeTemplates(suffix: string, clozePassageId: string, difficulty: "standard" | "stretch"): Question[] {
  const base = (overrides: Partial<Question> & Pick<Question, "id" | "subtopic" | "paragraphRefs" | "text" | "options" | "correctAnswer" | "markScheme" | "explanation">): Question => ({
    subject: "English",
    topic: "Cloze",
    difficulty,
    questionType: "cloze",
    passageId: clozePassageId,
    marks: 1,
    tags: ["cloze", "GL-style"],
    timeEstimateSeconds: 55,
    sourceStyle: "GL-style",
    originalGenerated: true,
    ...overrides,
  });
  return [
    base({ id: `gen-eng-cloze-nerves-${suffix}`, subtopic: "Tense agreement", paragraphRefs: [1], text: "Backstage, the hum of the audience ____ louder as the lights dimmed.", options: ["grew", "grow", "growing", "has grew", "grows"], correctAnswer: "grew", markScheme: "Past tense 'grew' matches the rest of the passage's past-tense narration.", explanation: "Every other verb in this paragraph is in the simple past tense." }),
    base({ id: `gen-eng-cloze-pacing-${suffix}`, subtopic: "Preposition choice", paragraphRefs: [2], text: "She could hear Theo pacing behind the curtain, his shoes tapping ____ rhythm against the wooden floor.", options: ["an uneven", "a uneven", "the uneven", "uneven a", "an unevenly"], correctAnswer: "an uneven", markScheme: "'Uneven' starts with a vowel sound, so it takes 'an', and the noun 'rhythm' needs an article.", explanation: "Article agreement with the following adjective/noun." }),
    base({ id: `gen-eng-cloze-mics-${suffix}`, subtopic: "Conjunction choice", paragraphRefs: [3], text: "A stagehand whispered that the microphones were finally working again, ____ nobody had explained what had gone wrong.", options: ["though", "so", "because", "and", "unless"], correctAnswer: "though", markScheme: "'Though' correctly signals the contrast between the mics working and the mystery of the fault.", explanation: "The second clause contrasts with the first, so a contrast conjunction is needed." }),
    base({ id: `gen-eng-cloze-grandmother-${suffix}`, subtopic: "Homophone choice", paragraphRefs: [4], text: "Rows of parents sat fanning themselves with programmes, and somewhere near the back ____ grandmother was already recording.", options: ["her", "their", "there", "they're", "hers"], correctAnswer: "her", markScheme: "'Her' correctly shows the grandmother belongs to Priya (singular possessive).", explanation: "The grandmother belongs to Priya specifically, so the singular possessive is needed." }),
    base({ id: `gen-eng-cloze-fingers-${suffix}`, subtopic: "Tense agreement", paragraphRefs: [5], text: "Priya felt her stomach tighten, though she reminded herself that this feeling always ____ within the first minute.", options: ["faded", "fades", "fade", "had faded", "will fade"], correctAnswer: "fades", markScheme: "This is a general habitual truth Priya reminds herself of, so present simple 'fades' is correct.", explanation: "A general truth or habit uses present simple tense, not past tense." }),
    base({ id: `gen-eng-cloze-applause-${suffix}`, subtopic: "Adjective vs adverb", paragraphRefs: [6], text: "When the curtain finally lifted, the applause arrived before she had taken a single step, warm and ____.", options: ["sudden", "suddenly", "suddenness", "more sudden", "suddenest"], correctAnswer: "sudden", markScheme: "'Sudden' pairs with 'warm' as a matching adjective describing the applause, not an adverb.", explanation: "Both words in the pair describe the noun 'applause', so both must be adjectives." }),
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

/**
 * Builds the 4-section GL English paper: comprehension (with its own
 * retrieval/inference/vocabulary/grammar-embedded/literary-device skill
 * mix), spelling, punctuation, and cloze, sized by `EnglishGLProfile`'s
 * researched ratios (see research/gl-english-question-bank.md). Each section
 * picks difficulty wholesale from `difficultyLabel` rather than mixing
 * per-question — Summit Stretch templates use harder vocabulary/decoys
 * throughout rather than a partial split.
 */
function buildEnglishQuestions(suffix: string, passageId: string, clozePassageId: string, difficultyLabel: MockDifficulty, questionCount: number): Question[] {
  const difficulty = difficultyLabel === "Standard" ? "standard" : "stretch";
  const stretch = difficultyLabel === "Summit Stretch";
  const sectionCounts = allocateEnglishSectionCounts(questionCount);

  const comprehensionPools = comprehensionTemplates(suffix, passageId, difficulty);
  const skillCounts = allocateByWeights(sectionCounts.comprehension, EnglishGLProfile.comprehensionSkillWeights as Record<ComprehensionSkill, number>);
  const comprehensionPlan = (Object.keys(skillCounts) as ComprehensionSkill[]).flatMap((skill) => Array.from({ length: skillCounts[skill] }, () => skill));
  const comprehensionQuestions = comprehensionPlan.map((skill, index) => finalizeEnglishQuestion(comprehensionPools[skill][index % comprehensionPools[skill].length], "comp", index, stretch));

  const spellingPool = spellingTemplates(suffix, difficulty);
  const spellingQuestions = Array.from({ length: sectionCounts.spelling }, (_, index) => finalizeEnglishQuestion(spellingPool[index % spellingPool.length], "spelling", index, stretch));

  const punctuationPool = punctuationTemplates(suffix, difficulty);
  const punctuationQuestions = Array.from({ length: sectionCounts.punctuation }, (_, index) => finalizeEnglishQuestion(punctuationPool[index % punctuationPool.length], "punct", index, stretch));

  const clozePool = clozeTemplates(suffix, clozePassageId, difficulty);
  const clozeQuestions = Array.from({ length: sectionCounts.cloze }, (_, index) => finalizeEnglishQuestion(clozePool[index % clozePool.length], "cloze", index, stretch));

  return [...comprehensionQuestions, ...spellingQuestions, ...punctuationQuestions, ...clozeQuestions];
}

function finalizeEnglishQuestion(template: Question, slot: string, index: number, stretch: boolean): Question {
  return {
    ...template,
    id: `${template.id}-${slot}-q${index + 1}`,
    tags: Array.from(new Set([...(template.tags ?? []), stretch ? "Summit Stretch" : "Standard", "gl-4-section-mock"])),
  };
}

function chooseMathsTemplate(base: Question[], topic: string, index: number) {
  const keyword = topic.toLowerCase().includes("venn") ? "venn" : topic.toLowerCase().split(" ")[0];
  const candidates = base.filter((question) => question.topic === topic || question.tags.some((tag) => tag.toLowerCase().includes(keyword)));
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

function tuneMathsStem(text: string, topic: string, index: number, stretch: boolean) {
  const prefix = stretch && index % 3 === 0 ? "Summit Stretch: " : "";
  if (topic === "Challenge") return `${prefix}${text} Check both steps before choosing the closest answer.`;
  if (topic === "Multi-step reasoning") return `${prefix}${text} You may need to combine two operations.`;
  return `${prefix}${text}`;
}
