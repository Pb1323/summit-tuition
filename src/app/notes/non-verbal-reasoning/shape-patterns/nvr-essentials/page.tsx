import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "nvr-shape-patterns";

export default async function NvrEssentialsNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { nvrEssentialsTopic } = await import("@/components/notes/notes-content/nvr-essentials");
  return <NotesTopicPage topic={nvrEssentialsTopic} />;
}
