"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function BiologyBioenergeticsPhotosynthesisBasicsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Overall equation",
                  "detail": "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂."
            },
            {
                  "label": "Light limit",
                  "detail": "Rate rises with light until chlorophyll is saturated (~10 000 lux)."
            },
            {
                  "label": "CO₂ limit",
                  "detail": "Rate falls if CO₂ < 0.03% in the atmosphere."
            },
            {
                  "label": "Optimal temperature",
                  "detail": "≈25‑30 °C for most crops; above 35 °C enzymes denature."
            },
            {
                  "label": "Stomatal control",
                  "detail": "Plants close stomata to reduce water loss, which also limits CO₂ intake."
            }
      ]}
    />
  );
}

export function BiologyBioenergeticsUsesOfGlucoseRespirationDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Aerobic equation",
                  "detail": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ≈ 30 ATP."
            },
            {
                  "label": "Anaerobic (ethanol) equation",
                  "detail": "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2 ATP."
            },
            {
                  "label": "ATP yield difference",
                  "detail": "Aerobic ≈30 ATP; anaerobic = 2 ATP per glucose."
            },
            {
                  "label": "O₂ debt purpose",
                  "detail": "Re‑oxidises NADH and clears lactic acid after strenuous activity."
            },
            {
                  "label": "Location",
                  "detail": "Aerobic in mitochondria; anaerobic in cytoplasm."
            }
      ]}
    />
  );
}

export function BiologyBioenergeticsMetabolismAndEnergyFlowDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Photosynthetic efficiency",
                  "detail": "Typical crops convert ~5 % of solar energy into glucose."
            },
            {
                  "label": "Respiratory ATP per glucose",
                  "detail": "≈30 ATP aerobically, 2 ATP anaerobically."
            },
            {
                  "label": "Energy loss",
                  "detail": "Most absorbed light is lost as heat; only a small fraction becomes chemical energy."
            },
            {
                  "label": "Stress effect",
                  "detail": "Water stress can cause stomatal closure, lowering CO₂ intake and increasing anaerobic activity."
            },
            {
                  "label": "Net gain calculation",
                  "detail": "Net ATP = (glucose made × 30) – (glucose used in anaerobic processes × 2)."
            }
      ]}
    />
  );
}
