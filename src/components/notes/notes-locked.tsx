import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { NOTE_PAGES } from "@/data/platform";

export function NotesLocked({ noteId }: { noteId: string }) {
  const note = NOTE_PAGES.find((item) => item.id === noteId);
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Lock className="mx-auto h-10 w-10 text-gold-dark" />
      <h1 className="mt-4 text-3xl font-bold text-navy">This notes page is locked</h1>
      <p className="mt-2 text-muted">{note?.title ?? "This strand"} is not part of your free access yet. Contact Summit Tuition to unlock it.</p>
      <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy">
        Contact Summit Tuition <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
