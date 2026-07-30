import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "english-cloze";

export default async function GrammaticalClozeStrategyNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { grammaticalClozeStrategyTopic } = await import("@/components/notes/notes-content/grammatical-cloze-strategy");
  return <NotesTopicPage topic={grammaticalClozeStrategyTopic} />;
}
