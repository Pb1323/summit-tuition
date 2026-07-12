"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { commonlyConfusedWordsTopic } from "@/components/notes/notes-content/commonly-confused-words";

export default function CommonlyConfusedWordsNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={commonlyConfusedWordsTopic} />
    </RequireAuth>
  );
}
