"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function PhysicsParticleModelOfMatterDensityAndMassCalculationsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Density formula",
                  "detail": "ρ = m ÷ V, rearrange as needed."
            },
            {
                  "label": "Units of density",
                  "detail": "kg m⁻³ or g cm⁻³; ensure consistency."
            },
            {
                  "label": "Mass conserved",
                  "detail": "Mass does not change when a substance melts or boils."
            },
            {
                  "label": "Typical solid density",
                  "detail": "Most solids have densities > 1000 kg m⁻³."
            },
            {
                  "label": "Water density",
                  "detail": "At 4 °C, water density is 1000 kg m⁻³ (1 g cm⁻³)."
            }
      ]}
    />
  );
}

export function PhysicsParticleModelOfMatterChangesOfStateAndSpecificLatentHeatDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Q = m L",
                  "detail": "Energy = mass × specific latent heat."
            },
            {
                  "label": "Latent heat of fusion (water)",
                  "detail": "334 kJ kg⁻¹."
            },
            {
                  "label": "Latent heat of vaporisation (water)",
                  "detail": "2260 kJ kg⁻¹."
            },
            {
                  "label": "Temperature during phase change",
                  "detail": "Remains constant until all material has changed state."
            },
            {
                  "label": "Energy source",
                  "detail": "Heat supplied or removed from surroundings."
            }
      ]}
    />
  );
}

export function PhysicsParticleModelOfMatterParticleMotionInGasesPressureAndInternalEnergyDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Pressure definition",
                  "detail": "P = force ÷ area, measured in Pa (N m⁻²)."
            },
            {
                  "label": "Ideal gas relation",
                  "detail": "PV = nRT links pressure, volume, temperature."
            },
            {
                  "label": "KE ∝ T",
                  "detail": "Average kinetic energy of gas particles increases linearly with absolute temperature."
            },
            {
                  "label": "Internal energy depends on T",
                  "detail": "For an ideal gas, U = (3/2) nRT."
            },
            {
                  "label": "Gay‑Lussac’s law",
                  "detail": "At constant volume, P ∝ T (Kelvin)."
            }
      ]}
    />
  );
}
