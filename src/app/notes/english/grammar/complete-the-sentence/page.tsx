"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { completeTheSentenceTopic } from "@/components/notes/notes-content/complete-the-sentence";

export default function CompleteTheSentenceNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-grammar">
        <NotesTopicPage topic={completeTheSentenceTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}
