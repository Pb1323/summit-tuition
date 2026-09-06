"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function BiologyEcologyEcosystemsAndCommunitiesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Ecosystem components",
                  "detail": "Biotic (producers, consumers, decomposers) + abiotic (sunlight, water, nutrients)."
            },
            {
                  "label": "Community definition",
                  "detail": "All populations of different species in a given area."
            },
            {
                  "label": "Primary producers",
                  "detail": "Organisms that convert solar energy into chemical energy via photosynthesis."
            },
            {
                  "label": "Energy flow",
                  "detail": "Energy moves one‑way through trophic levels; 90% is lost as heat at each step."
            },
            {
                  "label": "Limiting factor",
                  "detail": "The abiotic factor in shortest supply that restricts population growth."
            }
      ]}
    />
  );
}

export function BiologyEcologyTrophicLevelsFoodWebsCyclesDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "10 % rule",
                  "detail": "Only about 10 % of energy is transferred from one trophic level to the next."
            },
            {
                  "label": "Primary producer role",
                  "detail": "Convert CO₂ into organic matter via photosynthesis."
            },
            {
                  "label": "Respiration releases",
                  "detail": "Carbon as CO₂ back to the atmosphere."
            },
            {
                  "label": "Evapotranspiration",
                  "detail": "Combined water loss from evaporation and plant transpiration."
            },
            {
                  "label": "Decomposer importance",
                  "detail": "Return nutrients and carbon to the soil and atmosphere."
            }
      ]}
    />
  );
}

export function BiologyEcologyBiodiversityHumanImpactsConservationDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Species loss estimate",
                  "detail": "Around 1 million species are threatened with extinction due to human activity."
            },
            {
                  "label": "Carbon storage",
                  "detail": "Forests store ~30 % of terrestrial carbon; loss accelerates CO₂ rise."
            },
            {
                  "label": "Agricultural runoff",
                  "detail": "Adds nutrients to water bodies, causing eutrophication and dead zones."
            },
            {
                  "label": "Protected area goal",
                  "detail": "Aichi Target 11 aims for 17 % of land and 10 % of marine areas protected by 2020."
            },
            {
                  "label": "Temperature shift",
                  "detail": "A 2 °C rise can move many species’ optimal ranges poleward by 100‑200 km."
            }
      ]}
    />
  );
}
