"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryUsingResourcesEarthSResourcesAndSustainableUseDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Global oil reserves",
                  "detail": "Approximately 1.7 trillion barrels remain, enough for ~50 years at current consumption."
            },
            {
                  "label": "Annual water use",
                  "detail": "Industry accounts for about 20% of global freshwater withdrawals."
            },
            {
                  "label": "Recycling rate UK",
                  "detail": "Around 45% of household waste is recycled, a figure examined in AQA past papers."
            },
            {
                  "label": "CO₂ per tonne steel",
                  "detail": "Production of 1 t of steel emits roughly 1.8 t of CO₂."
            },
            {
                  "label": "Renewable share 2023",
                  "detail": "Renewables supplied about 30% of UK electricity generation."
            }
      ]}
    />
  );
}

export function ChemistryUsingResourcesPotableWaterProductionAndWasteWaterTreatmentDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Typical chlorine dose",
                  "detail": "0.5–2 mg L⁻¹ of free chlorine is used for disinfection."
            },
            {
                  "label": "pH for safe drinking water",
                  "detail": "Between 6.5 and 8.5 to minimise corrosion and optimise disinfection."
            },
            {
                  "label": "Biological oxygen demand",
                  "detail": "BOD measures the amount of oxygen required by microbes to decompose organic matter."
            },
            {
                  "label": "Sedimentation time",
                  "detail": "Raw water usually settles for 2–4 hours in primary clarifiers."
            },
            {
                  "label": "Typical filtration rate",
                  "detail": "Sand filters operate at about 5 m³ m⁻² h⁻¹."
            }
      ]}
    />
  );
}

export function ChemistryUsingResourcesLifeCycleAssessmentAndRecyclingDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Aluminium recycling",
                  "detail": "Recycling saves up to 95 % of the energy needed for primary production."
            },
            {
                  "label": "CO₂ per kg steel",
                  "detail": "≈1.8 kg CO₂ is emitted for each kilogram of virgin steel produced."
            },
            {
                  "label": "Average UK recycling rate",
                  "detail": "Around 45 % of municipal waste is recycled, 55 % goes to landfill or incineration."
            },
            {
                  "label": "Plastic LCA tip",
                  "detail": "PET bottles have a lower embodied energy than glass when transport distance is short."
            },
            {
                  "label": "Circular economy goal",
                  "detail": "UK aims for 70 % of all waste to be recycled or composted by 2030."
            }
      ]}
    />
  );
}
