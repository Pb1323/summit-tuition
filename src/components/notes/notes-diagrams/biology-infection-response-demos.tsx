"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function BiologyInfectionResponsePathogensAndCommunicableDiseasesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Bacterial reproduction",
                  "detail": "Bacteria divide by binary fission, producing identical offspring."
            },
            {
                  "label": "Viral replication",
                  "detail": "Viruses inject genetic material into a host cell and use its machinery to make new virions."
            },
            {
                  "label": "Fungal infection sites",
                  "detail": "Fungi commonly infect skin, nails and mucous membranes."
            },
            {
                  "label": "Protozoan transmission",
                  "detail": "Often spread by vectors such as mosquitoes (e.g., malaria)."
            },
            {
                  "label": "Communicable disease definition",
                  "detail": "A disease that can be passed from one individual to another."
            }
      ]}
    />
  );
}

export function BiologyInfectionResponseBodyDefencesAndTheImmuneSystemDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "First line defence",
                  "detail": "Skin, mucous membranes, cilia and secretions."
            },
            {
                  "label": "Key innate cell",
                  "detail": "Neutrophil – most abundant phagocyte."
            },
            {
                  "label": "Antibody class",
                  "detail": "IgG is the most common antibody in blood."
            },
            {
                  "label": "Helper T‑cell role",
                  "detail": "Activates B‑cells and cytotoxic T‑cells."
            },
            {
                  "label": "Memory advantage",
                  "detail": "Provides faster, stronger response on second exposure."
            }
      ]}
    />
  );
}

export function BiologyInfectionResponseDrugsAntibioticsAndResistanceDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Penicillin action",
                  "detail": "Inhibits synthesis of peptidoglycan, weakening bacterial walls."
            },
            {
                  "label": "MRSA resistance",
                  "detail": "Acquires mecA gene encoding altered penicillin‑binding protein."
            },
            {
                  "label": "Phase III trial goal",
                  "detail": "Confirm drug efficacy and monitor side‑effects in large patient groups."
            },
            {
                  "label": "Herd immunity threshold",
                  "detail": "Typically 80‑95% of a population must be immune to stop spread."
            },
            {
                  "label": "WHO priority list",
                  "detail": "Highlights bacteria for which new antibiotics are urgently needed."
            }
      ]}
    />
  );
}
