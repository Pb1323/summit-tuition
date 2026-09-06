"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryRateExtentOfChangeFactorsThatAffectReactionRateDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Concentration effect",
                  "detail": "Doubling reactant concentration roughly doubles the collision frequency."
            },
            {
                  "label": "Temperature effect",
                  "detail": "A 10 °C rise roughly doubles the number of particles with energy ≥ Ea."
            },
            {
                  "label": "Surface area effect",
                  "detail": "Powdered solids react faster than lumps because more particles are exposed."
            },
            {
                  "label": "Catalyst role",
                  "detail": "Catalysts are not consumed; they appear unchanged after the reaction."
            },
            {
                  "label": "Rate expression",
                  "detail": "For many simple reactions, rate ∝ [A]^m [B]^n where m and n are orders."
            }
      ]}
    />
  );
}

export function ChemistryRateExtentOfChangeCollisionTheoryInDetailDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Energy requirement",
                  "detail": "Ea is the barrier; particles below it cannot react."
            },
            {
                  "label": "Orientation importance",
                  "detail": "Even high‑energy collisions fail if molecules are misaligned."
            },
            {
                  "label": "Frequency drivers",
                  "detail": "Concentration, temperature and surface area all raise collision frequency."
            },
            {
                  "label": "Catalyst effect",
                  "detail": "Provides a new pathway with lower Ea and often a different orientation requirement."
            },
            {
                  "label": "Rate equation link",
                  "detail": "Rate ∝ frequency × probability of effective collision."
            }
      ]}
    />
  );
}

export function ChemistryRateExtentOfChangeReversibleReactionsAndDynamicEquilibriumDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Equilibrium constant",
                  "detail": "K = [products]^coeff / [reactants]^coeff at equilibrium; temperature dependent."
            },
            {
                  "label": "Effect of concentration",
                  "detail": "Adding reactant shifts equilibrium towards products; removing shifts opposite."
            },
            {
                  "label": "Effect of temperature",
                  "detail": "For exothermic forward reactions, heating shifts equilibrium to reactants."
            },
            {
                  "label": "Effect of pressure",
                  "detail": "Increasing pressure favours the side with fewer gas moles."
            },
            {
                  "label": "Catalyst impact",
                  "detail": "A catalyst does not change K; it only speeds the approach to equilibrium."
            }
      ]}
    />
  );
}
