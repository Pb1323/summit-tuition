"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryQuantitativeChemistryConservationOfMassBalancingEquationsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Mass conservation",
                  "detail": "Total mass of reactants equals total mass of products."
            },
            {
                  "label": "Coefficients",
                  "detail": "Only coefficients change when balancing, never subscripts."
            },
            {
                  "label": "Balanced equation",
                  "detail": "Shows the correct mole ratio between reactants and products."
            },
            {
                  "label": "Check atoms",
                  "detail": "Always recount atoms after each adjustment."
            },
            {
                  "label": "Exam format",
                  "detail": "Balancing questions may be multiple‑choice or require a written equation."
            }
      ]}
    />
  );
}

export function ChemistryQuantitativeChemistryRelativeFormulaMassMolesAvogadroConstantDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Mr units",
                  "detail": "g mol⁻¹, numerically equal to the formula mass in amu."
            },
            {
                  "label": "Avogadro's number",
                  "detail": "6.02×10²³ particles per mole."
            },
            {
                  "label": "Moles = mass/Mr",
                  "detail": "Use grams and Mr in g mol⁻¹."
            },
            {
                  "label": "Particles = moles×6.02×10²³",
                  "detail": "Convert moles to number of atoms/molecules."
            },
            {
                  "label": "Significant figures",
                  "detail": "Answer should have same SF as given data."
            }
      ]}
    />
  );
}

export function ChemistryQuantitativeChemistryConcentrationPercentageYieldAtomEconomyDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "c = n/V",
                  "detail": "Concentration equals moles divided by volume in litres."
            },
            {
                  "label": "% yield formula",
                  "detail": "(actual ÷ theoretical) × 100."
            },
            {
                  "label": "Atom economy formula",
                  "detail": "(mass of product ÷ total mass of reactants) × 100."
            },
            {
                  "label": "Theoretical yield",
                  "detail": "Maximum amount of product predicted by stoichiometry."
            },
            {
                  "label": "Significant figures",
                  "detail": "Final answer must match the least precise datum."
            }
      ]}
    />
  );
}
