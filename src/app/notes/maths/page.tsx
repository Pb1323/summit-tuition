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
    { numbersTopic },
    { fractionsDecimalsPercentagesTopic },
    { ratioProportionTopic },
    { algebraTopic },
    { geometryTopic },
    { averagesStatisticsTopic },
  ] = await Promise.all([
    import("@/components/notes/notes-content/numbers"),
    import("@/components/notes/notes-content/fractions-decimals-percentages"),
    import("@/components/notes/notes-content/ratio-proportion"),
    import("@/components/notes/notes-content/algebra"),
    import("@/components/notes/notes-content/geometry"),
    import("@/components/notes/notes-content/averages-statistics"),
  ]);
  const topics = [
    numbersTopic,
    fractionsDecimalsPercentagesTopic,
    ratioProportionTopic,
    algebraTopic,
    geometryTopic,
    averagesStatisticsTopic,
  ];
  return topics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    subtopicTitles: topic.subtopics.map((s) => s.title),
  }));
}

export default async function MathsNotesHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "student" && user.role !== "admin") redirect("/dashboard");

  const topics = await loadTopicSummaries();

  return (
    <Container className="py-10">
      <RevealOnScroll>
        <Link href="/notes" className="text-sm font-semibold text-gold-dark hover:underline">
          ← All subjects
        </Link>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Maths Notes</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Pick a topic below. Each one covers three subtopics with concept explanations, an interactive
          diagram, a worked example and self-marking practice questions.
        </p>
      </RevealOnScroll>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const noteId = `maths-${topic.slug}`;
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
            <div key={topic.slug} className="cursor-not-allowed">
              {card}
            </div>
          ) : (
            <Link key={topic.slug} href={`/notes/maths/${topic.slug}`} className="block">
              {card}
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
