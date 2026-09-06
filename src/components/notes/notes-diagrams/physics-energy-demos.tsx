"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function PhysicsEnergyEnergyStoresAndTransfersDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Energy unit",
                  "detail": "Energy is measured in joules (J)."
            },
            {
                  "label": "Kinetic energy formula",
                  "detail": "Ek = ½ mv², where m is mass in kg and v is speed in m s⁻¹."
            },
            {
                  "label": "Gravitational PE formula",
                  "detail": "Epg = mgh, with h in metres and g = 9.8 m s⁻²."
            },
            {
                  "label": "Elastic PE formula",
                  "detail": "Epe = ½ kx², k is spring constant (N m⁻¹), x is extension (m)."
            },
            {
                  "label": "Thermal energy transfer",
                  "detail": "Q = mcΔT, where c is specific heat capacity."
            }
      ]}
    />
  );
}

export function PhysicsEnergyCalculatingEnergyChangesDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Ek formula",
                  "detail": "Ek = ½ mv² (J)."
            },
            {
                  "label": "Epg formula",
                  "detail": "Epg = mgh (J)."
            },
            {
                  "label": "Epe formula",
                  "detail": "Epe = ½ kx² (J)."
            },
            {
                  "label": "Q = mcΔT",
                  "detail": "Heat added equals mass × specific heat × temperature change."
            },
            {
                  "label": "g value",
                  "detail": "Use 9.8 m s⁻² unless otherwise stated."
            }
      ]}
    />
  );
}

export function PhysicsEnergyEnergyEfficiencyDissipationAndResourcesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Efficiency formula",
                  "detail": "η = (useful energy ÷ input energy) × 100%."
            },
            {
                  "label": "Typical car engine efficiency",
                  "detail": "Around 20–30 % – most energy is lost as heat."
            },
            {
                  "label": "Solar panel efficiency",
                  "detail": "Usually 15–20 % for commercial panels."
            },
            {
                  "label": "Coal energy density",
                  "detail": "≈ 24 MJ kg⁻¹, high but non‑renewable."
            },
            {
                  "label": "Wind energy advantage",
                  "detail": "No fuel cost and zero CO₂ emissions during operation."
            }
      ]}
    />
  );
}
