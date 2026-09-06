"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryEnergyChangesExothermicAndEndothermicReactionsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Exothermic sign",
                  "detail": "ΔH is negative for exothermic reactions."
            },
            {
                  "label": "Endothermic sign",
                  "detail": "ΔH is positive for endothermic reactions."
            },
            {
                  "label": "Temperature effect",
                  "detail": "Exothermic → temperature ↑; Endothermic → temperature ↓."
            },
            {
                  "label": "Units",
                  "detail": "Energy change is expressed in kJ mol⁻¹."
            },
            {
                  "label": "Calorimetry use",
                  "detail": "A calorimeter measures heat released or absorbed."
            }
      ]}
    />
  );
}

export function ChemistryEnergyChangesReactionProfilesAndActivationEnergyDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Ea definition",
                  "detail": "Energy barrier between reactants and transition state."
            },
            {
                  "label": "ΔH on diagram",
                  "detail": "Vertical difference between start and end points."
            },
            {
                  "label": "Exothermic shape",
                  "detail": "Products lower than reactants on the energy axis."
            },
            {
                  "label": "Endothermic shape",
                  "detail": "Products higher than reactants on the energy axis."
            },
            {
                  "label": "Rate relation",
                  "detail": "Higher Ea → slower rate at constant temperature."
            }
      ]}
    />
  );
}

export function ChemistryEnergyChangesSimpleCellsAndBatteriesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Spontaneous direction",
                  "detail": "Positive E°cell indicates a spontaneous reaction."
            },
            {
                  "label": "Anode sign",
                  "detail": "Anode potential is taken as a reduction potential and subtracted."
            },
            {
                  "label": "Standard conditions",
                  "detail": "E° values are measured at 1 M, 25 °C, 1 atm."
            },
            {
                  "label": "Salt bridge role",
                  "detail": "Completes circuit and prevents charge buildup."
            },
            {
                  "label": "Cell notation",
                  "detail": "Written as anode | anode solution || cathode solution | cathode."
            }
      ]}
    />
  );
}
