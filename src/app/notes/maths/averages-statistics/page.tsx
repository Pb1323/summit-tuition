import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "maths-averages-statistics";

export default async function AveragesStatisticsNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { averagesStatisticsTopic } = await import("@/components/notes/notes-content/averages-statistics");
  return <NotesTopicPage topic={averagesStatisticsTopic} />;
}
