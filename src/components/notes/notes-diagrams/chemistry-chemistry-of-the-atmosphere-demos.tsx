"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryChemistryOfTheAtmosphereCompositionAndEvolutionOfTheAtmosphereDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Major gases",
                  "detail": "Nitrogen ~78%, oxygen ~21% by volume."
            },
            {
                  "label": "Argon proportion",
                  "detail": "Argon makes up about 0.93% of the atmosphere."
            },
            {
                  "label": "CO₂ rise",
                  "detail": "Pre‑industrial CO₂ was ~280 ppm; now ~420 ppm."
            },
            {
                  "label": "Water vapour",
                  "detail": "Variable; up to 4% in humid tropical air."
            },
            {
                  "label": "First oxygen rise",
                  "detail": "Great Oxidation Event ~2.4 billion years ago."
            }
      ]}
    />
  );
}

export function ChemistryChemistryOfTheAtmosphereGreenhouseEffectAndGlobalClimateChangeDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "CO₂ increase since 1750",
                  "detail": "From ~280 ppm to ~420 ppm, a ~50% rise."
            },
            {
                  "label": "Average temperature rise",
                  "detail": "Global mean surface temperature has risen ~1.1 °C since pre‑industrial times."
            },
            {
                  "label": "Main greenhouse gases",
                  "detail": "CO₂, CH₄, N₂O and water vapour account for > 95% of the effect."
            },
            {
                  "label": "Radiative forcing of CO₂",
                  "detail": "Each doubling of CO₂ gives ~3.7 W m⁻² forcing."
            },
            {
                  "label": "IPCC target",
                  "detail": "Limit warming to 1.5 °C above pre‑industrial levels."
            }
      ]}
    />
  );
}

export function ChemistryChemistryOfTheAtmosphereAtmosphericPollutantsFromFuelsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "CH₄ combustion",
                  "detail": "CH₄ + 2O₂ → CO₂ + 2H₂O; 1 mol CH₄ gives 1 mol CO₂."
            },
            {
                  "label": "CO₂ from petrol",
                  "detail": "Burning 1 L of petrol (~0.75 kg) releases ≈2.3 kg CO₂."
            },
            {
                  "label": "SO₂ source",
                  "detail": "Coal with 1% S produces 2 kg SO₂ per kg of coal burned."
            },
            {
                  "label": "NOₓ formation",
                  "detail": "High flame temperatures (>1500 °C) promote N₂ + O₂ → NO."
            },
            {
                  "label": "Catalytic converter efficiency",
                  "detail": "Reduces CO, HC, NOₓ by up to 90% in modern cars."
            }
      ]}
    />
  );
}
