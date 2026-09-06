"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryChemicalAnalysisPureSubstancesAndFormulationsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Pure substance definition",
                  "detail": "Same composition throughout, cannot be separated by physical means."
            },
            {
                  "label": "Mixture types",
                  "detail": "Homogeneous (solution) vs heterogeneous (suspension, colloid)."
            },
            {
                  "label": "Empirical vs molecular",
                  "detail": "Empirical is simplest ratio; molecular equals actual atoms per molecule."
            },
            {
                  "label": "Molar mass use",
                  "detail": "Divide molar mass by empirical formula mass to find multiplier for molecular formula."
            },
            {
                  "label": "Physical separation",
                  "detail": "Mixtures can be separated by filtration, distillation, chromatography, etc."
            }
      ]}
    />
  );
}

export function ChemistryChemicalAnalysisChromatographyDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Rf calculation",
                  "detail": "Rf = (distance solute travels) ÷ (distance solvent front travels)."
            },
            {
                  "label": "Rf range",
                  "detail": "Values lie between 0 (no movement) and 1 (moves with solvent front)."
            },
            {
                  "label": "Polarity effect",
                  "detail": "More polar solutes have lower Rf on polar paper with polar solvent."
            },
            {
                  "label": "Solvent choice",
                  "detail": "Non‑polar solvents give higher Rf for non‑polar substances."
            },
            {
                  "label": "Reproducibility",
                  "detail": "Same solvent, paper, temperature → same Rf values."
            }
      ]}
    />
  );
}

export function ChemistryChemicalAnalysisTestsForCommonGasesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Hydrogen test",
                  "detail": "Burning splint → pop sound."
            },
            {
                  "label": "Oxygen test",
                  "detail": "Glowing splint → reignites brightly."
            },
            {
                  "label": "CO₂ test",
                  "detail": "Limewater → milky precipitate of CaCO₃."
            },
            {
                  "label": "Chlorine test",
                  "detail": "Damp red litmus → colourless; pungent smell."
            },
            {
                  "label": "Safety",
                  "detail": "Chlorine must be handled in a fume hood with protective gear."
            }
      ]}
    />
  );
}
