"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { pronounErrorsTopic } from "@/components/notes/notes-content/pronoun-errors";

export default function PronounErrorsNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={pronounErrorsTopic} />
    </RequireAuth>
  );
}
