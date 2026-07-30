import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "english-creative-writing";

export default async function CoreWritingTechniquesNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { coreWritingTechniquesTopic } = await import("@/components/notes/notes-content/core-writing-techniques");
  return <NotesTopicPage topic={coreWritingTechniquesTopic} />;
}
