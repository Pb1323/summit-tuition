import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-physics-waves";

export default async function GcsePhysicsWavesNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { physicsWavesTopic } = await import("@/components/notes/notes-content/physics-waves");
  return <NotesTopicPage topic={physicsWavesTopic} />;
}
