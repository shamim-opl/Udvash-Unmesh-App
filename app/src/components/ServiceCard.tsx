import Link from "next/link";
import type { ReactNode } from "react";

export default function ServiceCard({
  href,
  icon,
  iconBg,
  title,
  subtitle,
}: {
  href: string;
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="tap flex items-center gap-3 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-4 py-[18px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
      style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
    >
      <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full text-lg">
        <span className="absolute inset-0 rounded-full" style={{ background: iconBg, opacity: "var(--icon-bg-opacity)" }} />
        <span className="relative flex items-center justify-center">{icon}</span>
      </span>
      <span className="flex-1">
        <span className="block text-lg font-semibold text-[var(--color-text-primary)]">
          {title}
        </span>
        <span className="block text-xs text-[var(--color-text-secondary)]">{subtitle}</span>
      </span>
      <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--color-text-secondary)" }}>
        arrow_forward_ios
      </span>
    </Link>
  );
}
