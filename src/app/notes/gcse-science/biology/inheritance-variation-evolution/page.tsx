import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-biology-inheritance-variation-evolution";

export default async function GcseBiologyInheritanceVariationEvolutionNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { biologyInheritanceVariationEvolutionTopic } = await import("@/components/notes/notes-content/biology-inheritance-variation-evolution");
  return <NotesTopicPage topic={biologyInheritanceVariationEvolutionTopic} />;
}
