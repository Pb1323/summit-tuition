import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { getCurrentUser } from "@/lib/server/auth";
import { isNoteEntitled } from "@/lib/server/notes-access";
import { cn } from "@/lib/utils";

async function loadTopicSummaries() {
  const [
    { chemistryAtomicStructurePeriodicTableTopic },
    { chemistryBondingStructurePropertiesTopic },
    { chemistryQuantitativeChemistryTopic },
    { chemistryChemicalChangesTopic },
    { chemistryEnergyChangesTopic },
    { chemistryRateExtentOfChangeTopic },
    { chemistryOrganicChemistryTopic },
    { chemistryChemicalAnalysisTopic },
    { chemistryChemistryOfTheAtmosphereTopic },
    { chemistryUsingResourcesTopic },
  ] = await Promise.all([
    import("@/components/notes/notes-content/chemistry-atomic-structure-periodic-table"),
    import("@/components/notes/notes-content/chemistry-bonding-structure-properties"),
    import("@/components/notes/notes-content/chemistry-quantitative-chemistry"),
    import("@/components/notes/notes-content/chemistry-chemical-changes"),
    import("@/components/notes/notes-content/chemistry-energy-changes"),
    import("@/components/notes/notes-content/chemistry-rate-extent-of-change"),
    import("@/components/notes/notes-content/chemistry-organic-chemistry"),
    import("@/components/notes/notes-content/chemistry-chemical-analysis"),
    import("@/components/notes/notes-content/chemistry-chemistry-of-the-atmosphere"),
    import("@/components/notes/notes-content/chemistry-using-resources"),
  ]);
  const topics = [
    { key: "atomic-structure-periodic-table", topic: chemistryAtomicStructurePeriodicTableTopic },
    { key: "bonding-structure-properties", topic: chemistryBondingStructurePropertiesTopic },
    { key: "quantitative-chemistry", topic: chemistryQuantitativeChemistryTopic },
    { key: "chemical-changes", topic: chemistryChemicalChangesTopic },
    { key: "energy-changes", topic: chemistryEnergyChangesTopic },
    { key: "rate-extent-of-change", topic: chemistryRateExtentOfChangeTopic },
    { key: "organic-chemistry", topic: chemistryOrganicChemistryTopic },
    { key: "chemical-analysis", topic: chemistryChemicalAnalysisTopic },
    { key: "chemistry-of-the-atmosphere", topic: chemistryChemistryOfTheAtmosphereTopic },
    { key: "using-resources", topic: chemistryUsingResourcesTopic },
  ];
  return topics.map(({ key, topic }) => ({
    key,
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    subtopicTitles: topic.subtopics.map((s) => s.title),
  }));
}

export default async function GcseChemistryNotesHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "student" && user.role !== "admin") redirect("/dashboard");

  const topics = await loadTopicSummaries();

  return (
    <Container className="py-10">
      <RevealOnScroll>
        <Link href="/notes/gcse-science" className="text-sm font-semibold text-gold-dark hover:underline">
          ← GCSE Science
        </Link>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">GCSE Chemistry Notes</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Every AQA GCSE Chemistry topic, broken into subtopics with concept explanations, worked examples
          and self-marking practice.
        </p>
      </RevealOnScroll>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const noteId = `gcse-${topic.slug}`;
          const locked = !isNoteEntitled(noteId, user);
          const card = (
            <GlowCard className={cn("h-full p-6", locked && "opacity-60")}>
              <div className="flex items-center justify-between gap-2">
                <PremiumBadge>{topic.subtopicTitles.length} subtopics</PremiumBadge>
                {locked && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-gold-dark">
                    <Lock className="h-3 w-3" /> Unlock with Pro
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-xl font-bold text-navy">{topic.title}</h2>
              <p className="mt-2 text-sm text-muted">{topic.description}</p>
              <ul className="mt-4 space-y-1 text-xs font-semibold text-gold-dark">
                {topic.subtopicTitles.map((title) => (
                  <li key={title}>&middot; {title}</li>
                ))}
              </ul>
            </GlowCard>
          );
          return locked ? (
            <div key={topic.key} className="cursor-not-allowed">
              {card}
            </div>
          ) : (
            <Link key={topic.key} href={`/notes/gcse-science/chemistry/${topic.key}`} className="block">
              {card}
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
