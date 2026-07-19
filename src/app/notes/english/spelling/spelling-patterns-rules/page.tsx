"use client";

import { RequireAuth, RequireNoteAccess } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { spellingPatternsRulesTopic } from "@/components/notes/notes-content/spelling-patterns-rules";

export default function SpellingPatternsRulesNotesPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-spelling">
        <NotesTopicPage topic={spellingPatternsRulesTopic} />
      </RequireNoteAccess>
    </RequireAuth>
  );
}
