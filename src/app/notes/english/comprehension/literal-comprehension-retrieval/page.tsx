"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { literalComprehensionRetrievalTopic } from "@/components/notes/notes-content/literal-comprehension-retrieval";

export default function LiteralComprehensionRetrievalNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={literalComprehensionRetrievalTopic} />
    </RequireAuth>
  );
}
