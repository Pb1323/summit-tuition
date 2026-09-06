"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function PhysicsForcesScalarsVectorsAndResultantForcesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Scalar example",
                  "detail": "Mass (kg) is a scalar; it has magnitude only."
            },
            {
                  "label": "Vector example",
                  "detail": "Force (N) is a vector; it has magnitude and direction."
            },
            {
                  "label": "Resultant direction",
                  "detail": "The direction of the resultant is the same as the direction of the vector sum."
            },
            {
                  "label": "Diagram method",
                  "detail": "Tip‑to‑tail method adds vectors head‑to‑tail to find the resultant."
            },
            {
                  "label": "Units",
                  "detail": "Force is measured in newtons (N), where 1 N = 1 kg·m s⁻²."
            }
      ]}
    />
  );
}

export function PhysicsForcesNewtonSLawsAndFMaDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "First law name",
                  "detail": "Law of inertia – objects resist changes in motion."
            },
            {
                  "label": "Second law formula",
                  "detail": "F (N) = mass (kg) × acceleration (m s⁻²)."
            },
            {
                  "label": "Third law meaning",
                  "detail": "Action and reaction forces are equal in magnitude, opposite in direction."
            },
            {
                  "label": "Units of force",
                  "detail": "1 N = 1 kg·m s⁻²."
            },
            {
                  "label": "Unbalanced force",
                  "detail": "Creates acceleration in the direction of the net force."
            }
      ]}
    />
  );
}

export function PhysicsForcesMomentsMomentumAndStoppingDistancesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Moment formula",
                  "detail": "M (N·m) = force (N) × distance (m)."
            },
            {
                  "label": "Lever equilibrium",
                  "detail": "Clockwise moments = anticlockwise moments for a static lever."
            },
            {
                  "label": "Momentum definition",
                  "detail": "p = mass (kg) × velocity (m s⁻¹)."
            },
            {
                  "label": "Impulse–momentum",
                  "detail": "Impulse (FΔt) equals change in momentum (Δp)."
            },
            {
                  "label": "Stopping distance method",
                  "detail": "Set ½ mv² = F d to solve for d."
            }
      ]}
    />
  );
}
