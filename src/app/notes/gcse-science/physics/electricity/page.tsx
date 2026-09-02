import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-physics-electricity";

export default async function GcsePhysicsElectricityNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { physicsElectricityTopic } = await import("@/components/notes/notes-content/physics-electricity");
  return <NotesTopicPage topic={physicsElectricityTopic} />;
}
