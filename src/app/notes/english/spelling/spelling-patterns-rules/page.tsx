import { requireNoteAccess } from "@/lib/server/notes-access";
import { NotesLocked } from "@/components/notes/notes-locked";
import { NotesTopicPage } from "@/components/notes/notes-shell";

const NOTE_ID = "english-spelling";

export default async function SpellingPatternsRulesNotesPage() {
  const user = await requireNoteAccess(NOTE_ID);
  if (!user) return <NotesLocked noteId={NOTE_ID} />;
  const { spellingPatternsRulesTopic } = await import("@/components/notes/notes-content/spelling-patterns-rules");
  return <NotesTopicPage topic={spellingPatternsRulesTopic} />;
}
