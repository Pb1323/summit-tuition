"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function PhysicsWavesTypesOfMechanicalWavesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Particle motion direction",
                  "detail": "Transverse = perpendicular; longitudinal = parallel."
            },
            {
                  "label": "Typical examples",
                  "detail": "String vibration (transverse), sound in air (longitudinal)."
            },
            {
                  "label": "Energy transport",
                  "detail": "Both types carry energy without permanent particle displacement."
            },
            {
                  "label": "Speed dependence",
                  "detail": "v = √(tension/linear density) for strings; v = √(bulk modulus/density) for sound."
            },
            {
                  "label": "Exam focus",
                  "detail": "Identify wave type from diagram or description."
            }
      ]}
    />
  );
}

export function PhysicsWavesWaveSpeedFrequencyAndWavelengthDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "v = fλ",
                  "detail": "Core relationship for all waves."
            },
            {
                  "label": "Units",
                  "detail": "v (m s⁻¹), f (Hz), λ (m)."
            },
            {
                  "label": "Higher frequency → shorter λ (if v constant).",
                  "detail": "Important for EM spectrum ordering."
            },
            {
                  "label": "Graph slope",
                  "detail": "In a distance‑time graph, slope = speed."
            },
            {
                  "label": "Common exam values",
                  "detail": "c (light) = 3.0×10⁸ m s⁻¹; sound in air ≈ 340 m s⁻¹."
            }
      ]}
    />
  );
}

export function PhysicsWavesElectromagneticSpectrumAndWaveBehaviourDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Speed of EM waves",
                  "detail": "All travel at c = 3.0×10⁸ m s⁻¹ in vacuum."
            },
            {
                  "label": "Frequency order",
                  "detail": "Gamma > X‑ray > UV > visible > IR > microwave > radio."
            },
            {
                  "label": "Reflection law",
                  "detail": "Angle of incidence = angle of reflection."
            },
            {
                  "label": "Snell’s law",
                  "detail": "n₁ sinθ₁ = n₂ sinθ₂, where n = c/v in the medium."
            },
            {
                  "label": "Hazard",
                  "detail": "Ionising EM radiation can cause cell damage and increase cancer risk."
            }
      ]}
    />
  );
}
