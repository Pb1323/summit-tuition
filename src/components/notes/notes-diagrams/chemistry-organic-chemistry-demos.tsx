"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryOrganicChemistryCrudeOilHydrocarbonsFractionalDistillationDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Crude oil composition",
                  "detail": "Mixture of alkanes, cycloalkanes, alkenes and aromatics."
            },
            {
                  "label": "Boiling‑point order",
                  "detail": "Petrol < kerosene < diesel < lubricating oil < waxes."
            },
            {
                  "label": "Alkane formula",
                  "detail": "CₙH₂ₙ₊₂ for straight‑chain alkanes."
            },
            {
                  "label": "Physical separation",
                  "detail": "Distillation does not change molecular structure."
            },
            {
                  "label": "Typical petrol range",
                  "detail": "Boiling point 35‑200 °C, mainly C₇‑C₁₁ alkanes."
            }
      ]}
    />
  );
}

export function ChemistryOrganicChemistryAlkanesAndAlkenesStructuresReactionsDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Alkane general formula",
                  "detail": "CₙH₂ₙ₊₂"
            },
            {
                  "label": "Alkene general formula",
                  "detail": "CₙH₂ₙ"
            },
            {
                  "label": "Combustion O₂ requirement",
                  "detail": "(3n+1) moles O₂ per mole alkane."
            },
            {
                  "label": "Hydrogenation product",
                  "detail": "Alkane with same carbon number."
            },
            {
                  "label": "Physical properties",
                  "detail": "Non‑polar, low reactivity, insoluble in water."
            }
      ]}
    />
  );
}

export function ChemistryOrganicChemistryCrackingPolymersAndExtensionConceptsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Typical cracking catalyst",
                  "detail": "Zeolite (solid acid) lowers temperature needed."
            },
            {
                  "label": "Common cracking product",
                  "detail": "Ethene, a key monomer for polyethylene."
            },
            {
                  "label": "Repeat unit of polyethylene",
                  "detail": "–CH₂–CH₂– (molar mass 28 g mol⁻¹)."
            },
            {
                  "label": "DP calculation",
                  "detail": "DP = mass of polymer ÷ molar mass of repeat unit."
            },
            {
                  "label": "Polymerisation type",
                  "detail": "Addition polymerisation involves opening a C=C double bond."
            }
      ]}
    />
  );
}
