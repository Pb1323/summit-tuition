"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function BiologyCellBiologyCellStructureBasicsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "DNA location",
                  "detail": "In eukaryotes DNA is inside the nucleus; in prokaryotes it is in the nucleoid region."
            },
            {
                  "label": "Organelles with membranes",
                  "detail": "Nucleus, mitochondria, chloroplasts, endoplasmic reticulum, Golgi apparatus and vacuoles are all membrane‑bound."
            },
            {
                  "label": "Plant‑specific",
                  "detail": "Cell wall, chloroplasts and large central vacuole are found only in plant cells."
            },
            {
                  "label": "Size range",
                  "detail": "Typical eukaryotic cells are 10–100 µm, prokaryotes are 0.1–5 µm."
            },
            {
                  "label": "Energy factories",
                  "detail": "Mitochondria produce ATP by oxidative phosphorylation; chloroplasts produce glucose by photosynthesis."
            }
      ]}
    />
  );
}

export function BiologyCellBiologyCellDivisionAndStemCellsDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Mitosis result",
                  "detail": "Two daughter cells with the same chromosome number as the parent."
            },
            {
                  "label": "Metaphase alignment",
                  "detail": "Chromosomes line up at the cell’s equatorial plate."
            },
            {
                  "label": "Anaphase movement",
                  "detail": "Sister chromatids are pulled to opposite poles by spindle fibres."
            },
            {
                  "label": "Embryonic stem source",
                  "detail": "Derived from the inner cell mass of a blastocyst."
            },
            {
                  "label": "Adult stem location",
                  "detail": "Found in bone marrow, skin, gut lining and plant meristems."
            }
      ]}
    />
  );
}

export function BiologyCellBiologyTransportAndSurfaceAreaDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Equilibrium result",
                  "detail": "No net movement of particles during diffusion."
            },
            {
                  "label": "Tonicity terms",
                  "detail": "Hypertonic = higher solute concentration outside the cell; hypotonic = lower outside."
            },
            {
                  "label": "ATP role",
                  "detail": "Provides energy for carrier proteins in active transport."
            },
            {
                  "label": "SA:V effect",
                  "detail": "As cell size doubles, volume increases eightfold while surface area only fourfold."
            },
            {
                  "label": "Facilitated diffusion",
                  "detail": "Uses protein channels but does not require energy."
            }
      ]}
    />
  );
}
