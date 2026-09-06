"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function PhysicsAtomicStructureTheStructureOfTheAtomDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Atomic number",
                  "detail": "Number of protons; defines the element."
            },
            {
                  "label": "Mass number",
                  "detail": "Protons + neutrons; shown as a superscript."
            },
            {
                  "label": "Relative charge",
                  "detail": "Proton +1e, electron –1e, neutron 0."
            },
            {
                  "label": "Relative mass",
                  "detail": "Proton ≈1 u, neutron ≈1 u, electron ≈0 u."
            },
            {
                  "label": "Symbol notation",
                  "detail": "^A_ZX, where A = mass number, Z = atomic number."
            }
      ]}
    />
  );
}

export function PhysicsAtomicStructureIsotopesAndTheNuclearModelDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Neutron number",
                  "detail": "Neutrons = mass number – atomic number."
            },
            {
                  "label": "Common isotopes",
                  "detail": "Carbon‑12 and carbon‑14 are widely used examples."
            },
            {
                  "label": "Rutherford result",
                  "detail": "Most α‑particles passed through, indicating empty space."
            },
            {
                  "label": "Bohr shells",
                  "detail": "Electrons occupy fixed energy levels around the nucleus."
            },
            {
                  "label": "Isotope notation",
                  "detail": "Write as ^A_ZX, e.g., ^14_6C for carbon‑14."
            }
      ]}
    />
  );
}

export function PhysicsAtomicStructureRadioactiveDecayHalfLifeAndRadiationUsesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Alpha particle",
                  "detail": "Mass 4 u, charge +2e, low penetration."
            },
            {
                  "label": "Beta particle",
                  "detail": "Mass ≈0 u, charge –1e, higher penetration than α."
            },
            {
                  "label": "Half‑life formula",
                  "detail": "N = N0 × (½)^(t / t½)."
            },
            {
                  "label": "Medical use",
                  "detail": "Cobalt‑60 γ‑rays for radiotherapy."
            },
            {
                  "label": "Safety",
                  "detail": "Lead shielding reduces γ‑ray exposure."
            }
      ]}
    />
  );
}
