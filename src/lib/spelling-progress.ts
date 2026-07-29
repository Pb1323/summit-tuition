"use client";

import { useSyncExternalStore } from "react";

export type SpellingPile = "known" | "learning";
export type SpellingProgressMap = Record<string, SpellingPile>;

/**
 * Module-level cache + useSyncExternalStore, mirroring platform-context.tsx's own store
 * pattern (and free-mock-preview.tsx's copy of it) so a returning student's "known" /
 * "still learning" piles read correctly on first paint instead of flashing from an
 * empty SSR snapshot to the real localStorage value post-hydration.
 */
const EMPTY_PROGRESS: SpellingProgressMap = {};
const progressCache = new Map<string, SpellingProgressMap>();
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribeProgress(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function storageKey(userId: string) {
  return `summit-spelling-progress-${userId}`;
}

function readFromStorage(userId: string): SpellingProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    return raw ? (JSON.parse(raw) as SpellingProgressMap) : {};
  } catch {
    return {};
  }
}

function getSnapshot(userId: string): SpellingProgressMap {
  if (!progressCache.has(userId)) {
    progressCache.set(userId, readFromStorage(userId));
  }
  return progressCache.get(userId)!;
}

function getServerSnapshot(): SpellingProgressMap {
  return EMPTY_PROGRESS;
}

export function setSpellingPile(userId: string, wordId: string, pile: SpellingPile) {
  const existing = getSnapshot(userId);
  if (existing[wordId] === pile) return;
  const next = { ...existing, [wordId]: pile };
  progressCache.set(userId, next);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey(userId), JSON.stringify(next));
  }
  emitChange();
}

export function useSpellingProgress(userId: string): SpellingProgressMap {
  return useSyncExternalStore(
    subscribeProgress,
    () => getSnapshot(userId),
    getServerSnapshot
  );
}
