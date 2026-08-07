import Link from "next/link";
import { Container } from "@/components/ui/container";
import { GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";

const NOTE_ID = "vr-codes-ciphers";

async function loadTopicSummaries() {
  const [{ codesEssentialsTopic }] = await Promise.all([
    import("@/components/notes/notes-content/codes-essentials"),
  ]);
  return [codesEssentialsTopic].map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    subtopicTitles: topic.subtopics.map((s) => s.title),
  }));
}

export default async function CodesCiphersNotesHubPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const topics = await loadTopicSummaries();

  return (
    <Container className="py-10">
      <RevealOnScroll>
        <Link href="/notes/verbal-reasoning" className="text-sm font-semibold text-gold-dark hover:underline">
          ← Verbal Reasoning strands
        </Link>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Codes & Ciphers Notes</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Letter-for-number codes, shift codes and letter-value sums — plus a dedicated working-method
          module for turning fiddly code questions into fast, reliable marks. Pick a topic below.
        </p>
      </RevealOnScroll>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/notes/verbal-reasoning/codes-ciphers/${topic.slug}`} className="block">
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
