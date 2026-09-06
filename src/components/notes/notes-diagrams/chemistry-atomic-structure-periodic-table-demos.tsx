"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryAtomicStructurePeriodicTableSubatomicParticlesAndAtomicNotationDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Charge of a proton",
                  "detail": "+1 elementary charge."
            },
            {
                  "label": "Charge of an electron",
                  "detail": "-1 elementary charge."
            },
            {
                  "label": "Neutron charge",
                  "detail": "Neutral (0 charge)."
            },
            {
                  "label": "Atomic number symbol",
                  "detail": "Z, placed as subscript left of element symbol."
            },
            {
                  "label": "Mass number symbol",
                  "detail": "A, placed as superscript left of element symbol."
            }
      ]}
    />
  );
}

export function ChemistryAtomicStructurePeriodicTableIsotopesAndRelativeAtomicMassDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Isotope definition",
                  "detail": "Same Z, different A."
            },
            {
                  "label": "Ar calculation step",
                  "detail": "Σ (mass × fraction) = Ar."
            },
            {
                  "label": "Percent to decimal",
                  "detail": "Divide by 100."
            },
            {
                  "label": "Rounded Ar usage",
                  "detail": "Used in mole‑mass calculations."
            },
            {
                  "label": "Typical exam format",
                  "detail": "Give mass numbers and percentages, ask for Ar."
            }
      ]}
    />
  );
}

export function ChemistryAtomicStructurePeriodicTableElectronicStructureAndPeriodicTrendsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Shell capacity formula",
                  "detail": "Maximum electrons = 2n² for shell n."
            },
            {
                  "label": "Group 1 valence",
                  "detail": "1 electron; forms +1 cation."
            },
            {
                  "label": "Group 7 valence",
                  "detail": "7 electrons; forms –1 anion."
            },
            {
                  "label": "Group 0 valence",
                  "detail": "Full outer shell; generally does not form ions."
            },
            {
                  "label": "Trend down Group 1",
                  "detail": "Reactivity increases as atomic radius grows."
            }
      ]}
    />
  );
}
