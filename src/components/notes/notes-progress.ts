export type TopicProgress = Record<string, { correct: number; total: number }>;

const KEY_PREFIX = "summit_notes_progress_v1_";

export function loadTopicProgress(topicSlug: string): TopicProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + topicSlug);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as TopicProgress) : {};
  } catch {
    return {};
  }
}

export function saveTopicProgress(topicSlug: string, progress: TopicProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY_PREFIX + topicSlug, JSON.stringify(progress));
  } catch {
    // localStorage unavailable (private browsing, quota) — progress just won't persist this session
  }
}
