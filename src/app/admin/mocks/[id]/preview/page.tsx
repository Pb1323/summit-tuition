"use client";

import { useParams } from "next/navigation";
import { MockRoomShell } from "@/components/platform/mock-room-shell";

export default function AdminMockPreviewPage() {
  const params = useParams<{ id: string }>();
  return <MockRoomShell mockId={params.id} mode="admin-preview" />;
}
