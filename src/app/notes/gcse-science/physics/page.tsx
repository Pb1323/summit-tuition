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
    { physicsEnergyTopic },
    { physicsElectricityTopic },
    { physicsParticleModelOfMatterTopic },
    { physicsAtomicStructureTopic },
    { physicsForcesTopic },
    { physicsWavesTopic },
    { physicsMagnetismElectromagnetismTopic },
    { physicsSpacePhysicsTopic },
  ] = await Promise.all([
    import("@/components/notes/notes-content/physics-energy"),
    import("@/components/notes/notes-content/physics-electricity"),
    import("@/components/notes/notes-content/physics-particle-model-of-matter"),
    import("@/components/notes/notes-content/physics-atomic-structure"),
    import("@/components/notes/notes-content/physics-forces"),
    import("@/components/notes/notes-content/physics-waves"),
    import("@/components/notes/notes-content/physics-magnetism-electromagnetism"),
    import("@/components/notes/notes-content/physics-space-physics"),
  ]);
  const topics = [
    { key: "energy", topic: physicsEnergyTopic },
    { key: "electricity", topic: physicsElectricityTopic },
    { key: "particle-model-of-matter", topic: physicsParticleModelOfMatterTopic },
    { key: "atomic-structure", topic: physicsAtomicStructureTopic },
    { key: "forces", topic: physicsForcesTopic },
    { key: "waves", topic: physicsWavesTopic },
    { key: "magnetism-electromagnetism", topic: physicsMagnetismElectromagnetismTopic },
    { key: "space-physics", topic: physicsSpacePhysicsTopic },
  ];
  return topics.map(({ key, topic }) => ({
    key,
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    subtopicTitles: topic.subtopics.map((s) => s.title),
  }));
}

export default async function GcsePhysicsNotesHubPage() {
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
        <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">GCSE Physics Notes</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Every AQA GCSE Physics topic, broken into subtopics with concept explanations, worked examples
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
            <Link key={topic.key} href={`/notes/gcse-science/physics/${topic.key}`} className="block">
              {card}
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
