import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "english-comprehension";

export default async function LiteralComprehensionRetrievalNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { literalComprehensionRetrievalTopic } = await import("@/components/notes/notes-content/literal-comprehension-retrieval");
  return <NotesTopicPage topic={literalComprehensionRetrievalTopic} />;
}
