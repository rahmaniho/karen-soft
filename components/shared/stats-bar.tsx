export function StatsBar({
  stats,
  accent = "var(--color-brand-500)",
  className,
}: {
  stats: { value: string; label: string }[];
  accent?: string;
  className?: string;
}) {
  return (
    <dl className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className ?? ""}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="surface-card p-6 text-center">
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <strong className="block text-3xl font-extrabold persian-num" style={{ color: accent }}>
              {stat.value}
            </strong>
            <span className="mt-1 block text-xs text-muted">{stat.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
