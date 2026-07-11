"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { fractionsDecimalsPercentagesTopic } from "@/components/notes/notes-content/fractions-decimals-percentages";

export default function FractionsDecimalsPercentagesNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={fractionsDecimalsPercentagesTopic} />
    </RequireAuth>
  );
}
