"use client";

import { WordChipPicker } from "./word-chip-picker";

export function WhatIsACodeQuestionDemo() {
  return (
    <WordChipPicker
      instruction="If A=1, B=2, C=3... click the number that codes the letter 'E'."
      words={["3", "4", "5", "6", "7"]}
      correctIdx={2}
      correction={'"E" is the 5th letter of the alphabet, so it codes to 5 — counting from A=1 gives A,B,C,D,E as 1,2,3,4,5.'}
      wrongHint="count from A=1 on your fingers or on paper — don't try to place E in the alphabet from memory alone."
    />
  );
}

export function AlphabetPositionShiftDemo() {
  return (
    <WordChipPicker
      instruction="Each letter is coded as the letter 2 places later in the alphabet (A→C, B→D...). Click the code for 'H'."
      words={["F", "G", "I", "J", "K"]}
      correctIdx={3}
      correction={'shifting "H" forward by 2 places (H→I→J) gives "J" — writing out H, I, J on paper makes the count-along impossible to get wrong.'}
      wrongHint="write H and then count two letters forward, one at a time — don't jump straight to a guess."
    />
  );
}

export function TwoWayCodeTranslationDemo() {
  return (
    <WordChipPicker
      instruction="In a code, CAT is written 3-1-20 (using A=1...Z=26). Click the number that codes the letter in DOG that comes first."
      words={["3", "4", "7", "15", "20"]}
      correctIdx={1}
      correction={'DOG starts with "D", the 4th letter of the alphabet — so it codes to 4. The CAT example just confirms the rule is a straight A=1...Z=26 key.'}
      wrongHint="ignore the CAT example's exact numbers — use it only to confirm the rule, then apply that rule fresh to D."
    />
  );
}

export function LetterValueSumDemo() {
  return (
    <WordChipPicker
      instruction="Using A=1, B=2, C=3... a word's code is the sum of its letters' values. Click the code for 'BED' (B=2, E=5, D=4)."
      words={["9", "10", "11", "12", "13"]}
      correctIdx={2}
      correction={'2 + 5 + 4 = 11 — writing each letter\'s value underneath it before adding stops a rushed mental sum from slipping by one.'}
      wrongHint="write B, E, D in a row with each letter's value underneath, then add the three numbers — don't add in your head."
    />
  );
}

export function CombinedRuleCodeDemo() {
  return (
    <WordChipPicker
      instruction="Rule: shift each letter forward by 1, then convert to its A=1...Z=26 value. Click the code for the letter 'C' under this two-step rule."
      words={["3", "4", "5", "6", "26"]}
      correctIdx={1}
      correction={'"C" shifted forward by 1 becomes "D" — and D\'s value is 4. Doing the two steps one at a time, and writing down the middle result ("D"), stops the steps blurring into each other.'}
      wrongHint="do this in two separate, written steps — first find the shifted letter, then look up its value. Don't try to combine both moves in your head at once."
    />
  );
}

export function CodeSpeedDrillDemo() {
  return (
    <WordChipPicker
      instruction="Timed drill — A=1...Z=26. Click the code for 'J' as fast as you can, using your written key, not memory."
      words={["8", "9", "10", "11", "12"]}
      correctIdx={2}
      correction={'"J" is the 10th letter — with a written A=1...Z=26 key already down on paper, this is a lookup, not a calculation, which is exactly why writing the key first makes code questions faster, not slower.'}
      wrongHint="if you already wrote out A=1...Z=26 down the margin, this is just reading off a number — check your key rather than recounting from A."
    />
  );
}
