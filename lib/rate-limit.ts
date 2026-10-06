/** Best-effort per-instance protection. Use Vercel Firewall for distributed limits. */
const hits = new Map<string, { count: number; reset: number }>();
export function rateLimited(key: string, now = Date.now()): boolean {
  for (const [id, value] of hits) if (value.reset <= now) hits.delete(id);
  const entry = hits.get(key);
  if (entry) return ++entry.count > 5;
  if (hits.size >= 5000) return true;
  hits.set(key, {count: 1, reset: now + 60_000});
  return false;
}
