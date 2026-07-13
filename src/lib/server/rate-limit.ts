import "server-only";

const buckets = new Map<string, { count: number; resetAt: number }>();

/**
 * In-memory fixed-window limiter. Vercel serverless functions don't share
 * memory across instances/regions, so this is best-effort defense-in-depth
 * against casual brute-forcing, not a hard guarantee under scale — swap for
 * a shared store (Redis/Upstash) if this becomes a real target.
 */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
