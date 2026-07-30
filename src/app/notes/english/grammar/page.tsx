import Link from "next/link";
import { Container } from "@/components/ui/container";
import { GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";

const NOTE_ID = "english-grammar";

async function loadTopicSummaries() {
  const [
    { partsOfSpeechErrorsTopic },
    { agreementTenseErrorsTopic },
    { pronounErrorsTopic },
    { apostrophesPossessionErrorsTopic },
    { commonlyConfusedWordsTopic },
    { prepositionsConjunctionsTopic },
    { completeTheSentenceTopic },
  ] = await Promise.all([
    import("@/components/notes/notes-content/parts-of-speech-errors"),
    import("@/components/notes/notes-content/agreement-tense-errors"),
    import("@/components/notes/notes-content/pronoun-errors"),
    import("@/components/notes/notes-content/apostrophes-possession-errors"),
    import("@/components/notes/notes-content/commonly-confused-words"),
    import("@/components/notes/notes-content/prepositions-conjunctions"),
    import("@/components/notes/notes-content/complete-the-sentence"),
  ]);
  const topics = [
    partsOfSpeechErrorsTopic,
    agreementTenseErrorsTopic,
    pronounErrorsTopic,
    apostrophesPossessionErrorsTopic,
    commonlyConfusedWordsTopic,
    prepositionsConjunctionsTopic,
    completeTheSentenceTopic,
  ];
  return topics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    subtopicTitles: topic.subtopics.map((s) => s.title),
  }));
}

export default async function GrammarNotesHubPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const topics = await loadTopicSummaries();

  return (
    <Container className="py-10">
      <RevealOnScroll>
        <Link href="/notes/english" className="text-sm font-semibold text-gold-dark hover:underline">
          ← English strands
        </Link>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Grammar Notes</h1>
        <p className="mt-2 max-w-2xl text-muted">
          &ldquo;Spot the mistake&rdquo; and &ldquo;complete the sentence&rdquo; question practice. Pick a topic below — each
          covers several subtopics with concept explanations, an interactive click-the-error sentence and
          self-marking practice questions.
        </p>
      </RevealOnScroll>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/notes/english/grammar/${topic.slug}`} className="block">
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
