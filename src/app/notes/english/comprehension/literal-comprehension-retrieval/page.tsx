"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { literalComprehensionRetrievalTopic } from "@/components/notes/notes-content/literal-comprehension-retrieval";

export default function LiteralComprehensionRetrievalNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-comprehension">
        <NotesTopicPage topic={literalComprehensionRetrievalTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}
