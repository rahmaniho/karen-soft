export function NumberedCard({
  index,
  title,
  desc,
}: {
  index: string;
  title: string;
  desc: string;
}) {
  return (
    <li className="grid grid-cols-[56px_1fr] gap-5 border-b border-[var(--border-subtle)] py-7 last:border-0">
      <span className="grid size-12 place-items-center rounded-full border border-[var(--border-subtle)] text-xs font-extrabold text-brand-600 dark:text-brand-300 persian-num">
        {index}
      </span>
      <div>
        <h3 className="text-lg font-extrabold">{title}</h3>
        <p className="mt-1.5 text-sm leading-loose text-muted">{desc}</p>
      </div>
    </li>
  );
}
