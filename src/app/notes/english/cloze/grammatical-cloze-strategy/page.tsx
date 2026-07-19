"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { grammaticalClozeStrategyTopic } from "@/components/notes/notes-content/grammatical-cloze-strategy";

export default function GrammaticalClozeStrategyNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-cloze">
        <NotesTopicPage topic={grammaticalClozeStrategyTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}
