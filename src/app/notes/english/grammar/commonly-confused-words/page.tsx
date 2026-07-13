"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { commonlyConfusedWordsTopic } from "@/components/notes/notes-content/commonly-confused-words";

export default function CommonlyConfusedWordsNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-grammar">
        <NotesTopicPage topic={commonlyConfusedWordsTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}
