import Link from "next/link";
import DragScroll from "@/components/DragScroll";
import { RESULT_CATEGORIES } from "@/data/results";

export default function ResultsSection() {
  return (
    <section className="mt-6" aria-labelledby="results-heading">
      <h2 id="results-heading" className="mb-3 px-4 text-sm font-medium text-[var(--color-text-secondary)] opacity-70">
        সাফল্য
      </h2>
      <DragScroll className="flex cursor-grab snap-x snap-proximity scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 [scrollbar-width:none] md:grid md:cursor-auto md:grid-cols-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {RESULT_CATEGORIES.map((r) => (
          <li key={r.slug} className="w-[148px] shrink-0 snap-start md:w-auto">
            <Link
              href={`/results/${r.slug}`}
              draggable={false}
              title={r.note}
              aria-label={`${r.title} রেজাল্ট ২০২৫`}
              className="tap relative flex h-[128px] flex-col items-center justify-center gap-2.5 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-3 text-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
              style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
            >
              <span
                aria-hidden
                className="material-symbols-rounded absolute right-3 top-3"
                style={{ fontSize: 16, color: "var(--color-text-secondary)" }}
              >
                north_east
              </span>
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full">
                <span className="absolute inset-0 rounded-full" style={{ background: r.color, opacity: "var(--icon-bg-opacity)" }} />
                <span className="material-symbols-rounded relative" style={{ fontSize: 24, color: r.color }}>
                  {r.icon}
                </span>
              </span>
              <span className="block">
                <span className="block text-sm font-semibold leading-snug text-[var(--color-text-primary)]">{r.title}</span>
                <span className="mt-0.5 block text-xs leading-snug text-[var(--color-text-secondary)]">রেজাল্ট ২০২৫</span>
              </span>
            </Link>
          </li>
        ))}
      </DragScroll>
    </section>
  );
}
