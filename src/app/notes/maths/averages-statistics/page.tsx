"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { averagesStatisticsTopic } from "@/components/notes/notes-content/averages-statistics";

export default function AveragesStatisticsNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={averagesStatisticsTopic} />
    </RequireAuth>
  );
}
