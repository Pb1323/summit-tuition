"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function PhysicsMagnetismElectromagnetismPermanentAndInducedMagnetsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "North and South poles",
                  "detail": "Field lines exit north and enter south; opposite poles attract."
            },
            {
                  "label": "Domain alignment",
                  "detail": "Permanent magnets have domains permanently aligned; induced magnets align only in a field."
            },
            {
                  "label": "Field strength indicator",
                  "detail": "Closer field lines = stronger magnetic field."
            },
            {
                  "label": "Magnet types in exams",
                  "detail": "Questions often ask you to label north/south or predict attraction/repulsion."
            },
            {
                  "label": "Materials",
                  "detail": "Iron, nickel, cobalt are ferromagnetic and can be induced."
            }
      ]}
    />
  );
}

export function PhysicsMagnetismElectromagnetismElectromagnetsAndSolenoidsDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Field strength formula",
                  "detail": "B ∝ N × I for a solenoid (ignoring core effects)."
            },
            {
                  "label": "North pole direction",
                  "detail": "Right‑hand thumb points to the north pole of the solenoid."
            },
            {
                  "label": "Core effect",
                  "detail": "A soft iron core increases B by concentrating field lines."
            },
            {
                  "label": "Turn count impact",
                  "detail": "Doubling turns doubles the magnetic field (all else equal)."
            },
            {
                  "label": "Current switch off",
                  "detail": "Field disappears when the current stops; no remanence."
            }
      ]}
    />
  );
}

export function PhysicsMagnetismElectromagnetismMotorAndGeneratorEffectsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Force formula",
                  "detail": "F = B I L sinθ; for perpendicular B and I, sinθ = 1."
            },
            {
                  "label": "Left‑hand rule fingers",
                  "detail": "Thumb = motion, forefinger = magnetic field, middle finger = current."
            },
            {
                  "label": "Generator emf",
                  "detail": "E = B L v for a straight conductor moving at speed v perpendicular to B."
            },
            {
                  "label": "Transformer voltage ratio",
                  "detail": "V₁/V₂ = N₁/N₂ (ideal transformer)."
            },
            {
                  "label": "Power conservation",
                  "detail": "In an ideal transformer, V₁I₁ = V₂I₂."
            }
      ]}
    />
  );
}
