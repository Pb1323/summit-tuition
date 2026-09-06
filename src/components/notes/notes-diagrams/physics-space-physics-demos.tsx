"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function PhysicsSpacePhysicsTheSolarSystemAndLifeCycleOfStarsDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Number of planets",
                  "detail": "Eight planets orbit the Sun in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."
            },
            {
                  "label": "Sun’s composition",
                  "detail": "About 74 % hydrogen, 24 % helium, 2 % heavier elements by mass."
            },
            {
                  "label": "Main‑sequence lifetime",
                  "detail": "Approximately 10 billion years for a Sun‑like star."
            },
            {
                  "label": "White dwarf mass limit",
                  "detail": "The Chandrasekhar limit is ~1.4 M☉; above this a star collapses to a neutron star or black hole."
            },
            {
                  "label": "Planetary nebula",
                  "detail": "The ejected outer layers of a low‑mass star form an expanding glowing shell."
            }
      ]}
    />
  );
}

export function PhysicsSpacePhysicsOrbitalMotionOfPlanetsAndSatellitesDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Earth’s orbital radius",
                  "detail": "≈ 1.5×10¹¹ m (1 AU)."
            },
            {
                  "label": "Earth’s orbital speed",
                  "detail": "≈ 30 km s⁻¹."
            },
            {
                  "label": "Geostationary orbit altitude",
                  "detail": "≈ 35 800 km above Earth’s surface."
            },
            {
                  "label": "G (gravitational constant)",
                  "detail": "6.67×10⁻¹¹ N m² kg⁻²."
            },
            {
                  "label": "Kepler’s third law",
                  "detail": "T² = (4π²/GM) r³ for circular orbits."
            }
      ]}
    />
  );
}

export function PhysicsSpacePhysicsRedShiftExpandingUniverseAndTheBigBangDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Speed of light",
                  "detail": "c = 3.0×10⁵ km s⁻¹, used to convert red‑shift to velocity for small z."
            },
            {
                  "label": "Hubble’s constant",
                  "detail": "≈ 70 km s⁻¹ Mpc⁻¹; 1 Mpc ≈ 3.09×10¹⁹ km."
            },
            {
                  "label": "CMB temperature",
                  "detail": "2.73 K, measured uniformly across the sky."
            },
            {
                  "label": "Red‑shift example",
                  "detail": "z = 0.01 corresponds to v ≈ 3000 km s⁻¹."
            },
            {
                  "label": "Age of universe",
                  "detail": "≈ 13.8 billion years, derived from H₀."
            }
      ]}
    />
  );
}
