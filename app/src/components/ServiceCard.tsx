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
      className="tap flex items-center gap-3 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-3 py-9 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] sm:gap-5 sm:px-5 sm:py-11"
      style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
    >
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg sm:h-20 sm:w-20">
        <span className="absolute inset-0 rounded-full" style={{ background: iconBg, opacity: "var(--icon-bg-opacity)" }} />
        <span className="relative flex items-center justify-center">{icon}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xl font-semibold leading-snug text-[var(--color-text-primary)] sm:text-2xl">
          {title}
        </span>
        <span className="mt-1 block text-xs text-[var(--color-text-secondary)] sm:mt-1.5 sm:text-sm">{subtitle}</span>
      </span>
      <span className="material-symbols-rounded shrink-0" style={{ fontSize: 16, color: "var(--color-text-secondary)" }}>
        arrow_forward_ios
      </span>
    </Link>
  );
}
