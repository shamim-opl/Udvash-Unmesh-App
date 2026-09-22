"use client";

export default function ResultCard({
  label,
  href,
  color,
}: {
  label: string;
  href: string;
  color: string;
}) {
  const openPdf = () => window.open(href, "_blank", "noopener,noreferrer");

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openPdf}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPdf();
        }
      }}
      aria-label={`${label}, PDF (নতুন ট্যাবে খুলবে)`}
      className="tap flex cursor-pointer items-center gap-3 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
      style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-subtle)" }}
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
        <span className="absolute inset-0 rounded-full" style={{ background: color, opacity: "var(--icon-bg-opacity)" }} />
        <span className="material-symbols-rounded relative" style={{ fontSize: 22, color }}>
          picture_as_pdf
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold leading-snug text-[var(--color-text-primary)]">{label}</span>
        <span className="mt-0.5 block text-xs text-[var(--color-text-secondary)]">PDF file</span>
      </span>
      <a
        href={href}
        download={`${label}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} PDF ডাউনলোড করুন`}
        onClick={(event) => event.stopPropagation()}
        className="tap flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-[var(--color-bg-canvas)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
      >
        <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 20, color: "var(--color-text-secondary)" }}>
          download
        </span>
      </a>
    </div>
  );
}
