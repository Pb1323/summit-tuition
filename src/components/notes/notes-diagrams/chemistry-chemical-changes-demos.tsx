"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryChemicalChangesReactivitySeriesAndMetalReactionsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Hydrogen position",
                  "detail": "Metals above hydrogen react with acids; those below do not."
            },
            {
                  "label": "Water reaction",
                  "detail": "Only K, Na, Ca react noticeably with cold water."
            },
            {
                  "label": "Displacement rule",
                  "detail": "A metal can displace any metal lower in the series from its salt solution."
            },
            {
                  "label": "Acid test",
                  "detail": "Acid + metal → salt + H₂ (bubbles) if metal is above hydrogen."
            },
            {
                  "label": "Series order",
                  "detail": "K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au."
            }
      ]}
    />
  );
}

export function ChemistryChemicalChangesExtractionAndReductionOfMetalsDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Electrolysis metals",
                  "detail": "K, Na, Ca, Mg are extracted by molten‑salt electrolysis."
            },
            {
                  "label": "Carbon reduction",
                  "detail": "Fe, Cu, Zn are reduced with carbon or CO in furnaces."
            },
            {
                  "label": "Gold extraction",
                  "detail": "Au is recovered by electrolytic refining or cyanide leaching."
            },
            {
                  "label": "Cathode reaction",
                  "detail": "Mⁿ⁺ + ne⁻ → M (metal deposits at cathode)."
            },
            {
                  "label": "Energy requirement",
                  "detail": "Higher reactivity → higher energy (electrolysis) needed."
            }
      ]}
    />
  );
}

export function ChemistryChemicalChangesAcidBaseReactionsPhAndElectrolysisOfSolutionsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "pH calculation",
                  "detail": "pH = –log[H⁺]; a 0.01 M HCl solution has pH = 2."
            },
            {
                  "label": "Acid‑metal gas",
                  "detail": "Metal + acid → salt + H₂ (visible bubbles)."
            },
            {
                  "label": "Neutralisation heat",
                  "detail": "Exothermic; often used in hot packs."
            },
            {
                  "label": "Aqueous electrolysis",
                  "detail": "Cations go to cathode, anions to anode; consider reduction potentials."
            },
            {
                  "label": "Water electrolysis gases",
                  "detail": "2H₂O → 2H₂ + O₂; 2 L H₂ per 1 L O₂ at STP."
            }
      ]}
    />
  );
}
