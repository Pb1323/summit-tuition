"use client";

import { GcseFactPanel } from "./gcse-fact-panel";

export function BiologyInheritanceVariationEvolutionDnaGenesAndChromosomesDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "DNA strand direction",
                  "detail": "DNA strands run antiparallel: one 5'→3' and the other 3'←5'."
            },
            {
                  "label": "Base pairing rule",
                  "detail": "A pairs with T, C pairs with G via hydrogen bonds."
            },
            {
                  "label": "Human chromosome count",
                  "detail": "Humans have 46 chromosomes (23 pairs) in somatic cells."
            },
            {
                  "label": "Gene definition",
                  "detail": "A gene is a functional unit of heredity, not the whole chromosome."
            },
            {
                  "label": "DNA replication site",
                  "detail": "Replication occurs in the nucleus during the S‑phase of interphase."
            }
      ]}
    />
  );
}

export function BiologyInheritanceVariationEvolutionMeiosisAndGeneticCrossesDemo() {
  return (
    <GcseFactPanel
      title={"Quick reference"}
      items={[
            {
                  "label": "Meiosis result",
                  "detail": "Four genetically different haploid cells are produced."
            },
            {
                  "label": "Crossing‑over stage",
                  "detail": "Occurs in prophase I of meiosis."
            },
            {
                  "label": "Monohybrid ratio",
                  "detail": "Dominant : recessive phenotypes = 3 : 1."
            },
            {
                  "label": "Gamete genotype count",
                  "detail": "Number of possible gametes = 2ⁿ, where n = number of heterozygous gene pairs."
            },
            {
                  "label": "Sexual reproduction",
                  "detail": "Combines haploid gametes to restore diploid chromosome number."
            }
      ]}
    />
  );
}

export function BiologyInheritanceVariationEvolutionVariationMutationAndEvolutionDemo() {
  return (
    <GcseFactPanel
      title={"Key facts"}
      items={[
            {
                  "label": "Sources of variation",
                  "detail": "Mutation, sexual reproduction, and gene flow each introduce new alleles."
            },
            {
                  "label": "Beneficial mutation example",
                  "detail": "Sickle‑cell allele provides malaria resistance in heterozygotes."
            },
            {
                  "label": "Selection pressure",
                  "detail": "Any environmental factor that influences reproductive success, e.g., predators or climate."
            },
            {
                  "label": "Hardy‑Weinberg relevance",
                  "detail": "A population not evolving meets five conditions; useful for baseline calculations."
            },
            {
                  "label": "Speciation requirement",
                  "detail": "Reproductive isolation prevents gene flow, allowing divergent evolution."
            }
      ]}
    />
  );
}
