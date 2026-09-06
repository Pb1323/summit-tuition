"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function BiologyHomeostasisResponseControlSystemsAndNegativeFeedbackDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Set point",
                  "detail": "The ideal value for a physiological variable, e.g., 37 °C body temperature."
            },
            {
                  "label": "Thermoregulation",
                  "detail": "Skin blood vessels dilate to lose heat and constrict to retain heat."
            },
            {
                  "label": "Blood glucose control",
                  "detail": "Insulin lowers blood glucose; glucagon raises it."
            },
            {
                  "label": "Homeostatic imbalance",
                  "detail": "Can lead to disease, e.g., diabetes from faulty glucose regulation."
            },
            {
                  "label": "Speed of response",
                  "detail": "Nervous system responses are fast; hormonal responses are slower but longer lasting."
            }
      ]}
    />
  );
}

export function BiologyHomeostasisResponseNervousSystemAndReflexArcsDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Speed",
                  "detail": "Reflexes can occur in ~0.05 s, much faster than voluntary actions."
            },
            {
                  "label": "Common example",
                  "detail": "Withdrawal reflex when touching a hot object."
            },
            {
                  "label": "Pathway",
                  "detail": "Receptor → sensory neuron → spinal cord → motor neuron → effector."
            },
            {
                  "label": "Brain role",
                  "detail": "Brain receives a copy of the signal for awareness but does not control the reflex."
            },
            {
                  "label": "Myelination",
                  "detail": "Myelinated sensory and motor neurons speed up impulse conduction."
            }
      ]}
    />
  );
}

export function BiologyHomeostasisResponseEndocrineControlGlucoseRegulationContraceptionDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Insulin action",
                  "detail": "Promotes GLUT‑4 insertion into cell membranes, lowering blood glucose."
            },
            {
                  "label": "Glucagon target",
                  "detail": "Acts mainly on liver to release glucose."
            },
            {
                  "label": "Ovulation day",
                  "detail": "Occurs ~14 days after the start of menstruation in a 28‑day cycle."
            },
            {
                  "label": "Progestogen effect",
                  "detail": "Thickens cervical mucus, hindering sperm entry."
            },
            {
                  "label": "Diabetes test",
                  "detail": "Fasting blood glucose ≥7.0 mmol L⁻¹ indicates diabetes."
            }
      ]}
    />
  );
}
