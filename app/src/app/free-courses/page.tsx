"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { CLASS_LEVELS } from "@/data/freeCourses";

export default function FreeCoursesPage() {
  return (
    <>
      <header className="mb-4 flex items-center gap-3 px-4 py-3">
        <BackButton href="/" />
        <h1 className="text-base font-bold leading-none text-[var(--color-text-primary)]">ট্রায়াল / ফ্রি কোর্স</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <h2 className="mb-4 text-sm font-normal text-[var(--color-text-secondary)]">শ্রেণি নির্বাচন করুন</h2>

        <div className="grid grid-cols-2 gap-3">
          {CLASS_LEVELS.map((c) => (
            <Link
              key={c.slug}
              href={`/free-courses/${c.slug}`}
              className="tap flex flex-col items-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-surface)] px-2 py-4 text-center shadow-[var(--shadow-subtle)]"
            >
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full">
                <span className="absolute inset-0 rounded-full" style={{ background: c.bg, opacity: "var(--icon-bg-opacity)" }} />
                <span className="material-symbols-rounded relative" style={{ fontSize: 20, color: c.color }}>
                  menu_book
                </span>
              </span>
              <span className="flex items-center gap-0.5 text-sm font-semibold text-[var(--color-text-primary)]">
                {c.label}
                <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
                  chevron_right
                </span>
              </span>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
