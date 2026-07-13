"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { prepositionsConjunctionsTopic } from "@/components/notes/notes-content/prepositions-conjunctions";

export default function PrepositionsConjunctionsNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-grammar">
        <NotesTopicPage topic={prepositionsConjunctionsTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}
