"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function ChemistryBondingStructurePropertiesIonicBondingAndGiantIonicLatticesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Formation of ions",
                  "detail": "Metals lose electrons, non‑metals gain electrons"
            },
            {
                  "label": "Lattice type",
                  "detail": "Ions arrange in a repeating three‑dimensional pattern"
            },
            {
                  "label": "Melting point trend",
                  "detail": "Higher charge and smaller ions give higher melting points"
            },
            {
                  "label": "Electrical conductivity",
                  "detail": "Ionic solids conduct only when ions are mobile"
            },
            {
                  "label": "Solubility rule",
                  "detail": "Most ionic compounds are soluble in water unless the anion is large and charge is low"
            }
      ]}
    />
  );
}

export function ChemistryBondingStructurePropertiesCovalentBondingAndGiantCovalentStructuresDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Simple molecules",
                  "detail": "Low melting points, exist as gases or liquids"
            },
            {
                  "label": "Diamond",
                  "detail": "Each carbon bonded to four others, very hard, high melting point"
            },
            {
                  "label": "Graphite",
                  "detail": "Layers of hexagonal sheets, slippery, conducts electricity"
            },
            {
                  "label": "Silicon dioxide",
                  "detail": "Each Si bonded to four O, forms quartz, high melting point"
            },
            {
                  "label": "Fullerenes",
                  "detail": "Closed carbon cages, soluble in organic solvents, used in nanotech"
            }
      ]}
    />
  );
}

export function ChemistryBondingStructurePropertiesMetallicBondingAlloysAndStatesOfMatterDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Electron sea model",
                  "detail": "Explains conductivity, malleability and ductility of metals"
            },
            {
                  "label": "Higher charge density",
                  "detail": "Leads to stronger metallic bonds and higher melting points"
            },
            {
                  "label": "Alloy example",
                  "detail": "Bronze is copper alloyed with tin, giving greater hardness"
            },
            {
                  "label": "Fusion enthalpy",
                  "detail": "Energy needed to overcome forces holding particles in a solid"
            },
            {
                  "label": "Vapourisation enthalpy",
                  "detail": "Much larger than fusion enthalpy because gas particles are far apart"
            }
      ]}
    />
  );
}
