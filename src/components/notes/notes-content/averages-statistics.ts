import type { TopicContent } from "../types";
import { AverageCalculator } from "../notes-diagrams/average-calculator";
import { BarChartReader } from "../notes-diagrams/bar-chart-reader";
import { PieChartExplorer } from "../notes-diagrams/pie-chart-explorer";

export const averagesStatisticsTopic: TopicContent = {
  slug: "averages-statistics",
  subject: "Maths",
  subjectSlug: "maths",
  title: "Averages & Statistics",
  description:
    "A practical module covering the four key averages, how to read charts and tables accurately, and how pie charts connect to simple probability — core skills for the data-handling questions on every 11+ Maths paper.",
  subtopics: [
    {
      id: "mean-median-mode-range",
      title: "Mean, Median, Mode & Range",
      tier: "Foundation",
      objective: "Calculate the mean, median, mode and range of a data set, and know when each one is the most useful.",
      whyMatters:
        "almost every 11+ paper includes at least one question asking you to find or compare averages, and examiners love testing whether you know which average to use.",
      conceptTitle: "The four averages",
      conceptBullets: [
        "<b style=\"color:#C9A24B\">Mean</b> = add up all the values, then divide by how many there are.",
        "<b style=\"color:#C9A24B\">Median</b> = the middle value once the data is sorted in order.",
        "<b style=\"color:#C9A24B\">Mode</b> = the value that appears most often (a set can have no mode, one mode, or several).",
        "<b style=\"color:#C9A24B\">Range</b> = largest value minus smallest value — it measures spread, not an average.",
      ],
      conceptNote:
        "<b>Common mistake:</b> forgetting to sort the data before finding the median — the middle position only means something once the numbers are in order.",
      glossary: [
        { term: "mean", def: "sum of values ÷ number of values" },
        { term: "median", def: "the middle value when sorted" },
        { term: "mode", def: "the most frequent value" },
        { term: "range", def: "highest value − lowest value" },
      ],
      diagramLabel: "Interactive · The Average Calculator",
      Diagram: AverageCalculator,
      worked: {
        question: "Find the mean, median, mode and range of: 4, 7, 7, 9, 12.",
        fastMethod:
          "Sum = 39, ÷5 = <b>mean 7.8</b>. Already sorted, middle value = <b>median 7</b>. 7 appears twice = <b>mode 7</b>. 12 − 4 = <b>range 8</b>.",
        steps: [
          "Mean: add all five values (4 + 7 + 7 + 9 + 12 = 39), then divide by 5 → 39 ÷ 5 = 7.8.",
          "Median: the data is already in order, so the middle (3rd) value is 7.",
          "Mode: 7 appears twice, more than any other value, so the mode is 7.",
          "Range: subtract the smallest value from the largest — 12 − 4 = 8.",
        ],
        answer: "Mean = <b>7.8</b> &nbsp;·&nbsp; Median = <b>7</b> &nbsp;·&nbsp; Mode = <b>7</b> &nbsp;·&nbsp; Range = <b>8</b>",
      },
      selfCheck: {
        prompt: "Before the practice set — what is the median of 2, 5, 9?",
        answer: "Already sorted — the middle value is <b>5</b>.",
      },
      questions: [
        { id: "mmr-q1", prompt: "Find the mean of 3, 5, 7, 9.", accept: ["6"], hint: "Add the values (24) then divide by how many there are (4)." },
        { id: "mmr-q2", prompt: "Find the median of 1, 3, 3, 6, 8, 9.", accept: ["4.5"], hint: "With 6 values (an even number), average the two middle values (3rd and 4th)." },
        { id: "mmr-q3", prompt: "Find the mode of 2, 4, 4, 4, 6, 8.", accept: ["4"], hint: "Which number appears most often?" },
        { id: "mmr-q4", prompt: "Find the range of 15, 3, 9, 21, 6.", accept: ["18"], hint: "Subtract the smallest value from the largest: 21 − 3." },
        { id: "mmr-q5", prompt: "Find the mean of 10, 10, 10, 10.", accept: ["10"], hint: "When every value is the same, the mean equals that value." },
        { id: "mmr-q6", prompt: "A set has values 5, 5, 8, 8. How many modes does it have?", accept: ["2", "two"], hint: "Both 5 and 8 appear twice — more often than any other value." },
      ],
      mistakes: [
        "Finding the median without sorting the data first.",
        "Confusing mean and median — the mean uses every value, the median only looks at the middle position.",
        "Forgetting that with an even number of values, the median is the average of the two middle numbers.",
      ],
      examTip:
        "If the question says \"on average,\" it usually means the mean — but check the wording carefully, as \"most common\" always means mode and \"middle value\" always means median.",
      searchTerms: ["mean", "median", "mode", "range", "average", "statistics", "data set"],
    },
    {
      id: "charts-tables",
      title: "Reading Charts & Tables",
      tier: "Standard",
      objective: "Accurately read values from bar charts, pictograms, tables and simple line graphs, including comparing and combining data.",
      whyMatters:
        "11+ papers frequently present information as a chart or table and expect you to extract, compare, and calculate with the data quickly and precisely.",
      conceptTitle: "Reading data displays",
      conceptBullets: [
        "Always check the <b style=\"color:#C9A24B\">axis labels</b> and scale before reading any values — a bar chart axis might go up in 2s or 5s, not 1s.",
        "In a <b style=\"color:#C9A24B\">pictogram</b>, check the key first — one symbol might represent more than one item.",
        "In a table, read across the correct row and down the correct column carefully.",
        "A line graph shows how a value changes — look for the steepest section to find the fastest change.",
      ],
      conceptNote:
        "<b>Common mistake:</b> misreading the scale on the y-axis — always check what one gridline square is worth before reading a bar's height.",
      glossary: [
        { term: "axis", def: "the labelled line showing categories or a scale" },
        { term: "pictogram", def: "a chart using symbols to represent amounts" },
        { term: "key", def: "explains what one symbol or colour represents" },
        { term: "scale", def: "the value each gridline step represents" },
      ],
      diagramLabel: "Interactive · Read the Bar Chart",
      Diagram: BarChartReader,
      worked: {
        question: "The bar chart shows books borrowed each day: Mon 12, Tue 18, Wed 9, Thu 24, Fri 15. How many more books were borrowed on Thursday than Wednesday?",
        fastMethod: "Read both bars directly: 24 − 9 = <b>15</b>.",
        steps: [
          "Find Thursday's value by reading up to the top of its bar against the scale: 24.",
          "Find Wednesday's value the same way: 9.",
          "Subtract to find the difference: 24 − 9 = 15.",
        ],
        answer: "24 − 9 = <b>15 more books</b>",
      },
      selfCheck: {
        prompt: "Before the practice set — if one pictogram symbol = 5 items and a row shows 3 symbols, how many items is that?",
        answer: "3 × 5 = <b>15 items</b>.",
      },
      questions: [
        { id: "ct-q1", prompt: "On the library chart (Mon 12, Tue 18, Wed 9, Thu 24, Fri 15), which day had the most books borrowed?", accept: ["thursday", "thu"], hint: "Compare all five values — which is the largest?" },
        { id: "ct-q2", prompt: "Using the same chart, what is the total borrowed on Monday and Friday combined?", accept: ["27"], hint: "Add Monday's value (12) to Friday's value (15)." },
        { id: "ct-q3", prompt: "A pictogram key shows 1 symbol = 4 pupils. A row has 5 symbols. How many pupils does that represent?", accept: ["20"], hint: "Multiply the number of symbols by the value of one symbol." },
        { id: "ct-q4", prompt: "A table shows rainfall (mm): Jan 60, Feb 45, Mar 50. What is the mean monthly rainfall?", accept: ["51.67", "51.7", "155/3"], hint: "Add the three values (155) and divide by 3." },
        { id: "ct-q5", prompt: "A y-axis has gridlines every 2 units. A bar reaches the 6th gridline. What value does it show?", accept: ["12"], hint: "Multiply the number of gridlines by the value of one gridline step." },
      ],
      mistakes: [
        "Reading a bar's value from the wrong gridline because the scale doesn't go up in 1s.",
        "Forgetting to check a pictogram's key, and assuming each symbol = 1 item.",
        "Reading the wrong row or column in a table when several categories look similar.",
      ],
      examTip:
        "Before answering any chart question, spend five seconds checking the title, axis labels, and scale — this prevents almost all reading errors under time pressure.",
      searchTerms: ["bar chart", "pictogram", "table", "line graph", "axis", "scale", "key", "data"],
    },
    {
      id: "pie-charts-probability",
      title: "Pie Charts & Simple Probability",
      tier: "Extension",
      objective: "Read proportions from a pie chart and calculate simple probability as a fraction, decimal or percentage.",
      whyMatters:
        "pie charts and probability questions combine fractions and percentages with data handling, making them a favourite way for 11+ papers to test several skills at once.",
      conceptTitle: "Proportions and probability",
      conceptBullets: [
        "A pie chart's whole circle represents <b style=\"color:#C9A24B\">100%</b> (or the whole data set) — each slice is a proportion of that whole.",
        "To find an amount from a percentage slice: (percentage ÷ 100) × total.",
        "<b style=\"color:#C9A24B\">Probability</b> = number of favourable outcomes ÷ total number of possible outcomes.",
        "Probability is always written as a fraction, decimal or percentage between 0 (impossible) and 1 (certain).",
      ],
      conceptNote:
        "<b>Common mistake:</b> treating pie chart percentages as if they add up to more or less than 100% — all the slices in one pie chart must always total 100%.",
      glossary: [
        { term: "pie chart", def: "a circle divided into slices showing proportions" },
        { term: "proportion", def: "a share of the whole, often as a percentage or fraction" },
        { term: "probability", def: "the chance of an outcome, from 0 to 1" },
        { term: "outcome", def: "a possible result of an event" },
      ],
      diagramLabel: "Interactive · Explore the Pie Chart",
      Diagram: PieChartExplorer,
      worked: {
        question: "In a class of 60 pupils, a pie chart shows 40% chose Football as their favourite sport. How many pupils chose Football, and what is the probability a pupil picked at random chose Football?",
        fastMethod: "40% of 60 = 0.4 × 60 = <b>24 pupils</b>. Probability = 24/60 = <b>2/5</b>.",
        steps: [
          "Convert the percentage to a fraction or decimal: 40% = 40/100 = 0.4.",
          "Multiply by the total number of pupils: 0.4 × 60 = 24 pupils chose Football.",
          "Probability = favourable outcomes ÷ total outcomes = 24/60.",
          "Simplify the fraction: 24/60 = 2/5 (divide both by 12).",
        ],
        answer: "24 pupils chose Football &nbsp;·&nbsp; Probability = <b>2/5</b>",
      },
      selfCheck: {
        prompt: "Before the practice set — a bag has 3 red and 7 blue counters. What is the probability of picking red?",
        answer: "3 favourable out of 10 total = <b>3/10</b>.",
      },
      questions: [
        { id: "pp-q1", prompt: "A pie chart shows Swimming as 25% of 60 pupils. How many pupils chose Swimming?", accept: ["15"], hint: "25% = 1/4, so find a quarter of 60." },
        { id: "pp-q2", prompt: "In a pie chart with 4 slices of 40%, 25%, 20% and the rest, what percentage is the missing slice?", accept: ["15", "15%"], hint: "All slices must add up to 100%." },
        { id: "pp-q3", prompt: "A spinner has 8 equal sections, 2 of which are red. What is the probability of landing on red, as a fraction?", accept: ["1/4", "2/8", "0.25"], hint: "Probability = favourable outcomes ÷ total outcomes, then simplify." },
        { id: "pp-q4", prompt: "A bag has 5 yellow and 5 green balls. What is the probability of picking green?", accept: ["1/2", "0.5", "5/10"], hint: "There are 10 balls in total, 5 of which are green." },
        { id: "pp-q5", prompt: "A pie chart slice representing 20% covers a class of 30 pupils' choice for Athletics. How many pupils is that?", accept: ["6"], hint: "20% = 1/5, so find a fifth of 30." },
        { id: "pp-q6", prompt: "What is the probability of an impossible event?", accept: ["0"], hint: "Probability ranges from 0 (impossible) to 1 (certain)." },
      ],
      mistakes: [
        "Forgetting that all the percentages in a pie chart must add up to 100%.",
        "Not simplifying a probability fraction to its lowest terms.",
        "Mixing up the number of favourable outcomes with the total number of outcomes.",
      ],
      examTip:
        "When a pie chart question gives percentages instead of degrees, convert with (percentage ÷ 100) × total — do this once carefully rather than estimating from the slice size.",
      searchTerms: ["pie chart", "probability", "percentage", "proportion", "fraction", "chance", "outcome"],
    },
  ],
};
