import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "gcse-physics-particle-model-of-matter";

export default async function GcsePhysicsParticleModelOfMatterNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { physicsParticleModelOfMatterTopic } = await import("@/components/notes/notes-content/physics-particle-model-of-matter");
  return <NotesTopicPage topic={physicsParticleModelOfMatterTopic} />;
}
