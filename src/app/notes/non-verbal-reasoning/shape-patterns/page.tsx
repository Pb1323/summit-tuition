import Link from "next/link";
import { Container } from "@/components/ui/container";
import { GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";

const NOTE_ID = "nvr-shape-patterns";

async function loadTopicSummaries() {
  const [{ nvrEssentialsTopic }] = await Promise.all([
    import("@/components/notes/notes-content/nvr-essentials"),
  ]);
  return [nvrEssentialsTopic].map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    subtopicTitles: topic.subtopics.map((s) => s.title),
  }));
}

export default async function ShapePatternsNotesHubPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const topics = await loadTopicSummaries();

  return (
    <Container className="py-10">
      <RevealOnScroll>
        <Link href="/notes/non-verbal-reasoning" className="text-sm font-semibold text-gold-dark hover:underline">
          ← Non-Verbal Reasoning strands
        </Link>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Shape Patterns &amp; Sequences Notes</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Odd one out, series, analogies, rotation and mirror reflection. Pick a topic below — each covers
          several subtopics with concept explanations, an interactive click-the-figure demo and self-marking
          practice questions.
        </p>
      </RevealOnScroll>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/notes/non-verbal-reasoning/shape-patterns/${topic.slug}`} className="block">
            <GlowCard className="h-full p-6">
              <PremiumBadge>{topic.subtopicTitles.length} subtopics</PremiumBadge>
              <h2 className="mt-3 text-xl font-bold text-navy">{topic.title}</h2>
              <p className="mt-2 text-sm text-muted">{topic.description}</p>
              <ul className="mt-4 space-y-1 text-xs font-semibold text-gold-dark">
                {topic.subtopicTitles.map((title) => (
                  <li key={title}>&middot; {title}</li>
                ))}
              </ul>
            </GlowCard>
          </Link>
        ))}
      </div>
    </Container>
  );
}
