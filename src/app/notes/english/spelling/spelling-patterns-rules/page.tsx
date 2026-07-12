"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { spellingPatternsRulesTopic } from "@/components/notes/notes-content/spelling-patterns-rules";

export default function SpellingPatternsRulesNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={spellingPatternsRulesTopic} />
    </RequireAuth>
  );
}
