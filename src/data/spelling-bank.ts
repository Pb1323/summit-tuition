export interface SpellingWord {
  id: string;
  word: string;
  sentence: string;
  distractors: string[];
  difficulty: "foundation" | "standard" | "stretch";
}

function blank(sentence: string, word: string) {
  const pattern = new RegExp(word, "i");
  return sentence.replace(pattern, "_____");
}

interface RawWord {
  word: string;
  example: string;
  distractors: string[];
  difficulty: SpellingWord["difficulty"];
}

const RAW_WORDS: RawWord[] = [
  { word: "separate", example: "Please keep the red and blue counters separate.", distractors: ["seperate", "seperete", "separete"], difficulty: "foundation" },
  { word: "definitely", example: "She will definitely arrive before the bell rings.", distractors: ["definately", "definatly", "defiantly"], difficulty: "foundation" },
  { word: "necessary", example: "It is not necessary to bring a calculator today.", distractors: ["neccessary", "necesary", "neccesary"], difficulty: "foundation" },
  { word: "occurred", example: "The mix-up occurred during the first lesson.", distractors: ["occured", "ocurred", "occureed"], difficulty: "standard" },
  { word: "privilege", example: "Reading in the library corner is a real privilege.", distractors: ["priviledge", "priviege", "privelege"], difficulty: "stretch" },
  { word: "rhythm", example: "The drummer kept a steady rhythm throughout the song.", distractors: ["rythm", "rhythem", "rythem"], difficulty: "stretch" },
  { word: "questionnaire", example: "Every visitor filled in a short questionnaire at the gate.", distractors: ["questionaire", "questionnare", "questionair"], difficulty: "stretch" },
  { word: "conscience", example: "Her conscience wouldn't let her ignore the lost purse.", distractors: ["concious", "consience", "conscioence"], difficulty: "stretch" },
  { word: "embarrass", example: "He didn't want to embarrass his sister at the concert.", distractors: ["embarass", "embarras", "emberrass"], difficulty: "standard" },
  { word: "accommodate", example: "The hall can accommodate two hundred parents comfortably.", distractors: ["acommodate", "accomodate", "accommadate"], difficulty: "stretch" },
  { word: "believe", example: "I believe the answer is hidden in the second paragraph.", distractors: ["beleive", "belive", "beleve"], difficulty: "foundation" },
  { word: "achieve", example: "With daily practice, you can achieve a much higher score.", distractors: ["acheive", "achive", "acheve"], difficulty: "foundation" },
  { word: "receive", example: "Students will receive their results next Friday.", distractors: ["recieve", "receve", "receeve"], difficulty: "foundation" },
  { word: "friend", example: "My best friend moved to a new school last term.", distractors: ["freind", "frend", "friand"], difficulty: "foundation" },
  { word: "weird", example: "It felt weird walking into an empty classroom.", distractors: ["wierd", "weerd", "weard"], difficulty: "foundation" },
  { word: "height", example: "The fence is roughly the same height as the door.", distractors: ["heighth", "hight", "heigth"], difficulty: "foundation" },
  { word: "eight", example: "Registration starts at eight o'clock sharp.", distractors: ["eigth", "eght", "aight"], difficulty: "foundation" },
  { word: "neighbour", example: "Our neighbour lent us a ladder for the weekend.", distractors: ["neighbor", "nieghbour", "neighbuor"], difficulty: "standard" },
  { word: "science", example: "Science club meets every Tuesday after school.", distractors: ["sceince", "sience", "scince"], difficulty: "foundation" },
  { word: "physical", example: "PE lessons focus on physical fitness and teamwork.", distractors: ["phyiscal", "phisical", "physcial"], difficulty: "standard" },
  { word: "beautiful", example: "The garden looked beautiful after the spring rain.", distractors: ["beutiful", "beatiful", "beuatiful"], difficulty: "foundation" },
  { word: "business", example: "Her uncle runs a small business selling bicycles.", distractors: ["buisness", "busness", "bussiness"], difficulty: "standard" },
  { word: "calendar", example: "There's a school trip marked on the calendar for June.", distractors: ["calender", "calandar", "callendar"], difficulty: "standard" },
  { word: "category", example: "Sort each animal into the correct category.", distractors: ["catagory", "cattegory", "categary"], difficulty: "standard" },
  { word: "cemetery", example: "The old cemetery sits behind the village church.", distractors: ["cemetary", "cematery", "cemettery"], difficulty: "stretch" },
  { word: "column", example: "Add the numbers in the final column of the table.", distractors: ["collumn", "colum", "collum"], difficulty: "standard" },
  { word: "committee", example: "The school council committee meets on Mondays.", distractors: ["comittee", "committe", "commitee"], difficulty: "stretch" },
  { word: "conscious", example: "Try to stay conscious of your time in each section.", distractors: ["concious", "consious", "conscius"], difficulty: "stretch" },
  { word: "curiosity", example: "Her curiosity led her to the back of the museum.", distractors: ["curiousity", "curiosety", "curriosity"], difficulty: "stretch" },
  { word: "definite", example: "There is no definite answer to this riddle.", distractors: ["definate", "definit", "defenite"], difficulty: "standard" },
  { word: "disappear", example: "The magician made the coin disappear instantly.", distractors: ["dissapear", "disapear", "dissappear"], difficulty: "standard" },
  { word: "disappoint", example: "A rainy sports day would disappoint the whole class.", distractors: ["dissapoint", "disapoint", "dissappoint"], difficulty: "standard" },
  { word: "embarrassed", example: "He felt embarrassed after tripping on the stage.", distractors: ["embarassed", "embarrased", "emberrassed"], difficulty: "standard" },
  { word: "environment", example: "Recycling helps protect the local environment.", distractors: ["enviroment", "envirnoment", "enviornment"], difficulty: "standard" },
  { word: "equipment", example: "Remember to pack your PE equipment on Thursday.", distractors: ["equiptment", "equipement", "equipmant"], difficulty: "standard" },
  { word: "exaggerate", example: "Try not to exaggerate the size of the fish you caught.", distractors: ["exagerate", "exxagerate", "exaggarate"], difficulty: "stretch" },
  { word: "existence", example: "Scientists debated the existence of the new species.", distractors: ["existance", "existince", "exsistence"], difficulty: "stretch" },
  { word: "experience", example: "The residential trip was a wonderful experience.", distractors: ["experiance", "expereince", "experence"], difficulty: "standard" },
  { word: "familiar", example: "The route home felt familiar even in the dark.", distractors: ["familliar", "familier", "farmiliar"], difficulty: "standard" },
  { word: "february", example: "Half-term begins in the middle of February.", distractors: ["febuary", "feburary", "februrary"], difficulty: "standard" },
  { word: "foreign", example: "She is learning a foreign language after school.", distractors: ["foriegn", "foregin", "foriegen"], difficulty: "standard" },
  { word: "forty", example: "There are forty chairs set out for assembly.", distractors: ["fourty", "forety", "fortee"], difficulty: "foundation" },
  { word: "government", example: "The class debated how local government spends money.", distractors: ["goverment", "governement", "govenment"], difficulty: "standard" },
  { word: "grammar", example: "Today's lesson covers grammar and punctuation.", distractors: ["grammer", "gramer", "grammear"], difficulty: "foundation" },
  { word: "guarantee", example: "Practising daily is no guarantee of a perfect score.", distractors: ["garantee", "guarentee", "gaurantee"], difficulty: "stretch" },
  { word: "harass", example: "The school has a clear policy against any pupil trying to harass another.", distractors: ["harrass", "haras", "harrass"], difficulty: "stretch" },
  { word: "humorous", example: "The teacher told a humorous story to open the lesson.", distractors: ["humerous", "humourous", "humorus"], difficulty: "stretch" },
  { word: "immediately", example: "Line up immediately when the whistle blows.", distractors: ["imediately", "immediatly", "imediatley"], difficulty: "standard" },
  { word: "independent", example: "Independent reading time comes after lunch.", distractors: ["independant", "independint", "independet"], difficulty: "standard" },
  { word: "interrupt", example: "It's rude to interrupt while someone else is speaking.", distractors: ["interupt", "interrput", "interrupte"], difficulty: "standard" },
  { word: "jewellery", example: "Grandma keeps her jewellery in a small wooden box.", distractors: ["jewelry", "jewlery", "jewellry"], difficulty: "stretch" },
  { word: "knowledge", example: "The quiz tests general knowledge across every subject.", distractors: ["knowlege", "knowledg", "knolwedge"], difficulty: "standard" },
  { word: "leisure", example: "Weekends are for homework and a little leisure time.", distractors: ["liesure", "lesiure", "leisrue"], difficulty: "stretch" },
  { word: "liaise", example: "Teachers liaise with parents before the trip.", distractors: ["liase", "liaze", "liaisse"], difficulty: "stretch" },
  { word: "library", example: "The library is open every lunchtime this week.", distractors: ["libary", "librery", "librarry"], difficulty: "foundation" },
  { word: "license", example: "The driving license test has both theory and practice.", distractors: ["lisence", "licence", "lisense"], difficulty: "stretch" },
  { word: "lightning", example: "A flash of lightning lit up the sky before the storm.", distractors: ["lightening", "lighning", "lightning"], difficulty: "standard" },
  { word: "maintenance", example: "The caretaker handles all building maintenance.", distractors: ["maintainance", "maintenence", "maintanance"], difficulty: "stretch" },
  { word: "medicine", example: "The nurse keeps medicine locked in a cabinet.", distractors: ["medcine", "medicin", "medisine"], difficulty: "standard" },
  { word: "millennium", example: "The school was built at the turn of the millennium.", distractors: ["millenium", "milennium", "millenneum"], difficulty: "stretch" },
  { word: "miniature", example: "He built a miniature model of the castle for homework.", distractors: ["minature", "miniture", "minitature"], difficulty: "stretch" },
  { word: "mischievous", example: "The mischievous puppy chewed through both shoelaces.", distractors: ["mischevous", "mischievious", "mischeivous"], difficulty: "stretch" },
  { word: "nuisance", example: "The buzzing wasp was a real nuisance during the picnic.", distractors: ["nusance", "nuisence", "nuisanse"], difficulty: "stretch" },
  { word: "occasion", example: "A school prize evening is a special occasion.", distractors: ["ocasion", "occassion", "ocassion"], difficulty: "standard" },
  { word: "occasionally", example: "We occasionally have a surprise quiz on a Friday.", distractors: ["ocasionally", "occassionally", "occasionaly"], difficulty: "standard" },
  { word: "opportunity", example: "The trip is a great opportunity to practise French.", distractors: ["oportunity", "opportunety", "opportunitty"], difficulty: "standard" },
  { word: "parliament", example: "The class visited parliament during their trip to London.", distractors: ["parliment", "parlament", "parlement"], difficulty: "stretch" },
  { word: "pavilion", example: "The cricket pavilion overlooks the school field.", distractors: ["pavillion", "pavilon", "paviliun"], difficulty: "stretch" },
  { word: "persuade", example: "Her letter tried to persuade the council to keep the park open.", distractors: ["persaude", "pursuade", "persuaid"], difficulty: "standard" },
  { word: "possess", example: "Few students possess a full set of geometry tools.", distractors: ["posess", "posses", "possesss"], difficulty: "standard" },
  { word: "prejudice", example: "The story explores prejudice in a small town.", distractors: ["predjudice", "prejudise", "predudice"], difficulty: "stretch" },
  { word: "profession", example: "She wants to enter the teaching profession one day.", distractors: ["proffession", "profesion", "proffesion"], difficulty: "standard" },
  { word: "pronunciation", example: "The teacher corrected her pronunciation of the French word.", distractors: ["pronounciation", "pronunciaton", "pronuncation"], difficulty: "stretch" },
  { word: "psychology", example: "The topic touches on the psychology of memory.", distractors: ["pyschology", "psycology", "sycology"], difficulty: "stretch" },
  { word: "queue", example: "A long queue formed outside the sports hall.", distractors: ["que", "qeue", "queu"], difficulty: "standard" },
  { word: "recommend", example: "I would recommend reading the whole chapter first.", distractors: ["recomend", "reccomend", "recommand"], difficulty: "standard" },
  { word: "relevant", example: "Only include facts that are relevant to the question.", distractors: ["relevent", "revelant", "relavant"], difficulty: "standard" },
  { word: "restaurant", example: "The family celebrated at a restaurant near the station.", distractors: ["restaraunt", "restarant", "resturant"], difficulty: "standard" },
  { word: "rhyme", example: "Each line of the poem ends with a matching rhyme.", distractors: ["ryhme", "rime", "rhime"], difficulty: "standard" },
  { word: "sincerely", example: "The letter ended, \"Yours sincerely\".", distractors: ["sincerly", "sincerelly", "sinceerly"], difficulty: "standard" },
  { word: "successful", example: "Their fundraiser was a hugely successful event.", distractors: ["succesful", "sucessful", "successfull"], difficulty: "standard" },
  { word: "surprise", example: "The class planned a surprise for their teacher's birthday.", distractors: ["suprise", "surprize", "suprize"], difficulty: "foundation" },
  { word: "temperature", example: "The thermometer showed the temperature had dropped overnight.", distractors: ["temperatur", "tempreature", "temperture"], difficulty: "standard" },
  { word: "tomorrow", example: "The trip has been moved to tomorrow morning.", distractors: ["tommorow", "tomorow", "tommorrow"], difficulty: "foundation" },
  { word: "twelfth", example: "Her birthday falls on the twelfth of March.", distractors: ["twelth", "twelveth", "twelfeth"], difficulty: "standard" },
  { word: "unnecessary", example: "Bringing a torch to a morning trip is unnecessary.", distractors: ["unecessary", "unneccessary", "unnecesary"], difficulty: "stretch" },
  { word: "vehicle", example: "The delivery vehicle parked outside the school gates.", distractors: ["vehical", "vehicel", "vehichle"], difficulty: "standard" },
  { word: "vacuum", example: "The caretaker will vacuum the hall before the concert.", distractors: ["vaccuum", "vacume", "vaccum"], difficulty: "stretch" },
  { word: "Wednesday", example: "Swimming lessons are every Wednesday afternoon.", distractors: ["Wednsday", "Wensday", "Wedensday"], difficulty: "foundation" },
];

export const SPELLING_WORDS: SpellingWord[] = RAW_WORDS.map((entry, index) => ({
  id: `sp-${index + 1}`,
  word: entry.word,
  sentence: blank(entry.example, entry.word),
  distractors: entry.distractors,
  difficulty: entry.difficulty,
}));
