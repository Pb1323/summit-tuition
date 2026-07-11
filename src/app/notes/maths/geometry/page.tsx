"use client";

import { RequireAuth } from "@/components/platform/ui";
import { NotesTopicPage } from "@/components/notes/notes-shell";
import { geometryTopic } from "@/components/notes/notes-content/geometry";

export default function GeometryNotesPage() {
  return (
    <RequireAuth role="student">
      <NotesTopicPage topic={geometryTopic} />
    </RequireAuth>
  );
}
