import Link from "next/link";

export default function ServiceCard({
  href,
  icon,
  accent,
  title,
  subtitle,
  cta,
}: {
  href: string;
  icon: string;
  accent: string;
  title: string;
  subtitle: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="tap flex flex-col gap-3 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
      style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-subtle)" }}
    >
      <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full">
        <span className="absolute inset-0 rounded-full" style={{ background: accent, opacity: "var(--icon-bg-opacity)" }} />
        <span className="material-symbols-rounded relative" style={{ fontSize: 26, color: accent }}>
          {icon}
        </span>
      </span>
      <span className="block flex-1">
        <span className="block text-base font-semibold leading-snug text-[var(--color-text-primary)]">{title}</span>
        <span className="mt-1 block text-xs leading-snug text-[var(--color-text-secondary)]">{subtitle}</span>
      </span>
      <span
        className="flex h-9 w-full items-center justify-center gap-1.5 rounded-[5px] text-sm font-medium text-white"
        style={{ background: "var(--color-brand-primary)" }}
      >
        {cta}
        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
          arrow_forward
        </span>
      </span>
    </Link>
  );
}
