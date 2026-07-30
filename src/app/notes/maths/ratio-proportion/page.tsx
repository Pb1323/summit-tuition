import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "maths-ratio-proportion";

export default async function RatioProportionNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { ratioProportionTopic } = await import("@/components/notes/notes-content/ratio-proportion");
  return <NotesTopicPage topic={ratioProportionTopic} />;
}
