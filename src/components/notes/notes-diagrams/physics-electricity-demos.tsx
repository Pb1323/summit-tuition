"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function PhysicsElectricityCurrentPotentialDifferenceAndResistanceDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Unit of current",
                  "detail": "1 ampere = 1 coulomb per second."
            },
            {
                  "label": "Unit of voltage",
                  "detail": "1 volt = 1 joule per coulomb."
            },
            {
                  "label": "Unit of resistance",
                  "detail": "1 ohm = 1 volt per ampere."
            },
            {
                  "label": "Ohm’s law",
                  "detail": "V = I × R for a conductor at constant temperature."
            },
            {
                  "label": "Power relation",
                  "detail": "P = V × I can be used once V and I are known."
            }
      ]}
    />
  );
}

export function PhysicsElectricitySeriesAndParallelCircuitsDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Series current",
                  "detail": "I is identical through all series components."
            },
            {
                  "label": "Series voltage",
                  "detail": "Vₜ = Σ Vₙ across each component."
            },
            {
                  "label": "Parallel voltage",
                  "detail": "V is identical across each parallel branch."
            },
            {
                  "label": "Parallel current",
                  "detail": "Iₜ = Σ Iₙ, each branch carries part of the total."
            },
            {
                  "label": "Parallel resistance formula",
                  "detail": "1/Rₜ = Σ 1/Rₙ."
            }
      ]}
    />
  );
}

export function PhysicsElectricityMainsElectricityPowerAndTheNationalGridDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "UK mains voltage",
                  "detail": "Standard RMS value is 230 V."
            },
            {
                  "label": "Mains frequency",
                  "detail": "50 Hz in the UK."
            },
            {
                  "label": "Plug safety",
                  "detail": "Earth pin opens the switch first for safety."
            },
            {
                  "label": "Power formula",
                  "detail": "P (W) = V (V) × I (A)."
            },
            {
                  "label": "Grid transmission",
                  "detail": "High‑voltage lines minimise I, reducing I²R losses."
            }
      ]}
    />
  );
}
